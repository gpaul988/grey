'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import {LiaLongArrowAltDownSolid} from "react-icons/lia";
import FloatingButton from "@/components/FloatingButton";
import SocialProof from "@/components/SocialProof";
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import CountUp from "react-countup";
import {FaStar, FaGoogle, FaLinkedin} from "react-icons/fa6";
import {FaFileAlt} from "react-icons/fa";
import AIProjectEstimator from '@/components/AIProjectEstimator';
import AdBanner from '@/components/futuristic/AdBanner';
import WebGLHero from '@/components/futuristic/WebGLHero';
import {usePersonalization} from '@/components/futuristic/PersonalizationProvider';
import {getAutoUserName} from '@/lib/get-user-name';
import {useIsDayTime} from '../components/useIsDayTime';
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServicesSection from '@/components/futuristic/ServicesSection';

const Home = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    // Privacy-safe personalization (daypart greeting + returning-visitor tone)
    const {greeting, returning, ready: personalReady} = usePersonalization();

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

    // isVisible — handled inside ServicesSection component

    // isDaytime react hook
    const isDayTime = useIsDayTime();

    // Hydration guard
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        setIsHydrated(true);
    }, []);


    // Scroll to content function
    const scrollToContent = () => {
        const contentSection = document.getElementById('services-section');
        if (contentSection) {
            contentSection.scrollIntoView({behavior: 'smooth'});
        }
    };

    // Get i18n
    const [userName, setUserName] = useState<string>('');
    const [isMounted, setIsMounted] = useState(false);

    // Auto-detect user name on mount
    useEffect(() => {
        setUserName(getAutoUserName());
        setIsMounted(true);
    }, []);

    // Get greeting message based on time of day
    const getGreetingMessage = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning, working early';
        if (hour < 18) return 'Good afternoon, crushing it';
        return 'Good evening, working late';
    };

    return (
        <div className={`${isHydrated ? (isDayTime ? 'bg-white' : 'bg-black') : 'bg-white'} min-h-screen`}>
            <FloatingButton
                className={`fixed bottom-6 right-6 z-9999 transition-all duration-300 mb-0`}
            />

            {/* Hero Section - Responsive Video */}
            <div id="hero" className="relative">
                <ResponsiveVideoHero
                    videoDesktop="/assets/hero/hero.mp4"
                    videoMobile="/assets/hero/hero.mp4"
                    posterImage="/assets/hero/hero.mp4"
                    overlayOpacity={0.3}
                    heights={{
                        mobile: 'h-[600px] sm:h-[650px]',
                        tablet: 'md:h-[720px]',
                        desktop: 'lg:h-[850px] xl:h-[850px]',
                    }}
                    className="pb-6 rounded-none"
                >
                    {/* WebGL Hero Overlay - on top of video */}
                    <WebGLHero className="absolute inset-0 z-[5] opacity-60 pointer-events-none mix-blend-screen"/>

                    {/* Text content */}
                    <div
                        className={`relative z-10 mt-24 flex flex-col justify-center items-start text-start lg:max-w-[90em] text-white`}
                    >
                        <br/><br/>
                        {isMounted && (
                            <span
                                className={`grey-parallax-soft inline-flex items-center gap-2 rounded-full px-3 py-1 mb-2 text-xs font-medium backdrop-blur-sm border ${isHydrated && isDayTime ? 'bg-white/40 border-teal-700/30 text-teal-900' : 'bg-white/10 border-white/20 text-teal-100'}`}>
                                <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse"/>
                                {userName ? `${getGreetingMessage()}, ${userName}!` : getGreetingMessage()}
                            </span>
                        )}
                        <h1 className={`grey-parallax-mid ${isHydrated && isDayTime ? 'text-black' : 'text-white'} lg:text-[87px] text-[45px] lg:leading-[1.1] md:leading-[1.1] leading-[1.2] font-[600] lg:mb-6`}>
                            <br/>
                            <span
                                className={`${isHydrated && isDayTime ? 'text-teal-800' : 'text-teal-200'}`}>{'Engineering'}</span><br/>{'Scalable'}
                            {'Digital'}<br/> <span
                            className={`${isHydrated && isDayTime ? 'text-teal-800' : 'text-teal-200'}`}>{'Platforms for'}<br/>{'Modern Businesses'}</span>
                        </h1><br/><br/>
                        <h3 className={`grey-parallax-soft ${isHydrated && isDayTime ? 'text-teal-500' : 'text-white'} contents lg:text-[17.4px] leading-[1.18] font-[400]`}>
                            {'Grey InfoTech Limited builds secure, scalable web applications, SaaS platforms, and enterprise software solutions for startups and growing businesses across Africa and globally.'}
                        </h3>
                    </div>

                    {/* Scroll indicator */}
                    <div
                        className='absolute bottom-6 left-5/6 transform -translate-x-1/2 flex flex-col items-center z-10'>
                        <LiaLongArrowAltDownSolid
                            className={`${isHydrated && isDayTime ? 'text-black' : 'text-white'} text-5xl text-center transition-transform duration-500 ease-in-out hover:scale-125 cursor-pointer`}
                            onClick={scrollToContent}
                        />
                    </div>
                </ResponsiveVideoHero>
            </div>

            {/* Introductory section */}
            <section
                ref={sectionRef}
                data-bg={
                    isBackgroundActive
                        ? (isDayTime ? "Dark" : "Light")
                        : (isDayTime ? "Light" : "Dark")
                }
                className={`pt-16 transition-colors duration-500 ${
                    isBackgroundActive
                        ? isDayTime
                            ? "bg-black text-white"
                            : "bg-white text-black"
                        : isDayTime
                            ? "bg-white text-black"
                            : "bg-black text-white"
                }`}
            >
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text lg:text-[0.8em] text-[0.7em] font-[400] lg:tracking-wider tracking-tight'>
                            {'YOUR DIGITAL PARTNER'}
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] lg:mt-[0.01em] rounded-none lg:tracking-normal tracking-tight leading-[1.3] lg:pb-10 pb-6'>
                            {'We Develop Digital'} <br/>{'Products Powered by Strategy & Data'}</h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p> {'We create and build web apps, digital platforms, and websites that help businesses flourish. We provide unique, scalable solutions that are suited to your specific needs, with an emphasis on creativity, data-driven decision-making, and demonstrable outcomes.'}</p>
                            </div>
                            <div>
                                <p> {'Our team makes sure your technology works as hard as you do, whether you\'re optimizing your infrastructure, launching an'}
                                    <Link href='/services/MVP'
                                          className={`border-b-[0.1em] ${isDayTime ? 'border-gray-800' : 'border-gray-300'}`}> MVP</Link>, {'or growing your online presence.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Our Services - Futuristic */}
            <ServicesSection isDayTime={isDayTime} />

                        {/* Digital Adventure Section */}
            <div
                className={`lg:pt-[8em] md:pt-[4em] pt-[3em] lg:pb-[2em] lg:-mt-[9em] md:-mt-[8em] -mt-[2em] mb-[1em] pb-[1em] ${isDayTime ? 'bg-black' : 'bg-white'}`}
                data-bg={isDayTime ? 'light' : 'dark'}>
                <div
                    id={'Adventure-section'}
                    className={`max-w-[90em] mx-auto px-4 sm:px-6 lg:px-[4.6em]`}>
                    <div
                        className='relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-32 mb-16'>
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
                            <h2 className='lg:text-[3em] text-[1.5em] font-[700] capitalize tracking-tight pb-6 rounded-none lg:pr-[2.2em] lg:mt-7'>Your
                                digital adventure</h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.2em] border-b rounded-none pb-9 leading-[1.5] lg:pr-[3em]'>
                                Our specialty in the fast-paced IT industry is assisting business owners and
                                entrepreneurs
                                in
                                realizing their product concepts. And we&#39;ve learned a few things from our over 8
                                years of
                                expertise.<br/><br/>
                                In addition to collaborating with well-established companies, we have developed MVPs,
                                built
                                digital products, scaled tech and infrastructure, and ultimately sold a number of
                                financed
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
                                        className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-white group-hover:text-gray-800' : 'text-black group-hover:text-gray-200'}`}>Get
                                in touch <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                    <span
                                        className={`absolute inset-0 border-[1px] ${isDayTime ? 'border-white' : 'border-black'} rounded-full`}></span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Signals Section - Animated */}
            <div
                className={`py-24 -mt-4 ${isDayTime ? 'bg-teal-800 text-white' : 'bg-teal-50 text-teal-800'}`}
            >
                <div className="mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] lg:max-w-[90em]">

                    {/* Intro */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.3}}
                        transition={{duration: 0.6}}
                        className="mb-16"
                    >
                        <h3 className="lg:text-[3.5em] md:text-[2.5em] text-[2em] font-[700] leading-[1.2] mb-4">
                            Trusted by Forward-Thinking Brands
                        </h3>
                        <p className={`lg:text-[1.1em] text-[0.95em] max-w-3xl font-[300] ${isDayTime ? 'text-white/90' : 'text-teal-800/90'}`}>
                            Our proven track record speaks volumes. See why companies across industries choose Grey
                            InfoTech for digital excellence.
                        </p>
                    </motion.div>

                    {/* Metrics Grid - Fancy animated counters */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount: 0.2}}
                        variants={{
                            hidden: {opacity: 0},
                            visible: {
                                opacity: 1,
                                transition: {staggerChildren: 0.12, delayChildren: 0.1}
                            }
                        }}
                    >
                        {[
                            {value: 50, label: "Projects Delivered", suffix: "+"},
                            {value: 15, label: "Industries Served", suffix: "+"},
                            {value: 99.9, label: "Uptime", suffix: "%"},
                            {value: 8, label: "Years Experience", suffix: "+"}
                        ].map((item, idx) => (
                            <motion.div
                                key={item.label}
                                className={`relative group rounded-3xl p-8 border-2 overflow-hidden transition-all duration-300 ${
                                    isDayTime
                                        ? 'border-white/20 bg-white/10 hover:bg-white/20'
                                        : 'border-teal-800/20 bg-teal-50 hover:bg-teal-100'
                                }`}
                                initial={{opacity: 0, scale: 0.8, y: 20}}
                                whileInView={{opacity: 1, scale: 1, y: 0}}
                                viewport={{once: true, amount: 0.5}}
                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 20,
                                    delay: idx * 0.12
                                }}
                                whileHover={{scale: 1.08, y: -8}}
                            >
                                {/* Animated glow background */}
                                <motion.div
                                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl ${
                                        isDayTime ? 'bg-white' : 'bg-teal-800'
                                    }`}
                                    animate={{
                                        opacity: [0.1, 0.25, 0.1]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                {/* Content */}
                                <div className="relative z-10">
                                    <motion.div
                                        className={`text-5xl lg:text-6xl font-[900] mb-2 tracking-tight ${
                                            isDayTime ? 'text-white' : 'text-teal-800'
                                        }`}
                                        initial={{opacity: 0, scale: 0.5}}
                                        whileInView={{opacity: 1, scale: 1}}
                                        viewport={{once: true}}
                                        transition={{
                                            delay: idx * 0.12 + 0.3,
                                            duration: 0.6,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                    >
                                        <CountUp
                                            start={0}
                                            end={item.value}
                                            duration={2.5}
                                            separator=","
                                            decimals={Number.isInteger(item.value) ? 0 : 1}
                                            suffix={item.suffix ?? ""}
                                        />
                                    </motion.div>
                                    <motion.div
                                        className={`text-sm lg:text-base font-[600] tracking-wide ${
                                            isDayTime ? 'text-white/80' : 'text-teal-800/80'
                                        }`}
                                        initial={{opacity: 0}}
                                        whileInView={{opacity: 1}}
                                        viewport={{once: true}}
                                        transition={{delay: idx * 0.12 + 0.4, duration: 0.5}}
                                    >
                                        {item.label}
                                    </motion.div>
                                </div>

                                {/* Animated border shimmer */}
                                <motion.div
                                    className={`absolute inset-0 rounded-3xl border-2 opacity-0 ${
                                        isDayTime ? 'border-white' : 'border-teal-800'
                                    }`}
                                    initial={{opacity: 0}}
                                    whileInView={{opacity: [0, 0.6, 0]}}
                                    viewport={{once: true}}
                                    transition={{delay: idx * 0.12 + 0.15, duration: 1.8}}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Proof & Testimonials Section */}
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.3}}
                        transition={{duration: 0.7, delay: 0.3}}
                        className={`rounded-3xl border-2 p-10 lg:p-12 ${
                            isDayTime
                                ? 'border-white/30 bg-white/5'
                                : 'border-teal-800/20 bg-teal-50'
                        }`}
                    >
                        <h4 className={`text-xl lg:text-2xl font-[700] mb-6 ${
                            isDayTime ? 'text-white' : 'text-teal-800'
                        }`}>
                            See what clients are saying
                        </h4>

                        {/* Proof badges grid with real icons */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                            variants={{
                                hidden: {opacity: 0},
                                visible: {
                                    opacity: 1,
                                    transition: {staggerChildren: 0.1, delayChildren: 0.5}
                                }
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: true, amount: 0.5}}
                        >
                            {/* Clutch */}
                            <motion.a
                                href="https://clutch.co"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                                    isDayTime
                                        ? 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
                                        : 'border-teal-800/15 bg-white hover:bg-teal-50 text-teal-800'
                                }`}
                                initial={{opacity: 0, x: -15}}
                                whileInView={{opacity: 1, x: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.5}}
                                whileHover={{y: -6}}
                            >
                                <motion.div
                                    className="text-3xl mb-3"
                                    animate={{rotate: [0, 5, -5, 0]}}
                                    transition={{duration: 2, repeat: Infinity}}
                                >
                                    <FaStar/>
                                </motion.div>
                                <div className="font-semibold text-sm lg:text-base">Clutch</div>
                                <div className={`text-xs lg:text-sm mt-1 ${
                                    isDayTime ? 'text-white/70' : 'text-teal-800/60'
                                }`}>
                                    Top-rated reviews
                                </div>
                            </motion.a>

                            {/* Google Reviews */}
                            <motion.a
                                href="https://google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                                    isDayTime
                                        ? 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
                                        : 'border-teal-800/15 bg-white hover:bg-teal-50 text-teal-800'
                                }`}
                                initial={{opacity: 0, x: -15}}
                                whileInView={{opacity: 1, x: 0}}
                                viewport={{once: true}}
                                transition={{delay: 0.1, duration: 0.5}}
                                whileHover={{y: -6}}
                            >
                                <motion.div
                                    className="text-3xl mb-3"
                                    animate={{rotate: [0, -5, 5, 0]}}
                                    transition={{duration: 2.2, repeat: Infinity}}
                                >
                                    <FaGoogle/>
                                </motion.div>
                                <div className="font-semibold text-sm lg:text-base">Google Reviews</div>
                                <div className={`text-xs lg:text-sm mt-1 ${
                                    isDayTime ? 'text-white/70' : 'text-teal-800/60'
                                }`}>
                                    4.9★ Rating
                                </div>
                            </motion.a>

                            {/* LinkedIn */}
                            <motion.a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                                    isDayTime
                                        ? 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
                                        : 'border-teal-800/15 bg-white hover:bg-teal-50 text-teal-800'
                                }`}
                                initial={{opacity: 0, x: -15}}
                                whileInView={{opacity: 1, x: 0}}
                                viewport={{once: true}}
                                transition={{delay: 0.2, duration: 0.5}}
                                whileHover={{y: -6}}
                            >
                                <motion.div
                                    className="text-3xl mb-3"
                                    animate={{rotate: [0, 5, -5, 0]}}
                                    transition={{duration: 2.4, repeat: Infinity}}
                                >
                                    <FaLinkedin/>
                                </motion.div>
                                <div className="font-semibold text-sm lg:text-base">LinkedIn</div>
                                <div className={`text-xs lg:text-sm mt-1 ${
                                    isDayTime ? 'text-white/70' : 'text-teal-800/60'
                                }`}>
                                    Endorsed leaders
                                </div>
                            </motion.a>

                            {/* Case Studies */}
                            <motion.a
                                href="/case-studies"
                                className={`group relative rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                                    isDayTime
                                        ? 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
                                        : 'border-teal-800/15 bg-white hover:bg-teal-50 text-teal-800'
                                }`}
                                initial={{opacity: 0, x: -15}}
                                whileInView={{opacity: 1, x: 0}}
                                viewport={{once: true}}
                                transition={{delay: 0.3, duration: 0.5}}
                                whileHover={{y: -6}}
                            >
                                <motion.div
                                    className="text-3xl mb-3"
                                    animate={{rotate: [0, -5, 5, 0]}}
                                    transition={{duration: 2.6, repeat: Infinity}}
                                >
                                    <FaFileAlt/>
                                </motion.div>
                                <div className="font-semibold text-sm lg:text-base">Case Studies</div>
                                <div className={`text-xs lg:text-sm mt-1 ${
                                    isDayTime ? 'text-white/70' : 'text-teal-800/60'
                                }`}>
                                    Real outcomes
                                </div>
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <div
                className={`relative -mt-18 py-16 mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] mb-8 max-w-full w-full h-auto ${
                    isDayTime ? 'bg-teal-100 text-teal-900' : 'bg-teal-950 text-white'
                }`}
            >
                <AIProjectEstimator/>
            </div>


            {/* Featured promo banner (managed via admin /admin/ads) */}
            <AdBanner placement="home_banner"/>
            <SocialProof page="home"/>
        </div>
    );
};

export default Home;