import React, {useEffect, useRef, useState} from 'react';
import '../../app/globals.css'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {motion, useScroll, useTransform} from "framer-motion";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";


// Testimonial data
const testimonials = [
    {
        name: "Ifeanyi Okoro",
        title: "Head of Product, MedConnect Africa",
        message: (
            <>
                Working with Grey InfoTech was a game-changer for us at VeloPay. Their frontend team brought our product
                vision to life with sleek, responsive designs and outstanding performance across all devices. User
                engagement soared by over 30% within the first two weeks after launch. It’s rare to find a tech partner
                that understands both user experience and business needs so well.
            </>
        ),
    },
    {
        name: "Lerato Maseko",
        title: "CTO, Jua Marketplace",
        message: (
            <>
                We approached Grey InfoTech to revamp our customer portal, and they delivered beyond expectations. The
                new interface is intuitive, modern, and extremely fast. Our support tickets dropped by 40% simply
                because users now find everything they need with ease. Their team was professional, responsive, and
                truly cared about the outcome. Highly recommended.
            </>
        )
    },
    {
        name: "Brian Muthoni",
        title: "Senior Software Engineer, DataPulse Analytics",
        message: (
            <>
                Grey InfoTech’s frontend services elevated our entire platform. What stood out most was their attention
                to detail and commitment to performance. They not only delivered pixel-perfect UIs but also optimized
                our web app to load seamlessly even in rural areas with slower internet. Our users love it, and so do
                we!
            </>
        )
    }
];

const FrontendDevelopment = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const firstImageRef = useRef<HTMLDivElement>(null);
    const frontRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [isImageActive, setIsImageActive] = useState(false);
    const [isFrontendActive, setIsFrontendActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target: targetRef});
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);


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

                if (top < windowHeight * -0.3 || bottom < windowHeight * -0.1) {
                    setIsBackgroundActive(true);
                } else {
                    setIsBackgroundActive(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // First Image hook
    useEffect(() => {
        const handleScroll = () => {
            if (firstImageRef.current) {
                const {top, bottom} = firstImageRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (top < windowHeight * -0.1 || bottom < windowHeight * -0.5) {
                    setIsImageActive(true);
                } else {
                    setIsImageActive(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Front-End Development hook
    useEffect(() => {
        const handleScroll = () => {
            if (frontRef.current) {
                const {top, bottom} = frontRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (top < windowHeight * -0.1 || bottom < windowHeight * -0.1) {
                    setIsFrontendActive(true);
                } else {
                    setIsFrontendActive(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Front-end Development hook
    const handleScroll = () => {
        const sections = [
            "DR",
            "ID",
            "PT",
            "IMP",
            "DP",
            "MM",
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

    // Testimonial carousel hook
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((current + 1) % testimonials.length);

    const {name, title, message} = testimonials[current];

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
                 className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <h1
                    className={`border-b pb-[0.5em] border-gray-500/50 px-0 constant-text lg:text-[5em] md:text-[3em] sm:text-[2em] text-[2.5em] lg:mt-[3em] md:mt-[3em] mt-[1.5em] leading-[1.1] font-[600] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    Front-End <br className={'lg:block md:block hidden'}/> Development Company
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    As digital designers, we create user experiences that are both smooth and engaging. Our team, based
                    in Port Harcourt, Nigeria, creates attractive, responsive <br
                    className={'lg:block md:block hidden'}/>front-ends
                    that bring your brand to life and engage your audience.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/front/hero.jpg'}
                        alt={'Frontend Development Hero'}
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
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.8em] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Combining creativity, <br className={'lg:block md:block hidden'}/>technical expertise
                            and <br
                            className={'lg:block md:block hidden'}/>user focused
                            design
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Front-End Development Company
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    At Grey InfoTech, we go beyond building interfaces—we create complete digital
                                    experiences that align with your business objectives. By combining creative vision,
                                    deep technical expertise, and a strong focus on user-centric design, we deliver
                                    solutions that not only look impressive but also drive results. Whether you&#39;re
                                    launching a new platform or enhancing an existing one, our goal is to ensure your
                                    digital products engage users, support growth, and operate flawlessly across
                                    devices.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Whether you’re launching a new digital product or modernising an existing platform,
                                    our front-end development team delivers tailored, future-proof solutions that align
                                    with your strategic goals. We combine cutting-edge technology, performance-driven
                                    design, and user experience expertise to help your business stand out, engage users
                                    effectively, and scale with confidence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* First Images */}
            <section ref={firstImageRef}
                     className={`py-12 transition-colors duration-500 ${
                         isImageActive
                             ? isDayTime
                                 ? "bg-black text-white"
                                 : "bg-white text-black"
                             : isDayTime
                                 ? "bg-white text-black"
                                 : "bg-black text-white"
                     }`}>
                <div id={'top'}
                     className={'relative lg:max-w-full w-full py-16 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                    <div className={'relative grid lg:grid-cols-4 h-auto md:grid-cols-4 grid-cols-1 gap-6'}>
                        <div className={'h-auto w-full max-w-full'}>
                            <Image
                                src={'/assets/hybrid/3.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/hybrid/4.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/hybrid/1.png'}
                                alt={'calender'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/hybrid/2.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Front-End Development Service */}
            <section ref={frontRef}
                     className={`py-6 transition-colors duration-500 ${
                         isFrontendActive
                             ? isDayTime
                                 ? "bg-black text-white"
                                 : "bg-white text-black"
                             : isDayTime
                                 ? "bg-white text-black"
                                 : "bg-black text-white"
                     }`}>

                {/* Front-end Development Services */}
                <div id={'development services'}
                     className={`relative lg:py-[3em] py-[1em] lg:my-[5em] lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]`}>
                    <h2 className={'border-b pb-[0.8em]  border-gray-300/20 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[600]'}>
                        Front-end <br className={'lg:block md:block hidden'}/>Development Services</h2>
                    <div
                        className={`relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[6em] gap-4 mb-4`}>
                        <div id={'CFD'} className={`mt-[3em]`}>
                            <div
                                className={`relative mb-4 w-[65px] h-[65px]  ${
                                    isFrontendActive
                                        ? isDayTime
                                            ? "bg-white"
                                            : "bg-black"
                                        : isDayTime
                                            ? "bg-black"
                                            : "bg-white"
                                }`}
                                style={{
                                    clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                                }}
                            >
                                <Image
                                    src={isFrontendActive
                                        ? isDayTime ? "/assets/front/icon/mobile.svg" : "/assets/front/icon/mobile1.svg"
                                        : isDayTime ? "/assets/front/icon/mobile1.svg" : "/assets/front/icon/mobile.svg"
                                    }
                                    alt='Custom Front-end '
                                    width={40}
                                    height={40}
                                    className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                                />
                            </div>
                            <h3 className=' text-[1.5em] font-[600] mb-4'>
                                Custom Front-End <br className={'lg:block md:block hidden'}/>Development
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400] hover:border-animation'>
                                Your business is unique, and your digital experience should reflect that uniqueness at
                                every touchpoint. At Grey InfoTech, we take a deep dive into your brand, your goals, and
                                your target audience to develop tailored front-end solutions that truly align with your
                                business vision and market demands. Our team combines creativity with technical
                                precision to design responsive, accessible, and high-performing interfaces that not only
                                look impressive but also deliver smooth, intuitive user experiences across devices.
                                Leveraging the latest technologies and frameworks, we build scalable, future-proof
                                platforms that support long-term growth and adaptability. Every element is crafted to
                                drive engagement, communicate value clearly, and guide users toward meaningful
                                action—ultimately helping your business convert, grow, and lead in its space.
                            </p>
                        </div>
                        <div id={'CFD'} className={`mt-[3em]`}>
                            <div
                                className={`relative mb-4 w-[65px] h-[65px]  ${
                                    isFrontendActive
                                        ? isDayTime
                                            ? "bg-white"
                                            : "bg-black"
                                        : isDayTime
                                            ? "bg-black"
                                            : "bg-white"
                                }`}
                                style={{
                                    clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                                }}
                            >
                                <Image
                                    src={isFrontendActive
                                        ? isDayTime ? "/assets/front/icon/weba.svg" : "/assets/front/icon/weba1.svg"
                                        : isDayTime ? "/assets/front/icon/weba1.svg" : "/assets/front/icon/weba.svg"
                                    }
                                    alt='Single-Page Application'
                                    width={40}
                                    height={40}
                                    className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                                />
                            </div>
                            <h3 className=' text-[1.5em] font-[600] mb-4'>
                                Single-Page Application <br className={'lg:block md:block hidden'}/>(SPA) Development
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400] hover:border-animation'>
                                We build fast, interactive Single Page Applications (SPAs) using powerful frameworks
                                like React, <Link href={'/services/Vuejs-Development'}
                                                  className={`border-b pb-[0.01em] ${
                                                      isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'
                                                  }`}>Vue.js</Link>, and Angular. These technologies allow us to create
                                fluid, app-like experiences in the browser by enabling asynchronous data handling and
                                efficient state management. Our SPAs eliminate unnecessary page reloads, ensuring that
                                users can navigate smoothly and interact in real time. This approach not only enhances
                                performance and responsiveness but also reduces bounce rates and increases user
                                engagement—delivering digital experiences that feel modern, intuitive, and built for
                                speed.
                            </p>
                        </div>
                        <div id={'CFD'} className={`mt-[3em]`}>
                            <div
                                className={`relative mb-4 w-[65px] h-[65px]  ${
                                    isFrontendActive
                                        ? isDayTime
                                            ? "bg-white"
                                            : "bg-black"
                                        : isDayTime
                                            ? "bg-black"
                                            : "bg-white"
                                }`}
                                style={{
                                    clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                                }}
                            >
                                <Image
                                    src={isFrontendActive
                                        ? isDayTime ? "/assets/front/icon/web.svg" : "/assets/front/icon/web1.svg"
                                        : isDayTime ? "/assets/front/icon/web1.svg" : "/assets/front/icon/web.svg"
                                    }
                                    alt='Progressive Web App (PWA) Development'
                                    width={40}
                                    height={40}
                                    className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                                />
                            </div>
                            <h3 className=' text-[1.5em] font-[600] mb-4'>
                                Progressive Web Application <br className={'lg:block md:block hidden'}/>(PWA)
                                Development
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400] hover:border-animation'>
                                Our Progressive Web Apps (PWAs) bring app-like functionality to the web, offering
                                features such as offline access, push notifications, and home screen
                                installation—without the need for app store downloads. Designed with speed, usability,
                                and reliability in mind, our PWAs deliver seamless, consistent user experiences across
                                all devices and browsers. Using technologies like Service Workers and Web App Manifests,
                                we create robust platforms that load quickly, perform well under pressure, and remain
                                accessible even in areas with limited or unstable internet connectivity. This ensures
                                your users stay engaged and your business remains always within reach.
                            </p>
                        </div>
                        <div id={'CFD'} className={`mt-[3em]`}>
                            <div
                                className={`relative mb-4 w-[65px] h-[65px]  ${
                                    isFrontendActive
                                        ? isDayTime
                                            ? "bg-white"
                                            : "bg-black"
                                        : isDayTime
                                            ? "bg-black"
                                            : "bg-white"
                                }`}
                                style={{
                                    clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                                }}
                            >
                                <Image
                                    src={isFrontendActive
                                        ? isDayTime ? "/assets/front/icon/cross.svg" : "/assets/front/icon/cross1.svg"
                                        : isDayTime ? "/assets/front/icon/cross1.svg" : "/assets/front/icon/cross.svg"
                                    }
                                    alt='Cross Device and Cross Browser Compatibility'
                                    width={40}
                                    height={40}
                                    className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                                />
                            </div>
                            <h3 className=' text-[1.5em] font-[600] mb-4'>
                                Cross Device & Cross <br className={'lg:block md:block hidden'}/>Browser Compactibility
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400] hover:border-animation'>
                                We rigorously test your platform across a wide range of devices, screen sizes, and
                                browsers to ensure consistent functionality, design integrity, and user experience.
                                Whether your audience accesses your site from desktops, laptops, tablets, or
                                smartphones, we make sure every interaction is smooth, responsive, and pixel-perfect.
                                Our cross-platform testing process identifies and resolves compatibility issues early,
                                ensuring your platform performs flawlessly across environments and delivers a seamless
                                experience to all users.
                            </p>
                        </div>
                        <div id={'CFD'} className={`mt-[3em]`}>
                            <div
                                className={`relative mb-4 w-[65px] h-[65px]  ${
                                    isFrontendActive
                                        ? isDayTime
                                            ? "bg-white"
                                            : "bg-black"
                                        : isDayTime
                                            ? "bg-black"
                                            : "bg-white"
                                }`}
                                style={{
                                    clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                                }}
                            >
                                <Image
                                    src={isFrontendActive
                                        ? isDayTime ? "/assets/front/icon/hybrid.svg" : "/assets/front/icon/hybrid1.svg"
                                        : isDayTime ? "/assets/front/icon/hybrid1.svg" : "/assets/front/icon/hybrid.svg"
                                    }
                                    alt='Legacy Front-End Modernisation'
                                    width={40}
                                    height={40}
                                    className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                                />
                            </div>
                            <h3 className=' text-[1.5em] font-[600] mb-4'>
                                legacy Front-End <br className={'lg:block md:block hidden'}/>Modernisation
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400] hover:border-animation'>
                                Don’t let outdated interfaces slow your growth. At Grey InfoTech, we specialise in
                                modernising legacy front-ends by migrating to cutting-edge frameworks, streamlining
                                codebases, and ensuring full compliance with current web standards. Our process begins
                                with a comprehensive audit to uncover performance bottlenecks, UI/UX limitations, and
                                architectural inefficiencies. From there, we deliver a complete front-end
                                overhaul—transforming your platform into a fast, responsive, and scalable solution that
                                not only meets but exceeds modern user expectations. Let us help you future-proof your
                                digital presence.
                            </p>
                        </div>
                        <div id={'CFD'} className={`mt-[3em]`}>
                            <div
                                className={`relative mb-4 w-[65px] h-[65px]  ${
                                    isFrontendActive
                                        ? isDayTime
                                            ? "bg-white"
                                            : "bg-black"
                                        : isDayTime
                                            ? "bg-black"
                                            : "bg-white"
                                }`}
                                style={{
                                    clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                                }}
                            >
                                <Image
                                    src={isFrontendActive
                                        ? isDayTime ? "/assets/front/icon/pwa.svg" : "/assets/front/icon/pwa1.svg"
                                        : isDayTime ? "/assets/front/icon/pwa1.svg" : "/assets/front/icon/pwa.svg"
                                    }
                                    alt='Custom Component Development'
                                    width={40}
                                    height={40}
                                    className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                                />
                            </div>
                            <h3 className=' text-[1.5em] font-[600] mb-4'>
                                Custom Component <br className={'lg:block md:block hidden'}/>Development
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400] hover:border-animation'>
                                Scalability and consistency are at the core of our front-end development approach. We
                                engineer reusable, modular components tailored to your specifications, ensuring each
                                element aligns with your brand and technical needs. By leveraging modern frameworks and
                                implementing design systems, we streamline development, accelerate time-to-market, and
                                reduce technical debt. The result is a cohesive, maintainable interface that supports
                                long-term growth, seamless feature expansion, and a consistent user experience across
                                every screen and device.
                            </p>
                        </div>
                        <div id={'CFD'} className={`mt-[3em]`}>
                            <div
                                className={`relative mb-4 w-[65px] h-[65px]  ${
                                    isFrontendActive
                                        ? isDayTime
                                            ? "bg-white"
                                            : "bg-black"
                                        : isDayTime
                                            ? "bg-black"
                                            : "bg-white"
                                }`}
                                style={{
                                    clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                                }}
                            >
                                <Image
                                    src={isFrontendActive
                                        ? isDayTime ? "/assets/front/icon/access.svg" : "/assets/front/icon/access1.svg"
                                        : isDayTime ? "/assets/front/icon/access1.svg" : "/assets/front/icon/access.svg"
                                    }
                                    alt='Accessibility'
                                    width={40}
                                    height={40}
                                    className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                                />
                            </div>
                            <h3 className=' text-[1.5em] font-[600] mb-4'>
                                Accessibility
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400] hover:border-animation'>
                                Inclusivity isn’t optional – it’s a necessity. We design and develop front-end
                                experiences that are accessible to all users, including those with disabilities. By
                                adhering to Web Content Accessibility Guidelines (WCAG), we implement critical features
                                like keyboard navigation, screen reader support, appropriate colour contrast, and
                                scalable text. Our accessibility-first approach includes detailed audits, the use of
                                semantic HTML, proper ARIA roles, and fully accessible forms. The result is a platform
                                that not only complies with legal standards but also ensures everyone can engage with
                                your digital product equally and effectively.
                            </p>
                        </div>
                        <div id={'CFD'} className={`mt-[3em]`}>
                            <div
                                className={`relative mb-4 w-[65px] h-[65px]  ${
                                    isFrontendActive
                                        ? isDayTime
                                            ? "bg-white"
                                            : "bg-black"
                                        : isDayTime
                                            ? "bg-black"
                                            : "bg-white"
                                }`}
                                style={{
                                    clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                                }}
                            >
                                <Image
                                    src={isFrontendActive
                                        ? isDayTime ? "/assets/front/icon/perf.svg" : "/assets/front/icon/perf1.svg"
                                        : isDayTime ? "/assets/front/icon/perf1.svg" : "/assets/front/icon/perf.svg"
                                    }
                                    alt='Front-end Performance Optimisation'
                                    width={40}
                                    height={40}
                                    className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                                />
                            </div>
                            <h3 className=' text-[1.5em] font-[600] mb-4'>
                                Front-End <br className={'lg:block md:block hidden'}/>Performance Optimisation
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400] hover:border-animation'>
                                A fast, seamless digital experience is essential for keeping users engaged and driving
                                conversions. We fine-tune your front-end using performance optimisation techniques such
                                as code splitting, lazy loading, caching strategies, and image compression. These
                                improvements lead to significantly faster load times, smoother interactions, and reduced
                                bounce rates. Not only does this enhance the overall user experience, but it also boosts
                                your <Link href={'/services/seo'}
                                           className={`border-b pb-[0.05em] ${
                                               isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'
                                           }`}>SEO</Link> performance and increases the likelihood of repeat visits and
                                long-term user
                                retention.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Frontend Development Process */}
            <div className={`${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <div id={'frontend process'}
                     className={'relative lg:pt-[5em] md:pt-[5em] pt-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <h2 className={'border-b pb-[0.8em] border-gray-500/50 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                        Front-End Development Process</h2>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div className='lg:sticky top-32 lg:h-screen overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Process
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                                isDayTime ? 'text-white decoration-gray-300 focus:decoration-gray-100' : 'text-black decoration-gray-600 focus:decoration-gray-900'
                            }`}>
                                {[
                                    {id: "01", title: "Discovery & Research", target: "DR"},
                                    {id: "02", title: "Ideation", target: "ID"},
                                    {id: "03", title: "Prototyping", target: "PT"},
                                    {id: "04", title: "Implementation", target: "IMP"},
                                    {id: "05", title: "Deployment", target: "DP"},
                                    {id: "06", title: "Monitoring & Maintenance", target: "MM"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-2 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-black ${activeId === item.target ? 'text-gray-950 font-[650]' : 'text-gray-500 font-[300]'}`
                                                    : `focus:text-white ${activeId === item.target ? 'text-gray-50 font-[650]' : 'text-gray-500 font-[300]'}`
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
                        <div className={'lg:-ml-[7em] lg:mb-[17em]'}>
                            <div
                                className="grid lg:grid-cols-[50px_auto] md:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'DR'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Discovery & Research</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Roadmap</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>UX research</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Market research</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Business alignment</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We immerse ourselves in your business to uncover the insights that drive
                                        strategic success. By conducting stakeholder interviews, performing in-depth
                                        user research, and analysing behavioural and performance data, we define clear
                                        user personas and identify key pain points and opportunities. This discovery
                                        phase allows us to craft a tailored roadmap that aligns with your business
                                        objectives, ensuring the final product not only meets user needs but also
                                        delivers measurable results.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ID'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Ideation</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Wireframe</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Workshops</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Collaboration</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        In collaborative workshops, we work closely with your team to brainstorm ideas,
                                        wireframe concepts, and prototype solutions that align with your business goals.
                                        This hands-on, iterative process ensures every design decision is guided by user
                                        needs and feedback, resulting in innovative, intuitive interfaces that not only
                                        look great but also perform effectively in real-world scenarios.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'PT'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Prototyping</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Front-end tools</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Interactive prototypes</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Using advanced front-end tools, we craft interactive prototypes that simulate
                                        real user interactions, allowing us to validate functionality, usability, and
                                        design early in the process. This approach helps reduce development risk,
                                        uncover potential issues, and refine the product before full-scale
                                        implementation—ensuring a smoother path to launch and a solution that meets both
                                        business and user expectations.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'IMP'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Implementation</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Modern frameworks</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Seamless integration</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        With clean, maintainable code as the foundation, we develop your front-end using
                                        modern frameworks like React, Vue, or Angular, paired with industry-standard
                                        development methodologies. Our approach ensures scalability, responsiveness, and
                                        future-proofing. We also prioritise seamless integration with back-end systems,
                                        enabling fast data flow and optimal performance across all devices and
                                        environments.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'DP'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Deployment</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Speed</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Smooth launch</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We prioritise security, speed, and reliability throughout the deployment
                                        process. By implementing CI/CD pipelines, robust version control, and automated
                                        testing, we ensure your front-end launches smoothly and remains stable under
                                        real-world conditions. Our approach sets the stage for future scalability and
                                        continuous improvement, keeping your platform ready to grow with your business.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'MM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Monitoring & Maintenance</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Regular updates</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Ongoing support</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Digital solution</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        After launch, we provide continuous support to ensure your platform remains
                                        secure, functional, and aligned with evolving needs. From applying regular
                                        updates and performance enhancements to scaling infrastructure as your user base
                                        grows, our team is committed to maintaining long-term stability and helping your
                                        digital solution grow alongside your business.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technologies We Use */}
            <div className={`${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div id={'technology used'}
                     className={`relative lg:-mt-[20em] py-24 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6  ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}>
                        <div>
                            <h2 className='text-[1em] capitalize sm:text-[1.5em] md:text-[2em] lg:text-[3.3em] font-[550] tracking-tighter leading-[1] lg:pb-6'>
                                Technologies <br className={'lg:block md:block hidden'}/>We Use
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
                             isDayTime ? 'text-black' : 'text-white'
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

            {/* Mid image*/}
            <div id={'mid image'} className={'lg:-mt-[5em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/front/midd.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Front-end Development Business Benefits */}
            <div id={'business benefit'}
                 className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                {/* Business Benefit Header */}
                <div
                    className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[2em] lg:mb-[5em] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div>
                        <h2 className='text-[1em] text-start sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                            Front-End <br className={'lg:block md:block hidden'}/>Development <br
                            className={'lg:block md:block hidden'}/>Business
                            Benefits
                        </h2>
                    </div>
                    <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                        <p className={'text-justify text-[0.87em] font-[300]'}>
                            With the exception of being affordable, easily accessible, and scalable to meet your
                            company&#39;s demands, a customized or custom web application has all the advantages of
                            traditional software. We have developed cutting-edge online applications for businesses in a
                            variety of sectors, such as technology, finance, construction, and hiring. When you
                            collaborate with us, you can create your product more quickly and with less worry.
                        </p>
                    </div>
                </div>

                {/* Benefits */}
                <div
                    className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]  ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div id={'fast-load'}>
                        <Image
                            src={isDayTime ? '/assets/front/icon2/test.svg' : '/assets/front/icon2/test1.svg'}
                            alt={'Faster Load Time'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Faster Load Time
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Custom web applications offer the flexibility to evolve alongside your business, adapting to
                            new processes, markets, or customer needs without requiring a complete rebuild. With
                            scalable server architecture, you can adjust resources on demand—scaling up during peak
                            periods or down during quieter times—ensuring optimal performance and cost-efficiency as
                            your company grows.
                        </p>
                    </div>
                    <div id={'mobile-rep'}>
                        <Image
                            src={isDayTime ? '/assets/front/icon2/fast.svg' : '/assets/front/icon2/fast1.svg'}
                            alt={'Mobile Responsiveness'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Mobile Responsiveness
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Improving front-end development ensures your website is fully responsive and accessible
                            across all devices, delivering a seamless and consistent user experience whether visitors
                            are browsing on desktop, tablet, or mobile. This not only enhances usability and engagement
                            but also strengthens your brand’s credibility, reduces bounce rates, and supports better
                            performance in search rankings—key factors in driving business success in a digital-first
                            world.
                        </p>
                    </div>
                    <div id={'increased-conversion'}>
                        <Image
                            src={isDayTime ? '/assets/front/icon2/att.svg' : '/assets/front/icon2/att1.svg'}
                            alt={'Increased conversion rates'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Increased Conversion Rates
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            A visually appealing and user-friendly interface plays a crucial role in guiding users
                            through key actions—such as signing up, making a purchase, or engaging with content—by
                            creating intuitive navigation and reducing friction at every step. When users can interact
                            with your platform effortlessly and confidently, it not only enhances their experience but
                            also significantly improves conversion rates and contributes to overall business growth.
                        </p>
                    </div>
                    <div id={'user-experience'}>
                        <Image
                            src={isDayTime ? '/assets/front/icon2/fast.svg' : '/assets/front/icon2/fast1.svg'}
                            alt={'Enhanced User Experience'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Enhanced User Experience
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Optimising front-end code and assets—such as compressing images, minifying CSS and
                            JavaScript, and leveraging browser caching—significantly improves load times. Faster
                            websites reduce bounce rates, keep users engaged longer, and enhance the overall user
                            experience. In addition to boosting conversion rates, these improvements also contribute to
                            better SEO performance, as search engines prioritise speed and usability in their rankings.
                        </p>
                    </div>
                    <div id={'future-proofing'}>
                        <Image
                            src={isDayTime ? '/assets/front/icon2/fast.svg' : '/assets/front/icon2/fast1.svg'}
                            alt={'Scalability & Future Proofing'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Scalability & Future Proofing
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Optimising front-end code and assets—such as compressing images, minifying CSS and
                            JavaScript, and leveraging browser caching—significantly improves load times. Faster
                            websites reduce bounce rates, keep users engaged longer, and enhance the overall user
                            experience. In addition to boosting conversion rates, these improvements also contribute to
                            better SEO performance, as search engines prioritise speed and usability in their rankings.
                        </p>
                    </div>
                    <div id={'seo'}>
                        <Image
                            src={isDayTime ? '/assets/front/icon2/cust.svg' : '/assets/front/icon2/cust1.svg'}
                            alt={'SEO Benefits'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            SEO Benefits
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Properly structured and optimised front-end code—such as using semantic HTML, clean URLs,
                            responsive design, and fast-loading assets—enhances your site’s search engine optimisation
                            (SEO). This makes it easier for search engines to crawl and index your content, improving
                            visibility in search results and driving more organic traffic to your website. A strong
                            front-end foundation is essential for long-term digital growth and discoverability.
                        </p>
                    </div>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div className={`${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div id={'partners'}
                     className={`relative lg:py-20 lg:mb-20 md:mb-20 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                         isDayTime ? 'text-black' : 'text-white'
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
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-[3%]`}></span>
                            <span
                                className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                            <span
                                className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-black group-hover:text-gray-300' : 'text-white group-hover:text-gray-800'}`}>
                            Start a project <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                            <span
                                className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-black' : 'border-white'} rounded-full"}></span>
                        </button>
                    </Link>

                    {/* Countup */}
                    <div id={'countup'}
                         className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-300 ${
                             isDayTime ? 'text-black' : 'text-white'
                         }`}
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

            {/* Testimonials */}
            <div
                className={`relative -mt-20 py-24 lg:mb-16 mb-10 max-w-full w-full  h-auto ${
                    isDayTime ? 'bg-black' : 'bg-white'
                }`}>
                <div
                    className={`relative mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 ${
                        isDayTime ? 'text-white' : 'text-black'
                    }`}>
                    <div>
                        <h5 className="uppercase text-xs font-[500] tracking-widest mb-4">What our clients say</h5>
                    </div>
                    <div className={'lg:ml-[-20em] md:ml-[-20em] sm:ml-[-10em]'}>
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

            {/* Back-end development process */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'development process'}
                     className={`py-10 relative lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Development Process Header */}
                    <div className={`sticky top-0 z-10 bg-opacity-90 backdrop-blur-md ${
                        isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                    }`}>
                        <div className="border-b-[0.1em] border-gray-300/50 pb-[2em]">
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                                Why Grey InfoTech
                            </h2>
                        </div>
                    </div>

                    {/* X-Scroll */}
                    <section ref={targetRef} className="h-[200vh]">
                        <div
                            className="sticky top-32 flex h-[60vh] w-full max-w-full items-center overflow-hidden">
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
                                                Bespoke
                                            </>
                                        ),
                                        description: (
                                            <>
                                                We take a business-first approach to every project—no one-size-fits-all
                                                solutions. Our bespoke front-end development is tailored to your brand,
                                                target audience, and commercial objectives. By aligning design and
                                                technology with your strategic goals, we help you create digital
                                                platforms that drive engagement, support growth, and deliver measurable
                                                business outcomes.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        subtitle: "02",
                                        title: "Deep Knowledge",
                                        description: (
                                            <>
                                                Our team brings years of front-end development expertise, leveraging the
                                                latest technologies and frameworks to build robust, scalable, and
                                                high-performing solutions. We focus on creating interfaces that not only
                                                look great but also support your business objectives through
                                                reliability, speed, and seamless user experience across all devices.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        subtitle: "03",
                                        title: "Full Service",
                                        description: (
                                            <>
                                                From initial concept to launch and beyond, we’re with you every step of
                                                the way. Our team handles the technical complexities—design,
                                                development, optimisation, and maintenance—so you can stay focused on
                                                running and growing your business. We work as your long-term technology
                                                partner, ensuring your digital product not only meets today’s needs but
                                                also scales seamlessly for tomorrow’s opportunities.
                                            </>
                                        ),
                                    },
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

            {/* Partners Sections */}
            <div id={'partners'}
                 className={`relative max-w-full lg:mb-36 py-6 mx-auto px-4 sm:px-6 lg:px-[4.6em] h-auto overflow-hidden ${
                     isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className={`justify-self-start text-start lg:mt-12 mt-6 lg:mb-12 mb-6`}>
                    <h3 className={'text-[1em] font-[600]'}>Our partners</h3>
                </div>
                <div className={`grid lg:grid-cols-5 grid-cols-2 gap-6 lg:pb-12 lg:mb-10 mb-8`}>
                    {partners.map((partner) => (
                        <div key={partner.id} className={`flex justify-center items-center`}>
                            <Image
                                src={`/assets/partners/${isDayTime ? partner.dayImage : partner.nightImage}`}
                                alt={partner.name}
                                width={100}
                                height={100}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Last image*/}
            <div id={'last image'} className={'lg:-mt-[10em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/front/last.jpg'}
                    alt={'Last Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* FAQ section */}
            <div id={'FAQ'} className={`relative lg:py-36 mb-16 ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            FAQs About <br className={'lg:block md:block hidden'}/>Our Front-End Development
                        </h2>
                    </div>
                </div>
                <div className='relative mx-auto px-4 sm:px-6 lg:px-[12em] space-y-2'>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(0)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none"
                        >
                            <span>Can you show examples of previous front-end projects you’ve worked on?</span>
                            {onIndex === 0 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 0 && (
                            <p className="mt-4 text-[0.873em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We’re proud of the diverse portfolio we’ve built at Grey InfoTech, featuring successful
                                front-end projects across industries like retail, finance, healthcare, and technology.
                                From custom e-commerce platforms and corporate websites to dynamic web applications, our
                                work reflects a strong focus on user experience and performance. We’d be happy to share
                                relevant case studies during our initial discussion, or you can explore our Recent Work
                                section to see how we deliver results through thoughtful design and robust development.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do you specialise in any industries or types of businesses?</span>
                            {onIndex === 1 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 1 && (
                            <p className="mt-4 text-[0.873em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                At Grey InfoTech, we work across a wide range of sectors including e-commerce,
                                education, healthcare, finance, technology, hospitality, and more. While we don’t limit
                                ourselves to a single industry, we take the time to understand the unique goals and
                                challenges of each client. Our tailored approach ensures we deliver the right
                                solution—whether you’re a startup, SME, or enterprise. We’re flexible, collaborative,
                                and results-driven. Visit our Sectors section to see how we support businesses like
                                yours.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What makes your approach to front-end development unique?</span>
                            {onIndex === 2 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 2 && (
                            <p className="mt-4 text-[0.873em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Our approach is collaborative and user-centric. We take the time to understand your
                                business, brand, and audience to craft a solution that truly fits. By combining clean,
                                scalable code with modern technologies and intuitive design, we build robust,
                                future-proof digital experiences. We’re also committed to accessibility, performance
                                optimisation, and cross-device compatibility—ensuring your platform delivers the best
                                possible experience for every user, every time.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What technologies, frameworks and tools <br
                                className={'lg:block md:block hidden'}/>do you use for front-end development?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <p className="mt-4 text-[0.873em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We leverage modern technologies and frameworks selected specifically to match the goals
                                of your project. Our front-end toolkit includes HTML5, CSS3, and modern JavaScript
                                (ES6+), along with powerful frameworks such as React.js, Vue.js, and Angular. We use CSS
                                preprocessors like SASS and LESS, and build tools including Webpack, Vite, and Gulp to
                                streamline development. Version control is managed through Git for collaboration and
                                stability. Most importantly, we follow industry best practices to ensure your solution
                                is fully responsive, scalable, and optimised for speed and performance.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do you follow the latest industry trends and best practices?</span>
                            {onIndex === 4 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 4 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Yes. At Grey InfoTech, we’re deeply committed to staying ahead of the curve with the
                                latest industry trends, technologies, and best practices. Our team actively upskills by
                                adopting new frameworks, tools, and modern development methodologies to ensure we
                                deliver innovative, future-ready solutions. We place strong emphasis on responsive
                                design, web accessibility, and performance optimisation—ensuring every product we
                                deliver meets the highest standards of quality, usability, and technical excellence.
                                This commitment to continuous improvement means your business benefits from digital
                                solutions that are not only current, but also competitive and scalable.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>How do you ensure that your code is clean, maintainable and scalable?</span>
                            {onIndex === 5 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 5 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                At Grey InfoTech, we follow industry best practices and coding standards to ensure
                                long-term maintainability and scalability. Our front-end development approach includes
                                modular architecture, reusable components, and comprehensive documentation—making your
                                product easier to manage and evolve. We adopt scalable methodologies like BEM for CSS
                                and leverage robust state management tools such as Redux or Vuex to keep applications
                                efficient and organised. To uphold code quality and consistency, we conduct regular code
                                reviews and integrate automated testing throughout the development lifecycle—ensuring
                                every release is reliable and production-ready.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do you provide design services, or will you work with my design team?</span>
                            {onIndex === 6 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 6 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We offer comprehensive UI/UX design services, but we’re equally comfortable
                                collaborating with your in-house design team or an external agency. If you choose to
                                partner with us for design, we’ll deliver a front-end that is not only visually
                                compelling but also user-friendly, accessible, and aligned with your brand identity. If
                                your designs are already in place, our team will expertly transform them into a
                                responsive, high-performing front-end that brings your vision to life—seamlessly and at
                                scale.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can you make my website or app responsive across all devices?</span>
                            {onIndex === 7 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 7 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Yes, responsiveness is a core focus of our development process. We design and build
                                interfaces that perform seamlessly across all screen sizes—from desktops and tablets to
                                smartphones. By applying responsive design principles, utilizing media queries, and
                                leveraging modern frameworks like Flexbox and Grid, we ensure a consistent, optimized,
                                and engaging user experience on every device, helping you reach and retain your audience
                                effectively.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do you ensure the user interface is intuitive and user-friendly?</span>
                            {onIndex === 8 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 8 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We adopt a user-first approach, grounding all design decisions in thorough research and
                                data analysis. Through wireframes, prototypes, and usability testing, we validate the
                                interface before development begins, ensuring alignment with user needs. Our focus on
                                clear navigation, accessibility, and responsive interactions creates platforms that are
                                intuitive and easy to engage with—resulting in higher user satisfaction and improved
                                conversion rates.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(9)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do you optimise the front-end for performance?</span>
                            {onIndex === 9 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 9 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We apply a range of proven performance optimisation techniques to deliver fast and
                                smooth user experiences. These include code splitting to minimize initial load times,
                                lazy loading for images and other assets to prioritize critical content, and
                                minification of CSS, JavaScript, and HTML to reduce file sizes. We also optimise images
                                using modern formats like WebP for faster loading, implement caching strategies to
                                accelerate repeat visits, and configure assets for delivery through Content Delivery
                                Networks (CDNs) to ensure global performance consistency. Together, these strategies
                                enhance load speeds, improve user engagement, and boost SEO rankings—key factors in
                                driving business growth.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(10)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do you handle cross-browser compatibility?</span>
                            {onIndex === 10 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 10 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We conduct comprehensive testing across all major browsers—Chrome, Safari, Firefox,
                                Edge—and legacy browsers when necessary. Using tools like BrowserStack alongside manual
                                testing on real devices, we ensure your platform delivers consistent performance and a
                                flawless user experience, no matter the browser or device. This thorough approach helps
                                safeguard your brand reputation and maximises user engagement.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(11)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What measures do you take to improve SEO for my website or app?</span>
                            {onIndex === 11 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 11 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                To improve SEO for your website or app, we implement best practices that enhance search
                                engine visibility and user experience. This includes using semantic HTML to ensure clear
                                content indexing, optimizing metadata, headings, and alt attributes for both
                                accessibility and SEO, and prioritizing fast load times to boost Core Web Vitals
                                performance. Additionally, we deliver fully responsive, mobile-friendly designs that
                                comply with search engine requirements, and integrate structured data (such as
                                Schema.org) to help search engines better understand and display your content. These
                                measures collectively drive higher organic traffic and improve your online presence.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(12)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Do you ensure that the front-end is accessible <br
                                className={'lg:block md:block hidden'}/>for all users, including those with disabilities?</span>
                            {onIndex === 12 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 12 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Accessibility is a core part of our development philosophy at Grey InfoTech. We adhere
                                strictly to the Web Content Accessibility Guidelines (WCAG) to ensure your digital
                                solutions are inclusive and usable by all users, including those with disabilities. Our
                                approach includes using semantic HTML and ARIA roles to provide meaningful structure,
                                implementing colour contrast ratios that meet or exceed standards, and ensuring full
                                keyboard navigation and screen reader compatibility. Additionally, we conduct thorough
                                accessibility audits throughout development to proactively identify and resolve any
                                barriers, helping you meet compliance requirements and reach a wider audience while
                                enhancing overall user satisfaction.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(13)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Can you implement accessibility features, such as <br
                                className={'lg:block md:block hidden'}/>screen reader support and keyboard navigation?</span>
                            {onIndex === 13 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 13 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                At Grey InfoTech, we prioritize accessibility to ensure your platform is inclusive and
                                compliant with industry standards. We implement essential accessibility features such as
                                screen reader compatibility, logical tab order for seamless keyboard navigation, and
                                clear focus indicators to assist users with disabilities. Our rigorous approach
                                guarantees that your application meets or exceeds recognized accessibility standards,
                                helping you reach a broader audience, reduce legal risks, and demonstrate your
                                commitment to corporate social responsibility.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(14)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do you ensure the front-end is secure?</span>
                            {onIndex === 14 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 14 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                At Grey InfoTech, security is integral to our front-end development process. We
                                implement robust best practices to protect your platform from vulnerabilities and cyber
                                threats. This includes thorough input validation to prevent cross-site scripting (XSS)
                                and injection attacks, secure management of authentication tokens and sensitive data,
                                and enforcing HTTPS protocols to ensure encrypted communications. Additionally, we
                                configure Content Security Policies (CSP) to restrict unauthorized resource loading. By
                                prioritizing these security measures, we safeguard your users and business reputation
                                while maintaining compliance with industry standards.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(15)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do you follow industry standards for secure development practices?</span>
                            {onIndex === 15 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 15 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                At Grey InfoTech, our front-end testing approach is comprehensive and quality-driven. We
                                combine multiple layers of testing to ensure your platform is robust, user-friendly, and
                                production-ready. This includes:
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(16)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is your approach to testing the front-end?</span>
                            {onIndex === 16 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 16 && (
                            <div
                                className={"mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5] text-gray-400"}>
                                <p className={'font-[200]'}>
                                    At Grey InfoTech, our front-end testing approach is comprehensive and
                                    quality-driven. We combine multiple layers of testing to ensure your platform is
                                    robust, user-friendly, and production-ready. This includes:
                                </p>
                                <ul className={'list-disc ml-4 font-[200] my-4'}>
                                    <li className={'mb-2'}><span className={'font-[500]'}>Unit Testing</span> to
                                        validate that individual
                                        components perform their intended functions accurately.
                                    </li>
                                    <li className={'mb-2'}><span className={'font-[500]'}>Integration Testing</span> to
                                        verify that
                                        different components interact and function seamlessly together.
                                    </li>
                                    <li className={'mb-2'}><span className={'font-[500]'}>End-to-End Testing</span> to
                                        simulate real user
                                        scenarios and ensure that your application works reliably from start to finish.
                                    </li>
                                    <li className={'mb-2'}><span className={'font-[500]'}>Performance Testing</span> to
                                        measure speed,
                                        responsiveness, and stability under various conditions.
                                    </li>
                                    <li><span
                                        className={'font-[500]'}>Cross-Browser and Cross-Device Testing</span> using
                                        tools like BrowserStack and manual testing on physical devices to guarantee
                                        consistent performance across all major browsers and screen sizes.
                                    </li>
                                </ul>
                                <p className={'font-[200]'}>This layered approach helps us catch issues early, optimise
                                    user experience, and
                                    deliver a polished, dependable product.</p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(17)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do you handle bugs or issues found after deployment?</span>
                            {onIndex === 17 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 17 && (
                            <p className="mt-4 text-[0.85em] text-justify font-[200] tracking-normal leading-[1.5]text-gray-400">
                                We provide comprehensive ongoing support and maintenance to ensure your platform remains
                                reliable, secure, and optimised. Our team proactively monitors performance and security,
                                allowing us to identify and resolve potential issues before they affect your users. We
                                prioritise bug fixes based on impact and urgency, ensuring minimal disruption to your
                                business. Additionally, we stay aligned with evolving technologies and platform updates
                                to keep your front-end experience smooth, fast, and compatible over time. With Grey
                                InfoTech, your digital solution is continuously supported and future-ready.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(18)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can you help scale or upgrade my front-end in the future?</span>
                            {onIndex === 18 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 18 && (
                            <p className="mt-4 text-[0.85em] text-justify font-[200] tracking-normal leading-[1.5]text-gray-400">
                                Yes, we design all our front-end solutions with scalability in mind. As your business
                                grows and evolves, your platform should too. Whether you’re adding new features,
                                expanding to support more users, or adopting emerging technologies, our front-end
                                architecture is built to adapt. We ensure your codebase is modular, maintainable and
                                future-proof—making it easier to scale without compromising performance, design
                                consistency, or user experience. Grey InfoTech helps you stay ready for what’s next.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(19)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How much do your front-end development services cost?</span>
                            {onIndex === 19 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 19 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal font-[200] leading-[1.5]text-gray-400">
                                Our pricing is tailored to the unique needs of each project. Factors such as complexity,
                                functionality, integrations, and timelines all influence the cost. After an initial
                                consultation to understand your goals and technical requirements, we provide a detailed
                                proposal outlining the scope of work, timelines, and a transparent cost breakdown. We’re
                                committed to offering competitive rates without compromising on quality, ensuring you
                                receive exceptional value and a strong return on your investment.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default FrontendDevelopment;