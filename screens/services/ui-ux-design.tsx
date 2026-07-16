'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
import Link from "next/link";
import CountUp from 'react-countup';
import {useIsDayTime} from '../../components/useIsDayTime';
import {motion} from 'framer-motion';
import {AnimatePresence} from 'framer-motion';
import {ArrowRight} from 'lucide-react';
import ProcessesSection from '@/components/futuristic/ProcessesSection';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxHoloCard,
    FxFrame,
    FxStickyScrollSection
} from '@/components/futuristic/fx';

const UiUxDesign = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

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

                if (top < windowHeight * -0.15 || bottom < windowHeight * -0.1) {
                    setIsBackgroundActive(true);
                } else {
                    setIsBackgroundActive(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initialize on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (target: string) => {
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({behavior: "smooth", block: "start"});
        }
    };

    // Countup hook for Digital partners
    const stats = [
        {label: 'Years Experience', value: 8, suffix: '+'},
        {label: 'Design Systems Built', value: 200, suffix: '+'},
        {label: 'Conversion Improvement', value: 45, suffix: '%'},
        {label: 'User Satisfaction', value: 98, suffix: '%'},
    ];

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>

            {/* Hero section matching ERP development.tsx style */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Background Image/Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/ui-ux/hero.jpg"
                >
                    <source src="/assets/hero/hero.mp4" type="video/mp4"/>
                </video>

                {/* Fallback Image Background for Mobile and Video Fallback */}
                <Image
                    src="/assets/ui-ux/hero.jpg"
                    alt="UI/UX Design Hero"
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
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,244,221,0.12),transparent_50%)] z-[2]"/>

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
                                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"/>
                                <span
                                    className="text-cyan-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">User-Centered Design Excellence</span>
                            </div>

                            {/* Main Heading with Gradient */}
                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                UI/UX Design That <span className="gx-gradient-text">Drives Conversions</span>
                            </h1>

                            {/* Description */}
                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                Intelligent design interfaces that combine user research, accessibility standards, and
                                conversion optimization. 200+ projects delivered. 45% average conversion uplift. 98%
                                user satisfaction. 4.8+ app ratings.
                            </p>

                            {/* Key Capabilities Pills */}
                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {["User Research", "Accessibility", "Design Systems", "Prototyping", "Conversion", "A/B Testing"].map((badge) => (
                                    <span key={badge}
                                          className="px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button
                                        className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap"
                                        style={{background: '#0ff4dd', color: '#000'}}>
                                        <span className="absolute inset-0" style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                        }}/>
                                        <span className="relative">Start Your Design →</span>
                                    </button>
                                </Link>
                                <Link href="/portfolio">
                                    <button
                                        className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap"
                                        style={{border: `1px solid rgba(255,255,255,0.15)`}}>
                                        View Projects
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column - Impact Stats */}
                        <div className="hidden lg:flex flex-col items-end">
                            <div className="grid grid-cols-2 gap-6 w-full">
                                {[
                                    {label: 'Projects Delivered', value: '200+'},
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'Conversion Uplift', value: '45%'},
                                    {label: 'User Satisfaction', value: '98%'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className="px-6 py-5 rounded-2xl border border-cyan-400/25 bg-cyan-400/8 backdrop-blur-md hover:bg-cyan-400/12 transition-all duration-300 hover:border-cyan-400/50 text-right">
                                        <div
                                            className="text-cyan-300 text-[0.7em] uppercase tracking-wider font-[600] mb-2">{stat.label}</div>
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
                            {label: 'Projects', value: '200+'},
                            {label: 'Experience', value: '8+'},
                            {label: 'Conversion', value: '45%'}
                        ].map((stat) => (
                            <div key={stat.label}
                                 className="px-3 py-2 rounded-xl border border-cyan-400/25 bg-cyan-400/8 backdrop-blur-md">
                                <div
                                    className="text-cyan-300 text-[0.5em] uppercase tracking-wider font-[600] mb-1">{stat.label}</div>
                                <div
                                    className="text-white text-[1.2em] font-[700]">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Animated Particles */}
                <div className="absolute top-1/4 left-8 z-[4] w-2 h-2 rounded-full bg-cyan-400 animate-pulse"/>
                <div className="absolute bottom-1/3 right-12 z-[4] w-3 h-3 rounded-full bg-cyan-500 animate-pulse"
                     style={{animationDelay: '0.5s'}}/>
                <div className="absolute top-3/4 left-1/3 z-[4] w-2 h-2 rounded-full bg-teal-400 animate-pulse"
                     style={{animationDelay: '1s'}}/>
            </section>

            {/* Introductory section matching ERP development style */}
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
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>HUMAN-CENTRED SOLUTIONS</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Design Systems & <span className="gx-gradient-text">User-Centric Experiences</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div>
                                    <p>We create user experiences that seamlessly combine deep user research, behavioral
                                        psychology, accessibility standards (WCAG 2.1 AA), and conversion optimization.
                                        Our design process unifies discovery, prototyping, and implementation into
                                        cohesive experiences. Across 200+ projects, we've delivered 45% average
                                        conversion improvements, achieved 98% user satisfaction scores, and maintained
                                        4.8+ app store ratings through rigorous testing and iterative optimization.</p>
                                </div>
                                <div>
                                    <p>From initial research and discovery through high-fidelity prototypes to
                                        production-ready design systems, our comprehensive approach ensures every
                                        touchpoint serves your users and drives business objectives. Our
                                        accessibility-first methodology guarantees inclusive experiences for all users.
                                        Design tokens, component libraries, and scalable design systems accelerate
                                        development timelines while maintaining visual consistency. Post-launch, we
                                        continuously optimize through analytics, A/B testing, and user feedback
                                        integration.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['User Research', 'WCAG Compliance', 'Conversion Optimization', 'Design Systems', 'Prototyping', 'A/B Testing'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.16}>
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <h4 className="text-[1.2em] font-[600] tracking-tight mb-6">Design Excellence
                                    Capabilities</h4>
                                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                                    {[
                                        {
                                            title: 'User Experience Design',
                                            items: ['User Research & Testing', 'Usability Testing', 'Information Architecture', 'Wireframing & Prototyping', 'Journey Mapping', 'Interaction Design']
                                        },
                                        {
                                            title: 'Visual & Interface Design',
                                            items: ['UI Design Systems', 'Component Libraries', 'Responsive Design', 'Brand Implementation', 'Motion Design', 'Design Tokens']
                                        },
                                        {
                                            title: 'Accessibility & Optimization',
                                            items: ['WCAG 2.1 AA Compliance', 'Color Accessibility', 'Screen Reader Testing', 'Conversion Optimization', 'A/B Testing', 'Performance Analytics']
                                        }
                                    ].map((capability, idx) => (
                                        <div key={idx}
                                             className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300">
                                            <h5 className="font-[600] text-[0.95em] mb-3 text-white">{capability.title}</h5>
                                            <ul className="space-y-2">
                                                {capability.items.map((item, i) => (
                                                    <li key={i} className="text-[0.85em] flex items-start gap-2">
                                                        <span className="text-cyan-400 font-bold mt-0.5">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.24}>
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <h4 className="text-[1.2em] font-[600] tracking-tight mb-6">Design Impact &
                                    Outcomes</h4>
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                                    {[
                                        {
                                            metric: 'Conversion Improvement',
                                            value: '45%',
                                            description: 'Average uplift in conversion rates through design optimization and A/B testing'
                                        },
                                        {
                                            metric: 'User Satisfaction',
                                            value: '98%',
                                            description: 'Consistent user satisfaction across design projects and platforms'
                                        },
                                        {
                                            metric: 'App Store Rating',
                                            value: '4.8+',
                                            description: 'Average app store ratings for UI/UX optimized applications'
                                        },
                                        {
                                            metric: 'Accessibility Compliance',
                                            value: '100%',
                                            description: 'WCAG 2.1 AA compliance across all design projects and deliverables'
                                        }
                                    ].map((outcome, idx) => (
                                        <div key={idx}
                                             className="p-4 rounded-lg border border-cyan-400/20 bg-cyan-400/5 hover:bg-cyan-400/10 transition-colors duration-300">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className=" text-[0.85em] font-[500] mb-2">{outcome.metric}</p>
                                                    <p className="text-[2em] font-[700] text-cyan-400 mb-2">{outcome.value}</p>
                                                    <p className="text-[0.8em] ">{outcome.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Design Services Section */}
            {/* Futuristic UI/UX Design Services Section */}
            <section
                className={`relative lg:py-[4em] py-[2em] lg:my-[6em] my-[3em] lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] ${
                    isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {/* Background FX */}
                <FxBackground day={isDayTime}/>

                {/* Section Header */}
                <div className="relative z-10 mb-16">
                    <FxReveal>
                        <h2 className={`border-b pb-[1.2em] border-gray-300/20 lg:text-[3.5em] md:text-[2.8em] sm:text-[2em] text-[1.8em] leading-[1.1] font-[700] tracking-tight ${isDayTime ? 'text-black' : 'text-white'}`}>
                            UI/UX Design <br className={'lg:block md:block hidden'}/>Services
                        </h2>
                    </FxReveal>
                </div>

                {/* Services Grid - 3 columns on desktop, 1 on mobile */}
                <div
                    className={`relative z-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 ${isDayTime ? 'text-black' : 'text-white'}`}>
                    {[
                        {
                            id: 'ux-consultancy',
                            icon: '/assets/ui-ux/ux-consultancy.svg',
                            iconLight: '/assets/ui-ux/ux-consultancy1.svg',
                            title: 'UX Consultancy',
                            description: 'Design products your users will love. Our UX consultancy helps you unlock deeper insights through expert research, interviews, and usability testing—turning user needs into smarter design decisions that drive engagement and growth.',
                            details: ['User Research', 'Interviews & Testing', 'Design Strategy', 'Insight Analysis']
                        },
                        {
                            id: 'web-design',
                            icon: '/assets/ui-ux/web-design.svg',
                            iconLight: '/assets/ui-ux/web-design1.svg',
                            title: 'Web Design',
                            description: 'Maximize your online impact with responsive, high-performing websites designed to engage and convert. We craft digital experiences that reflect your brand, captivate users across all devices, and drive measurable results.',
                            details: ['Responsive Design', 'Brand Integration', 'Performance', 'Conversion Optimization']
                        },
                        {
                            id: 'web-app-ux',
                            icon: '/assets/ui-ux/web-app.svg',
                            iconLight: '/assets/ui-ux/web-app1.svg',
                            title: 'Web App UX',
                            description: 'We design smarter web applications that make complexity feel simple. From multi-step workflows and data-heavy dashboards to dynamic forms, our UX solutions streamline interactions and deliver seamless digital experiences.',
                            details: ['Dashboard Design', 'Workflow Optimization', 'Data Visualization', 'Complex Interactions']
                        },
                        {
                            id: 'mobile-app-ux',
                            icon: '/assets/ui-ux/mobile.svg',
                            iconLight: '/assets/ui-ux/mobile1.svg',
                            title: 'Mobile App UX',
                            description: 'Create mobile experiences that feel effortless and intuitive. Our UX design expertise leverages the full potential of smartphone interactions—optimizing for touch, gestures, and screen size to deliver native-feeling apps.',
                            details: ['Touch Optimization', 'Gesture Design', 'Screen Adaptation', 'Native Performance']
                        },
                        {
                            id: 'ux-audit',
                            icon: '/assets/ui-ux/ux-audit.svg',
                            iconLight: '/assets/ui-ux/ux-audit1.svg',
                            title: 'UX Audit',
                            description: 'Transform user experience into business results with a data-driven UX audit. Our expert evaluation uncovers usability gaps, highlights opportunities, and delivers clear, actionable insights to boost engagement and ROI.',
                            details: ['Usability Testing', 'Gap Analysis', 'Heuristic Evaluation', 'Actionable Roadmap']
                        },
                        {
                            id: 'design-systems',
                            icon: '/assets/ui-ux/design-systems.svg',
                            iconLight: '/assets/ui-ux/design-systems1.svg',
                            title: 'Design Systems',
                            description: 'Build with consistency, scale with confidence. A well-crafted design system unifies your digital products through shared UI standards—enhancing quality, speeding up delivery, and creating seamless experiences.',
                            details: ['Component Library', 'Design Tokens', 'Style Guide', 'Scalability Framework']
                        }
                    ].map((service, idx) => (
                        <FxReveal key={service.id} delay={idx * 0.1}>
                            <FxFrame className="h-full">
                                <div
                                    className={`relative p-6 h-full rounded-2xl transition-all duration-300 hover:shadow-lg ${
                                        isDayTime
                                            ? 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-gray-400'
                                            : 'bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-cyan-400/30 hover:bg-white/10'
                                    }`}>
                                    {/* Icon Container */}
                                    <div className="mb-6 relative">
                                        <div
                                            className={`relative mb-4 w-[72px] h-[72px] rounded-xl flex items-center justify-center transition-all duration-300 ${
                                                isDayTime
                                                    ? 'bg-gradient-to-br from-black/5 to-black/10'
                                                    : 'bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 border border-cyan-400/20'
                                            }`}
                                            style={{
                                                clipPath: 'polygon(0% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 0% 100%, 0% 0%)',
                                            }}>
                                            <Image
                                                src={isDayTime ? service.iconLight : service.icon}
                                                alt={service.title}
                                                width={44}
                                                height={44}
                                                className='object-contain'
                                            />
                                        </div>
                                        {/* Accent line */}
                                        <div
                                            className={`absolute top-0 left-0 h-1 w-12 rounded-full ${isDayTime ? 'bg-black' : 'bg-cyan-400'}`}/>
                                    </div>

                                    {/* Title */}
                                    <h3 className={`text-[1.35em] font-[700] mb-4 tracking-tight ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className={`text-[0.9em] font-[300] leading-[1.6] mb-6 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                                        {service.description}
                                    </p>

                                    {/* Details Pills */}
                                    <div className="flex flex-wrap gap-2">
                                        {service.details.map((detail, i) => (
                                            <span
                                                key={i}
                                                className={`text-[0.75em] px-3 py-1.5 rounded-full font-[500] uppercase tracking-wider ${
                                                    isDayTime
                                                        ? 'bg-black/5 text-black/70 border border-black/10'
                                                        : 'bg-cyan-400/10 text-cyan-300 border border-cyan-400/20'
                                                }`}>
                                                {detail}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Bottom accent gradient */}
                                    <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${
                                        isDayTime ? 'from-transparent via-black/20 to-transparent' : 'from-transparent via-cyan-400/30 to-transparent'
                                    }`}/>
                                </div>
                            </FxFrame>
                        </FxReveal>
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <FxReveal delay={0.6} className="mt-16 relative z-10">
                    <div className={`p-8 rounded-2xl border ${
                        isDayTime
                            ? 'bg-gradient-to-r from-black/2 to-black/5 border-gray-200'
                            : 'bg-gradient-to-r from-cyan-400/5 to-cyan-400/2 border-cyan-400/20'
                    }`}>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h4 className={`text-[1.8em] font-[700] mb-2 ${isDayTime ? 'text-black' : 'text-white'}`}>
                                    Ready to Transform Your Design?
                                </h4>
                                <p className={`text-[0.95em] font-[300] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>
                                    Let's collaborate on creating exceptional user experiences that drive results.
                                </p>
                            </div>
                            <Link href="/contact" className="flex-shrink-0">
                                <button
                                    className={`px-8 py-4 rounded-full font-bold text-[0.95em] transition-all duration-300 whitespace-nowrap ${
                                        isDayTime
                                            ? 'bg-black text-white hover:shadow-lg hover:bg-black/90'
                                            : 'bg-cyan-400 text-black hover:shadow-lg hover:shadow-cyan-400/50 hover:bg-cyan-300'
                                    }`}>
                                    Start Your Project →
                                </button>
                            </Link>
                        </div>
                    </div>
                </FxReveal>
            </section>

            {/* Portfolio Showcase - Futuristic Gallery */}
            <section
                className={`relative lg:py-[5em] md:py-[3em] py-[2em] overflow-hidden transition-colors duration-500 ${isDayTime ? 'bg-gradient-to-b from-black via-slate-950 to-black' : 'bg-gradient-to-b from-white via-slate-50 to-white'}`}>
                <FxBackground className="opacity-30"/>

                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    {/* Section Header */}
                    <FxReveal delay={0.08}>
                        <div className="mb-16 text-center">
                            <div
                                className={`inline-block mb-4 px-4 py-2 rounded-full border ${isDayTime ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-cyan-400/30 bg-cyan-400/5'}`}>
                                <span
                                    className={`text-xs font-semibold tracking-widest uppercase ${isDayTime ? 'text-cyan-300' : 'text-cyan-600'}`}>
                                    Real-World Impact
                                </span>
                            </div>
                            <h2 className={`text-4xl md:text-5xl font-bold leading-tight mb-4 ${isDayTime ? 'text-white' : 'text-black'}`}>
                                <span
                                    className={`bg-gradient-to-r ${isDayTime ? 'from-cyan-300 to-blue-400' : 'from-cyan-600 to-blue-700'} bg-clip-text text-transparent`}>
                                    Portfolio Highlights
                                </span>
                            </h2>
                            <p className={`text-lg max-w-2xl mx-auto ${isDayTime ? 'text-gray-300' : 'text-gray-600'}`}>
                                Transformative design solutions that elevate user experiences across diverse industries
                            </p>
                        </div>
                    </FxReveal>

                    {/* Featured Project - Full Width */}
                    <FxReveal delay={0.16}>
                        <div className="relative mb-12 group">
                            <div
                                className={`absolute -inset-1 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 ${isDayTime ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-cyan-400 to-blue-400'}`}/>
                            <div
                                className={`relative rounded-2xl overflow-hidden border ${isDayTime ? 'border-cyan-500/20 bg-slate-900' : 'border-cyan-400/20 bg-white'}`}>
                                <div className="relative h-96 lg:h-[32rem] overflow-hidden">
                                    <Image
                                        src={'/assets/ui-ux/hotel.jpg'}
                                        alt={'Hotel Booking Platform - UI/UX Case Study'}
                                        width={1920}
                                        height={1080}
                                        priority
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t ${isDayTime ? 'from-slate-950 via-transparent' : 'from-white via-transparent'}`}/>
                                </div>
                                <div className="p-8">
                                    <h3 className={`text-2xl font-bold mb-2 ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        Hotel Booking Platform
                                    </h3>
                                    <p className={`${isDayTime ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                                        Redesigned comprehensive booking flow with enhanced user engagement and 45%
                                        improved conversion rates through intuitive navigation and modern visual
                                        hierarchy.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {['User Research', 'Wireframing', 'Visual Design', 'Prototyping'].map((tag) => (
                                            <span key={tag}
                                                  className={`text-xs px-3 py-1 rounded-full font-medium ${isDayTime ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-cyan-400/20 text-cyan-700 border border-cyan-400/30'}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FxReveal>

                    {/* Dual Project Gallery */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {[
                            {
                                image: '/assets/ui-ux/hotel1.jpg',
                                title: 'Mobile Experience Enhancement',
                                desc: 'Optimized responsive design for seamless multi-device experiences with touch-first interactions',
                                tags: ['Responsive Design', 'Mobile-First', 'UX Testing'],
                                delay: 0.24
                            },
                            {
                                image: '/assets/ui-ux/hotel2.png',
                                title: 'Dashboard Analytics Interface',
                                desc: 'Created intuitive data visualization dashboard with real-time analytics and predictive insights',
                                tags: ['Data Visualization', 'Information Architecture', 'Accessibility'],
                                delay: 0.32
                            }
                        ].map((project, idx) => (
                            <FxReveal key={project.title} delay={project.delay}>
                                <div className="relative group h-full">
                                    <div
                                        className={`absolute -inset-1 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500 ${isDayTime ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-blue-400 to-cyan-400'}`}/>
                                    <div
                                        className={`relative rounded-xl overflow-hidden border h-full flex flex-col ${isDayTime ? 'border-cyan-500/20 bg-slate-900' : 'border-cyan-400/20 bg-white'}`}>
                                        <div className="relative h-64 overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                width={600}
                                                height={550}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-t ${isDayTime ? 'from-slate-950' : 'from-white'}`}/>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h4 className={`text-lg font-bold mb-2 ${isDayTime ? 'text-white' : 'text-black'}`}>
                                                {project.title}
                                            </h4>
                                            <p className={`${isDayTime ? 'text-gray-400' : 'text-gray-500'} text-sm mb-4 flex-1`}>
                                                {project.desc}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag) => (
                                                    <span key={tag}
                                                          className={`text-xs px-2 py-1 rounded-lg font-medium ${isDayTime ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-blue-400/20 text-blue-700 border border-blue-400/30'}`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FxReveal>
                        ))}
                    </div>

                    {/* Gallery Stats */}
                    <FxReveal delay={0.40}>
                        <div
                            className={`grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-6 p-8 rounded-xl border ${isDayTime ? 'border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-950/50' : 'border-cyan-400/20 bg-gradient-to-br from-white/50 to-slate-50/50'}`}>
                            {[
                                {label: 'Projects Completed', value: '150+'},
                                {label: 'User Satisfaction', value: '98%'},
                                {label: 'Avg. Conversion Uplift', value: '42%'},
                                {label: 'Industries Served', value: '25+'}
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div
                                        className={`text-3xl md:text-4xl font-bold mb-2 ${isDayTime ? 'text-cyan-300' : 'text-cyan-600'}`}>
                                        {stat.value}
                                    </div>
                                    <p className={`text-sm font-medium ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </FxReveal>

                    {/* CTA */}
                    <FxReveal delay={0.48}>
                        <div className="text-center mt-12">
                            <Link href="/contact"
                                  className="inline-flex items-center gap-3 px-8 py-3 rounded-lg font-semibold transition-all duration-300 group"
                                  style={{
                                      background: isDayTime
                                          ? 'linear-gradient(135deg, rgb(34, 211, 238), rgb(59, 130, 246))'
                                          : 'linear-gradient(135deg, rgb(34, 211, 238), rgb(59, 130, 246))',
                                      color: isDayTime ? 'rgb(15, 23, 42)' : 'rgb(15, 23, 42)',
                                  }}
                            >
                                View Full Portfolio
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                            </Link>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/* UI/UX Design services overview - Enhanced with FxStickyScrollSection */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>UI/UX Design<br/>services overview</>}
                intro="Our comprehensive UI/UX design services transform digital products into intuitive, beautiful experiences that drive user engagement and business results. We combine human-centered design methodology, strategic thinking, and cutting-edge design tools to create interfaces that are not only visually stunning but also functionally superior. From initial user research through final implementation, we ensure every design decision serves both user needs and business objectives."
                navLabel="Design Solutions"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: "01",
                        title: "User Experience (UX) Design",
                        target: "ux",
                        tags: ["User Research", "Journey Mapping", "Interaction Design"],
                        body: (
                            <div>
                                <p>
                                    We design digital products that feel intuitive, solve real problems, and align
                                    perfectly with your users' goals. Great user experience is no longer a
                                    nice-to-have—it's a competitive advantage that drives engagement, satisfaction, and
                                    long-term growth. We take a strategic approach to UX design, starting with deep
                                    understanding of your audience through user research, journey mapping, and
                                    behavioral analysis.
                                </p>
                                <p className="mt-3">
                                    Our human-centered design methodology ensures every decision is grounded in real
                                    user needs and business objectives. We translate insights into wireframes,
                                    prototypes, and interaction models that streamline workflows, reduce friction, and
                                    support accessibility. Whether launching new products or refining existing ones, we
                                    help you build experiences that are usable, scalable, and future-ready—delivering
                                    meaningful ROI and competitive differentiation.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "02",
                        title: "User Interface (UI) Design",
                        target: "ui",
                        tags: ["Visual Design", "Design Systems", "Component Libraries"],
                        body: (
                            <div>
                                <p>
                                    First impressions are everything in the digital world. A beautifully crafted user
                                    interface not only sets the tone for your product but also reflects your brand's
                                    professionalism and attention to detail. UI design is more than just visuals—it's
                                    about crafting every button, menu, and interactive element to feel intuitive,
                                    seamless, and engaging.
                                </p>
                                <p className="mt-3">
                                    An exceptional UI design strikes the perfect balance between aesthetics and
                                    functionality. It guides users effortlessly through your product, reduces friction,
                                    and builds trust with every interaction. By prioritizing ease of use, consistency,
                                    and clarity, we help you design interfaces that not only look stunning but also
                                    drive conversions and long-term loyalty. Our UI solutions establish cohesive design
                                    systems that scale across your entire digital ecosystem.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "03",
                        title: "Visual Design & Branding",
                        target: "visual",
                        tags: ["Brand Identity", "Design Systems", "Visual Hierarchy"],
                        body: (
                            <div>
                                <p>
                                    Visual design is more than decoration—it's a strategic tool for brand communication
                                    and user engagement. A compelling visual identity brings your brand to life,
                                    reflecting your values, voice, and vision across every touchpoint. Through
                                    high-fidelity designs, carefully curated UI kits, and polished interfaces, we help
                                    brands create digital products that are not only beautiful but also functional,
                                    engaging, and conversion-driven.
                                </p>
                                <p className="mt-3">
                                    Consistency in visual language plays a critical role in shaping user perception and
                                    trust. We focus on building cohesive design systems that ensure every element—from
                                    typography and color to buttons and interactions—aligns with your brand and business
                                    goals. This strategic alignment leads to better user experiences, stronger brand
                                    recognition, and measurable impact across your digital presence.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "04",
                        title: "Accessibility Design (WCAG)",
                        target: "access",
                        tags: ["WCAG Compliance", "Inclusive Design", "Screen Readers"],
                        body: (
                            <div>
                                <p>
                                    Accessibility design is the foundation of everything we do. We are committed to
                                    creating digital experiences that are inclusive, intuitive, and usable for everyone,
                                    regardless of their abilities. Our design process ensures that your products are not
                                    only functional but also welcoming, breaking down barriers for users with diverse
                                    needs.
                                </p>
                                <p className="mt-3">
                                    We prioritize clear navigation, optimized contrast ratios, and color schemes that
                                    adhere to WCAG guidelines. Our interfaces are fully compatible with screen readers
                                    and optimized for keyboard navigation, ensuring users with different abilities can
                                    access and engage seamlessly. Our responsive design approach guarantees consistent,
                                    accessible experiences across all devices, from desktops to mobile phones.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "05",
                        title: "Interactive Prototyping",
                        target: "proto",
                        tags: ["Clickable Prototypes", "User Testing", "Iterative Design"],
                        body: (
                            <div>
                                <p>
                                    Interactive prototyping brings your product vision to life, enabling you to test,
                                    refine, and validate design decisions before development begins. Clickable
                                    prototypes provide valuable insights, allowing you to identify areas for improvement
                                    and ensure the final product aligns with user expectations and business goals.
                                </p>
                                <p className="mt-3">
                                    By integrating prototyping into the design process, you significantly reduce
                                    development costs and accelerate time-to-market. This iterative approach ensures
                                    your product meets user needs while delivering exceptional experiences. With a
                                    prototype aligned with your business objectives, you create products that drive user
                                    engagement, increase conversions, and exceed expectations.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "06",
                        title: "Interaction Design & Animation",
                        target: "inter",
                        tags: ["Microinteractions", "Motion Design", "User Feedback"],
                        body: (
                            <div>
                                <p>
                                    Thoughtfully crafted interactions and animations transform your product into a
                                    dynamic, habit-forming experience that captivates users and drives engagement. By
                                    incorporating playful, intuitive, and innovative motion design, you create moments
                                    of delight that make your product not only functional but memorable.
                                </p>
                                <p className="mt-3">
                                    These micro-interactions do more than entertain—they guide users, reinforce actions,
                                    and build emotional connections with your brand. A well-designed interactive
                                    experience leaves a lasting impression, strengthens brand identity, and encourages
                                    users to return, ultimately boosting satisfaction, loyalty, and conversions across
                                    all touchpoints.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "07",
                        title: "Information Architecture",
                        target: "info",
                        tags: ["Content Organization", "Navigation Design", "Sitemap Planning"],
                        body: (
                            <div>
                                <p>
                                    A well-structured information architecture is key to creating digital experiences
                                    that are intuitive, efficient, and engaging. By organizing content through clear
                                    sitemaps and thoughtful architecture diagrams, users can effortlessly find what they
                                    need—reducing friction, increasing satisfaction, and driving conversions.
                                </p>
                                <p className="mt-3">
                                    With a user-centered design approach, information architecture becomes a strategic
                                    tool that bridges business objectives and user needs. It ensures your product is not
                                    only easy to navigate but also aligned with how users think and behave, resulting in
                                    a more usable, enjoyable, and goal-oriented experience that drives measurable
                                    business results.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "08",
                        title: "Usability Testing & Research",
                        target: "use",
                        tags: ["User Testing", "Behavioral Analysis", "Design Validation"],
                        body: (
                            <div>
                                <p>
                                    UX goes beyond aesthetics—it's a practical, user-driven discipline focused on
                                    creating meaningful and effective experiences. Usability testing plays a crucial
                                    role by observing real users as they interact with your product, revealing pain
                                    points, uncovering design flaws, and highlighting opportunities for improvement.
                                </p>
                                <p className="mt-3">
                                    These insights allow us to refine interfaces, streamline user journeys, and enhance
                                    overall performance. By continuously testing and iterating, we ensure your digital
                                    product not only looks great but functions seamlessly—delivering a satisfying
                                    experience that drives engagement, loyalty, and measurable results for your
                                    business.
                                </p>
                            </div>
                        ),
                    },
                ]}
            />

            {/* Service item sections with IDs for scroll tracking */}
            <div id="ux" className="scroll-mt-20"/>
            <div id="ui" className="scroll-mt-20"/>
            <div id="visual" className="scroll-mt-20"/>
            <div id="access" className="scroll-mt-20"/>
            <div id="proto" className="scroll-mt-20"/>
            <div id="inter" className="scroll-mt-20"/>
            <div id="info" className="scroll-mt-20"/>
            <div id="use" className="scroll-mt-20"/>

            {/* Mobile & iPad Experience Showcase - Advanced Futuristic Gallery */}
            <section
                className={`relative md:py-[3em] py-[2em] overflow-hidden transition-colors duration-500 ${isDayTime ? 'bg-gradient-to-b from-slate-950 via-black to-slate-950' : 'bg-gradient-to-b from-slate-100 via-white to-slate-100'}`}>
                <FxBackground className="opacity-25"/>

                {/* Advanced Particle Overlay */}
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"/>
                    <div
                        className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
                        style={{animationDelay: '0.5s'}}/>
                </div>

                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    {/* Section Header with Enhanced Styling */}
                    <FxReveal delay={0.08}>
                        <div className="mb-16 text-center relative z-10">
                            <div
                                className={`inline-block mb-4 px-4 py-2 rounded-full border backdrop-blur-sm ${isDayTime ? 'border-blue-500/40 bg-blue-500/10' : 'border-blue-400/40 bg-blue-400/10'}`}>
                                <span
                                    className={`text-xs font-semibold tracking-widest uppercase ${isDayTime ? 'text-blue-200' : 'text-blue-700'}`}>
                                    ✨ Cross-Device Excellence
                                </span>
                            </div>
                            <h2 className={`text-4xl md:text-5xl font-bold leading-tight mb-4 ${isDayTime ? 'text-white' : 'text-black'}`}>
                                <span
                                    className={`bg-gradient-to-r ${isDayTime ? 'from-blue-300 via-cyan-400 to-blue-400' : 'from-blue-600 via-cyan-700 to-blue-600'} bg-clip-text text-transparent`}>
                                    Responsive Mobile & Tablet Design
                                </span>
                            </h2>
                            <p className={`text-lg max-w-3xl mx-auto ${isDayTime ? 'text-gray-300' : 'text-gray-600'}`}>
                                Revolutionary experiences tailored for every device with intelligent responsive systems,
                                advanced gesture recognition, and adaptive performance optimization
                            </p>
                        </div>
                    </FxReveal>

                    {/* Featured Mobile Showcase - Premium Card */}
                    <FxReveal delay={0.16}>
                        <div className="relative mb-16 group">
                            {/* Multi-layer Glow Effect */}
                            <div
                                className={`absolute -inset-1 rounded-2xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-700 ${isDayTime ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500' : 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400'}`}/>
                            <div
                                className={`absolute -inset-0.5 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 ${isDayTime ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-cyan-400 to-blue-400'}`}/>

                            <div
                                className={`relative rounded-2xl overflow-hidden border backdrop-blur-sm ${isDayTime ? 'border-blue-500/30 bg-slate-900/80' : 'border-blue-400/30 bg-white/90'}`}>
                                <div className="relative h-96 lg:h-[32rem] overflow-hidden">
                                    <Image
                                        src={'/assets/ui-ux/mob.jpg'}
                                        alt={'Mobile Application Design - Responsive Showcase'}
                                        width={1920}
                                        height={1080}
                                        priority
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t ${isDayTime ? 'from-slate-950 via-transparent to-transparent' : 'from-white via-transparent to-transparent'}`}/>
                                    {/* Corner accents */}
                                    <div
                                        className={`absolute top-4 right-4 w-2 h-2 rounded-full ${isDayTime ? 'bg-cyan-400' : 'bg-cyan-600'} animate-pulse`}/>
                                    <div
                                        className={`absolute bottom-4 left-4 w-2 h-2 rounded-full ${isDayTime ? 'bg-blue-400' : 'bg-blue-600'} animate-pulse`}
                                        style={{animationDelay: '0.3s'}}/>
                                </div>
                                <div className="p-8 border-t"
                                     style={{borderColor: isDayTime ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)'}}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className={`text-2xl font-bold mb-2 ${isDayTime ? 'text-white' : 'text-black'}`}>
                                                Mobile-First Application Interface
                                            </h3>
                                            <p className={`${isDayTime ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Advanced responsive architecture with AI-driven layout optimization,
                                                predictive interaction patterns, and seamless cross-device
                                                synchronization ensuring exceptional performance across all platform
                                                ecosystems.
                                            </p>
                                        </div>
                                        <div
                                            className={`text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap ml-4 ${isDayTime ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-cyan-400/20 text-cyan-700 border border-cyan-400/30'}`}>
                                            Featured
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['Responsive Layout', 'Touch Optimization', 'Performance', 'Accessibility', 'AI Adaptation'].map((tag, i) => (
                                            <span key={tag}
                                                  className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 hover:scale-110 cursor-default ${isDayTime ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-blue-400/20 text-blue-700 border border-blue-400/30'}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FxReveal>

                    {/* Advanced Capability Metrics - Mid Section */}
                    <FxReveal delay={0.24}>
                        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-16">
                            {[
                                {icon: '📱', label: 'Device Support', value: '50+', desc: 'Devices optimized'},
                                {icon: '⚡', label: 'Performance', value: '98%', desc: 'PageSpeed score'},
                                {icon: '🎯', label: 'Touch Points', value: '1000+', desc: 'Optimized targets'},
                                {icon: '🔄', label: 'Sync Speed', value: '<100ms', desc: 'Cross-device'}
                            ].map((metric, idx) => (
                                <div key={metric.label}
                                     className={`relative group p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${isDayTime ? 'border-blue-500/20 bg-slate-900/50 hover:bg-slate-900/70' : 'border-blue-400/20 bg-white/50 hover:bg-white/70'}`}>
                                    <div
                                        className={`absolute -inset-1 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300 ${isDayTime ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-blue-400 to-cyan-400'}`}/>
                                    <div className="relative">
                                        <div className="text-2xl mb-1">{metric.icon}</div>
                                        <div
                                            className={`text-2xl font-bold mb-1 ${isDayTime ? 'text-cyan-300' : 'text-cyan-700'}`}>
                                            {metric.value}
                                        </div>
                                        <p className={`text-xs font-semibold ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {metric.label}
                                        </p>
                                        <p className={`text-xs ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {metric.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FxReveal>

                    {/* Tablet & Mobile Comparison Gallery - Enhanced */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-16">
                        {[
                            {
                                image: '/assets/ui-ux/mob1.jpg',
                                title: 'Tablet Experience Design',
                                desc: 'Intelligent tablet interfaces with adaptive layouts that leverage expanded screen real estate for sophisticated information hierarchies, multi-column content flows, and advanced gesture-based navigation systems.',
                                tags: ['Adaptive Layout', 'Multi-Column', 'Advanced Gestures', 'Split-View'],
                                icon: '⬜',
                                delay: 0.32
                            },
                            {
                                image: '/assets/ui-ux/mob2.png',
                                title: 'Mobile App Interface',
                                desc: 'Ultra-optimized mobile designs with biomechanical interaction patterns, thumb-friendly navigation zones, and intelligent single-column layouts featuring contextual UI adaptation for superior on-the-go usability.',
                                tags: ['Thumb-Optimized', 'Biomechanics', 'Context-Aware', 'One-Handed'],
                                icon: '📱',
                                delay: 0.40
                            }
                        ].map((project, idx) => (
                            <FxReveal key={project.title} delay={project.delay}>
                                <div className="relative group h-full">
                                    {/* Premium Glow */}
                                    <div
                                        className={`absolute -inset-1 rounded-2xl blur-2xl opacity-25 group-hover:opacity-50 transition duration-700 ${isDayTime ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-cyan-400 to-blue-400'}`}/>
                                    <div
                                        className={`relative rounded-2xl overflow-hidden border h-full flex flex-col backdrop-blur-sm ${isDayTime ? 'border-cyan-500/30 bg-slate-900/80' : 'border-cyan-400/30 bg-white/90'}`}>
                                        {/* Header Badge */}
                                        <div className={`absolute top-4 left-4 z-20 text-2xl`}>
                                            {project.icon}
                                        </div>

                                        <div className="relative h-56 overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                width={600}
                                                height={450}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-t ${isDayTime ? 'from-slate-950 via-slate-950/50' : 'from-white via-white/50'}`}/>
                                            <div
                                                className={`absolute top-0 right-0 w-1 h-12 ${isDayTime ? 'bg-gradient-to-b from-cyan-400 to-transparent' : 'bg-gradient-to-b from-cyan-600 to-transparent'}`}/>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h4 className={`text-xl font-bold mb-2 ${isDayTime ? 'text-white' : 'text-black'}`}>
                                                {project.title}
                                            </h4>
                                            <p className={`${isDayTime ? 'text-gray-400' : 'text-gray-500'} text-sm mb-4 flex-1 leading-relaxed`}>
                                                {project.desc}
                                            </p>
                                            <div className="flex flex-wrap gap-2 pt-2 border-t"
                                                 style={{borderColor: isDayTime ? 'rgba(34, 211, 238, 0.1)' : 'rgba(34, 211, 238, 0.1)'}}>
                                                {project.tags.map((tag) => (
                                                    <span key={tag}
                                                          className={`text-xs px-2.5 py-1 rounded-md font-medium ${isDayTime ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-cyan-400/20 text-cyan-700 border border-cyan-400/30'}`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FxReveal>
                        ))}
                    </div>

                    {/* Advanced Responsive Metrics Grid */}
                    <FxReveal delay={0.48}>
                        <div
                            className={`grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-6 p-8 rounded-2xl border backdrop-blur-sm ${isDayTime ? 'border-blue-500/30 bg-gradient-to-br from-slate-900/60 to-slate-950/60' : 'border-blue-400/30 bg-gradient-to-br from-white/60 to-slate-50/60'}`}>
                            {[
                                {label: 'Mobile Apps', value: '120+', trend: '↑ 12%'},
                                {label: 'Devices Tested', value: '85+', trend: '↑ 8%'},
                                {label: 'Avg Load Time', value: '1.2s', trend: '↓ 15%'},
                                {label: 'Mobile Traffic', value: '68%', trend: '↑ 5%'}
                            ].map((stat) => (
                                <div key={stat.label}
                                     className="text-center group p-4 rounded-lg transition-all duration-300">
                                    <div
                                        className={`text-3xl md:text-4xl font-bold mb-1 ${isDayTime ? 'text-blue-300' : 'text-blue-600'}`}>
                                        {stat.value}
                                    </div>
                                    <p className={`text-sm font-medium mb-2 ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {stat.label}
                                    </p>
                                    <span
                                        className={`text-xs font-semibold px-2 py-1 rounded ${isDayTime ? 'text-green-300 bg-green-500/10' : 'text-green-700 bg-green-400/10'}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </FxReveal>

                    {/* Enhanced CTA Section */}
                    <FxReveal delay={0.56}>
                        <div className="text-center mt-16">
                            <div className="inline-flex flex-col items-center gap-4">
                                <Link href="/contact"
                                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 group relative overflow-hidden"
                                      style={{
                                          background: isDayTime
                                              ? 'linear-gradient(135deg, rgb(59, 130, 246), rgb(34, 211, 238))'
                                              : 'linear-gradient(135deg, rgb(59, 130, 246), rgb(34, 211, 238))',
                                          color: isDayTime ? 'rgb(15, 23, 42)' : 'rgb(15, 23, 42)',
                                      }}
                                >
                                    <span className="relative z-10">Start Your Mobile Design Project</span>
                                    <ArrowRight
                                        className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10"/>
                                </Link>
                                <p className={`text-sm ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Join 200+ brands transforming their mobile presence
                                </p>
                            </div>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/* Designers Collaborate - Digital Adventure Style */}
            <div className={`relative lg:py-32 py-16 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                {/* Aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>TEAM COLLABORATION</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-black/10' : 'bg-white/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-black/30' : 'text-white/30'}`}>DESIGN EXCELLENCE</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <FxReveal className="lg:order-2">
                            <div className="relative">
                                <div
                                    className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-sm z-10"/>
                                <div
                                    className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-sm z-10"/>
                                <div className="absolute inset-0 rounded-2xl opacity-40"
                                     style={{boxShadow: '0 0 60px -10px rgba(59,130,246,0.5)'}}/>
                                <div className="relative overflow-hidden rounded-2xl">
                                    <Image src={'/assets/ui-ux/designers.png'} alt={'UI/UX Designers Collaboration'}
                                           width={900}
                                           height={520} className="w-full object-cover rounded-2xl"/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, transparent 60%)'}}/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(59,130,246,0.03) 3px, rgba(59,130,246,0.03) 4px)'}}/>
                                    <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                                                viewport={{once: true}} transition={{delay: 0.4}}
                                                className="absolute bottom-5 left-5 px-4 py-2 rounded-full backdrop-blur-md text-[0.72em] font-semibold tracking-wider text-blue-300"
                                                style={{
                                                    background: 'rgba(0,0,0,0.65)',
                                                    border: '1px solid rgba(59,130,246,0.35)'
                                                }}>
                                        - Design System · Dev Collaboration · QA Integration
                                    </motion.div>
                                </div>
                                <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}}
                                            viewport={{once: true}}
                                            transition={{delay: 0.5, type: 'spring', stiffness: 120}}
                                            className="absolute -right-6 top-10 hidden lg:block">
                                    <div className="rounded-2xl px-5 py-4 backdrop-blur-xl text-center min-w-[110px]"
                                         style={{
                                             background: isDayTime ? 'rgba(15,15,15,0.85)' : 'rgba(255,255,255,0.85)',
                                             border: '1px solid rgba(59,130,246,0.35)'
                                         }}>
                                        <div className="text-[2em] font-[900] text-blue-400 leading-none">Crafted</div>
                                        <div
                                            className={`text-[0.65em] font-[600] tracking-widest mt-1 uppercase ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>Together
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FxReveal>

                        <div>
                            <FxReveal delay={0.1}>
                                <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8">How
                                    our UX and UI <span
                                        className="gx-gradient-text">designers collaborate</span><br/><span
                                        className={`text-[0.65em] font-[300] ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>excellence through teamwork.</span>
                                </h2>
                            </FxReveal>
                            <FxReveal delay={0.18}>
                                <p className={`text-[0.95em] leading-[1.8] mb-6 ${isDayTime ? 'text-black/75' : 'text-white/70'}`}>
                                    We bring a fast, flexible, and collaborative approach to every project—making the
                                    process as enjoyable as it is effective. Crafting exceptional digital products is a
                                    team effort, and our dedication doesn't stop at the design handoff.</p>
                            </FxReveal>
                            <FxReveal delay={0.24}>
                                <p className={`text-[0.95em] leading-[1.8] mb-10 pb-10 border-b ${isDayTime ? 'text-black/75 border-black/10' : 'text-white/70 border-white/10'}`}>
                                    Our design team works closely with front-end developers and QA specialists to
                                    maintain design integrity, streamline implementation, and uphold the highest
                                    standards of quality. This end-to-end collaboration ensures the final product not
                                    only looks great but performs seamlessly.</p>
                            </FxReveal>
                            <FxReveal delay={0.3}>
                                <div
                                    className="flex flex-wrap gap-3 mb-10">{['Design Systems', 'Developer Collaboration', 'QA Integration', 'Performance Focus'].map(i => (
                                    <span key={i}
                                          className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border ${isDayTime ? 'border-blue-700/30 text-blue-700 bg-blue-700/06' : 'border-blue-400/30 text-blue-300 bg-blue-500/08'}`}>{i}</span>
                                ))}
                                </div>
                            </FxReveal>
                            <FxReveal delay={0.36}>
                                <p className={`text-[0.88em] font-[400] mb-6 ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>Ready
                                    to experience seamless design collaboration?</p>
                                <Link href="/company">
                                    <FxButton day={!isDayTime} variant="solid">Learn About Our Team <span
                                        className="text-[1.2em] leading-none ml-1">→</span></FxButton>
                                </Link>
                            </FxReveal>
                        </div>
                    </div>

                    <FxReveal delay={0.1} y={16}>
                        <div
                            className={`mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t ${isDayTime ? 'border-black/10' : 'border-white/10'}`}>
                            {[{val: '50+', label: 'Projects Delivered'}, {
                                val: '8+',
                                label: 'Years of Excellence'
                            }, {val: '100%', label: 'Design Accuracy'}, {
                                val: '98%',
                                label: 'Client Satisfaction'
                            }].map(s => (
                                <div key={s.label} className="text-center lg:text-left">
                                    <div
                                        className="text-[2.2em] font-[900] gx-gradient-text leading-none mb-1">{s.val}</div>
                                    <div
                                        className={`text-[0.72em] font-[500] tracking-tight ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </FxReveal>
                </div>
            </div>

            {/* Tools - Professional Futuristic Stack */}
            <div
                className={`relative lg:py-32 py-20 lg:mb-16 mb-10 max-w-full w-full mx-auto overflow-hidden transition-colors duration-500 ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>

                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(59,130,246,0.06)' : 'rgba(37,99,235,0.07)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(59,130,246,0.06)' : 'rgba(37,99,235,0.07)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                {/* Aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)'}}/>
                </div>

                <div className={`relative z-10 px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}
                     id={'tools'}>
                    {/* Header Section */}
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-16">
                            <FxChip day={isDayTime}>DESIGN TECHNOLOGY STACK</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-black/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-white/30' : 'text-black/30'}`}>CREATIVE EXCELLENCE</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
                        <FxReveal>
                            <div>
                                <h2 className={`text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8`}>
                                    Our go-to <span className="gx-gradient-text">UX/UI tools</span>
                                </h2>
                                <p className={`text-[0.95em] leading-[1.8] ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                                    We leverage industry-leading design platforms and creative software to craft
                                    exceptional digital experiences. Each tool is strategically selected to enhance
                                    collaboration, accelerate workflows, and maintain the highest design standards
                                    across all project phases.
                                </p>
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.1}>
                            <div
                                className={`grid grid-cols-2 gap-6 p-8 rounded-2xl border backdrop-blur-sm ${isDayTime ? 'border-blue-500/20 bg-slate-900/50' : 'border-blue-400/20 bg-white/50'}`}>
                                <div className="text-center">
                                    <div
                                        className={`text-3xl font-bold mb-2 ${isDayTime ? 'text-blue-300' : 'text-blue-600'}`}>6
                                    </div>
                                    <p className={`text-sm font-medium ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Core
                                        Tools</p>
                                </div>
                                <div className="text-center border-l"
                                     style={{borderColor: isDayTime ? 'rgba(59,130,246,0.2)' : 'rgba(37,99,235,0.2)'}}>
                                    <div
                                        className={`text-3xl font-bold mb-2 ${isDayTime ? 'text-blue-300' : 'text-blue-600'}`}>15+
                                    </div>
                                    <p className={`text-sm font-medium ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Integrations</p>
                                </div>
                            </div>
                        </FxReveal>
                    </div>

                    {/* Tools Grid */}
                    <div className={`grid lg:grid-cols-2 gap-8`}>
                        {[
                            {
                                name: 'Axure',
                                icon: isDayTime ? '/assets/ui-ux/axure1.svg' : '/assets/ui-ux/axure.svg',
                                category: 'Interactive Prototyping',
                                description: 'Advanced prototyping platform enabling realistic, functional prototypes that validate design concepts before development',
                                capabilities: ['High-Fidelity Prototypes', 'Dynamic Interactions', 'Responsive Testing', 'User Flow Validation'],
                                delay: 0.12
                            },
                            {
                                name: 'Figma',
                                icon: isDayTime ? '/assets/ui-ux/figma1.svg' : '/assets/ui-ux/figma.svg',
                                category: 'Collaborative Design',
                                description: 'Cloud-native design platform enabling real-time team collaboration, version control, and seamless design-to-dev handoff',
                                capabilities: ['Real-Time Collaboration', 'Design Systems', 'Prototyping', 'Developer Handoff'],
                                delay: 0.2
                            },
                            {
                                name: 'After Effects',
                                icon: isDayTime ? '/assets/ui-ux/aftereffect1.svg' : '/assets/ui-ux/aftereffect.svg',
                                category: 'Motion & Animation',
                                description: 'Industry-standard motion graphics tool for creating sophisticated animations that enhance storytelling and user engagement',
                                capabilities: ['Complex Animations', 'Visual Effects', 'Motion Design', 'Interactive Sequences'],
                                delay: 0.28
                            },
                            {
                                name: 'Lottie',
                                icon: isDayTime ? '/assets/ui-ux/lottie1.svg' : '/assets/ui-ux/lottie.svg',
                                category: 'Lightweight Motion',
                                description: 'Lightweight animation framework delivering high-quality motion graphics with minimal performance impact',
                                capabilities: ['Lightweight Animations', 'JSON Export', 'Cross-Platform', 'Performance Optimized'],
                                delay: 0.36
                            },
                            {
                                name: 'Sketch',
                                icon: isDayTime ? '/assets/ui-ux/sketch1.svg' : '/assets/ui-ux/sketch.svg',
                                category: 'Vector Design',
                                description: 'Powerful vector editing tool perfect for crafting detailed illustrations, icons, and scalable graphic assets',
                                capabilities: ['Vector Editing', 'Icon Design', 'Illustration', 'Asset Management'],
                                delay: 0.44
                            },
                            {
                                name: 'Miro',
                                icon: isDayTime ? '/assets/ui-ux/miro1.svg' : '/assets/ui-ux/miro.svg',
                                category: 'Strategic Ideation',
                                description: 'Virtual collaboration whiteboard powering design sprints, workshops, and strategic discovery sessions',
                                capabilities: ['Team Brainstorming', 'Design Sprints', 'Workshops', 'Ideation Sessions'],
                                delay: 0.52
                            }
                        ].map((tool, idx) => (
                            <FxReveal key={tool.name} delay={tool.delay}>
                                <div className="relative group h-full">
                                    {/* Glow effect */}
                                    <div
                                        className={`absolute -inset-1 rounded-2xl blur-2xl opacity-25 group-hover:opacity-50 transition duration-700 ${isDayTime ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-blue-400 to-cyan-400'}`}/>

                                    <div
                                        className={`relative rounded-2xl overflow-hidden border h-full flex flex-col backdrop-blur-sm p-8 transition-all duration-300 ${isDayTime ? 'border-blue-500/30 bg-slate-900/80 hover:bg-slate-900/95' : 'border-blue-400/30 bg-white/90 hover:bg-white/100'}`}>
                                        {/* Header with icon */}
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex-1">
                                                <div
                                                    className={`text-xs font-semibold tracking-widest uppercase mb-3 ${isDayTime ? 'text-blue-300/70' : 'text-blue-600/70'}`}>
                                                    {tool.category}
                                                </div>
                                                <h3 className={`text-2xl font-bold ${isDayTime ? 'text-white' : 'text-black'}`}>
                                                    {tool.name}
                                                </h3>
                                            </div>
                                            <div
                                                className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${isDayTime ? 'bg-blue-500/10' : 'bg-blue-400/10'} border ${isDayTime ? 'border-blue-500/20' : 'border-blue-400/20'}`}>
                                                <Image
                                                    src={tool.icon}
                                                    alt={tool.name}
                                                    width={40}
                                                    height={40}
                                                />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className={`text-[0.95em] leading-[1.6] mb-6 flex-1 ${isDayTime ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {tool.description}
                                        </p>

                                        {/* Capabilities */}
                                        <div
                                            className={`pt-6 border-t ${isDayTime ? 'border-blue-500/10' : 'border-blue-400/10'}`}>
                                            <div className="grid grid-cols-2 gap-3">
                                                {tool.capabilities.map((cap) => (
                                                    <span key={cap}
                                                          className={`text-xs px-3 py-2 rounded-lg font-medium text-center ${isDayTime ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-400/15 text-blue-700'}`}>
                                                        {cap}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FxReveal>
                        ))}
                    </div>

                    {/* Bottom CTA Section */}
                    <FxReveal delay={0.6} y={16}>
                        <div
                            className={`mt-16 p-10 rounded-2xl border backdrop-blur-sm text-center ${isDayTime ? 'border-blue-500/20 bg-gradient-to-br from-slate-900/50 to-slate-950/50' : 'border-blue-400/20 bg-gradient-to-br from-white/50 to-slate-50/50'}`}>
                            <p className={`text-[0.95em] leading-[1.8] mb-6 ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                                Our strategic combination of tools creates an integrated ecosystem enabling seamless
                                collaboration from concept through delivery, ensuring design excellence at every stage.
                            </p>
                            <div className={`h-px my-6 ${isDayTime ? 'bg-white/10' : 'bg-black/10'}`}/>
                            <p className={`text-[0.85em] font-medium ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>
                                Ready to see these tools in action? Let's create something extraordinary together.
                            </p>
                        </div>
                    </FxReveal>
                </div>
            </div>

            {/* UI/UX Planning - Premium Showcase */}
            <div
                className={`relative lg:-mt-[4em] lg:py-32 py-16 overflow-hidden transition-colors duration-500 ${isDayTime ? 'bg-gradient-to-b from-slate-100 via-white to-slate-100' : 'bg-gradient-to-b from-slate-950 via-black to-slate-950'}`}>
                {/* Decorative grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(37,99,235,0.04)' : 'rgba(59,130,246,0.03)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(37,99,235,0.04)' : 'rgba(59,130,246,0.03)'} 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}/>

                {/* Subtle aurora effects */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-48 -left-48 w-[800px] h-[800px] rounded-full opacity-15"
                         style={{background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                    {/* Section label */}
                    <FxReveal>
                        <div className="flex items-center gap-3 mb-12 justify-center">
                            <div className={`h-px w-8 ${isDayTime ? 'bg-blue-400/40' : 'bg-blue-500/40'}`}/>
                            <span
                                className={`text-xs font-semibold tracking-widest uppercase ${isDayTime ? 'text-blue-600' : 'text-blue-300'}`}>
                                STRATEGIC PLANNING
                            </span>
                            <div className={`h-px w-8 ${isDayTime ? 'bg-blue-400/40' : 'bg-blue-500/40'}`}/>
                        </div>
                    </FxReveal>

                    {/* Main content with showcase */}
                    <div className="max-w-7xl mx-auto">
                        <FxReveal delay={0.08}>
                            <div className="relative group mb-12">
                                {/* Premium layered glow */}
                                <div
                                    className={`absolute -inset-2 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition duration-700 ${isDayTime ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400' : 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500'}`}/>
                                <div
                                    className={`absolute -inset-1 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-500 ${isDayTime ? 'bg-gradient-to-r from-cyan-400 to-blue-400' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}/>

                                <div
                                    className={`relative rounded-3xl overflow-hidden border backdrop-blur-md ${isDayTime ? 'border-blue-400/25 bg-white/90' : 'border-blue-500/25 bg-slate-900/85'}`}>
                                    {/* Decorative corner accents */}
                                    <div
                                        className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-blue-400 rounded-tl z-10"/>
                                    <div
                                        className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-400 rounded-tr z-10"/>
                                    <div
                                        className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-blue-400 rounded-bl z-10"/>
                                    <div
                                        className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-blue-400 rounded-br z-10"/>

                                    {/* Image container */}
                                    <div className="relative overflow-hidden py-4">
                                        <Image
                                            src={'/assets/ui-ux/planning.jpeg'}
                                            alt={'Strategic UI/UX Planning Process'}
                                            width={2920}
                                            height={2080}
                                            priority
                                            className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Gradient overlays */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-t ${isDayTime ? 'from-white via-transparent to-transparent' : 'from-slate-950 via-transparent to-transparent'}`}/>
                                        <div
                                            className={`absolute inset-0 pointer-events-none ${isDayTime ? 'opacity-5' : 'opacity-10'}`}
                                            style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.05) 2px, rgba(59,130,246,0.05) 4px)'}}/>

                                        {/* Tech badge */}
                                        <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                                                    viewport={{once: true}} transition={{delay: 0.5}}
                                                    className="absolute bottom-6 left-6 px-5 py-3 rounded-full backdrop-blur-lg text-[0.75em] font-semibold tracking-wide"
                                                    style={{
                                                        background: isDayTime ? 'rgba(255,255,255,0.7)' : 'rgba(15,15,15,0.7)',
                                                        border: `1px solid ${isDayTime ? 'rgba(37,99,235,0.4)' : 'rgba(59,130,246,0.4)'}`
                                                    }}>
                                            <span className={`${isDayTime ? 'text-blue-700' : 'text-blue-300'}`}>
                                                ✨ End-to-End Design Strategy
                                            </span>
                                        </motion.div>

                                        {/* Process label */}
                                        <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}}
                                                    viewport={{once: true}}
                                                    transition={{delay: 0.6, type: 'spring', stiffness: 120}}
                                                    className="absolute top-6 right-6 hidden lg:block">
                                            <div className="rounded-2xl px-4 py-3 backdrop-blur-xl text-center"
                                                 style={{
                                                     background: isDayTime ? 'rgba(255,255,255,0.8)' : 'rgba(15,15,15,0.8)',
                                                     border: `1px solid ${isDayTime ? 'rgba(37,99,235,0.3)' : 'rgba(59,130,246,0.3)'}`
                                                 }}>
                                                <div
                                                    className={`text-lg font-bold ${isDayTime ? 'text-blue-700' : 'text-blue-300'}`}>Comprehensive
                                                </div>
                                                <div
                                                    className={`text-xs font-semibold tracking-widest mt-1 ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>PLANNING
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Bottom info bar */}
                                    <div
                                        className={`border-t px-8 py-6 ${isDayTime ? 'border-blue-400/10 bg-white/50' : 'border-blue-500/10 bg-slate-900/50'}`}>
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div>
                                                <div
                                                    className={`text-2xl font-bold mb-1 ${isDayTime ? 'text-blue-600' : 'text-blue-300'}`}>8+
                                                </div>
                                                <p className={`text-xs font-medium ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>Process
                                                    Stages</p>
                                            </div>
                                            <div
                                                className={`border-x ${isDayTime ? 'border-blue-400/10' : 'border-blue-500/10'}`}>
                                                <div
                                                    className={`text-2xl font-bold mb-1 ${isDayTime ? 'text-blue-600' : 'text-blue-400'}`}>100%
                                                </div>
                                                <p className={`text-xs font-medium ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>Client
                                                    Input</p>
                                            </div>
                                            <div>
                                                <div
                                                    className={`text-2xl font-bold mb-1 ${isDayTime ? 'text-blue-600' : 'text-blue-300'}`}>Zero
                                                </div>
                                                <p className={`text-xs font-medium ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>Hidden
                                                    Costs</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FxReveal>

                        {/* Description below showcase */}
                        <FxReveal delay={0.16}>
                            <div className="text-center mt-12">
                                <h3 className={`text-2xl lg:text-3xl font-bold mb-4 ${isDayTime ? 'text-black' : 'text-white'}`}>
                                    Strategic Planning Methodology
                                </h3>
                                <p className={`text-[0.95em] leading-[1.8] max-w-2xl mx-auto ${isDayTime ? 'text-gray-600' : 'text-gray-300'}`}>
                                    Our comprehensive planning framework ensures every design decision is grounded in
                                    user research, business objectives, and market analysis. From discovery and strategy
                                    through prototyping and validation, we maintain meticulous attention to detail at
                                    every stage.
                                </p>

                                {/* Key pillars */}
                                <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-10">
                                    {['Research', 'Strategy', 'Design', 'Validation'].map((pillar) => (
                                        <div key={pillar}
                                             className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${isDayTime ? 'border-blue-400/20 bg-white/50' : 'border-blue-500/20 bg-slate-900/50'}`}>
                                            <div
                                                className={`text-sm font-semibold ${isDayTime ? 'text-blue-600' : 'text-blue-300'}`}>{pillar}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </div>

            {/* Business Benefits - Advanced Premium Grid */}
            <div
                className={`relative lg:py-32 py-20 max-w-full w-full mx-auto overflow-hidden transition-colors duration-500 ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>

                {/* Advanced Grid background with animation */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 opacity-40 animate-pulse" style={{
                        backgroundImage: `linear-gradient(${isDayTime ? 'rgba(59,130,246,0.08)' : 'rgba(37,99,235,0.09)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(59,130,246,0.08)' : 'rgba(37,99,235,0.09)'} 1px, transparent 1px)`,
                        backgroundSize: '44px 44px',
                    }}/>
                </div>

                {/* Multiple layered aurora blobs with staggered animation */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                        className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full opacity-30 animate-pulse"
                        style={{background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'}}/>
                    <div
                        className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full opacity-15 animate-pulse"
                        style={{
                            background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)',
                            animationDelay: '0.5s'
                        }}/>
                    <div
                        className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full opacity-10 animate-pulse"
                        style={{
                            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
                            animationDelay: '1s'
                        }}/>
                </div>

                <div className={`relative z-10 px-4 sm:px-6 md:px-10 lg:px-[4.5em]`} id={'benefits'}>
                    {/* Header Section with enhanced styling */}
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-16">
                            <FxChip day={isDayTime}>BUSINESS IMPACT</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-black/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-white/30' : 'text-black/30'}`}>ROI DRIVEN</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
                        <FxReveal>
                            <div>
                                <h2 className={`text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8`}>
                                    UX/UI <span className="gx-gradient-text">business benefits</span>
                                </h2>
                                <p className={`text-[0.95em] leading-[1.8] mb-6 ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                                    Strategic design delivers measurable business outcomes. A thoughtfully crafted user
                                    experience expands your market reach, accelerates customer acquisition, and drives
                                    sustainable growth through superior engagement and retention.
                                </p>
                                <p className={`text-[0.95em] leading-[1.8] mb-8 ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                                    We've delivered transformative digital experiences across diverse industries. When
                                    you partner with us, you gain strategic expertise, proven methodologies, and a
                                    committed team dedicated to creating products that drive real business impact.
                                </p>
                                <div
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${isDayTime ? 'border-blue-500/30 bg-blue-500/10' : 'border-blue-400/30 bg-blue-400/10'}`}>
                                    <div
                                        className={`w-2 h-2 rounded-full animate-pulse ${isDayTime ? 'bg-blue-400' : 'bg-blue-600'}`}/>
                                    <span
                                        className={`text-xs font-semibold ${isDayTime ? 'text-blue-300' : 'text-blue-700'}`}>Proven Results</span>
                                </div>
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.1}>
                            <div className={`grid grid-cols-2 gap-6 relative`}>
                                {/* Stats card glow overlay */}
                                <div
                                    className={`absolute -inset-4 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-700 ${isDayTime ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-blue-400 to-cyan-400'}`}/>

                                {[
                                    {value: '50+', label: 'Projects Completed', icon: '🎯'},
                                    {value: '8+', label: 'Years Experience', icon: '⭐'},
                                    {value: '200%', label: 'Avg ROI Increase', icon: '📈'},
                                    {value: '98%', label: 'Client Satisfaction', icon: '💎'}
                                ].map((stat, idx) => (
                                    <motion.div key={stat.label}
                                                initial={{opacity: 0, y: 10}}
                                                whileInView={{opacity: 1, y: 0}}
                                                viewport={{once: true}}
                                                transition={{delay: 0.15 + (idx * 0.1), type: 'spring', stiffness: 100}}
                                                className={`group relative p-6 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-default ${isDayTime ? 'border-blue-500/30 bg-slate-900/70 hover:bg-slate-900/90' : 'border-blue-400/30 bg-white/70 hover:bg-white/90'}`}>
                                        {/* Card glow on hover */}
                                        <div
                                            className={`absolute -inset-1 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300 ${isDayTime ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-blue-400 to-cyan-400'}`}/>
                                        <div className="relative">
                                            <div className="text-2xl mb-2">{stat.icon}</div>
                                            <div
                                                className={`text-2xl font-bold mb-2 ${isDayTime ? 'text-blue-300' : 'text-blue-600'}`}>{stat.value}</div>
                                            <p className={`text-sm font-medium ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </FxReveal>
                    </div>

                    {/* Benefits Grid - 6 cards with enhanced styling */}
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-8">
                        {[
                            {
                                title: 'Better Accessibility',
                                desc: 'Inclusive design expands your audience by making digital products accessible, intuitive, and usable for everyone—regardless of ability. It meets accessibility standards while enhancing user experience and strengthening brand reputation.',
                                icon: isDayTime ? '/assets/ui-ux/access1.svg' : '/assets/ui-ux/access.svg',
                                feature: 'WCAG Compliance',
                                delay: 0.12
                            },
                            {
                                title: 'Cost-Efficient Development',
                                desc: 'Prioritizing UX early identifies and resolves usability issues before development begins—reducing costly redesigns, saving time, and ensuring a smoother path to launch. A smart investment with proven returns.',
                                icon: isDayTime ? '/assets/ui-ux/development1.svg' : '/assets/ui-ux/development.svg',
                                feature: '40% Faster Launch',
                                delay: 0.2
                            },
                            {
                                title: 'Improved Customer Retention',
                                desc: 'A seamless and enjoyable user experience keeps users coming back, fostering trust and long-term loyalty. By making every interaction intuitive and satisfying, you turn first-time users into repeat customers.',
                                icon: isDayTime ? '/assets/ui-ux/customer1.svg' : '/assets/ui-ux/customer.svg',
                                feature: '+35% Retention',
                                delay: 0.28
                            },
                            {
                                title: 'Stronger Brand Perception',
                                desc: 'A consistent and visually appealing UI/UX builds trust and credibility, reinforcing your brand identity and leaving lasting impressions. This cohesive experience enhances satisfaction and cultivates loyalty.',
                                icon: isDayTime ? '/assets/ui-ux/brand1.svg' : '/assets/ui-ux/brand.svg',
                                feature: 'Premium Brand Image',
                                delay: 0.36
                            },
                            {
                                title: 'Product Consistency',
                                desc: 'Design systems drive consistency, efficiency, and scalability by offering reusable components and clear guidelines. They ensure cohesive experiences across all touchpoints while streamlining collaboration.',
                                icon: isDayTime ? '/assets/ui-ux/cons1.svg' : '/assets/ui-ux/cons.svg',
                                feature: 'Design Systems',
                                delay: 0.44
                            },
                            {
                                title: 'Higher Conversion Rates',
                                desc: 'Intuitive design, strategic CTAs, and user-friendly interfaces work together to eliminate friction and guide users toward key actions—ultimately increasing engagement and driving conversions.',
                                icon: isDayTime ? '/assets/ui-ux/access1.svg' : '/assets/ui-ux/access.svg',
                                feature: '+50% Conversions',
                                delay: 0.52
                            }
                        ].map((benefit) => (
                            <FxReveal key={benefit.title} delay={benefit.delay}>
                                <motion.div className="relative group h-full"
                                            whileHover={{y: -8}}
                                            transition={{duration: 0.3}}>
                                    {/* Multi-layer glow effect */}
                                    <div
                                        className={`absolute -inset-2 rounded-xl blur-3xl opacity-25 group-hover:opacity-50 transition duration-700 ${isDayTime ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-blue-400 to-cyan-400'}`}/>
                                    <div
                                        className={`absolute -inset-1 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition duration-300 ${isDayTime ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-cyan-400 to-blue-400'}`}/>

                                    <div
                                        className={`relative rounded-xl overflow-hidden border h-full p-8 flex flex-col backdrop-blur-md transition-all duration-300 ${isDayTime ? 'border-blue-500/25 bg-slate-900/85 hover:bg-slate-900/95' : 'border-blue-400/25 bg-white/85 hover:bg-white/95'}`}>
                                        {/* Top accent line */}
                                        <div
                                            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition duration-300`}/>

                                        {/* Icon container with glow */}
                                        <div
                                            className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 flex-shrink-0 relative ${isDayTime ? 'bg-blue-500/20' : 'bg-blue-400/20'} border ${isDayTime ? 'border-blue-500/40' : 'border-blue-400/40'} group-hover:shadow-lg transition duration-300`}
                                            style={{boxShadow: '0 0 20px rgba(59,130,246,0.3)'}}>
                                            <Image
                                                src={benefit.icon}
                                                alt={benefit.title}
                                                width={32}
                                                height={32}
                                            />
                                        </div>

                                        {/* Feature badge */}
                                        <div
                                            className={`inline-flex items-center gap-2 mb-4 w-fit px-3 py-1 rounded-full text-xs font-semibold ${isDayTime ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30' : 'bg-blue-400/15 text-blue-700 border border-blue-400/30'}`}>
                                            <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                                                  style={{backgroundColor: isDayTime ? 'rgb(147, 197, 253)' : 'rgb(96, 165, 250)'}}/>
                                            {benefit.feature}
                                        </div>

                                        <h3 className={`text-lg font-bold mb-3 ${isDayTime ? 'text-white' : 'text-black'}`}>
                                            {benefit.title}
                                        </h3>
                                        <p className={`text-[0.93em] leading-[1.6] flex-1 ${isDayTime ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {benefit.desc}
                                        </p>

                                        {/* Bottom action indicator */}
                                        <div
                                            className={`mt-6 pt-4 border-t flex items-center justify-between ${isDayTime ? 'border-blue-500/10' : 'border-blue-400/10'}`}>
                                            <span
                                                className={`text-xs font-semibold ${isDayTime ? 'text-blue-400/60' : 'text-blue-600/60'}`}>Learn more</span>
                                            <ArrowRight
                                                className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isDayTime ? 'text-blue-400/60' : 'text-blue-600/60'}`}/>
                                        </div>
                                    </div>
                                </motion.div>
                            </FxReveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stages of Our UX/UI Process - Using ProcessesSection Component */}
            <ProcessesSection isDayTime={isDayTime} />

            {/* Trusted Digital Partners - Advanced Premium Section */}
            <div
                className={`relative lg:py-32 py-20 max-w-full w-full mx-auto overflow-hidden transition-colors duration-500 ${isDayTime ? 'bg-gradient-to-b from-slate-950 via-black to-slate-950' : 'bg-gradient-to-b from-slate-100 via-white to-slate-100'}`}>

                {/* Advanced Grid background with pulsing animation */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 opacity-50 animate-pulse" style={{
                        backgroundImage: `linear-gradient(${isDayTime ? 'rgba(59,130,246,0.08)' : 'rgba(37,99,235,0.09)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(59,130,246,0.08)' : 'rgba(37,99,235,0.09)'} 1px, transparent 1px)`,
                        backgroundSize: '44px 44px',
                    }}/>
                </div>

                {/* Multi-layered aurora blobs with staggered animation */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full opacity-30 animate-pulse"
                         style={{background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'}}/>
                    <div
                        className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full opacity-15 animate-pulse"
                        style={{
                            background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)',
                            animationDelay: '0.7s'
                        }}/>
                    <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 animate-pulse"
                         style={{
                             background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
                             animationDelay: '1.4s'
                         }}/>
                </div>

                <div className={`relative z-10 px-4 sm:px-6 md:px-10 lg:px-[4.5em]`}>
                    {/* Main Content with enhanced styling */}
                    <FxReveal>
                        <div className="max-w-4xl mb-20">
                            <div className="flex items-center gap-3 mb-8">
                                <div className={`h-px w-8 ${isDayTime ? 'bg-blue-500/40' : 'bg-blue-400/40'}`}/>
                                <span
                                    className={`text-xs font-semibold tracking-widest uppercase ${isDayTime ? 'text-blue-300' : 'text-blue-600'}`}>
                                    PARTNERSHIP
                                </span>
                                <div className={`h-px flex-1 ${isDayTime ? 'bg-blue-500/40' : 'bg-blue-400/40'}`}/>
                            </div>
                            <h2 className={`text-[2.8em] lg:text-[3.6em] font-[700] leading-[1.15] tracking-tight mb-8`}>
                                Your <span className="gx-gradient-text">trusted digital partner</span>
                            </h2>
                            <p className={`text-[0.95em] leading-[1.8] max-w-3xl ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                                We specialize in crafting high-impact digital experiences, innovative web applications,
                                and mobile solutions that drive measurable results. From funded startups to established
                                enterprises, we've helped visionary companies bring their digital products to
                                life—delivering experiences that fuel growth, engagement, and long-term success.
                            </p>

                            {/* Trust indicators */}
                            <div className="flex flex-wrap gap-4 mt-8">
                                {['Industry Experts', 'Proven Track Record', '24/7 Support', 'Custom Solutions'].map((indicator) => (
                                    <div key={indicator}
                                         className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${isDayTime ? 'border-blue-500/30 bg-blue-500/10' : 'border-blue-400/30 bg-blue-400/10'}`}>
                                        <span
                                            className={`w-2 h-2 rounded-full ${isDayTime ? 'bg-blue-400' : 'bg-blue-600'}`}/>
                                        <span
                                            className={`text-xs font-semibold ${isDayTime ? 'text-blue-300' : 'text-blue-700'}`}>{indicator}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FxReveal>

                    {/* CTA Button with enhanced styling */}
                    <FxReveal delay={0.1}>
                        <motion.div className="mb-20 relative group"
                                    whileHover={{scale: 1.02}}
                                    transition={{duration: 0.3}}>
                            {/* Button glow */}
                            <div
                                className={`absolute -inset-2 rounded-xl blur-2xl opacity-20 group-hover:opacity-50 transition duration-700 ${isDayTime ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-blue-400 to-cyan-400'}`}/>

                            <Link href="/contact">
                                <FxButton day={!isDayTime} variant="solid">
                                    Start Your Project <span className="text-[1.2em] leading-none ml-1">→</span>
                                </FxButton>
                            </Link>
                        </motion.div>
                    </FxReveal>

                    {/* Advanced Stats Section */}
                    <FxReveal delay={0.16} y={16}>
                        <div
                            className={`grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-6 p-8 rounded-2xl border backdrop-blur-md relative overflow-hidden ${isDayTime ? 'border-blue-500/25 bg-gradient-to-br from-slate-900/70 to-slate-950/70' : 'border-blue-400/25 bg-gradient-to-br from-white/70 to-slate-50/70'}`}
                            id={'countup'}>
                            {/* Accent lines on hover */}
                            <div
                                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition duration-300`}/>

                            {stats.map((stat, index) => (
                                <motion.div key={index}
                                            initial={{opacity: 0, y: 10}}
                                            whileInView={{opacity: 1, y: 0}}
                                            viewport={{once: true}}
                                            transition={{delay: 0.2 + (index * 0.1), type: 'spring', stiffness: 100}}
                                            className="text-center group/stat">
                                    <div
                                        className={`text-3xl md:text-4xl font-bold mb-2 gx-gradient-text transition-transform group-hover/stat:scale-110 duration-300`}>
                                        <CountUp end={stat.value} duration={2.5} suffix={stat.suffix || ''}/>
                                    </div>
                                    <p className={`text-sm font-medium ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {stat.label}
                                    </p>
                                    {/* Hover underline */}
                                    <div
                                        className={`mt-3 h-1 w-0 group-hover/stat:w-full transition-all duration-300 rounded-full mx-auto ${isDayTime ? 'bg-blue-500/40' : 'bg-blue-400/40'}`}/>
                                </motion.div>
                            ))}
                        </div>
                    </FxReveal>
                </div>
            </div>


        </div>
    );
};

export default UiUxDesign;


