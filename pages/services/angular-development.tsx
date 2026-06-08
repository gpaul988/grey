import React, {useEffect, useRef, useState} from 'react';
import '../../app/globals.css'
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";
import {motion, useScroll, useTransform} from "framer-motion";


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

const AngularDevelopment = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target: targetRef});
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);


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
            "EPS",
            "SPAS",
            "WA",
            "UID",
            "AMAD",
            "PWAS",
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

    // What Powers Our Angular Development
    const [webIndex, setWebIndex] = useState<number | null>(null);

    const toggleWeb = (index: number) => {
        setWebIndex(webIndex === index ? null : index);
    }

    // Partners Section hook
    const partners = [
        {id: 1, name: 'Partner 1', dayImage: 'poawd.svg', nightImage: 'poawd1.svg'},
        {id: 2, name: 'Partner 2', dayImage: 'hub.svg', nightImage: 'hub1.svg'},
        {id: 3, name: 'Partner 3', dayImage: 'car.svg', nightImage: 'car1.svg'},
        {id: 4, name: 'Partner 4', dayImage: 'pet.svg', nightImage: 'pet1.svg'},
        {id: 5, name: 'Partner 5', dayImage: 'sew.svg', nightImage: 'sew1.svg'},
        {id: 6, name: 'Partner 6', dayImage: 'tim.svg', nightImage: 'tim1.svg'},
        {id: 7, name: 'Partner 7', dayImage: 'pat.svg', nightImage: 'pat1.svg'},
        {id: 8, name: 'Partner 8', dayImage: 'kow.svg', nightImage: 'kow1.svg'},
        {id: 9, name: 'Partner 9', dayImage: 'afro.svg', nightImage: 'afro1.svg'},
        {id: 10, name: 'Partner 10', dayImage: 'cane.svg', nightImage: 'cane1.svg'},
    ];

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
                    src="/assets/angular/hero.webm"
                    autoPlay
                    loop
                    muted
                    className="lg:w-full lg:h-[720px] md:w-full md:h-[700] w-full h-[700] object-cover"
                />
                <div
                    className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start text-start lg:max-w-[90em] px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                        isDayTime ? 'text-white ' : 'text-white '}`}>
                    <div
                        className="flex flex-col justify-start items-start border-b pb-[0.3em] border-gray-500/50 max-w-full w-full mx-auto ">
                        <h1
                            className={`px-0 constant-text lg:text-[5.35em] md:text-[4.4em] sm:text-[3.5em] text-[2em] lg:mt-[3em] md:mt-[3em] mt-[4em] w-auto h-auto leading-[1.1] font-[600]`}>
                            Angular Development <br className={'lg:block md:block hidden'}/>Services
                        </h1>
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                        <div className={'lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em] md:mt-[1em]'}>
                            <p className={'text-[0.87em] font-[300]'}>
                                Our Angular development services provide dynamic, responsive web applications with a
                                focus on performance and user experience. Leveraging Angular’s powerful framework, we
                                build scalable solutions that drive business growth and streamline complex workflows.
                            </p>
                        </div>
                        <div
                            className={'relative grid lg:grid-cols-3 lg:gap-8 lg:ml-[8em]'}>
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
                                 ? "bg-black text-white"
                                 : "bg-white text-black"
                             : isDayTime
                                 ? "bg-white text-black"
                                 : "bg-black text-white"
                     }`}>
                <div
                    className='relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 md:gap-8 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className={'pt-2'}>
                        <h6 className='constant-text uppercase text-[0.85em] leading-[1.3]lg:font-[600] font-[600] tracking-wider'>
                            Robust framework for <br className={'lg:block md:block hidden'}/>scalable enterprise apps
                        </h6>
                    </div>
                    <div className='lg:-ml-[25em] md:-ml-[16em]'>
                        <div className={'md:pl-[6em] sm:break-words sm:whitespace-normal'}>
                            <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                                Custom Angular Development
                            </h3>
                            <div
                                className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                                <div>
                                    <p>
                                        At Grey InfoTech Vision, we deliver Angular development services designed to
                                        align seamlessly with your business objectives and long-term digital strategy.
                                        From high-performing Single Page Applications (SPAs) to sophisticated
                                        enterprise-grade platforms, we build solutions that are secure, scalable, and
                                        optimized for exceptional performance. By harnessing Angular’s robust framework
                                        and flexibility, we develop feature-rich applications with modern, intuitive
                                        user interfaces that not only engage users but also drive measurable business
                                        outcomes.
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        Our end-to-end offering covers the entire development lifecycle—from initial
                                        consulting and solution architecture through design, coding, testing, and
                                        deployment to post-launch optimization and support. Whether enhancing an
                                        existing application or creating a new one from scratch, we combine deep
                                        technical expertise with an innovative, results-driven approach. This ensures
                                        the delivery of robust, future-ready applications that are built to evolve with
                                        your organization and maintain their competitive edge in a rapidly changing
                                        digital landscape.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Image*/}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'top'}
                     className={'relative lg:max-w-full w-full lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] items-center mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                    <div className={'relative grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-6 text-center'}>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/angular/1.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/angular/3.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/angular/2.jpg'}
                                alt={'calender'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/angular/4.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Angular development Solutions */}
            <div className={`lg:pt-[2em] md:pt-[2em] pt-[0.5em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'vuejs-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div>
                            <h2 className={`lg:text-[3.3em] md:text-[2.5em] sm:text-[2em] text-[2em] font-[500] justify-center tracking-tight leading-[1.1]`}>
                                Our Angular <br className={'lg:block md:block sm:hidden'}/>Development <br
                                className={'lg:block md:block sm:hidden'}/>Solutions
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] md:-ml-[3.5em] tracking-noromal'>
                                Delivering fast, scalable, and feature-rich applications tailored to your business
                                goals. By harnessing Angular’s robust capabilities, we create intuitive user interfaces
                                and high-performance platforms that enhance engagement and accelerate growth.
                            </p>
                        </div>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[6em] gap-6 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[6em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-white' : 'text-black'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] font-[300] relative space-y-1 md:break-words md:whitespace-normal ${
                                isDayTime ? 'text-white decoration-gray-300 focus:decoration-gray-600' : 'text-black decoration-gray-600 focus:decoration-gray-900'
                            }`}>
                                {[
                                    {id: "01", title: "Enterprise Solutions", target: "EPS"},
                                    {id: "02", title: "Single-Page Applications (SPAs)", target: "SPAS"},
                                    {id: "03", title: "Web Application", target: "WA"},
                                    {id: "04", title: "UI Development", target: "UID"},
                                    {id: "05", title: "Angular Mobile Application Development", target: "AMAD"},
                                    {id: "06", title: "Progressive Web Applications (PWAs)", target: "PWAS"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 md:mt-3 mt-2'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-2 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-500 font-[300]'}`
                                                    : `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[300]'}`
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
                        <div className={'lg:-ml-[8em] md:-ml-[4em] lg:mb-[17.5em] md:mb-[23em]'}>
                            <div
                                className="grid lg:grid-cols-[50px_auto] md:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 md:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'EPS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Enterprise Solutions
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Scalable</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>High-performance Aps</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Seamless Integration</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Our Angular development services deliver enterprise-grade applications
                                        engineered for scalability, security, and high performance, seamlessly
                                        integrating with your existing technology ecosystem to enhance operational
                                        efficiency and business agility. Leveraging Angular’s advanced capabilities, we
                                        create robust solutions that support growth, handle complex workflows, and
                                        maintain optimal performance under demanding conditions. Each application is
                                        strategically aligned with your business objectives, incorporating process
                                        automation, streamlined data management, and advanced analytics to empower
                                        informed decision-making, all while adhering to stringent security and
                                        compliance standards for long-term value and success.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'SPAS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Single-page Applications (SPAs)
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Seamless Navigation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Dynamic Content Upload</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Interactive UX</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, we specialise in developing high-performance Single-Page
                                        Applications (SPAs) with Angular, delivering seamless, desktop-like experiences
                                        that engage users and drive business outcomes. Our SPAs load once and
                                        dynamically update content without page reloads, ensuring exceptional speed,
                                        responsiveness, and interactivity. Leveraging Angular’s advanced architecture,
                                        we build scalable solutions capable of managing complex operations, integrating
                                        seamlessly with enterprise systems, and supporting future growth. Every
                                        application is engineered with robust security, optimised performance, and a
                                        user-centric design to align with your strategic objectives and deliver
                                        measurable value.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'WA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Web Application
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Interactive Web Apps</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Performance Optimisation</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We leverage the full capabilities of Angular to develop responsive, interactive,
                                        and future-ready web applications that meet the highest standards of modern web
                                        development. From intuitive customer-facing platforms to complex enterprise
                                        portals, our solutions are engineered for optimal performance, accessibility,
                                        and seamless user experiences. By combining Angular’s powerful framework with
                                        best practices in scalability, security, and UX design, we deliver applications
                                        that not only enhance user engagement but also align with your business
                                        objectives, driving measurable results and long-term digital success.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'UID'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        UI Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>User-centric Design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Data Binding</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Enhanced Engagement</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        In UI development, Grey InfoTech leverages Angular’s robust capabilities to
                                        design intuitive, visually engaging, and highly functional interfaces that
                                        elevate user experiences. As a dedicated Angular development agency, we
                                        prioritize user-centric design principles, ensuring every interface is
                                        accessible, responsive, and optimised for engagement across devices. By
                                        combining Angular’s dynamic data-binding with advanced CSS, animation
                                        techniques, and modern UX best practices, we deliver interfaces that seamlessly
                                        merge aesthetic appeal with functionality, enabling your digital products to
                                        captivate users while supporting your strategic business goals.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'AMAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Angular Mobile App Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Native Experience</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Seamless Engaging Experience </span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Grey InfoTech’s Angular mobile app development services deliver native-like
                                        experiences across both Android and iOS platforms, ensuring exceptional
                                        performance, functionality, and user engagement. By leveraging Angular’s
                                        powerful framework in conjunction with modern mobile development tools, we
                                        create feature-rich, responsive applications that are fully optimized for mobile
                                        devices. Our approach prioritizes seamless navigation, fast load times, and
                                        intuitive interfaces, enabling businesses to provide a consistent and engaging
                                        experience for users regardless of the platform, while aligning each solution
                                        with long-term scalability and business objectives.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'PWAS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Progressive Web Applications (PWAs)
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Lightweight</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Reliable User Experience</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Easy Installation</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We leverage Angular to develop high-performance Progressive Web Applications
                                        (PWAs) that merge the best features of web and mobile experiences. Our
                                        Angular-powered PWAs are fast, lightweight, and capable of functioning offline,
                                        ensuring reliability even in low-connectivity environments. By harnessing modern
                                        web capabilities, we create secure, SEO-friendly, and easily installable
                                        applications that can be added directly to users’ home screens. This approach
                                        enhances accessibility, engagement, and reach, while delivering a seamless,
                                        app-like experience across devices and platforms—empowering businesses to
                                        connect with their audiences anytime, anywhere.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'}
                 className={'lg:-mt-[25em] md:-mt-[25em] sm:-mt-[3em] -mt-[3em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/angular/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Benefits of using Angular for Software Development */}
            <div
                className={`lg:pt-[3em] md:pt-[2em] pt-[1em] lg:pb-[3em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div id={'benefit of using vue'}
                     className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Angular Benefit Header */}
                    <div
                        className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[3em] lg:mb-[5em] md:mb-[5em] sm:mb-[5em] mb-[5em]`}>
                        <div>
                            <h2 className='text-[1em] text-start sm:text-[1.5em] md:text-[2.5em] lg:text-[3.15em] font-[550] break-words whitespace-normal tracking-tight leading-[1.15] lg:pb-6'>
                                Benefits of Using <br className={'lg:block md:block hidden'}/>Angular for <br
                                className={'lg:block md:block hidden'}/>Development
                            </h2>
                        </div>
                        <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                            <p className={'text-justify text-[0.87em] font-[300]'}>
                                Angular provides a comprehensive framework for developing scalable, high-performance
                                applications that meet the demands of modern businesses. Its modular architecture and
                                reusable components streamline development, while built-in tools ensure code quality,
                                maintainability, and faster deployment. With strong community support and seamless
                                integration capabilities, Angular enables organizations to deliver feature-rich,
                                user-focused solutions that drive efficiency, enhance user engagement, and support
                                long-term growth.
                            </p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div
                        className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]`}>
                        <div id={'simplified development process'}>
                            <Image
                                src={isDayTime ? '/assets/vue/icon/risk1.svg' : '/assets/vue/icon/risk.svg'}
                                alt={'Simplifies Development Process'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.2] mb-8'}>
                                Simplifies <br className={'lg:block md:block hidden'}/>Development Process
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Angular’s modular architecture enables our developers to structure code with precision,
                                breaking down complex applications into manageable, reusable modules that streamline
                                development and maintenance. Its powerful two-way data binding minimizes manual DOM
                                manipulation, accelerating workflows and reducing the potential for errors. Combined
                                with declarative templates, Angular provides an intuitive development process that
                                shortens production timelines without sacrificing functionality, scalability, or
                                quality—ensuring rapid delivery of robust, future-ready applications.
                            </p>
                        </div>
                        <div id={'enhanced user experience'}>
                            <Image
                                src={isDayTime ? '/assets/vue/icon/sca1.svg' : '/assets/vue/icon/sca.svg'}
                                alt={'Enhanced User Experience'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.1em] leading-[1.2] font-[500] mb-8'}>
                                Enhanced User Experience
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Angular’s capability to dynamically load content without page refreshes delivers
                                seamless, responsive interfaces that enhance user engagement and satisfaction. Its
                                advanced data visualization features support intuitive, interactive experiences, while
                                UI component libraries such as Angular Material ensure a polished, consistent design
                                across all devices and platforms. Leveraging these strengths, our Angular website
                                development services produce smooth, high-performing digital experiences that keep users
                                engaged and deliver measurable business value.
                            </p>
                        </div>
                        <div id={'improved development efficiency'}>
                            <Image
                                src={isDayTime ? '/assets/vue/icon/test1.svg' : '/assets/vue/icon/test.svg'}
                                alt={'Improved Development Efficiency'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.2] mb-8'}>
                                Improved <br className={'lg:block md:block hidden'}/>Development Efficiency
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Built-in tools such as Angular CLI accelerate development by streamlining project setup,
                                scaffolding, and configuration, enabling rapid and efficient delivery. Coupled with
                                Angular’s reusable component architecture, developers can create modular, maintainable
                                code blocks that are easily implemented across multiple areas of an application. This
                                approach reduces redundancy, improves consistency, and enhances both the speed and
                                quality of our Angular development services, ensuring scalable solutions that meet
                                evolving business needs.
                            </p>
                        </div>
                        <div id={'strong community support'}>
                            <Image
                                src={isDayTime ? '/assets/vue/icon/fast1.svg' : '/assets/vue/icon/fast.svg'}
                                alt={'Strong Community Support'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Strong Community Support
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Angular’s extensive developer community, backed by regular contributions from Google,
                                ensures continuous enhancements, long-term stability, and comprehensive support for
                                development teams. This active ecosystem drives the framework’s evolution in line with
                                the latest web standards and industry best practices, enabling applications to remain
                                modern, secure, and competitive. By choosing Angular, you benefit from a future-ready
                                technology stack that adapts with the market and safeguards your investment in the
                                digital landscape.
                            </p>
                        </div>
                        <div id={'seamless integration'}>
                            <Image
                                src={isDayTime ? '/assets/vue/icon/att1.svg' : '/assets/vue/icon/att.svg'}
                                alt={'Seamless Integration'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Seamless Integration
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Angular offers seamless integration with a wide range of back-end platforms, including
                                Node.js, enterprise databases, and third-party APIs, enabling the development of
                                powerful, scalable, and feature-rich applications tailored to complex business
                                requirements. At Grey InfoTech, we leverage Angular’s flexibility and robust
                                architecture to ensure smooth, secure, and efficient integration processes, whether we
                                are building a new solution from the ground up or extending the capabilities of an
                                existing system. Our approach prioritizes performance optimization, data consistency,
                                and maintainability, ensuring your application operates seamlessly within your
                                technology ecosystem while remaining adaptable to future growth and evolving business
                                needs.
                            </p>
                        </div>
                        <div id={'built for responsiveness'}>
                            <Image
                                src={isDayTime ? '/assets/vue/icon/cust1.svg' : '/assets/vue/icon/cust.svg'}
                                alt={'Build for Responsiveness'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Built for Responsiveness
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Angular-powered applications are engineered for optimal performance across both desktop
                                and mobile devices, delivering a consistent, high-quality user experience regardless of
                                platform. With built-in support for Progressive Web Apps (PWAs), Angular enables
                                native-like functionality on mobile, offering fast load times, offline capabilities, and
                                enhanced engagement. This cross-platform compatibility significantly reduces development
                                time and resource requirements, allowing Grey InfoTech to deliver premium Angular app
                                development services efficiently and cost-effectively. Our approach empowers businesses
                                to enter the market faster with a robust, scalable, and future-ready solution that
                                drives user adoption and long-term success.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* What Powers Our Angular Development */}
            <div className={` lg:-mt-[12em] md:-mt-[12em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[6em] md:pt-[6em] pt-[1.2em] lg:pb-[6em] md:pb-[6em] pb-[1.2em] mt-14`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div className={'lg:mr-[6em]'}>
                            <h2 className={`lg:text-[3.1em] md:text-[3.1em] text-[1.5em] font-[500] justify-center tracking-tight lg:mb-12 mb-7 leading-[1.2]`}>
                                What Powers Our <br className={'lg:block md:block hidden'}/>Angular Development
                            </h2>
                            <p className={'text-[0.873em] font-[400] leading-[1.5] tracking-normal text-justify'}>
                                Our Angular development is driven by a combination of deep technical expertise, proven
                                best practices, and a commitment to delivering business-focused results. We leverage
                                Angular’s advanced features, robust architecture, and seamless integration capabilities
                                to build scalable, high-performing applications tailored to your strategic goals.
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
                                    <span>Platforms and Frameworks</span>
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
                                        At Grey InfoTech, our Angular development services are reinforced by modern
                                        frameworks such as Node.js, Express, and Ionic, enabling us to deliver secure,
                                        scalable, and high-performing cross-platform solutions. Node.js provides a
                                        robust, event-driven backend infrastructure capable of handling high-concurrency
                                        workloads with efficiency, while Express offers a streamlined framework for
                                        building flexible, maintainable, and enterprise-grade server-side applications.
                                        Ionic enhances mobile responsiveness through hybrid development, ensuring a
                                        consistent, native-like experience across devices without duplicating
                                        development efforts. By integrating these technologies with Angular’s powerful
                                        front-end capabilities, we create tailored solutions — from dynamic SPAs to
                                        complex enterprise systems — designed to optimise performance, accelerate
                                        time-to-market, and support long-term business growth.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(1)}
                                    className="flex items-center mt-6 justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>DevOps and Clouds</span>
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
                                        We integrate robust DevOps best practices into every Angular
                                        development engagement, ensuring each project benefits from continuous
                                        integration, automated testing, and streamlined delivery processes. Leveraging
                                        industry-leading tools such as Jenkins and Docker, we implement CI/CD pipelines
                                        that enable rapid, reliable, and low-risk releases, reducing human error and
                                        accelerating time-to-market without compromising quality. Our approach extends
                                        beyond development into deployment, utilising leading cloud platforms such as
                                        AWS, Microsoft Azure, and Google Cloud to deliver secure, scalable, and
                                        high-availability infrastructure. By incorporating advanced capabilities such as
                                        intelligent load balancing, automated scaling, data redundancy, and
                                        cost-optimised resource utilisation, we ensure that your Angular applications
                                        are not only performant and secure, but also adaptable to evolving business
                                        demands. This end-to-end methodology positions your digital solutions to remain
                                        competitive, resilient, and future-ready in an ever-changing technology
                                        landscape.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(2)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Libraries, Components and APIs</span>
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
                                        To deliver exceptional UI/UX, Grey InfoTech leverages industry-leading component
                                        libraries such as Angular Material, PrimeNG, and other pre-built frameworks,
                                        enabling rapid development while maintaining flawless design consistency and
                                        adherence to modern interface standards. These tools allow us to craft sleek,
                                        user-friendly, and visually engaging interfaces that enhance usability and drive
                                        user satisfaction. When off-the-shelf components are insufficient, our Angular
                                        development team engineers custom solutions tailored to your unique
                                        requirements, ensuring that functionality, performance, and design align
                                        perfectly with your business objectives. We also integrate third-party APIs—such
                                        as payment gateways, analytics platforms, and other mission-critical
                                        services—seamlessly and securely, providing your application with robust
                                        capabilities while preserving scalability and adaptability for future
                                        enhancements. This balanced approach ensures your Angular application not only
                                        meets today’s functional and aesthetic demands but is also positioned to evolve
                                        alongside your business needs.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(3)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Integrated Environments for Development</span>
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
                                        At Grey InfoTech, we utilise industry-leading development environments such as
                                        Visual Studio Code, WebStorm, and other advanced IDEs to maximise efficiency,
                                        accuracy, and collaboration throughout the AngularJS development lifecycle.
                                        These platforms are equipped with powerful coding, debugging, and optimisation
                                        tools that enable our developers to work seamlessly, whether individually or as
                                        part of a distributed team. Integrated version control systems like GitHub and
                                        Bitbucket provide robust change tracking, branch management, and real-time
                                        collaboration, ensuring complete transparency and traceability at every stage of
                                        development. We further enhance quality and delivery speed by embedding
                                        automated testing frameworks and continuous integration pipelines directly into
                                        our workflow, allowing for the early detection of potential issues and
                                        maintaining a consistently stable and maintainable codebase. This disciplined,
                                        process-driven approach not only accelerates time-to-market but also guarantees
                                        that every AngularJS solution we deliver meets the highest standards of
                                        performance, scalability, and long-term business value.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(4)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Databases, Testing, Monitoring, QA and Reporting</span>
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
                                        At Grey InfoTech, we leverage robust database technologies such as MySQL,
                                        PostgreSQL, and MongoDB to design and implement secure, scalable, and
                                        high-performance backend architectures tailored to your operational
                                        requirements. This ensures that your data is structured, managed, and retrieved
                                        efficiently, supporting seamless integration with your Angular applications. To
                                        maintain uncompromising quality, we employ advanced testing frameworks including
                                        Karma, Jasmine, and Protractor, rigorously validating every feature for
                                        functionality, performance, and security before deployment. Our commitment to
                                        reliability extends beyond development, with continuous monitoring through
                                        industry-standard tools like Prometheus and New Relic, enabling real-time
                                        performance tracking and proactive issue resolution. Detailed QA reports provide
                                        full transparency to stakeholders, while automated alerts ensure swift action
                                        when anomalies arise. This disciplined, data-driven approach guarantees that
                                        every solution we deliver is optimised for long-term stability, operational
                                        efficiency, and measurable business value.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(5)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Active and Supportive Community</span>
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
                                        The Angular ecosystem is strengthened by a vibrant and collaborative global
                                        community of developers, contributors, and technology enthusiasts who actively
                                        share knowledge, resources, and industry best practices. This wealth of
                                        collective expertise is supported by extensive official documentation,
                                        comprehensive tutorials, and a wide range of third-party tools that streamline
                                        learning, development, and troubleshooting. Backed by Google, Angular benefits
                                        from continuous innovation, long-term stability, and robust support, reinforced
                                        through regular updates, feature enhancements, and adherence to evolving web
                                        standards. The ecosystem thrives through active participation in community
                                        events, conferences, and online forums, enabling Angular development experts to
                                        exchange ideas, solve complex challenges, and stay ahead of technological
                                        advancements, ensuring that applications built with Angular remain competitive,
                                        scalable, and future-ready.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Angular Development Process */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] md:px-[4.6em] lg:pt-[6em]] md:pt-[6em] pt-[2emm] lg:pb-[6em]] md:pb-[6em] pb-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] md:pb-[4em] pb-[3em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3.2em] md:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] md:pr-[1em] leading-[1.05]`}>
                            Our Angular <br className={'lg:block md:block hidden'}/>Development <br
                            className={'lg:block md:block hidden'}/>Process
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] md:-ml-[3em] tracking-noromal'>
                            Our Angular development process combines strategic planning, agile methodologies, and
                            rigorous quality assurance to deliver scalable and efficient applications. From initial
                            requirements analysis to deployment and ongoing support, we ensure every project aligns with
                            your business objectives and delivers measurable value.
                        </p>
                    </div>
                </div>

                {/* Discovery */}
                <div id={'discovery'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Discovery
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[16em] md:pl-[14em] lg:-mt-[1.5em] md:-mt-[1.5em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={'/assets/angular/discovery.jpg'}
                                alt='Discovery'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Our process begins with comprehensive consultations designed to gain a deep understanding of
                            your business objectives, target audience, and technical requirements. We conduct thorough
                            market analysis, evaluate user behavior patterns, and study competitor strategies to uncover
                            opportunities and potential challenges. These insights are then translated into a strategic,
                            data-driven development plan that prioritizes functionality, scalability, and user
                            engagement. By ensuring that every feature is directly aligned with your overarching
                            business goals, we minimize risks, accelerate time to market, and maximize long-term product
                            value, setting the foundation for a successful and future-proof Angular solution.
                        </p>
                    </div>
                </div>

                {/* Design */}
                <div id={'design'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Design
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[16em] md:pl-[14em] lg:-mt-[1.5em] md:-mt-[1.5em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={'/assets/angular/design.jpg'}
                                alt='Design'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            As part of our Angular web development services, our design team collaborates closely with
                            stakeholders to transform business objectives into clear, user-focused design concepts. We
                            develop detailed wireframes, high-fidelity mockups, and interactive prototypes that serve as
                            the blueprint for the final application. Every design decision prioritizes usability,
                            accessibility, and brand consistency, ensuring the interface not only meets industry
                            standards but also engages and resonates with the target audience. By incorporating
                            stakeholder input and user feedback early in the process, we refine and optimize the
                            experience before development begins, reducing costly revisions and accelerating project
                            delivery.
                        </p>
                    </div>
                </div>

                {/* Development */}
                <div id={'development'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Development
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[10em] md:pl-[8em] lg:-mt-[2.3em] md:-mt-[2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <Image
                                src={'/assets/angular/development.jpg'}
                                alt='Development'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            We implement agile methodologies in our custom Angular development services to deliver
                            high-quality functionality in incremental stages, enabling continuous stakeholder feedback
                            and rapid adaptation to evolving requirements. By adhering to best coding practices and
                            leveraging Angular’s modular architecture, we create maintainable, scalable, and secure
                            solutions designed for long-term viability. This approach not only accelerates
                            time-to-market but also ensures that every component is optimized for performance,
                            adaptability, and seamless integration, resulting in a future-ready product that aligns
                            perfectly with your business objectives.
                        </p>
                    </div>
                </div>

                {/* Testing */}
                <div id={'testing'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Testing
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[10em] md:pl-[8em] lg:-mt-[3em] md:-mt-[2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <Image
                                src={'/assets/angular/testing.jpg'}
                                alt='Testing'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            At Grey InfoTech, we employ a rigorous multi-layered testing strategy that includes unit,
                            integration, and end-to-end testing to ensure your Angular application performs flawlessly
                            across diverse environments and use cases. By embedding automated testing into our CI/CD
                            pipeline, we detect and resolve potential issues at the earliest stages of development,
                            reducing downtime and preventing costly post-deployment errors. This proactive approach not
                            only safeguards quality and performance but also ensures a smooth, reliable user experience
                            from launch onward.
                        </p>
                    </div>
                </div>

                {/* Deployment */}
                <div id={'deployment'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Deployment
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[10em] md:pl-[8em] lg:-mt-[3em] md:-mt-[2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <Image
                                src={'/assets/angular/deployment.jpg'}
                                alt='Deployment'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            At Grey InfoTech, our deployment strategy is designed to ensure a seamless transition from
                            development to production with minimal disruption to your operations. We meticulously
                            configure infrastructure, conduct final performance and security checks, and manage staged
                            rollouts to maintain system stability. In addition, we establish robust contingency plans to
                            address any potential launch challenges immediately, safeguarding uptime and ensuring a
                            reliable, high-performance application from day one.
                        </p>
                    </div>
                </div>

                {/* Maintenance */}
                <div id={'maintenance'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Maintenance
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[10em] md:pl-[8em] lg:-mt-[3em] md:-mt-[2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <Image
                                src={'/assets/angular/maintenance.jpg'}
                                alt='Maintenance'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Post-deployment, Grey InfoTech provides comprehensive monitoring and ongoing support to
                            ensure your application remains secure, high-performing, and aligned with evolving business
                            objectives. We proactively track system performance, identify and address potential issues
                            before they impact users, and deliver timely updates and feature enhancements in response to
                            market changes or growth opportunities. Our commitment ensures your Angular application
                            continues to deliver optimal value, adaptability, and reliability well beyond its initial
                            launch.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'last image'}
                 className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/angular/last.jpg'}
                    alt={'last Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Why We are a great Angular Partner */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'angular partner'}
                     className={`lg:pt-[8em] md:pt-[8em] pt-[4em] relative lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Development Approach */}
                    <div className={`sticky top-0 z-10 bg-opacity-90 backdrop-blur-md ${
                        isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                    }`}>
                        <div className="border-b-[0.1em] border-gray-300/50 pb-[2em]">
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                                Why We are <br className={'lg:block md:block hidden'}/>A Great Angular Partner
                            </h2>
                            <p className={'text-[0.87em] font-[300] leading-[1.5] tracking-tight'}>
                                We pair deep Angular expertise with a business-focused approach, delivering scalable,
                                high-performance solutions through <br className={'lg:block md:block hidden'}/>seamless
                                collaboration and timely execution.
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
                                                Transparent Pricing
                                            </>
                                        ),
                                        description: (
                                            <>
                                                At Grey InfoTech, we offer a transparent pricing model for our Angular
                                                development services, providing clear cost breakdowns from the outset.
                                                With no hidden fees, you can manage budgets confidently while ensuring
                                                maximum value and return on investment.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        subtitle: "02",
                                        title: (
                                            <>
                                                Commitment
                                            </>
                                        ),
                                        description: (
                                            <>
                                                Grey InfoTech’s Angular web development services extend beyond project
                                                completion, focusing on building lasting partnerships. We align closely
                                                with your business objectives, providing ongoing support, performance
                                                optimization, and scalable enhancements to ensure sustained success and
                                                adaptability in a changing digital landscape.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        subtitle: "03",
                                        title: (
                                            <>
                                                Confidentiality
                                            </>
                                        ),
                                        description: (
                                            <>
                                                At Grey InfoTech, we prioritize the security and confidentiality of your
                                                project and data. Adhering to industry-leading standards and protocols,
                                                we enforce strict NDAs and comply fully with GDPR and other relevant
                                                regulations, guaranteeing comprehensive protection of your intellectual
                                                property and sensitive information throughout our collaboration.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 4,
                                        subtitle: "04",
                                        title: (
                                            <>
                                                Efficiency
                                            </>
                                        ),
                                        description: (
                                            <>
                                                At Grey InfoTech, we integrate agile development methodologies with
                                                extensive Angular expertise to deliver projects on time and within
                                                budget. Our Angular development services emphasize rapid prototyping,
                                                iterative refinement, and streamlined workflows, ensuring high-quality,
                                                scalable solutions that align precisely with your business goals and
                                                consistently surpass expectations.
                                            </>
                                        ),
                                    }
                                ].map((card, index, array) => (
                                    <div
                                        key={card.id}
                                        className={`group relative h-[350px] w-[400px] overflow-hidden flex flex-col items-start justify-self-start text-start ${
                                            isDayTime ? 'text-white' : 'text-black'
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
                            At Grey InfoTech, Angular development services are delivered by a skilled team dedicated to
                            building scalable, maintainable, and high-performance web applications that align with your
                            business goals. A project manager oversees the entire development lifecycle, ensuring clear
                            communication, milestone tracking, and alignment with your strategic objectives. Our Angular
                            developers leverage the framework’s powerful features to create dynamic and responsive
                            front-end applications tailored to your specific needs.<br/><br/>

                            Complementing the development team are UI/UX designers who focus on delivering seamless and
                            intuitive user experiences, quality assurance specialists who rigorously test for
                            performance and reliability, and DevOps engineers who manage deployment and ongoing
                            maintenance. Throughout the process, your feedback is actively incorporated to ensure the
                            final product delivers measurable business value and meets your expectations.
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

            {/* Partners Sections */}
            <div id={'partners'}
                 className={`relative max-w-full  mx-auto px-4 sm:px-6 lg:px-[4.6em] h-auto overflow-hidden ${
                     isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className={`justify-self-start text-start lg:pt-[5em] md:pt-[5em] pt-[2em] lg:mb-12 mb-6`}>
                    <h3 className={'text-[1em] font-[600]'}>Our partners</h3>
                </div>
                <div
                    className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-6 lg:pb-[5em] md:pb-[5em] pb-[2em]`}>
                    {partners.map((partner) => (
                        <div key={partner.id} className={`flex justify-center items-center`}>
                            <Image
                                src={`/assets/partners/${isDayTime ? partner.dayImage || 'default.svg' : partner.nightImage || 'default.svg'}`}
                                alt={partner.name}
                                width={100}
                                height={100}
                            />
                        </div>
                    ))}
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
                            Frequently Asked <br className={'lg:block md:block hidden'}/>Angular Questions
                        </h2>
                        <p className={'text-[0.873em] font-[300] leading-[1.3]'}>
                            Find clear, concise answers to common questions about Angular development. <br
                            className={'lg:block md:block hidden'}/>Our FAQ addresses
                            key topics to help you understand the framework’s benefits, capabilities, <br
                            className={'lg:block md:block hidden'}/>and how it can
                            drive your business forward.
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
                            <span>Who develops Angular?</span>
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
                                Angular, developed and actively maintained by Google, stands as a highly reliable and
                                mature framework supported by one of the world’s leading technology companies. This
                                backing guarantees regular updates, security patches, and continuous enhancements
                                aligned with the evolving web standards and developer needs. The strong and vibrant
                                Angular ecosystem, including extensive tooling, libraries, and community support,
                                ensures that your applications remain modern, scalable, and competitive in today’s
                                fast-paced digital landscape. Partnering with Angular means investing in a future-proof
                                technology that empowers your business with stability, innovation, and ongoing industry
                                best practices.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is Angular, and why was it introduced?</span>
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
                                Angular is a robust, full-featured framework for building client-side applications that
                                streamlines the development of sophisticated, high-performance web solutions. Designed
                                with scalability and maintainability in mind, Angular empowers developers to create
                                visually compelling and highly responsive user interfaces that deliver seamless user
                                experiences across devices. Its comprehensive UI/UX development capabilities, combined
                                with powerful tools for modular architecture and data binding, enable businesses to
                                deploy efficient, secure, and scalable applications that meet modern digital demands and
                                drive measurable value.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What is data binding in Angular, and which type of data binding does Angular use?</span>
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
                                Data binding in Angular is a core mechanism that synchronizes the state between a
                                component’s logic and its template, facilitating seamless interaction between the model
                                and the view. Utilizing two-way data binding, Angular ensures that any changes in the
                                component’s data automatically reflect in the user interface, while user inputs
                                simultaneously update the underlying model. This bidirectional flow promotes efficient,
                                real-time updates, resulting in dynamic and responsive applications that enhance user
                                experience and reduce development complexity.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are Single Page Applications (SPAs), and how do they work?</span>
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
                                Single Page Applications (SPAs) are web applications that load a single HTML page
                                initially and dynamically update content as users interact with the app. This approach
                                significantly enhances performance by minimizing full-page reloads and delivering a
                                smoother, more responsive user experience. SPAs enable faster navigation and seamless
                                transitions, making them ideal for modern web applications focused on high interactivity
                                and optimal usability.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What are decorators and annotations in Angular?</span>
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
                                In Angular, decorators and annotations serve as metadata that define and configure
                                classes as components, directives, modules, and other building blocks. This metadata
                                guides Angular’s runtime behavior, enabling it to understand how to process and
                                instantiate these classes, manage their lifecycle, and integrate them within the
                                application’s architecture. Decorators are essential for structuring scalable and
                                maintainable Angular applications.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What is AOT (Ahead-of-Time) compilation in Angular?</span>
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
                                Ahead-of-Time (AOT) compilation in Angular is the process of converting your components
                                and templates into optimized native JavaScript and HTML before the application is loaded
                                in the browser. This pre-compilation enhances performance by reducing runtime parsing
                                and improves security by minimizing vulnerabilities associated with template injection.
                                AOT ensures faster rendering and a more efficient, secure user experience.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default AngularDevelopment;