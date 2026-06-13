'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";

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

    // Development Solutions hook
    const handleScroll = () => {
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

    // Engineering Leadership in the App Economy
    const [webIndex, setWebIndex] = useState<number | null>(null);

    const toggleWeb = (index: number) => {
        setWebIndex(webIndex === index ? null : index);
    }

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
                 className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                     isDayTime ? 'text-black' : 'text-white'
                 }`}>
                <h1
                    className={`border-b pb-[0.5em] border-gray-500/50 px-0 constant-text lg:text-[5.35em] md:text-[5.35em] text-[2.3em] lg:mt-[2.5em] md:mt-[2.5em] mt-[3em] leading-[1.1] font-[700]`}>
                    App Store <br className={'lg:block md:block block'}/>Optimisation (ASO)
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Did you know over 65% of app downloads come from app store searches? Let us help your app get
                    discovered, ranked higher, and downloaded more with expert App Store Optimization.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/aso/hero.jpg'}
                        alt={'ASO'}
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
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] font-[400] lg:tracking-wider tracking-tight'>
                            Drive downloads, <br className={'lg:block md:block hidden'}/>improve rankings
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Boost Rankings & App Downloads <br className={'lg:block md:block hidden'}/>with Data-Driven
                            ASO
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    With more than five million apps competing across the App Store and Google Play,
                                    visibility has become the defining factor of success. Apps that fail to rank
                                    prominently in search results struggle to gain traction, regardless of quality or
                                    functionality. This makes App Store Optimization (ASO) a critical growth lever,
                                    ensuring your app is discoverable, competitive, and positioned to attract
                                    high-intent users in an increasingly saturated marketplace.
                                </p>
                            </div>
                            <div>
                                <p>
                                    ASO is also one of the most cost-effective mobile growth strategies, capable of
                                    driving scalable, high-quality downloads at a fraction of the cost of paid
                                    acquisition when executed correctly. Leveraging over a decade of mobile-first
                                    expertise, experience with 700+ global brands, proprietary data intelligence, and a
                                    proven Brandformance methodology, Grey InfoTech maximizes organic growth by aligning
                                    visibility, conversion, and brand impact—delivering sustained performance across
                                    multiple markets and app stores.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ASO services overview */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[4em] md:pb-[4em] pb-[1em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'ASO Services Overview'}
                     className={'relative lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[6em] md:pb-[6em] pb-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:mb-[6em] md:mb-[6em] mb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px]  pb-[3em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3.12em] md:text-[3.12em] text-[2em] font-[700] justify-center tracking-tight  leading-[1.1]`}>
                                App Store Optimization <br className={'lg:block md:block hidden'}/>Services Overview
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.85em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] tracking-noromal'>
                                We designed to increase your app’s visibility, improve search rankings, and drive higher
                                download rates. By leveraging data-driven keyword strategies, competitive analysis, and
                                conversion-focused techniques, we help your app reach the right audience, maximize
                                engagement, and achieve measurable growth in a competitive app marketplace.
                            </p>
                        </div>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[11em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] tracking-tight constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.89em] ml-4 font-[600] relative space-y-3 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-400 focus:decoration-gray-600'
                            }`}>
                                {[
                                    {id: "01", title: "Keyword Research & Optimization", target: "KRO"},
                                    {id: "02", title: "App Listing Optimization", target: "ALO"},
                                    {id: "03", title: "Rating & Reviews Management", target: "RRM"},
                                    {id: "04", title: "A/B Testing & Store Experiments", target: "ATSE"},
                                    {id: "05", title: "Localization & Global ASO", target: "LGASO"},
                                    {id: "06", title: "Performance Tracking, Analytics & Reporting", target: "PTAR"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-4 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[400]'}`
                                                    : `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-500 font-[400]'}`
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[23em] md:mb-[25em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'KRO'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Keyword Research & Optimization
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>App Title</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Subtitle (iOS)</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Short & long descriptions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Keyword research and optimization are critical components of any ASO strategy,
                                        focusing on identifying the most relevant and high-conversion keywords for your
                                        app. Through a deep understanding of user search behaviors, market trends, and
                                        competitive landscapes, we identify keywords that maximize your app&#39;s
                                        visibility. By strategically incorporating these keywords into key metadata
                                        fields such as the app title, subtitle, and descriptions, we enhance your
                                        app&#39;s
                                        ranking on the app stores, ensuring that it appears for the most relevant and
                                        high-intent search queries. This approach is designed to deliver measurable
                                        improvements in organic visibility and long-term growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ALO'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        App Listing Optimization (Conversion Rate Optimization)
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>App icon design & testing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Screenshots & preview videos</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Clear, compelling descriptions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        App listing optimization aims to convert store visitors into loyal users by
                                        refining the presentation of your app in the app store. This service focuses on
                                        ensuring that every visual and textual element of your app&#39;s store page
                                        resonates with potential users and convinces them to download. From designing
                                        impactful app icons to creating persuasive screenshots and compelling
                                        descriptions, we work to maximize your app&#39;s conversion rate. By aligning
                                        the
                                        app&#39;s messaging with user intent and improving visual appeal, we enhance
                                        your
                                        app’s ability to drive higher downloads, leveraging organic traffic for maximum
                                        effectiveness.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'RRM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Ratings & Reviews Management
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Encouraging positive user reviews</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Responding to reviews professionally</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Managing feedback to improve store trust and rankings</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Ratings and reviews are fundamental to your app&#39;s success in the
                                        marketplace,
                                        influencing both its visibility in search results and its credibility with
                                        potential users. Through strategic review management, we ensure that your app
                                        maintains a strong, positive reputation. This involves optimizing the review
                                        acquisition process, responding to feedback with professionalism, and analyzing
                                        user sentiments to identify areas for improvement. By managing and growing your
                                        app&#39;s ratings and reviews, we improve your app&#39;s trustworthiness,
                                        increase its
                                        likelihood of higher rankings, and ultimately foster organic growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ATSE'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        A/B Testing & Store Experiments
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Icons</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Screenshots</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Descriptions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        A/B testing is essential for optimizing the effectiveness of your app&#39;s
                                        listing
                                        in the app store. This service involves systematically testing different
                                        elements of your app&#39;s store page—such as the app icon, screenshots,
                                        descriptions, and call-to-action phrases—to determine which version drives the
                                        highest conversion rates. By running controlled experiments and analyzing the
                                        results, we identify the most effective elements for improving app store
                                        performance. A/B testing helps eliminate guesswork, ensuring that every change
                                        made to the listing is backed by data-driven insights that maximize download
                                        rates.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'LGASO'}>
                                    <h2 className={`text-[1.5em] font-medium mb-3`}>
                                        Localization & Global ASO
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-light ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Local keywords</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cultural messaging</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Market-specific visuals</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Localization ensures your app is optimized for global markets by adapting its
                                        store listing to meet local languages, cultural nuances, and user expectations.
                                        This service includes local keyword optimization, translation, and cultural
                                        adjustments that make the app more appealing to international users. We help
                                        expand your app&#39;s reach by improving its ranking in specific countries and
                                        regions, ensuring that your app performs well in diverse markets. By aligning
                                        your app&#39;s store presence with regional preferences and behaviors, we enable
                                        you
                                        to tap into new markets, drive global growth, and enhance your app&#39;s overall
                                        visibility on a worldwide scale.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'PTAR'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Performance Tracking, Analytics & Reporting
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Keyword rankings</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Conversion rate (views → installs)</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Download trends</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitive benchmarks</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Ongoing performance tracking is essential to ensuring the effectiveness of an
                                        ASO strategy. This service provides continuous monitoring of key metrics such as
                                        keyword rankings, conversion rates, and download trends. Through data-driven
                                        insights and detailed reports, we help you understand the impact of your ASO
                                        efforts, identify areas for improvement, and refine strategies over time.
                                        Regular performance tracking allows for agile optimization and ensures your
                                        app&#39;s app store presence is consistently aligned with broader business
                                        objectives, allowing for sustainable growth in the competitive app marketplace.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Frst image*/}
            <div id={'first image'} className={'lg:-mt-[32em] md:-mt-[32em] h-auto max-w-full w-full mx-auto'}>
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

            {/* Engineering Leadership in the App Economy */}
            <div
                className={`lg:pt-[2em] h-auto border-b border-white max-w-full w-full mx-auto ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[6em] md:pt-[6em] pt-[1.2em] lg:pb-[6em] md:pb-[6em] pb-[1.2em] mt-14`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div className={'lg:mr-[8em]'}>
                            <h2 className={`lg:text-[3.1em] md:text-[3.1em] text-[2em] font-[700] justify-center tracking-tight lg:mb-12 mb-7 leading-[1.2]`}>
                                Engineering Leadership <br className={'lg:block md:block hidden'}/>In The App Economy
                            </h2>
                            <p className={'text-[0.873em] font-normal leading-normal tracking-normal text-justify'}>
                                We combine strategic App Store Optimization, data-driven insights, and proven growth
                                frameworks to position your app as a market leader—driving visibility, sustainable
                                downloads, and long-term competitive advantage.
                            </p>
                        </div>
                        <div
                            className={`lg:-ml-5 md:-ml-5 border-t pt-[6em]] relative mx-auto max-w-full w-full space-y-2 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <div
                                className={`w-full border-b pb-6 mt-6`}>
                                <button
                                    onClick={() => toggleWeb(0)}
                                    className="flex items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Always one step ahead</span>
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
                                        App store algorithms and optimization standards are continuously evolving. Our
                                        ASO specialists stay ahead of these changes by closely monitoring industry
                                        trends and refining our internal methodologies, ensuring our strategies remain
                                        effective, compliant, and consistently deliver measurable performance gains for
                                        our clients.<br/><br/>

                                        We provide a comprehensive, data-driven ASO approach—covering optimized titles,
                                        descriptions, and keyword strategies informed by in-depth research, alongside
                                        creative asset optimization, A/B testing, and performance measurement. Our
                                        multilingual expertise enables us to deliver scalable, results-focused
                                        optimization across more than 25 languages, ensuring sustained visibility,
                                        growth, and competitive advantage in global app marketplaces.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(1)}
                                    className="flex items-center mt-6 justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Maximize every opportunity</span>
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
                                        Following a comprehensive audit of your app storefront, we identify high-impact
                                        localization opportunities and other strategic quick wins designed to unlock
                                        immediate performance gains and long-term growth potential. Our approach focuses
                                        on maximizing visibility by addressing the most effective optimization levers
                                        first, ensuring efficient and scalable results.<br/><br/>

                                        By strategically targeting languages that rank across multiple countries and
                                        applying market-specific keyword intelligence, we expand your app’s reach and
                                        improve rankings across several regions simultaneously. In addition, we lead
                                        advanced ASO initiatives for in-app events, recognizing that effective
                                        optimization extends beyond installs to driving meaningful in-app actions,
                                        including engagement and subscription growth.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full`}>
                                <button
                                    onClick={() => toggleWeb(2)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Take advantage of the latest iOS features</span>
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
                                        With the introduction of iOS 15, Apple unlocked a range of powerful capabilities
                                        that significantly enhance app store optimization strategies. Leveraging these
                                        features ensures you capitalize on new opportunities to drive sustained organic
                                        growth and avoid leaving measurable performance gains untapped.<br/><br/>

                                        You can now test up to four App Store page variants, deploy up to 35 custom
                                        product pages for paid acquisition, and materially improve conversion rates
                                        through advanced experimentation. These capabilities enable deeper optimization
                                        of keyword rankings, icons, screenshot galleries, and preview videos—delivering
                                        greater creative control, more precise testing, and stronger performance
                                        outcomes than ever before.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data-Driven App Store Optimization Agency */}
            <div className={`lg:py-[2em] md:py-[2em] py-[1em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'php benefit'}
                     className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* data-driven store optimization agency */}
                    <div
                        className={`border-b-[0.1em] border-gray-300/50 pb-[3em] lg:mb-[5em] ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}>
                        <div>
                            <h2 className='text-start capitalize text-[2em] md:text-[3.2em] lg:text-[3.2em] font-[700] tracking-tight leading-[1.15] lg:pb-6 md:pb-6 pb-2'>
                                data-driven app <br className={'lg:block md:block hidden'}/>store Optimization agency
                            </h2>
                        </div>

                    </div>

                    {/* Benefits */}
                    <div
                        className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]  ${
                            isDayTime ? 'text-white' : 'text-black'
                        } lg:mt-28 md:mt-28 mt-6`}>
                        <div id={'research'}>
                            <Image
                                src={isDayTime ? '/assets/aso/icon/research1.svg' : '/assets/aso/icon/research.svg'}
                                alt={'research'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Research
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We develop one of the most extensive and data-rich keyword research pools in the
                                industry, analyzing over 5,000 keywords per language, per app store—20 times deeper than
                                any other agency. This unparalleled level of insight allows us to identify high-impact
                                opportunities, craft precision-driven ASO strategies, and optimize every element of your
                                app store presence. By leveraging this depth, we ensure maximum visibility, higher
                                rankings, and sustained growth in installs, delivering measurable results that scale
                                across markets and languages.
                            </p>
                        </div>
                        <div id={'experience'}>
                            <Image
                                src={isDayTime ? '/assets/aso/icon/exp1.svg' : '/assets/aso/icon/exp.svg'}
                                alt={'Experience'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.1em] font-[500] mb-8'}>
                                Experience
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We possess deep, proven expertise in identifying
                                what drives measurable success in the app stores. Our experience spans nearly every
                                vertical, allowing us to develop highly tailored, data-driven strategies that
                                consistently exceed growth KPIs and market expectations. By working with some of the
                                world’s leading companies, we combine industry-leading best practices with rigorous
                                performance optimization, delivering sustained visibility, increased installs, and
                                impactful results across diverse industries and competitive global markets.
                            </p>
                        </div>
                        <div id={'brandformance'}>
                            <Image
                                src={isDayTime ? '/assets/drupal/icon/att1.svg' : '/assets/drupal/icon/att.svg'}
                                alt={'Brandformance'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Brandformance
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We believe that close, collaborative partnerships with our clients are central to
                                delivering outstanding ASO results. By maintaining ongoing dialogue throughout the
                                strategy and execution process, we leverage our clients’ intimate knowledge of their
                                brand while applying our data-driven, performance-focused expertise. This integrated
                                approach ensures that every optimization decision is both strategically aligned and
                                results-oriented, enabling measurable growth, stronger visibility, and sustained success
                                in highly competitive app marketplaces.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'h-auto max-w-full w-full mx-auto'}>
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

            {/* ASO Process */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`capitalize lg:text-[3.15em] md:text-[3.15em] text-[2em] font-[700] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                            app store <br className={'lg:block md:block hidden'}/>optimization process
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[300] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                            A Comprehensive, Data-Driven Approach to Enhancing App Visibility, Driving Qualified Organic
                            Installs, and Optimizing Store Performance for Sustainable Growth.
                        </p>
                    </div>
                </div>

                {/* Kickoff Meeting */}
                <div id={'kickoff-meeting'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'lg:text-gray-700 lg:hover:text-white md:text-gray-700 md:hover:text-white text-white' : 'lg:text-gray-300 lg:hover:text-black md:text-gray-300 md:hover:text-black text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Kickoff Meeting
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Our process begins with a thorough understanding of our clients’ KPIs and objectives,
                            including their goals, flexibility within brand guidelines, tolerance for experimentation,
                            and other critical data points. By capturing these insights upfront, we are able to design
                            and implement a highly tailored ASO strategy that aligns with their vision, maximizes
                            performance, and drives measurable results across all app store metrics.
                        </p>
                    </div>
                </div>

                {/* Keyword & Competitor Research */}
                <div id={'keyword-competitor-research'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'lg:text-gray-700 lg:hover:text-white md:text-gray-700 md:hover:text-white text-white' : 'lg:text-gray-300 lg:hover:text-black md:text-gray-300 md:hover:text-black text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] capitalize font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Keyword and Competitor <br className={'lg:block md:block hidden'}/>Research
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            We conduct in-depth analysis and ongoing monitoring of over 5,000 keywords, providing a
                            comprehensive initial report that outlines our strategic recommendations across all content
                            areas. This includes detailed, actionable insights and tailored proposals for each app
                            store, ensuring that every optimization decision is data-driven and designed to maximize
                            visibility, engagement, and growth.
                        </p>
                    </div>
                </div>

                {/* Monitoring & optimizing */}
                <div id={'Monitoring & optimizing '}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'lg:text-gray-700 lg:hover:text-white md:text-gray-700 md:hover:text-white text-white' : 'lg:text-gray-300 lg:hover:text-black md:text-gray-300 md:hover:text-black text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] capitalize font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Monitoring & optimizing
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            We continuously track rankings and download performance across both the Apple App Store and
                            Google Play. Grey InfoTech differentiates itself through deep mobile expertise, going beyond
                            surface-level metrics to understand the drivers behind each trend and insight. This
                            informed, analytical approach enables us to refine ASO strategies with precision and deliver
                            significantly higher organic installs through sustained, data-driven optimization.
                        </p>
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
                                <h2 className="lg:text-[3.2em] md:text-[3em] sm:text-[2em] text-[1.5em] text-start font-[600]">
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
                        {/* LEFT TABS */}
                        <div className="border border-slate-700 rounded-md overflow-hidden">
                            {items.map((tech) => {
                                const isActive = tech.id === active.id;
                                return (
                                    <button
                                        key={tech.id}
                                        onClick={() => setActive(tech)}
                                        className={
                                            "w-full text-left px-4 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6 flex items-center justify-between border-b border-slate-700 transition " +
                                            (isActive
                                                ? "bg-slate-800 text-white"
                                                : "text-slate-400 hover:text-white hover:bg-slate-900/60")
                                        }
                                    >
          <span className="font-medium text-sm sm:text-base">
            {tech.title}
          </span>
                                        <span
                                            className={
                                                "text-lg sm:text-xl " +
                                                (isActive ? "text-teal-400" : "text-slate-500")
                                            }
                                        >
            →
          </span>
                                    </button>
                                );
                            })}
                            <div className="h-1 bg-teal-400"/>
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

            {/* Business Benefits of ASO */}
            <div id={'business benefit'}
                 className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                {/* Business Benefit Header */}
                <div
                    className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[2em] lg:mb-[5em] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div>
                        <h2 className='text-[2em] text-start md:text-[2em] lg:text-[3em] font-[700] tracking-normal leading-[1.15] lg:pb-6'>
                            App Store Optimization <br className={'lg:block md:block hidden'}/>Business
                            Benefits
                        </h2>
                    </div>
                    <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                        <p className={'text-justify text-[0.87em] font-[300]'}>
                            App Store Optimization is a strategic growth lever that maximizes your app’s organic
                            visibility, drives high-quality user acquisition, strengthens brand credibility through
                            higher ratings and reviews, optimizes conversion rates, and enables scalable, cost-effective
                            expansion across competitive global marketplaces, delivering measurable, sustainable
                            business impact and long-term ROI.
                        </p>
                    </div>
                </div>

                {/* Benefits */}
                <div
                    className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]  ${
                        isDayTime ? 'text-black' : 'text-white'
                    } lg:mt-28 md:mt-28 mt-6`}>
                    <div id={'discoverability'}>
                        <Image
                            src={isDayTime ? '/assets/front/icon2/test.svg' : '/assets/front/icon2/test1.svg'}
                            alt={'Discoverability'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Discoverability
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Enhances your app’s presence in the App Store and Google Play, ensuring it is easily found
                            by users actively searching for relevant solutions. By strategically optimizing keywords,
                            metadata, and store listing content, ASO maximizes exposure at the point of intent,
                            connecting your app with the right audience when it matters most.
                        </p>
                    </div>
                    <div id={'brand-awareness'}>
                        <Image
                            src={isDayTime ? '/assets/front/icon2/fast.svg' : '/assets/front/icon2/fast1.svg'}
                            alt={'Brand Awareness'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Brand Awareness
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Strengthens the visibility and recognition of your app in a competitive marketplace. A
                            well-optimized store presence, supported by compelling visuals, clear messaging, and social
                            proof, positions your app as credible and trustworthy, enhancing user confidence, brand
                            perception, and long-term engagement.
                        </p>
                    </div>
                    <div id={'conversions'}>
                        <Image
                            src={isDayTime ? '/assets/front/icon2/att.svg' : '/assets/front/icon2/att1.svg'}
                            alt={'Conversions'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Conversions
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Transforms store visitors into active users by optimizing the app listing to clearly
                            communicate value and benefits. Strategic improvements to app icons, screenshots, preview
                            videos, and descriptions drive higher conversion rates, ensuring that increased visibility
                            translates into measurable downloads and user engagement.
                        </p>
                    </div>
                    <div id={'organic-growth'}>
                        <Image
                            src={isDayTime ? '/assets/front/icon2/fast.svg' : '/assets/front/icon2/fast1.svg'}
                            alt={'Organic Growth'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Organic Growth
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Facilitates sustained, cost-effective expansion by attracting users naturally through
                            enhanced store visibility and search ranking. Organic growth builds a high-quality, loyal
                            user base without heavy reliance on paid advertising, improving return on investment and
                            supporting long-term scalability.
                        </p>
                    </div>
                    <div id={'acquisition'}>
                        <Image
                            src={isDayTime ? '/assets/front/icon2/fast.svg' : '/assets/front/icon2/fast1.svg'}
                            alt={'Acquisition'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Acquisition
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Complements paid marketing initiatives by optimizing the app’s store presence to attract and
                            engage high-quality users efficiently. ASO enhances acquisition strategies by improving the
                            effectiveness of campaigns, reducing cost per install, and ensuring that new users are more
                            likely to convert and remain active.
                        </p>
                    </div>
                    <div id={'ranking'}>
                        <Image
                            src={isDayTime ? '/assets/front/icon2/cust.svg' : '/assets/front/icon2/cust1.svg'}
                            alt={'Ranking'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Ranking
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Improves performance in search results and category charts, reinforcing credibility and
                            authority within app stores. Higher rankings increase visibility and drive a positive
                            feedback loop, resulting in more downloads, better user engagement, and sustained
                            competitive advantage over time.
                        </p>
                    </div>
                </div>
            </div>

            {/* last image*/}
            <div id={'last image'} className={'h-auto max-w-full w-full mx-auto'}>
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

            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] lg:mb-[8em] md:mb-[8em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] md:pb-[2em] pb-[1em] lg:mb-28 md:mb-28 mb-8'}>
                        <h2 className='capitalize lg:text-[3em] md:text-[2em] text-[2em] font-[700] leading-[1.2] tracking-tight mb-8'>
                            Frequently Asked <br className={'lg:block md:block hidden'}/>App Store <br
                            className={'lg:block md:block hidden'}/>Optimization (ASO) <br className={'lg:block md:block hidden'}/>Questions
                        </h2>
                    </div>
                </div>
                <div className='relative mx-auto px-4 sm:px-6 lg:px-[12em] space-y-1'>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(0)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none"
                        >
                            <span>How Grey InfoTech Elevates App Visibility in Stores?</span>
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
                                Grey InfoTech enhances the discoverability and performance of your app by employing a
                                comprehensive App Store Optimization strategy. Our approach includes meticulous
                                optimization of app metadata, strategic keyword selection, and visually compelling
                                assets, ensuring your app stands out in highly competitive marketplaces. Additionally,
                                we implement continuous A/B testing and performance analysis to refine user engagement
                                and conversion rates, aligning every element with user intent and market trends. By
                                combining data-driven insights with industry best practices, we help your app achieve
                                higher visibility, attract quality users, and maximize organic growth across both the
                                App Store and Google Play.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Does ASO Impact Both iOS and Android?</span>
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
                                Absolutely. Grey InfoTech implements App Store Optimization strategies specifically
                                tailored to the unique algorithms and ranking factors of both Apple’s App Store and
                                Google Play Store. By customizing approaches for each platform—ranging from metadata
                                optimization and keyword strategy to visual assets and user engagement tactics—we ensure
                                your app achieves maximum visibility, higher rankings, and increased downloads across
                                both ecosystems.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Can ASO Improve Conversion Rates?</span>
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
                                Yes. By strategically optimizing your app’s visual assets, descriptions, and metadata,
                                we enhance its appeal and clarity to potential users, making it easier for them to
                                understand your app’s value. Coupled with data-driven A/B testing and continuous
                                refinement, these improvements increase the likelihood of downloads, improve user
                                engagement, and maximize conversion rates, ultimately driving measurable growth for your
                                app.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How Often Should ASO Be Updated?</span>
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
                                We recommend reviewing and updating your App Store Optimization strategy every 4 to 6
                                weeks to ensure optimal performance. Updates are guided by data-driven insights,
                                seasonal trends, and shifts in user behavior, allowing your app to remain competitive,
                                maintain high visibility, and continuously attract quality downloads. Regular
                                optimization ensures that both metadata and visual assets are aligned with evolving
                                market conditions and platform algorithm changes.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>How Do You Measure ASO Success?</span>
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
                                We measure the success of App Store Optimization through a comprehensive set of
                                performance metrics, including search impressions, keyword rankings, install growth, and
                                conversion rates. By continuously analyzing these indicators, we gain clear visibility
                                into discoverability, user acquisition efficiency, and overall store performance. This
                                data-driven approach enables ongoing optimization, ensuring sustained growth, improved
                                visibility, and measurable ROI across both the App Store and Google Play.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default AppStoreOptimization;