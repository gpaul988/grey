'use client';


import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import Link from "next/link";
import {useIsDayTime} from '../../components/useIsDayTime';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard } from '@/components/futuristic/fx';
const VuejsDevelopment = () => {    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");


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
            "WAD",
            "SPAD",
            "CAD",
            "RTA",
            "MS",
            "UICD",
            "VCS",
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

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Hero Section */}
            <div id={'hero'}
                 className={`relative max-w-full w-full pb-[6em] mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                     isDayTime ? 'text-black' : 'text-white'
                 }`}>
                {/* ─── Futuristic FX overlay (hero enhancement) ─── */}
                <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
                    <div className="gx-scanline" />
                    <div className="gx-noise-overlay" />
                    <div className="gx-orbit absolute" style={{ width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .15 }} />
                </div>
                <h1
                    className={`border-b pb-[0.3em] border-gray-500/50 px-0 constant-text lg:text-[5.35em] md:text-[4.4em] sm:text-[3.5em] text-[2em] lg:mt-[2.5em] md:mt-[2.5em] mt-[4em] w-auto h-auto mx-auto leading-[1.1] font-[600]`}>
                    Vue.js Development <br className={'lg:block md:block hidden'}/>Services
                </h1>
                <div
                    className={'relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                    <div className={'lg:-mr-[4em] md:-mr-[1em] lg:mt-[2em] md:mt-[2em]'}>
                        <p className={'text-[0.87em] font-[300]'}>
                            Grey InfoTech is a Vue.js development agency serving clients in Nigeria and globally with
                            fast, scalable web solutions.
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

                <ResponsiveVideoHero videoDesktop="/assets/vue/hero.mp4" videoMobile="/assets/vue/hero-mobile.mp4" posterImage="/assets/vue/hero.jpg" />
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
                            Vue.js powering <br className={'lg::block md:block hidden'}/>next-gen applications
                        </h6>
                    </div>
                    <div className='lg:-ml-[25em] md:-ml-[16em]'>
                        <div className={'md:pl-[6em] sm:break-words sm:whitespace-normal'}>
                            <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                                Vue.js Development
                            </h3>
                            <div
                                className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                                <div>
                                    <p>
                                        At Grey InfoTech, we deliver tailored Vue.js development services grounded in
                                        deep
                                        front-end expertise and a strategic understanding of modern business needs. Our
                                        team
                                        leverages the full capabilities of Vue.js to build scalable, high-
                                        performing <Link
                                        href='/services/Web-Application'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>web
                                        applications</Link> that are both user-friendly and aligned with our clients’
                                        operational goals. Each solution is crafted to integrate seamlessly within
                                        existing
                                        systems, ensuring minimal disruption and maximum impact.
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        With a strong track record in web application development, we prioritize
                                        exceptional
                                        client service and technical excellence throughout the project lifecycle. From
                                        planning to deployment, we focus on clear communication, efficient execution,
                                        and
                                        long-term value—making Grey InfoTech a reliable partner for businesses seeking
                                        innovative, future-ready Vue.js solutions.
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
                                src={'/assets/vue/1.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/vue/3.png'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/vue/2.jpg'}
                                alt={'calender'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/vue/4.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Vue.js development Services */}
            <div className={`lg:pt-[2em] md:pt-[2em] pt-[0.5em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'vuejs-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div>
                            <h2 className={`lg:text-[3.3em] md:text-[2.5em] sm:text-[2em] text-[2em] font-[500] justify-center tracking-tight leading-[1.1]`}>
                                Our Vue.js <br className={'lg:block md:block sm:hidden'}/>Development <br
                                className={'lg:block md:block sm:hidden'}/>Services
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] md:-ml-[3.5em] tracking-noromal'>
                                Our Vue.js development services cater to both startups and established enterprises,
                                delivering flexible and scalable solutions tailored to diverse business needs. Whether
                                you&#39;re launching a new product or modernizing an existing platform, we provide
                                end-to-end expertise and strategic guidance to ensure long-term success.
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
                                Our Services
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] font-[300] relative space-y-1 md:break-words md:whitespace-normal ${
                                isDayTime ? 'text-white decoration-gray-300 focus:decoration-gray-600' : 'text-black decoration-gray-600 focus:decoration-gray-900'
                            }`}>
                                {[
                                    {id: "01", title: "Web App Development", target: "WAD"},
                                    {id: "02", title: "Single-page Application Development", target: "SPAD"},
                                    {id: "03", title: "Custom App Development", target: "CAD"},
                                    {
                                        id: "04",
                                        title: (
                                            <>
                                                Real-time Apps
                                            </>
                                        ),
                                        target: "RTA"
                                    },
                                    {id: "05", title: "Migration Services", target: "MS"},
                                    {id: "06", title: "UI Components Development", target: "UICD"},
                                    {id: "07", title: "Vue.js Consulting Services", target: "VCS"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[4em] lg:mb-[15.5em] md:mb-[23em]'}>
                            <div
                                className="grid lg:grid-cols-[50px_auto] md:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 md:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'WAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Web App Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Scalable Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>User Experience</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Business Goals</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Our Vue.js web application development services are designed to deliver
                                        scalable, consumer-focused, and fully customized solutions tailored to your
                                        unique business requirements. Backed by extensive experience, we ensure each
                                        application aligns with your strategic objectives, meets deadlines, and delivers
                                        exceptional user experiences that drive engagement and value.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'SPAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Single-page Application Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Seamless Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Responsive Application</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>User Satisfaction</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Vue.js is an ideal framework for building high-performing single-page
                                        applications (SPAs) that demand speed, responsiveness, and smooth user
                                        interactions. Its lightweight architecture supports seamless API integration,
                                        dynamic UI animations, and consistent cross-platform performance—making it
                                        well-suited for modern, user-centric web applications. SPAs developed with
                                        Vue.js deliver a fast, fluid experience that significantly enhances user
                                        satisfaction and engagement.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'CAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Custom App Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Competitive Advantage</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Scalable Apps</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Seamless Functionality</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Have a unique app idea? At Grey InfoTech, we specialize in delivering custom
                                        Vue.js solutions that align with your business objectives and technical
                                        requirements. Our team works closely with you to develop high-quality, scalable
                                        applications within defined timelines—ensuring smooth functionality, responsive
                                        user experiences, and long-term performance. From concept to deployment, we
                                        combine deep technical expertise with a strategic approach to bring your vision
                                        to life efficiently and effectively.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'RTA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Real-time Apps</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Interactive Apps</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>High Performance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Engaging</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Real-time applications are essential for delivering interactive, high-engagement
                                        user experiences across industries such as collaboration, messaging, live
                                        streaming, and social platforms. At Grey InfoTech, our Vue.js developers
                                        specialize in building responsive, performance-driven real-time apps that
                                        support seamless data updates, low-latency communication, and cross-platform
                                        functionality. By combining scalable architecture with robust front-end
                                        engineering, we create solutions that keep users connected, engaged, and
                                        satisfied—ensuring your platform performs reliably under real-world usage
                                        demands.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'MS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Migration Services</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Scalable Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Business Growth</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Seamless Migration</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Upgrade to Vue.js with Grey InfoTech’s expert migration services, designed to
                                        modernize and optimize your existing applications for enhanced performance,
                                        scalability, and maintainability. By leveraging Vue.js’s lightweight and
                                        flexible architecture, we enable your business to adapt swiftly to evolving
                                        market demands while reducing technical debt. Our comprehensive migration
                                        approach minimizes operational disruption and ensures seamless integration with
                                        your current systems, providing a robust, future-ready foundation that supports
                                        sustainable growth and long-term success.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'UICD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>UI Components Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>User Experience</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Interactive Experience</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Enhanced Usability</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Vue.js facilitates the efficient creation of reusable and customizable <Link
                                        href='/services/ui-ux-design'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>UI</Link>
                                        components, enabling faster development cycles and maintaining consistent design
                                        standards throughout your application. By leveraging this flexibility, we build
                                        intuitive interfaces—from interactive buttons to dynamic modals—that not only
                                        streamline user interactions but also elevate the overall user experience. Our
                                        approach ensures cohesive, responsive designs that improve usability, reduce
                                        maintenance efforts, and contribute to delivering polished, high-quality digital
                                        products aligned with your business objectives.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'VCS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Vue.js Consulting Services</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Guidance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Tailored Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Business Goals</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Facing complex technical challenges in your Vue.js projects? Our specialized
                                        consulting services offer deep expertise and strategic guidance to help you
                                        harness the full capabilities of Vue.js, optimizing performance, scalability,
                                        and maintainability. We work closely with your team to diagnose issues, design
                                        tailored solutions, and implement best practices that align with your business
                                        objectives. By providing actionable insights and hands-on support, we empower
                                        your organization to overcome obstacles, accelerate development cycles, and
                                        unlock new opportunities for growth and innovation.
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
                    src={'/assets/vue/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Benefits of using Vue.js */}
            <div
                className={`lg:pt-[3em] md:pt-[2em] pt-[1em] lg:pb-[3em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div id={'benefit of using vue'}
                     className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Vue.js Benefit Header */}
                    <div
                        className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[3em] lg:mb-[5em] md:mb-[5em] sm:mb-[5em] mb-[5em]`}>
                        <div>
                            <h2 className='text-[1em] text-start sm:text-[1.5em] md:text-[2.5em] lg:text-[3.15em] font-[550] break-words whitespace-normal tracking-tight leading-[1.15] lg:pb-6'>
                                Benefits of Using Vue.js
                            </h2>
                        </div>
                        <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                            <p className={'text-justify text-[0.87em] font-[300]'}>
                                Vue.js provides a flexible, easy-to-learn framework with great documentation, efficient
                                rendering, and strong community support—making it ideal for building modern, responsive
                                applications. We love using it.
                            </p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div
                        className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]`}>
                        <div id={'performance'}>
                            <Image
                                src={isDayTime ? '/assets/vue/icon/risk1.svg' : '/assets/vue/icon/risk.svg'}
                                alt={'Performance'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Performance
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Vue.js is recognized for its exceptional performance, offering a lightweight yet
                                powerful framework that competes effectively with leading
                                technologies like <Link
                                href='/services/Reactjs-Development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>React </Link>
                                and <Link
                                href='/services/angular-development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>Angular</Link>.
                                Its modular architecture allows for fast, seamless integration with
                                existing <Link
                                href='/services/Javascript'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>JavaScript</Link> libraries
                                and tools, enabling enhanced speed, responsiveness, and development
                                efficiency. This makes Vue.js an ideal choice for building high-performing, scalable
                                applications that meet modern business demands.
                            </p>
                        </div>
                        <div id={'lightweight-frame'}>
                            <Image
                                src={isDayTime ? '/assets/vue/icon/sca1.svg' : '/assets/vue/icon/sca.svg'}
                                alt={'Lightweight Frames'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.1em] font-[500] mb-8'}>
                                Lightweight Frame
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Vue.js offers a lightweight, high-performance framework that reduces development effort
                                while accelerating delivery timelines. Its intuitive structure and simplicity make it
                                highly accessible to developers familiar with HTML and JavaScript, enabling faster
                                creation of tailored, scalable solutions. This efficiency not only streamlines the
                                development process but also supports long-term maintainability and flexibility across
                                projects.
                            </p>
                        </div>
                        <div id={'flexibility'}>
                            <Image
                                src={isDayTime ? '/assets/vue/icon/test1.svg' : '/assets/vue/icon/test.svg'}
                                alt={'flexibility'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Flexibility
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Vue.js offers exceptional flexibility, making it well-suited for a wide range of
                                application development needs—from startups and SMBs to global enterprises like IBM and
                                Behance. Its gentle learning curve enables rapid adoption across teams with varying
                                skill levels, supporting cost-effective, efficient development without compromising on
                                scalability or performance. This versatility makes Vue.js a strategic choice for
                                businesses seeking agility, speed, and long-term value.
                            </p>
                        </div>
                        <div id={'adaptable'}>
                            <Image
                                src={isDayTime ? '/assets/vue/icon/fast1.svg' : '/assets/vue/icon/fast.svg'}
                                alt={'Adaptable'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Adaptable
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Vue.js is highly adaptable, offering seamless integration with third-party libraries and
                                existing codebases—making it an ideal choice for projects of any size or complexity. Its
                                flexibility supports cost-effective, time-efficient development, allowing teams to
                                enhance functionality without rebuilding from scratch, ultimately accelerating delivery
                                and reducing overhead.
                            </p>
                        </div>
                        <div id={'scalable'}>
                            <Image
                                src={isDayTime ? '/assets/vue/icon/att1.svg' : '/assets/vue/icon/att.svg'}
                                alt={'Scalable'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Scalable
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Scalability in Vue.js development involves designing web applications that can
                                efficiently handle increased user demand and evolving business requirements. At Grey
                                InfoTech, our Vue.js experts specialize in building robust, scalable solutions that
                                support long-term growth, ensuring your application remains high-performing, adaptable,
                                and ready for future expansion.
                            </p>
                        </div>
                        <div id={'maintainable'}>
                            <Image
                                src={isDayTime ? '/assets/vue/icon/cust1.svg' : '/assets/vue/icon/cust.svg'}
                                alt={'Maintainable'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Maintainable
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Maintainability in Vue.js development is critical for ensuring long-term security,
                                stability, and performance. By following best practices such as modular code
                                architecture, clear documentation, and regular updates, applications remain easier to
                                manage, scale, and enhance—reducing technical debt and supporting efficient ongoing
                                development.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* What Grey InfoTech Does */}
            <div
                className={` lg:pt-[3em] md:pt-[3em] sm:pt-[2em] pt-[2em] lg:pb-[3em] md:pb-[3em] sm:pb-[2em] pb-[2em] h-auto border-b border-white max-w-full w-full mx-auto ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mx-auto mb-4'}>
                            <Image
                                src={'/assets/vue/grey.jpg'}
                                alt={'What Grey InfoTech Does'}
                                width={1000}
                                height={1300}
                                className={'mx-auto w-auto h-auto'}
                            />
                        </div>
                        <div
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mt-[2em] md:mt-[2em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <h2
                                className='text-[1.5em] sm:text-[2.2em] capitalize font-[500] tracking-tight leading-[1.1] mb-8 mr-[2em] md:text-[3.2em] lg:text-[3.2em] w-auto h-auto md:mr-[2.5em] lg:mr-[5em]'>
                                What Grey InfoTech Does
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify  leading-[1.5] lg:mr-[9em] md:mr-[9em]'>
                                In today’s fast-paced digital environment, Vue.js has established itself as a premier
                                JavaScript framework, prized for its simplicity, adaptability, and exceptional
                                performance. Its progressive architecture empowers businesses to develop interactive,
                                responsive web applications that not only fulfill but surpass the evolving expectations
                                of modern users. By leveraging Vue.js, organizations can accelerate development cycles
                                while maintaining flexibility and scalability essential for long-term success.<br/><br/>

                                At Grey InfoTech, we bring extensive expertise in Vue.js development, positioning us to
                                deliver customized, high-performance web solutions tailored to your unique business
                                needs. Our team expertly navigates the framework’s capabilities to build applications
                                that are robust, scalable, and aligned with your brand identity. Combining technical
                                precision with creative strategy, we focus on delivering seamless functionality
                                alongside engaging user experiences. This holistic approach ensures that your digital
                                platform not only performs optimally but also drives sustained business growth and
                                customer satisfaction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Work with Us */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] md:px-[4.6em] lg:pt-[6em]] md:pt-[6em] pt-[2emm] lg:pb-[6em]] md:pb-[6em] pb-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[6em] md:pb-[6em] pb-[3em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3.2em] md:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] md:pr-[1em] leading-[1.2]`}>
                            Why Work with Us?
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] md:-ml-[3em] tracking-noromal'>
                            At Grey InfoTech, we drive digital success. Partnering with our expert Vue.js developers
                            means getting a tailored, reliable, and scalable solution that supports your business
                            growth. Our portfolio speaks for itself.
                        </p>
                    </div>
                </div>

                {/* Experienced Team */}
                <div id={'experienced-team'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Experienced Team
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[16em] md:pl-[14em] lg:-mt-[2.5em] md:-mt-[2.5em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={'/assets/vue/exp.jpg'}
                                alt='Experienced Team'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            At Grey InfoTech, our skilled developers bring extensive expertise in Vue.js development,
                            enabling us to deliver robust, high-performing <Link
                            href='/services/Mobile-Application-Development'
                            className={`border-b-[1px]  ${isDayTime ? 'border-gray-800 hover:border-white' : 'border-gray-300 hover:border-black'}`}>mobile
                            applications</Link> tailored to your business
                            goals. We specialize in solving complex technical challenges, building scalable solutions,
                            and seamlessly integrating third-party services to enhance functionality and user
                            experience. Our commitment to quality and innovation ensures that every application we
                            develop supports long-term success and aligns with your strategic vision.
                        </p>
                    </div>
                </div>

                {/* Customer Service */}
                <div id={'customer-service'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Customer Service
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[16em] md:pl-[14em] lg:-mt-[3em] md:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={'/assets/vue/customer.jpg'}
                                alt='Customer Service'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            At Grey InfoTech, we take pride in delivering outstanding customer service backed by proven
                            client satisfaction. Our team is highly professional and equipped to meet advanced technical
                            requirements with precision and efficiency. We are committed to being a reliable,
                            transparent partner—focused on building long-term relationships through consistent
                            communication, accountability, and exceptional delivery.
                        </p>
                    </div>
                </div>

                {/* Proactive, client facing */}
                <div id={'proactive-client-facing'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Proactive, <br className={'lg:block md:block hidden'}/>Client Facing
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[10em] md:pl-[8em] lg:-mt-[3em] md:-mt-[2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <Image
                                src={'/assets/vue/pro.jpg'}
                                alt='Proactive Client Facing'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            At Grey InfoTech, our Vue.js development services are driven by a proactive, client-centric
                            approach that prioritizes transparency and collaboration. We maintain clear, consistent
                            communication, provide regular project updates, and remain flexible in adapting to evolving
                            client needs. Our commitment to responsiveness and partnership ensures a smooth development
                            process and results that align precisely with your business objectives.
                        </p>
                    </div>
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
        </div>
    );
};

export default VuejsDevelopment;