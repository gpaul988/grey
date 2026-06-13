'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import {FaOilWell} from "react-icons/fa6";
import {IoMdAnalytics} from "react-icons/io";
import {GiOilPump, GiRefinery} from "react-icons/gi";
import {PiTruck} from "react-icons/pi";
import {SlEnergy} from "react-icons/sl";
import {FaCode, FaRocket} from "react-icons/fa";


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
            <>Custom Oil & Gas Software Development</>
        ),
        description: (
            <>
                Our team brings extensive expertise in oil and gas technology development, delivering solutions
                specifically tailored for production operations. We design enterprise-grade systems capable of managing
                large volumes of data, automating critical workflows, and translating complex business logic into
                intuitive web and mobile experiences across Android and iOS platforms. Whether starting a project from
                scratch or taking over an existing initiative, our dedicated development team can rapidly scale and
                accelerate progress, ensuring that milestones are met and projects are delivered on schedule. By
                combining deep industry knowledge with agile development practices, we help organizations optimize
                operations, improve efficiency, and achieve measurable business outcomes.
            </>
        ),
        images: ['/assets/oil/Image.jpg']
    },
    {
        id: 2,
        title: (
            <>App Modernization for Oil & Gas Company</>
        ),
        description: (
            <>
                We help oil and gas companies modernize their IT infrastructure to fully leverage digitalization and
                optimize production processes. With extensive experience in desktop and web technologies, we understand
                the unique challenges involved in updating or replacing legacy systems. Over the years, we have honed
                our expertise in cloud migration, desktop-to-web migration, architecture redesign, and continuous
                delivery, enabling seamless transitions that maintain operational continuity. Our team follows proven
                migration and implementation strategies to ensure data security, regulatory compliance, and zero
                disruption to ongoing operations, empowering organizations to unlock efficiency, scalability, and
                measurable business value from their modernized IT environment.
            </>
        ),
        images: ['/assets/oil/Image-1.png']
    },
    {
        id: 3,
        title: (
            <>Oil & Gas Software Redesign</>
        ),
        description: (
            <>
                We help oil and gas companies maximize the value of their existing software investments while
                maintaining a competitive edge through modern, up-to-date application development. By identifying system
                gaps and executing strategic redesigns, we bring together UX/UI designers, developers, system
                architects, DevOps specialists, and QA engineers to create elegant, efficient solutions that streamline
                workflows and enhance user experience. Leveraging best practices and agile methodologies, our teams
                ensure applications are intuitive, easy to navigate, and engaging for users, eliminating frustration
                while optimizing operational efficiency and supporting long-term business objectives.
            </>
        ),
        images: ['/assets/oil/Image-2.png']
    },
    {
        id: 4,
        title: (
            <>Performance Optimization</>
        ),
        description: (
            <>
                Our team combines deep expertise in both conventional and modern approaches to provide a comprehensive
                review of your oil and gas software, covering everything from system architecture to user interface
                design. We identify inefficiencies and potential issues that may hinder performance and propose tailored
                solutions aligned with your business objectives. By analyzing data trends, developing custom models, and
                deploying cutting-edge technologies, we ensure that your software delivers faster, more reliable
                performance, transforming even the most complex and demanding operations into seamless, manageable
                processes. Our focus remains on optimizing efficiency, enhancing user experience, and enabling
                measurable improvements across your oil and gas operations.
            </>
        ),
        images: ['/assets/oil/Image-3.png']
    },
    {
        id: 5,
        title: (
            <>Modern & Conventional Approaches</>
        ),
        description: (
            <>
                Grey InfoTech is a trusted outsourcing partner for leading players in the oil and gas sector, bringing
                nearly a decade of industry-specific experience. We design world-class exploration and production (E&P)
                software that maximizes operational efficiency, optimizes workflows, and enhances risk management across
                the entire value chain. Our solutions cover every stage of upstream, midstream, and downstream
                operations—from exploration and drilling to transportation and gas station distribution—while addressing
                the unique requirements and niche workflows of each company. Through custom software development
                tailored to established processes, we enable enterprises to streamline operations, improve
                decision-making, and achieve strategic business objectives with greater speed, accuracy, and
                reliability.
            </>
        ),
        images: ['/assets/oil/Image-4.png']
    },
    {
        id: 6,
        title: (
            <>Oil & Gas Software Development Consulting</>
        ),
        description: (
            <>
                As a specialized oil and gas software development company, we provide expert guidance to help clients
                select the most suitable system architecture during the product discovery phase and oversee end-to-end
                project implementation and maintenance. Our approach emphasizes close collaboration between stakeholders
                and our technical team to ensure alignment with business goals. We manage every aspect of the software
                lifecycle, including mapping workflows and processes, designing robust architectures, migrating
                databases, and integrating new solutions with existing systems. By combining industry expertise with
                advanced technical capabilities, we deliver solutions that enhance operational efficiency, streamline
                decision-making, and support sustainable growth across oil and gas operations.
            </>
        ),
        images: ['/assets/oil/Image-5.png']
    },
];

const OilAndGas = () => {
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
            "USS ",
            "MSS ",
            "DSS ",
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
        }, 10000); // 10000ms = 10 seconds
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
            title: "OIL & GAS PRODUCTION SOFTWARE",
            heading: "Oil & Gas Production Software",
            description: (<>
                Our teams engineer advanced solutions that streamline and optimize production processes while automating
                monitoring across critical operations, ensuring consistently high output and minimizing costly downtime.
                Leveraging real-time data acquisition and sophisticated analytics, these solutions empower operators
                with actionable insights for proactive management, predictive maintenance, and immediate response to
                anomalies before they escalate. By unifying operational data into a centralized, intelligent ecosystem,
                we enable greater visibility, control, and collaboration across production teams, enhancing safety
                standards, maximizing asset utilization, and driving measurable improvements in both performance and
                cost efficiency.
            </>),
            icon: <FaOilWell/>,
        },
        {
            number: "02",
            title: "OIL & GAS ANALYSIS SOFTWARE",
            heading: "Oil & Gas Analysis Software",
            description: (<>
                For the analytical side of business, Grey InfoTech delivers advanced data management and analytics
                solutions designed to transform raw information into actionable intelligence, enabling faster and more
                accurate decision-making. These tools not only streamline workflows but also uncover hidden patterns,
                identify operational trends, and provide predictive insights to support future planning. By empowering
                businesses with precise forecasting and optimized resource allocation, our solutions drive efficiency,
                reduce risks, and ultimately maximize profitability while ensuring that organizations remain agile and
                competitive in a rapidly evolving market.
            </>),
            icon: <IoMdAnalytics/>,
        },
        {
            number: "03",
            title: "OIL & GAS TRANSPORTATION APPLICATION",
            heading: "Oil & Gas Transportation Application",
            description: (<>
                We develop robust transportation software tailored for the oil and gas industry, designed to streamline
                logistics, optimize routes, and ensure the safe, timely delivery of critical resources. By integrating
                advanced scheduling, automated dispatching, and intelligent route optimization, our solutions help
                reduce transportation costs, minimize downtime, and improve overall operational efficiency. With
                built-in real-time tracking, monitoring, and reporting capabilities, companies gain complete visibility
                and control over fleet operations, enabling proactive decision-making, enhanced compliance with industry
                standards, and greater reliability across the supply chain.
            </>),
            icon: <PiTruck/>,
        },
        {
            number: "04",
            title: "PIPELINE MANAGEMENT SOLUTIONS",
            heading: "Pipeline Management Solutions",
            description: (<>
                To safeguard the integrity and reliability of pipeline infrastructure, we develop advanced software
                solutions equipped with real-time monitoring, predictive maintenance, and intelligent resource
                allocation features. These applications leverage IoT sensors, advanced analytics, and automated alert
                systems to detect anomalies early, anticipate potential failures, and optimize maintenance schedules,
                significantly reducing downtime and operational risks. Built with rigorous security protocols and
                compliance measures, the software ensures that data remains protected while enabling operators to
                maintain continuous, safe, and efficient pipeline operations, ultimately improving asset lifespan and
                operational resilience.
            </>),
            icon: <FaCode/>,
        },
        {
            number: "05",
            title: "FIELD SERVICE MANAGEMENT SOFTWARE",
            heading: "Field Service Management Software",
            description: (<>
                Grey InfoTech is a specialized oil and gas software company focused on automating both routine and
                complex operational tasks to drive efficiency and performance. We build intelligent solutions that
                streamline scheduling, dispatching, and field operation tracking, enabling faster response times,
                reduced downtime, and higher productivity across assets. In addition, our team develops secure,
                user-friendly mobile applications tailored for field workers, providing seamless access to critical
                information, real-time updates, and improved communication, ultimately enhancing decision-making and
                ensuring operational excellence from the field to the control room.
            </>),
            icon: <GiOilPump/>,
        },
        {
            number: "06",
            title: "ASSETS MANAGEMENT SYSTEMS",
            heading: "Assets Management Systems",
            description: (<>
                Grey InfoTech helps oil and gas companies efficiently track, manage, and optimize assets across their
                entire lifecycle, ensuring maximum utilization, reduced downtime, and lower maintenance costs. Our asset
                management software provides a centralized platform with comprehensive asset data, performance insights,
                and predictive maintenance capabilities, empowering decision-makers with the information needed to
                extend asset life, improve operational reliability, and enhance capital planning. By integrating
                real-time monitoring and advanced analytics, we enable organizations to streamline asset-intensive
                operations while maintaining compliance, minimizing risks, and driving sustainable business performance.
            </>),
            icon: <FaRocket/>,
        },
        {
            number: "07",
            title: "ENERGY MANAGEMENT SOLUTIONS",
            heading: "Energy Management Solutions",
            description: (<>
                At Grey InfoTech, we design oil and gas software solutions centered on advanced energy management
                functionality and compliance with industry-specific protocols. Our systems enable organizations to
                monitor and optimize energy consumption in real time, reduce waste, and drive operational efficiency,
                while ensuring adherence to stringent environmental and regulatory requirements. By integrating
                sophisticated energy-control mechanisms and analytics, we empower companies to achieve measurable
                sustainability goals, lower operating costs, and maintain a competitive edge in a rapidly evolving
                energy landscape.
            </>),
            icon: <SlEnergy/>,
        },
        {
            number: "08",
            title: "INTEGRATED REFINERY INFORMATION SYSTEM (IRIS)",
            heading: "Integrated Refinery Information System (IRIS)",
            description: (<>
                At Grey InfoTech, we design oil and gas software solutions centered on advanced energy management
                functionality and compliance with industry-specific protocols. Our systems enable organizations to
                monitor and optimize energy consumption in real time, reduce waste, and drive operational efficiency,
                while ensuring adherence to stringent environmental and regulatory requirements. By integrating
                sophisticated energy-control mechanisms and analytics, we empower companies to achieve measurable
                sustainability goals, lower operating costs, and maintain a competitive edge in a rapidly evolving
                energy landscape.
            </>),
            icon: <GiRefinery/>,
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
            <Header/>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Hero Section */}
            <div id={'hero'}
                 className={"relative overflow-hidden lg:w-full lg:h-[720px] justify-center items-center md:w-full md:h-[700] w-full h-[700] pb-6"}>
                <video
                    src="/assets/oil/hero.webm"
                    autoPlay
                    loop
                    muted
                    className="lg:w-full lg:h-[720px] md:w-full md:h-[700] w-full h-[700] object-cover"
                />
                <div
                    className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start text-start lg:max-w-full px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                        isDayTime ? 'text-white' : 'text-white'}`}>
                    <div
                        className="flex flex-col justify-start items-start border-b pb-[0.3em] border-gray-500/50 max-w-full w-full mx-auto ">
                        <h1
                            className={`px-0 constant-text lg:text-[5.35em] md:text-[4.4em] sm:text-[3.5em] text-[2em] lg:mt-[3em] md:mt-[3em] mt-[4em] w-auto h-auto leading-[1.1] font-[600]`}>
                            Oil & Gas Software <br className={'lg:block md:block hidden'}/>Development Services
                        </h1>
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                        <div className={'lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em] md:mt-[1em]'}>
                            <p className={'text-[0.87em] font-[300]'}>
                                Ready to elevate your operations, maximize profitability, and strengthen security? Our
                                data-driven software solutions optimize every stage of your workflow—from drilling to
                                distribution—ensuring efficiency, accuracy, and measurable business impact.
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
                            Smarter software for <br className={'lg:block md:block hidden'}/>energy innovation
                            applications
                        </h6>
                    </div>
                    <div className='lg:-ml-[25em] md:-ml-[16em]'>
                        <div className={'md:pl-[6em] sm:break-words sm:whitespace-normal'}>
                            <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                                Driving Efficiency with <br className={'lg:block md:block hidden'}/>Tailored Oil & Gas
                                Solutions
                            </h3>
                            <div
                                className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                                <div>
                                    <p>
                                        At Grey InfoTech, we specialize in driving operational efficiency and
                                        competitive advantage across every stage of oil and gas production. Our tailored
                                        solutions span upstream, midstream, and downstream operations, designed for
                                        scalability and aligned with your unique business needs. Whether developing
                                        business process automation software from the ground up or modernizing complex
                                        legacy systems, we deliver technology that enhances performance, reduces risk,
                                        and supports long-term growth.
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        We take a strategic, proactive approach to oil and gas software development,
                                        leveraging Agile methodologies and DevOps practices to ensure rapid delivery of
                                        high-quality solutions. Our team of seasoned software engineers combines deep
                                        domain expertise with technical excellence, creating tools for process
                                        automation, data analysis, and operational optimization that meet the rigorous
                                        demands of the oil and gas sector while delivering measurable business impact.
                                    </p>
                                </div>
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
                                src={'/assets/oil/cta-1.jpg'}
                                alt={'Oil and gas Tech'}
                                width={1396}
                                height={1440}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/oil/cta-2.jpg'}
                                alt={'code explaination '}
                                width={1396}
                                height={1440}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Oil and Gas Software solution */}
            <div className={`lg:pt-[2em] md:pt-[2em] pt-[0.5em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'oil-and-gas-software-solutions'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3.3em] md:text-[2.5em] sm:text-[2em] text-[2em] font-[500] justify-center tracking-tight leading-[1.1]`}>
                                Oil & Gas <br className={'lg:block md:block hidden'}/>Software Solution
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] md:-ml-[3.5em] tracking-noromal'>
                                Our oil and gas software solutions empower energy companies to optimize performance
                                across the entire value chain, from exploration and production to distribution and asset
                                management. By leveraging advanced analytics, automation, and secure system integration,
                                we deliver scalable platforms that improve operational visibility, streamline complex
                                workflows, and enhance data-driven decision-making. With a focus on efficiency, cost
                                reduction, and long-term sustainability, our solutions are tailored to help
                                organizations remain competitive in a rapidly evolving energy landscape
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
                                    {id: "01", title: "Upstream Software Solutions", target: "USS"},
                                    {id: "02", title: "Midstream Software Solutions", target: "MSS"},
                                    {id: "03", title: "Downstream Software Solutions", target: "DSS"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[4em] lg:mb-[26em] md:mb-[28em]'}>
                            <div
                                className="grid lg:grid-cols-[50px_auto] md:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 md:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'USS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Upstream Software Solutions
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data Analytics</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Simulation Capabilities</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Optimised Drilling</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Predictive Insights</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Upstream oil and gas engineering software is designed to transform the way
                                        exploration and production activities are managed by leveraging advanced data
                                        analytics, modeling, and simulation capabilities. These solutions empower
                                        operators to interpret complex geological data with greater precision, optimize
                                        drilling and well-placement strategies, and improve reservoir management to
                                        maximize hydrocarbon recovery. By integrating real-time monitoring and
                                        predictive insights, upstream software reduces operational risks, enhances
                                        safety, and minimizes non-productive time, ultimately leading to improved asset
                                        performance and lower costs. Beyond efficiency gains, it supports strategic
                                        decision-making by providing stakeholders with accurate, actionable
                                        intelligence, ensuring that exploration and production initiatives are both
                                        cost-effective and sustainable in today’s competitive energy landscape.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'MSS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Midstream Software Solutions
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Predictive Maintenance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Leaks Detection</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Uninterrupted Product Flow</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Regulatory Compliance</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Midstream oil and gas engineering software streamlines the complex processes of
                                        transportation, storage, and distribution by integrating real-time monitoring,
                                        pipeline integrity management, and logistics optimization into a single
                                        solution. These tools enhance operational reliability through predictive
                                        maintenance, leak detection, and automated scheduling, ensuring uninterrupted
                                        product flow across vast networks. With advanced analytics, midstream operators
                                        can maximize capacity utilization, reduce downtime, and maintain regulatory
                                        compliance while optimizing supply chain visibility. By improving
                                        decision-making and minimizing operational risks, midstream software ensures
                                        that energy delivery is efficient, secure, and cost-effective, reinforcing
                                        business continuity and long-term profitability.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'DSS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Downstream Software Solutions
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Optimised Refining</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data-Driven Insight</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Quality Control</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Predictive Analytics</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Downstream oil and gas engineering software is built to optimize refining,
                                        processing, and distribution operations, ensuring maximum yield and efficiency
                                        at every stage of the value chain. These solutions leverage data-driven insights
                                        to improve refinery planning, monitor plant performance, and reduce energy
                                        consumption, while maintaining strict adherence to environmental and safety
                                        standards. By automating quality control, inventory management, and distribution
                                        logistics, downstream software helps operators minimize costs, maximize
                                        throughput, and deliver products reliably to market. With advanced reporting and
                                        predictive analytics, downstream operators can make smarter, faster decisions
                                        that enhance competitiveness, strengthen compliance, and secure sustainable
                                        growth in a rapidly evolving energy landscape.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'}
                 className={'lg:-mt-[32em] md:-mt-[28em] sm:-mt-[3em] -mt-[3em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/oil/cta-3.jpg'}
                    alt={'Gas and Methane Plant'}
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
                                We deliver end-to-end oil and gas software development capabilities, from custom
                                applications and data analytics platforms to asset management and workflow automation.
                                Our expertise enables energy companies to optimize exploration, production, and
                                distribution processes while ensuring security, scalability, and regulatory compliance.
                                By aligning technology with business objectives, we help organizations achieve greater
                                efficiency, reduce costs, and drive sustainable growth
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

            {/* Trends in Oil  and Gas Software Development */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[6em] md:pt-[6em] pt-[1.2em] lg:pb-[6em] md:pb-[6em] pb-[1.2em] mt-14`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div className={'lg:mr-[7em]'}>
                            <h2 className={`lg:text-[3.1em] md:text-[3.1em] text-[1.5em] font-[500] justify-center tracking-tight lg:mb-12 mb-7 leading-[1.2]`}>
                                Trends in Oil and Gas <br className={'lg:block md:block hidden'}/>
                                Software Development
                            </h2>
                            <p className={'text-[0.873em] font-[400] leading-[1.5] tracking-normal text-justify'}>
                                Oil and gas software development is evolving with trends such as digital twins,
                                IoT-enabled monitoring, predictive analytics, cloud-based platforms, and automation of
                                operational workflows. These innovations enable companies to improve operational
                                efficiency, enhance safety, optimize production, and make data-driven decisions, helping
                                them remain competitive in a rapidly changing energy landscape.
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
                                    <span>Low-Code & No-Code App Development</span>
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
                                        Low-code and no-code software solutions are transforming the oil and gas
                                        industry by enabling rapid application development with minimal manual coding.
                                        These platforms empower companies to design custom applications for operational
                                        monitoring, reporting, and optimization, significantly reducing development time
                                        and costs while maintaining flexibility and scalability. By simplifying the
                                        creation and deployment of digital tools, low-code and no-code approaches allow
                                        oil and gas businesses to respond quickly to evolving operational needs,
                                        streamline workflows, and accelerate innovation across upstream, midstream, and
                                        downstream processes.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(1)}
                                    className="flex items-center mt-6 justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span className={'lg:leading-[1.2] md:leading-[1.2]'}>Robotic Process Automation (RPA)</span>
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
                                        Robotic Process Automation (RPA) is revolutionizing operational efficiency by
                                        automating repetitive tasks such as data entry, invoice processing, and
                                        compliance reporting. By reducing reliance on manual processes, RPA not only
                                        enhances accuracy and minimizes human error but also accelerates workflows and
                                        ensures consistent adherence to regulatory requirements. This automation frees
                                        employees to focus on strategic, value-added initiatives, driving productivity,
                                        operational excellence, and measurable cost savings across the organization.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(2)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Artificial Intelligence (AI) & Machine Learning (ML)</span>
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
                                        Artificial Intelligence (AI) and Machine Learning (ML) are transforming oil and
                                        gas operations by enabling predictive maintenance, optimizing reservoir
                                        management, and improving drilling efficiency. By analyzing vast and complex
                                        datasets, these technologies identify hidden patterns, forecast potential
                                        outcomes, and provide actionable insights that enhance operational
                                        decision-making. The result is increased efficiency, reduced operational costs,
                                        minimized downtime, and improved resource utilization, allowing companies to
                                        make data-driven decisions that maximize production performance and maintain a
                                        competitive edge in a dynamic energy market.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(3)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Internet of Things (IoT)</span>
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
                                        IoT software for the oil and gas industry connects equipment, sensors, and
                                        control systems to collect real-time data across oil fields, pipelines, and
                                        refineries. This continuous flow of information enables remote monitoring,
                                        predictive maintenance, and advanced operational analytics, providing actionable
                                        insights that enhance safety, minimize downtime, and optimize overall
                                        performance. By integrating IoT solutions into operations, companies gain
                                        greater visibility, improve asset utilization, and make data-driven decisions
                                        that drive efficiency, reliability, and long-term profitability across upstream,
                                        midstream, and downstream processes.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(4)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span
                                        className={'lg:leading-[1.2] md:leading-[1.2]'}>Advanced analytics & Big Data</span>
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
                                        Advanced analytics and Big Data are empowering the oil and gas industry to make
                                        more informed, data-driven decisions by processing vast and complex datasets.
                                        These solutions enable companies to optimize production, forecast demand, detect
                                        anomalies, and anticipate operational issues before they escalate, reducing
                                        risks and minimizing downtime. By leveraging predictive insights and
                                        comprehensive reporting, organizations can improve operational efficiency,
                                        enhance resource allocation, and drive more strategic, cost-effective
                                        decision-making across upstream, midstream, and downstream operations.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(5)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span
                                        className={'lg:leading-[1.2] md:leading-[1.2]'}>Cloud Computing & Edge Computing</span>
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
                                        Cloud and edge computing solutions provide scalable, secure, and flexible data
                                        management for the oil and gas industry. While cloud computing centralizes data
                                        storage and processing, enabling collaboration and long-term scalability, edge
                                        computing performs real-time analytics closer to the source, delivering faster
                                        insights, reducing latency, and supporting immediate operational
                                        decision-making. By combining these approaches, companies can optimize
                                        performance, enhance resource utilization, and improve responsiveness across
                                        upstream, midstream, and downstream operations, ensuring more efficient and
                                        data-driven workflows throughout their entire value chain.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(6)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span
                                        className={'lg:leading-[1.2] md:leading-[1.2]'}>Augmented Reality (AR) & Virtual Reality (VR)</span>
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
                                        Augmented Reality (AR) and Virtual Reality (VR) technologies are transforming
                                        training, maintenance, and remote collaboration in the oil and gas industry.
                                        These immersive solutions allow workers to simulate real-world scenarios,
                                        practice complex procedures, and visualize equipment or plant operations in a
                                        risk-free environment. By enhancing hands-on training, improving safety
                                        protocols, reducing training costs, and enabling more effective remote support,
                                        AR and VR technologies help organizations increase operational efficiency,
                                        minimize errors, and ensure workforce readiness for complex and high-risk tasks.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(7)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span
                                        className={'lg:leading-[1.2] md:leading-[1.2]'}>Blockchain Technology</span>
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
                                        Blockchain technology is enhancing transparency, traceability, and security
                                        across oil and gas operations by providing tamper-proof, decentralized records
                                        of transactions, contracts, and asset movements. These immutable ledgers help
                                        reduce fraud, streamline auditing, and improve regulatory compliance while
                                        simplifying complex supply chain processes. By integrating blockchain into
                                        operational workflows, companies gain greater accountability, optimize resource
                                        tracking, and foster trust among stakeholders, ultimately enabling more
                                        efficient, secure, and data-driven decision-making throughout the energy value
                                        chain.
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
                                Benefits of Partnering <br className={'lg:block md:block hidden'}/>With Us for Oil
                                &
                                Gas <br className={'lg:block md:block hidden'}/>Software Development
                            </h2>
                        </div>
                        <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                            <p className={'text-justify text-[0.87em] font-[300]'}>
                                Partnering with us gives energy companies access to deep industry expertise, advanced
                                technology solutions, and a collaborative approach focused on business outcomes. We
                                deliver secure, scalable, and data-driven software that optimizes operations, enhances
                                decision-making, reduces costs, and drives long-term growth—helping organizations remain
                                competitive in a complex and rapidly evolving oil and gas landscape.
                            </p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div
                        className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]`}>
                        <div id={'increased-efficiency'}>
                            <Image
                                src={isDayTime ? '/assets/oil/icon/test.svg' : '/assets/oil/icon/test1.svg'}
                                alt={'Increased Efficiency'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Increased Efficiency
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Achieve substantial operational efficiency by automating critical processes within the
                                oil and gas industry. Business process automation software can handle tasks ranging from
                                routine data entry to complex data analysis, streamlining workflows, reducing
                                bottlenecks, and ensuring consistent accuracy. By minimizing reliance on manual
                                intervention, these solutions lower the risk of human error, accelerate decision-making,
                                and enhance overall productivity, enabling companies to optimize resources, improve
                                operational reliability, and focus on strategic, value-driven initiatives.
                            </p>
                        </div>
                        <div id={'better decision making'}>
                            <Image
                                src={isDayTime ? '/assets/oil/icon/risk.svg' : '/assets/oil/icon/risk1.svg'}
                                alt={'Better Decision Making'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] lg:leading-[1.1] md:leading-[1.1] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.1em] font-[500] mb-8'}>
                                Better Decision Making
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Drive superior operational performance through enhanced decision-making enabled by
                                real-time access to critical data. Oil and gas software solutions provide actionable
                                insights into operational trends, resource utilization, and performance metrics,
                                empowering stakeholders to make informed, strategic decisions. By leveraging these
                                insights, companies can optimize workflows, improve efficiency, reduce risks, and
                                maximize asset performance, ensuring that every operational decision is accurate,
                                timely, and aligned with long-term business objectives.
                            </p>
                        </div>
                        <div id={'improved safety'}>
                            <Image
                                src={isDayTime ? '/assets/oil/icon/att.svg' : '/assets/oil/icon/att1.svg'}
                                alt={'Improved Safety'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] lg:leading-[1.1] md:leading-[1.1] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.1] mb-8'}>
                                Improved Safety
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Significantly enhance safety outcomes by deploying continuous, 24/7 monitoring systems
                                across oil and gas operations. These advanced systems provide constant oversight of
                                critical processes and assets, enabling the early detection of anomalies, potential
                                hazards, and operational risks. By facilitating proactive intervention and timely
                                mitigation measures, companies can prevent incidents, protect personnel and assets, and
                                ensure compliance with safety regulations, ultimately fostering a safer, more reliable,
                                and resilient operational environment.
                            </p>
                        </div>
                        <div id={'painless maintenance'}>
                            <Image
                                src={isDayTime ? '/assets/oil/icon/cust.svg' : '/assets/oil/icon/cust1.svg'}
                                alt={'Painless Maintenance '}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.1] mb-8'}>
                                Painless Maintenance
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Our dedicated QA team conducts comprehensive testing of healthcare software solutions to
                                Optimize maintenance operations with oil and gas software developed using the latest
                                technology stack. By leveraging modern architectures and tools, these solutions simplify
                                ongoing maintenance, reduce support complexities, and facilitate seamless future
                                upgrades, ensuring minimal disruption to daily operations. This approach not only
                                enhances system reliability and performance but also enables teams to focus on strategic
                                initiatives, streamline workflows, and maintain operational continuity across all
                                upstream, midstream, and downstream processes.
                            </p>
                        </div>
                        <div id={'greater scalability'}>
                            <Image
                                src={isDayTime ? '/assets/oil/icon/sca.svg' : '/assets/oil/icon/sca1.svg'}
                                alt={'Greater Scalability'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.1] mb-8'}>
                                Greater Scalability
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Enhance your operational agility and responsiveness to market fluctuations with oil and
                                gas software engineered for superior scalability. Its flexible architecture enables
                                organizations to quickly adapt to evolving demands, integrate new processes, and expand
                                system capabilities without disruption. By supporting seamless growth, real-time
                                adjustments, and efficient resource allocation, this approach empowers companies to
                                maintain a strong competitive position, optimize performance, and achieve long-term
                                business resilience in a dynamic and fast-paced energy market.
                            </p>
                        </div>
                        <div id={'interoperability across systems'}>
                            <Image
                                src={isDayTime ? '/assets/oil/icon/fastt.svg' : '/assets/oil/icon/fast1.svg'}
                                alt={'Interoperability Across Systems'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Interoperability Across Systems
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Achieve enhanced operational visibility through the robust interoperability of modern
                                oil and gas software solutions. These systems enable seamless integration with existing
                                infrastructure, connecting disparate applications, databases, and operational tools into
                                a unified, centralized data ecosystem. By providing a comprehensive, real-time view of
                                assets, workflows, and performance metrics, companies can make more informed decisions,
                                optimize resource utilization, reduce operational inefficiencies, and improve
                                collaboration across upstream, midstream, and downstream operations.
                                come.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* last image*/}
            <div id={' in-between'}
                 className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/oil/cta-4.jpg'}
                    alt={'Tank Storage'}
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
                            <span className={'text-teal-600'}>Oil</span> and <span
                            className={'text-teal-600'}>Gas</span> <br className={'lg:block md:block hidden'}/>Software
                            Solution<span
                            className={'text-teal-600'}>Spectrum</span>
                        </h1>
                        <p className={'text-justify text-[0.87em] font-[300] leading-normal mx-auto max-w-5xl'}>
                            Grey InfoTech provides end-to-end oil and gas software solutions—covering production,
                            operations, energy management, data analytics, and ERP systems—engineered to directly
                            support your strategic business objectives. With a focus on scalability, security, and
                            efficiency, our solutions are built to optimize critical processes, enhance operational
                            visibility, and drive data-informed decision-making. Leveraging deep industry expertise and
                            advanced technologies, we deliver robust, future-ready applications that create measurable
                            value and sustainable competitive advantage across the entire energy value chain.
                        </p>
                    </div>

                    <div
                        className={`flex max-w-full mx-auto ${isDesktop ? "flex-row h-[490px]" : "flex-col h-auto"}`}>
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
                                            <span className="text-[1.5em] font-[600] text-teal-600">
                                                {step.number}
                                            </span>

                                            <div
                                                className={`${isDesktop ? 'flex items-center justify-center h-full' : 'items-center w-full '}`}>
                                                <span
                                                    className={`text-[0.87em] font-[600] tracking-widest uppercase text-gray-400 ${
                                                        isDesktop ? "mt-3" : "ml-3"
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

                                                <span className="text-[1.5em] font-[600] text-teal-600">
                                                    {step.number}
                                                </span>

                                                <span
                                                    className={`text-[0.87em] font-[500] tracking-widest uppercase text-gray-400 ${
                                                        isDesktop ? 'mt-[2em]' : 'ml-3'}`}
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
                                    alt="Oil and gas technology solution showcase"
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
                     isDayTime ? 'text-black' : 'text-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:max-w-full mx-auto`}>
                    <div className={'lg:mr-[8em] md:mr-[2em]'}>
                        <h2 className='lg:text-[3em] md:text-[2em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                            who is involved <br className={'lg:block md:block hidden'}/>in the process
                        </h2>
                        <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify  leading-[1.5]'>
                            At Grey InfoTech, our Vue.js development services are executed by a highly skilled team
                            committed to building modern, efficient, and scalable applications. A dedicated project
                            manager leads the engagement, ensuring clear communication, progress tracking, and alignment
                            with your business goals. Vue.js developers focus on building responsive front-end
                            interfaces with clean architecture and seamless integration with your backend
                            systems.<br/><br/>

                            UI/UX designers enhance usability and interface appeal, while QA engineers rigorously test
                            functionality, performance, and compatibility across devices. DevOps specialists support the
                            deployment pipeline, ensuring secure, stable, and scalable delivery. Your input remains
                            central throughout the process, helping us craft a Vue.js solution that meets both your
                            technical and strategic business needs.
                        </p><br/>
                        <Link href='/company'>
                            <button
                                className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-[3%]`}></span>
                                <span
                                    className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                                <span
                                    className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-black group-hover:text-gray-300' : 'text-white group-hover:text-gray-800'}`}>About Us <span
                                    className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                <span
                                    className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-black' : 'border-white'} rounded-full"}></span>
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
                            Frequently Asked <br className={'lg:block md:block hidden'}/>Vue.js Questions
                        </h2>
                        <p className={'text-[0.873em] font-[300] leading-[1.3]'}>
                            Here are some of the most frequently asked questions about Vue.js—covering its features,
                            <br className={'lg:block md:block hidden'}/>benefits, and why it’s a top choice for modern
                            web
                            development.
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
                            <span>What is Vue.js used for?</span>
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
                                Vue.js is a powerful and flexible JavaScript framework designed for building modern,
                                interactive user interfaces and high-performing Single-Page Applications (SPAs). Its
                                component-based architecture promotes code reusability, scalability, and
                                maintainability—making it an ideal choice for businesses seeking efficient front-end
                                solutions. Vue.js supports a wide range of development use cases, including custom web
                                applications, dynamic dashboards, interactive platforms, Progressive Web Apps (PWAs),
                                web-based games, and server-side rendered applications using frameworks like Nuxt.js.
                                Its simplicity, combined with seamless integration capabilities, allows for faster
                                development cycles and a reduced time-to-market, even in complex environments.<br/><br/>

                                Web applications built with Vue.js leverage core web technologies such as HTML, CSS, and
                                JavaScript, and are hosted on web servers while accessed through standard browsers like
                                Chrome, Firefox, and Safari. This approach ensures broad accessibility, responsive
                                design, and consistent performance across devices—delivering an engaging and reliable
                                user experience that supports long-term business growth.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Why choose Vue.js for software development?</span>
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
                                Vue.js stands out as a leading framework for modern <Link
                                href='/services/Software-Development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>software
                                development</Link>, valued for its
                                gentle learning curve, adaptability, and strong performance focus. Its modular,
                                component-based architecture enables scalable, maintainable code—making it suitable for
                                projects of any size, from lightweight interfaces to complex enterprise-grade systems.
                                Backed by a vibrant community and extensive ecosystem, Vue.js supports seamless
                                integration with existing technologies and third-party libraries, allowing for faster
                                development cycles and streamlined workflows. This combination of flexibility,
                                efficiency, and developer accessibility positions Vue.js as a strategic choice for
                                businesses aiming to build robust, future-ready digital solutions.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>How long does it take to build a Vue.js app?</span>
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
                                The timeline for developing a Vue.js application can vary significantly based on project
                                scope, complexity, and specific requirements. Small to mid-sized applications with
                                standard functionality may take anywhere from a few weeks to a couple of months, while
                                larger, more complex solutions—especially those requiring advanced features, custom
                                integrations, or enterprise-level scalability—can span several months to a year or more.
                                Key factors influencing development time include the level of customization, integration
                                with third-party services, availability of reusable components, and the depth of quality
                                assurance and testing required. A thorough project assessment and clear planning are
                                essential for accurately defining timelines and ensuring efficient delivery.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can you build an MVP with Vue.js?</span>
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
                                Vue.js is a highly effective framework for building Minimum Viable Products (<Link
                                href='/services/MVP'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>MVPs</Link>),
                                offering the simplicity, flexibility, and speed needed to bring early-stage ideas to
                                market efficiently. Its intuitive syntax and rapid development capabilities allow teams
                                to focus on core features, quickly prototype user interfaces, and iterate based on
                                real-time user feedback. The component-based architecture promotes code reusability and
                                scalability, making it easier to expand or refine the product as requirements evolve.
                                Whether for a web application, single-page interface, or lightweight mobile app, Vue.js
                                equips startups and businesses with the tools to validate concepts, reduce
                                time-to-market, and showcase core functionality with minimal overhead.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>How are you different to other Vue.js agencies?</span>
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
                                At Grey InfoTech, we build Vue.js applications using a proven, structured approach
                                developed through years of hands-on experience across diverse projects. Our
                                tried-and-tested methodology emphasizes efficient, incremental development to ensure
                                clarity, control, and continuous progress at every stage. We recognize that application
                                development can be complex, which is why we provide end-to-end guidance—from initial
                                consultation through to launch and ongoing support. Every step of the process is
                                tailored to your organization’s specific goals, ensuring a solution that aligns with
                                your vision, timeline, and long-term business objectives.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default OilAndGas;