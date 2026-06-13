'use client';
import React, {useEffect, useRef, useState} from 'react';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";
import '@/app/globals.css';

const testimonials = [
    {
        name: "Isabel Martínez",
        title: "UX Lead, TaskFlow Inc.",
        message: (
            <>
                Grey InfoTech delivered a clean, modern web design that perfectly aligns with our brand and enhances
                user experience. Their design team was creative, attentive, and always open to feedback. Our product now
                looks as polished as it performs.
            </>
        ),
    },
    {
        name: "Sofia Nieminen",
        title: "Director of Digital Experience, PayCore Solutions",
        message: (
            <>
                Grey InfoTech completely reimagined our website with a sleek, user-centric design that reinforces our
                credibility in the fintech space. The process was collaborative and efficient, and the end result is
                something we’re truly proud to show clients and partners.
            </>
        ),
    },
    {
        name: "Jonathan Lee",
        title: "VP of Product, PropEdge Technologies",
        message: (
            <>
                We came to Grey InfoTech with a cluttered and outdated interface. They gave our platform a fresh,
                intuitive design that not only looks great but also improved engagement and usability. Their work speaks
                for itself — sharp, professional, and conversion-focused.
            </>
        ),
    },
];

const services = [
    {
        id: "01",
        title: "Careers Websites",
        target: "CW",
        tags: ["Careers Website", "Candidate Attraction", "Online Hiring Strategy", "Recruitment Success"],
        description:
            "Your careers website is a vital component of your talent acquisition strategy, serving as a key touchpoint for prospective candidates—statistics show that nearly every successful hire will visit your site at least once. At Grey InfoTech, we focus on creating recruitment websites that are professionally designed, fully optimised for speed, accessibility, and mobile responsiveness, ensuring a seamless user experience across all devices. By aligning design, content, and functionality with your employer brand and hiring objectives, we help you attract, engage, and convert top talent more effectively.",
    },
    {
        id: "02",
        title: "Customisable HR Portal",
        target: "CHRP",
        tags: ["Branded HR Portals", "Training and Development", "HR Technology", "Workforce Engagement"],
        description:
            "Tailored to reflect your brand’s identity and culture, our custom HR portals provide a centralised, user-friendly hub where employees can efficiently access and manage essential HR functions such as benefits administration, training resources, performance evaluations, leave management, and internal communications. This seamless integration not only improves employee engagement and productivity but also reinforces consistency across your digital workplace experience.",
    },
    {
        id: "03",
        title: "HR Analytics & Reporting",
        target: "HRAR",
        tags: ["Data-Driven Insights", "HR Analytics", "Performance Metrics"],
        description:
            "Leverage data-driven insights to drive smarter, more strategic HR decision-making across your organisation. Our solutions provide robust analytics and fully customisable reporting tools, enabling you to track and analyse critical HR metrics such as employee performance, engagement levels, retention trends, recruitment efficiency, and workforce productivity. By turning data into actionable intelligence, we help you identify areas for improvement, optimise resource allocation, and align your HR initiatives with broader business goals for long-term success.",
    },
    {
        id: "04",
        title: "Automated Workflows & Processes",
        target: "AWP",
        tags: ["HR Automation", "Onboarding Solutions", "Increased Accuracy"],
        description:
            "Streamline your HR operations through intelligent automation that enhances efficiency across the entire employee lifecycle. From onboarding and compliance management to performance reviews and offboarding, our technology simplifies complex processes, eliminates repetitive manual tasks, and ensures greater accuracy and consistency. This not only reduces administrative overhead but also frees up your HR team to focus on strategic initiatives that drive employee satisfaction and organisational growth.",
    },
    {
        id: "05",
        title: "Engagement & Recruiting Tools",
        target: "ERT",
        tags: ["Talent Acquisition", "Talent Management", "Applicant Tracking Systems"],
        description:
            "From advanced applicant tracking systems that simplify and accelerate the recruitment process to employee engagement platforms that foster a connected and motivated workplace culture, our HR technology solutions are designed to enhance every stage of the employee journey. These tools not only improve hiring efficiency and candidate experience but also support ongoing engagement, retention, and performance across your organisation.",
    },
    {
        id: "06",
        title: "Talent Acquisition",
        target: "TA",
        tags: ["Recruitment Strategies", "Dynamic Work Environment", "Cutting-Edge Recruitment Tools"],
        description:
            "Talent acquisition is a strategic function focused not only on sourcing qualified candidates but on identifying individuals whose capabilities, values, and ambitions align with your organisation’s vision and culture. At Grey InfoTech, we develop and execute tailored recruitment strategies that combine industry expertise, technology-driven sourcing tools, and data insights to attract top-tier professionals. Our approach ensures you secure talent that contributes to long-term business success, supports innovation, and drives meaningful growth in competitive and evolving markets.",
    },
];

const carouselLogos = [
    {name: "Broadbean", light: "/assets/hr/broadbean1.svg", dark: "/assets/hr/broadbean.svg"},
    {name: "Bullhorn", light: "/assets/hr/bullhorn1.svg", dark: "/assets/hr/bullhorn.svg"},
    {name: "Glassdoor", light: "/assets/hr/glassdoor1.svg", dark: "/assets/hr/glassdoor.svg"},
    {name: "Google", light: "/assets/hr/google1.svg", dark: "/assets/hr/google.svg"},
    {name: "Hubspot", light: "/assets/hr/hubspot1.svg", dark: "/assets/hr/hubspot.svg"},
    {name: "Indeed", light: "/assets/hr/indeed1.svg", dark: "/assets/hr/indeed.svg"},
    {name: "JobAdder", light: "/assets/hr/jobadder1.svg", dark: "/assets/hr/jobadder.svg"},
    {name: "JobberMan", light: "/assets/hr/jobberman1.svg", dark: "/assets/hr/jobberman.svg"},
    {name: "Salesforce", light: "/assets/hr/salesforce1.svg", dark: "/assets/hr/salesforce.svg"},
    {name: "Workday", light: "/assets/hr/workday1.svg", dark: "/assets/hr/workday.svg"},
    {name: "Workforce", light: "/assets/hr/workforce1.svg", dark: "/assets/hr/workforce.svg"},
];

const benefits = [
    {
        id: "expertise",
        iconLight: "/assets/hr/icon/wap1.svg",
        iconDark: "/assets/hr/icon/wap.svg",
        alt: "Business-Oriented Development",
        title: "Expertise in HR Tech",
        description:
            "With years of experience in HR technology, our team brings a comprehensive understanding of human resource processes, compliance standards, and workforce dynamics. We stay at the forefront of industry advancements, leveraging emerging technologies to design and implement solutions that streamline HR operations, improve employee experiences, and support strategic business goals.",
    },
    {
        id: "customisation",
        iconLight: "/assets/hr/icon/tap1.svg",
        iconDark: "/assets/hr/icon/tap.svg",
        alt: "Customisation and Flexibility",
        title: "Customisation and Flexibility",
        description:
            "We believe in delivering solutions tailored to your specific business needs, ensuring every service we provide is adaptable, scalable, and aligned with your corporate environment. Our approach prioritises flexibility and strategic alignment, allowing us to create value-driven HR technology solutions that evolve with your organisation’s goals and workforce requirements.",
    },
    {
        id: "user-centric",
        iconLight: "/assets/hr/icon/sc1.svg",
        iconDark: "/assets/hr/icon/sc.svg",
        alt: "User-centric Design",
        title: "User-centric Design",
        description:
            "Our emphasis on user experience ensures that both employees and HR managers benefit from intuitive, efficient, and accessible solutions. By designing with usability in mind, we help streamline daily HR tasks, improve engagement, and enhance overall productivity across your organisation.",
    },
    {
        id: "continuous-support-development",
        iconLight: "/assets/hr/icon/sf1.svg",
        iconDark: "/assets/hr/icon/sf.svg",
        alt: "Continuous support and development",
        title: "Continuous Support and Development",
        description:
            "We are committed to continuous improvement, providing ongoing support, regular updates, and enhancements to ensure your HR technology remains secure, scalable, and aligned with evolving business needs and industry standards.",
    },
];

const integrations = [
    {
        id: "bullhorn",
        title: "Bullhorn",
        alt: "Bullhorn",
        logoLight: "/assets/hr/bullhorn1.svg",
        logoDark: "/assets/hr/bullhorn.svg",
        imageOffset: "lg:-mt-[3em] md:-mt-[3em]",
        description:
            "Bullhorn is a cloud-based CRM and operations platform tailored for the staffing industry, offering streamlined recruitment management. Our integration with Bullhorn enables efficient handling of the entire recruitment lifecycle—from candidate sourcing and tracking to placement—seamlessly embedding its powerful features into your HR system. This integration enhances your staffing operations by improving workflow automation, candidate engagement, and data accuracy, ultimately boosting recruitment efficiency and outcomes.",
    },
    {
        id: "broadbean",
        title: "Broadbean",
        alt: "Broadbean",
        logoLight: "/assets/hr/broadbean1.svg",
        logoDark: "/assets/hr/broadbean.svg",
        imageOffset: "lg:-mt-[3em] md:-mt-[3em]",
        description:
            "Broadbean is a robust platform designed for distributing job postings and sourcing candidates across diverse channels. By integrating Broadbean with your HR system, you streamline the process of publishing vacancies, ensuring broad reach to targeted talent pools. This integration also enables comprehensive tracking and analysis of each recruitment channel’s performance, allowing you to optimise your hiring strategy for maximum efficiency and impact.",
    },
    {
        id: "hubspot",
        title: "HubSpot",
        alt: "HubSpot",
        logoLight: "/assets/hr/hubspot1.svg",
        logoDark: "/assets/hr/hubspot.svg",
        imageOffset: "lg:-mt-[1em] md:-mt-[1em]",
        description:
            "HubSpot, widely recognized for its inbound marketing, sales, and service platforms, plays a valuable role in HR management as well. Our integration with HubSpot enables streamlined management of employee and candidate engagement by leveraging automated email campaigns, personalized communication workflows, and in-depth analytics on candidate behavior. These capabilities empower your HR teams to enhance recruitment outreach, improve candidate nurturing, and make data-driven decisions that optimize overall talent acquisition and retention strategies.",
    },
    {
        id: "salesforce",
        title: "Salesforce",
        alt: "Salesforce",
        logoLight: "/assets/hr/salesforce1.svg",
        logoDark: "/assets/hr/salesforce.svg",
        imageOffset: "lg:-mt-[3em] md:-mt-[3em]",
        description:
            "Salesforce, best known for its customer relationship management capabilities, also provides powerful features that support HR functions. By integrating Salesforce with your HR system, you can streamline employee data management, improve internal communication workflows, and leverage advanced analytics to gain deeper insights into workforce performance. This integration facilitates more informed, data-driven HR decisions, enhances employee engagement, and drives operational efficiency across your organisation.",
    },
    {
        id: "jobadder",
        title: "Job Adder",
        alt: "Job Adder",
        logoLight: "/assets/hr/jobadder1.svg",
        logoDark: "/assets/hr/jobadder.svg",
        imageOffset: "lg:-mt-[1em] md:-mt-[1em]",
        description:
            "Job Adder is a user-friendly, comprehensive recruitment platform designed to simplify hiring workflows. Integrating Job Adder streamlines applicant tracking, job order management, and candidate relationship maintenance, automating key recruitment tasks. This integration enhances efficiency, reduces administrative burdens, and ensures a smoother, more effective hiring process aligned with your business goals.",
    },
    {
        id: "google",
        title: "Google for Jobs",
        alt: "Google",
        logoLight: "/assets/hr/google1.svg",
        logoDark: "/assets/hr/google.svg",
        imageOffset: "lg:-mt-[1em] md:-mt-[1em]",
        description:
            "Google for Jobs is an integrated job search feature within Google Search that significantly enhances job visibility. Our solutions optimise your job listings to comply with Google for Jobs standards, ensuring your vacancies are prominently displayed to relevant candidates. This increased visibility drives higher quality applicant traffic, helping you attract top talent efficiently and effectively.",
    },
    {
        id: "workday",
        title: "Workday ATS",
        alt: "Workday ATS",
        logoLight: "/assets/hr/workday1.svg",
        logoDark: "/assets/hr/workday.svg",
        imageOffset: "lg:-mt-[3em] md:-mt-[3em]",
        description:
            "Workday Applicant Tracking System, a component of Workday’s comprehensive human capital management suite, offers seamless applicant tracking, job posting management, and recruitment data analysis. Integrating Workday ATS streamlines your hiring process, ensuring efficiency and cohesion from initial job posting through to candidate selection and onboarding, thereby enhancing overall recruitment effectiveness.",
    },
    {
        id: "indeed",
        title: "Indeed",
        alt: "Indeed",
        logoLight: "/assets/hr/indeed1.svg",
        logoDark: "/assets/hr/indeed.svg",
        imageOffset: "lg:-mt-[1em] md:-mt-[1em]",
        description:
            "Indeed is a leading global employment search engine that aggregates job listings from numerous sources. Integrating Indeed into your HR system significantly broadens the reach of your job postings, connecting you with a worldwide talent pool. This integration leverages advanced search capabilities for both employers and candidates, enhancing your recruitment efforts by attracting diverse and qualified applicants efficiently.",
    },
    {
        id: "glassdoor",
        title: "Glassdoor",
        alt: "Glassdoor",
        logoLight: "/assets/hr/glassdoor1.svg",
        logoDark: "/assets/hr/glassdoor.svg",
        imageOffset: "lg:-mt-[1em] md:-mt-[1em]",
        description:
            "Glassdoor is a premier global platform that provides company reviews, salary insights, and job listings from employees and employers worldwide. Integrating Glassdoor into your HR and recruitment strategy amplifies your employer brand by showcasing authentic workplace experiences and transparent compensation data. This integration helps attract top talent by building trust and engagement, while empowering candidates to make informed career decisions.",
    },
    {
        id: "jobberman",
        title: "Jobberman",
        alt: "Jobberman",
        logoLight: "/assets/hr/jobberman1.svg",
        logoDark: "/assets/hr/jobberman.svg",
        imageOffset: "lg:-mt-[1em] md:-mt-[1em]",
        description:
            "Jobberman is a leading job portal in West Africa, connecting employers with a vast network of qualified candidates across multiple industries. Integrating Jobberman into your recruitment process expands your reach within the regional talent market, enabling you to attract skilled professionals efficiently. This integration leverages Jobberman’s targeted job matching and extensive database to streamline hiring, improve candidate quality, and accelerate your recruitment outcomes.",
    },
    {
        id: "workforce",
        title: "Workforce",
        alt: "Workforce",
        logoLight: "/assets/hr/workforce1.svg",
        logoDark: "/assets/hr/workforce.svg",
        imageOffset: "lg:-mt-[3em] md:-mt-[3em]",
        description:
            "Workforce is a comprehensive human capital management platform that streamlines recruitment, employee management, and payroll processes. Integrating Workforce into your HR operations enhances efficiency by automating key workflows and providing real-time insights into your talent pool. This integration supports better workforce planning and engagement, helping you attract, retain, and develop skilled employees while driving overall organizational productivity.",
    },
];

const faqs = [
    {
        question: "What is HR technology?",
        answer:
            "HR technology encompasses the software and hardware solutions designed to automate and optimize human resources functions within an organization. These technologies cover a broad spectrum of HR activities, including recruitment, payroll processing, performance management, employee data administration, and compliance tracking. By leveraging HR technology, businesses can enhance operational efficiency, improve data accuracy, and streamline workflows, ultimately driving better workforce management and strategic decision-making.",
    },
    {
        question: "How can HR technology improve employee engagement?",
        answer:
            "HR technology enhances employee engagement by delivering robust tools for seamless communication, continuous feedback, and meaningful recognition. Additionally, it optimizes key HR processes such as onboarding, training, and benefits administration, making them more efficient, accessible, and user-centric—ultimately driving productivity and workforce satisfaction.",
    },
    {
        question: "What are the benefits of integrating HR technology into a corporate website?",
        answer:
            "Integrating HR technology into a corporate website delivers multiple advantages, including streamlined recruitment workflows, enhanced employee self-service options, and real-time access to essential HR services. It also strengthens data management and security while ensuring a consistent and seamless employee experience across all digital touchpoints.",
    },
    {
        question: "How does HR technology assist in the recruitment process?",
        answer:
            "HR technology greatly improves the recruitment process by automating critical tasks such as job posting, applicant tracking, candidate screening, and communication management. Furthermore, it offers advanced analytics and reporting capabilities, enabling organizations to measure recruitment effectiveness and optimize sourcing strategies.",
    },
    {
        question: "What should be considered when choosing an HR technology solution?",
        answer:
            "When selecting an HR technology solution, organizations must carefully assess several critical factors to ensure alignment with their strategic goals. Key considerations include a thorough understanding of the specific HR challenges and requirements unique to the business, as well as the solution’s ease of use and intuitive user interface to drive adoption. Equally important is the technology’s ability to seamlessly integrate with existing systems and workflows, ensuring operational continuity. Scalability and flexibility are essential to accommodate future growth and evolving business needs.",
    },
    {
        question: "Can HR technology help in compliance and regulatory requirements?",
        answer:
            "HR technology plays a crucial role in supporting compliance and regulatory adherence by automating record-keeping processes, maintaining data accuracy, and delivering timely notifications of legal and regulatory updates. This automation enables organizations to efficiently manage labor law requirements and other regulatory obligations, reducing risk and ensuring consistent compliance across all HR functions.",
    },
    {
        question: "How does HR technology impact data security?",
        answer:
            "HR technology solutions are typically equipped with advanced security features designed to safeguard sensitive employee information. These include data encryption, secure storage protocols, role-based access controls, and routine security audits. Such measures are essential for protecting confidential HR data, ensuring regulatory compliance, and maintaining employee trust in digital systems.",
    },
    {
        question: "Is HR technology suitable for small businesses?",
        answer:
            "Absolutely—HR technology solutions are designed to serve businesses of all sizes, including small and growing enterprises. Many platforms offer scalable features and flexible pricing models, allowing organizations to tailor functionality to their specific operational needs and budget constraints. This ensures that even smaller companies can leverage modern HR tools to drive efficiency and support growth.",
    },
    {
        question: "What is the future of HR technology?",
        answer:
            "The future of HR technology is poised to be shaped by greater integration of artificial intelligence, machine learning, and automation—enabling more intelligent, efficient, and predictive HR processes. Emerging trends also include the rise of employee experience platforms that personalize interactions, the use of advanced analytics to drive data-informed decision-making, and enhanced mobile accessibility to support a flexible, on-the-go workforce.",
    },
    {
        question: "How does HR technology facilitate remote work?",
        answer:
            "HR technology plays a vital role in enabling and supporting remote work by offering digital tools for virtual recruitment, online training, remote onboarding, performance management, and employee engagement—all accessible from any location. These capabilities help organizations maintain productivity, foster collaboration, and ensure a cohesive employee experience across geographically distributed teams.",
    },
];

const HrTech = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [current, setCurrent] = useState(0);
    const [onIndex, setOnIndex] = useState<number | null>(null);

    const [isDayTime, setIsDayTime] = useState<boolean>(() => {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18;
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            const hour = new Date().getHours();
            setIsDayTime((prev) => {
                const next = hour >= 6 && hour < 18;
                return prev === next ? prev : next;
            });
        }, 60_000);

        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const handleIntroScroll = () => {
            if (!sectionRef.current) return;

            const {top, bottom} = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            setIsBackgroundActive(top < windowHeight * -0.1 || bottom < windowHeight * -0.1);
        };

        window.addEventListener("scroll", handleIntroScroll);
        handleIntroScroll();

        return () => window.removeEventListener("scroll", handleIntroScroll);
    }, []);

    useEffect(() => {
        const handleActiveSectionScroll = () => {
            for (const service of services) {
                const section = document.getElementById(service.target);

                if (!section) continue;

                const rect = section.getBoundingClientRect();

                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    setActiveId(service.target);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleActiveSectionScroll);
        handleActiveSectionScroll();

        return () => window.removeEventListener("scroll", handleActiveSectionScroll);
    }, []);

    const scrollToSection = (target: string) => {
        const section = document.getElementById(target);

        if (section) {
            section.scrollIntoView({behavior: "smooth", block: "start"});
            setActiveId(target);
        }
    };

    const prev = () => setCurrent((value) => (value - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((value) => (value + 1) % testimonials.length);

    const toggleFAQ = (index: number) => {
        setOnIndex((value) => (value === index ? null : index));
    };

    const {name, title, message} = testimonials[current];

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            <Header/>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Hero Section */}
            <div
                id="hero"
                className={`relative max-w-full w-full pb-[6em] mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                    isDayTime ? 'text-black' : 'text-white'
                }`}
            >
                <h1 className="border-b pb-[0.3em] border-gray-500/50 px-0 constant-text lg:text-[5.35em] md:text-[5.35em] sm:text-[2em] text-[2.5em] lg:mt-[2.5em] md:mt-[2.5em] mt-[1em] leading-[1.1] font-[600]">
                    HR Software <br className="lg:block md:block hidden"/>Development Services
                </h1>

                <div
                    className="relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em]">
                    <div className="lg:-mr-[4em] md:-mr-[4em] lg:mt-[2em] md:mt-[2em]">
                        <p className="text-[0.87em] font-[300]">
                            We develop tailored HR software that streamlines operations, enhances efficiency, and
                            supports better workforce management at scale.
                        </p>
                    </div>

                     <div
                            className={'relative grid lg:grid-cols-3 lg:gap-8 lg:ml-[13em]'}>
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

                <div className="relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10">
                    <Image
                        src="/assets/hr/hero.jpg"
                        alt="HR Tech"
                        width={1920}
                        height={1080}
                        priority
                        loading="eager"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </div>
            </div>

            {/* Introductory section */}
            <section
                ref={sectionRef}
                className={`py-12 transition-colors duration-500 ${
                    isBackgroundActive
                        ? isDayTime
                            ? "bg-white text-black"
                            : "bg-black text-white"
                        : isDayTime
                            ? "bg-black text-white"
                            : "bg-white text-black"
                }`}
            >
                <div
                    className="relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <h6 className="constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight">
                            Revolutionize HR tech <br className="lg:block md:block hidden"/>integration effortlessly
                        </h6>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <h3 className="lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6">
                            Empowering your <br className="lg:block md:block hidden"/>HR Tech Journey Forward
                        </h3>

                        <div
                            className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]">
                            <p>
                                In today’s competitive business landscape, the seamless integration of Human Resources
                                technology into corporate careers websites is a strategic imperative. Our HR Technology
                                Solutions are designed to help organisations attract, engage, and retain top talent by
                                embedding smart, scalable, and secure HR functionalities directly into their digital
                                platforms.
                            </p>
                            <p>
                                We take a strategic, user-centric approach—aligning technology with your business goals
                                to
                                ensure your HR tools are not only functional but also intuitive and future-ready.
                                Whether
                                it’s implementing applicant tracking systems, onboarding solutions, or employee
                                self-service
                                portals, we focus on improving efficiency, enhancing data visibility, and reducing
                                administrative burden.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* HR Technology & Marketing Services */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[4em] md:pb-[4em] pb-[1em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    id="hr-technology-marketing-services"
                    className="relative lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[6em] md:pb-[6em] pb-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:mb-[6em] md:mb-[6em] mb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]"
                >
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[3em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <div>
                            <h2 className="lg:text-[3.2em] md:text-[3.2em] text-[1.5em] font-[500] justify-center tracking-tight leading-[1.1]">
                                HR Technology &<br className="lg:block md:block hidden"/>Marketing Services
                            </h2>
                        </div>

                        <div>
                            <p className="text-[0.85em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] tracking-normal">
                                We deliver end-to-end solutions that seamlessly integrate human resources functionality
                                into your corporate website—covering everything from employee onboarding and performance
                                tracking to benefits management, payroll systems, employee profiles, and beyond.
                            </p>
                        </div>
                    </div>

                    <div
                        className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full">
                        <div
                            className="lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[11em] overflow-hidden">
                            <h3 className={`text-[1.5em] font-[500] tracking-tight constant-text ${isDayTime ? 'text-black' : 'text-white'}`}>
                                Our Services
                            </h3>

                            <ul className={`list-disc constant-text text-[0.89em] ml-4 font-[600] relative space-y-3 ${
                                isDayTime
                                    ? 'text-black decoration-gray-600 focus:decoration-gray-900'
                                    : 'text-white decoration-gray-400 focus:decoration-gray-600'
                            }`}>
                                {services.map((item) => (
                                    <li key={item.target} className="group lg:mt-6 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-4 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[400]'}`
                                                    : `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-500 font-[400]'}`
                                            }`}
                                        >
                                            <div className="flex gap-4">
                                                <span className="shrink-0">{item.id}</span>
                                                <span
                                                    className={`opacity-0 transition-opacity text-[2em] leading-[0.59em] ${activeId === item.target ? 'opacity-100' : ''}`}>→</span>
                                                <span>{item.title}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:-ml-[8em] md:-ml-[8em] lg:mb-[15em] md:mb-[19em]">
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap-1 items-start">
                                {services.map((service) => (
                                    <React.Fragment key={service.target}>
                                        <div
                                            className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>
                                            {service.id}/
                                        </div>

                                        <div
                                            id={service.target}
                                            className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                        >
                                            <h2 className="text-[1.5em] font-[500] mb-3">
                                                {service.title}
                                            </h2>

                                            <div
                                                className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                                {service.tags.map((tag) => (
                                                    <span
                                                        key={`${service.target}-${tag}`}
                                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="text-justify leading-[1.5] text-[0.873em] font-[300]">
                                                {service.description}
                                            </p>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carousel image */}
            <div className={`carousel py-[4em] lg:mt-[-35em] md:mt-[-35em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div className="track">
                    {[0, 1].map((carouselIndex) => (
                        <React.Fragment key={`hr-logo-carousel-${carouselIndex}`}>
                            {carouselLogos.map((logo) => (
                                <Image
                                    key={`hr-logo-carousel-${carouselIndex}-${logo.name}`}
                                    className="image"
                                    src={isDayTime ? logo.light : logo.dark}
                                    alt={logo.name}
                                    width={50}
                                    height={50}
                                    style={{
                                        width: 'auto',
                                        height: 'auto',
                                    }}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* First image */}
            <div id="first-image" className="h-auto max-w-full w-full mx-auto">
                <Image
                    className="object-fill"
                    src="/assets/hr/first.jpg"
                    alt="HR technology platform"
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                        width: '100%',
                        height: 'auto',
                    }}
                />
            </div>

            {/* What Grey InfoTech Does */}
            <div className={`lg:-mt-[3em] md:-mt-[3em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div
                    className="relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <h3 className="lg:text-[3.3em] md:text-[3.3em] text-[1.8em] font-[500] tracking-tight lg:mb-[0.7em] md:mb-[0.7em] leading-[1.1] pb-6">
                            What Grey <br className="lg:block md:block hidden"/>Infotech Does
                        </h3>
                    </div>

                    <div className="lg:-ml-[8em] md:-ml-[8em]">
                        <p className="mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]">
                            In today’s digital and fast-paced business environment, seamless integration of HR
                            technology
                            into your corporate website is critical to improving operational efficiency and employee
                            engagement. At Grey InfoTech, we offer tailored HR Technology Solutions that go beyond
                            functionality—they are strategically designed to align with your business goals.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mid image */}
            <div id="mid-image" className="h-auto max-w-full w-full mx-auto lg:-mt-[3em] md:-mt-[3em]">
                <Image
                    className="object-fill"
                    src="/assets/hr/mid.jpg"
                    alt="Office collaboration"
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                        width: '100%',
                        height: 'auto',
                    }}
                />
            </div>

            {/* Recruitment SEO */}
            <div className={`border-b ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className="relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]">
                    <div className="relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto">
                        <div
                            className={`lg:mt-[4em] md:mt-[4em] lg:-mr-[5.4em] md:-mr-[5.4em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <h2 className="text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] pb-8 md:text-[3.2em] lg:text-[3.2em] w-auto h-auto">
                                Recruitment SEO
                            </h2>

                            <p className="text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.5em] leading-[1.5] lg:mr-[2em]">
                                At Grey InfoTech, we prioritise search engine visibility from the outset by embedding
                                SEO
                                best practices and ensuring full compliance with Google for Jobs standards. Every
                                project
                                includes robust, scalable hosting and proactive technical support to resolve issues
                                quickly
                                and efficiently.
                                <br/><br/>
                                Our approach to HR website development is strategic and comprehensive, aligning
                                technology
                                with your business objectives. We create high-performing, user-centric platforms that
                                are
                                optimised for discoverability, functionality, and future scalability.
                            </p>
                        </div>

                        <div
                            className="relative mb-4 w-full h-auto max-w-full lg:pr-[11em] md:pr-[11em] lg:ml-[3.5em] md:ml-[3.5em]">
                            <Image
                                src="/assets/fin/data.jpg"
                                alt="Recruitment SEO data insights"
                                width={400}
                                height={500}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className={`lg:pt-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    id="why-choose-us"
                    className="relative lg:pt-[4em] md:pt-[4em] pt-[2em] lg:pb-[6em] md:pb-[6em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]"
                >
                    <div
                        className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[3em] lg:mb-[5em] md:mb-[5em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                        <div>
                            <h2 className="text-[1em] text-start sm:text-[1.5em] md:text-[3.2em] lg:text-[3.1em] font-[550] tracking-tight leading-[1.15] lg:pb-6">
                                Why Choose Us?
                            </h2>
                        </div>

                        <div className="lg:-ml-[1.5em] md:-ml-[1.5em]">
                            <p className="text-justify text-[0.87em] font-[300]">
                                Partnering with Grey InfoTech means choosing a proven leader in HR technology. With over
                                a
                                decade of experience, we deliver smart, efficient solutions that integrate seamlessly
                                into
                                your careers website—enhancing employee engagement, streamlining HR processes, and
                                supporting business growth.
                            </p>
                        </div>
                    </div>

                    <div
                        className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                        {benefits.map((benefit) => (
                            <div key={benefit.id} id={benefit.id}>
                                <Image
                                    src={isDayTime ? benefit.iconLight : benefit.iconDark}
                                    alt={benefit.alt}
                                    width={60}
                                    height={60}
                                    className="h-auto w-auto mb-2"
                                />

                                <h5 className="capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8">
                                    {benefit.title}
                                </h5>

                                <p className="text-[0.873em] text-justify font-[300]">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Three Images */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    id="top-images"
                    className="relative lg:max-w-full w-full lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]"
                >
                    <div className="relative grid lg:grid-cols-3 h-auto md:grid-cols-3 grid-cols-1 gap-6">
                        {[
                            {
                                src: "/assets/hr/1.jpg",
                                alt: "HR app interface",
                                className: "lg:mt-[1.2em] md:mt-[1.2em]"
                            },
                            {src: "/assets/hr/2.jpg", alt: "HR collaboration", className: ""},
                            {src: "/assets/hr/3.jpg", alt: "HR digital workflow", className: "lg:mt-[8em] md:mt-[8em]"},
                        ].map((image) => (
                            <div key={image.src} className={`h-auto w-full max-w-full ${image.className}`}>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={1396}
                                    height={1440}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Integrations */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] md:px-[4.6em] lg:pt-[6em] md:pt-[6em] pt-[2em] lg:pb-[6em] md:pb-[6em] pb-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[6em] md:pb-[6em] pb-[3em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div>
                        <h2 className="lg:text-[3em] md:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] md:pr-[1em] leading-[1.2]">
                            Advanced Integration <br className="lg:block md:block hidden"/>with Leading <br
                            className="lg:block md:block hidden"/>HR Technologies
                        </h2>
                    </div>

                    <div>
                        <p className="text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] md:-ml-[3em] tracking-normal">
                            Our HR Technology Solutions seamlessly integrate with leading HR platforms to boost your
                            corporate website’s functionality and efficiency. We specialize in back-end development, API
                            integration, database management, and consulting services. Let’s make it happen.
                        </p>
                    </div>
                </div>

                {integrations.map((integration, index) => (
                    <div
                        key={integration.id}
                        id={integration.id}
                        className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 ${
                            index === integrations.length - 1 ? '' : 'border-b-[1px] pb-[2em]'
                        } text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}
                    >
                        <div className="relative">
                            <h2 className="capitalize text-[1.75em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none">
                                {integration.title}
                            </h2>

                            <div
                                className={`absolute lg:block md:hidden sm:hidden lg:pl-[14em] md:pl-[12em] ${integration.imageOffset} inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300`}>
                                <Image
                                    src={isDayTime ? integration.logoLight : integration.logoDark}
                                    alt={integration.alt}
                                    height={250}
                                    width={300}
                                />
                            </div>
                        </div>

                        <div>
                            <p className="text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal">
                                {integration.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Testimonials */}
            <div
                className={`relative lg:pt-[6em] md:pt-[6em] pt-[2em] lg:pb-[6em] md:pb-[6em] pb-[2em] max-w-full w-full h-auto ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 ${isDayTime ? 'text-black' : 'text-white'}`}>
                    <div>
                        <h5 className="uppercase text-xs font-[500] tracking-widest mb-4">
                            What our clients say
                        </h5>
                    </div>

                    <div className="lg:ml-[-20em] md:ml-[-20em] sm:ml-[-10em]">
                        <div className="flex items-start gap-4 text-[1.5em] font-[500] mb-6">
                            <Quote className="w-6 h-6 shrink-0"/>
                            <p className="leading-tight text-justify border-b-[0.1em] border-gray-300/20 pb-12">
                                {message}
                            </p>
                        </div>

                        <div className="flex ml-10 items-center gap-4">
                            <div>
                                <p className="font-semibold text-[1.3em]">{name}</p>
                                <p className="text-[0.8em]">{title}</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-1">
                            <button type="button" onClick={prev} aria-label="Previous testimonial">
                                <ArrowLeft className="w-8 h-6"/>
                            </button>

                            <button type="button" onClick={next} aria-label="Next testimonial">
                                <ArrowRight className="w-8 h-6"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div
                id="FAQ"
                className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[10em] md:pb-[10em] pb-[2em] lg:mb-[10em] md:mb-[10em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}
            >
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className="border-b-[1px] lg:pb-[2em] pb-[1em] mb-28">
                        <h2 className="capitalize lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8">
                            Frequently Asked <br className="lg:block md:block hidden"/>HR Tech Questions
                        </h2>

                        <p className="text-[0.873em] font-[300] leading-[1.3]">
                            These FAQs address key topics around HR technology and solutions, offering insights <br
                            className="lg:block md:block hidden"/>into
                            their importance, functionality, and impact on today’s business operations.
                        </p>
                    </div>
                </div>

                <div className="relative mx-auto px-4 sm:px-6 lg:px-[12em] space-y-2">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.question}
                            className={`border-b py-4 ${
                                isDayTime
                                    ? 'border-gray-400 text-gray-300 hover:text-white'
                                    : 'border-gray-100 text-gray-700 hover:text-black'
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none"
                                aria-expanded={onIndex === index}
                            >
                                <span className="leading-[1.3]">{faq.question}</span>
                                {onIndex === index ? (
                                    <AiOutlineMinus className="lg:text-[1.5em] text-[1em] text-gray-500"/>
                                ) : (
                                    <AiOutlinePlus className="lg:text-[1.5em] text-[1em] text-gray-500"/>
                                )}
                            </button>

                            {onIndex === index && (
                                <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5] text-gray-400">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default HrTech;