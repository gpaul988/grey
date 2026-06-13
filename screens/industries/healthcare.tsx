'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Link from "next/link";
import Image from "next/image";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {FaCode, FaPencilRuler, FaRocket, FaSearch, FaShieldAlt, FaVial,} from "react-icons/fa";
import Footer from "@/components/Footer";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";


// Testimonial data
const testimonials = [
    {
        name: "Nneka Okoye",
        title: "CTO, AgroLink ",
        message: (
            <>
                They delivered an innovative, scalable solution that transformed how we connected farmers to markets
                across Nigeria. Their team&#39;s expertise and commitment helped us launch quickly and efficiently.
            </>
        ),
    },
    {
        name: "Kwesi Boateng",
        title: "CEO, FinServe ",
        message: (
            <>
                Partnering with Grey InfoTech was a game-changer for our digital lending platform. Their deep technical
                knowledge and agile approach enabled us to meet tight deadlines without compromising quality. Grey
                InfoTech is a trusted partner for any company looking to innovate in the fintech space.
            </>
        )
    },
    {
        name: "Amina Diallo",
        title: "Head of Product, MedConnect",
        message: (
            <>
                Their team understood our vision from day one and built a user-friendly, secure healthcare app that
                truly meets the needs of our community. Their professionalism and responsiveness made the entire
                development process seamless and stress-free. We highly recommend them.
            </>
        )
    }
];

// Reasons
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
                interface redesign—enabling healthcare organizations to unlock new capabilities, streamline operations,
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
                of web, desktop, and mobile application development—from initial consultation, requirements gathering,
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
            <>AI & Machine Learning <br className={'lg:block md:block hidden'}/>Development for Healthcare</>
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
                technical expertise, we guide you through the entire development process—whether launching a minimum
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
            <>Healthcare Management <br className={'lg:block md:block hidden'}/>System (HMS) Development</>
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
    const [isDayTime, setIsDayTime] = useState<boolean>(() => {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18;
});

    useEffect(() => {
  const interval = setInterval(() => {
    const hour = new Date().getHours();
    setIsDayTime(hour >= 6 && hour < 18);
  }, 60 * 1000); // check once per minute

  return () => clearInterval(interval);
}, []);

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
                stage of the planning process—ensuring compliance is not an afterthought but a foundational element. Our
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
                accessibility, and delivers a seamless experience across all devices—fostering satisfaction, trust, and
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

    // Testimonial carousel hook
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((current + 1) % testimonials.length);

    const {name, title, message} = testimonials[current];

    // FAQ Hook
    const [onIndex, setOnIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOnIndex(onIndex === index ? null : index);
    }


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
                 className={"relative overflow-hidden lg:w-full lg:h-180 justify-center items-center md:w-full md:h-[700] w-full h-[700] pb-6"}>
                <video
                    src="/assets/health/hero.webm"
                    autoPlay
                    loop
                    muted
                    className="lg:w-full lg:h-180 md:w-full md:h-[700] w-full h-[700] object-cover"
                />
                <div
                    className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start text-start lg:max-w-auto max-w-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                        isDayTime ? 'text-white ' : 'text-white'}`}>
                    <div
                        className="flex flex-col justify-start items-start border-b pb-[0.3em] border-gray-500/50 max-w-full w-full mx-auto ">
                        <h1
                            className={`px-0 constant-text lg:text-[5.35em] md:text-[4.4em] sm:text-[3.5em] text-[2em] lg:mt-[3em] md:mt-[3em] mt-[4em] w-auto h-auto leading-[1.1] font-semibold`}>
                            Healthcare Software <br className={'lg:block md:block hidden'}/>Development Services
                        </h1>
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                        <div className={'lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em] md:mt-[1em]'}>
                            <p className={'text-[0.87em] font-[300]'}>
                                Seeking to enhance clinic management, strengthen security, and improve patient care?
                                Grey InfoTech delivers tailored healthcare solutions that drive efficiency and results.
                            </p>
                        </div>
                        <div
                            className={'relative grid lg:grid-cols-3 lg:gap-8 lg:ml-[12em]'}>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>8+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Years Experience</p>
                            </div>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>13+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Team Members</p>
                            </div>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>123+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Products Launched</p>
                            </div>
                        </div>
                    </div>
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
                    className='relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 md:gap-8 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className={'pt-2'}>
                        <h6 className='constant-text uppercase text-[0.85em] leading-[1.3]lg:font-[600] font-[600] tracking-wider'>
                            Solutions that simplify <br className={'lg:block md:block hidden'}/>clinical workflows
                        </h6>
                    </div>
                    <div
                        className='lg:-ml-[25em] md:-ml-[16em] md:pl-[6em] mx-auto w-auto sm:break-words sm:whitespace-normal'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            What We Offer
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Grey InfoTech Vision empowers healthcare organizations with innovative IT solutions
                                    tailored to meet the evolving demands of the industry. Our healthcare software
                                    development services focus on automating complex processes, unlocking actionable
                                    data insights, and enhancing patient experiences. By streamlining clinical
                                    workflows, reducing operational costs, and improving care outcomes, we help
                                    providers achieve measurable impact and long-term value.
                                </p>
                            </div>
                            <div>
                                <p>
                                    As a strategic technology partner—not just a service provider—we offer end-to-end
                                    expertise in software architecture, cross-platform application development, system
                                    modernization, and integration. Our team applies proven methodologies to manage
                                    risks, accelerate delivery, and maintain regulatory compliance. With a strong
                                    commitment to quality and timelines, we ensure that your healthcare solutions are
                                    secure, scalable, and built to support your growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Image*/}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'top'}
                     className={'relative lg:max-w-full w-full lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] items-center mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                    <div className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 text-center'}>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/health/1.jpg'}
                                alt={'Healthcare'}
                                width={1396}
                                height={1440}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/health/2.jpg'}
                                alt={'BioTech'}
                                width={1396}
                                height={1440}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Healthcare Software Development solutions */}
            <div className={`lg:pt-[2em] md:pt-[2em] pt-[0.5em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'vuejs-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3.3em] md:text-[2.5em] sm:text-[2em] text-[2em] font-[500] justify-center tracking-tight leading-[1.1]`}>
                                Healthcare <br className={'lg:block md:block hidden'}/>Development <br
                                className={'lg:block md:block hidden'}/>Solutions
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] md:-ml-[3.5em] tracking-noromal'>
                                We develop secure, scalable healthcare solutions that streamline operations and enhance
                                patient engagement while ensuring regulatory compliance. Our expertise covers EHR,
                                telehealth, and custom healthcare applications designed for efficiency.<br/><br/>
                                Focused on usability and performance, our solutions empower healthcare organizations to
                                improve care delivery and make informed decisions, supporting long-term growth and
                                digital transformation.
                            </p>
                        </div>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[6em] gap-6 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[6em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] font-[300] relative space-y-1 md:break-words md:whitespace-normal ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-300 focus:decoration-gray-600'
                            }`}>
                                {[
                                    {id: "01", title: "Reference & Diagnostic Support Systems", target: "RDSS"},
                                    {id: "02", title: "Medical Practice Management System", target: "MPMS"},
                                    {id: "03", title: "Hospital Management Software", target: "HMS"},
                                    {id: "04", title: "Patient Profile Management Software", target: "PPMS"},
                                    {id: "05", title: "Health Monitoring & Analysis Solutions", target: "HMAS"},
                                    {id: "06", title: "AI-Powered Data AnalysisSolutions)", target: "APDAS"},
                                    {id: "07", title: "Fitness & Wellness Solutions", target: "FWS"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 md:mt-3 mt-2'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-2 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[300]'}`
                                                    : `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-500 font-[300]'}`
                                            }`}
                                        >
                                            <div className={'flex gap-2'}>
                                                <span className={'shrink-0'}>{item.id}</span>
                                                <span
                                                    className={`opacity-0 transition-opacity text-[1.5em] leading-[0.59em] ${activeId === item.target ? 'opacity-100' : ''}`}>→</span>
                                                <span>{item.title}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={'lg:-ml-[8em] md:-ml-[4em] lg:mb-[19.5em] md:mb-[23em]'}>
                            <div
                                className="grid lg:grid-cols-[50px_auto] md:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 md:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'RDSS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Reference && Diagnostic Support Systems
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Intelligent Diagnostics</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Integrated Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Streamlined Diagnostics</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Enhanced Efficiency</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Our healthcare software development company provides intelligent diagnostic
                                        support systems specifically built to aid in the identification and management
                                        of complex medical conditions. These solutions integrate evidence-based medical
                                        guidelines with real-time access to patient data, enabling clinicians to make
                                        faster, more accurate, and informed decisions at the point of care. By
                                        streamlining the diagnostic process and supporting clinical judgment with
                                        actionable insights, we help healthcare providers enhance efficiency, reduce
                                        diagnostic errors, and deliver improved patient outcomes.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'MPMS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Medical Practice Management System
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Automated Tasks</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Quality Deliverables</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Operational Growth</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Medical practice management systems are designed to automate repetitive
                                        administrative tasks and optimize day-to-day workflows across healthcare
                                        facilities. By reducing the time spent on scheduling, billing, documentation,
                                        and other routine processes, these systems allow healthcare professionals to
                                        focus more on delivering quality patient care. The result is a more efficient,
                                        organized, and productive practice environment that not only enhances the
                                        patient experience but also drives long-term profitability and operational
                                        growth for healthcare providers.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'HMS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Hospital Management Software
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Integrated Modules</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Automated Routine</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Optimised Productivity</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Regulated Compliance</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        These healthcare management solutions are equipped with integrated modules for
                                        resource allocation, staff scheduling, billing, and electronic patient
                                        records—ensuring a centralized and cohesive approach to operational oversight.
                                        By automating routine processes and minimizing the risk of administrative
                                        errors, they help reduce patient wait times, optimize staff productivity, and
                                        maintain regulatory compliance. This leads to smoother, more efficient clinical
                                        operations while significantly enhancing the quality, consistency, and
                                        responsiveness of the patient experience across the care continuum.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'PPMS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Patient Profile Management Software
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Instant Access</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Clinical Data</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Diagnostic Records</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        These centralized systems enable seamless care coordination by providing
                                        healthcare professionals with instant access to comprehensive patient histories,
                                        clinical data, and diagnostic records. This facilitates more informed
                                        decision-making and allows for the development of tailored treatment plans based
                                        on individual patient needs. As a result, providers can deliver more accurate
                                        diagnoses, reduce delays in care, and offer highly personalized, effective
                                        treatment—ultimately improving clinical outcomes and patient satisfaction.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'HMAS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Health Monitoring & Analysis Solutions
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Advanced Tools</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data-driven Insight</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Personalized Information</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We design and develop advanced tools that capture and analyze patient data in
                                        real time, enabling early identification of potential health risks and
                                        facilitating timely preventive interventions. These solutions are particularly
                                        valuable for the ongoing management of chronic conditions, as they support
                                        continuous monitoring, data-driven insights, and proactive care strategies. By
                                        empowering healthcare providers with timely, personalized information, our
                                        systems contribute to improved patient outcomes and more efficient, targeted
                                        healthcare delivery.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'APDAS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        AI-powered Data Analysis Solutions
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Healthcare Providers</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Advanced Analytics</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Resource Utilization</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Systems that identify patterns and correlations within clinical data enable
                                        healthcare providers to enhance diagnostic precision, optimize treatment
                                        effectiveness, and drive better patient outcomes. By leveraging advanced
                                        analytics, these solutions support predictive modeling and risk stratification,
                                        allowing care teams to anticipate potential health issues and implement
                                        proactive, data-informed care strategies. This results in more efficient
                                        resource utilization, timely interventions, and a higher standard of
                                        personalized patient care.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'FWS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Fitness & Wellness Solutions
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Real-time Monitor</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Continuous Monitoring</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Proactive Approach</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        These mobile health applications empower users to set and track fitness goals,
                                        monitor vital signs in real time, and receive tailored health recommendations
                                        based on individual needs. Whether supporting post-surgical recovery, chronic
                                        disease management, or overall wellness, these apps foster greater patient
                                        engagement and self-care. By promoting healthier habits and enabling continuous
                                        monitoring, they contribute to long-term well-being and a more proactive
                                        approach to personal health management.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'}
                 className={'lg:-mt-[26em] md:-mt-[25em] sm:-mt-[3em] -mt-[3em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/health/hospital.jpg'}
                    alt={'Hospital Software'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Our Capabilities */}
            <div className={`lg:h-full md:h-full h-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:pt-32 lg:pb-14  md:pt-24 md:pb-10 pt-20 pb-8 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-20 mb-12 ${
                        isDayTime ? 'text-black' : 'text-white'}`}>
                    <div
                        className={`relative border-b pb-[1em] border-gray-500 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1  lg:gap-14 gap-6 lg:max-w-full mx-auto`}>
                        <div>
                            <h2 className='lg:text-[3em] md:text-[2em] text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 rounded-none'>
                                Our Areas <br className={'lg:block md:block hidden'}/>of Expertise
                            </h2>
                        </div>
                        <div className='lg:-ml-[8em]'>
                            <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                We specialize in developing secure, compliant, and scalable healthcare software tailored
                                to diverse clinical and operational needs. Our capabilities span EHR systems, telehealth
                                platforms, patient engagement tools, data analytics, and system integrations—empowering
                                healthcare providers to enhance care delivery, optimize workflows, and drive measurable
                                outcomes.
                            </p>
                        </div>
                    </div>
                    <div
                        className='relative lg:mt-[6em] md:mt-[6em] mt-[3em] mx-auto grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-24'>
                        {/* Left Section */}
                        <div
                            className={`relative text-[0.873em] lg:leading-[1.5] ${isDayTime ? 'text-black' : 'text-white'} flex flex-col justify-center mb-4`}>
                            {reasons.map((reason, index) => (
                                <div
                                    key={reason.id}
                                    className={`relative mb-6 ${
                                        index === activeIndex
                                            ? isDayTime
                                                ? 'bg-white py-5'
                                                : 'bg-black py-5'
                                            : ''
                                    }`}
                                >
                                    <h3
                                        onClick={() => setActiveIndex(index)}
                                        className={`relative leading-[1.2] lg:text-[1.5em] md:text-[1.5em] text-[1em] mb-4 font-[600] cursor-pointer transition-all ${
                                            index === activeIndex
                                                ? isDayTime
                                                    ? 'text-black font-[600]'
                                                    : 'text-white font-[600]'
                                                : 'text-gray-500'

                                        }`}
                                    >
                                        {reason.title}
                                    </h3>
                                    <div className={'lg:pr-[5em] md:pr-[5em]'}>
                                        <AnimatePresence mode="wait">
                                            {index === activeIndex && (
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
                            {reasons[activeIndex]?.images?.map((image, idx) => (
                                <Image
                                    key={idx}
                                    src={image}
                                    alt={`Reason ${activeIndex} Image ${idx}`}
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
                                started <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                <span className="absolute inset-0 rounded-full "></span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Trends in healthcare software development services */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[6em] md:pt-[6em] pt-[1.2em] lg:pb-[6em] md:pb-[6em] pb-[1.2em] mt-14`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div className={'lg:mr-[7em]'}>
                            <h2 className={`lg:text-[3.1em] md:text-[3.1em] text-[1.5em] font-[500] justify-center tracking-tight lg:mb-12 mb-7 leading-[1.2]`}>
                                Trends in <br className={'lg:block md:block hidden'}/>Healthcare Software <br
                                className={'lg:block md:block hidden'}/>Development Service
                            </h2>
                            <p className={'text-[0.873em] font-[400] leading-[1.5] tracking-normal text-justify'}>
                                Healthcare software development is rapidly evolving with trends like AI-driven
                                diagnostics, telemedicine expansion, cloud-based solutions, and enhanced data security.
                                These innovations enable providers to deliver more personalized, efficient, and
                                accessible care while ensuring compliance with strict regulatory standards. Staying
                                ahead of these trends is essential for healthcare organizations seeking to improve
                                outcomes and operational efficiency.
                            </p>
                        </div>
                        <div
                            className={`lg:-ml-5 md:-ml-5 border-t pt-[6em]] relative mx-auto max-w-full w-full space-y-2 ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <div
                                className={`w-full border-b pb-6 mt-6`}>
                                <button
                                    onClick={() => toggleWeb(0)}
                                    className="flex items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Telemedicine & Remote Patient Monitoring</span>
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
                                        Telemedicine has fundamentally transformed healthcare by enabling providers to
                                        deliver medical consultations, diagnoses, and treatments remotely, thereby
                                        expanding access to quality care beyond traditional clinical environments. When
                                        integrated with sophisticated patient monitoring technologies, telemedicine
                                        supports continuous real-time supervision of chronic and acute health
                                        conditions, allowing healthcare professionals to collect critical data, detect
                                        early warning signs, and intervene promptly. This seamless combination not only
                                        reduces the frequency of hospital visits and associated costs but also enhances
                                        patient engagement and adherence to treatment plans. By facilitating timely,
                                        personalized care and improving clinical outcomes, telemedicine represents a
                                        vital component of modern, patient-centered healthcare delivery systems.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(1)}
                                    className="flex items-center mt-6 justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span className={'lg:leading-[1.2] md:leading-[1.2]'}>Artificial Intelligence & Machine Learning <br
                                        className={'lg:block md:block hidden'}/>in Healthcare</span>
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
                                        AI and machine learning are revolutionizing healthcare by enabling advanced
                                        predictive analytics, enhancing diagnostic accuracy, and facilitating the
                                        development of personalized treatment plans. These technologies streamline
                                        complex clinical decision-making processes by uncovering subtle patterns and
                                        correlations within vast datasets that are often imperceptible to human
                                        clinicians. By reducing the potential for human error and providing data-driven
                                        insights, AI and ML improve the precision and efficiency of care delivery,
                                        ultimately leading to better patient outcomes, optimized resource utilization,
                                        and more proactive, individualized healthcare management.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(2)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Internet of Things (IoT) in Healthcare</span>
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
                                        IoT devices have become integral to modern healthcare by enabling continuous,
                                        real-time data collection and monitoring through advanced wearables and sensor
                                        technologies. These devices capture critical health metrics such as vital signs,
                                        physical activity, medication adherence, and environmental factors, providing
                                        healthcare providers with timely and precise information to support effective
                                        chronic disease management and preventive care strategies. By facilitating
                                        remote patient monitoring and early detection of health anomalies, IoT solutions
                                        empower clinicians to intervene proactively, reduce hospital admissions, and
                                        enhance patient engagement and self-management. This convergence of connectivity
                                        and data analytics drives more personalized, efficient, and outcome-focused
                                        healthcare delivery, positioning IoT as a cornerstone of innovative,
                                        patient-centered medical practices.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(3)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Mobile Health (mHealth) Applications</span>
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
                                        mHealth applications have become essential tools for empowering patients to
                                        actively manage their health and wellness through intuitive, mobile platforms.
                                        These solutions provide seamless access to a wide range of healthcare
                                        services—from booking appointments and receiving timely medication reminders to
                                        tracking vital signs and accessing personalized health education—all from the
                                        convenience of a smartphone or tablet. By facilitating continuous patient
                                        engagement and supporting adherence to treatment plans, mHealth apps play a
                                        critical role in promoting healthier behaviors and improving clinical outcomes.
                                        Furthermore, by enhancing accessibility and streamlining communication between
                                        patients and providers, these technologies contribute to a more efficient,
                                        responsive, and patient-centered healthcare delivery model that meets the
                                        evolving demands of today’s digital health landscape.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(4)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span className={'lg:leading-[1.2] md:leading-[1.2]'}>Cloud Computing & Data Management <br
                                        className={'lg:block md:block hidden'}/>in Healthcare</span>
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
                                        Cloud solutions have become foundational to modern healthcare infrastructure by
                                        offering scalable, secure, and compliant platforms capable of handling vast and
                                        complex healthcare datasets. These technologies provide healthcare organizations
                                        with flexible storage options that ensure data integrity and confidentiality
                                        while enabling authorized users to access critical patient records, clinical
                                        analytics, and operational information anytime and anywhere. By fostering
                                        seamless interoperability and real-time collaboration among providers,
                                        specialists, and administrative teams, cloud-based systems streamline workflows,
                                        reduce redundancies, and accelerate informed clinical decision-making. Moreover,
                                        robust cloud architectures support advanced data analytics, population health
                                        management, and telehealth services, all while maintaining rigorous adherence to
                                        regulatory requirements such as HIPAA and GDPR. This combination of security,
                                        accessibility, and functionality positions cloud solutions as essential enablers
                                        of efficient, data-driven, and patient-centered healthcare delivery.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Business Benefits from Partnering with us  */}
            <div
                className={`lg:pt-[3em] md:pt-[2em] pt-[1em] lg:pb-[3em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <div id={'benefit of using typescript'}
                     className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Business Benefits from Partnering with Us Header */}
                    <div
                        className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[3em] lg:mb-[5em] md:mb-[5em] sm:mb-[5em] mb-[5em]`}>
                        <div>
                            <h2 className='text-[1em] text-start sm:text-[1.5em] md:text-[2.5em] lg:text-[3.3em] font-[550] break-words whitespace-normal tracking-tight leading-[1.15] lg:pb-6'>
                                Business Benefits <br className={'lg:block md:block hidden'}/>From Partnering <br
                                className={'lg:block md:block hidden'}/>with Us
                            </h2>
                        </div>
                        <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                            <p className={'text-justify text-[0.87em] font-[300]'}>
                                Partnering with us means gaining access to expert development teams, tailored solutions,
                                and a collaborative approach that aligns technology with your business goals. We deliver
                                scalable, secure, and efficient software that drives innovation, enhances operational
                                efficiency, and supports sustainable growth.
                            </p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div
                        className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]`}>
                        <div id={'top-notch usability'}>
                            <Image
                                src={isDayTime ? '/assets/health/icon/att.svg' : '/assets/health/icon/att1.svg'}
                                alt={'Top-notch usability'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Top-notch Usability
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Our UX/UI design team specializes in creating intuitive, user-friendly interfaces that
                                simplify complex workflows and ensure accessibility for users of all technical skill
                                levels. By adhering to user-centered design principles, we develop interfaces that not
                                only align seamlessly with your business strategy but also enhance overall user
                                satisfaction and engagement. Complementing this, our AI and machine learning-driven
                                solutions optimize and automate routine tasks within these workflows, enabling
                                healthcare professionals to focus more on patient care and critical decision-making.
                                Together, these design and technology innovations drive efficiency, reduce operational
                                burdens, and support a more effective, user-focused healthcare environment.
                            </p>
                        </div>
                        <div id={'healthcare workflow optimization'}>
                            <Image
                                src={isDayTime ? '/assets/health/icon/fast.svg' : '/assets/health/icon/fast1.svg'}
                                alt={'Healthcare Workflow Optimization'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] lg:leading-[1.1] md:leading-[1.1] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.1em] font-[500] mb-8'}>
                                Healthcare Workflow <br className={'lg:block md:block hidden'}/>Optimization
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We partner with you to optimize complex laboratory and clinical workflows, accelerating
                                the achievement of your business objectives through intelligent automation. By
                                leveraging cutting-edge AI, machine learning, and specialized healthcare software
                                systems, we streamline processes and automate routine, time-consuming tasks
                                traditionally performed by medical personnel. This reduces operational inefficiencies,
                                minimizes errors, and allows healthcare professionals to focus on higher-value clinical
                                activities, ultimately enhancing productivity, improving patient care, and driving
                                sustainable organizational growth.
                            </p>
                        </div>
                        <div id={'on-premise or cloud deployment'}>
                            <Image
                                src={isDayTime ? '/assets/health/icon/test.svg' : '/assets/health/icon/test1.svg'}
                                alt={'On-premise or Cloud Deployment'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] lg:leading-[1.1] md:leading-[1.1] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.1] mb-8'}>
                                On-premise or Cloud <br className={'lg:block md:block hidden'}/>Deployment
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Our cloud development team designs and implements robust data infrastructures tailored
                                to healthcare environments, ensuring a seamless and secure migration of your medical
                                software to cloud platforms. As part of our comprehensive healthcare software
                                development services, we establish automated or semi-automated deployment pipelines that
                                facilitate continuous integration and delivery, enhancing system reliability and
                                scalability. Additionally, we optimize data flow processes to maintain data integrity,
                                improve accessibility, and support efficient interoperability, enabling your
                                organization to leverage cloud technologies for enhanced operational performance and
                                compliance.
                            </p>
                        </div>
                        <div id={'quality assurance'}>
                            <Image
                                src={isDayTime ? '/assets/health/icon/sca.svg' : '/assets/health/icon/sca1.svg'}
                                alt={'Quality Assurance'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.1] mb-8'}>
                                Quality Assurance
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Our dedicated QA team conducts comprehensive testing of healthcare software solutions to
                                guarantee optimal performance, stability, efficient resource utilization, and seamless
                                responsiveness across diverse operating systems and devices. We rigorously assess
                                interoperability to ensure consistent functionality within complex healthcare
                                ecosystems. Additionally, we perform thorough evaluations of legacy systems, identifying
                                and resolving errors and performance bottlenecks to enhance reliability and extend
                                system lifespan. This meticulous quality assurance process ensures that your healthcare
                                applications deliver robust, secure, and user-centric experiences that meet stringent
                                industry standards and regulatory requirements.
                            </p>
                        </div>
                        <div id={'healthcare data security'}>
                            <Image
                                src={isDayTime ? '/assets/health/icon/risk.svg' : '/assets/health/icon/risk1.svg'}
                                alt={'Healthcare Data Security'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.1] mb-8'}>
                                Healthcare Data Security
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We possess extensive experience in developing HIPAA-compliant healthcare software that
                                rigorously adheres to industry regulations and standards. Our solutions prioritize data
                                privacy and security through the implementation of encrypted communication protocols,
                                secure data storage with robust backup mechanisms, multi-factor user authentication, and
                                granular role-based access controls. By integrating these comprehensive safeguards, we
                                ensure that sensitive patient information is protected throughout its lifecycle,
                                enabling healthcare organizations to maintain regulatory compliance while fostering
                                trust and confidence among patients and stakeholders.
                            </p>
                        </div>
                        <div id={'Scalability & Future-Proofing'}>
                            <Image
                                src={isDayTime ? '/assets/health/icon/cust.svg' : '/assets/health/icon/cust1.svg'}
                                alt={'Scalability & Future-Proofing'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Scalability & Future-Proofing
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We develop healthcare solutions with a long-term vision, ensuring they remain adaptable,
                                resilient, and future-ready in an evolving industry landscape. Our focus on scalability
                                allows your software to seamlessly handle growing user demands, expanding datasets, and
                                complex workflows without compromising performance. By designing with flexibility in
                                mind, we enable smooth integration of emerging technologies, regulatory updates, and new
                                functionalities as your organization’s needs evolve. This forward-thinking approach
                                safeguards your investment, maximizes operational efficiency, and ensures your
                                healthcare systems continue to deliver value, innovation, and reliability for years to
                                come.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* in-between */}
            <div id={'last image'}
                 className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/health/cta-5.jpg'}
                    alt={'Pharma'}
                    width={1536}
                    height={860}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
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
                                        <span>{openIndex === i ? "▲" : "▼"}</span>
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

            {/* SImi-Mid image*/}
            <div id={'mid image'}
                 className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/health/cta-3.jpg'}
                    alt={'Hospital Software'}
                    width={1536}
                    height={860}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Our Process Behind Every Great Healthcare App */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] md:px-[4.6em] lg:pt-[6em]] md:pt-[6em] pt-[2emm] lg:pb-[6em]] md:pb-[6em] pb-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[4em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3.2em] md:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] md:pr-[1em] lg:leading-[1] md:leading-[1]`}>
                            How Healthcare <br className={'lg:block md:block hidden'}/>Software Boost <br
                            className={'lg:block md:block hidden'}/>Your Business
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] md:-ml-[3em] tracking-noromal'>
                            Healthcare software streamlines operations, improves patient engagement, and ensures
                            regulatory compliance, enabling providers to deliver higher-quality care more efficiently.
                            By integrating advanced features like telehealth, data analytics, and automation, it reduces
                            costs, enhances decision-making, and creates opportunities for sustainable business growth.
                        </p>
                    </div>
                </div>

                {/* Simplifying care  coordination */}
                <div id={'simplifying-care-coordination'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Simplifying Care <br className={'lg:block md:block hidden'}/>Coordination
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Efficient patient management is essential to improving care quality, driving higher
                            satisfaction, and ensuring smooth healthcare delivery. We develop advanced software
                            solutions that centralize patient information into a single, secure platform, enabling quick
                            and reliable access to critical data. Our systems automate scheduling, appointment
                            reminders, and follow-ups while streamlining communication between patients, providers, and
                            administrative staff. By minimizing manual tasks and reducing administrative burdens across
                            the organization, our solutions free up valuable time for healthcare professionals to focus
                            on delivering personalized, efficient, and outcome-driven care.
                        </p>
                    </div>
                </div>

                {/*  Protecting sensitive health data */}
                <div id={' protecting-sensitive-health-data'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Protecting Sensitive <br className={'lg:block md:block hidden'}/>Health Data
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            As a healthcare provider, safeguarding sensitive patient information is both a
                            responsibility and a regulatory requirement. We design robust healthcare systems with
                            built-in encryption, multi-layer authentication, and role-based access controls to ensure
                            that data is protected at every level. Our solutions are developed in full compliance with
                            HIPAA, GDPR, and other relevant regulations, ensuring legal adherence while maintaining
                            operational efficiency. By prioritizing security and privacy, we help healthcare
                            organizations build trust, prevent breaches, and guarantee that sensitive health data
                            remains secure, confidential, and accessible only to authorized personnel.
                        </p>
                    </div>
                </div>

                {/* Powering smarter clinical workflow   */}
                <div id={'powering-smarter-clinical-workflow'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Powering smarter <br className={'lg:block md:block hidden'}/>clinical workflow
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Manual processes in healthcare can create significant inefficiencies and, given the critical
                            nature of the field, may lead to serious consequences for both patients and providers. To
                            address this, we develop intelligent healthcare software solutions that automate routine
                            clinical tasks, streamline documentation, and eliminate unnecessary administrative burdens.
                            By reducing bottlenecks and minimizing the risk of human error, our solutions empower
                            medical personnel to dedicate more time and attention to patient care. This not only
                            improves operational efficiency but also enhances the overall quality, safety, and
                            timeliness of healthcare delivery.
                        </p>
                    </div>
                </div>

                {/* Advanced telehealth solutions   */}
                <div id={'advanced-telehealth-solutions'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Advanced telehealth <br className={'lg:block md:block hidden'}/>solutions
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Modern healthcare extends well beyond traditional clinical settings, reaching patients in
                            their homes, workplaces, schools, and virtually anywhere care is needed. At Grey InfoTech,
                            we enable this transformation by developing robust telehealth platforms that provide secure
                            video consultations, remote patient monitoring, and seamless communication between providers
                            and patients. Our solutions are designed to expand access to care, simplify operational
                            processes, and ensure continuity of treatment, empowering healthcare organizations to
                            deliver convenient, reliable, and patient-centered services anytime and anywhere.
                        </p>
                    </div>
                </div>

                {/* Navigating complex healthcare regulations  */}
                <div id={'navigating-complex-healthcare-regulations'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Navigating complex <br className={'lg:block md:block hidden'}/>healthcare regulations
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Staying compliant with evolving healthcare regulations is a top priority, yet it often
                            presents significant challenges for providers and organizations. At Grey InfoTech, we
                            simplify this complexity by delivering solutions that automate documentation, maintain
                            detailed audit trails, and streamline compliance reporting. Our tools are designed to align
                            with both local and international standards, ensuring data security and regulatory adherence
                            without disrupting operations. This approach allows healthcare providers to remain compliant
                            while continuing to deliver high-quality, efficient, and patient-focused care.
                        </p>
                    </div>
                </div>

                {/* Integrated electronic health records (EHR) systems   */}
                <div id={'integrated-electronic-health-records-(EHR)-systems'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Integrated electronic <br className={'lg:block md:block hidden'}/>health records (EHR)
                            systems
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Disconnected and fragmented data poses risks not only to the quality of care but also to the
                            security of sensitive health information. At Grey InfoTech, we develop integrated EHR
                            systems that consolidate patient histories, lab results, prescriptions, contact details, and
                            clinical notes into a single, secure, and easily accessible hub. By centralizing critical
                            information, we enable seamless care coordination, reduce duplication of work, minimize
                            errors, and ensure that providers have a complete view of each patient’s health journey. The
                            result is improved operational efficiency, stronger data security, and an enhanced patient
                            experience built on accuracy and trust.
                        </p>
                    </div>
                </div>
            </div>

            {/* last image*/}
            <div id={'last image'}
                 className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/health/cta-4.jpg'}
                    alt={'Last Image'}
                    width={1536}
                    height={860}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* How we stand out in healthcare software development "*/}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'angular partner'}
                     className={`lg:pt-[8em] md:pt-[8em] pt-[4em] relative lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Development Approach */}
                    <div className={`sticky top-0 z-10 bg-opacity-90 backdrop-blur-md ${
                        isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                    }`}>
                        <div className="border-b-[0.1em] border-gray-300/50 pb-[2em]">
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                                How We Stand Out in <br className={'lg:block md:block hidden'}/>Healthcare Software
                                Development
                            </h2>
                            <p className={'text-[0.87em] font-[300] leading-[1.5] tracking-tight'}>
                                We stand out in healthcare software development by combining deep industry expertise
                                with cutting-edge technology to deliver secure, <br
                                className={'lg:block md:block hidden'}/>compliant, and scalable solutions. Our
                                focus on user-centric design, seamless integration, and measurable business outcomes
                                ensures that <br className={'lg:block md:block hidden'}/>providers not only improve
                                patient care but also achieve greater efficiency and long-term growth.
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
                                                Committed to Client Success
                                            </>
                                        ),
                                        description: (
                                            <>
                                                At Grey InfoTech, we define our success by the measurable impact we
                                                create for our clients. Our team is committed to delivering tailored
                                                healthcare software solutions that align with your organization’s goals,
                                                improve operational efficiency, and enhance patient outcomes. By
                                                combining technical expertise with a deep understanding of healthcare
                                                requirements, we ensure every solution is designed for scalability,
                                                security, and long-term value, empowering your business to achieve
                                                sustainable growth and lasting success.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        subtitle: "02",
                                        title: (
                                            <>
                                                Expertise You Can Trust
                                            </>
                                        ),
                                        description: (
                                            <>
                                                With extensive experience in healthcare software development, we bring a
                                                wealth of proven expertise to every project. Our deep understanding of
                                                the industry’s unique challenges, regulatory requirements, and
                                                operational complexities enables us to design and deliver solutions that
                                                drive meaningful impact. By combining technical proficiency with
                                                strategic insight, we create healthcare applications that enhance
                                                patient care, streamline workflows, and support providers in achieving
                                                measurable improvements in efficiency, compliance, and overall outcomes.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        subtitle: "03",
                                        title: (
                                            <>
                                                Unique Talents
                                            </>
                                        ),
                                        description: (
                                            <>
                                                Our team comprises top-tier professionals who blend exceptional
                                                technical expertise with a strong passion for innovation in healthcare.
                                                This combination allows us to approach even the most complex projects
                                                with precision, creativity, and strategic insight. By leveraging our
                                                skills and industry knowledge, we develop solutions that not only meet
                                                rigorous technical and regulatory standards but also drive meaningful
                                                improvements in patient care, operational efficiency, and overall
                                                healthcare outcomes.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 4,
                                        subtitle: "04",
                                        title: (
                                            <>
                                                Dynamic Organizational Culture
                                            </>
                                        ),
                                        description: (
                                            <>
                                                We cultivate a corporate culture grounded in integrity, collaboration,
                                                and continuous improvement, which serves as the foundation for all our
                                                endeavors. This ethos drives our team to consistently deliver
                                                high-quality healthcare software development services while maintaining
                                                a client-focused approach. By emphasizing ethical practices, teamwork,
                                                and ongoing innovation, we ensure that every solution not only meets
                                                technical and regulatory standards but also aligns with the unique goals
                                                and needs of our clients, fostering long-term partnerships and sustained
                                                success.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 5,
                                        subtitle: "05",
                                        title: (
                                            <>
                                                HIPAA & HL7 Compliance
                                            </>
                                        ),
                                        description: (
                                            <>
                                                We place the highest priority on data security and patient privacy,
                                                designing every application to fully comply with HIPAA, HL7, and
                                                relevant local healthcare regulations. Our solutions incorporate robust
                                                encryption, secure access controls, and comprehensive audit trails to
                                                protect sensitive information throughout its lifecycle. By embedding
                                                compliance and privacy measures into the core architecture, we ensure
                                                that healthcare organizations can confidently manage patient data while
                                                maintaining trust, safeguarding confidentiality, and meeting stringent
                                                regulatory standards.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 6,
                                        subtitle: "06",
                                        title: (
                                            <>
                                                End-to-End Development
                                            </>
                                        ),
                                        description: (
                                            <>
                                                From initial discovery to final deployment and beyond, our healthcare
                                                app development company manages the complete software lifecycle. We
                                                handle every aspect, including strategic planning, UI/UX design,
                                                development, rigorous quality assurance, and ongoing maintenance. This
                                                end-to-end approach ensures that each application is not only visually
                                                intuitive and technically robust but also reliable, secure, and
                                                optimized for long-term performance, enabling healthcare organizations
                                                to deliver seamless, high-quality experiences to both patients and
                                                providers.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 7,
                                        subtitle: "07",
                                        title: (
                                            <>
                                                Seamless Integration Solutions
                                            </>
                                        ),
                                        description: (
                                            <>
                                                We ensure seamless integration with EHR systems, remote patient
                                                monitoring (RPM) tools, and other third-party applications to streamline
                                                provider workflows and enhance data accessibility. By connecting
                                                disparate systems into a unified platform, our solutions enable
                                                healthcare professionals to access critical patient information in real
                                                time, reduce administrative burdens, and make more informed clinical
                                                decisions. This interoperability not only improves operational
                                                efficiency but also supports coordinated, patient-centered care across
                                                the entire healthcare ecosystem.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 8,
                                        subtitle: "08",
                                        title: (
                                            <>
                                                User-First Design
                                            </>
                                        ),
                                        description: (
                                            <>
                                                We design and develop intuitive, user-friendly interfaces for both
                                                healthcare practitioners and patients, enhancing engagement, usability,
                                                and overall experience. By prioritizing accessibility and clear
                                                navigation, our solutions make complex healthcare processes easier to
                                                understand and interact with, encouraging active participation from
                                                patients and enabling practitioners to deliver care more efficiently.
                                                This focus on interface design helps improve clinical outcomes, foster
                                                patient adherence, and create a seamless, satisfying experience across
                                                all touchpoints.
                                            </>
                                        ),
                                    }
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

            {/* Who is involved in the process */}
            <div id={'involved'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-10 mb-8 ${
                     isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:max-w-full mx-auto`}>
                    <div className={'lg:mr-[9em] md:mr-[2em]'}>
                        <h2 className='lg:text-[3em] md:text-[2em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                            who is involved <br className={'lg:block md:block hidden'}/>in the process
                        </h2>
                        <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify  leading-[1.5]'>
                            At Grey InfoTech, healthcare software development is managed by a dedicated team focused on
                            delivering secure, compliant, and scalable solutions that align with your business
                            objectives. A project manager oversees timelines, communication, and project milestones,
                            while software developers build robust systems to streamline workflows, handle sensitive
                            patient data, and integrate seamlessly with existing healthcare infrastructure.<br/><br/>

                            Supporting the core team are UI/UX designers who ensure intuitive and accessible interfaces,
                            QA specialists who rigorously test for functionality, security, and compliance, and DevOps
                            engineers who manage deployment and system stability. Your input is incorporated throughout,
                            ensuring the final product not only meets regulatory standards but also drives operational
                            efficiency and measurable business value.
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
                                    className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                <span
                                    className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-white' : 'border-black'} rounded-full"}></span>
                            </button>
                        </Link>
                    </div>
                    <div
                        className="relative flex flex-row lg:-ml-[2em] md:-ml-[1em] w-full h-auto max-w-full mx-auto gap-6">
                        <div className="flex-1 flex lg:-mr-[17.5em] md:-mr-[15.5em] justify-center items-center">
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
                                    className="object-fill mx-auto w-auto h-auto"
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
                                className="object-fill mx-auto w-auto h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div
                className={`relative lg:pt-[6em] md:pt-[6em] pt-[2em] lg:pb-[6em] md:pb-[6em] pb-[2em] max-w-full w-full  h-auto ${
                    isDayTime ? 'bg-white' : 'bg-black'
                }`}>
                <div
                    className={`relative mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div>
                        <h5 className="uppercase text-xs font-[500] tracking-widest mb-4">What our clients say</h5>
                    </div>
                    <div className={'lg:ml-[-20em] md:ml-[-20em]'}>
                        <div
                            className="flex items-start gap-4 text-[1.5em] font-[500] mb-6">
                            <Quote className="w-6 h-6 shrink-0"/>
                            <p className="leading-tight text-justify border-b-[0.1em] border-gray-300/20 pb-12">
                                {message}
                            </p>
                        </div>
                        <div className="flex ml-10 items-center gap-4">
                            <div>
                                <p className="font-semibold text-[1.3em]">{name}</p>
                                <p className="text-[0.8em] ">{title}</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-1">
                            <button onClick={prev} className="">
                                <ArrowLeft className="w-8 h-6"/>
                            </button>
                            <button onClick={next} className="">
                                <ArrowRight className="w-8 h-6"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[10em] md:pb-[10em] pb-[2em] lg:mb-[10em] md:mb-[10em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='capitalize lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            Frequently Asked <br className={'lg:block md:block hidden'}/>Questions In Healthcare
                            Software
                        </h2>
                        <p className={'text-[0.873em] font-[300] leading-[1.3]'}>
                            Our FAQ section addresses common questions about healthcare software development, from
                            compliance and security <br className={'lg:block md:block hidden'}/>to integration and
                            scalability. It provides clear insights to help healthcare organizations understand how
                            tailored software <br className={'lg:block md:block hidden'}/>can streamline operations,
                            improve patient care, and deliver long-term business value.
                        </p>
                    </div>
                </div>
                <div className='relative mx-auto px-4 sm:px-6 lg:px-[12em] space-y-2'>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(0)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none"
                        >
                            <span>Why is healthcare software development important?</span>
                            {onIndex === 0 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 0 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Custom healthcare software development plays a pivotal role in transforming healthcare
                                delivery by streamlining operations, enhancing patient care, and ensuring secure access
                                to critical medical data. Tailored solutions empower healthcare providers to deliver
                                more personalized and effective treatments, optimize resource utilization, and improve
                                decision-making through real-time insights. By addressing the unique challenges of each
                                organization, custom software not only drives operational efficiency but also
                                strengthens patient engagement and fosters long-term improvements in care quality and
                                outcomes.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What types of software are commonly developed for healthcare?</span>
                            {onIndex === 1 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 1 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Common types of healthcare software include electronic health record (EHR) systems,
                                telemedicine platforms, diagnostic and imaging tools, hospital management systems, and
                                patient engagement applications. Each of these solutions addresses a specific need
                                within the healthcare ecosystem—EHRs centralize patient data for improved care
                                coordination, telemedicine platforms enable remote consultations and continuous
                                monitoring, diagnostic tools assist with accurate and timely decision-making, hospital
                                management systems streamline administrative and clinical workflows, while patient
                                engagement applications empower individuals to actively participate in managing their
                                health. Together, these software solutions enhance efficiency, reduce costs, and
                                ultimately improve patient outcomes.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>How can healthcare software improve patient care?</span>
                            {onIndex === 2 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 2 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Healthcare software development services play a pivotal role in transforming patient
                                care by enabling real-time data collection and analysis, fostering seamless
                                communication between providers and patients, and supporting personalized treatment
                                plans tailored to individual needs. By integrating advanced technologies such as AI,
                                IoT, and cloud solutions, these services empower healthcare organizations to deliver
                                faster, more accurate, and patient-centric care. The result is improved clinical
                                outcomes, greater operational efficiency, and a healthcare experience that is not only
                                more effective but also more accessible and responsive to patients’ needs.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are the key challenges in healthcare software development?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Key challenges in custom healthcare software development include maintaining the highest
                                levels of **data security and patient privacy**, ensuring strict compliance with
                                regulations such as **HIPAA, HL7, and GDPR**, and achieving seamless **integration with
                                existing medical systems and third-party tools**. Additionally, developers must meet the
                                sector’s **stringent requirements for accuracy, reliability, and interoperability**, as
                                even minor errors can have critical consequences for patient outcomes. Balancing
                                innovation with regulatory and operational constraints is essential to delivering safe,
                                effective, and future-proof healthcare solutions.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What are the latest trends in healthcare software development?</span>
                            {onIndex === 4 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 4 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The latest trends in healthcare software development are shaping a more connected,
                                efficient, and patient-centered industry. AI-driven diagnostics are enhancing accuracy
                                and speeding up clinical decision-making, while telemedicine advancements continue to
                                expand access to care beyond traditional facilities. IoT-enabled health monitoring
                                empowers real-time tracking of patient vitals, supporting preventive and continuous
                                care. mHealth apps are driving patient engagement and self-management, and cloud-based
                                data management solutions ensure secure, scalable, and collaborative handling of vast
                                healthcare datasets. Together, these innovations are redefining the way healthcare is
                                delivered and experienced.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>How do you ensure the security and privacy of patient data?</span>
                            {onIndex === 5 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 5 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                At our custom healthcare software development company, we prioritize data security at
                                every stage of the development process. We implement **advanced encryption methods,
                                multi-layer authentication, and role-based access controls** to safeguard sensitive
                                health information. Our solutions are fully compliant with global healthcare regulations
                                such as **HIPAA and GDPR**, ensuring that patient data is always handled with the
                                highest level of confidentiality and integrity. In addition, we conduct **regular
                                security audits, vulnerability assessments, and continuous monitoring** to proactively
                                identify and eliminate potential risks, giving healthcare providers and patients
                                complete confidence in the safety of their data.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What is the time required to create a healthcare software or app?</span>
                            {onIndex === 6 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 6 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The time required to create a healthcare software or app depends on its scope and
                                complexity. A minimum viable product (MVP) focused on core features can typically be
                                developed within 2 to 3 months. However, a comprehensive, feature-rich healthcare
                                solution with advanced functionalities such as EHR integration, telemedicine, AI-driven
                                insights, and strict regulatory compliance may take anywhere from 6 to 12 months to
                                design, develop, and deploy.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What are the most important compliance guidelines for healthcare software or apps?</span>
                            {onIndex === 7 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 7 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Healthcare software and apps must adhere to strict regulatory standards to ensure data
                                security, patient privacy, and legal compliance. In the United States, compliance with
                                the Health Insurance Portability and Accountability Act (HIPAA) is mandatory to protect
                                sensitive patient information. For applications serving users in the European Union, the
                                General Data Protection Regulation (GDPR) governs data protection and user privacy.<br/><br/>
                                Beyond these, depending on your target market, your app may also need to comply with
                                frameworks such as HL7/FHIR for healthcare data exchange, ISO 13485 for medical device
                                software, and regional healthcare regulations. A skilled healthcare app development
                                partner will help you navigate these requirements, ensuring your solution aligns with
                                global best practices for safeguarding patient data and maintaining trust.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What should a healthcare software or app have?</span>
                            {onIndex === 8 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 8 && (
                            <div className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                <p className={'mb-2'}>
                                    A robust healthcare application must combine security, usability, and compliance
                                    while addressing the needs of patients, providers, and administrators. Core
                                    functionalities should include:
                                </p>
                                <ul className={'list-disc ml-[1.3em] mb-2'}>
                                    <li><span
                                        className={'font-[500]'}>User Authentication & Access Control:</span> Secure
                                        login and role-based permissions to safeguard sensitive data.
                                    </li>
                                    <li><span className={'font-[500]'}>Data Encryption:</span> End-to-end encryption for
                                        all stored and transmitted information to ensure confidentiality.
                                    </li>
                                    <li><span className={'font-[500]'}>Secure Messaging:</span> Encrypted communication
                                        channels between patients and healthcare providers.
                                    </li>
                                    <li><span className={'font-[500]'}>Appointment Scheduling:</span> Seamless tools for
                                        booking, rescheduling, and managing consultations.
                                    </li>
                                    <li><span
                                        className={'font-[500]'}>Electronic Health Record (EHR) Integration:</span> Unified
                                        access to patient histories, lab results, and prescriptions.
                                    </li>
                                    <li><span
                                        className={'font-[500]'}>Telemedicine & Video Consultations:</span> HIPAA-compliant
                                        virtual care options with secure video conferencing.
                                    </li>
                                    <li><span
                                        className={'font-[500]'}>Notifications & Reminders:</span> Personalized alerts
                                        for appointments, medication schedules, and follow-ups.
                                    </li>
                                    <li><span
                                        className={'font-[500]'}>Analytics & Reporting:</span> Insights to support
                                        clinical decisions and operational improvements.
                                    </li>
                                </ul>
                                <p>Together, these features enable a healthcare app to deliver efficient, secure, and
                                    patient-centered care, while also streamlining provider workflows.</p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(9)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Which technologies are often utilized in healthcare software or app development?</span>
                            {onIndex === 9 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 9 && (
                            <div className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                <p className={'mb-2'}>
                                    Healthcare software development requires reliable, scalable, and secure technologies
                                    to meet industry demands. Commonly used technologies include:
                                </p>
                                <ul className={'list-disc ml-[1.3em] mb-2 space-y-[0.3em]'}>
                                    <li><span
                                        className={'font-[500]'}>Mobile App Development:</span><br/>Swift for iOS
                                        applications.<br/>Kotlin for Android applications.<br/>
                                        React Native and Flutter for cross-platform development.
                                    </li>
                                    <li><span className={'font-[500]'}>Backend & Web Technologies:</span><br/>Node.js,
                                        .NET, Java, and Python for building secure and scalable server-side
                                        applications.<br/>
                                        Angular and React.js for user-friendly web interfaces.
                                    </li>
                                    <li><span className={'font-[500]'}>Cloud & Infrastructure:</span><br/>AWS, Microsoft
                                        Azure, and Google Cloud for secure, HIPAA-compliant hosting, storage, and
                                        scalability.
                                    </li>
                                    <li><span className={'font-[500]'}>Databases & Integration:</span><br/>PostgreSQL,
                                        MySQL, MongoDB, and Firebase for managing health data.<br/>
                                        APIs for seamless integration with EHR/EMR systems, IoT devices, and third-party
                                        healthcare tools.
                                    </li>
                                    <li><span
                                        className={'font-[500]'}>Security & Compliance Tools:</span><br/>End-to-end
                                        encryption, role-based access control, and compliance frameworks for HIPAA,
                                        GDPR, and HL7 standards.
                                    </li>
                                </ul>
                                <p>These technologies work together to deliver secure, scalable, and patient-centered
                                    healthcare solutions tailored to providers’ and patients’ evolving needs.</p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(10)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What steps do you take to secure data in healthcare software or apps?</span>
                            {onIndex === 10 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 10 && (
                            <div className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                <p className={'mb-2'}>
                                    Protecting sensitive healthcare data is a top priority, and we implement
                                    multi-layered security measures to ensure complete confidentiality and compliance.
                                    Key steps include:
                                </p>
                                <ul className={'list-disc ml-[1.3em] mb-2 space-y-[0.3em]'}>
                                    <li><span
                                        className={'font-[500]'}>Data Encryption:</span><br/>Strong encryption protocols
                                        safeguard data both in transit and at rest, preventing unauthorized access.
                                    </li>
                                    <li><span
                                        className={'font-[500]'}>Authentication & Access Control:</span> Multi-factor
                                        authentication (MFA) and role-based access ensure only authorized users can
                                        access sensitive information.
                                    </li>
                                    <li><span className={'font-[500]'}>Secure Cloud Infrastructure:</span> HIPAA- and
                                        GDPR-compliant cloud storage solutions provide scalability while maintaining the
                                        highest security standards.
                                    </li>
                                    <li><span className={'font-[500]'}>Regular Security Audits:</span> Continuous
                                        penetration testing, code reviews, and vulnerability assessments to proactively
                                        identify and resolve risks.
                                    </li>
                                    <li><span
                                        className={'font-[500]'}>Regulatory Compliance:</span> Strict adherence to
                                        HIPAA, GDPR, and HL7 to ensure the highest level of trust and legal compliance.
                                    </li>
                                </ul>
                                <p>By combining these safeguards, we guarantee that healthcare applications remain
                                    secure, reliable, and fully compliant with industry standards.</p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(11)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Do healthcare software or apps need to integrate with existing hospital systems?</span>
                            {onIndex === 11 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 11 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Yes. Seamless integration is essential to ensure efficiency, accuracy, and better
                                patient outcomes. Healthcare applications can be connected with existing Hospital
                                Management Systems (HMS), Electronic Health Records (EHR), Laboratory Information
                                Systems (LIS), and even medical devices for real-time monitoring. A reliable healthcare
                                software development partner will enable smooth interoperability, ensuring secure data
                                flow, streamlined workflows, and enhanced care delivery without disrupting existing
                                operations.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(12)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What kind of support is offered after launching the software or app?</span>
                            {onIndex === 12 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 12 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Post-launch support is essential to ensure long-term success. It typically includes bug
                                fixes, regular updates, performance monitoring, and incorporating user feedback. A
                                trusted healthcare software development company will also provide ongoing maintenance,
                                security enhancements, and compliance updates, ensuring your solution continues to meet
                                regulatory standards, adapts to evolving user needs, and delivers consistent value to
                                your healthcare business.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(13)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What ROI can be expected from investing in custom healthcare software or apps?</span>
                            {onIndex === 13 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 13 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Investing in custom healthcare solutions delivers measurable returns. Clients often
                                experience a 20–40% reduction in operational costs through optimized workflows, a 15–30%
                                improvement in patient engagement via personalized features, and a 10–25% increase in
                                patient retention. Beyond these metrics, custom healthcare apps enhance clinical
                                efficiency, strengthen patient satisfaction, and provide long-term value by supporting
                                scalable, data-driven, and patient-centered care.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default Healthcare;