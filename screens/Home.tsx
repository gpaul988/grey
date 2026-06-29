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
import {FxBackground, FxChip, FxCard, FxButton, FxReveal} from '@/components/futuristic/fx';

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
                <FxBackground day={isDayTime} />
                <div
                    className='relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>YOUR DIGITAL PARTNER</FxChip>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <FxReveal>
                            <h3 className='lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] lg:mt-[0.01em] rounded-none lg:tracking-normal tracking-tight leading-[1.3] lg:pb-10 pb-6'>
                                {'We Develop Digital'} <br/><span className='gx-gradient-text'>{'Products Powered by Strategy & Data'}</span></h3>
                        </FxReveal>
                        <FxReveal delay={0.1}>
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
                        </FxReveal>
                    </div>
                </div>
            </section>


            {/* Our Services - Futuristic */}
            <ServicesSection isDayTime={isDayTime} />

                        {/* ── Digital Adventure — Futuristic Overhaul ── */}
            <section
                id="Adventure-section"
                className={`relative overflow-hidden ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
                {/* Animated grid bg */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px),
                                          linear-gradient(90deg, ${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px)`,
                        backgroundSize: '44px 44px',
                    }}
                />
                {/* Aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)' }} />
                    <div className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full opacity-10"
                        style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} />
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em] py-28 lg:py-36">

                    {/* Top row: eyebrow label + horizontal rule */}
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>YOUR DIGITAL ADVENTURE</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-black/10'}`} />
                            <span className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-white/30' : 'text-black/30'}`}>8+ YRS</span>
                        </div>
                    </FxReveal>

                    {/* Main grid */}
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* LEFT — image with futuristic frame */}
                        <FxReveal>
                            <div className="relative">
                                {/* Corner brackets */}
                                <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-teal-400 rounded-tl-sm z-10" />
                                <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-teal-400 rounded-tr-sm z-10" />
                                <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-teal-400 rounded-bl-sm z-10" />
                                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-teal-400 rounded-br-sm z-10" />

                                {/* Glow border */}
                                <div className="absolute inset-0 rounded-2xl opacity-40"
                                    style={{ boxShadow: '0 0 60px -10px rgba(45,212,191,0.5)' }} />

                                <div className="relative overflow-hidden rounded-2xl">
                                    <Image
                                        src="/assets/startup/startup.jpg"
                                        alt="startup development services"
                                        width={600}
                                        height={440}
                                        className="w-full object-cover"
                                        style={{ height: 'auto' }}
                                    />
                                    {/* Scan line overlay */}
                                    <div className="absolute inset-0 pointer-events-none"
                                        style={{ background: 'linear-gradient(135deg, rgba(45,212,191,0.12) 0%, transparent 60%)' }} />
                                    <div className="absolute inset-0 pointer-events-none"
                                        style={{
                                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.03) 3px, rgba(45,212,191,0.03) 4px)',
                                        }} />

                                    {/* Badge overlay */}
                                    <div className="absolute bottom-5 left-5">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 }}
                                            className="px-4 py-2 rounded-full backdrop-blur-md text-[0.72em] font-semibold tracking-wider text-teal-300"
                                            style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(45,212,191,0.35)' }}
                                        >
                                            ◈ MVPs · Platforms · Scale
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Floating stat card */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
                                    className="absolute -right-6 top-10 hidden lg:block"
                                >
                                    <div className="rounded-2xl px-5 py-4 backdrop-blur-xl text-center min-w-[110px]"
                                        style={{ background: isDayTime ? 'rgba(15,15,15,0.85)' : 'rgba(255,255,255,0.85)', border: '1px solid rgba(45,212,191,0.35)' }}>
                                        <div className="text-[2em] font-[900] text-teal-400 leading-none">50+</div>
                                        <div className={`text-[0.65em] font-[600] tracking-widest mt-1 uppercase ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>Projects</div>
                                    </div>
                                </motion.div>
                            </div>
                        </FxReveal>

                        {/* RIGHT — copy */}
                        <div>
                            <FxReveal delay={0.1}>
                                <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8">
                                    {'Your digital'} <span className="gx-gradient-text">{'adventure'}</span><br/>
                                    <span className={`text-[0.65em] font-[300] ${isDayTime ? 'text-white/50' : 'text-black/50'}`}>
                                        {'starts here.'}
                                    </span>
                                </h2>
                            </FxReveal>

                            <FxReveal delay={0.18}>
                                <p className={`text-[0.9em] leading-[1.8] mb-6 ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                                    {'Our specialty in the fast-paced IT industry is assisting business owners and entrepreneurs in realizing their product concepts. And we\'ve learned a few things from our over 8 years of expertise.'}
                                </p>
                            </FxReveal>

                            <FxReveal delay={0.24}>
                                <p className={`text-[0.9em] leading-[1.8] mb-10 pb-10 border-b ${isDayTime ? 'text-white/75 border-white/10' : 'text-black/70 border-black/10'}`}>
                                    {'In addition to collaborating with well-established companies, we have developed MVPs, built digital products, scaled tech and infrastructure, and ultimately sold a number of financed startups. We can provide you with that experience.'}
                                </p>
                            </FxReveal>

                            {/* Feature pills */}
                            <FxReveal delay={0.3}>
                                <div className="flex flex-wrap gap-3 mb-10">
                                    {['MVP Development', 'SaaS Platforms', 'Enterprise Scale', 'Startup-to-Exit'].map((item) => (
                                        <span key={item}
                                            className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border
                                                ${isDayTime
                                                    ? 'border-teal-400/30 text-teal-300 bg-teal-400/08'
                                                    : 'border-teal-700/30 text-teal-700 bg-teal-700/06'}`}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </FxReveal>

                            <FxReveal delay={0.36}>
                                <p className={`text-[0.88em] font-[400] mb-6 ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>
                                    {'Let\'s discuss your plans and figure out how we can support you.'}
                                </p>
                                <FxButton day={!isDayTime} href='/contact' variant='solid'>
                                    Get in touch <span className="text-[1.2em] leading-none ml-1">→</span>
                                </FxButton>
                            </FxReveal>
                        </div>
                    </div>

                    {/* Bottom stat bar */}
                    <FxReveal delay={0.1} y={16}>
                        <div className={`mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t ${isDayTime ? 'border-white/10' : 'border-black/10'}`}>
                            {[
                                { val: '50+', label: 'Projects Delivered' },
                                { val: '8+',  label: 'Years of Expertise' },
                                { val: '15+', label: 'Industries Served' },
                                { val: '∞',   label: 'Ambition Supported' },
                            ].map((s) => (
                                <div key={s.label} className="text-center lg:text-left">
                                    <div className="text-[2.2em] font-[900] gx-gradient-text leading-none mb-1">{s.val}</div>
                                    <div className={`text-[0.75em] font-[500] tracking-wide uppercase ${isDayTime ? 'text-white/45' : 'text-black/45'}`}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </FxReveal>

                </div>
            </section>

            {/* ── Trust Signals — Futuristic Overhaul ── */}
            <section className={`relative overflow-hidden ${isDayTime ? 'bg-[#020f0d] text-white' : 'bg-teal-50 text-teal-900'}`}>
                {/* Scan-line texture */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #2dd4bf 2px, #2dd4bf 3px)', backgroundSize: '100% 3px' }} />
                {/* Glow blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full opacity-20 blur-3xl"
                        style={{ background: 'radial-gradient(ellipse, #14b8a6 0%, transparent 70%)' }} />
                </div>

                <div className="relative z-10 mx-auto px-6 sm:px-8 lg:px-[4.6em] lg:max-w-[90em] py-28 lg:py-36">

                    {/* Heading */}
                    <FxReveal>
                        <div className="flex items-center gap-4 mb-6">
                            <FxChip day={isDayTime}>TRUST SIGNALS</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-teal-900/15'}`} />
                        </div>
                        <h3 className="text-[2.4em] lg:text-[3.5em] font-[700] leading-[1.1] tracking-tight mb-5">
                            Trusted by <span className="gx-gradient-text">Forward-Thinking</span><br/>
                            <span className={isDayTime ? 'text-white/40' : 'text-teal-900/40'}>Brands Worldwide.</span>
                        </h3>
                        <p className={`text-[0.95em] max-w-2xl font-[300] leading-[1.7] mb-16 ${isDayTime ? 'text-white/55' : 'text-teal-900/60'}`}>
                            Our proven track record speaks volumes. See why companies across industries choose Grey InfoTech for digital excellence.
                        </p>
                    </FxReveal>

                    {/* Metrics — holographic counter cards */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
                    >
                        {[
                            { value: 50,   label: 'Projects Delivered', suffix: '+', icon: '◈' },
                            { value: 15,   label: 'Industries Served',   suffix: '+', icon: '◉' },
                            { value: 99.9, label: 'Uptime SLA',          suffix: '%', icon: '◎' },
                            { value: 8,    label: 'Years Experience',    suffix: '+', icon: '◇' },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.label}
                                className="gx-card group relative cursor-default"
                                data-day={isDayTime ? 'false' : 'true'}
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                transition={{ type: 'spring', stiffness: 130, damping: 22 }}
                                whileHover={{ y: -6 }}
                            >
                                <div className={`text-[1.8em] mb-3 ${isDayTime ? 'text-teal-400/60' : 'text-teal-600/60'}`}>{item.icon}</div>
                                <div className="text-[2.8em] lg:text-[3.6em] font-[900] leading-none tracking-tight gx-gradient-text">
                                    <CountUp start={0} end={item.value} duration={2.5} decimals={Number.isInteger(item.value) ? 0 : 1} suffix={item.suffix ?? ''} />
                                </div>
                                <div className={`text-[0.78em] font-[600] tracking-wider uppercase mt-2 ${isDayTime ? 'text-white/50' : 'text-teal-800/60'}`}>{item.label}</div>
                                {/* Animated shimmer border flash on enter */}
                                <motion.div
                                    className="absolute inset-0 rounded-[1.1rem] border border-teal-400/0"
                                    initial={{ borderColor: 'rgba(45,212,191,0)' }}
                                    whileInView={{ borderColor: ['rgba(45,212,191,0.6)', 'rgba(45,212,191,0)'] }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 + 0.3, duration: 1.4 }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Proof cards — glow-bordered grid */}
                    <FxReveal delay={0.2}>
                        <div className={`rounded-3xl border p-8 lg:p-12 ${isDayTime ? 'border-white/10 bg-white/[0.03]' : 'border-teal-900/15 bg-teal-900/[0.03]'}`}>
                            <div className="flex items-center gap-3 mb-8">
                                <span className={`text-[0.72em] font-[700] uppercase tracking-[0.25em] ${isDayTime ? 'text-teal-400' : 'text-teal-700'}`}>VERIFIED ACROSS PLATFORMS</span>
                                <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-teal-900/15'}`} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { href: 'https://clutch.co', icon: <FaStar/>, label: 'Clutch', sub: 'Top-rated Agency', color: '#f97316' },
                                    { href: 'https://google.com', icon: <FaGoogle/>, label: 'Google Reviews', sub: '4.9★ Rating', color: '#2dd4bf' },
                                    { href: 'https://linkedin.com', icon: <FaLinkedin/>, label: 'LinkedIn', sub: 'Endorsed Leaders', color: '#0ea5e9' },
                                    { href: '/case-studies', icon: <FaFileAlt/>, label: 'Case Studies', sub: 'Real Outcomes', color: '#a855f7' },
                                ].map((badge, i) => (
                                    <motion.a
                                        key={badge.label}
                                        href={badge.href}
                                        target={badge.href.startsWith('http') ? '_blank' : undefined}
                                        rel={badge.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="gx-scan group relative overflow-hidden rounded-2xl p-6 border transition-all duration-300"
                                        style={{
                                            borderColor: badge.color + '28',
                                            background: badge.color + '08',
                                        }}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 + 0.3, duration: 0.5 }}
                                        whileHover={{ y: -5, borderColor: badge.color + '66', background: badge.color + '12' }}
                                    >
                                        <motion.div
                                            className="text-[2em] mb-4"
                                            style={{ color: badge.color }}
                                            animate={{ rotate: [0, 8, -8, 0] }}
                                            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                                        >
                                            {badge.icon}
                                        </motion.div>
                                        <div className={`font-[700] text-[0.95em] mb-1 ${isDayTime ? 'text-white' : 'text-teal-900'}`}>{badge.label}</div>
                                        <div className="text-[0.75em]" style={{ color: badge.color + 'cc' }}>{badge.sub}</div>
                                        {/* Corner accent */}
                                        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r rounded-tr-sm opacity-40" style={{ borderColor: badge.color }} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </FxReveal>
                </div>
            </section>

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