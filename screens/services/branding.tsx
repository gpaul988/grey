'use client';


import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
import CountUp from "react-countup";
import {useIsDayTime} from '../../components/useIsDayTime';
import {motion} from 'framer-motion';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxHoloCard,
    FxStickyScrollSection,
    FxScrollItem
} from '@/components/futuristic/fx';

const Branding = () => {
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
            "BG",
            "BI",
            "LD",
            "BS",
        ];

        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                const mid = rect.top + rect.height / 2;
                if (mid >= 0 && mid <= window.innerHeight * 0.5) {
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
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Unified Futuristic Branding Hero - Background Image with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Background Image */}
                <Image
                    src="/assets/brand/hero.jpg"
                    alt="Branding & Identity Hero"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Grid & FX Background */}
                <div className="pointer-events-none absolute inset-0 z-[1]">
                    <FxBackground day={false} grid={true} aurora={true}/>
                </div>

                {/* Gradient Overlay with Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50 z-[2]"/>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,245,212,0.12),transparent_50%)] z-[2]"/>

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
                    className="absolute inset-0 flex items-center top-32 z-11 px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Column - Main Content */}
                        <div>
                            {/* Eyebrow with animated dot */}
                            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                                <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"/>
                                <span
                                    className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Brand Identity & Strategy</span>
                            </div>

                            {/* Main Heading with Gradient */}
                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Distinctive <span className="gx-gradient-text">Brand Systems</span>
                                <br className="hidden lg:block"/>
                                That Resonate & Scale
                            </h1>

                            {/* Description */}
                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                Create lasting impressions through cohesive visual identity, compelling brand strategy,
                                and
                                comprehensive guidelines that ensure consistency across every touchpoint—from logos and
                                colour systems to packaging and digital experiences.
                            </p>

                            {/* Key Capabilities Pills */}
                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {["Logo Design", "Brand Strategy", "Visual Identity", "Style Guides", "Brand Voice", "Packaging"].map((badge) => (
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
                                        style={{background: '#00f5d4', color: '#000'}}>
                                            <span className="absolute inset-0" style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                            }}/>
                                        <span className="relative">Start Your Brand →</span>
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
                                    {label: 'Brands Built', value: '50+'},
                                    {label: 'Industries', value: '15+'},
                                    {label: 'Global Impact', value: '28+'},
                                    {label: 'Years Active', value: '8+'}
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
                            {label: 'Brands Built', value: '50+'},
                            {label: 'Industries', value: '15+'},
                            {label: 'Global Impact', value: '28+'}
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

            {/* Introductory Section - Futuristic Brand Strategy Overview */}
            <section ref={sectionRef}
                     className={` pt-16 transition-colors duration-500 ${
                         isBackgroundActive
                             ? isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                             : isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                     }`}>
                <FxBackground day={isDayTime}/>
                <div
                    className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>BRAND MASTERY</FxChip>
                    </div>

                    <div>
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Build Identities That <span
                                className="gx-gradient-text">Stand Out & Scale</span>
                            </h3>
                        </FxReveal>
                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div>
                                    <p>
                                        Strong branding is one of the most powerful tools for building business success.
                                        In a competitive marketplace, a distinctive and cohesive brand identity sets you
                                        apart, builds customer trust, and creates lasting emotional connections. At Grey
                                        InfoTech, our branding experts craft unique brand identities that reflect your
                                        vision,
                                        values, and competitive advantage—from logo design and brand strategy to
                                        comprehensive
                                        guidelines and voice development.
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        In today's digital-first world, brand presence extends far beyond traditional
                                        touchpoints. Maintaining consistency across websites, mobile apps, social media,
                                        and
                                        every digital channel is essential to building trust and driving engagement. We
                                        develop
                                        comprehensive digital branding guidelines and style systems that ensure your
                                        brand
                                        remains cohesive, recognizable, and aligned with your core identity across every
                                        touchpoint—enabling sustainable growth in competitive markets.
                                    </p>

                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Brand Strategy', 'Visual Identity', 'Digital Guidelines', 'Rebranding'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Branding Solutions - Enhanced Visual Section */}
            <section className={`relative`}>
                <div className="relative z-10">
                    <FxStickyScrollSection
                        day={isDayTime}
                        heading={<>Our Branding<br/>solutions</>}
                        intro="We provide comprehensive branding solutions that build distinctive identities, establish visual consistency, and communicate your unique value proposition across every touchpoint—from logo design and brand strategy to complete digital guidelines and packaging design."
                        navLabel="Branding Solutions"
                        activeId={activeId}
                        onNavClickAction={scrollToSection}
                        items={[
                            {
                                id: "01",
                                title: "Branding Guidelines",
                                target: "BG",
                                tags: ["Visual Standards", "Documentation", "Implementation"],
                                body: (
                                    <p>
                                        Comprehensive brand guidelines ensure consistency across all marketing
                                        materials,
                                        digital platforms, and communications. We create detailed documentation covering
                                        logo
                                        usage, colour palettes, typography, imagery style, tone of voice, and
                                        application
                                        examples—providing your team with clear standards to maintain brand integrity at
                                        scale.
                                    </p>
                                ),
                            },
                            {
                                id: "02",
                                title: "Brand Identity",
                                target: "BI",
                                tags: ["Visual Language", "Positioning", "Messaging"],
                                body: (
                                    <p>
                                        A strong corporate identity instantly communicates your business values and
                                        unique
                                        selling proposition. We craft cohesive identity systems that extend across your
                                        entire
                                        organisation—from signage and uniforms to digital assets and training materials.
                                        We
                                        define key visual and verbal elements such as brand marks, typography,
                                        photographic
                                        style, tone of voice, and graphic systems, ensuring a unified, professional
                                        image.
                                    </p>
                                ),
                            },
                            {
                                id: "03",
                                title: "Logo Design",
                                target: "LD",
                                tags: ["Creative Concepts", "Multiple Iterations", "Brand Mark"],
                                body: (
                                    <p>
                                        A logo is a fundamental brand asset that helps businesses identify themselves
                                        and stand
                                        out in competitive markets. We create distinctive, memorable logos that reflect
                                        your
                                        brand's essence and resonate with your target audience. Whether you need a
                                        revolutionary
                                        update or a logo from scratch, our design process combines strategic thinking
                                        with
                                        creative excellence to deliver marks that last.
                                    </p>
                                ),
                            },
                            {
                                id: "04",
                                title: "Brand Strategy",
                                target: "BS",
                                tags: ["Market Positioning", "Competitive Analysis", "Growth Planning"],
                                body: (
                                    <p>
                                        Strategic branding begins with deep understanding of your market, competition,
                                        and
                                        target audience. We develop comprehensive brand strategies that define your
                                        positioning,
                                        messaging architecture, value proposition, and brand personality. This
                                        foundation
                                        ensures all design, content, and communication efforts align with your business
                                        objectives and resonate authentically with your audience.
                                    </p>
                                ),
                            },
                            {
                                id: "05",
                                title: "Visual Design System",
                                target: "VDS",
                                tags: ["Color Palette", "Typography", "Component Library"],
                                body: (
                                    <p>
                                        A cohesive visual design system creates consistency and efficiency across all
                                        brand
                                        communications. We develop comprehensive visual systems including refined colour
                                        palettes, typography hierarchies, iconography standards, and component
                                        libraries. This
                                        allows your team to produce on-brand materials quickly while maintaining visual
                                        excellence and recognizability across every platform—web, print, social, and
                                        beyond.
                                    </p>
                                ),
                            },
                            {
                                id: "06",
                                title: "Packaging Design",
                                target: "PD",
                                tags: ["Product Experience", "Consumer Psychology", "Shelf Impact"],
                                body: (
                                    <p>
                                        Packaging is often the first physical touchpoint between your brand and
                                        customers. We
                                        design compelling packaging solutions that protect your product, communicate
                                        your brand
                                        story, and drive purchase decisions. Our designs balance aesthetic appeal with
                                        functional requirements, considering materials, printing techniques, shelf
                                        presence, and
                                        unboxing experience to create memorable brand moments that drive loyalty and
                                        word-of-mouth.
                                    </p>
                                ),
                            },
                            {
                                id: "07",
                                title: "Brand Voice & Messaging",
                                target: "BVM",
                                tags: ["Tone of Voice", "Messaging Pillars", "Copywriting Standards"],
                                body: (
                                    <p>
                                        Beyond visuals, your brand voice creates emotional connection through words. We
                                        develop
                                        comprehensive tone-of-voice frameworks that define how your brand communicates
                                        across
                                        channels—from marketing copy to customer service. We establish messaging
                                        pillars,
                                        communication guidelines, and copywriting standards that ensure every piece of
                                        content
                                        aligns with your brand personality and resonates authentically with your
                                        audience.
                                    </p>
                                ),
                            },
                            {
                                id: "08",
                                title: "Digital Branding",
                                target: "DB",
                                tags: ["Web Design", "Social Media", "Digital Touchpoints"],
                                body: (
                                    <p>
                                        In today's digital-first world, your online presence is crucial. We create
                                        comprehensive
                                        digital branding strategies that extend your brand identity across websites,
                                        applications, social media, email, and digital advertising. From responsive web
                                        design
                                        to social media templates and digital asset libraries, we ensure your brand
                                        delivers
                                        consistent, compelling experiences across every digital touchpoint your audience
                                        encounters.
                                    </p>
                                ),
                            },
                        ] satisfies FxScrollItem[]}
                    />
                </div>
            </section>

            {/* Branding Process & Methodology Section */}
            <section className={`relative py-20 lg:py-32 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime}/>
                <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    {/* Section Header */}
                    <div className="max-w-3xl mb-16">
                        <FxChip day={!isDayTime}>OUR PROCESS</FxChip>
                        <FxReveal>
                            <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] tracking-tight mt-4 mb-6">
                                Our Proven <span className="gx-gradient-text">Branding Methodology</span>
                            </h2>
                        </FxReveal>
                        <FxReveal delay={0.08}>
                            <p className={`text-[1em] lg:text-[1.1em] leading-[1.7] font-[300] ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                We follow a strategic, collaborative process that transforms your vision into a
                                distinctive brand identity. Each step is designed to ensure alignment, creativity, and
                                measurable results.
                            </p>
                        </FxReveal>
                    </div>

                    {/* Process Steps Grid */}
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
                        {[
                            {
                                step: "01",
                                title: "Discovery & Strategy",
                                description: "We begin by deeply understanding your business, market, competitors, and target audience. Through interviews and research, we define your positioning, value proposition, and brand personality that guides all subsequent work."
                            },
                            {
                                step: "02",
                                title: "Creative Concepts",
                                description: "Our designers develop multiple creative directions exploring different visual approaches. We present concepts that balance strategic insights with bold creativity, allowing you to choose the direction that best represents your vision."
                            },
                            {
                                step: "03",
                                title: "Refinement & Design",
                                description: "Based on your feedback, we refine the selected direction into polished designs. We develop the complete visual system including logo, colour palette, typography, imagery style, and all supporting brand elements with precision and consistency."
                            },
                            {
                                step: "04",
                                title: "Guidelines & Launch",
                                description: "We create comprehensive brand guidelines documenting all elements and usage rules. We provide training and asset libraries to ensure your team successfully implements the brand, supported by ongoing guidance as you bring it to market."
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

            {/* Why Choose Grey for Branding */}
            <section className={`relative py-20 lg:py-32 ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <FxBackground day={!isDayTime}/>
                <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <FxReveal>
                            <div>
                                <FxChip day={isDayTime}>WHY GREY</FxChip>
                                <h2 className="text-[2.5em] lg:text-[3.8em] font-[700] leading-[1.1] tracking-tight mt-4 mb-8">
                                    Why Choose Grey <span className="gx-gradient-text">for Your Brand</span>
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: "🎯",
                                            title: "Strategic Approach",
                                            desc: "We don't just design—we strategize. Every visual element serves a purpose rooted in your business goals and market positioning."
                                        },
                                        {
                                            icon: "💡",
                                            title: "Creative Excellence",
                                            desc: "Our award-winning designers combine artistic vision with strategic thinking to create brands that stand out and endure."
                                        },
                                        {
                                            icon: "🔄",
                                            title: "Collaborative Process",
                                            desc: "We partner with you throughout the journey, valuing your insights and ensuring the final brand reflects your authentic identity."
                                        },
                                        {
                                            icon: "📊",
                                            title: "Measurable Results",
                                            desc: "We define success metrics and track brand performance, ensuring your investment delivers tangible business impact."
                                        },
                                    ].map((item, idx) => (
                                        <FxReveal key={idx} delay={0.08 * idx}>
                                            <div className="flex gap-4">
                                                <div className="text-[2.5em] flex-shrink-0">{item.icon}</div>
                                                <div>
                                                    <h3 className="text-[1.2em] font-[600] mb-2">{item.title}</h3>
                                                    <p className={`text-[0.95em] leading-[1.6] font-[300] ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </FxReveal>
                                    ))}
                                </div>
                            </div>
                        </FxReveal>

                        {/* Stats Showcase */}
                        <FxReveal delay={0.2}>
                            <div className="space-y-6">
                                {[
                                    {stat: "50+", label: "Brands Created"},
                                    {stat: "15+", label: "Industries Served"},
                                    {stat: "98%", label: "Client Satisfaction"},
                                    {stat: "8+", label: "Years Experience"},
                                ].map((item, idx) => (
                                    <div key={idx} className={`p-6 rounded-xl border-2 ${
                                        isDayTime
                                            ? 'border-gray-300 bg-gray-50'
                                            : 'border-teal-400/20 bg-teal-400/5'
                                    }`}>
                                        <div
                                            className="text-teal-400 text-[3em] font-[800] leading-none mb-2">{item.stat}</div>
                                        <div
                                            className={`text-[0.9em] uppercase tracking-wider font-[600] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className={`relative py-20 lg:py-32 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime}/>
                <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em] text-center max-w-4xl">
                    <FxReveal>
                        <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] tracking-tight mb-6">
                            Ready to Build Your <span className="gx-gradient-text">Distinctive Brand?</span>
                        </h2>
                    </FxReveal>
                    <FxReveal delay={0.08}>
                        <p className={`text-[1em] lg:text-[1.15em] leading-[1.8] font-[300] mb-10 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                            Let's collaborate to create a brand identity that resonates with your audience,
                            differentiates you from competitors, and drives sustainable business growth.
                        </p>
                    </FxReveal>
                    <FxReveal delay={0.16}>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/contact">
                                <button
                                    className="relative px-10 py-4 rounded-full text-[0.95em] font-bold overflow-hidden hover:shadow-lg transition-all duration-300"
                                    style={{background: '#00f5d4', color: '#000'}}>
                                    <span className="absolute inset-0" style={{
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                    }}/>
                                    <span className="relative">Start Your Branding Journey →</span>
                                </button>
                            </Link>
                            <Link href="/portfolio">
                                <button
                                    className="px-10 py-4 rounded-full text-[0.95em] font-semibold transition-all duration-300"
                                    style={{
                                        color: isDayTime ? '#000' : '#fff',
                                        border: `2px solid ${isDayTime ? '#000' : '#fff'}`
                                    }}>
                                    View Our Work
                                </button>
                            </Link>
                        </div>
                    </FxReveal>
                </div>
            </section>
            <div id={'mid image'} className={'h-auto max-w-full w-full mx-auto mt-12 lg:mt-20'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/brand/branding.jpg'}
                    alt={'Branding'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>


            {/* Trusted Digital Partners */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'partners'}
                     className={`relative lg:py-14 md:py-16 lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                         isDayTime ? 'text-white' : 'text-black'
                     }`}>
                    <h1 className={'lg:text-5em] md:text-[4em] sm:text-[3em] text-[2em] font-[600] leading-[1.1]  mb-[0.6em]'}>
                        Your trusted <br className={'lg:block md:block hidden'}/>digital partner
                    </h1>
                    <p className={'text-[0.873em] font-[300] leading-[1.5] text-justify lg:pr-[33em] mb-10'}>
                        We specialize in crafting high-impact marketing websites, innovative web apps, and mobile
                        applications that drive real results. From funded startups to established businesses,
                        we&#39;ve
                        helped a wide range of clients bring their digital products to life—delivering standout
                        experiences
                        that fuel growth, engagement, and long-term success.
                    </p>
                    <Link href='/contact'>
                        <button
                            className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[3%]`}></span>
                            <span
                                className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-100 group-hover:-translate-x-8`}></span>
                            <span
                                className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-white group-hover:text-gray-300' : 'text-black group-hover:text-gray-800'}`}>
                            Start a project <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                            <span
                                className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-white' : 'border-black'} rounded-full"}></span>
                        </button>
                    </Link>

                    {/* Countup */}
                    <div id={'countup'}
                         className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-500 lg:mb-[4em] md:mb-[4em] ${
                             isDayTime ? 'text-white' : 'text-black'
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
        </div>
    );
};

export default Branding;
