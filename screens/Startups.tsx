'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import {AnimatePresence, motion} from 'framer-motion'
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import FloatingButton from "@/components/FloatingButton";

const reasons = [
    {
        id: 1,
        title: 'Proven History of Commercial Achievement',
        description: 'We have assisted startups, such as POAWD Ltd., in reaching noteworthy milestones and scaling to' +
            ' success.  Our emphasis on creating user-centered, scalable solutions guarantees that your firm is ready for market success.',
    },
    {
        id: 2,
        title: 'Startup-Oriented Proficiency',
        description: 'We create solutions to meet strict budgets, short turnaround times, and changing objectives since' +
            'we recognize the difficulties faced by entrepreneurs.  Our customized strategy guarantees that your software' +
            ' is scalable, agile, and in line with business goals.'
    },
    {
        id: 3,
        title: 'Complete Assistance',
        description: 'We support you at every stage of your journey, from conception to launch and beyond.  Our proactive' +
            ' support guarantees that your software develops without hiccups, freeing you up to concentrate on growing your company.'
    },
    {
        id: 4,
        title: 'Innovative Techniques and Technologies',
        description: 'We use agile development in conjunction with frameworks like React, Node.js, and Laravel to provide' +
            ' cutting-edge, flexible, and future-proof solutions that expand with your company.'
    },
    {
        id: 5,
        title: 'A collaborator in development',
        description: 'We consider ourselves to be your partner, not just a supplier of services.  Every solution is designed' +
            ' to assist your long-term success and goals thanks to our collaborative approach.'
    },
];

const Startups = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);


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

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex % reasons.length) + 1);
        }, 3000); // Change slide every 3 seconds

        return () => {
            clearInterval(interval);
        }; // Clean up the interval on unmount
    }, []);


    const handleScroll = () => {
        const sections = [
            "integration",
            "virtual",
            "data",
            "scalable",
            "custom",
            "cloud",
            "end",
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

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const {top, bottom} = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (top < windowHeight * -0.2 || bottom < windowHeight * -0.2) {
                    setIsBackgroundActive(true);
                } else {
                    setIsBackgroundActive(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

            {/* Hero */}
            <div
                className={`relative pt-[3em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <h1
                    className={`border-b pb-[0.5em] border-gray-500/50 px-0 constant-text lg:text-[5em] md:text-[3em] text-[2em] lg:mt-[3em] md:mt-[3em] mt-[1.5em] leading-[1.1] font-[700] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    Development<br/>services for startups</h1>
                <div className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src='/assets/startup/hero.jpg'
                        alt='startups'
                        width={1920}
                        height={580}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                </div>
            </div>


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
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase text-[0.8em] font-[300] lg:tracking-wider tracking-tight'>
                            YOUR INSIGHTS, OUR EXPERIENCE</h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='capitalize lg:text-[3em] md:text-[3em] text-[1.8em] font-[700] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Enabling startups to <br className={'lg:block md:block hidden'}/>launch, grow and succeed
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.875em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>Our specialty at <Link href='/#'
                                                          className={`${isDayTime ? 'black' : 'white'} font-[500]`}>Grey
                                    InfoTech</Link> is
                                    turning
                                    innovative concepts into digital products
                                    that are profitable. We have years of experience working with startups, so we are
                                    aware of the particular difficulties
                                    they face, such as limited funding, short turnaround times, and the requirement for
                                    scalable solutions.</p>
                            </div>
                            <div>
                                <p>Our customized strategy blends state-of-the-art technology, creative thinking, and a
                                    strong dedication to your development. Grey InfoTech is your success partner whether
                                    you&#39;re scaling your business or creating an <Link href='/services/MVP'
                                                                                          className='border-b-[1px] border-gray-200'>MVP</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div
                className={`-mt-[3em] ${isDayTime ? ' bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-100 via-slate-400 to-slate-700'}`}>
                <div id={'development-solutions-for-startups'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div>
                            <h2 className={`lg:text-[3.3em] md:text-[2.5em] sm:text-[2em] text-[2em] font-[500] justify-center tracking-tight leading-[1.1]`}>
                                Development<br/>solutions<br/>for startups
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] md:-ml-[3.5em] tracking-noromal'>
                                Writing code is only one aspect of developing software for a startup; another is laying
                                the
                                groundwork for expansion, creativity, and sustained success.
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
                                    {id: "01", title: "Integration solutions", target: "integration"},
                                    {id: "02", title: "Virtual CTO services", target: "virtual"},
                                    {id: "03", title: "Data-driven solutions", target: "data"},
                                    {id: "04", title: "Scalable MVPs", target: "scalable"},
                                    {id: "05", title: "Custom application development", target: "custom"},
                                    {id: "06", title: "Cloud-based platforms", target: "cloud"},
                                    {id: "07", title: "End-to-End production lifecycle management", target: "end"},
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
                        <div className={'lg:-ml-[7em]'}>
                            <div
                                className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:mb-[16em] md:mb-[16em] lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'integration'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Integration
                                        solutions</h2>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>By connecting
                                        your
                                        product to
                                        third-party APIs, payment gateways, CRMs, and other crucial systems, our
                                        integration
                                        solutions guarantee a cohesive and effective workflow. We help you increase user
                                        satisfaction, save time, and streamline operations by removing data silos and
                                        improving interoperability. We offer solutions that support your company&#39;s
                                        goals,
                                        whether you&#39;re integrating pre-existing tools or require specially designed
                                        connections.</p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'virtual'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Virtual
                                        CTO services</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Startup strategy</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Technical leadership</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Tech roadmap</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>Early on, it is
                                        not practical for many startups to hire a full-time Chief Technology Officer
                                        (CTO).
                                        Our Virtual CTO services can help with that. Without the long-term commitment of
                                        a
                                        full-time hire, we provide startups with access to senior-level technical
                                        expertise
                                        and strategic direction. In order to make well-informed technology decisions,
                                        match
                                        development with business goals, and develop a plan for scalable expansion, our
                                        virtual CTOs collaborate closely with your team.</p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'data'}>
                                    <h2 className="text-[1.5em] font-[500] mb-3">Data-driven solutions</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                  <span
                                      className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Business Intelligence</span>
                                        <span
                                            className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Data analytics</span>
                                        <span
                                            className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Data driven decisions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>One of your
                                        most
                                        important
                                        resources is data, which we assist you in using to guide your choices. We create
                                        solutions that transform unstructured data into strategic possibilities, ranging
                                        from operational measurements, KPIs, and OKRs to consumer behavior analytics.
                                        This
                                        enables you to fully comply with data protection laws while improving customer
                                        engagement, streamlining your offering, and finding new income sources.</p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'scalable'}>
                                    <h2 className="text-[1.5em] font-[500] mb-3">Scalable MVPs</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                   <span
                                       className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>MVP development</span>
                                        <span
                                            className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Lean startup</span>
                                        <span
                                            className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Market validation</span>
                                        <span
                                            className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Startup growth</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>More than just
                                        a
                                        prototype, a
                                        Minimum Viable Product (MVP) is your first step in gaining early adopters and
                                        validating your business concept. Many startups have benefited from our
                                        assistance
                                        in creating MVPs that offer distinctive business value. Our method guarantees
                                        that
                                        your MVP is scalable in addition to being functional, allowing you to add
                                        features
                                        and grow as your company does. Quick development cycles allow you to launch your
                                        MVP
                                        as soon as possible, get insightful feedback, and iterate efficiently to
                                        maximize
                                        the potential of your product.</p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'custom'}>
                                    <h2 className="text-[1.5em] font-[500] mb-3">Custom application
                                        development</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                   <span
                                       className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Custom apps</span>
                                        <span
                                            className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Bespoke software</span>
                                        <span
                                            className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Startup development</span>
                                        <span
                                            className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Agile</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>Any successful
                                        startup relies
                                        heavily on custom applications, which is why you&#39;re doing this. We create
                                        custom
                                        software that is suited to your target market and business requirements. We
                                        develop
                                        cutting-edge solutions that address practical issues and provide financial
                                        value,
                                        whether it&#39;s a robust web platform, a <Link
                                            href='/services/Mobile-Application-Development'
                                            className='border-b-[1px] border-gray-200'>mobile
                                            app</Link>, or a combination of the two.</p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'cloud'}>
                                    <h2 className="text-[1.5em] font-[500] mb-3">Cloud-based platforms</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                   <span
                                       className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Cloud computing</span>
                                        <span
                                            className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Scalable platforms</span>
                                        <span
                                            className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Secure software</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>Cloud-based
                                        platforms offer the
                                        foundation for scalability and reliability, which are crucial for startups. Our
                                        cloud solutions guarantee excellent security and performance while optimizing
                                        your
                                        operations by enabling software accessibility from any location at any time. We
                                        work
                                        with leading cloud providers such as Amazon AWS, Azure and Digital Ocean to
                                        build
                                        platforms that grow with your business, whether dealing with spikes in user
                                        activity, expanding into new markets, or adding advanced functionalities.</p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`} id={'end'}>
                                    <h2 className={"text-[1.5em] font-[500] mb-3"}>End-to-End product lifecycle
                                        management</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                   <span
                                       className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Product lifecycle</span>
                                        <span
                                            className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Startup support</span>
                                        <span
                                            className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Feature enhancements</span>
                                        <span
                                            className={`px-4 py-2 ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full`}>Startup scaling</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>A startup
                                        product
                                        launch is just
                                        the first step. Our comprehensive product lifecycle management services
                                        guarantee
                                        that your software keeps developing and prospering. We are your partner at every
                                        stage of the process, from original development and implementation to upgrades,
                                        scalability, and continuing maintenance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky lg:-mt-[19em] -mt-[2em] max-w-full w-full lg:h-[100vh]">
                <Image
                    src="/assets/startup/hybrid.jpg"
                    alt="startup development services"
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            </div>

            <div className={`relative lg:py-32 py-16 ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className='relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 max-w-[90em] mx-auto px-4 sm:px-6 lg:px-[4.6em]max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  lg:mb-32 mb-16'>
                    <div className='relative sm:mb-8'>
                        <Image
                            src="/assets/startup/startup.jpg"
                            alt="startup development services"
                            width={410}
                            height={40}
                            style={{
                                height: 'auto',
                            }}
                        />
                    </div>
                    <div className={`lg:-ml-[6.4em] lg:mr-[5.5em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                        <h2 className='lg:text-[3em] md:text-[2.3em] text-[1.8em] font-[700] tracking-tight pb-6 rounded-none lg:pr-[2.2em] lg:mt-7'>Your
                            digital adventure</h2>
                        <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.2em] border-b rounded-none pb-9 leading-[1.5] lg:pr-[3em]'>
                            Our specialty in the fast-paced IT industry is assisting business owners and entrepreneurs
                            in
                            realizing their product concepts. And we&#39;ve learned a few things from our over 8
                            years of
                            expertise.<br/><br/>
                            In addition to collaborating with well-established companies, we have developed MVPs, built
                            digital products, scaled tech and infrastructure, and ultimately sold a number of financed
                            startups. We can provide you with that experience.
                        </p><br/><br/>
                        <p className='text-[0.85em] font-[450] tracking-tighter text-justify lg:-mt-[0.2em]'>Let&#39;s
                            discuss your plans and figure out how we can support you.</p><br/>
                        <Link href='/contact'>
                            <button
                                className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[3%]`}></span>
                                <span
                                    className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-100 group-hover:-translate-x-8`}></span>
                                <span
                                    className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'}`}>Get
                                in touch <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                <span
                                    className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-black' : 'border-white'} rounded-full"}></span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Why Grey InfoTech dark theme */}
            <div className={`relative lg:-mt-20 py-36 ${isDayTime ? 'bg-white' : 'bg-black'} lg:mb-20 mb-12`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] border-b-[0.001em] pb-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                    <div>
                        <h2 className='lg:text-[3em] md:text-[2.3em] text-[1.8em] font-[700] tracking-tighter leading-[1.15] lg:pb-6 rounded-none pr-[3.2em]'>Why
                            Grey infotech for your startup</h2>
                    </div>
                    <div className='lg:-ml-[7em]'>
                        <p className='text-[0.875em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                            We have completed projects for businesses across a wide range of industries. Details
                            about this experience that might be pertinent to you are included in this section.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className={`relative -mt-20 ${isDayTime ? 'bg-white' : 'bg-black'} lg:mb-16 lg:pb-28 pb-14 mb-12  px-6`}>
                <div
                    className='relative mx-auto px-4 sm:px-6 lg:px-[4em] grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-36'>
                    {/* Left Section */}
                    <div
                        className={`relative text-[0.873em] lg:leading-[1.5] ${isDayTime ? 'text-black' : 'text-white'} flex flex-col justify-center mb-4 lg:pl-4 lg:pr-[3em]`}>
                        {reasons.map((reason, index) => (
                            <div
                                key={reason.id}
                                className={`relative mb-6 ${
                                    index + 1 === activeIndex
                                        ? isDayTime
                                            ? 'bg-white py-5'
                                            : 'bg-black py-5'
                                        : ''
                                }`}
                            >
                                <h3
                                    className={`relative pr-[6em] leading-[1.2] lg:text-[1.5em] text-[1em] mb-4 cursor-pointer transition-all ${
                                        index + 1 === activeIndex
                                            ? isDayTime
                                                ? 'text-black font-bold'
                                                : 'text-white font-bold'
                                            : 'text-gray-500'
                                    }`}
                                    onClick={() => setActiveIndex(index + 1)}
                                >
                                    {reason.title}
                                </h3>
                                <div>
                                    <AnimatePresence mode="wait">
                                        {index + 1 === activeIndex && (
                                            <motion.div
                                                key={reason.id}
                                                initial={{opacity: 0, y: -50}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: 0}}
                                                transition={{duration: 0}}
                                                className={`relative inline-block ${
                                                    isDayTime ? 'text-black' : 'text-white'
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
                    <div className='lg:mt-[3em] h-[30vh] sticky'>
                        <Image
                            src={'/assets/startup/mockup.jpg'}
                            alt="Mockup"
                            width={660}
                            height={150}
                        />
                    </div>
                </div>
                <div
                    className={`lg:px-[28em] items-center ${isDayTime ? 'text-black bg-white' : 'text-white bg-black'} justify-center`}>
                    <h2 className='lg:text-[3em] text-[1.5em] font-[600] tracking-tighter leading-[1.15] pb-6 text-center'>
                        Prepared to initiate the discussion?
                    </h2><br/>
                    <Link href='/contact'
                          className='flex items-center justify-center-safe text-center'>
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

            {/* Startups Products */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:-mt-20 lg:py-32 md:py-16 py-8 lg:mt-32 md:mt-24 mt-8  ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[6em] pb-[3em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3em] md:text-[2.3em] text-[1.8em] font-[700] capitalize justify-center tracking-tight lg:pr-[3em] mb-6 leading-[1.2]`}>
                            Popular product types for startups</h2>
                    </div>
                    <div>
                        <p className='text-[0.87em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                            These app categories are not only popular, but they have also been shown to generate
                            significant market traction when developed with the proper competence. Our talents
                            extend far beyond these areas; if you have a vision, we&#39;re here to make it reality.
                        </p>
                    </div>
                </div>

                {/* on-Demand Service Apps */}
                <Link href='/industries/Ondemand' className='relative'>
                    <div
                        className={`grid lg:grid-cols-2 grid-cols-1 lg:mb-10 mb-8 gap-4 border-b-[1px] lg:pb-[3em] pb-[2em] ${isDayTime ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'} group`}>
                        <div className='relative'>
                            <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] leading-[1.2] rounded-none'>
                                On-Demand Services Apps
                            </h2>
                            <div
                                className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.4em] md:pl-[18em] md:-mt-[3.4em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                                <Image
                                    src={'/assets/startup/demand.jpg'}
                                    alt='On-Demand Services'
                                    height={250}
                                    width={250}
                                />
                            </div>
                        </div>
                        <div>
                            <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                                Provide real-time monitoring, scheduling, and location-based features for
                                consumers&#39;
                                convenience and efficiency, and connect them to services instantaneously.
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Healthcare and Fitness */}
                <Link href='/industries/healthcare' className='relative'>
                    <div
                        className={`grid lg:grid-cols-2 grid-cols-1 lg:mb-10 mb-8 gap-4 border-b-[1px] lg:pb-[3em] pb-[2em] ${isDayTime ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'} group`}>
                        <div className='relative'>
                            <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[11em] leading-[1.2] rounded-none'>
                                Healthcare and Fitness Apps
                            </h2>
                            <div
                                className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                                <Image
                                    src='/assets/startup/health.jpg'
                                    alt='Healthcare and Fitness'
                                    height={250}
                                    width={250}
                                />
                            </div>
                        </div>
                        <div>
                            <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                                AI and wearables are being integrated into telemedicine systems, fitness trackers,
                                and personalized health solutions to encourage user participation and wellness.
                            </p>
                        </div>
                    </div>
                </Link>

                {/* e-Commerce */}
                <Link href='/industries/e-commerce-development' className='relative'>
                    <div
                        className={`grid lg:grid-cols-2 grid-cols-1 lg:mb-10 mb-8 gap-4 border-b-[1px] lg:pb-[3em] pb-[2em] group ${isDayTime ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'}`}>
                        <div className='relative'>
                            <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] leading-[1.2] rounded-none'>
                                E-Commerce and Marketplace Apps
                            </h2>
                            <div
                                className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                                <Image
                                    src='/assets/startup/market.jpg'
                                    alt='E-commerce and Marketplace'
                                    height={250}
                                    width={250}
                                />
                            </div>
                        </div>
                        <div>
                            <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-tight'>
                                platforms that offer scalable functionality for a range of businesses, secure
                                payment methods, and personalized suggestions for the purchase, sale, or trade of
                                items.
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Fintech */}
                <Link href='/industries/fintech' className='relative'>
                    <div
                        className={`grid lg:grid-cols-2 grid-cols-1 lg:mb-10 mb-8 gap-4 border-b-[1px] lg:pb-[3em] pb-[2em] group ${isDayTime ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'}`}>
                        <div className='relative'>
                            <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[8.5em] leading-[1.2] rounded-none'>
                                FinTech Apps
                            </h2>
                            <div
                                className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[4.2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                                <Image
                                    src='/assets/startup/fintech.jpg'
                                    alt='On-Demand Services'
                                    height={250}
                                    width={250}
                                />
                            </div>
                        </div>
                        <div>
                            <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                                Solutions for financial management that include investments, payments, and
                                cryptocurrency apps with strong security, user-friendly interfaces, and regulatory
                                compliance.
                            </p>
                        </div>
                    </div>
                </Link>

                {/* social networking */}
                <Link href='/services/Social-Networking' className='relative'>
                    <div
                        className={`grid lg:grid-cols-2 grid-cols-1  gap-4 border-b-[1px] lg:pb-[3em] pb-[2em] group ${isDayTime ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'}`}>
                        <div className='relative'>
                            <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[8.7em] leading-[1.2] rounded-none'>
                                Social Networking Apps
                            </h2>
                            <div
                                className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                                <Image
                                    src='/assets/startup/social.jpg'
                                    alt='Social Networking'
                                    height={250}
                                    width={250}
                                />
                            </div>
                        </div>
                        <div>
                            <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                                platforms with messaging, content sharing, and engagement capabilities tailored to
                                communities or particular interests that promote communication and cooperation.
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* last image */}
            <div className='relative max-w-full h-auto mx-auto w-full'>
                <Image
                    src='/assets/startup/pap.jpg'
                    alt='mid image'
                    width={1619}
                    height={1080}
                />
            </div>

            {/* Interest for startups */}
            <div
                className={`relative lg:-mt-20 md:-mt-20   lg:py-32 py-16  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={'max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 lg:mb-8 mb-8 border-b-[1px] lg:pb-[5em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <div>
                            <h2 className='lg:text-[3em] md:text-[2.3em] text-[1.8em] font-[700]  justify-center tracking-tight leading-[1.2]'>
                                Business interest <br className={'lg:block md:block hidden'}/>for startups </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center tracking-normal text-justify leading-[1.5] lg:-ml-[3em]'>
                                All the advantages of traditional software are present in a bespoke or
                                custom <Link href='/services/Web-Application'
                                             className={`border-b py-[0.2em] ${
                                                 isDayTime
                                                     ? 'border-gray-300 hover:border-gray-800'
                                                     : 'border-gray-700 hover:border-white'
                                             }`}
                            >web application
                            </Link>,
                                with the exception that it is more affordable, more accessible, and can grow with
                                your
                                company&#39;s demands. Companies across a wide range of industries, including
                                banking,
                                technology, construction, and recruiting, have benefited from our creative web apps.
                                Collaborate with us for a stress-free product development process and faster
                                software
                                delivery.
                            </p>
                        </div>
                    </div>
                    <div
                        className='relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[6em] gap-4 lg:mb-8 mb-8'>
                        <div className={`mt-20 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <Image
                                src={isDayTime ? '/assets/startup/dev1.svg' : '/assets/startup/dev2.svg'}
                                alt='Speed of Development'
                                width={70}
                                height={70}
                                className='mb-2'
                            />
                            <h3 className=' text-[1.5em] font-[600] mb-2'>
                                Speed of Development
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                With the help of several open source frameworks, building blocks, and robust
                                toolkits,
                                we can swiftly create unique software solutions, enabling companies to launch their
                                goods more quickly.
                            </p>
                        </div>
                        <div className={`mt-20 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <Image
                                src={isDayTime ? '/assets/startup/relia1.svg' : '/assets/startup/relia2.svg'}
                                alt='Reliability'
                                width={50}
                                height={50}
                                className='mb-2'
                            />
                            <h3 className='text-[1.5em] font-[600] mb-2'>
                                Reliability
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                Well-architected web applications provide software reliability, minimizing expensive
                                maintenance and facilitating the identification and resolution of defects.
                            </p>
                        </div>
                        <div className={`mt-20 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <Image
                                src={isDayTime ? '/assets/startup/sav1.svg' : '/assets/startup/sav2.svg'}
                                alt='Cost Savings'
                                width={50}
                                height={50}
                                className='mb-2'
                            />
                            <h3 className='text-[1.5em] font-[600] mb-2'>
                                Cost Savings
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                Web applications may be rapidly produced and disseminated, hence aiding in the
                                reduction
                                of development expenses.
                            </p>
                        </div>
                    </div>
                    <div
                        className='relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[6em] gap-4'>
                        <div className={`mt-20 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <Image
                                src={isDayTime ? '/assets/startup/sca1.svg' : '/assets/startup/sca2.svg'}
                                alt='Scalability'
                                width={60}
                                height={60}
                                className='mb-2'
                            />
                            <h3 className='text-[1.5em] font-[600] mb-2'>
                                Scalability
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                The software may grow with your organization thanks to customised web application
                                ability to adjust and develop as business demands do. You may adjust resources as
                                needed
                                thanks to scalable server design.
                            </p>
                        </div>
                        <div className={`mt-20 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <Image
                                src={isDayTime ? '/assets/startup/third1.svg' : '/assets/startup/third2.svg'}
                                alt='Third-party integration'
                                width={60}
                                height={60}
                                className='mb-2'
                            />
                            <h3 className='text-[1.5em] font-[600] mb-2'>
                                Third-party integration
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                By integrating web apps with several additional services, like marketing tools,
                                payment
                                gateways, and more, companies may leverage a wealth of features to improve their
                                software.
                            </p>
                        </div>
                        <div className={`mt-20 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <Image
                                src={isDayTime ? '/assets/startup/web1.svg' : '/assets/startup/web2.svg'}
                                alt='Web app security'
                                width={60}
                                height={60}
                                className='mb-2'
                            />
                            <h3 className='text-[1.5em] font-[600] mb-2'>
                                Web app security
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                Our security team uses measures that guard against typical online threats, allowing
                                company owners to rest easy knowing that their data and that of their customers will
                                be
                                safe and secure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ section */}
            <div className={`relative py-24 ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <h2 className='lg:text-[3em] md:text-[2.3em] text-[1.8em] font-[700] capitalize leading-[1.2] tracking-tight border-b-[1px] lg:pb-[1em] pb-[0.8em] lg:mb-[2em]'>FAQ
                        about services<br/>for startups
                    </h2>
                </div>
                <div className='relative mx-auto px-4 sm:px-6 lg:px-[12em] space-y-2'>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(0)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none"
                        >
                            <span>How much will it cost to develop my software or product?</span>
                            {onIndex === 0 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 0 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The complexity, scale, and necessary features of your project all affect how much
                                software development will cost. Grey InfoTech guarantees that you get the most out
                                of your budget by providing clear pricing that is customized for startups. Following
                                a discussion of your needs, we will send you a comprehensive quote. We also provide
                                a thorough planning and discovery process for larger projects.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long will it take to develop my product?</span>
                            {onIndex === 1 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 1 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The size and complexity of the project determine the timeline, but we put efficiency
                                first without sacrificing quality. With complete product development schedules
                                tailored to your objectives, we can provide an MVP for the majority of businesses in
                                8–12 weeks.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can you help us define our product’s requirements?</span>
                            {onIndex === 2 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 2 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Of course. To help you clarify your vision, pinpoint important elements, and develop
                                a roadmap that supports your corporate goals, we provide discovery workshops and
                                consulting services. Our cooperative strategy guarantees clarity right away.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do you offer MVP development services?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Yes, MVP development is one of our specializations. We help businesses construct
                                practical, scalable products with fundamental features to verify their concepts,
                                attract customers, and secure financing.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do you provide ongoing support and maintenance?</span>
                            {onIndex === 4 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 4 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Yes, we provide continuous support to make sure your product is safe, optimized, and
                                up to date as your company expands. Long after launch, we&#39;re there to help with
                                everything from problem repairs to product improvements.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What’s your communication process?</span>
                            {onIndex === 5 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 5 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We continue to communicate openly and cooperatively. Through progress meetings,
                                agile sprints, and unambiguous documentation, you will receive regular updates. Jira
                                and Slack are two more technologies we utilize to keep you updated at every stage.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is your project management approach?</span>
                            {onIndex === 6 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 6 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                To preserve flexibility and guarantee effective and transparent progress, we employ
                                agile approaches. With this strategy, we can swiftly adjust and maintain the smooth
                                progress of your project.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is your experience working with startups?</span>
                            {onIndex === 7 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 7 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Among the many businesses we&#39;ve worked with are success stories like <Link
                                href='https://poawdltd.co.uk' className='font-[500]'>POAWD Ltd.</Link>, which grew
                                with our assistance. Our team is a valued partner in developing creative, scalable
                                solutions since we understand the particular difficulties faced by startups.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do you offer help with deployment and hosting?</span>
                            {onIndex === 8 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 8 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                To guarantee a successful launch, we do indeed manage hosting and deployment. Our
                                services will help you select the best hosting option, be it AWS, Azure, or another
                                platform, and we will oversee the entire deployment process.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(9)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What technologies do you use?</span>
                            {onIndex === 9 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 9 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We employ dependable, up-to-date technology that facilitate performance and
                                scalability. React, Node.js, JavaScript, Python, and Laravel are all part of our
                                tech stack, which guarantees that we provide solutions that are both high-quality
                                and future-proof.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(10)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What happens if the scope of the project changes?</span>
                            {onIndex === 10 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 10 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                When developing a startup, flexibility is essential. If the scope of your project
                                changes, we&#39;ll work closely with you to evaluate the effects, revise budgets and
                                schedules, and modify our strategy to make sure your new objectives are successfully
                                achieved.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(11)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do you handle scalability?</span>
                            {onIndex === 11 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 11 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We design everything we create to be scalable. To make sure your software can manage
                                expansion—whether it is through additional users, new features, or wider markets—we
                                employ strong architecture and cloud-based platforms.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(12)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can you help with design and user experience?</span>
                            {onIndex === 12 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 12 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Of course. Our team comprises proficient UX/UI designers who craft user-friendly,
                                captivating interfaces customized for your target audience. Our main goal is to
                                produce designs that improve usability and increase client happiness.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(13)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do you ensure quality?</span>
                            {onIndex === 13 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 13 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                In order to guarantee that your software operates flawlessly, we adhere to strict QA
                                and testing procedures, including automated and human testing. Every product we
                                produce is optimized for dependability, speed, and user experience. Quality is at
                                the core of us.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-500 text-gray-500 hover:text-white' : 'border-gray-500 text-gray-500 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(14)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can you integrate with third-party tools or platforms?</span>
                            {onIndex === 14 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 14 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Indeed, we specialize in smooth interfaces with analytics tools, CRMs, payment
                                gateways, APIs, and more. To improve functionality, we make sure your software
                                integrates seamlessly with current services.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default Startups;