'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css';
import {LiaLongArrowAltDownSolid} from 'react-icons/lia';
import SocialProof from '@/components/SocialProof';
import Link from 'next/link';
import Image from 'next/image';
import {motion, useScroll, useTransform, useMotionValue} from 'framer-motion';
import CountUp from 'react-countup';
import {FaStar, FaGoogle, FaLinkedin} from 'react-icons/fa6';
import {FaFileAlt} from 'react-icons/fa';
import AIProjectEstimator from '@/components/AIProjectEstimator';
import {usePersonalization} from '@/components/futuristic/PersonalizationProvider';
import {getAutoUserName} from '@/lib/get-user-name';
import {useIsDayTime} from '../components/useIsDayTime';
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServicesSection from '@/components/futuristic/ServicesSection';
import {FxBackground, FxChip, FxCard, FxButton, FxReveal} from '@/components/futuristic/fx';
import AdBanner from '@/components/futuristic/AdBanner';

const WHY_US = [
    {
        num: '01',
        title: 'Battle-Tested Expertise',
        body: 'Over 8 years shipping real products  - MVPs, SaaS platforms, enterprise systems  - across 15+ industries. We\'ve solved the hard problems so you don\'t have to.',
        icon: ' - ',
        color: '#2b98a3',
    },
    {
        num: '02',
        title: 'Strategy-First Engineering',
        body: 'We combine business strategy with deep technical craft. Every line of code is deliberate, every architecture decision is aligned with your growth roadmap.',
        icon: ' - ',
        color: '#1d6f77',
    },
    {
        num: '03',
        title: 'Radical Transparency',
        body: 'No black boxes. You see the roadmap, the progress, the blockers  - in real time. We hold ourselves accountable to outcomes, not just deliverables.',
        icon: ' - ',
        color: '#5a9da3',
    },
    {
        num: '04',
        title: 'Built to Scale',
        body: 'Architecture designed for where your business is going, not just where it is today. Clean code, cloud-native infra, and performance at every layer.',
        icon: ' - ',
        color: '#123d42',
    },
    {
        num: '05',
        title: 'End-to-End Ownership',
        body: 'From discovery to deployment and beyond. We don\'t hand off and disappear  - we stay invested in your product\'s long-term success.',
        icon: '⬡',
        color: '#4aa7ae',
    },
    {
        num: '06',
        title: 'Africa-Grade Resilience',
        body: 'Built for real-world conditions: intermittent connectivity, diverse devices, payment systems. Software that works everywhere, for everyone.',
        icon: '⬢',
        color: '#6f8690',
    },
];

const Home = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const whyUsRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeWhyUs, setActiveWhyUs] = useState(0);
    const {greeting, returning, ready: personalReady} = usePersonalization();

    const isDayTime = useIsDayTime();
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const fallbackWhy = useMotionValue(0);
    // Always call the hook at the same position (inside try-catch for safety)
    try {
        var {scrollYProgress: scrollYProgressValue} = useScroll({target: whyUsRef});
    } catch (e) {
        var scrollYProgressValue = fallbackWhy;
    }
    const scrollYProgress = isHydrated ? (scrollYProgressValue ?? fallbackWhy) : fallbackWhy;
    const whyX = useTransform(scrollYProgress, [0, 1], ['0%', '-62%']);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const {top, bottom} = sectionRef.current.getBoundingClientRect();
                const wh = window.innerHeight;
                setIsBackgroundActive(top < wh * -0.1 || bottom < wh * -0.1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToContent = () => {
        const el = document.getElementById('services-section');
        if (el) el.scrollIntoView({behavior: 'smooth'});
    };

    const [userName, setUserName] = useState('');
    const [greetingMessage, setGreetingMessage] = useState('Good morning, working early');
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setUserName(getAutoUserName());
        const h = new Date().getHours();
        if (h < 12) setGreetingMessage('Good morning, working early');
        else if (h < 18) setGreetingMessage('Good afternoon, crushing it');
        else setGreetingMessage('Good evening, working late');
        setIsMounted(true);
    }, []);

    // Auto-cycle Why Us
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveWhyUs(prev => (prev + 1) % WHY_US.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`${isHydrated ? (isDayTime ? 'bg-white' : 'bg-black') : 'bg-white'} min-h-screen`}>

            {/*  -  -  Hero  -  -  */}
            <div id="hero" className="relative">
                <ResponsiveVideoHero
                    videoDesktop="/assets/hero/hero.mp4"
                    videoMobile="/assets/hero/hero.mp4"
                    posterImage="/assets/hero/hero.mp4"
                    overlayOpacity={0.15}
                    heights={{
                        mobile: 'h-[600px] sm:h-[650px]',
                        tablet: 'md:h-[720px]',
                        desktop: 'lg:h-[780px] xl:h-[820px]',
                    }}
                    className="pb-6 rounded-none"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.18),rgba(15,23,42,0.4))]" />
                    <div className="relative z-10 mt-24 flex flex-col justify-center items-start text-start lg:max-w-[90em] text-white">
                        <br/><br/>
                        {isMounted && (
                            <span className="premium-pill grey-parallax-soft mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-900 bg-white/70 border-white/40">
                                <span className="h-2 w-2 rounded-full bg-[#14b8a6] animate-pulse"/>
                                {userName ? `${greetingMessage}, ${userName}!` : greetingMessage}
                            </span>
                        )}
                        <h1 className="grey-parallax-mid text-white lg:text-[78px] text-[44px] lg:leading-[0.96] md:leading-[1] leading-[1.08] font-[700] tracking-[-0.06em] lg:mb-6">
                            <br/>
                            <span className="block text-white">Engineering</span>
                            <span className="block mt-2 text-[#dffaf5]">Scalable digital</span>
                            <span className="block mt-2 text-[#99f5e5]">
                                products for <br className="hidden lg:block"/>modern businesses
                            </span>
                        </h1>
                        <h3 className="grey-parallax-soft max-w-3xl text-white/85 lg:text-[17px] leading-[1.8] font-[400] mt-5">
                            Grey InfoTech designs and builds secure, scalable web applications, SaaS platforms,
                            and digital systems for businesses that want clarity, momentum, and measurable growth.
                        </h3>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#2dd4bf] px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_16px_36px_rgba(45,212,191,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(45,212,191,0.34)]">
                                Book a strategy call
                            </Link>
                            <Link href="/case-studies" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/45">
                                View case studies
                            </Link>
                        </div>
                    </div>
                    <div
                        className="absolute bottom-6 left-5/6 transform -translate-x-1/2 flex flex-col items-center z-10">
                        <LiaLongArrowAltDownSolid
                            className="text-white text-5xl text-center transition-transform duration-500 ease-in-out hover:scale-125 cursor-pointer"
                            onClick={scrollToContent}
                        />
                    </div>
                </ResponsiveVideoHero>
            </div>

            {/*  -  -  Intro  -  -  */}
            <section
                ref={sectionRef}
                data-bg="Light"
                className="pt-16 bg-[#f5fbfb] text-slate-900 transition-colors duration-500"
            >
                <FxBackground day={true}/>
                <div
                    className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-24 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>YOUR DIGITAL PARTNER</FxChip>
                    </div>
                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] lg:mt-[0.01em] rounded-none lg:tracking-normal tracking-tight leading-[1.3] lg:pb-10 pb-6">
                                We Develop Digital <br/><span className="gx-gradient-text">Products Powered by Strategy & Data</span>
                            </h3>
                        </FxReveal>
                        <FxReveal delay={0.1}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]">
                                <div>
                                    <p>We create and build web apps, digital platforms, and websites that help
                                        businesses flourish. We provide unique, scalable solutions suited to your
                                        specific needs, with an emphasis on creativity, data-driven decision-making, and
                                        demonstrable outcomes.</p>
                                </div>
                                <div>
                                    <p>Our team makes sure your technology works as hard as you do, whether you&apos;re
                                        optimizing your infrastructure, launching an
                                        <Link href="/services/MVP"
                                              className={`border-b-[0.1em] ${isDayTime ? 'border-gray-800' : 'border-gray-300'}`}> MVP</Link>,
                                        or growing your online presence.
                                    </p>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/*  -  -  Services  -  -  */}
            <ServicesSection isDayTime={isDayTime}/>

            {/*  -  -  Featured Ads Banner  -  -  */}
            <AdBanner placement="home_banner"/>

            {/*  -  -  WHY US  - Full Cinematic Redesign  -  -  */}
            <section className="relative overflow-hidden bg-[#f7fbfb] text-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.08),transparent_32%),linear-gradient(180deg,#f7fbfb,white)]" />

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em] py-28 lg:py-40">

                    {/* Header */}
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-6">
                            <FxChip day={true}>WHY CHOOSE US</FxChip>
                            <div className="flex-1 h-px bg-slate-200"/>
                            <span className="font-mono text-[0.68em] tracking-[0.2em] text-slate-400 uppercase">8+ yrs proven</span>
                        </div>
                        <h2 className="text-[2.6em] lg:text-[4em] font-[800] leading-[1.08] tracking-[-0.05em] mb-6 text-slate-900">
                            Not just a vendor.<br/>
                            <span className="text-[#0f766e]">Your competitive edge.</span>
                        </h2>
                        <p className="max-w-2xl text-[0.95em] leading-[1.8] mb-16 text-slate-600">
                            We&apos;ve built, scaled, and exited digital products across industries. Here&apos;s why
                            forward-thinking teams trust Grey InfoTech with their most critical builds.
                        </p>
                    </FxReveal>

                    {/* Why Us Grid  - interactive cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
                        {WHY_US.map((item, i) => (
                            <motion.div
                                key={item.num}
                                className="relative group cursor-pointer rounded-2xl p-7 border transition-all duration-500 overflow-hidden"
                                style={{
                                    background: activeWhyUs === i ? `${item.color}10` : 'rgba(255,255,255,0.02)',
                                    borderColor: activeWhyUs === i ? `${item.color}50` : 'rgba(255,255,255,0.07)',
                                }}
                                onClick={() => setActiveWhyUs(i)}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{delay: i * 0.08, duration: 0.6}}
                                whileHover={{y: -4}}
                            >
                                {/* Glow on active */}
                                {activeWhyUs === i && (
                                    <motion.div
                                        layoutId="why-glow"
                                        className="absolute inset-0 rounded-2xl"
                                        style={{boxShadow: `inset 0 0 0 1px ${item.color}25`}}
                                        transition={{type: 'spring', stiffness: 120, damping: 20}}
                                    />
                                )}
                                {/* Number + Icon */}
                                <div className="flex items-start justify-between mb-5">
                                    <span className="font-mono text-[0.65em] tracking-widest"
                                          style={{color: item.color + '99'}}>{item.num}</span>
                                    <motion.span
                                        className="text-[1.8em]"
                                        style={{color: item.color}}
                                        animate={{rotate: activeWhyUs === i ? [0, 15, -10, 0] : 0}}
                                        transition={{duration: 1.2, ease: 'easeInOut'}}
                                    >{item.icon}</motion.span>
                                </div>
                                <h3 className="text-[1.08em] font-[700] mb-3 tracking-tight text-slate-900">{item.title}</h3>
                                <p className="text-[0.83em] leading-[1.7] text-slate-600">{item.body}</p>
                                {/* Bottom accent line */}
                                <div
                                    className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-700 rounded-full"
                                    style={{background: `linear-gradient(90deg, ${item.color}80, transparent)`}}/>
                                {activeWhyUs === i && <div className="mt-0 h-[2px] w-full rounded-full"
                                                           style={{background: `linear-gradient(90deg, ${item.color}, transparent)`}}/>}
                            </motion.div>
                        ))}
                    </div>

                    {/* Horizontal scroll  - extended feature strip */}
                    <FxReveal>
                        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-8 lg:p-12 overflow-hidden shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
                            <div className="flex items-center gap-4 mb-10">
                                <span className="text-[0.7em] font-[700] uppercase tracking-[0.22em] text-[#0f766e]">What sets us apart</span>
                                <div className="flex-1 h-px bg-slate-200"/>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    {val: '50+', label: 'Products Delivered', sub: 'Live in production'},
                                    {val: '8+', label: 'Years Experience', sub: 'Since 2016'},
                                    {val: '15+', label: 'Industries', sub: 'Served globally'},
                                    {val: '99%', label: 'Client Retention', sub: 'They come back'},
                                ].map((s, i) => (
                                    <motion.div
                                        key={s.label}
                                        className="text-center lg:text-left"
                                        initial={{opacity: 0, y: 20}}
                                        whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: true}}
                                        transition={{delay: i * 0.1 + 0.2}}
                                    >
                                        <div className="text-[3em] font-[900] text-[#0f172a] leading-none mb-1">{s.val}</div>
                                        <div className="text-slate-700 text-[0.82em] font-[600] mb-0.5">{s.label}</div>
                                        <div className="text-slate-400 text-[0.68em] uppercase tracking-[0.15em]">{s.sub}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </FxReveal>

                    {/* CTA */}
                    <FxReveal delay={0.2}>
                        <div className="mt-16 flex flex-wrap gap-4 items-center">
                            <FxButton day={false} href="/company#development process" variant="solid">See Our
                                Approach</FxButton>
                            <FxButton day={false} href="/case-studies" variant="ghost">View Case Studies</FxButton>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/*  -  -  Digital Adventure  -  -  */}
            <section id="Adventure-section" className="relative overflow-hidden bg-[#f7fbfb] text-slate-900">
                <div className="pointer-events-none absolute inset-0 opacity-40" style={{
                    backgroundImage: 'linear-gradient(rgba(15,118,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,118,110,0.04) 1px, transparent 1px)',
                    backgroundSize: '42px 42px',
                }}/>
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, rgba(43,152,163,0.7) 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, rgba(18,61,66,0.8) 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em] py-28 lg:py-36">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>YOUR DIGITAL ADVENTURE</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-black/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-white/30' : 'text-black/30'}`}>8+ YRS</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <FxReveal>
                            <div className="relative">
                                <div
                                    className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#2b98a3] rounded-tl-sm z-10"/>
                                <div
                                    className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#2b98a3] rounded-tr-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#2b98a3] rounded-bl-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#2b98a3] rounded-br-sm z-10"/>
                                <div className="absolute inset-0 rounded-2xl opacity-40"
                                     style={{boxShadow: '0 0 60px -10px rgba(43,152,163,0.38)'}}/>
                                <div className="relative overflow-hidden rounded-2xl">
                                    <Image src="/assets/startup/startup.jpg" alt="startup development" width={600}
                                           height={440} className="w-full object-cover" style={{height: 'auto'}}/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{background: 'linear-gradient(135deg, rgba(43,152,163,0.11) 0%, transparent 60%)'}}/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(43,152,163,0.03) 3px, rgba(43,152,163,0.03) 4px)'}}/>
                                    <div className="absolute bottom-5 left-5">
                                        <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                                                    viewport={{once: true}} transition={{delay: 0.4}}
                                                    className="px-4 py-2 rounded-full backdrop-blur-md text-[0.72em] font-semibold tracking-wider text-[#dfeff0]"
                                                    style={{
                                                        background: 'rgba(18,61,66,0.7)',
                                                        border: '1px solid rgba(43,152,163,0.36)'
                                                    }}>
                                            - MVPs · Platforms · Scale
                                        </motion.div>
                                    </div>
                                </div>
                                <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}}
                                            viewport={{once: true}}
                                            transition={{delay: 0.5, type: 'spring', stiffness: 120}}
                                            className="absolute -right-6 top-10 hidden lg:block">
                                    <div className="rounded-2xl px-5 py-4 backdrop-blur-xl text-center min-w-[110px]"
                                         style={{
                                             background: isDayTime ? 'rgba(15,15,15,0.85)' : 'rgba(255,255,255,0.85)',
                                             border: '1px solid rgba(43,152,163,0.35)'
                                         }}>
                                        <div className="text-[2em] font-[900] text-[#2b98a3] leading-none">50+</div>
                                        <div
                                            className={`text-[0.65em] font-[600] tracking-widest mt-1 uppercase ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>Projects
                                        </div>
                                    </div>                                </motion.div>
                            </div>
                        </FxReveal>

                        <div>
                            <FxReveal delay={0.1}>
                                <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8">
                                    Your digital <span className="gx-gradient-text">adventure</span><br/>
                                    <span
                                        className={`text-[0.65em] font-[300] ${isDayTime ? 'text-white/50' : 'text-black/50'}`}>starts here.</span>
                                </h2>
                            </FxReveal>
                            <FxReveal delay={0.18}>
                                <p className={`text-[0.9em] leading-[1.8] mb-6 ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                                    Our specialty in the fast-paced IT industry is assisting business owners and
                                    entrepreneurs in realizing their product concepts. And we&apos;ve learned a few
                                    things from our over 8 years of expertise.
                                </p>
                            </FxReveal>
                            <FxReveal delay={0.24}>
                                <p className={`text-[0.9em] leading-[1.8] mb-10 pb-10 border-b ${isDayTime ? 'text-white/75 border-white/10' : 'text-black/70 border-black/10'}`}>
                                    In addition to collaborating with well-established companies, we have developed
                                    MVPs, built digital products, scaled tech and infrastructure, and ultimately sold a
                                    number of financed startups. We can provide you with that experience.
                                </p>
                            </FxReveal>
                            <FxReveal delay={0.3}>
                                <div className="flex flex-wrap gap-3 mb-10">
                                    {['MVP Development', 'SaaS Platforms', 'Enterprise Scale', 'Startup-to-Exit'].map(item => (
                                        <span key={item}
                                             className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border ${isDayTime ? 'border-[#2b98a3]/30 text-[#2b98a3] bg-[#2b98a3]/10' : 'border-[#123d42]/30 text-[#123d42] bg-[#2b98a3]/5'}`}>{item}</span>
                                    ))}
                                </div>
                            </FxReveal>
                            <FxReveal delay={0.36}>
                                <p className={`text-[0.88em] font-[400] mb-6 ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>
                                    Let&apos;s discuss your plans and figure out how we can support you.
                                </p>
                                <FxButton day={!isDayTime} href="/contact" variant="solid">Get in touch <span
                                    className="text-[1.2em] leading-none ml-1">→</span></FxButton>
                            </FxReveal>
                        </div>
                    </div>

                    <FxReveal delay={0.1} y={16}>
                        <div
                            className={`mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t ${isDayTime ? 'border-white/10' : 'border-black/10'}`}>
                            {[
                                {val: '50+', label: 'Projects Delivered'},
                                {val: '8+', label: 'Years of Expertise'},
                                {val: '15+', label: 'Industries Served'},
                                {val: '∞', label: 'Ambition Supported'},
                            ].map(s => (
                                <div key={s.label} className="text-center lg:text-left">
                                    <div
                                        className="text-[2.2em] font-[900] gx-gradient-text leading-none mb-1">{s.val}</div>
                                    <div
                                        className={`text-[0.75em] font-[500] tracking-wide uppercase ${isDayTime ? 'text-white/45' : 'text-black/45'}`}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/*  -  -  Trust Signals  -  -  */}
            <section
                className={`relative overflow-hidden ${isDayTime ? 'bg-[#f4fbfb] text-[#102124]' : 'bg-[#eef9fa] text-[#123d42]'}`}>
                <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #2b98a3 2px, #2b98a3 3px)',
                    backgroundSize: '100% 3px'
                }}/>
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full opacity-20 blur-3xl"
                        style={{background: 'radial-gradient(ellipse, rgba(43,152,163,0.8) 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 mx-auto px-6 sm:px-8 lg:px-[4.6em] lg:max-w-[90em] py-28 lg:py-36">
                    <FxReveal>
                        <div className="flex items-center gap-4 mb-6">
                            <FxChip day={isDayTime}>TRUST SIGNALS</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-[#123d42]/15' : 'bg-[#123d42]/15'}`}/>
                        </div>
                        <h3 className="text-[2.4em] lg:text-[3.5em] font-[700] leading-[1.1] tracking-tight mb-5">
                            Trusted by <span className="gx-gradient-text">Forward-Thinking</span><br/>
                            <span className={isDayTime ? 'text-[#123d42]/60' : 'text-[#123d42]/60'}>Brands Worldwide.</span>
                        </h3>
                        <p className={`text-[0.95em] max-w-2xl font-[300] leading-[1.7] mb-16 ${isDayTime ? 'text-[#123d42]/75' : 'text-[#123d42]/70'}`}>
                            Our proven track record speaks volumes. See why companies across industries choose Grey InfoTech for digital excellence.
                        </p>
                    </FxReveal>

                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-16"
                        initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.2}}
                        variants={{
                            hidden: {opacity: 0},
                            visible: {opacity: 1, transition: {staggerChildren: 0.1, delayChildren: 0.05}}
                        }}
                    >
                        {[
                            {value: 50, label: 'Projects Delivered', suffix: '+', icon: ' - '},
                            {value: 15, label: 'Industries Served', suffix: '+', icon: ' - '},
                            {value: 99.9, label: 'Uptime SLA', suffix: '%', icon: ' - '},
                            {value: 8, label: 'Years Experience', suffix: '+', icon: ' - '},
                        ].map((item, idx) => (
                            <motion.div key={item.label} className="gx-card group relative cursor-default"
                                        data-day={isDayTime ? 'false' : 'true'}
                                        variants={{hidden: {opacity: 0, y: 20}, visible: {opacity: 1, y: 0}}}
                                        transition={{type: 'spring', stiffness: 130, damping: 22}} whileHover={{y: -6}}>
                                <div
                                    className={`text-[1.8em] mb-3 ${isDayTime ? 'text-[#2b98a3]/70' : 'text-[#123d42]/70'}`}>{item.icon}</div>
                                <div
                                    className="text-[2.8em] lg:text-[3.6em] font-[900] leading-none tracking-tight gx-gradient-text">
                                    <CountUp start={0} end={item.value} duration={2.5}
                                             decimals={Number.isInteger(item.value) ? 0 : 1}
                                             suffix={item.suffix ?? ''}/>
                                </div>
                                <div
                                    className={`text-[0.78em] font-[600] tracking-wider uppercase mt-2 ${isDayTime ? 'text-white/50' : 'text-[#123d42]/70'}`}>{item.label}</div>
                                <motion.div className="absolute inset-0 rounded-[1.1rem] border border-[#2b98a3]/0"
                                            initial={{borderColor: 'rgba(43,152,163,0)'}}
                                            whileInView={{borderColor: ['rgba(43,152,163,0.5)', 'rgba(43,152,163,0)']}}
                                            viewport={{once: true}}
                                            transition={{delay: idx * 0.1 + 0.3, duration: 1.4}}/>
                            </motion.div>
                        ))}
                    </motion.div>

                    <FxReveal delay={0.2}>
                        <div
                            className={`rounded-3xl border p-8 lg:p-12 ${isDayTime ? 'border-white/10 bg-white/[0.03]' : 'border-[#123d42]/15 bg-[#123d42]/[0.03]'}`}>
                            <div className="flex items-center gap-3 mb-8">
                                <span
                                    className={`text-[0.72em] font-[700] uppercase tracking-[0.25em] ${isDayTime ? 'text-[#2b98a3]' : 'text-[#123d42]'}`}>VERIFIED ACROSS PLATFORMS</span>
                                <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-[#123d42]/15'}`}/>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    {
                                        href: 'https://clutch.co',
                                        icon: <FaStar/>,
                                        label: 'Clutch',
                                        sub: 'Top-rated Agency',
                                        color: '#f97316'
                                    },
                                    {
                                        href: 'https://share.google/pipNkXFTArrLdTX1B',
                                        icon: <FaGoogle/>,
                                        label: 'Google Reviews',
                                        sub: '4.9★ Rating',
                                        color: '#2b98a3'
                                    },
                                    {
                                        href: 'https://www.linkedin.com/company/grey-infotech-limited',
                                        icon: <FaLinkedin/>,
                                        label: 'LinkedIn',
                                        sub: 'Endorsed Leaders',
                                        color: '#1d6f77'
                                    },
                                    {
                                        href: '/case-studies',
                                        icon: <FaFileAlt/>,
                                        label: 'Case Studies',
                                        sub: 'Real Outcomes',
                                        color: '#a855f7'
                                    },
                                ].map((badge, i) => (
                                    <motion.a key={badge.label} href={badge.href}
                                              target={badge.href.startsWith('http') ? '_blank' : undefined}
                                              rel={badge.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                              className="gx-scan group relative overflow-hidden rounded-2xl p-6 border transition-all duration-300"
                                              style={{borderColor: badge.color + '28', background: badge.color + '08'}}
                                              initial={{opacity: 0, y: 16}} whileInView={{opacity: 1, y: 0}}
                                              viewport={{once: true}}
                                              transition={{delay: i * 0.08 + 0.3, duration: 0.5}}
                                              whileHover={{
                                                  y: -5,
                                                  borderColor: badge.color + '66',
                                                  background: badge.color + '12'
                                              }}>
                                        <motion.div className="text-[2em] mb-4" style={{color: badge.color}}
                                                    animate={{rotate: [0, 8, -8, 0]}}
                                                    transition={{
                                                        duration: 3 + i * 0.4,
                                                        repeat: Infinity,
                                                        ease: 'easeInOut'
                                                    }}>
                                            {badge.icon}
                                        </motion.div>
                                        <div
                                            className={`font-[700] text-[0.95em] mb-1 ${isDayTime ? 'text-white' : 'text-[#123d42]'}`}>{badge.label}</div>
                                        <div className="text-[0.75em]"
                                             style={{color: badge.color + 'cc'}}>{badge.sub}</div>
                                        <div
                                            className="absolute top-3 right-3 w-4 h-4 border-t border-r rounded-tr-sm opacity-40"
                                            style={{borderColor: badge.color}}/>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/*  -  -  AI Estimator  -  -  */}
            <div
                className={`relative -mt-18 py-16 mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] mb-8 max-w-full w-full h-auto ${isDayTime ? 'bg-[#edf9fa] text-[#123d42]' : 'bg-[#0d1d1f] text-white'}`}>
                <AIProjectEstimator/>
            </div>

            <SocialProof page="home"/>
        </div>
    );
};

export default Home;


