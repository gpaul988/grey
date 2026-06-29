'use client';


import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import Link from "next/link";
import CountUp from "react-countup";
import {motion, useScroll, useTransform} from "framer-motion";
import {useIsDayTime} from '../../components/useIsDayTime';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard } from '@/components/futuristic/fx';
const FrontendDevelopment = () => {    const [isVisible, setIsVisible] = useState(false);
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
    const isDayTime = useIsDayTime();


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
                 className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                {/* ─── Futuristic FX overlay (hero enhancement) ─── */}
                <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
                    <div className="gx-scanline" />
                    <div className="gx-noise-overlay" />
                    <div className="gx-orbit absolute" style={{ width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .15 }} />
                </div>
                <h1
                    className={`border-b pb-[0.5em] border-gray-500/50 px-0 gx-hero-title constant-text lg:text-[5em] md:text-[3em] sm:text-[2em] text-[2.5em] lg:mt-[3em] md:mt-[3em] mt-[1.5em] leading-[1.1] font-[800] ${
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
                <ResponsiveVideoHero videoDesktop="/assets/front/hero.mp4" videoMobile="/assets/front/hero-mobile.mp4" posterImage="/assets/front/hero.jpg" />
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
                                <h2 className="gx-gradient-text lg:text-[3.2em] md:text-[3em] sm:text-[2em] text-[1.5em] text-start font-[600]">
                                    <CountUp end={stat.value} duration={2} suffix={stat.suffix || ''}/>
                                </h2>
                                <p className="text-[0.873em] font-[400] mt-1">{stat.label}</p>
                            </div>
                        ))}
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

            
            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default FrontendDevelopment;