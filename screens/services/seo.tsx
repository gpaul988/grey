'use client';


import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import '@/app/globals.css';
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
import Link from "next/link";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import CountUp from "react-countup";
import {useIsDayTime} from '../../components/useIsDayTime';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxStickyScrollSection, FxScrollItem } from '@/components/futuristic/fx';
const Seo = () => {    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target: targetRef});
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);


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
            "KRO",
            "TSEO",
            "LBS",
            "OPSE",
            "LSEO",
            "CSTRAT",
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

    // Our Discovery Process Hook
    const imageIds = useMemo(() => [
        "The Digital Phase",
        "Dedicated FinTech Engineers",
        "Security & Regulatory Compliance",
        "DevOps",
        "Quality Assurance",
        "Product Development",
    ], []);

    const handleScrollStages = useCallback(() => {
        for (const imageId of imageIds) {
            const textElement = document.getElementById(imageId);
            const imageElement = document.getElementById(imageId);

            if (textElement && imageElement) {
                const textRect = textElement.getBoundingClientRect();
                const screenCenter = window.innerHeight / 2;

                if (textRect.top <= screenCenter && textRect.bottom >= screenCenter) {
                    setActiveId(imageId);
                    break;
                }
            }
        }
    }, [imageIds]);

    useEffect(() => {
        window.addEventListener("scroll", handleScrollStages);
        return () => {
            window.removeEventListener("scroll", handleScrollStages);
        };
    }, [handleScrollStages]);

    // Countup hook for Digital partners
    const stats = [
        {label: 'Years Experience', value: 8, suffix: '+'},
        {label: 'Team Members', value: 10, suffix: '+'},
        {label: 'Products Launched', value: 150, suffix: '+'},
        {label: 'Successful rebrands', value: 27, suffix: '+'},
        {label: 'Increase in Website Traffic', value: 350, suffix: '%'},
    ];

// Reasons
    const reasons = [
        {
            id: 1,
            title: 'End-to-End Expertise',
            description: (
                <>
                    We provide end-to-end mobile app development services, covering everything from initial consulting
                    and
                    UX/UI design to robust backend infrastructure, development, deployment, and ongoing support. Whether
                    you&#39;re a <Link href='/Startups'
                                       className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>startup</Link> looking
                    to launch or an established enterprise aiming to innovate, we manage the entire
                    lifecycle—ensuring your app is not only functional and scalable but also aligned with your business
                    goals.
                </>
            ),
            images: ['/assets/fin/grey.jpg']
        },
        {
            id: 2,
            title: 'Bespoke Solutions',
            description: (
                <>
                    At Grey InfoTech, we reject the one-size-fits-all approach. Instead, we invest time in understanding
                    your specific business objectives, user expectations, and industry dynamics to craft
                    tailored <Link href='/services/Mobile-Application-Development'
                                   className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>mobile
                    applications</Link>. Our focus is on delivering solutions that create measurable value, enhance user
                    engagement, and give your business a competitive edge in the marketplace.
                </>
            ),
            images: ['/assets/fin/grey1.jpg']
        },
        {
            id: 3,
            title: 'Proven Track Record',
            description: (
                <>
                    Our team brings proven expertise across diverse industries such
                    as <Link href='/industries/fintech'
                             className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>fintech</Link>,
                    proptech, and beyond. With a portfolio of award-winning mobile applications, we consistently deliver
                    high-performance, scalable solutions designed to drive measurable business results and foster
                    lasting success.
                </>
            ),
            images: ['/assets/fin/grey2.jpg']
        },
        {
            id: 4,
            title: 'Technology Innovation',
            description: (
                <>
                    We stay ahead of the curve by leveraging the latest technologies, frameworks, and integrations.
                    Whether developing native apps or cross-platform solutions, we ensure your product is built with the
                    most efficient, scalable, and future-proof technology to maximize performance and longevity.
                </>
            ),
            images: ['/assets/fin/grey.jpg']
        },
        {
            id: 5,
            title: 'Ongoing Support & Maintenance',
            description: (
                <>
                    Our partnership extends well beyond launch. We provide ongoing support, including regular updates,
                    security patches, and feature enhancements, ensuring your app remains secure, up-to-date, and
                    optimally aligned with your evolving business needs.
                </>
            ),
            images: ['/assets/fin/grey.jpg']
        },
    ];

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            <ServiceHero
                title="Search Engine Optimisation (SEO)"
                subtitle="Smart SEO strategies tailored for business success"
                accentColor="#00f5d4"
                variant="particles"
                badges={["Technical SEO","Content Strategy","Link Building","Local SEO","Analytics & Reporting"]}
                ctaHref="/contact"
                ctaLabel="Request a free audit"
            />

            {/* Introductory section (futuristic style) */}
            <section
                ref={sectionRef}
                data-bg={isBackgroundActive ? (isDayTime ? 'Dark' : 'Light') : (isDayTime ? 'Light' : 'Dark')}
                className={`pt-16 transition-colors duration-500 ${
                    isBackgroundActive
                        ? isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                        : isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                <FxBackground day={isDayTime}/>
                <div className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>SEO OPTIMIZATION</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Dominate Search Rankings with Strategic <span className="gx-gradient-text">SEO</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div>
                                    <p>Our SEO services are engineered to increase your visibility in search engines, drive targeted organic traffic, and establish your website as an authority in your industry.</p>
                                </div>
                                <div>
                                    <p>We combine technical excellence, data-driven strategies, and creative content optimization to help your business achieve sustained rankings and measurable growth in competitive search landscapes.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Keyword Research', 'Technical Audit', 'Link Building', 'Content Strategy'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* SEO services overview - Enhanced with FxStickyScrollSection */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>SEO<br/>services overview</>}
                intro="Our SEO services are engineered to increase your visibility in search engines, drive targeted organic traffic, and establish your website as an authority in your industry. We combine technical excellence, data-driven strategies, and creative content optimization to help your business achieve sustained rankings and measurable growth in competitive search landscapes."
                navLabel="SEO Solutions"
                activeId={activeId}
                onNavClick={scrollToSection}
                items={[
                    {
                        id: "01",
                        title: "Keyword Research & Optimization",
                        target: "KRO",
                        tags: ["Keywords", "Analysis", "Competitiveness"],
                        body: (
                            <p>
                                Keyword research and optimization form the foundation of effective SEO. We identify high-value keywords aligned with your business goals and user intent, then strategically incorporate them into your site's title tags, meta descriptions, headings, and content. Our data-driven approach ensures every keyword targets real search demand, maximizes visibility in competitive markets, and drives qualified traffic that converts into measurable business results.
                            </p>
                        ),
                    },
                    {
                        id: "02",
                        title: "Technical SEO Audit",
                        target: "TSEO",
                        tags: ["Site Structure", "Crawlability", "Indexation"],
                        body: (
                            <p>
                                Technical SEO ensures your website is properly structured, easily crawlable by search engines, and fully indexed. We conduct comprehensive audits examining site architecture, page speed, mobile responsiveness, XML sitemaps, robots.txt configuration, and structured data markup. By identifying and resolving technical issues, we lay the groundwork for improved rankings, better user experience, and sustained organic visibility across search engines.
                            </p>
                        ),
                    },
                    {
                        id: "03",
                        title: "Link Building Strategy",
                        target: "LBS",
                        tags: ["Backlinks", "Authority", "Domain Strength"],
                        body: (
                            <p>
                                Strategic link building establishes your website's authority and credibility in the eyes of search engines. We secure high-quality backlinks from reputable, relevant sources through targeted PR and outreach efforts. Each link is carefully vetted to ensure it adds genuine value, drives referral traffic, and supports your long-term SEO success without risking penalties from poor-quality link sources.
                            </p>
                        ),
                    },
                    {
                        id: "04",
                        title: "On-Page SEO",
                        target: "OPSE",
                        tags: ["Content", "Meta Tags", "Schema Markup"],
                        body: (
                            <p>
                                On-page SEO optimization focuses on refining elements within your website to improve visibility and relevance. We enhance site navigation, optimize internal linking structures, craft compelling headings and meta tags aligned with target keywords, and create high-quality content that engages users and search engines alike. This comprehensive approach strengthens your overall online presence and conversion potential.
                            </p>
                        ),
                    },
                    {
                        id: "05",
                        title: "Local SEO",
                        target: "LSEO",
                        tags: ["Google My Business", "Local Citations", "Reviews"],
                        body: (
                            <p>
                                Local SEO helps your business dominate search results in your geographic area. We optimize your Google My Business profile, manage local citations across authoritative directories, encourage and respond to customer reviews, and implement location-based schema markup. This localized approach drives foot traffic, local inquiries, and establishes your business as a trusted community resource.
                            </p>
                        ),
                    },
                    {
                        id: "06",
                        title: "Content Strategy",
                        target: "CSTRAT",
                        tags: ["Blog Posts", "Pillar Pages", "Topical Clusters"],
                        body: (
                            <p>
                                Strategic content creation addresses user intent while supporting your SEO objectives. We develop comprehensive content calendars featuring blog posts, pillar pages, and topical clusters that establish your expertise and address the full customer journey. Each piece is optimized for target keywords, designed to engage and inform, and structured to drive both organic traffic and meaningful business conversions.
                            </p>
                        ),
                    },
                ]}
            />

            {/* Service item sections with IDs for scroll tracking */}
            <div id="KRO" className="scroll-mt-20" />
            <div id="TSEO" className="scroll-mt-20" />
            <div id="LBS" className="scroll-mt-20" />
            <div id="OPSE" className="scroll-mt-20" />
            <div id="LSEO" className="scroll-mt-20" />
            <div id="CSTRAT" className="scroll-mt-20" />

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

            {/* Research */}
            <div
                className={` lg:pt-[2em] h-auto border-b border-white max-w-full w-full mx-auto ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-4'}>
                            <Image
                                src={'/assets/seo/research.jpg'}
                                alt={'Research'}
                                width={4650}
                                height={500}
                            />
                        </div>
                        <div
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mt-[1.5em] md:mt-[1.5em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] mb-8 mr-[2em] md:text-[3.2em] lg:text-[3.2em] w-auto h-auto md:mr-[2.5em] lg:mr-[5em]'>
                                Research
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify  leading-[1.5] lg:mr-[9em] md:mr-[9em]'>
                                Search Engine Optimization (SEO) is a strategic, long-term investment critical to
                                enhancing your online presence and driving sustainable business growth. Success begins
                                with a deep understanding of your industry, business objectives, and target audience. We
                                start every SEO engagement with comprehensive market research and a detailed audit of
                                your website using industry-leading tools. This process uncovers performance gaps,
                                technical issues, and opportunities to refine your digital strategy.<br/><br/>

                                Contrary to common misconceptions, effective SEO extends beyond a handful of generic
                                keywords. Our approach involves crafting a diversified keyword strategy tailored to your
                                business, targeting a wide range of relevant search terms across your website’s pages.
                                This ensures that all areas of your site attract qualified traffic, maximizing
                                visibility and engagement throughout the customer journey.<br/><br/>

                                By implementing this holistic SEO strategy, your business benefits from increased
                                organic search traffic, improved user experience, and higher conversion rates. Our focus
                                on measurable outcomes and continuous optimization ensures that your website not only
                                ranks well in search engines but also delivers tangible business results over time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Keyword Research */}
            <div className={`border-b ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={`lg:mt-[4em] md:mt-[4em] lg:-mr-[5.4em] md:-mr-[5.4em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] pb-8 md:text-[3.2em] lg:text-[3.2em] w-auto h-auto '>
                                Keyword Research
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.5em] leading-[1.5] lg:mr-[2em]'>
                                Selecting the right keywords is fundamental to driving meaningful traffic and business
                                growth through search marketing. By thoroughly researching your market’s top keywords
                                and understanding your customers’ search behaviour, we identify the most valuable terms
                                and phrases to target with SEO. This targeted approach ensures that you attract visitors
                                who are not just numerous but highly relevant to your business objectives.<br/><br/>

                                Effective keyword research goes beyond simply increasing site traffic; it focuses on
                                drawing the right audience—those most likely to engage and convert. We prioritise
                                keywords based on their relevance, search volume, and profitability, aligning them
                                closely with your competitive strengths and content capabilities.<br/><br/>

                                Starting with keywords where you already have a competitive edge allows us to build
                                momentum quickly and strategically. This refined keyword strategy forms the foundation
                                for sustainable SEO success, driving quality traffic that supports your business goals.
                            </p>
                        </div>
                        <div
                            className={'relative mb-4 w-full h-auto max-w-full lg:pr-[11em] md:pr-[11em] lg:ml-[3.5em] md:ml-[3.5em]'}>
                            <Image
                                src={'/assets/fin/data.jpg'}
                                alt={''}
                                width={400}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Competitors Research */}
            <div className={`border-b ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={`lg:pr-[2.7em] md:pr-[2.7em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] pb-8 md:text-[3.2em] lg:text-[3.2em] w-auto h-auto '>
                                Competitors Research
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.5em] leading-[1.5] lg:-mr-[4.3em] md:-mr-[4.3em]'>
                                During the Competitor Research phase, we begin by identifying who your true digital
                                competitors are—those ranking for the keywords your target audience is actively
                                searching. This often includes both direct business rivals and companies outside your
                                industry competing for online visibility. We assess their content strategies, technical
                                SEO health, backlink profiles, and overall search performance to map out the competitive
                                landscape with precision.<br/><br/>

                                Our research goes beyond surface-level analysis. We use advanced SEO tools to uncover
                                the keywords your competitors are ranking for, how they structure their content, and
                                which tactics they use to drive authority. This allows us to benchmark your current
                                standing and identify strategic opportunities for growth based on what’s working in your
                                space.<br/><br/>

                                We then filter and validate these competitors based on relevance, keyword overlap, and
                                traffic value. This stage helps us focus on the players that truly influence your
                                rankings and market share. Simultaneously, we revisit and refine the keyword list to
                                align with findings from the competitor review, ensuring high-impact terms are
                                prioritized.<br/><br/>

                                The insights gathered form the foundation of your tailored SEO strategy. From on-page
                                recommendations to long-term content planning, everything is informed by a solid
                                understanding of your digital competition. With a clear view of the landscape, we’re
                                able to help you outpace the competition, drive high-quality traffic, and position your
                                business for measurable, long-term success.
                            </p>
                        </div>
                        <div
                            className={'relative mb-4 w-full h-auto max-w-full lg:pr-[11em] md:pr-[11em] lg:ml-[3.5em] md:ml-[3.5em]'}>
                            <Image
                                src={'/assets/seo/compe.jpg'}
                                alt={''}
                                width={400}
                                height={500}
                            />
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

            {/* Implementation */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3.15em] md:text-[3.15em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                            Implementation
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                            With the research phase complete, we move into optimization—implementing targeted
                            improvements that enhance your site’s performance, visibility, and user experience.

                        </p>
                    </div>
                </div>

                {/* Initial Setup */}
                <div id={'initial setup'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            initial setup
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            The initial setup phase is focused on resolving foundational technical and on-page SEO
                            issues that may hinder your website’s visibility and organic performance. This includes
                            addressing broken links, correcting poorly formed HTML, adding missing image metadata, and
                            optimising page titles, meta descriptions, and URL structures to align with SEO best
                            practices. We also implement semantic enhancements such as schema markup, Open Graph tags,
                            and microdata to help search engines better understand your content and improve how it
                            appears in search results. In some cases, adjustments to your website’s template or
                            underlying code may be necessary to support these optimisations. By establishing a
                            technically sound and search-friendly foundation, this phase ensures your site is
                            well-positioned for long-term growth, improved rankings, and increased visibility across
                            relevant search queries.
                        </p>
                    </div>
                </div>

                {/* One-Page Optimisation */}
                <div id={'one-page optimisation'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            One-page <br className={'lg:block md:block hidden'}/>Optimisation
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Once the technical and semantic issues are resolved, we move into the on-page optimisation
                            phase, focusing on enhancing individual pages to boost user engagement and search
                            visibility. This involves reviewing your content to ensure it’s clear, well-structured, and
                            compelling for your target audience. Our copywriters refine and enhance existing copy where
                            needed, improving tone, readability, and relevance to key search terms. We may also
                            recommend and help source high-quality images, videos, or other multimedia assets to enrich
                            your content and elevate user experience. This stage ensures each page is not only optimised
                            for search engines but also resonates with potential customers, driving better results and
                            deeper engagement.
                        </p>
                    </div>
                </div>

                {/* SEO Link Building and Outreach */}
                <div id={'SEO link building and Outreach '}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] capitalize font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            SEO Link Building <br className={'lg:block md:block hidden'}/>and Outreach
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            In addition to on-site optimisation, off-site factors—especially backlinks—play a critical
                            role in search engine rankings. Building a strong backlink profile enhances your website’s
                            authority and credibility, signaling to search engines that your content is trustworthy and
                            relevant. We implement targeted strategies to earn high-quality, relevant backlinks by
                            promoting your content through digital PR, industry blogs, and social platforms. Our
                            approach not only drives referral traffic but also strengthens your site&#39;s overall
                            visibility and ranking potential across search engines.
                        </p>
                    </div>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'partners'}
                     className={`relative lg:py-14 md:py-16 lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
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

            {/* SEO Reporting and Reviews */}
            <div className={`${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Monitor Performance, <br className={'lg:block md:block hidden'}/>Ensure Success
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            SEO Reporting and Reviews
                        </h3>
                        <div
                            className=' mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <p>
                                Understanding what’s working is key to measuring SEO success. That’s why we begin every
                                project with a comprehensive benchmark report, capturing your site’s current
                                performance, keyword rankings, and traffic metrics. From there, we track progress month
                                by month, delivering clear performance, traffic, and revenue reports that reflect real
                                value. But we don’t stop at data—we provide expert insights into what’s driving results
                                and offer strategic recommendations for continuous growth and refinement.<br/><br/>

                                Ready to take the next step? Contact us today for a free SEO website audit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Stages of our development process */}
            <div className={`${isDayTime ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-white to-gray-50'} relative overflow-hidden`}>
                <div id={'development process'}
                     className={`lg:pt-[6em] md:pt-[6em] pt-[2em] relative mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-blob" />
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
                    </div>

                    {/* Development Process Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`sticky top-0 z-10 bg-opacity-90 backdrop-blur-xl ${
                            isDayTime ? 'bg-gray-900/95' : 'bg-white/95'
                        } rounded-2xl mb-12`}>
                        <div className={`border-b-[0.1em] ${isDayTime ? 'border-teal-500/30' : 'border-teal-500/20'} pb-[2em] px-6 py-6`}>
                            <motion.h2 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className={`text-[1em] sm:text-[1.5em] md:text-[3.2em] lg:text-[3.2em] font-[700] tracking-tight leading-[1.15] lg:pb-6 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent`}>
                                Stages of Our <br className={'lg:block md:block hidden'}/>Development Process
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className={`text-[0.87em] font-[400] leading-[1.6] tracking-tight mt-3 ${isDayTime ? 'text-gray-300' : 'text-gray-600'}`}>
                                Transforming vision into reality through strategic expertise, technical excellence, and unwavering commitment.
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* X-Scroll */}
                    <section ref={targetRef} className="h-[250vh] relative">
                        <div
                            className="sticky top-52 flex h-[80vh] w-full max-w-full items-center overflow-hidden">
                            <motion.div
                                style={{x}}
                                className="flex lg:gap-[15em] md:gap-[15em] gap-[10em]" 
                            >
                                {[
                                    {
                                        id: 1,
                                        subtitle: "01",
                                        title: (
                                            <>
                                                We're Experienced
                                            </>
                                        ),
                                        description: (
                                            <>
                                                With a proven track record across a wide range of digital projects, we
                                                blend creative thinking, technical precision, strategic insight, and
                                                hands-on execution to deliver solutions that generate measurable
                                                business impact. Our approach is focused on achieving long-term value
                                                and sustainable growth—ensuring that every project not only meets
                                                expectations but drives real results.
                                            </>
                                        ),
                                        icon: '◆'
                                    },
                                    {
                                        id: 2,
                                        subtitle: "02",
                                        title: "We're Proactive",
                                        description: (
                                            <>
                                                You can rely on us to consistently exceed expectations by taking a
                                                proactive, solution-driven approach at every stage of your project. We
                                                identify potential challenges early, offer innovative recommendations
                                                without being asked, and continually look for new ways to deliver added
                                                value. Our commitment is not just to complete the work, but to elevate
                                                it—ensuring outcomes that are smarter, stronger, and aligned with your
                                                long-term goals.
                                            </>
                                        ),
                                        icon: '⚡'
                                    },
                                    {
                                        id: 3,
                                        subtitle: "03",
                                        title: "We're Collaborative",
                                        description: (
                                            <>
                                                While we're passionate about technology, our greatest strength lies in
                                                the people behind it. To us, collaboration means more than just being
                                                easy to work with—it's about becoming a trusted partner who shares your
                                                vision, ambition, and commitment to achieving something exceptional. We
                                                align with your goals, bring fresh thinking to the table, and work side
                                                by side to turn bold ideas into real business outcomes.
                                            </>
                                        ),
                                        icon: '◈'
                                    },
                                    {
                                        id: 4,
                                        subtitle: "04",
                                        title: (
                                            <>
                                                We&#39;re Invested
                                            </>
                                        ),
                                        description: (
                                            <>
                                                When you invest in us, we become fully invested in your business goals.
                                                Every project is approached with a strong sense of ownership and
                                                responsibility, ensuring no detail is overlooked. Our team is committed
                                                to delivering results that meet the highest professional standards,
                                                taking accountability for outcomes, and consistently striving to exceed
                                                expectations. This dedication drives us to deliver solutions that are
                                                not only technically sound but also strategically aligned with your
                                                long-term objectives.
                                            </>
                                        ),
                                        icon: '◉'
                                    },
                                ].map((card, index, array) => (
                                    <motion.div
                                        key={card.id}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.15 }}
                                        className={`group relative h-[380px] w-[420px] overflow-hidden flex flex-col items-start justify-start text-start rounded-3xl p-8 backdrop-blur-sm transition-all duration-500 ${
                                            isDayTime 
                                                ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-teal-500/20 hover:border-teal-500/60 shadow-xl hover:shadow-2xl hover:shadow-teal-500/20' 
                                                : 'bg-gradient-to-br from-white to-gray-50 text-gray-900 border border-teal-400/20 hover:border-teal-400/60 shadow-lg hover:shadow-xl hover:shadow-teal-400/20'
                                        } ${index === array.length - 1 ? 'ml-auto' : ''} before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-gradient-to-r before:from-teal-500/0 before:to-cyan-500/0 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500`}>
                                        
                                        {/* Animated accent line */}
                                        <motion.div 
                                            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '40%' }}
                                            transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                                        />

                                        {/* Icon with glow */}
                                        <motion.div 
                                            className={`text-3xl font-bold mb-4 ${isDayTime ? 'text-teal-400' : 'text-teal-500'}`}
                                            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            {card.icon}
                                        </motion.div>

                                        {/* Subtitle/number */}
                                        <motion.div 
                                            className={`text-[0.85em] font-mono font-[600] tracking-widest uppercase mb-3 px-3 py-1 rounded-full inline-block ${
                                                isDayTime 
                                                    ? 'bg-teal-500/20 text-teal-300' 
                                                    : 'bg-teal-500/15 text-teal-600'
                                            }`}
                                        >
                                            Stage {card.subtitle}
                                        </motion.div>

                                        {/* Title */}
                                        <h2 className={`text-[1.6em] font-[700] mt-3 leading-[1.2] mb-4 group-hover:text-teal-400 transition-colors duration-300`}>
                                            {card.title}
                                        </h2>

                                        {/* Description */}
                                        <p className={`text-[0.85em] font-[400] leading-[1.7] line-clamp-5 ${isDayTime ? 'text-gray-300' : 'text-gray-700'} group-hover:line-clamp-none transition-all duration-300`}>
                                            {card.description}
                                        </p>

                                        {/* Hover indicator */}
                                        <motion.div 
                                            className={`absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${isDayTime ? 'bg-teal-500/20' : 'bg-teal-500/15'} text-teal-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                            animate={{ y: [0, 4, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            →
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>
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

            {/* Why Grey InfoTech for your app project */}
            <div className={`lg:h-full md:h-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:pt-32 lg:pb-14 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-20 mb-12 ${
                        isDayTime ? 'text-black' : 'text-white'}`}>
                    <div
                        className={`relative border-b pb-[1em] border-gray-500 grid lg:grid-cols-2 grid-cols-1  lg:gap-14 gap-6 lg:max-w-full mx-auto`}>
                        <div>
                            <h2 className='lg:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 rounded-none'>
                                Why Grey InfoTech <br className={'lg:block md:block hidden'}/>for your app project
                            </h2>
                        </div>
                        <div className='lg:-ml-[8em]'>
                            <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                We&#39;ve successfully delivered projects across various industries. In this section,
                                you&#39;ll
                                find examples that may align with your needs.
                            </p>
                        </div>
                    </div>
                    <div
                        className='relative lg:mt-[6em] md:mt-[6em] mt-[3em]mx-auto px-4 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-24'>
                        {/* Left Section */}
                        <div
                            className={`relative text-[0.873em] lg:leading-[1.5] ${isDayTime ? 'text-black' : 'text-white'} flex flex-col justify-center mb-4`}>
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
                                                    transition={{duration: 0.3, ease: "easeInOut"}}
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
        </div>
    );
};

export default Seo;