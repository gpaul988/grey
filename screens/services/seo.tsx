'use client';

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import '@/app/globals.css';
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
import Link from "next/link";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import CountUp from "react-countup";
import {useIsDayTime} from '../../components/useIsDayTime';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxHoloCard,
    FxStickyScrollSection,
    FxScrollItem,
    FxSectionHeading,
    FxFrame,
    FxGlitchText,
    FxOrbit
} from '@/components/futuristic/fx';

const Seo = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    // Guarded useScroll: only set target when the ref is hydrated to avoid framer-motion invariant
    const {scrollYProgress} = useScroll({ target: (typeof window !== 'undefined' && targetRef.current) ? targetRef : undefined });
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

    // Client-side SEO audit state & runner (works for same-origin or CORS-enabled targets)
    const [_auditUrl, setAuditUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function runAudit(inputUrl: string) {
        setError(null);
        setResult(null);
        setLoading(true);
        try {
            let u = inputUrl.trim();
            if (!/^https?:\/\//i.test(u)) {
                if (u.startsWith('/')) u = window.location.origin + u;
                else u = 'https://' + u;
            }

            // Call server-side audit endpoint to avoid CORS/CSP issues
            const res = await fetch('/api/seo-audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: u }),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({ error: 'Unknown error' }));
                throw new Error(err?.error || 'Audit failed');
            }

            const payload = await res.json();
            if (!payload.ok) throw new Error(payload.error || 'Audit failed');

            setResult(payload);
        } catch (e:any) {
            setError(e.message || String(e));
        } finally {
            setLoading(false);
        }
    }

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
                    lifecycle -ensuring your app is not only functional and scalable but also aligned with your business
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

            {/* Unified Futuristic SEO Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Background Image/Video */}
                {/* Video Background (plays on desktop, image on mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/seo/hero.jpg"
                >
                    <source src="/assets/seo/hero.mp4" type="video/mp4"/>
                </video>

                {/* Fallback Image Background for Mobile and Video Fallback */}
                <Image
                    src="/assets/seo/hero.jpg"
                    alt="SEO Strategy Hero"
                    fill
                    priority
                    className="lg:hidden object-cover"
                />

                {/* Grid & FX Background */}
                <div className="pointer-events-none absolute inset-0 z-[1]">
                    <FxBackground day={false} grid={true} aurora={true}/>
                </div>

                {/* Gradient Overlay with Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50 z-[2]"/>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.12),transparent_50%)] z-[2]"/>

                {/* Futuristic FX Elements */}
                <div className="pointer-events-none absolute inset-0 z-[3]">
                    <div className="gx-scanline"/>
                    <div className="gx-noise-overlay"/>
                    <div className="gx-orbit absolute"
                         style={{width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .12}}/>
                    <div className="gx-orbit absolute"
                         style={{width: '40vmax', height: '40vmax', bottom: '-15vmax', left: '-10vmax', opacity: .08}}/>
                </div>

                {/* Content Container - Two Column Layout */}
                <div
                    className="absolute inset-0 flex items-center top-32 z-[11] px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Column - Main Content */}
                        <div>
                            {/* Eyebrow with animated dot */}
                            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                                <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"/>
                                <span
                                    className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Search Engine Optimization</span>
                            </div>

                            {/* Main Heading with Gradient */}
                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Dominate Search &amp; <span className="gx-gradient-text">Drive Organic Growth</span>
                            </h1>

                            {/* Description */}
                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                From technical excellence to authority building, we deliver data-driven SEO strategies
                                designed to elevate your rankings, amplify organic visibility, and accelerate revenue
                                growth. Whether you're launching or scaling, our proven approach transforms organic
                                search into your most reliable growth channel.
                            </p>

                            {/* Key Capabilities Pills */}
                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {["Technical SEO", "Content Strategy", "Link Building", "Local SEO", "Analytics", "Keyword Research"].map((badge) => (
                                    <span key={badge}
                                          className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                                            {badge}
                                        </span>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button
                                        className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap"
                                        style={{background: '#2dd4bf', color: '#000'}}>
                                            <span className="absolute inset-0" style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                            }}/>
                                        <span className="relative">Request Free Audit →</span>
                                    </button>
                                </Link>
                                <Link href="/portfolio">
                                    <button
                                        className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap"
                                        style={{border: `1px solid rgba(255,255,255,0.15)`}}>
                                        View Case Studies
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column - Impact Stats */}
                        <div className="hidden lg:flex flex-col items-end">
                            <div className="grid grid-cols-2 gap-6 w-full">
                                {[
                                    {label: 'Projects Delivered', value: '500+'},
                                    {label: 'Years of Expertise', value: '8+'},
                                    {label: 'Client Retention', value: '95%'},
                                    {label: 'Avg ROI Growth', value: '300%'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className="px-6 py-5 rounded-2xl border border-teal-400/25 bg-teal-400/8 backdrop-blur-md hover:bg-teal-400/12 transition-all duration-300 hover:border-teal-400/50 text-right">
                                        <div
                                            className="text-teal-300 text-[0.7em] uppercase tracking-wider font-[600] mb-2">{stat.label}</div>
                                        <div
                                            className="text-white text-[1.8em] font-[700]">{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Stats - Visible on small screens only */}
                <div className="lg:hidden absolute bottom-12 left-0 right-0 z-[11] px-6">
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            {label: 'Projects', value: '500+'},
                            {label: 'Experts', value: '12+'},
                            {label: 'Retention', value: '95%'}
                        ].map((stat) => (
                            <div key={stat.label}
                                 className="px-3 py-2 rounded-xl border border-teal-400/25 bg-teal-400/8 backdrop-blur-md">
                                <div
                                    className="text-teal-300 text-[0.5em] uppercase tracking-wider font-[600] mb-1">{stat.label}</div>
                                <div
                                    className="text-white text-[1.2em] font-[700]">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Animated Particles */}
                <div className="absolute top-1/4 left-8 z-[4] w-2 h-2 rounded-full bg-teal-400 animate-pulse"/>
                <div className="absolute bottom-1/3 right-12 z-[4] w-3 h-3 rounded-full bg-teal-500 animate-pulse"
                     style={{animationDelay: '0.5s'}}/>
                <div className="absolute top-3/4 left-1/3 z-[4] w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
                     style={{animationDelay: '1s'}}/>
            </section>

            {/* Introductory section (futuristic style) */}

            {/* Instant SEO Audit moved to the central Audit screen. Visit the Audit page for the fully-featured, instant SEO console. */}
            <section className={`relative py-12 px-6 ${isDayTime ? 'bg-white' : 'bg-black'}`}>
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">Instant SEO Audit (moved)</h3>
                <p className="text-sm text-gray-500 mb-4">This quick-audit console has been moved to the site-wide Audit tool for a more powerful, secure, and consistent experience.</p>
                <a href="/audit" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 text-black font-semibold">Open Audit Console →</a>
              </div>
            </section>
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
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>SEO OPTIMIZATION</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Dominate Search Rankings with Strategic <span className="gx-gradient-text">SEO</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div>
                                    <p>Our SEO services are engineered to increase your visibility in search engines,
                                        drive targeted organic traffic, and establish your website as an authority in
                                        your industry.</p>
                                </div>
                                <div>
                                    <p>We combine technical excellence, data-driven strategies, and creative content
                                        optimization to help your business achieve sustained rankings and measurable
                                        growth in competitive search landscapes.</p>
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
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: "01",
                        title: "Keyword Research & Optimization",
                        target: "KRO",
                        tags: ["Keywords", "Analysis", "Competitiveness"],
                        body: (
                            <p>
                                Keyword research and optimization form the foundation of effective SEO. We identify
                                high-value keywords aligned with your business goals and user intent, then strategically
                                incorporate them into your site's title tags, meta descriptions, headings, and content.
                                Our data-driven approach ensures every keyword targets real search demand, maximizes
                                visibility in competitive markets, and drives qualified traffic that converts into
                                measurable business results.
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
                                Technical SEO ensures your website is properly structured, easily crawlable by search
                                engines, and fully indexed. We conduct comprehensive audits examining site architecture,
                                page speed, mobile responsiveness, XML sitemaps, robots.txt configuration, and
                                structured data markup. By identifying and resolving technical issues, we lay the
                                groundwork for improved rankings, better user experience, and sustained organic
                                visibility across search engines.
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
                                Strategic link building establishes your website's authority and credibility in the eyes
                                of search engines. We secure high-quality backlinks from reputable, relevant sources
                                through targeted PR and outreach efforts. Each link is carefully vetted to ensure it
                                adds genuine value, drives referral traffic, and supports your long-term SEO success
                                without risking penalties from poor-quality link sources.
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
                                On-page SEO optimization focuses on refining elements within your website to improve
                                visibility and relevance. We enhance site navigation, optimize internal linking
                                structures, craft compelling headings and meta tags aligned with target keywords, and
                                create high-quality content that engages users and search engines alike. This
                                comprehensive approach strengthens your overall online presence and conversion
                                potential.
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
                                Local SEO helps your business dominate search results in your geographic area. We
                                optimize your Google My Business profile, manage local citations across authoritative
                                directories, encourage and respond to customer reviews, and implement location-based
                                schema markup. This localized approach drives foot traffic, local inquiries, and
                                establishes your business as a trusted community resource.
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
                                Strategic content creation addresses user intent while supporting your SEO objectives.
                                We develop comprehensive content calendars featuring blog posts, pillar pages, and
                                topical clusters that establish your expertise and address the full customer journey.
                                Each piece is optimized for target keywords, designed to engage and inform, and
                                structured to drive both organic traffic and meaningful business conversions.
                            </p>
                        ),
                    },
                ]}
            />

            {/* Service item sections with IDs for scroll tracking */}
            <div id="KRO" className="scroll-mt-20"/>
            <div id="TSEO" className="scroll-mt-20"/>
            <div id="LBS" className="scroll-mt-20"/>
            <div id="OPSE" className="scroll-mt-20"/>
            <div id="LSEO" className="scroll-mt-20"/>
            <div id="CSTRAT" className="scroll-mt-20"/>

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

            <div
                className={`relative max-w-auto lg:py-32 py-16 ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                {/* Aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>YOUR SEO ADVENTURE</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-black/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-white/30' : 'text-black/30'}`}>RESEARCH</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <FxReveal className="lg:order-2">
                            <div className="relative">
                                <div
                                    className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-teal-400 rounded-tl-sm z-10"/>
                                <div
                                    className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-teal-400 rounded-tr-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-teal-400 rounded-bl-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-teal-400 rounded-br-sm z-10"/>
                                <div className="absolute inset-0 rounded-2xl opacity-40"
                                     style={{boxShadow: '0 0 60px -10px rgba(45,212,191,0.5)'}}/>
                                <div className="relative overflow-hidden rounded-2xl">
                                    <Image src={'/assets/seo/research.jpg'} alt={'Research'} width={900} height={500}
                                           className="w-full object-cover rounded-2xl"/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{background: 'linear-gradient(135deg, rgba(45,212,191,0.12) 0%, transparent 60%)'}}/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.03) 3px, rgba(45,212,191,0.03) 4px)'}}/>
                                    <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                                                viewport={{once: true}} transition={{delay: 0.4}}
                                                className="absolute bottom-5 left-5 px-4 py-2 rounded-full backdrop-blur-md text-[0.72em] font-semibold tracking-wider text-teal-300"
                                                style={{
                                                    background: 'rgba(0,0,0,0.65)',
                                                    border: '1px solid rgba(45,212,191,0.35)'
                                                }}>
                                        - Market Audits · Technical SEO · Site Structure
                                    </motion.div>
                                </div>
                                <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}}
                                            viewport={{once: true}}
                                            transition={{delay: 0.5, type: 'spring', stiffness: 120}}
                                            className="absolute -right-6 top-10 hidden lg:block">
                                    <div className="rounded-2xl px-5 py-4 backdrop-blur-xl text-center min-w-[110px]"
                                         style={{
                                             background: isDayTime ? 'rgba(15,15,15,0.85)' : 'rgba(255,255,255,0.85)',
                                             border: '1px solid rgba(45,212,191,0.35)'
                                         }}>
                                        <div className="text-[2em] font-[900] text-teal-400 leading-none">Pro</div>
                                        <div
                                            className={`text-[0.65em] font-[600] tracking-widest mt-1 uppercase ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>Insights
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FxReveal>

                        <div className="lg:order-1">
                            <FxReveal delay={0.1}>
                                <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8">Research-driven <span
                                    className="gx-gradient-text">SEO</span><br/><span
                                    className={`text-[0.65em] font-[300] ${isDayTime ? 'text-white/50' : 'text-black/50'}`}>starts here.</span>
                                </h2>
                            </FxReveal>
                            <FxReveal delay={0.18}>
                                <p className={`text-[0.95em] leading-[1.8] mb-6 ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>We
                                    perform deep market audits, crawl analyses, and technical reviews to uncover
                                    structural and content opportunities. Our goal is measurable uplift - more
                                    visibility, better rankings, and higher-quality traffic tailored to business
                                    outcomes.</p>
                            </FxReveal>
                            <FxReveal delay={0.24}>
                                <p className={`text-[0.95em] leading-[1.8] mb-10 pb-10 border-b ${isDayTime ? 'text-white/75 border-white/10' : 'text-black/70 border-black/10'}`}>We
                                    prioritise high-impact fixes and create a roadmap combining quick wins and long-term
                                    authority building. Everything is tracked and reported back with clear KPIs.</p>
                            </FxReveal>
                            <FxReveal delay={0.3}>
                                <div className="flex flex-wrap gap-3 mb-10">
                                    {['Market Audits', 'Technical SEO', 'Crawl Optimisation', 'Content Gaps'].map(i => (
                                        <span key={i}
                                              className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border ${isDayTime ? 'border-teal-400/30 text-teal-300 bg-teal-400/08' : 'border-teal-700/30 text-teal-700 bg-teal-700/06'}`}>{i}</span>
                                    ))}
                                </div>
                            </FxReveal>
                            <FxReveal delay={0.36}>
                                <p className={`text-[0.88em] font-[400] mb-6 ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>Ready
                                    to start with a data-driven audit?</p>
                                <FxButton day={!isDayTime} href="/contact" variant="solid">Request an audit <span
                                    className="text-[1.2em] leading-none ml-1">→</span></FxButton>
                            </FxReveal>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`relative lg:py-32 py-16 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(13,148,136,0.07)' : 'rgba(45,212,191,0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(13,148,136,0.07)' : 'rgba(45,212,191,0.06)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                {/* Aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>YOUR SEO ADVENTURE</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-black/10' : 'bg-white/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-black/30' : 'text-white/30'}`}>DISCOVERY</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <FxReveal>
                            <div className="relative">
                                <div
                                    className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-teal-400 rounded-tl-sm z-10"/>
                                <div
                                    className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-teal-400 rounded-tr-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-teal-400 rounded-bl-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-teal-400 rounded-br-sm z-10"/>
                                <div className="absolute inset-0 rounded-2xl opacity-40"
                                     style={{boxShadow: '0 0 60px -10px rgba(45,212,191,0.5)'}}/>
                                <div className="relative overflow-hidden rounded-2xl">
                                    <Image src={'/assets/fin/data.jpg'} alt={'Keyword Research'} width={900}
                                           height={500} className="w-full object-cover rounded-2xl"/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{background: 'linear-gradient(135deg, rgba(45,212,191,0.12) 0%, transparent 60%)'}}/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.03) 3px, rgba(45,212,191,0.03) 4px)'}}/>
                                    <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                                                viewport={{once: true}} transition={{delay: 0.4}}
                                                className="absolute bottom-5 left-5 px-4 py-2 rounded-full backdrop-blur-md text-[0.72em] font-semibold tracking-wider text-teal-300"
                                                style={{
                                                    background: 'rgba(0,0,0,0.65)',
                                                    border: '1px solid rgba(45,212,191,0.35)'
                                                }}>
                                        - Topical Clusters · Intent Mapping · SERP Analysis
                                    </motion.div>
                                </div>
                                <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}}
                                            viewport={{once: true}}
                                            transition={{delay: 0.5, type: 'spring', stiffness: 120}}
                                            className="absolute -right-6 top-10 hidden lg:block">
                                    <div className="rounded-2xl px-5 py-4 backdrop-blur-xl text-center min-w-[110px]"
                                         style={{
                                             background: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(15,15,15,0.85)',
                                             border: '1px solid rgba(45,212,191,0.35)'
                                         }}>
                                        <div className="text-[2em] font-[900] text-teal-400 leading-none">Pro</div>
                                        <div
                                            className={`text-[0.65em] font-[600] tracking-widest mt-1 uppercase ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>Insights
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FxReveal>

                        <div>
                            <FxReveal delay={0.1}>
                                <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8">Data-led <span
                                    className="gx-gradient-text">keyword</span> strategy<br/><span
                                    className={`text-[0.65em] font-[300] ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>starts here.</span>
                                </h2>
                            </FxReveal>
                            <FxReveal delay={0.18}>
                                <p className={`text-[0.95em] leading-[1.8] mb-6 ${isDayTime ? 'text-black/70' : 'text-white/75'}`}>We
                                    identify high-value terms, map intent, and prioritise opportunities that deliver
                                    ROI. Using search data and competitor insights, we build keyword clusters to power
                                    content and growth.</p>
                            </FxReveal>
                            <FxReveal delay={0.24}>
                                <p className={`text-[0.95em] leading-[1.8] mb-10 pb-10 border-b ${isDayTime ? 'text-black/70 border-black/10' : 'text-white/75 border-white/10'}`}>We
                                    prioritise high-impact keywords and create a content roadmap aligned with commercial
                                    intent. Everything is tracked with KPIs and integrated into your wider marketing
                                    funnel.</p>
                            </FxReveal>
                            <FxReveal delay={0.3}>
                                <div
                                    className="flex flex-wrap gap-3 mb-10">{['Topical Clustering', 'Search Intent', 'Volume & Difficulty', 'SERP Analysis'].map(i => (
                                    <span key={i}
                                          className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border ${isDayTime ? 'border-teal-700/30 text-teal-700 bg-teal-700/06' : 'border-teal-400/30 text-teal-300 bg-teal-400/08'}`}>{i}</span>
                                ))}
                                </div>
                            </FxReveal>
                            <FxReveal delay={0.36}>
                                <p className={`text-[0.88em] font-[400] mb-6 ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>Ready
                                    to map your keyword strategy?</p>
                                <FxButton day={!isDayTime} href="/contact" variant="solid">Discuss Keywords <span
                                    className="text-[1.2em] leading-none ml-1">→</span></FxButton>
                            </FxReveal>
                        </div>
                    </div>
                </div>
            </div>

            {/* Competitors Research  - Digital Adventure style */}
            <div className={`relative lg:py-32 py-16 ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>COMPETITOR INTELLIGENCE</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-black/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-white/30' : 'text-black/30'}`}>ANALYSIS</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <FxReveal className="lg:order-2">
                            <div className="relative">
                                <div
                                    className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-teal-400 rounded-tl-sm z-10"/>
                                <div
                                    className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-teal-400 rounded-tr-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-teal-400 rounded-bl-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-teal-400 rounded-br-sm z-10"/>
                                <div className="absolute inset-0 rounded-2xl opacity-40"
                                     style={{boxShadow: '0 0 60px -10px rgba(45,212,191,0.5)'}}/>
                                <div className="relative overflow-hidden rounded-2xl">
                                    <Image src={'/assets/seo/compe.jpg'} alt={'Competitors Research'} width={900}
                                           height={520} className="w-full object-cover rounded-2xl"/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{background: 'linear-gradient(135deg, rgba(45,212,191,0.12) 0%, transparent 60%)'}}/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.03) 3px, rgba(45,212,191,0.03) 4px)'}}/>
                                    <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                                                viewport={{once: true}} transition={{delay: 0.4}}
                                                className="absolute bottom-5 left-5 px-4 py-2 rounded-full backdrop-blur-md text-[0.72em] font-semibold tracking-wider text-teal-300"
                                                style={{
                                                    background: 'rgba(0,0,0,0.65)',
                                                    border: '1px solid rgba(45,212,191,0.35)'
                                                }}>
                                        - Backlink Analysis · Content Gaps · Position Tracking
                                    </motion.div>
                                </div>
                                <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}}
                                            viewport={{once: true}}
                                            transition={{delay: 0.5, type: 'spring', stiffness: 120}}
                                            className="absolute -right-6 top-10 hidden lg:block">
                                    <div className="rounded-2xl px-5 py-4 backdrop-blur-xl text-center min-w-[110px]"
                                         style={{
                                             background: isDayTime ? 'rgba(15,15,15,0.85)' : 'rgba(255,255,255,0.85)',
                                             border: '1px solid rgba(45,212,191,0.35)'
                                         }}>
                                        <div className="text-[2em] font-[900] text-teal-400 leading-none">Insights</div>
                                        <div
                                            className={`text-[0.65em] font-[600] tracking-widest mt-1 uppercase ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>Pro
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FxReveal>

                        <div>
                            <FxReveal delay={0.1}>
                                <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8">Outpace
                                    competitors with <span className="gx-gradient-text">intelligence</span><br/><span
                                        className={`text-[0.65em] font-[300] ${isDayTime ? 'text-white/50' : 'text-black/50'}`}>start here.</span>
                                </h2>
                            </FxReveal>
                            <FxReveal delay={0.18}>
                                <p className={`text-[0.95em] leading-[1.8] mb-6 ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>We
                                    map competitor structures, content strategies, and backlink profiles to identify
                                    tactical opportunities. Our analyses reveal what’s working in your space and where
                                    to focus resources for maximum advantage.</p>
                            </FxReveal>
                            <FxReveal delay={0.24}>
                                <p className={`text-[0.95em] leading-[1.8] mb-10 pb-10 border-b ${isDayTime ? 'text-white/75 border-white/10' : 'text-black/70 border-black/10'}`}>Outputs
                                    include prioritized content gaps, link building opportunities, and on-page
                                    recommendations tied to ranking potential and business KPIs.</p>
                            </FxReveal>
                            <FxReveal delay={0.3}>
                                <div
                                    className="flex flex-wrap gap-3 mb-10">{['Backlink Audits', 'Content Gap Analysis', 'SERP Tracking', 'Link Opportunities'].map(i => (
                                    <span key={i}
                                          className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border ${isDayTime ? 'border-teal-400/30 text-teal-300 bg-teal-400/08' : 'border-teal-700/30 text-teal-700 bg-teal-700/06'}`}>{i}</span>
                                ))}
                                </div>
                            </FxReveal>
                            <FxReveal delay={0.36}>
                                <p className={`text-[0.88em] font-[400] mb-6 ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>Want
                                    a competitor snapshot and prioritized action plan?</p>
                                <FxButton day={!isDayTime} href="/contact" variant="solid">Request a snapshot <span
                                    className="text-[1.2em] leading-none ml-1">→</span></FxButton>
                            </FxReveal>
                        </div>
                    </div>

                    <FxReveal delay={0.1} y={16}>
                        <div
                            className={`mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t ${isDayTime ? 'border-white/10' : 'border-black/10'}`}>
                            {[{val: '150+', label: 'Pages Audited'}, {
                                val: '8+',
                                label: 'Years of Expertise'
                            }, {val: '50+', label: 'Tools & Integrations'}, {
                                val: '100%',
                                label: 'Focus on ROI'
                            }].map(s => (
                                <div key={s.label} className="text-center lg:text-left">
                                    <div
                                        className="text-[2.2em] font-[900] gx-gradient-text leading-none mb-1">{s.val}</div>
                                    <div
                                        className={`text-[0.72em] font-[500] tracking-tight ${isDayTime ? 'text-white/50' : 'text-black/50'}`}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </FxReveal>
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
            <div className={`relative lg:py-32 py-16 ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                {/* Aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>IMPLEMENTATION PHASE</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-black/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-white/30' : 'text-black/30'}`}>OPTIMIZATION MASTERY</span>
                        </div>
                    </FxReveal>

                    <FxReveal delay={0.1}>
                        <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-6">
                            Transform research <span className="gx-gradient-text">into measurable results</span><br/>
                            <span
                                className={`text-[0.65em] font-[300] ${isDayTime ? 'text-white/50' : 'text-black/50'}`}>Strategic implementation with proven impact</span>
                        </h2>
                    </FxReveal>

                    <FxReveal delay={0.18}>
                        <p className={`text-[0.95em] leading-[1.8] mb-3 lg:max-w-[95%] ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                            With comprehensive research complete, we transition into our optimization phase -where
                            data-driven strategy becomes tangible results. Our implementation approach combines
                            technical excellence, strategic content refinement, and authority building across three
                            interconnected phases that work synergistically to elevate your organic presence.
                        </p>
                        <p className={`text-[0.95em] leading-[1.8] mb-12 lg:max-w-[95%] ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                            Each phase is carefully orchestrated to build upon the previous one, ensuring your website
                            not only ranks higher but also engages visitors, converts prospects, and establishes lasting
                            authority in your industry.
                        </p>
                    </FxReveal>

                    <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-8 mb-16">
                        {[
                            {
                                title: 'Technical SEO Setup',
                                icon: '⚙',
                                number: '01',
                                details: [
                                    'Fix broken links, crawl errors, and indexing issues',
                                    'Implement schema markup and structured data',
                                    'Optimize site speed and Core Web Vitals',
                                    'Configure XML sitemaps and robots.txt',
                                    'Resolve duplicate content and canonicalization',
                                    'Improve mobile responsiveness and crawlability'
                                ]
                            },
                            {
                                title: 'Content Enhancement',
                                icon: '📄',
                                number: '02',
                                details: [
                                    'Refine on-page content for target keywords',
                                    'Enhance meta titles and descriptions',
                                    'Optimize heading hierarchy and structure',
                                    'Integrate multimedia assets strategically',
                                    'Improve readability and user engagement',
                                    'Align copy with search intent and user needs'
                                ]
                            },
                            {
                                title: 'Authority Building',
                                icon: ' --',
                                number: '03',
                                details: [
                                    'Develop targeted link-building strategies',
                                    'Create valuable content for digital PR',
                                    'Secure high-quality relevant backlinks',
                                    'Build industry partnerships and mentions',
                                    'Amplify content through strategic channels',
                                    'Monitor and maintain domain authority growth'
                                ]
                            }
                        ].map((item, i) => (
                            <FxReveal key={item.title} delay={0.24 + i * 0.1}>
                                <div
                                    className={`relative p-8 rounded-2xl backdrop-blur-md border h-full ${isDayTime ? 'bg-white/5 border-teal-400/20 hover:border-teal-400/50' : 'bg-black/5 border-teal-700/20 hover:border-teal-700/50'} transition-all duration-300 hover:shadow-lg`}>
                                    <div
                                        className={`absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isDayTime ? 'bg-gradient-to-br from-teal-400/30 to-cyan-400/30 text-teal-300' : 'bg-gradient-to-br from-teal-600/30 to-cyan-600/30 text-teal-600'}`}>
                                        {item.number}
                                    </div>
                                    <div
                                        className={`text-5xl mb-4 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>{item.icon}</div>
                                    <h3 className="text-[1.4em] font-[700] mb-5 tracking-tight pr-6">{item.title}</h3>
                                    <ul className={`space-y-2.5 text-[0.85em] leading-[1.6] ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>
                                        {item.details.map((detail, idx) => (
                                            <li key={idx} className="flex gap-3">
                                                <span
                                                    className={`${isDayTime ? 'text-teal-400' : 'text-teal-600'} font-semibold flex-shrink-0`}>✓</span>
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FxReveal>
                        ))}
                    </div>

                    <FxReveal delay={0.54}>
                        <div
                            className={`p-8 rounded-2xl backdrop-blur-md border ${isDayTime ? 'bg-white/3 border-teal-400/15' : 'bg-black/3 border-teal-700/15'}`}>
                            <h3 className="text-[1.2em] font-[600] mb-4">Why This Phased Approach Works</h3>
                            <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-6 text-[0.9em]">
                                <div>
                                    <h4 className={`font-[600] mb-2 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>Foundation
                                        First</h4>
                                    <p className={isDayTime ? 'text-white/60' : 'text-black/60'}>Technical excellence
                                        ensures search engines can properly crawl, index, and understand your content
                                        from day one.</p>
                                </div>
                                <div>
                                    <h4 className={`font-[600] mb-2 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>Content
                                        Resonance</h4>
                                    <p className={isDayTime ? 'text-white/60' : 'text-black/60'}>Enhanced content
                                        engages both algorithms and humans, improving rankings while converting visitors
                                        into customers.</p>
                                </div>
                                <div>
                                    <h4 className={`font-[600] mb-2 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>Authority
                                        Amplification</h4>
                                    <p className={isDayTime ? 'text-white/60' : 'text-black/60'}>Strategic link building
                                        combined with solid content signals trustworthiness, accelerating ranking growth
                                        and visibility.</p>
                                </div>
                            </div>
                        </div>
                    </FxReveal>

                    <FxReveal delay={0.62} y={16}>
                        <div className={`flex flex-wrap gap-3 mt-12 mb-10`}>
                            {['Technical SEO', 'On-Page Optimization', 'Schema Markup', 'Content Refinement', 'Link Building', 'Authority Growth', 'Performance Tracking', 'Competitive Analysis', 'Strategic Outreach', 'ROI Measurement'].map(tag => (
                                <span key={tag}
                                      className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border ${isDayTime ? 'border-teal-400/30 text-teal-300 bg-teal-400/08' : 'border-teal-700/30 text-teal-700 bg-teal-700/06'}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </FxReveal>

                    <FxReveal delay={0.70}>
                        <div className={`flex flex-col sm:flex-row gap-6 items-start sm:items-center`}>
                            <div className="flex-1">
                                <p className={`text-[0.88em] font-[500] mb-1 ${isDayTime ? 'text-white/80' : 'text-black/80'}`}>
                                    Ready to move from insights to impact?
                                </p>
                                <p className={`text-[0.85em] ${isDayTime ? 'text-white/50' : 'text-black/50'}`}>
                                    Our implementation experts are prepared to execute a comprehensive optimization
                                    strategy tailored to your goals.
                                </p>
                            </div>
                            <FxButton day={!isDayTime} href="/contact" variant="solid">
                                Begin Implementation <span className="text-[1.2em] leading-none ml-1">→</span>
                            </FxButton>
                        </div>
                    </FxReveal>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div className={`relative lg:py-32 py-16 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(13,148,136,0.07)' : 'rgba(45,212,191,0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(13,148,136,0.07)' : 'rgba(45,212,191,0.06)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                {/* Aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>YOUR TRUSTED PARTNER</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-black/10' : 'bg-white/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-black/30' : 'text-white/30'}`}>PROVEN EXCELLENCE</span>
                        </div>
                    </FxReveal>

                    <FxReveal delay={0.1}>
                        <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8">
                            Strategic SEO partners <span className="gx-gradient-text">you can trust</span><br/>
                            <span
                                className={`text-[0.65em] font-[300] ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>delivering results that matter</span>
                        </h2>
                    </FxReveal>

                    <FxReveal delay={0.18}>
                        <p className={`text-[0.95em] leading-[1.8] mb-6 lg:max-w-[90%] ${isDayTime ? 'text-black/70' : 'text-white/75'}`}>
                            We specialize in transforming digital visibility into measurable business growth. From
                            startups building their first market presence to established enterprises scaling across new
                            markets, we've partnered with hundreds of companies to elevate their organic presence, drive
                            qualified traffic, and accelerate revenue growth through strategic, data-driven SEO
                            excellence.
                        </p>
                        <p className={`text-[0.95em] leading-[1.8] mb-12 lg:max-w-[90%] ${isDayTime ? 'text-black/70' : 'text-white/75'}`}>
                            Our approach combines deep technical expertise, creative strategy, and relentless focus on
                            your business outcomes. Every recommendation, every implementation, every metric tracked
                            -all
                            designed to move your needle.
                        </p>
                    </FxReveal>

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-16">
                        {[
                            {
                                number: '50+',
                                label: 'Projects Delivered',
                                icon: '✓',
                                desc: 'Across industries and markets'
                            },
                            {number: '8+', label: 'Years of Excellence', icon: '⭐', desc: 'Proven track record'},
                            {number: '100%', label: 'Client Retention', icon: '🤝', desc: 'Long-term partnerships'},
                            {number: '300%', label: 'Avg. ROI Growth', icon: '📈', desc: 'Measurable results'}
                        ].map((stat, i) => (
                            <FxReveal key={stat.label} delay={0.24 + i * 0.08}>
                                <div
                                    className={`relative p-6 rounded-2xl backdrop-blur-md border text-center ${isDayTime ? 'bg-black/5 border-teal-700/20 hover:border-teal-700/50' : 'bg-white/5 border-teal-400/20 hover:border-teal-400/50'} transition-all duration-300`}>
                                    <div
                                        className={`text-3xl mb-3 ${isDayTime ? 'text-teal-700' : 'text-teal-300'}`}>{stat.icon}</div>
                                    <div className="text-[1.8em] font-[900] gx-gradient-text mb-1">{stat.number}</div>
                                    <h3 className="text-[0.95em] font-[600] mb-1">{stat.label}</h3>
                                    <p className={`text-[0.75em] ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>{stat.desc}</p>
                                </div>
                            </FxReveal>
                        ))}
                    </div>

                    <FxReveal delay={0.56}>
                        <div
                            className={`p-8 rounded-2xl backdrop-blur-md border ${isDayTime ? 'bg-black/3 border-teal-700/15' : 'bg-white/3 border-teal-400/15'}`}>
                            <h3 className="text-[1.3em] font-[700] mb-6">Why Grey InfoTech for SEO</h3>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                                <div>
                                    <div
                                        className={`text-2xl mb-3 ${isDayTime ? 'text-teal-700' : 'text-teal-300'}`}>🎯
                                    </div>
                                    <h4 className={`font-[600] mb-2 ${isDayTime ? 'text-black/90' : 'text-white/90'}`}>Results-Driven
                                        Strategy</h4>
                                    <p className={`text-[0.85em] ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>Every
                                        tactic tied to your business KPIs. We obsess over metrics that matter -traffic,
                                        leads, revenue -not vanity metrics.</p>
                                </div>
                                <div>
                                    <div
                                        className={`text-2xl mb-3 ${isDayTime ? 'text-teal-700' : 'text-teal-300'}`}> -
                                    </div>
                                    <h4 className={`font-[600] mb-2 ${isDayTime ? 'text-black/90' : 'text-white/90'}`}>Data-Obsessed
                                        Approach</h4>
                                    <p className={`text-[0.85em] ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>We
                                        combine industry-leading tools, proprietary insights, and continuous testing to
                                        uncover and capitalize on every growth opportunity.</p>
                                </div>
                                <div>
                                    <div
                                        className={`text-2xl mb-3 ${isDayTime ? 'text-teal-700' : 'text-teal-300'}`}>🚀
                                    </div>
                                    <h4 className={`font-[600] mb-2 ${isDayTime ? 'text-black/90' : 'text-white/90'}`}>Scalable
                                        Excellence</h4>
                                    <p className={`text-[0.85em] ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>From
                                        day one to year five, our strategies evolve with your business. We scale
                                        techniques that work and optimize ruthlessly.</p>
                                </div>
                            </div>
                        </div>
                    </FxReveal>

                    <FxReveal delay={0.64} y={16}>
                        <div className={`flex flex-wrap gap-3 mt-12 mb-12`}>
                            {['SEO Strategy', 'Technical SEO', 'Content Strategy', 'Link Building', 'Analytics', 'Competitive Analysis', 'International SEO', 'E-Commerce SEO', 'Local SEO', 'Enterprise SEO'].map(tag => (
                                <span key={tag}
                                      className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border ${isDayTime ? 'border-teal-700/30 text-teal-700 bg-teal-700/06' : 'border-teal-400/30 text-teal-300 bg-teal-400/08'}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </FxReveal>

                    <FxReveal delay={0.72}>
                        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                            <div className="flex-1">
                                <p className={`text-[0.88em] font-[500] mb-2 ${isDayTime ? 'text-black/80' : 'text-white/80'}`}>
                                    Ready to transform visibility into growth?
                                </p>
                                <p className={`text-[0.85em] ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>
                                    Let's discuss your goals and build an SEO strategy that delivers measurable results.
                                </p>
                            </div>
                            <FxButton day={isDayTime} href="/contact" variant="solid">
                                Start Partnership <span className="text-[1.2em] leading-none ml-1">→</span>
                            </FxButton>
                        </div>
                    </FxReveal>
                </div>
            </div>

            {/* SEO Reporting and Reviews */}
            <div className={`relative lg:py-32 py-16 ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                {/* Aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>PERFORMANCE TRACKING</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-black/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-white/30' : 'text-black/30'}`}>TRANSPARENCY & INSIGHTS</span>
                        </div>
                    </FxReveal>

                    <FxReveal delay={0.1}>
                        <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8">
                            Monitor, measure, <span className="gx-gradient-text">and optimize</span><br/>
                            <span
                                className={`text-[0.65em] font-[300] ${isDayTime ? 'text-white/50' : 'text-black/50'}`}>transparent reporting for continuous growth</span>
                        </h2>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-16">
                        <FxReveal delay={0.18}>
                            <div className={`space-y-6`}>
                                <div>
                                    <h3 className={`text-[1.2em] font-[700] mb-3 flex items-center gap-3 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>
                                        <span className="text-2xl">📊</span> Comprehensive Benchmarking
                                    </h3>
                                    <p className={`text-[0.9em] leading-[1.6] ${isDayTime ? 'text-white/70' : 'text-black/70'}`}>
                                        Every engagement begins with a detailed competitive analysis and baseline
                                        assessment. We capture your current rankings, traffic patterns, conversion
                                        metrics, and competitive positioning to establish a clear starting point.
                                    </p>
                                </div>
                                <div>
                                    <h3 className={`text-[1.2em] font-[700] mb-3 flex items-center gap-3 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>
                                        <span className="text-2xl">📈</span> Monthly Performance Reporting
                                    </h3>
                                    <p className={`text-[0.9em] leading-[1.6] ${isDayTime ? 'text-white/70' : 'text-black/70'}`}>
                                        Transparent, detailed reports delivered monthly that showcase ranking progress,
                                        organic traffic growth, lead volume, and revenue impact. We break down what's
                                        working, what's being optimized, and why.
                                    </p>
                                </div>
                                <div>
                                    <h3 className={`text-[1.2em] font-[700] mb-3 flex items-center gap-3 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>
                                        <span className="text-2xl"> - </span> Strategic Insights & Recommendations
                                    </h3>
                                    <p className={`text-[0.9em] leading-[1.6] ${isDayTime ? 'text-white/70' : 'text-black/70'}`}>
                                        Beyond raw data, we provide expert analysis and actionable recommendations. We
                                        identify emerging opportunities, surface competitive threats, and suggest
                                        tactical adjustments to accelerate results.
                                    </p>
                                </div>
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.3}>
                            <div className={`space-y-4`}>
                                <div
                                    className={`p-6 rounded-2xl backdrop-blur-md border ${isDayTime ? 'bg-white/5 border-teal-400/20' : 'bg-black/5 border-teal-700/20'}`}>
                                    <h4 className={`text-[1em] font-[600] mb-3 flex items-center gap-2 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>
                                        <span>✓</span> Real-Time Dashboards
                                    </h4>
                                    <p className={`text-[0.85em] ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>Access
                                        live analytics dashboards tracking keywords, rankings, traffic, and conversions
                                        whenever you need insights.</p>
                                </div>
                                <div
                                    className={`p-6 rounded-2xl backdrop-blur-md border ${isDayTime ? 'bg-white/5 border-teal-400/20' : 'bg-black/5 border-teal-700/20'}`}>
                                    <h4 className={`text-[1em] font-[600] mb-3 flex items-center gap-2 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>
                                        <span>✓</span> Quarterly Strategy Sessions
                                    </h4>
                                    <p className={`text-[0.85em] ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>Dedicated
                                        strategy reviews to evaluate quarterly progress, adjust tactics, and align
                                        efforts with evolving business goals.</p>
                                </div>
                                <div
                                    className={`p-6 rounded-2xl backdrop-blur-md border ${isDayTime ? 'bg-white/5 border-teal-400/20' : 'bg-black/5 border-teal-700/20'}`}>
                                    <h4 className={`text-[1em] font-[600] mb-3 flex items-center gap-2 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>
                                        <span>✓</span> Custom KPI Tracking
                                    </h4>
                                    <p className={`text-[0.85em] ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>We
                                        measure what matters to you -revenue, qualified leads, market share growth, or
                                        specific conversion goals.</p>
                                </div>
                                <div
                                    className={`p-6 rounded-2xl backdrop-blur-md border ${isDayTime ? 'bg-white/5 border-teal-400/20' : 'bg-black/5 border-teal-700/20'}`}>
                                    <h4 className={`text-[1em] font-[600] mb-3 flex items-center gap-2 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>
                                        <span>✓</span> Competitive Intelligence
                                    </h4>
                                    <p className={`text-[0.85em] ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>Ongoing
                                        monitoring of competitor strategies, ranking shifts, and market changes that
                                        could impact your visibility.</p>
                                </div>
                            </div>
                        </FxReveal>
                    </div>

                    <FxReveal delay={0.42}>
                        <div
                            className={`p-8 rounded-2xl backdrop-blur-md border ${isDayTime ? 'bg-white/5 border-teal-400/20' : 'bg-black/5 border-teal-700/20'}`}>
                            <h3 className="text-[1.3em] font-[700] mb-6">The Reporting Advantage</h3>
                            <div className="grid lg:grid-cols-3 gap-8 text-[0.9em]">
                                <div>
                                    <h4 className={`font-[600] mb-2 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>Complete
                                        Visibility</h4>
                                    <p className={isDayTime ? 'text-white/60' : 'text-black/60'}>Know exactly what's
                                        happening with your SEO at every stage, from keyword rankings to lead generation
                                        impact.</p>
                                </div>
                                <div>
                                    <h4 className={`font-[600] mb-2 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>Informed
                                        Decisions</h4>
                                    <p className={isDayTime ? 'text-white/60' : 'text-black/60'}>Make strategic business
                                        decisions backed by real data, not assumptions. Understand ROI and justify
                                        continued investment.</p>
                                </div>
                                <div>
                                    <h4 className={`font-[600] mb-2 ${isDayTime ? 'text-teal-300' : 'text-teal-600'}`}>Continuous
                                        Optimization</h4>
                                    <p className={isDayTime ? 'text-white/60' : 'text-black/60'}>Identify what's working
                                        and double down. Catch underperformers early and pivot strategies for maximum
                                        impact.</p>
                                </div>
                            </div>
                        </div>
                    </FxReveal>

                    <FxReveal delay={0.50} y={16}>
                        <div
                            className={`flex flex-col gap-6 mt-12 p-8 rounded-2xl backdrop-blur-md border ${isDayTime ? 'bg-white/3 border-teal-400/15' : 'bg-black/3 border-teal-700/15'}`}>
                            <div>
                                <h3 className={`text-[1.1em] font-[700] mb-3 ${isDayTime ? 'text-teal-300' : 'text-teal-300'}`}>Get
                                    Started Today</h3>
                                <p className={`text-[0.95em] leading-[1.7] mb-4 ${isDayTime ? 'text-white/70' : 'text-white/75'}`}>
                                    Whether you're starting fresh or scaling an existing SEO program, we begin every
                                    engagement with a comprehensive free SEO audit. Discover your hidden opportunities,
                                    understand your competitive position, and learn exactly how strategic SEO can
                                    accelerate your growth.
                                </p>
                                <p className={`text-[0.9em] ${isDayTime ? 'text-white/50' : 'text-white/50'}`}>
                                    No strings attached. No pressure. Just actionable insights backed by data.
                                </p>
                            </div>
                            <FxButton day={!isDayTime} href="/contact" variant="solid">
                                Request Free SEO Audit <span className="text-[1.2em] leading-none ml-1">→</span>
                            </FxButton>
                        </div>
                    </FxReveal>
                </div>
            </div>

            {/* Development Process & Methodology Section - MATCHED TO BRANDING STYLE */}
            <section className={`relative py-20 lg:py-32 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime}/>
                <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    {/* Section Header */}
                    <div className="max-w-3xl mb-16">
                        <FxChip day={!isDayTime}>OUR METHODOLOGY</FxChip>
                        <FxReveal>
                            <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] tracking-tight mt-4 mb-6">
                                Our Proven <span className="gx-gradient-text">SEO Development Process</span>
                            </h2>
                        </FxReveal>
                        <FxReveal delay={0.08}>
                            <p className={`text-[1em] lg:text-[1.1em] leading-[1.7] font-[300] ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                We follow a strategic, data-driven process that transforms your digital presence into a
                                competitive powerhouse. Each phase is designed to ensure measurable results, continuous
                                optimization, and sustainable growth.
                            </p>
                        </FxReveal>
                    </div>

                    {/* Process Steps Grid */}
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
                        {[
                            {
                                step: "01",
                                title: "Discovery & Analysis",
                                description: "We conduct comprehensive SEO audits, competitor analysis, and keyword research. Understanding your business goals, target audience, and technical foundation allows us to develop a strategic roadmap tailored to your needs."
                            },
                            {
                                step: "02",
                                title: "Strategic Planning",
                                description: "We develop actionable SEO strategies targeting high-impact keywords and opportunities. Our approach balances quick wins with long-term growth, identifying content gaps, technical improvements, and link-building opportunities for sustainable rankings."
                            },
                            {
                                step: "03",
                                title: "Implementation & Optimization",
                                description: "Our team executes on-page optimization, technical SEO enhancements, content creation, and link-building initiatives. We ensure every change aligns with best practices and your strategic objectives while maintaining site performance and user experience."
                            },
                            {
                                step: "04",
                                title: "Monitoring & Refinement",
                                description: "We continuously monitor performance metrics, track rankings, and analyze user behavior. Regular reporting and optimization ensure your SEO strategy evolves with algorithm changes and market dynamics for sustained competitive advantage."
                            },
                        ].map((item, idx) => (
                            <FxReveal key={idx} delay={0.08 * idx}>
                                <div
                                    className={`p-8 rounded-2xl border transition-all duration-300 hover:border-teal-400/60 ${
                                        isDayTime
                                            ? 'border-gray-200 bg-white/50 hover:bg-white'
                                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                                    }`}>
                                    <div className="text-teal-400 text-[2.5em] font-[700] mb-3">{item.step}</div>
                                    <h3 className="text-[1.3em] font-[600] mb-4 leading-tight">{item.title}</h3>
                                    <p className={`text-[0.95em] leading-[1.6] font-[300] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>
                                        {item.description}
                                    </p>
                                </div>
                            </FxReveal>
                        ))}
                    </div>
                </div>
            </section>

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

            {/* Why Grey InfoTech  - Professional approach */}
            <div
                className={`relative overflow-hidden ${isDayTime ? 'bg-slate-950' : 'bg-slate-50'} lg:pt-[5em] pt-[3em] lg:pb-[6em] pb-[3em]`}>
                <FxBackground day={false} grid aurora className="opacity-50"/>
                <FxOrbit size={600} top="-100px" right="-180px" opacity={0.12} speed={32}/>
                <FxOrbit size={350} top="200px" left="-120px" opacity={0.09} speed={26} reverse/>

                <div className="relative z-10 max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em]">
                    {/* Heading row */}
                    <FxReveal>
                        <div
                            className={`grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 border-b border-white/10 pb-10 mb-12 ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <FxSectionHeading
                                day={false}
                                eyebrow="Why Us"
                                title="Why Grey InfoTech for SEO"
                            />
                            <p className={`text-[0.873em] font-[400] lg:-mt-[0.2em] leading-[1.5] lg:-ml-[7em] ${isDayTime ? 'text-grey-100' : 'text-black'}`}>
                                We combine SEO expertise with strategic insights to drive measurable results. From
                                technical
                                optimization to content strategy, we ensure your business dominates search rankings and
                                captures organic growth.
                            </p>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-8">
                        {/* Left  - FxHoloCard accordion */}
                        <div className="flex flex-col gap-3 lg:pr-[3em]">
                            {reasons.map((reason, index) => {
                                const isActive = index + 1 === activeIndex;
                                return (
                                    <FxHoloCard
                                        key={reason.id}
                                        day={false}
                                        className={`p-5 transition-all duration-300 cursor-pointer ${isActive ? 'ring-1 ring-teal-500/40' : 'opacity-70 hover:opacity-90'}`}
                                        onClick={() => setActiveIndex(index + 1)}
                                    >
                                        <h3 className={`leading-[1.2] lg:text-[1.1em] text-[1em] font-[600] mb-2 transition-all ${isActive ? 'text-teal-400' : 'text-teal-700/70'}`}>
                                            <span
                                                className="font-mono text-[0.68em] mr-2 text-teal-500/70">{String(reason.id).padStart(2, '0')}</span>
                                            {reason.title}
                                        </h3>
                                        <AnimatePresence initial={false}>
                                            {isActive && (
                                                <motion.p
                                                    key={reason.id}
                                                    initial={{opacity: 0, height: 0}}
                                                    animate={{opacity: 1, height: 'auto'}}
                                                    exit={{opacity: 0, height: 0}}
                                                    transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                                                    className={`text-[0.875em] leading-[1.6] overflow-hidden ${isDayTime ? 'text-gray-100/15' : 'text-gray-200'}`}
                                                >
                                                    {reason.description}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </FxHoloCard>
                                );
                            })}
                        </div>

                        {/* Right  - image */}
                        <div className="">
                            <FxFrame className="w-full">
                                <Image src={reasons[activeIndex - 1]?.images?.[0] || '/assets/fin/grey.jpg'}
                                       alt="Why Grey InfoTech for SEO"
                                       width={660} height={280}
                                       className="w-full h-auto rounded-xl object-cover"/>
                            </FxFrame>
                        </div>
                    </div>

                    {/* CTA */}
                    <FxReveal className="mt-16 flex flex-col items-center justify-center text-center">
                        <FxGlitchText tag="h2"
                                      className={`lg:text-[3em] text-[1.5em] font-[600] tracking-tighter leading-[1.15] pb-6 ${isDayTime ? 'text-slate-100/50' : 'text-slate-800'}`}>
                            Ready to transform your SEO strategy?
                        </FxGlitchText>
                        <FxButton day={false} href="/contact" variant="solid">Get started →</FxButton>
                    </FxReveal>
                </div>
            </div>
        </div>
    );
};

export default Seo;


