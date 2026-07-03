'use client';


import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css';
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import Link from "next/link";
import CountUp from "react-countup";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {useIsDayTime} from '../../components/useIsDayTime';
import {motion} from 'framer-motion';

import FuturisticServiceLayout, {
    ServiceIntro,
    ServiceSectionBlock,
    ServiceStatsRow
} from '@/components/futuristic/FuturisticServiceLayout';
import FuturisticDevelopmentProcess from '@/components/FuturisticDevelopmentProcess';

import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxHoloCard,
    FxStickyScrollSection,
    FxScrollItem,
    FxSectionHeading
} from '@/components/futuristic/fx';

type TechItem = {
    id: string;
    title: string;
    description: React.ReactNode;
    videoSrc: string;
};

const AppStoreOptimization = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");

    // Floating button visibility hook
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 200);
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

    // Scroll tracking for ASO services section
    const handleASOScroll = () => {
        const sections = [
            "KRO",
            "ALO",
            "RRM",
            "ATSE",
            "LGASO",
            "PTAR",
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
        window.addEventListener("scroll", handleASOScroll);
        return () => {
            window.removeEventListener("scroll", handleASOScroll);
        };
    }, []);

    const scrollToASOSection = (target: string) => {
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({behavior: "smooth", block: "start"});
            setActiveId(target);
        }
    };

    // Our Technology
    const items: TechItem[] = [
        {
            id: "research",
            title: "Research Aggregator",
            description: (
                <>
                    We consolidate data from leading ASO tools to identify consistent
                    performance patterns and develop highly informed optimization
                    recommendations. By closely monitoring Google Play and Apple App Store
                    algorithms on a daily basis, we proactively detect changes in trends and
                    platform behavior. This disciplined, data-driven approach ensures our
                    ASO strategies remain current, adaptive, and precisely aligned with
                    evolving store dynamics to deliver sustained visibility and performance
                    gains.
                </>
            ),
            videoSrc: "/assets/aso/aso.mp4",
        },
        {
            id: "engine",
            title: "Proprietary Engine",
            description: (
                <>
                    Our proprietary engine continuously monitors millions of keywords and
                    search phrases to deliver the most current insights into top-performing
                    terms and emerging trends. By automatically calculating your app’s
                    likelihood of indexing for each recommended keyword, we enable more
                    accurate prioritization and data-driven decision-making—ensuring every
                    optimization effort is focused on the highest-impact opportunities for
                    visibility and growth.
                </>
            ),
            videoSrc: "/assets/aso/engine.mp4",
        },
    ];

// Explicitly typed active state (fixes `any`)
    const [active, setActive] = useState<TechItem>(items[0]);

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
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Hero Section - with video background */}
            <div id={'hero'} className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden`}>
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/40 z-[5]"/>
                    <ResponsiveVideoHero videoDesktop="/assets/aso/hero.mp4" videoMobile="/assets/aso/hero-mobile.mp4"
                                         posterImage="/assets/aso/hero.jpg"/>
                </div>

                {/* Futuristic overlays */}
                <div className="absolute inset-0 z-[2] pointer-events-none">
                    <div className="gx-scanline opacity-20"/>
                    <div className="gx-noise-overlay opacity-30"/>
                </div>

                {/* Radial glow effects */}
                <div className="absolute inset-0 pointer-events-none z-[3]" style={{
                    background: `radial-gradient(ellipse 70% 60% at 60% 50%, rgba(0, 245, 212, 0.1) 0%, transparent 70%)`
                }}/>
                <div className="absolute inset-0 pointer-events-none z-[3]" style={{
                    background: `radial-gradient(ellipse 40% 40% at 30% 80%, rgba(0, 245, 212, 0.08) 0%, transparent 60%)`
                }}/>

                {/* Corner brackets */}
                <div
                    className="absolute top-6 left-6 w-6 h-6 rounded-sm z-[6] pointer-events-none border-t-2 border-l-2 border-teal-400 opacity-60"/>
                <div
                    className="absolute top-6 right-6 w-6 h-6 rounded-sm z-[6] pointer-events-none border-t-2 border-r-2 border-teal-400 opacity-60"/>
                <div
                    className="absolute bottom-6 left-6 w-6 h-6 rounded-sm z-[6] pointer-events-none border-b-2 border-l-2 border-teal-400 opacity-60"/>
                <div
                    className="absolute bottom-6 right-6 w-6 h-6 rounded-sm z-[6] pointer-events-none border-b-2 border-r-2 border-teal-400 opacity-60"/>

                {/* Content */}
                <div className="relative z-10 max-w-auto mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] py-12 w-full">
                    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-end">

                        {/* Left Content */}
                        <div>
                            {/* Badge */}
                            <div
                                className={`inline-flex items-center gap-2 mb-6 w-fit px-4 py-2 rounded-full backdrop-blur-md border`}
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(0, 245, 212, 0.3)',
                                }}>
                                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"/>
                                <span
                                    className="text-sm font-medium tracking-wide text-teal-200">APP STORE OPTIMIZATION</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-[2.9em] sm:text-[3.8em] lg:text-[4.8em] font-[800] leading-[1.02] tracking-tight text-white mb-6 ">
                               <span className="block">
                                   <span style={{color: '#00f5d4'}} className="mr-[0.15em]">App Store</span>
                               </span>
                                <span className="block">Optimization</span>
                            </h1>

                            {/* Description */}
                            <p className="text-[1em] md:text-[1.05em] leading-[1.8] text-white/70  mb-8">
                                Did you know over 65% of app downloads come from app store searches? Let us help your
                                app get discovered, ranked higher, and downloaded more with expert App Store
                                Optimization.
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-10">
                                {['Keyword Research', 'ASO Audit', 'Conversion Optimization', 'Store Intelligence', 'Data-Driven'].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-[0.72em] font-medium rounded-full"
                                        style={{
                                            background: 'rgba(0, 245, 212, 0.15)',
                                            border: `1px solid rgba(0, 245, 212, 0.35)`,
                                            color: '#2dd4bf'
                                        }}
                                    >
                                       {tag}
                                   </span>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button
                                        className="relative px-8 py-3 rounded-full text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                        style={{background: '#00f5d4', color: '#000'}}
                                    >
                                       <span className="absolute inset-0" style={{
                                           background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                       }}/>
                                        <span className="relative">Get Started →</span>
                                    </button>
                                </Link>
                                <Link href="/portfolio">
                                    <button
                                        className="px-8 py-3 rounded-full text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10"
                                        style={{border: `1px solid rgba(255,255,255,0.15)`}}
                                    >
                                        View our work
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Stats Card */}
                        <div className="hidden lg:block">
                            <div className="p-7 rounded-2xl backdrop-blur-md border border-white/10"
                                 style={{background: 'rgba(255,255,255,0.03)'}}>
                                <div className="flex items-center justify-between mb-6">
                                    <div
                                        className="text-[0.68em] uppercase tracking-[0.25em] text-white/45">Capabilities
                                    </div>
                                    <div className="h-px flex-1 mx-4 bg-white/10"/>
                                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"/>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        {label: 'Years Experience', value: '8+'},
                                        {label: 'Products Launched', value: '150+'},
                                        {label: 'Team Members', value: '10+'},
                                    ].map((stat) => (
                                        <div key={stat.label}
                                             className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                                            <div
                                                className="text-white/55 text-[0.76em] uppercase tracking-[0.18em]">{stat.label}</div>
                                            <div className="text-[1.3em] font-[800]"
                                                 style={{color: '#00f5d4'}}>{stat.value}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {['ASO', 'Optimization', 'Growth'].map((tag) => (
                                        <span key={tag} className="gx-data-pill text-[0.7em]">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animated particles */}
                <div className="absolute top-1/4 left-8 z-[4] w-2 h-2 rounded-full bg-teal-400 animate-pulse"/>
                <div className="absolute bottom-1/3 right-12 z-[4] w-3 h-3 rounded-full bg-teal-500 animate-pulse"
                     style={{animationDelay: '0.5s'}}/>
                <div className="absolute top-3/4 left-1/3 z-[4] w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
                     style={{animationDelay: '1s'}}/>
            </div>

            {/* Introductory section (futuristic Startups-style) */}
            <section
                ref={sectionRef}
                data-bg={isBackgroundActive ? (isDayTime ? 'Dark' : 'Light') : (isDayTime ? 'Light' : 'Dark')}
                className={`pt-16 transition-colors duration-500 ${
                    isBackgroundActive
                        ? isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                        : isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                <FxBackground day={isDayTime}/>
                <div
                    className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>APP STORE INTELLIGENCE</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Boost Rankings & Downloads with <span
                                className="gx-gradient-text">Data-Driven ASO</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div>
                                    <p>
                                        In an ecosystem of millions of apps, discoverability is the decisive factor.
                                        Our ASO practice combines deep keyword intelligence, conversion-first
                                        creative, and rigorous A/B testing to elevate your app in both the App Store
                                        and Google Play. The result: sustained organic growth and higher-quality
                                        installs.
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        Grey InfoTech pairs proprietary data pipelines with proven Brandformance
                                        frameworks to align visibility, conversion, and retention. The outcome is
                                        scalable organic growth across markets through precise, measurable
                                        optimization.
                                    </p>

                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Keyword Strategy', 'Creative A/B', 'Localization', 'Conversion Lift'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ASO services overview - Enhanced with FxStickyScrollSection */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>ASO<br/>services overview</>}
                intro="We designed to increase your app's visibility, improve search rankings, and drive higher download rates. By leveraging data-driven keyword strategies, competitive analysis, and conversion-focused techniques, we help your app reach the right audience, maximize engagement, and achieve measurable growth in a competitive app marketplace."
                navLabel="ASO Solutions"
                activeId={activeId}
                onNavClick={scrollToASOSection}
                items={[
                    {
                        id: "01",
                        title: "Keyword Research & Optimization",
                        target: "KRO",
                        tags: ["App Title", "Subtitle (iOS)", "Descriptions"],
                        body: (
                            <p>
                                Keyword research and optimization are critical components of any ASO strategy,
                                focusing on identifying the most relevant and high-conversion keywords for your
                                app. Through a deep understanding of user search behaviors, market trends, and
                                competitive landscapes, we identify keywords that maximize your app's
                                visibility. By strategically incorporating these keywords into key metadata
                                fields such as the app title, subtitle, and descriptions, we enhance your
                                app's ranking on the app stores, ensuring that it appears for the most relevant and
                                high-intent search queries. This approach is designed to deliver measurable
                                improvements in organic visibility and long-term growth.
                            </p>
                        ),
                    },
                    {
                        id: "02",
                        title: "App Listing Optimization",
                        target: "ALO",
                        tags: ["Icon Design & Testing", "Screenshots & Videos", "Compelling Copy"],
                        body: (
                            <p>
                                App listing optimization aims to convert store visitors into loyal users by
                                refining the presentation of your app in the app store. This service focuses on
                                ensuring that every visual and textual element of your app's store page
                                resonates with potential users and convinces them to download. From designing
                                impactful app icons to creating persuasive screenshots and compelling
                                descriptions, we work to maximize your app's conversion rate. By aligning
                                the app's messaging with user intent and improving visual appeal, we enhance
                                your app's ability to drive higher downloads, leveraging organic traffic for maximum
                                effectiveness.
                            </p>
                        ),
                    },
                    {
                        id: "03",
                        title: "Ratings & Reviews Management",
                        target: "RRM",
                        tags: ["Positive Reviews", "Professional Responses", "Trust Building"],
                        body: (
                            <p>
                                Ratings and reviews are fundamental to your app's success in the
                                marketplace, influencing both its visibility in search results and its credibility with
                                potential users. Through strategic review management, we ensure that your app
                                maintains a strong, positive reputation. This involves optimizing the review
                                acquisition process, responding to feedback with professionalism, and analyzing
                                user sentiments to identify areas for improvement. By managing and growing your
                                app's ratings and reviews, we improve your app's trustworthiness,
                                increase its likelihood of higher rankings, and ultimately foster organic growth.
                            </p>
                        ),
                    },
                    {
                        id: "04",
                        title: "A/B Testing & Store Experiments",
                        target: "ATSE",
                        tags: ["Icons", "Screenshots", "Descriptions"],
                        body: (
                            <p>
                                A/B testing is essential for optimizing the effectiveness of your app's listing
                                in the app store. This service involves systematically testing different
                                elements of your app's store page—such as the app icon, screenshots,
                                descriptions, and call-to-action phrases—to determine which version drives the
                                highest conversion rates. By running controlled experiments and analyzing the
                                results, we identify the most effective elements for improving app store
                                performance. A/B testing helps eliminate guesswork, ensuring that every change
                                made to the listing is backed by data-driven insights that maximize download
                                rates.
                            </p>
                        ),
                    },
                    {
                        id: "05",
                        title: "Localization & Global ASO",
                        target: "LGASO",
                        tags: ["Local Keywords", "Cultural Messaging", "Market-Specific Visuals"],
                        body: (
                            <p>
                                Localization ensures your app is optimized for global markets by adapting its
                                store listing to meet local languages, cultural nuances, and user expectations.
                                This service includes local keyword optimization, translation, and cultural
                                adjustments that make the app more appealing to international users. We help
                                expand your app's reach by improving its ranking in specific countries and
                                regions, ensuring that your app performs well in diverse markets. By aligning
                                your app's store presence with regional preferences and behaviors, we enable
                                you to tap into new markets, drive global growth, and enhance your app's overall
                                visibility on a worldwide scale.
                            </p>
                        ),
                    },
                    {
                        id: "06",
                        title: "Performance Tracking & Analytics",
                        target: "PTAR",
                        tags: ["Keyword Rankings", "Conversion Metrics", "Competitive Analysis"],
                        body: (
                            <p>
                                Ongoing performance tracking is essential to ensuring the effectiveness of an
                                ASO strategy. This service provides continuous monitoring of key metrics such as
                                keyword rankings, conversion rates, and download trends. Through data-driven
                                insights and detailed reports, we help you understand the impact of your ASO
                                efforts, identify areas for improvement, and refine strategies over time.
                                Regular performance tracking allows for agile optimization and ensures your
                                app's app store presence is consistently aligned with broader business
                                objectives, allowing for sustainable growth in the competitive app marketplace.
                            </p>
                        ),
                    },
                ] satisfies FxScrollItem[]}
            />

            {/* First image with enhanced overlay */}
            <div id={'first image'}
                 className={'h-auto max-w-full w-full mx-auto relative group overflow-hidden'}>
                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10 transition-all duration-500"/>
                <Image
                    className={' object-fill'}
                    src={'/assets/seo/first.jpg'}
                    alt={'first Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Engineering Leadership in the App Economy - Futuristic Enhanced */}
            <section
                className={`relative isolate overflow-hidden ${isDayTime ? 'bg-gradient-to-b from-white to-gray-50' : 'bg-gradient-to-b from-[#050810] to-[#0a0f1a]'}`}>
                {/* Animated background elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <FxBackground day={isDayTime} grid aurora/>
                    {/* Animated gradient orbs */}
                    <div
                        className="absolute top-1/4 -left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
                        style={{animationDuration: '8s'}}/>
                    <div
                        className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl animate-pulse"
                        style={{animationDuration: '10s'}}/>
                </div>

                <div
                    className={`relative z-10 max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[8em] md:pt-[6em] pt-[4em] lg:pb-[8em] md:pb-[6em] pb-[4em]`}>
                    <FxReveal>
                        <div
                            className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-12 ${isDayTime ? 'text-black' : 'text-white'} `}>
                            <div className={'lg:mr-[8em]'}>
                                <FxChip day={!isDayTime}>🚀 MARKET LEADERSHIP</FxChip>
                                <h2 className={`lg:text-[3.8em] md:text-[3.2em] text-[2.2em] font-[800] tracking-tight lg:mb-6 mb-4 leading-[1.15] mt-6`}>
                                    Engineering Leadership <br className={'lg:block md:block hidden'}/><span
                                    className="gx-gradient-text bg-gradient-to-r from-teal-400 to-cyan-400">In The App Economy</span>
                                </h2>
                                <p className={`text-[1em] font-[300] leading-relaxed tracking-normal text-justify ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                                    We combine strategic App Store Optimization, data-driven insights, and proven growth
                                    frameworks to position your app as a market leader—driving visibility, sustainable
                                    downloads, and long-term competitive advantage.
                                </p>
                            </div>
                            <div className={`relative`}>
                                <div className="space-y-4">
                                    {[
                                        {
                                            title: "🎯 Always one step ahead",
                                            content: "App store algorithms and optimization standards are continuously evolving. Our ASO specialists stay ahead of these changes by closely monitoring industry trends and refining our internal methodologies."
                                        },
                                        {
                                            title: "⚡ Maximize every opportunity",
                                            content: "Following a comprehensive audit of your app storefront, we identify high-impact localization opportunities and strategic quick wins designed to unlock immediate performance gains."
                                        },
                                        {
                                            title: "🍎 Take advantage of iOS features",
                                            content: "With iOS innovations, you can test multiple App Store page variants, deploy custom product pages, and improve conversion rates through advanced experimentation."
                                        }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{opacity: 0, x: 20}}
                                            whileInView={{opacity: 1, x: 0}}
                                            transition={{delay: idx * 0.1}}
                                            viewport={{once: true}}
                                        >
                                            <FxHoloCard key={idx} day={isDayTime}
                                                        className={`p-5 lg:p-7 border backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${isDayTime ? 'border-teal-300/30 hover:border-teal-400/60 bg-white/40' : 'border-teal-400/30 hover:border-teal-400/60 bg-black/20'}`}>
                                                <h3 className={`text-[1.15em] lg:text-[1.35em] font-[700] mb-3 ${isDayTime ? 'text-black' : 'text-white'}`}>
                                                    {item.title}
                                                </h3>
                                                <p className={`text-[0.88em] font-[300] leading-[1.6] ${isDayTime ? 'text-gray-700' : 'text-gray-350'}`}>
                                                    {item.content}
                                                </p>
                                            </FxHoloCard>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/* Data-Driven App Store Optimization Agency - Futuristic Enhanced */}
            <section
                className={`relative isolate overflow-hidden ${isDayTime ? 'bg-black text-white' : 'bg-gradient-to-b from-white to-gray-100 text-black'}`}>
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <FxBackground day={isDayTime} grid aurora/>
                    {/* Glow effect */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-3xl"/>
                </div>

                <div
                    className={`relative z-10 lg:py-24 md:py-20 py-16 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em]`}>
                    <FxReveal>
                        <div className={`border-b border-teal-400/30 pb-10 lg:mb-20 mb-12`}>
                            <FxChip day={isDayTime}>📊 DATA INTELLIGENCE</FxChip>
                            <h2 className='text-[2.3em] md:text-[3.5em] lg:text-[4em] font-[800] tracking-tight leading-[1.1] mt-6'>
                                Data-Driven App Store <br className={'lg:block md:block hidden'}/>Optimization <span
                                className="gx-gradient-text bg-gradient-to-r from-teal-400 to-cyan-400">Agency</span>
                            </h2>
                        </div>
                    </FxReveal>

                    {/* Benefits Grid */}
                    <div
                        className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-6 gap-6 lg:mt-20 md:mt-16 mt-12`}>
                        {[
                            {
                                id: 'research',
                                title: '🔬 Research',
                                icon: isDayTime ? '/assets/aso/icon/research1.svg' : '/assets/aso/icon/research.svg',
                                description: 'We develop one of the most extensive and data-rich keyword research pools in the industry, analyzing over 5,000 keywords per language, per app store—20 times deeper than any other agency.'
                            },
                            {
                                id: 'experience',
                                title: '💡 Experience',
                                icon: isDayTime ? '/assets/aso/icon/exp1.svg' : '/assets/aso/icon/exp.svg',
                                description: 'We possess deep, proven expertise in identifying what drives measurable success in the app stores. Our experience spans nearly every vertical.'
                            },
                            {
                                id: 'brandformance',
                                title: '🎯 Brandformance',
                                icon: isDayTime ? '/assets/drupal/icon/att1.svg' : '/assets/drupal/icon/att.svg',
                                description: 'We believe that close, collaborative partnerships with our clients are central to achieving lasting success and sustainable growth.'
                            }
                        ].map((benefit, idx) => (
                            <motion.div
                                key={benefit.id}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{delay: idx * 0.12}}
                                viewport={{once: true}}
                            >
                                <FxReveal delay={0.1 * idx}>
                                    <FxHoloCard day={isDayTime}
                                                className={`p-7 lg:p-9 h-full backdrop-blur-md transition-all duration-300 hover:scale-[1.03] group ${isDayTime ? 'border border-teal-400/25 hover:border-teal-400/50 bg-black/20' : 'border border-teal-400/30 hover:border-teal-400/60 bg-white/30'}`}>
                                        <div
                                            className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center ${isDayTime ? 'bg-teal-500/20' : 'bg-teal-400/15'} group-hover:scale-110 transition-transform`}>
                                            <Image
                                                src={benefit.icon}
                                                alt={benefit.title}
                                                width={64}
                                                height={64}
                                                className={'h-auto w-auto'}
                                            />
                                        </div>
                                        <h3 className={`lg:text-[1.7em] md:text-[1.6em] text-[1.4em] font-[700] mb-4 ${isDayTime ? 'text-white' : 'text-black'}`}>
                                            {benefit.title}
                                        </h3>
                                        <p className={`text-[0.95em] text-justify font-[300] leading-relaxed ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {benefit.description}
                                        </p>
                                    </FxHoloCard>
                                </FxReveal>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mid image with enhanced overlay */}
            <div id={'mid image'} className={'h-auto max-w-full w-full mx-auto relative group overflow-hidden'}>
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 group-hover:from-black/10 transition-all duration-500"/>
                <Image
                    className={' object-fill'}
                    src={'/assets/seo/mid.jpg'}
                    alt={'mid Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* ASO Process - Futuristic Timeline */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[8em] md:pt-[6em] pt-[4em] lg:pb-[8em] md:pb-[6em] pb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-12 border-b-[1px] border-teal-400/30 lg:pb-[5em] pb-[3em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`capitalize lg:text-[3.6em] md:text-[3.2em] text-[2.2em] font-[800] justify-center tracking-tight lg:pr-[1em] leading-[1.15]`}>
                            App Store <br className={'lg:block md:block hidden'}/>Optimization <span
                            className="gx-gradient-text">Process</span>
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.95em] font-[300] justify-center text-justify leading-[1.6] lg:-ml-[3em] tracking-normal'>
                            A comprehensive, data-driven approach to enhancing app visibility, driving qualified organic
                            installs, and optimizing store performance for sustainable growth.
                        </p>
                    </div>
                </div>

                {/* Process Timeline */}
                <div className="relative">
                    {/* Timeline connector line */}
                    <div
                        className={`hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b ${isDayTime ? 'from-teal-400/0 via-teal-400/50 to-teal-400/0' : 'from-teal-300/0 via-teal-400/50 to-teal-300/0'}`}/>

                    <div className="space-y-8 lg:space-y-12">
                        {[
                            {
                                title: '🎯 Kickoff Meeting',
                                description: 'We begin by aligning on KPIs, brand constraints, experimentation tolerance, and growth targets. This kickoff fuels a data-informed ASO roadmap tailored to measurable results across app stores.',
                                step: 1
                            },
                            {
                                title: '🔍 Keyword & Competitor Research',
                                description: 'Deep analysis across thousands of keywords and competitive storefronts produces a prioritized list of opportunities and an actionable ASO roadmap tailored per store and market.',
                                step: 2
                            },
                            {
                                title: '⚡ Monitoring & Optimizing',
                                description: 'Continuous performance telemetry, experiments and creative optimization loops allow rapid iteration and sustained growth. We translate signals into prioritized action and long-term uplift.',
                                step: 3
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{opacity: 0, x: -20}}
                                whileInView={{opacity: 1, x: 0}}
                                transition={{delay: idx * 0.15}}
                                viewport={{once: true}}
                            >
                                <FxReveal delay={idx * 0.1}>
                                    <FxHoloCard day={isDayTime}
                                                className={`p-7 lg:p-10 backdrop-blur-md transition-all duration-300 hover:scale-[1.01] group ${isDayTime ? 'border border-teal-400/25 hover:border-teal-400/50 bg-gradient-to-r from-teal-500/10 to-cyan-500/10' : 'border border-teal-400/30 hover:border-teal-400/60 bg-gradient-to-r from-teal-400/10 to-cyan-400/5'}`}>
                                        <div className="flex items-start gap-6">
                                            {/* Step indicator */}
                                            <div
                                                className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${isDayTime ? 'bg-teal-500/30 text-teal-300' : 'bg-teal-400/30 text-teal-300'} group-hover:scale-110 transition-transform`}>
                                                {item.step}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className={`text-[1.5em] lg:text-[1.8em] font-[700] mb-3 ${isDayTime ? 'text-white' : 'text-black'}`}>
                                                    {item.title}
                                                </h3>
                                                <p className={`text-[0.95em] font-[300] leading-relaxed text-justify ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </FxHoloCard>
                                </FxReveal>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'partners'}
                     className={`relative lg:py-14 md:py-16 py-10 lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                         isDayTime ? 'text-black' : 'text-white'
                     }`}>
                    <h1 className={'lg:text-5em] md:text-[4em] text-[2em] font-[700] leading-[1.1] capitalize mb-[0.6em]'}>
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
                                className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-black group-hover:text-gray-800' : 'text-white group-hover:text-gray-300'}`}>
                            Start a project <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                            <span
                                className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-black' : 'border-white'} rounded-full"}></span>
                        </button>
                    </Link>

                    {/* Countup */}
                    <div id={'countup'}
                         className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-500 ${
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

            {/* Our Technology */}
            <div className={`lg:py-[4em] md:py-[4em] py-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'development process'}
                     className={`relative mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={`lg:mb-[2em] md:mb-[2em] mb-[1em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                        <h2 className='capitalize text-[2em] md:text-[3.2em] lg:text-[3.2em] font-[700] tracking-tight leading-[1.15] lg:pb-6'>
                            our technologies
                        </h2>
                    </div>
                    <div
                        className="grid grid-cols-1 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)_minmax(0,720px)] gap-8 lg:gap-10 items-start">
                        {/* LEFT TABS (futuristic holo list) */}
                        <div className="flex flex-col gap-4">
                            {items.map((tech) => {
                                const isActive = tech.id === active.id;
                                return (
                                    <FxHoloCard key={tech.id} day={isDayTime}
                                                className={`p-0 overflow-hidden ${isActive ? 'ring-1 ring-teal-400/40' : 'border border-slate-700/30'}`}>
                                        <button
                                            onClick={() => setActive(tech)}
                                            className={`w-full text-left px-4 py-4 flex items-center justify-between transition ${isActive ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900/50'}`}>
                                            <span className="font-medium text-sm sm:text-base">
                                                {tech.title}
                                            </span>
                                            <span
                                                className={isActive ? 'text-teal-400 text-lg' : 'text-slate-500 text-lg'}>→</span>
                                        </button>
                                    </FxHoloCard>
                                );
                            })}
                        </div>

                        {/* CENTER CONTENT */}
                        <div className={isDayTime ? "text-white" : "text-black"}>
                            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-medium mb-4 sm:mb-6">
                                {active.title}
                            </h2>
                            <p className="text-sm sm:text-base lg:text-slate-300 md:text-slate-300 text-slate-800 text-justify leading-relaxed max-w-xl">
                                {active.description}
                            </p>
                        </div>

                        {/* RIGHT VIDEO */}
                        <div className="relative lg:-mt-[3em] md:-mt-[3em] hidden md:block">
                            <div className="w-full aspect-[16/9] h-full rounded-3xl overflow-hidden ">
                                <video
                                    key={active.id}
                                    src={active.videoSrc}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-fill"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Business Benefits of ASO - Futuristic Grid */}
            <div id={'business benefit'}
                 className={`relative lg:top-10 py-20 lg:mb-24 mb-12 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                {/* Business Benefit Header */}
                <div
                    className={`border-b border-teal-400/30 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 pb-[3em] lg:mb-[7em] mb-12 ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div>
                        <h2 className='text-[2.3em] text-start md:text-[3.2em] lg:text-[3.8em] font-[800] tracking-normal leading-[1.15] lg:pb-6'>
                            App Store Optimization <br className={'lg:block md:block hidden'}/>Business <span
                            className="gx-gradient-text">Benefits</span>
                        </h2>
                    </div>
                    <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                        <p className={'text-justify text-[0.95em] font-[300] leading-relaxed'}>
                            App Store Optimization is a strategic growth lever that maximizes your app's organic
                            visibility, drives high-quality user acquisition, strengthens brand credibility, optimizes
                            conversion rates, and enables scalable, cost-effective expansion.
                        </p>
                    </div>
                </div>

                <div className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 lg:gap-8 lg:mt-20 mt-12`}>
                    {[
                        {
                            id: 'discoverability',
                            title: '🔍 Discoverability',
                            icon: isDayTime ? '/assets/front/icon2/test.svg' : '/assets/front/icon2/test1.svg',
                            copy: 'Enhances app presence in stores to ensure it\'s found by high-intent users through strategic keyword and metadata optimization.'
                        },
                        {
                            id: 'brand-awareness',
                            title: '⭐ Brand Awareness',
                            icon: isDayTime ? '/assets/front/icon2/fast.svg' : '/assets/front/icon2/fast1.svg',
                            copy: 'Strengthens recognition with compelling visuals, clear messaging, and social proof to build trust and long-term engagement.'
                        },
                        {
                            id: 'conversions',
                            title: '💰 Conversions',
                            icon: isDayTime ? '/assets/front/icon2/att.svg' : '/assets/front/icon2/att1.svg',
                            copy: 'Transforms visitors into users with conversion-first listing design—icons, screenshots and persuasive microcopy.'
                        },
                        {
                            id: 'organic-growth',
                            title: '📈 Organic Growth',
                            icon: isDayTime ? '/assets/front/icon2/fast.svg' : '/assets/front/icon2/fast1.svg',
                            copy: 'Drives sustainable scale by building a loyal user base through improved discoverability and retention.'
                        },
                        {
                            id: 'acquisition',
                            title: '🎯 Acquisition',
                            icon: isDayTime ? '/assets/front/icon2/fast.svg' : '/assets/front/icon2/fast1.svg',
                            copy: 'Complements paid channels by improving store conversion and campaign efficiency, lowering CPI.'
                        },
                        {
                            id: 'ranking',
                            title: '🏆 Ranking',
                            icon: isDayTime ? '/assets/front/icon2/cust.svg' : '/assets/front/icon2/cust1.svg',
                            copy: 'Boosts search and chart performance—creating a feedback loop of visibility, downloads and improved rankings.'
                        }
                    ].map((b, i) => (
                        <motion.div
                            key={b.id}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{delay: i * 0.08}}
                            viewport={{once: true}}
                        >
                            <FxReveal delay={0.06 * i}>
                                <FxHoloCard day={isDayTime}
                                            className={`p-7 lg:p-8 hover:scale-[1.03] transition-all duration-300 group backdrop-blur-sm h-full ${isDayTime ? 'border border-teal-400/25 hover:border-teal-400/50 bg-gradient-to-br from-teal-500/10 to-cyan-500/5' : 'border border-teal-400/30 hover:border-teal-400/60 bg-gradient-to-br from-teal-400/10 to-cyan-400/5'}`}>
                                    <div
                                        className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center ${isDayTime ? 'bg-teal-500/20' : 'bg-teal-400/20'} group-hover:scale-110 transition-transform`}>
                                        <Image src={b.icon} alt={b.title} width={48} height={48}
                                               className="h-auto w-auto"/>
                                    </div>
                                    <h4 className={`text-[1.4em] font-[700] mb-3 ${isDayTime ? 'text-white' : 'text-black'}`}>{b.title}</h4>
                                    <p className={`text-[0.95em] font-[300] leading-relaxed ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>{b.copy}</p>
                                </FxHoloCard>
                            </FxReveal>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Last image with enhanced overlay */}
            <div id={'last image'} className={'h-auto max-w-full w-full mx-auto relative group overflow-hidden'}>
                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10 transition-all duration-500"/>
                <Image
                    className={' object-fill'}
                    src={'/assets/seo/last.jpg'}
                    alt={''}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>
        </div>
    );
};

export default AppStoreOptimization;