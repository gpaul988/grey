'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import CountUp from "react-countup";
import {AnimatePresence, motion} from "framer-motion";


const WebApplication = () => {
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

    // Web Design Solutions hook
    const handleScroll = () => {
        const sections = [
            "WADS",
            "CPWA",
            "ES",
            "SP",
            "PD",
            "BCS",
            "PWA",
            "WASM",
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

    // Countup hook for Digital partners
    const stats = [
        {label: 'Years Experience', value: 8, suffix: '+'},
        {label: 'Team Members', value: 10, suffix: '+'},
        {label: 'Products Launched', value: 150, suffix: '+'},
        {label: 'Successful rebrands', value: 27, suffix: '+'},
        {label: 'Increase in Website Traffic', value: 350, suffix: '%'},
    ];

    // Web App Development Process Hook
    const imageIds: string[] = [
        "Discovery",
        "UX Design",
        "Prototyping",
        "Development",
        "Testing & QA",
        "Support & Maintenance",
        "Marketing"
    ];

    const handleScrollStages = () => {
        for (const imageId of imageIds) {
            const textElement = document.getElementById(imageId); // Corresponding text element
            const imageElement = document.getElementById(imageId); // Corresponding image element

            if (textElement && imageElement) {
                const textRect = textElement.getBoundingClientRect();
                const screenCenter = window.innerHeight / 2; // Center of the screen

                // Check if the text is centered on the screen
                if (textRect.top <= screenCenter && textRect.bottom >= screenCenter) {
                    setActiveId(imageId); // Set activeId when the text is centered
                    break;
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScrollStages);
        return () => {
            window.removeEventListener("scroll", handleScrollStages);
        };
    }, []);

    // Sticky menu hook
    useEffect(() => {
        const handleScroll = () => {
            const stagesSection = document.getElementById('stages');
            const partnersSection = document.getElementById('partners');

            if (stagesSection && partnersSection) {
                const stagesRect = stagesSection.getBoundingClientRect();
                const partnersRect = partnersSection.getBoundingClientRect();

                // Make sticky menu visible only within the "services-section"
                setIsVisible(
                    stagesRect.top <= window.innerHeight &&
                    stagesRect.bottom >= 0 &&
                    partnersRect.top >= window.innerHeight
                );
            } else {
                console.warn('Sections not found in DOM');
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Why Grey infoTech For Your App Project Hook
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex % reasons.length) + 1);
        }, 5000); // Change slide every 5 seconds

        return () => {
            clearInterval(interval);
        }; // Clean up the interval on unmount
    }, []);

// Reasons
    const reasons = [
        {
            id: 1,
            title: (
                <>We&#39;re Experienced</>
            ),
            description: (
                <>
                    With deep experience across the digital landscape, we bring proven expertise to every
                    project—regardless of scale. We draw on a rich track record to deliver creative thinking, technical
                    precision, and strategic clarity that consistently drives results.
                </>
            ),
            images: ['/assets/wad/Development.jpg']
        },
        {
            id: 2,
            title: (<>We&#39;re Proactive</>),
            description: (
                <>
                    You can rely on us to exceed expectations. We proactively anticipate challenges, take initiative
                    before requests are made, and consistently bring forward innovative ideas and opportunities to add
                    value at every stage.
                </>
            ),
            images: ['/assets/ads/exp.jpg']
        },
        {
            id: 3,
            title: (<>We&#39;re Collaborative</>),
            description: (
                <>
                    While we&#39;re passionate about technology, our true strength lies in people. We believe great
                    collaboration goes beyond being easy to work with—it&#39;s about being a genuine partner who shares
                    your
                    vision, energy, and commitment to creating something exceptional.
                </>
            ),
            images: ['/assets/ads/cust.jpg']
        },
        {
            id: 4,
            title: (<>We&#39;Invested</>),
            description: (
                <>
                    When you invest in us, we invest fully in your success. We approach every project with a deep sense
                    of ownership and accountability, driven by a commitment to excellence and an uncompromising standard
                    that ensures we never settle for less than the best.
                </>
            ),
            images: ['/assets/ads/scal.jpg']
        },
    ];

    // FAQ Hook
    const [onIndex, setOnIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOnIndex(onIndex === index ? null : index);
    }


    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} relative h-auto`}>
            {/* Header now provided globally by app/layout.tsx — duplicate render disabled to fix doubled header */ false && <Header/>}
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Hero Section */}
            <div id={'hero'}
                 className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <h1
                    className={`border-b pb-[0.5em] border-gray-500/50 px-0 constant-text lg:text-[5em] md:text-[3em] text-[2em] lg:mt-[3em] md:mt-[3em] mt-[2em] leading-[1.1] font-[700] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    Web Application <br/>Development Agency
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Custom web applications tailored to your business goals. Our experienced developers build scalable,
                    secure, and user-focused solutions that drive real <br className={'lg:block md:block hidden'}/>results
                    and
                    meet evolving customer needs.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/wad/hero.jpg'}
                        alt={'Web Application Development Hero'}
                        width={1536}
                        height={876}
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
                                 ? "bg-black text-white"
                                 : "bg-white text-black"
                             : isDayTime
                                 ? "bg-white text-black"
                                 : "bg-black text-white"
                     }`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.6em] font-[400] lg:tracking-wider tracking-tight'>
                            Empowering Your Workflow, <br className={'lg:block md:block hidden'}/>One Click at a Time
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.3] pb-6'>
                            Innovative, Custom & <br className={'lg:block md:block hidden'}/>Bespoke Web App Development
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Grey InfoTech is a trusted web application development company based in Port
                                    Harcourt, Nigeria, with over 8 years of experience delivering tailored,
                                    results-oriented digital solutions. We specialise in building custom web
                                    applications that align with business goals, improve operational efficiency, and
                                    enhance user experience—helping our clients stay competitive in an increasingly
                                    digital marketplace.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Our team leverages modern technologies and proven development practices to deliver
                                    scalable, high-performing applications across a wide range of industries. From
                                    concept to deployment, we prioritise speed, functionality, and long-term value,
                                    ensuring every solution is built to support growth, drive engagement, and deliver
                                    measurable business impact.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* We’re a web app development company in Nigeria */}
            <div
                className={`relative lg:pt-[4em] md:pt-[4em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <div
                    className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                    <div
                        className={`lg:mr-[4.5em] md:mr-[4.5em] lg:mt-[8em] md:mt-[8em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <h2
                            className='text-[1.5em] font-[500] tracking-tight leading-[1.1] mb-10  md:text-[2em] lg:text-[3em] w-auto h-auto '>
                            We’re A Web App <br className={'lg:block md:block hidden'}/>Development <br
                            className={'lg:block md:block hidden'}/>Agency In Nigeria
                        </h2>
                        <p className='text-[0.85em] font-[300] tracking-normal text-justify leading-[1.5] '>
                            In today’s fast-paced digital environment, web applications play a critical role in helping
                            businesses operate more efficiently and solve complex challenges. Whether you&#39;re
                            launching a
                            new product, modernising legacy systems, or streamlining internal processes, custom web apps
                            can offer scalable and cost-effective solutions tailored to your needs.<br/><br/>
                            At Grey InfoTech, we specialise in developing robust, business-focused web applications such
                            as CRM platforms, ERP systems, and client service portals. Our goal is to reduce operational
                            overhead and improve productivity through technology that’s built around your objectives.
                            Partner with us to turn your vision into powerful, high-performing software that drives real
                            business results.
                        </p>
                    </div>
                    <div
                        className={'lg:mt-[2em] md:mt-[2em] relative w-full max-w-full h-auto lg:-ml-[1.5em] md:-ml-[1.5em] lg:pr-[6.5em] md:pr-[11.2em] mb-4'}>
                        <Image
                            src={'/assets/wad/wadcn.jpg'}
                            alt={'Web app development agency'}
                            width={4650}
                            height={500}
                        />
                    </div>
                </div>
            </div>

            {/* Web application development services */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'wads'}
                     className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Business Benefit Header */}
                    <div className={`border-b-[0.1em] border-gray-300/50 pb-[2em] lg:mb-[5em] ${
                        isDayTime ? 'text-white' : 'text-black'
                    }`}>
                        <h2 className='text-[1em] capitalize text-start sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.3] lg:pb-6'>
                            Web application <br className={'lg:block md:block hidden'}/>development services
                        </h2>
                    </div>

                    {/* Benefits */}
                    <div
                        className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]  ${
                            isDayTime ? 'text-white' : 'text-black'
                        } lg:mb-[10em] md:mb-[10em] mb-[5em]`}>
                        <div id={'mature'}>
                            <Image
                                src={isDayTime ? '/assets/wad/icon/npd1.svg' : '/assets/wad/icon/npd.svg'}
                                alt={'Mature Process'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-2'}>
                                New Product Development
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Partner with a web app development company that aligns technology with your business
                                objectives. At Grey InfoTech, we build tailored solutions that solve real operational
                                challenges—whether launching a <Link href='/services/MVP'
                                                                     className='hover:font-[500] border-b-[1px] border-gray-500 hover:border-black'>minimum
                                viable product (MVP)</Link> or scaling an existing
                                platform—ensuring every application drives measurable results and supports long-term
                                growth.
                            </p>
                        </div>
                        <div id={'sywa'}>
                            <Image
                                src={isDayTime ? '/assets/wad/icon/sywa1.svg' : '/assets/wad/icon/sywa.svg'}
                                alt={' Scaling your web app '}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-2'}>
                                Scaling your web app
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                As a leading web app development company, we provide expert support and flexible team
                                augmentation to help you scale efficiently. Whether you need additional technical
                                expertise or a full development team, our approach accelerates delivery timelines while
                                maintaining high-quality standards.
                            </p>
                        </div>
                        <div id={'lam'}>
                            <Image
                                src={isDayTime ? '/assets/wad/icon/lam1.svg' : '/assets/wad/icon/lam.svg'}
                                alt={'Legacy app modernisation'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-2'}>
                                Legacy app modernisation
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Revitalise outdated systems with our legacy application modernisation services. We
                                transform on-premise or desktop-based software into modern web-based solutions,
                                enhancing performance, scalability, and security. Whether through refactoring,
                                optimisation, or complete rebuilds, we ensure your software aligns with today’s business
                                and technology standards.
                            </p>
                        </div>
                    </div>
                    <div
                        className={`items-center ${isDayTime ? 'text-white' : 'text-black'} justify-center`}>
                        <h2 className='lg:text-[3em] md:text-[3em] text-[1.5em] font-[500] tracking-tighter leading-[1.1] pb-6 text-center'>
                            Ready to start?
                        </h2><br/>
                        <Link href='/contact' className='flex items-center justify-center-safe text-center'>
                            <button
                                className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em] border tracking-tighter rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-[4em] -translate-y-[2.8em] absolute left-0 top-0 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-[100%]`}></span>
                                <span
                                    className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-90 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-100 group-hover:-translate-x-8`}></span>
                                <span
                                    className={`relative w-full text-left text-black ${isDayTime ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'} transition-colors duration-200 ease-in-out`}>Get
                                started <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                <span className="absolute inset-0 rounded-full "></span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Top Image*/}
            <div id={'top'}
                 className={'relative lg:max-w-full w-full py-16 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div className={'relative grid lg:grid-cols-2 h-auto md:grid-cols-2 grid-cols-1 gap-6'}>
                    <div>
                        <Image
                            src={'/assets/wad/2.jpg'}
                            alt={'design1'}
                            width={800}
                            height={700}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/wad/1.jpg'}
                            alt={'design 2'}
                            width={800}
                            height={700}
                        />
                    </div>
                </div>
            </div>

            {/* Our Web Application Development Service */}
            <div className={`lg:pt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'react-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                            Our Web Design Services
                        </h2>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[11em] md:mr-[11em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Services
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-300 focus:decoration-gray-100'
                            }`}>
                                {[
                                    {id: "01", title: "Web Application Development for Startups", target: "WADS"},
                                    {id: "02", title: "Customer Portal Web Application", target: "CPWA"},
                                    {id: "03", title: "Enterprise Systems", target: "ES"},
                                    {id: "04", title: "SaaS Production", target: "SP"},
                                    {id: "05", title: "Product Development", target: "PD"},
                                    {id: "06", title: "Bespoke CRM Systems", target: "BCS"},
                                    {id: "06", title: "Progressive Web Applications", target: "PWA"},
                                    {id: "06", title: "Web Application Support & Maintenance", target: "WASM"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 md:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-2 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[300]'}`
                                                    : `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-400 font-[300]'}`
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[14em] md:mb-[14em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'WADS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Web Application Development For Startups
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>UX/UI design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Technology consultation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>MVP</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Product development</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        If you’re a startup founder with a bold idea but unsure where to begin, Grey
                                        InfoTech is your ideal technology partner. Based in Port Harcourt, our
                                        experienced team of web app developers is well-equipped to support startups
                                        and <Link href={'/industries/fintech'}
                                                  className={`border-b pb-[0.01em] ${
                                                      isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                  }`}>FinTech</Link> companies in turning their concepts into
                                        high-performing digital
                                        products. We understand the pressures of early-stage business development, which
                                        is why we focus on helping you move quickly, make informed decisions, and stay
                                        aligned with your business goals.<br/><br/>
                                        We specialise in building user-focused, market-ready Minimum Viable Products
                                        (MVPs) that allow you to validate your idea, prioritise key features, and
                                        collect meaningful feedback—without overextending your time or budget. By
                                        combining technical expertise with a business-first mindset, we help reduce risk
                                        and accelerate time to market. Whether you&#39;re pitching to investors or
                                        preparing
                                        for launch, our team ensures your product is built on a scalable foundation that
                                        can grow with your vision.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CPWA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Customer Portal Web Application
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>AI-assistants</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Knowledge base</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Chatbots</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Support centre</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Document storage</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        One of the most in-demand web application solutions we deliver is customer
                                        portals. Businesses turn to us to improve customer service, enhance loyalty, and
                                        boost <Link href={'/services/branding'}
                                                    className={`border-b pb-[0.01em] ${
                                                        isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                    }`}>brand</Link> engagement through tailored, user-friendly portals.
                                        By developing custom web-based software, we help clients streamline operations
                                        and reduce overhead by shifting key services online.<br/><br/>
                                        These portals often include advanced features like AI-powered assistants,
                                        integrated chatbots, and secure access to policies and documents—providing
                                        customers with instant, around-the-clock support. The result is a more efficient
                                        service model, improved customer satisfaction, and stronger long-term business
                                        outcomes.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ES'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Enterprise Systems</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>System architecture</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Bespoke software</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Scalable infrastructure</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Whether you&#39;re launching a new project or enhancing an existing system, we
                                        specialise in planning, designing, and building enterprise-grade applications
                                        tailored to your business needs. Our team integrates seamlessly with your
                                        internal teams to accelerate development, ensuring alignment with your
                                        objectives and timelines.<br/><br/>
                                        From streamlining operations to solving complex business challenges, we deliver
                                        scalable, custom solutions that support long-term growth and
                                        adaptability—empowering your organisation to stay competitive and future-ready.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'SP'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>SaaS Products</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cloud-based platforms</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Subscription models</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>API integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Multi-tenant architecture</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We specialise in developing scalable SaaS platforms that help businesses grow
                                        and innovate. From intuitive, user-friendly interfaces to robust cloud-based
                                        architectures, we build solutions that engage users and deliver measurable
                                        impact.<br/><br/>
                                        Our development approach focuses on security, flexibility, and
                                        cost-efficiency—ensuring your SaaS product can evolve with your business while
                                        maintaining performance and user satisfaction at every stage.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'PD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Product Development)</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Responsive design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cross-platform compatibility</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User testing</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We build robust, high-performing web applications tailored to deliver a seamless
                                        and consistent user experience across all devices. Our team focuses on creating
                                        fully responsive and adaptive solutions that function flawlessly on mobile,
                                        tablet, and desktop platforms. By aligning with the latest usability standards
                                        and implementing cohesive design systems, we ensure your application not only
                                        meets user expectations but also reinforces your brand&#39;s credibility and
                                        professionalism. The result is a future-ready digital product that enhances user
                                        engagement, drives retention, and supports your business objectives across every
                                        touchpoint.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'BCS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Bespoke CRM Systems</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Custom dashboards</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Advanced analytics</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Optimise and simplify your business operations with a fully customised CRM
                                        solution tailored to your specific workflows and growth objectives. Our CRMs are
                                        designed to streamline customer management, automate repetitive tasks, and
                                        integrate seamlessly with your existing systems—reducing manual effort and
                                        improving overall efficiency. With a focus on usability, scalability, and
                                        strategic functionality, we help you enhance team collaboration, gain deeper
                                        customer insights, and deliver more responsive, personalised service. The result
                                        is a centralised platform that drives smarter decision-making, supports
                                        long-term growth, and strengthens customer relationships at every stage.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'PWA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Progressive Web Applications</h2>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Leverage the power of Progressive Web Apps (PWAs) to deliver fast, reliable, and
                                        engaging digital experiences across all devices. Our PWAs combine the best of
                                        web and mobile—offering offline functionality, rapid load times, and a seamless,
                                        app-like interface without the need for app store deployment. Ideal for
                                        businesses prioritising performance, accessibility, and user engagement, we
                                        develop solutions that enhance reach, reduce friction, and drive measurable
                                        results across platforms.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>08/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'WASM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Web Application Support &
                                        Maintenance</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Performance monitoring</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Security updates</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Feature enhancements</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Keep your web application secure, stable, and future-ready with our end-to-end
                                        support and maintenance services. We take a proactive approach—handling routine
                                        updates, bug fixes, security patches, and performance optimisation to ensure
                                        uninterrupted functionality. As your business evolves, we provide ongoing
                                        enhancements and strategic guidance to help your app scale, adapt to user needs,
                                        and stay aligned with changing market demands. Our goal is to minimise downtime,
                                        reduce risk, and support long-term value from your digital investment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Web app developers, accelerated project delivery and team augmentation */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:-mt-[20em] md:-mt-[20em] lg:pt-[6em] md:pt-[6em] pt-[3em] lg:pb-[4em] md:pb-[4em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-4'}>
                            <Image
                                src={'/assets/wad/wad.jpg'}
                                alt={'Web app developers, accelerated project delivery and team augmentation'}
                                width={650}
                                height={900}
                            />
                        </div>
                        <div
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mr-[8em] md:mr-[8em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] mb-10 md:text-[2em] lg:text-[3em] w-auto h-auto'>
                                Web app developers, <br className={'lg:block md:block hidden'}/>accelerated project <br
                                className={'lg:block md:block hidden'}/>delivery and team <br
                                className={'lg:block md:block hidden'}/>augmentation
                            </h2>
                            <p className='text-[0.85em] font-[300] tracking-normal text-justify leading-[1.5] '>
                                Bringing a software product to life comes with unique challenges—from strategic planning
                                to technical execution. Partnering with our specialist team of custom web app developers
                                accelerates your delivery timelines and ensures high-quality outcomes. Whether
                                you&#39;re
                                launching a new project, extending your in-house capabilities, or seeking end-to-end
                                development support, we tailor our approach to meet your needs.<br/><br/>
                                We collaborate closely with your CTO, IT department, and internal teams to plan,
                                architect, and build robust web-based solutions. From full-system design and development
                                to targeted technical support, we integrate seamlessly into your workflow to enhance
                                delivery speed and efficiency. No matter your project stage or team structure, we bring
                                the technical expertise, flexibility, and reliability needed to drive innovation and
                                deliver software that moves your business forward.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Last image*/}
            <div id={'mid-image'} className={'relative lg:mb-[15em] min-h-screen'}>
                <Image
                    className={'h-auto max-w-full w-full mx-auto object-fill'}
                    src={'/assets/wad/mid.jpg'}
                    alt={'Mid Image'}
                    width={1536}
                    height={900}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Back-end Web App Technologies */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] lg:mb-[15em] md:mb-[13em] mb-[1em] min-h-screen ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'backend technology'}
                     className={`relative lg:-mt-[15em] md:-mt-[15em] -mt-[35em] lg:py-24 md:py-24 pb-4 lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6  ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}>
                        <div>
                            <h2 className='capitalize text-[2em] md:text-[3em] lg:text-[3.3em] font-[650] tracking-tighter leading-[1.15] lg:pb-6'>
                                Back-end web <br className={'lg:block md:block hidden'}/>app technologies
                            </h2>
                        </div>
                        <div className='lg:-ml-[7.8em]'>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                We may suggest a number of popular frameworks and technologies. Naturally, each project
                                is unique, and before choosing a strategy with you, we weigh the advantages and
                                disadvantages of several options.
                            </p>
                        </div>
                    </div>


                    {/* Tools */}
                    <div id={'tools'}
                         className={`relative w-full h-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 lg:gap-[6em] md:gap-[4em] sm:gap-[3em] gap-[2em] lg:mt-[3em] md:mt-[2em] sm:mt-[1.5em] mt-[1em] ${
                             isDayTime ? 'text-black' : 'text-white'
                         }`}>
                        <div id={'next'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/next.svg' : '/assets/back/icon/next1.svg'}
                                    alt={'next'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>NEXT.js</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A powerful framework for building
                                    server-rendered <Link href={'/services/Reactjs-Development'}
                                                          className={`border-b pb-[0.01em] ${isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'}`}>React</Link> applications,
                                    offering a seamless development experience, improved SEO, and enhanced performance
                                    out of the box. With features like automatic routing, server-side rendering, and
                                    static site generation, it enables faster load times and greater scalability—making
                                    it ideal for modern web applications that demand speed, reliability, and
                                    flexibility.
                                </p>
                                <Link href={'/services/Nextjs-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Next.js Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9.6em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'symfony'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/sym.svg' : '/assets/back/icon/sym1.svg'}
                                    alt={'symfony'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Symfony</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A robust and flexible PHP framework that accelerates the development of high-quality
                                    web applications through reusable components, structured architecture, and adherence
                                    to industry best practices. Its modular design promotes maintainability and
                                    scalability, making it an ideal choice for building complex, enterprise-grade
                                    systems with efficiency and long-term stability in mind.
                                </p>
                                <Link href={'/services/PHP-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>PHP Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[8.4em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'net'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/net.png' : '/assets/back/icon/net1.png'}
                                    alt={'.Net'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>.NET</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A versatile framework for building high-performance web, desktop, and cloud
                                    applications across multiple programming languages. It offers a secure, scalable
                                    architecture and a rich ecosystem of tools and libraries, enabling rapid development
                                    while maintaining reliability and long-term maintainability—ideal for
                                    enterprise-grade solutions and cross-platform deployment.
                                </p>
                                <Link href={'/services/Net-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Net Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[8.2em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'laravel'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/laravel.svg' : '/assets/back/icon/laravel1.svg'}
                                    alt={'Laravel'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Laravel</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A widely adopted <Link href={'/services/PHP-Development'}
                                                           className={`border-b pb-[0.01em] ${isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'}`}>PHP</Link> framework
                                    known for its elegant syntax, developer-friendly
                                    tools, and powerful features that streamline <Link href={'/services/Web-Application'}
                                                                                       className={`border-b pb-[0.01em] ${isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'}`}>web
                                    application</Link> development. With
                                    built-in support for routing, authentication, caching, and more, Laravel enables the
                                    rapid creation of secure, maintainable, and scalable applications—making it a
                                    preferred choice for businesses seeking efficient and modern PHP-based solutions.
                                </p>
                                <Link href={'/services/Laravel-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Laravel Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9.8em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'ruby'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/ruby.svg' : '/assets/back/icon/ruby1.svg'}
                                    alt={'Ruby on Rails'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Ruby on Rails</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A dynamic web application framework that emphasizes convention over configuration,
                                    enabling rapid development, clean code, and long-term maintainability. By
                                    streamlining repetitive tasks and encouraging best practices, it allows developers
                                    to build powerful, scalable applications quickly—making it a strong choice for
                                    startups and enterprises alike seeking fast time-to-market and robust architecture
                                </p>
                                <Link href={'/services/Ruby-on-Rails'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Ruby on Rails Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[12.3em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'node'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/node.svg' : '/assets/back/icon/node1.svg'}
                                    alt={'Node'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Node.js</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A high-performance <Link href={'/services/Javascript'}
                                                             className={`border-b pb-[0.1em] ${
                                                                 isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                             }`}>JavaScript</Link> runtime built on Chrome’s V8 engine,
                                    designed for building fast,
                                    scalable network applications using server-side scripting. Its event-driven,
                                    non-blocking architecture makes it ideal for handling high-concurrency workloads
                                    such as APIs, real-time services, and microservices—enabling efficient development
                                    and performance at scale across diverse platforms.
                                </p>
                                <Link href={'/services/Nodejs-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Node.js Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9.8em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Front-end Web App Technologies */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'} `}>
                <div id={'technology used'}
                     className={`relative lg:-mt-[20em] py-24 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6  ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}>
                        <div>
                            <h2 className='text-[1em] capitalize sm:text-[1.5em] md:text-[2em] lg:text-[3.3em] font-[550] tracking-tighter leading-[1] lg:pb-6'>
                                Front-End Web <br className={'lg:block md:block hidden'}/>App Technologies
                            </h2>
                        </div>
                        <div className='lg:-ml-[7.8em]'>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                Modern apps may be built using a wide range of front-end technologies and frameworks,
                                and we have selected a solid selection of popular choices that we can suggest.
                            </p>
                        </div>
                    </div>

                    {/* Tools */}
                    <div id={'tools'}
                         className={`relative w-full h-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 lg:gap-[6em] md:gap-[4em] sm:gap-[3em] gap-[2em] lg:mt-[3em] md:mt-[2em] sm:mt-[1.5em] mt-[1em] ${
                             isDayTime ? 'text-white' : 'text-black'
                         }`}>
                        <div id={'angular'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/front/icon1/angular.svg' : '/assets/front/icon1/angular1.svg'}
                                    alt={'Angular'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Angular</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    For large, feature-rich applications, we leverage Angular’s robust framework. Its
                                    modular architecture, two-way data binding, and built-in dependency injection make
                                    it ideal for developing scalable, maintainable, and enterprise-grade solutions.
                                    Angular enables us to create complex applications with high performance, strong
                                    structure, and seamless user experiences across platforms.
                                </p>
                                <Link href={'/services/angular-development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Angular Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[10em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'react'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/front/icon1/react.svg' : '/assets/front/icon1/react1.svg'}
                                    alt={'React'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>React</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    React.js is our preferred framework for building modular, high-performance user
                                    interfaces. Its component-based architecture allows us to develop reusable,
                                    maintainable code, while tools like Redux and MobX enable efficient state
                                    management. Whether it’s a dynamic single-page application or a complex web
                                    platform, we use React to deliver fast, responsive, and scalable user experiences.
                                </p>
                                <Link href={'/services/Reactjs-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>React Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'html'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/front/icon1/html.svg' : '/assets/front/icon1/html1.svg'}
                                    alt={'HTML'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>HTML</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    We use HTML5 as the foundation for every project, ensuring clean, semantic code that
                                    enhances browser compatibility, performance, and accessibility. By structuring
                                    content meaningfully, we improve SEO, support assistive technologies, and lay the
                                    groundwork for responsive, future-ready interfaces.
                                </p>
                            </div>
                        </div>
                        <div id={'css'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/front/icon1/css.svg' : '/assets/front/icon1/css1.svg'}
                                    alt={'CSS'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>CSS</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    We use CSS3 along with advanced layout techniques like Flexbox and Grid to build
                                    responsive, visually compelling designs that adapt seamlessly across all screen
                                    sizes. By leveraging preprocessors such as SASS and LESS, we write modular,
                                    maintainable, and scalable stylesheets—enabling faster development and consistent
                                    design systems that grow with your product.
                                </p>
                            </div>
                        </div>
                        <div id={'vue'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/front/icon1/vue.svg' : '/assets/front/icon1/vue1.svg'}
                                    alt={'Vue'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Vue.js</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    Vue.js is ideal for building lightweight, agile user interfaces that deliver strong
                                    performance without added complexity. Its intuitive structure and flexibility allow
                                    us to rapidly develop dynamic applications while maintaining scalability, clean code
                                    architecture, and an excellent user experience.
                                </p>
                                <Link href={'/services/Vuejs-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Vue.js Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9.1em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'javascript'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/front/icon1/js.png' : '/assets/front/icon1/js1.png'}
                                    alt={'JavaScript'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Javascript</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    JavaScript powers the dynamic, interactive elements of your digital platform. Our
                                    team leverages modern ES6+ standards and cutting-edge tools to build responsive
                                    interfaces, create engaging animations, and add real-time functionality. This
                                    ensures your application is not only high-performing but also future-ready and
                                    impactful.
                                </p>
                                <Link href={'/services/Javascript'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Javascript Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[11em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Last image*/}
            <div id={'last-image'} className={'h-auto max-w-full lg:-mt-[4em] md:-mt-[4em] w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/wad/last.jpg'}
                    alt={'Last Image'}
                    width={1536}
                    height={900}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Web App Business Benefits */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[3.5em] lg:-mt-20 lg:py-32 py-16 mt-32 ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 lg:mb-8 mb-8 border-b-[1px] lg:pb-[5em] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div>
                        <h2 className='lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] justify-center tracking-tight leading-[1.2]'>
                            Web App <br className={'lg:block md:block hidden'}/>Business Benefits</h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] font-[300] justify-center tracking-normal text-justify leading-[1.3] lg:-ml-[3em]'>
                            All the advantages of traditional software are present in a bespoke or custom web
                            application, with the exception that it is more affordable, more accessible, and can grow
                            with your company&#39;s demands. Companies across a wide range of industries, including
                            banking,
                            technology, construction, and recruiting, have benefited from our creative web apps.
                            Collaborate with us for a stress-free product development process and faster software
                            delivery.
                        </p>
                    </div>
                </div>
                <div
                    className='relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[4em] gap-4 lg:mb-8 mb-8'>
                    <div className={`mt-16 ${isDayTime ? 'text-white' : 'text-black'}`}>
                        <Image
                            src={isDayTime ? '/assets/wad/icon/cross1.svg' : '/assets/wad/icon/cross.svg'}
                            alt='Cost Savings'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className=' text-[1.5em] font-[600] mb-2'>
                            Speed of Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Web applications can be developed and deployed rapidly, offering a cost-effective solution
                            that minimises time-to-market and reduces overall development expenses.
                        </p>
                    </div>
                    <div className={`mt-16 ${isDayTime ? 'text-white' : 'text-black'}`}>
                        <Image
                            src={isDayTime ? '/assets/wad/icon/acc1.svg' : '/assets/wad/icon/acc.svg'}
                            alt='Reliability'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='text-[1.5em] font-[600] mb-2'>
                            Reliability
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            A well-architected web application enhances reliability, simplifies maintenance, and makes
                            it easier to detect and resolve issues—ultimately reducing long-term costs and improving
                            overall system stability.
                        </p>
                    </div>
                    <div className={`mt-16 ${isDayTime ? 'text-white' : 'text-black'}`}>
                        <Image
                            src={isDayTime ? '/assets/wad/icon/cost1.svg' : '/assets/wad/icon/cost.svg'}
                            alt='Speed Development'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='text-[1.5em] font-[600] mb-2'>
                            Speed Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            By leveraging modern open-source frameworks, reusable components, and powerful development
                            toolkits, we accelerate the delivery of custom software solutions—helping businesses bring
                            their products to market faster and more efficiently.
                        </p>
                    </div>
                    <div className={`mt-10 ${isDayTime ? 'text-white' : 'text-black'}`}>
                        <Image
                            src={isDayTime ? '/assets/wad/icon/mult1.svg' : '/assets/wad/icon/mult.svg'}
                            alt='Scalability'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='text-[1.5em] font-[600] mb-2'>
                            Scalability
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Custom web apps can adapt and change as business needs change, ensuring that the software
                            can grow with your company. Scalable server architecture allow you to dial resources up and
                            down at will.
                        </p>
                    </div>
                    <div className={`mt-10 ${isDayTime ? 'text-white' : 'text-black'}`}>
                        <Image
                            src={isDayTime ? '/assets/wad/icon/cross1.svg' : '/assets/wad/icon/cross.svg'}
                            alt='Third-party integration'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='text-[1.5em] font-[600] mb-2'>
                            Third-Party Integration
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Web apps can be integrated with many other services such as payment gateways, marketing
                            tools, and more, giving businesses access to a wide range of functionality to enhance their
                            software.
                        </p>
                    </div>
                    <div className={`mt-10 ${isDayTime ? 'text-white' : 'text-black'}`}>
                        <Image
                            src={isDayTime ? '/assets/wad/icon/sdn1.svg' : '/assets/wad/icon/sdm.svg'}
                            alt='Web app security'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='text-[1.5em] font-[600] mb-2'>
                            Web App Security
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Our security team employ features that protect against common web vulnerabilities, giving
                            business owners peace of mind knowing that their and their customer’s data will be safe and
                            secure.
                        </p>
                    </div>
                </div>
            </div>

            {/* Industry experience */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                    <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                        Industry Experience
                    </h2>
                </div>

                {/* FinTech */}
                <div id={'fintech'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-500 hover:text-black' : 'text-gray-500 hover:text-white'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            FinTech
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.4em] md:pl-[18em] md:-mt-[3.4em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/wad/fintech.jpg'
                                alt='fintech'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Financial web applications are an essential part of modern financial services, offering
                            users a range of tools to manage their finances. Some of the popular financial web
                            applications include insurance, financial management software, portfolio tracking.
                        </p>
                    </div>
                </div>

                {/* Startups and SaaS */}
                <div id={'startups'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-500 hover:text-black' : 'text-gray-500 hover:text-white'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Startups <br className={'lg:block md:block hidden'}/>& SaaS
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[3.3em] md:pl-[18em] md:-mt-[3.3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/wad/startups.jpg'
                                alt='Startups and SaaS'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Startups are always looking for ways to innovate and disrupt traditional industries. One
                            example is a new concept in property, a review site developed from scratch. This type of
                            software can help buyers and sellers make informed decisions by providing user-generated
                            reviews of properties, neighbourhoods, and estate agents
                        </p>
                    </div>
                </div>

                {/* Hospitality */}
                <div id={'.tsx'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-500 hover:text-black' : 'text-gray-500 hover:text-white'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] capitalize font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Hospitality
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.3em] md:pl-[18em] md:-mt-[3.3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/wad/hospitality.jpg'
                                alt='Hospitality'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            The hospitality industry is also taking advantage of web applications to streamline
                            operations and improve customer experience. Applications for bookings, membership, and
                            loyalty are becoming increasingly popular. These apps can help hotels, restaurants, and
                            other hospitality businesses attract and retain customers, while also providing them with a
                            more personalised experience.
                        </p>
                    </div>
                </div>

                {/* Proptech */}
                <div id={'proptech'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-500 hover:text-black' : 'text-gray-500 hover:text-white'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Proptech
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.3em] md:pl-[18em] md:-mt-[3.3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/wad/proptech.jpg'
                                alt='Proptech'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            The construction industry is also benefiting from web applications, particularly sales suite
                            experience software. This software can help builders showcase their properties to potential
                            buyers, providing them with an immersive and interactive experience. This can help builders
                            close deals more quickly and efficiently, while also providing buyers with a more engaging
                            and informative experience.
                        </p>
                    </div>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative py-16 lg:mb-10 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                        isDayTime ? 'text-white' : 'text-black'
                    }`}>
                    <h1 className={'lg:text-5em] md:text-[4em] sm:text-[3em] text-[2em] font-[600] leading-[1.1]  mb-[0.6em]'}>
                        Your trusted <br className={'lg:block md:block hidden'}/>digital partner
                    </h1>
                    <p className={'text-[0.873em] font-[300] leading-[1.5] text-justify lg:pr-[33em] mb-10'}>
                        We specialize in crafting high-impact marketing websites, innovative web apps, and mobile
                        applications that drive real results. From funded startups to established businesses, we&#39;ve
                        helped a wide range of clients bring their digital products to life—delivering standout
                        experiences
                        that fuel growth, engagement, and long-term success.
                    </p>
                    <Link href='/contact'>
                        <button
                            className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[3%]`}></span>
                            <span
                                className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-100 group-hover:-translate-x-8`}></span>
                            <span
                                className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'}`}>
                            Start a project <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                            <span
                                className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-white' : 'border-black'} rounded-full"}></span>
                        </button>
                    </Link>

                    {/* Countup */}
                    <div
                        className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-300 ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}
                        id={'countup'}
                    >
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-center items-center "
                            >
                                <h2 className="lg:text-[3.2em] md:text-[3em] sm:text-[2em] text-[1.5em] text-start font-[600]">
                                    <CountUp end={stat.value} duration={2} suffix={stat.suffix || ''}/>
                                </h2>
                                <p className="text-[0.873em] font-[400] mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Web app development process */}
            <div className={`${isDayTime ? 'text-black' : ' text-white'}`}>
                <div id={'process'}
                     className={`relative lg:py-[3em] py-[1em] lg:my-[6em] lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] `}>
                    <h2 className={'border-b pb-[0.8em] capitalize border-gray-500 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                        Web app <br className={'lg:block md:block hidden'}/>development process
                    </h2>

                    <div id={'stages'}
                         className={'grid lg:grid-cols-2 grid-cols-1 gap-10 lg:mt-[10em] mt-6 max-w-full mx-auto w-full h-full lg:mb-0 mb-6'}>

                        {/* Left Section */}
                        <div className={'lg:mr-28 md:mr-28 lg:mb-[4em md:mb-[4em]'}>

                            {/* Discovery */}
                            <div className={`lg:mb-[15em] mb-14`} id={'Discovery'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Discovery</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                    Every great project starts with discovery. We take the time to deeply understand
                                    your goals, audience, and vision, ensuring we’re building the right solution for
                                    your needs. Through workshops, research, and analysis, we uncover insights that form
                                    the foundation of your web app.
                                </p>
                            </div>

                            {/* UX Design */}
                            <div className={`lg:mb-[15em] mb-14`} id={'UX Design'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>UX Design</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                    User experience is at the heart of everything we create. Our designers craft
                                    intuitive, accessible interfaces that make using your app a joy. By mapping user
                                    journeys and testing designs, we ensure every interaction is seamless and
                                    meaningful.
                                </p>
                            </div>

                            {/* Prototyping */}
                            <div className={`lg:mb-[15em] mb-14`} id={'Prototyping'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Prototyping</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                    Prototyping brings your vision to life before a single line of code is written. With
                                    interactive models, we validate ideas and refine designs based on user feedback.
                                    This step ensures we’re creating a product that truly works for your audience.
                                </p>
                            </div>

                            {/* Development */}
                            <div className={`lg:mb-[15em] mb-14`} id={'Development'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Development</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                    With a focus on quality and scalability, our developers build robust and secure web
                                    applications. We use the latest technologies to deliver a solution that’s fast,
                                    reliable, and future-proof. Collaboration with your team ensures the final product
                                    aligns with your goals.
                                </p>
                            </div>

                            {/* Testing & QA */}
                            <div className={`lg:mb-[15em] mb-14`} id={'Testing & QA'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Testing & QA</h2>
                                <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                    Testing is where we ensure your web app meets the highest standards. Through
                                    rigorous quality assurance, we identify and fix any issues, ensuring performance,
                                    security, and usability. This step gives you confidence that your app is ready for
                                    launch.
                                </p>
                            </div>

                            {/* Support & Maintenance */}
                            <div className={`lg:mb-[22em] mb-14`} id={'Support & Maintenance'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Support & Maintenance</h2>
                                <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                    Our support doesn’t end at launch. We provide ongoing maintenance to keep your app
                                    secure, updated, and performing at its best. Whether it’s fixing bugs, adding
                                    features, or scaling with your business, we’re here to help.
                                </p>
                            </div>

                            {/* Marketing */}
                            <div className={`lg:mb-[22em] mb-14`} id={'Marketing'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Marketing</h2>
                                <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                    A great web app needs the right audience. We help you create strategies to attract,
                                    engage, and retain users, ensuring your product makes an impact. From launch
                                    campaigns to ongoing growth plans, we support your success every step of the way.
                                </p>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div
                            className='lg:sticky md:sticky lg:top-[5em] md:top-[5em] justify-center items-center w-full max-w-full h-screen lg:h-screen md:h-screen overflow-hidden'>
                            <div>
                                {imageIds.map((imageId: string) => (
                                    activeId === imageId && (
                                        <div
                                            key={imageId}
                                            className="relative shadow-lg transition-opacity duration-500 ease-in-out opacity-100"
                                            id={imageId}
                                        >
                                            <Image
                                                src={`/assets/wad/stages/${imageId}.jpg`}
                                                alt={imageId}
                                                className="transition-transform duration-500 ease-in-out transform scale-105 hover:scale-110"
                                                width={1030}
                                                height={768}
                                            />
                                        </div>
                                    )
                                ))}
                            </div>

                            {/* sticky menu */}
                            {isVisible && (
                                <div
                                    className={`lg:fixed justify-center md:fixed bottom-0 left-0 w-full ${
                                        isDayTime ? 'bg-black text-white' : 'bg-white text-black'} py-5 z-50`}>
                                    <div
                                        className={`grid lg:grid-cols-7 md:grid-cols-7 lg:max-w-full w-full h-auto lg:px-[4.6em] mx-auto justify-center gap-0 ${
                                            isDayTime ? 'border-black' : 'border-white'}`}>
                                        {imageIds.map((id) => (
                                            <button
                                                key={id}
                                                onClick={() => {
                                                    const element = document.getElementById(id);
                                                    if (element) {
                                                        element.scrollIntoView({behavior: 'smooth'});
                                                    }
                                                }}
                                                className={`mt-4 ${
                                                    activeId === id
                                                        ? isDayTime
                                                            ? 'text-white hover:text-gray-500 focus:text-gray-500'
                                                            : 'text-black hover:text-gray-500 focus:text-gray-500'
                                                        : isDayTime
                                                            ? 'text-gray-500 hover:text-white focus:text-white'
                                                            : 'text-gray-500 hover:text-black focus:text-black'
                                                }`}
                                            >
                                                {id.replace('-', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Partners Sections */}
            <div className={`lg:-mt-[18em] md:-mt-[18em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div id={'partners'}
                     className={`relative lg:mt-[5em] md:mt-[5em] mt-[2em] lg:mb-[5em] md:mb-[5em] mb-[2em] lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] h-auto overflow-hidden `}>
                    <div
                        className={`justify-self-start text-start lg:pt-[5em] md:pt-[5em] pt-[2em] lg:mb-16 md:mb-16 mb-8`}>
                        <h3 className={'text-[1em] font-[600]'}>Our partners</h3>
                    </div>
                    <div className={`grid lg:grid-cols-5 grid-cols-2 gap-6 lg:pb-[5em] md:pb-[5em] pb-[2em]`}>
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
            </div>

            {/* Last image*/}
            <div id={'last-image'} className={'h-auto lg:-mt-[5em] md:-mt-[5em] -mt-[2em] max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/wd/last.jpg'}
                    alt={'Last Image'}
                    width={1536}
                    height={900}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Why Grey InfoTech for your app project */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:pt-32 lg:pb-14 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-20 mb-12 ${
                        isDayTime ? 'text-black' : 'text-white'}`}>
                    <div
                        className={`relative lg:max-w-full mx-auto border-b-[0.001em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-14 pb-2`}>
                        <div>
                            <h2 className='lg:text-[3em] text-[1.5em] font-[600] tracking-tight leading-[1.1] lg:pb-6'>
                                Why Choose <br className={'lg:block md:block hidden'}/>Grey InfoTech <br
                                className={'lg:block md:block hidden'}/>For Your Project
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.85em] font-[300] justify-center tracking-normal text-justify leading-[1.3] lg:-ml-[3em] md:-ml-[3em]'>
                                We have delivered projects to companies in many sectors.In this section you’ll find
                                details of this experience, that may be relevant to you.
                            </p>
                        </div>
                    </div>
                    <div
                        className='relative lg:mt-[6em] md:mt-[6em] mt-[3em]mx-auto px-4 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-24 md:mb-24 mb-12'>
                        {/* Left Section */}
                        <div
                            className={`relative text-[0.873em] lg:leading-[1.5] ${isDayTime ? 'text-black' : 'text-white'} flex flex-col justify-center mb-4`}>
                            {reasons.map((reason, index) => (
                                <div
                                    key={reason.id}
                                    className={`relative mb-6 ${
                                        index + 1 === activeIndex
                                            ? isDayTime
                                                ? 'bg-gray-50 py-5'
                                                : 'bg-gray-950 py-5'
                                            : ''
                                    }`}
                                >
                                    <h3
                                        className={`relative leading-[1.2] lg:text-[1.5em] md:text-[1.5em] text-[1em] mb-4 font-[600] cursor-pointer transition-all ${
                                            index + 1 === activeIndex
                                                ? isDayTime
                                                    ? 'text-black font-[600]'
                                                    : 'text-white font-[600]'
                                                : 'text-gray-500'
                                        }`}
                                        onClick={() => setActiveIndex(index + 1)}
                                    >
                                        {reason.title}
                                    </h3>
                                    <div className={'lg:pr-[9.3em] md:pr-[9.3em]'}>
                                        <AnimatePresence mode="wait">
                                            {index + 1 === activeIndex && (
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
                            {reasons[activeIndex - 1]?.images?.map((image, idx) => (
                                <Image
                                    key={idx}
                                    src={image}
                                    alt={`Reason ${activeIndex} Image ${idx + 1}`}
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

            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] lg:mb-[8em] md:mb-[8em] mb-[4em] ${isDayTime ? 'bg-gray-950' : 'bg-gray-50'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            FAQ About Web Applications
                        </h2>
                        <p className={'text-[0.87em] font-[300] justify-center tracking-normal text-justify leading-[1.3] lg:mr-[40em]'}>
                            Choosing the right partner and software solution often comes with many questions. To help
                            guide your decision, we&#39;ve compiled answers to some of the most frequently asked
                            questions
                            we receive about web application development.
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
                            <span>What is a web app?</span>
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
                                Web applications, or web apps, are software programs accessed through a web browser and
                                hosted on remote servers. Unlike traditional desktop software, they don’t require
                                installation, making them easily accessible from any device with an internet connection.
                                This flexibility allows businesses to reach users across platforms—desktop, tablet, or
                                mobile—without added complexity or setup.<br/><br/>
                                Built using technologies like HTML, CSS, and JavaScript, web apps run through browsers
                                such as Chrome, Firefox, and Safari. The application logic and data are managed on a
                                central server, while users interact through a web-based interface. This setup
                                simplifies updates, reduces maintenance, and provides a cost-effective way for
                                businesses to deliver reliable, scalable digital solutions.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none">
                            <span>Where are you located?</span>
                            {onIndex === 1 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 1 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.8]text-gray-400">
                                <span
                                    className={'text-start items-start lg:text-[1.4em] md:text-[1.4em] sm:text-base text-base font-[600]'}>Port Harcourt, Rivers State Office:</span><br/><br/>
                                We are located at #9 Geoffrey Tata Close, Rumuewhara New Layout, off Eneka - Igwurita
                                Road, Port Harcourt, 500102 <br/><br/>
                                Transport:<br/>From Eneka we are less than 5 mins drive<br/>From Tank we are less
                                than
                                7 mins drive<br/>From Rumuokwurusi we are less than 15 mins drive<br/>From Eliozu bridge
                                we are less than 25 mins drive
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are progressive web apps?</span>
                            {onIndex === 2 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 2 && (
                            <div
                                className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                <p>
                                    Progressive Web Apps (PWAs) are a modern approach to web application development
                                    that bridges the gap between traditional websites and native mobile applications.
                                    They are designed to deliver fast, reliable, and engaging user experiences across
                                    all platforms—desktop, tablet, and mobile—using just a web browser. Built with the
                                    latest web standards, PWAs allow businesses to offer app-like functionality without
                                    requiring users to download or install anything from an app store. This makes them a
                                    cost-effective, scalable, and efficient solution for companies aiming to reach a
                                    wider audience and improve digital engagement.<br/><br/>
                                    PWAs offer a range of powerful features that benefit both users and businesses:
                                </p><br/>
                                <ul className={'list-decimal ml-4 mb-4'}>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Progressive:</span> Meaning they work for all
                                        users regardless of browser choice, by using progressive enhancement techniques.
                                    </li>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Responsive:</span> Ensuring a seamless experience
                                        across all screen sizes and devices.
                                    </li>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Connectivity Independent:</span> Enabling offline
                                        access or functionality on low-quality networks via service workers.
                                    </li>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>App-Like:</span> Providing intuitive app-style
                                        interactions and smooth navigation that feel native.
                                    </li>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Fresh:</span> Always up-to-date through
                                        background updates handled by service workers.
                                    </li>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Secure:</span> Served over HTTPS to protect user
                                        data and prevent content tampering.
                                    </li>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Discoverable:</span> Easily indexed by search
                                        engines and identified as applications.
                                    </li>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Re-engageable:</span> Supporting push
                                        notifications and other features that encourage user return.
                                    </li>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Installable:</span> Allowing users to add the app
                                        to their home screen without going through an app store.
                                    </li>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Linkable:</span> Shared easily through a simple
                                        URL, reducing the barriers to access and distribution.
                                    </li>
                                </ul>
                                <p>Major brands like Twitter, Pinterest, and Starbucks have adopted PWAs to deliver
                                    high-quality digital experiences that rival their native apps, all while reducing
                                    development time and maintenance costs. For businesses, PWAs represent a smart
                                    investment—combining performance, accessibility, and efficiency to drive user
                                    satisfaction, improve engagement, and expand market reach without the overhead of
                                    native app development.</p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do you offshore or outsource your web app development services?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <div
                                className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                <p>Not at all. While you can outsource your web development project to us, we never
                                    outsource any part of our work. As a 100% Nigerian-based web development company
                                    with our office in Port Harcourt, Rivers State, all of our developers and
                                    engineering team are based locally. This ensures complete quality control, clear
                                    communication, and direct accountability—every project is handled in-house by our
                                    expert team here in Rivers State.</p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is the difference between Web App Development <br
                                className={'lg:block md:block hidden'}/>and Web Development?</span>
                            {onIndex === 4 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 4 && (
                            <div className="mt-4 text-[0.87em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                <p>
                                    <span className={'font-[500]'}>What is web development?</span><br/><br/>
                                    Web development is the process of creating and maintaining websites. It covers
                                    everything from building basic static pages to developing fully interactive,
                                    database-driven websites. It includes both front-end (what users see and interact
                                    with) and back-end (the server-side logic and infrastructure) development, ensuring
                                    a complete and functional web presence.<br/><br/>

                                    <span className={'font-[500] mb-6'}>What is web application development?</span><br/><br/>
                                    Web application development is a specialised branch of web development focused on
                                    building application-like software that runs in a web browser. These web apps are
                                    typically more interactive, dynamic, and feature-rich than standard websites, often
                                    functioning like traditional desktop or mobile applications while being accessible
                                    via the internet.<br/><br/>

                                    <span className={'font-[500] mb-6'}>What are the key differences in skills required for web development and web app
                                        development?</span><br/><br/>
                                    While both disciplines require a foundation in HTML, CSS, and JavaScript, web app
                                    development demands more advanced expertise. Developers must be proficient in
                                    front-end frameworks like React, Angular, or Vue, as well as back-end technologies
                                    such as Node.js, Laravel, or ASP.NET. Additionally, skills in database integration,
                                    API development, state management, and handling real-time user interactions are
                                    often essential for web app projects.<br/><br/>

                                    <span className={'font-[500]'}>Can a web development company build a web app?</span><br/><br/>
                                    Yes, many web development companies are fully capable of building web
                                    applications—provided they have the right expertise and experience. Developing a
                                    robust, scalable web app requires a deeper level of technical know-how, including
                                    architectural planning, performance optimisation, and security best practices.
                                    It&#39;s important to choose a partner with proven experience in both web and web
                                    app development to ensure your solution is reliable, efficient, and future-ready.
                                </p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What are some examples of web applications?</span>
                            {onIndex === 5 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 5 && (
                            <div
                                className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                <p>Examples of web applications include widely used platforms such as social media
                                    networks (e.g., Facebook, Twitter, TikTok), email services (e.g., Gmail, Outlook),
                                    and e-commerce giants like Amazon and eBay. Web apps also power online banking
                                    systems, customer relationship management (CRM) tools like HubSpot, and productivity
                                    platforms such as Monday.com and Asana. Even everyday services like Airbnb, Uber,
                                    and Lyft rely heavily on web applications to deliver seamless, interactive
                                    experiences to their users across devices.</p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do web applications work?</span>
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
                                Web applications are generally made up of two main components: the client side and the
                                server side. The client-side component—often referred to as the front end—is the part
                                users interact with directly in their web browser. The server-side component—also known
                                as the back end—handles the behind-the-scenes logic, data processing, and database
                                interactions, and runs on a remote web server. Together, these components work
                                seamlessly to deliver interactive and dynamic user experiences over the internet.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What technologies are used to build web applications?</span>
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
                                Web applications are built using a combination of front-end and back-end technologies.
                                On the front end—the user-facing part—common tools include HTML, CSS, and JavaScript,
                                along with modern frameworks like React, Angular, and Vue.js that enable rich,
                                interactive user interfaces. On the back end, which handles the logic, data, and server
                                operations, developers often use languages and frameworks such as PHP, Python (with
                                Django or Flask), Ruby on Rails, Node.js, or Laravel. Databases like MySQL, PostgreSQL,
                                and MongoDB are also commonly used to store and manage application data. These
                                technologies work together to create powerful, scalable, and responsive web
                                applications.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are the advantages of web applications?</span>
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
                                Web applications offer high accessibility, allowing users to access them from any
                                internet-connected device—whether it&#39;s a desktop, tablet, or smartphone. Because
                                they
                                run in a web browser, there’s no need for installations or manual updates. This makes
                                maintenance and deployment seamless, enabling businesses to roll out improvements and
                                new features instantly, without disrupting the user experience.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(9)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What is responsive design, and why is it important for web applications?</span>
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
                                Responsive design is a critical approach that ensures web applications automatically
                                adjust and optimise their layout and functionality across all device types and screen
                                sizes. This adaptability guarantees that users enjoy a seamless, consistent experience
                                whether they’re accessing the app on a smartphone, tablet, or desktop. For businesses,
                                responsive design is essential as it maximises reach, enhances user engagement, and
                                reduces the need for separate versions or costly redesigns.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(10)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What is the difference between a web application and a website</span>
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
                                A website is primarily a collection of web pages designed to provide information about a
                                company, product, or topic. In contrast, a web application is an interactive software
                                program that enables users to perform specific tasks or functions online. Web
                                applications generally offer more complex features and require advanced programming and
                                design to deliver dynamic, user-driven experiences beyond simple content display.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default WebApplication;