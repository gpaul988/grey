'use client';


import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
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
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
// why grey infotech
const reasons = [
    {
        id: 1,
        title: (
            <>
                We&#39;re An Experienced Digital Agency
            </>
        ),
        description: (
            <>
                When it comes to digital, we’ve done it all—and learned from every project. No matter the scale or
                complexity, we bring the full weight of our experience as a digital agency to the table. That means
                combining creativity, technical expertise, strategic insight, and practical know-how to deliver
                solutions that are as effective as they are innovative.
            </>
        ),
    },
    {
        id: 2,
        title: (
            <>
                We&#39;re Proactive
            </>
        ),
        description: (
            <>
                You can count on us to go further than expected. We don&#39;t just follow instructions—we anticipate
                needs, address challenges before they arise, and proactively bring fresh ideas and opportunities to the
                table. It&#39;s our way of making sure you always get more value than you asked for.
            </>
        ),
    },
    {
        id: 3,
        title: (
            <>
                We&#39;re Collaborative
            </>
        ),
        description: (
            <>
                We’re passionate about technology, but what truly sets us apart is how we work with people.
                Collaboration, to us, means more than just being responsive or easy to work with—it’s about being a true
                partner who shares your enthusiasm, understands your goals, and is just as committed to creating
                something remarkable as you are.
            </>
        ),
    },
    {
        id: 4,
        title: (
            <>
                We&#39;re Invested
            </>
        ),
        description: (
            <>
                When you invest in us, we invest fully in you. We treat every project as if it were our own—bringing a
                strong sense of ownership, accountability, and care to every detail. You’ll see it in our commitment to
                quality, our refusal to settle for second-best, and our determination to deliver outcomes that exceed
                expectations. Your success is our priority.
            </>
        ),
    },
];

const WebDevelopment = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target: targetRef});
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);


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

                if (top < windowHeight * -0.0 || bottom < windowHeight * -0.0) {
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
            "FEWD",
            "BEWD",
            "FSWD",
            "OSWD",
            "MSS",
            "HI",
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

    // Countup hook for Digital partners
    const stats = [
        {label: 'Years Experience', value: 8, suffix: '+'},
        {label: 'Team Members', value: 10, suffix: '+'},
        {label: 'Products Launched', value: 150, suffix: '+'},
        {label: 'Successful rebrands', value: 27, suffix: '+'},
        {label: 'Increase in Website Traffic', value: 350, suffix: '%'},
    ];
    // Why Grey InfoTech Hook
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex % reasons.length) + 1);
        }, 3000); // Change slide every 3 seconds

        return () => {
            clearInterval(interval);
        }; // Clean up the interval on unmount
    }, []);

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} relative h-auto`}>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Unified Futuristic Web Development Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video Background (desktop) and Image fallback (mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/wd/hero.jpg"
                >
                    <source src="/assets/wd/hero.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/wd/hero.jpg"
                    alt="Web Development Hero"
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
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 flex items-center top-32 z-[11] px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                                <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"/>
                                <span
                                    className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Web Development</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Build Modern, Scalable <span className="gx-gradient-text">Web Platforms</span>
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                From performant front-ends to resilient APIs, Grey InfoTech engineers web platforms that
                                scale, convert, and endure. We combine modern tooling, rigorous testing and
                                observability to ship reliable products that move the needle.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['Frontend Engineering', 'API Design', 'Platform Architecture', 'Performance', 'Security'].map((badge) => (
                                    <span key={badge}
                                          className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                                            {badge}
                                        </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button
                                        className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap"
                                        style={{background: '#2dd4bf', color: '#000'}}>
                                            <span className="absolute inset-0" style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                            }}/>
                                        <span className="relative">Start a project →</span>
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
                                    {label: 'Projects Delivered', value: '50+'},
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
                            {label: 'Projects', value: '50+'},
                            {label: 'Experts', value: '8+'},
                            {label: 'Retention', value: '100%'}
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
            </section>

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
                <div
                    className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>YOUR WEB DEVELOPMENT
                            ADVENTURE</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Build Future-ready Web Platforms with <span
                                className="gx-gradient-text">Precision</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div>
                                    <p>We design and implement web platforms engineered for speed, reliability and
                                        maintainability. From component-driven frontends to resilient microservices, our
                                        web development practice transforms ideas into robust products.</p>
                                </div>
                                <div>
                                    <p>Combining rigorous engineering practices with a product-first mindset, we focus
                                        on measurable outcomes—reducing time-to-market, improving conversion rates, and
                                        ensuring operational simplicity for your teams.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Frontend Engineering', 'API Design', 'Platform Architecture', 'Observability'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Web Development services overview - Enhanced with FxStickyScrollSection (redesign) */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>Web<br/>development overview</>}
                intro={"Comprehensive web engineering services engineered for measurable business outcomes. Each capability below lists concrete deliverables, representative technology choices, KPIs we track, and a recommended engagement pattern (MVP, Sprint, Retainer). Use these to select the scope and risk profile you want to address."}
                navLabel="Web Solutions"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: "01",
                        title: "Front-End Web Development",
                        target: "FEWD",
                        tags: ["UI/UX", "React", "Next.js", "Performance", "Accessibility"],
                        body: (
                            <div>
                                <h4 className="font-[600] mb-2">Overview</h4>
                                <p>
                                    Build high-fidelity, accessible, and fast user interfaces using component-driven
                                    development (React/Next.js). Focus areas: perceptual performance, progressive
                                    enhancement and maintainable design systems.
                                </p>
                                <h5 className="mt-3 font-[600]">Key deliverables</h5>
                                <ul className="mt-2 list-disc ml-6">
                                    <li>Design system (tokens, components, documentation)</li>
                                    <li>Production-ready React/Next.js code with SSR/SSG where appropriate</li>
                                    <li>Accessibility audit and remediation (WCAG 2.1 AA)</li>
                                    <li>Performance budgets + automated Lighthouse checks in CI</li>
                                </ul>
                                <h5 className="mt-3 font-[600]">Representative tech</h5>
                                <p className="mt-1">Next.js, React, Tailwind / CSS-in-JS, Storybook, Playwright, Vitals
                                    monitoring (RUM)</p>
                                <h5 className="mt-3 font-[600]">KPIs we measure</h5>
                                <ul className="mt-2 list-disc ml-6">
                                    <li>LCP, FID/INP, CLS (target: LCP ≤ 2.5s, CLS &lt; 0.1)</li>
                                    <li>Accessibility score (WCAG AA compliance)</li>
                                    <li>Time-to-interactive and Time-to-first-byte</li>
                                </ul>
                                <p className="mt-3">Engagement: 4–8 week MVPs, 8–16 week redesigns, or ongoing component
                                    work under retainer for continuous improvement.</p>
                            </div>
                        ),
                    },
                    {
                        id: "02",
                        title: "Back-End Web Development",
                        target: "BEWD",
                        tags: ["APIs", "Node", "Go", "Databases", "Security"],
                        body: (
                            <div>
                                <h4 className="font-[600] mb-2">Overview</h4>
                                <p>
                                    Design and implement resilient server-side systems: typed APIs, robust data models,
                                    and automated operations. Emphasis on security, observability, and predictable
                                    scaling.
                                </p>
                                <h5 className="mt-3 font-[600]">Key deliverables</h5>
                                <ul className="mt-2 list-disc ml-6">
                                    <li>OpenAPI/GraphQL schema and typed client generation</li>
                                    <li>Database schema, migration plans, and backup/restore procedures</li>
                                    <li>Automated test suites (unit/integration) and CI pipelines</li>
                                    <li>Runbooks, deploy pipelines and security hardening</li>
                                </ul>
                                <h5 className="mt-3 font-[600]">Representative tech</h5>
                                <p className="mt-1">Node.js / TypeScript, Express/Koa, NestJS, Go, PostgreSQL, MongoDB,
                                    Redis, AWS Lambda / ECS</p>
                                <h5 className="mt-3 font-[600]">KPIs we measure</h5>
                                <ul className="mt-2 list-disc ml-6">
                                    <li>API latency (p95), error rates (4xx/5xx)</li>
                                    <li>Database query performance, cache hit ratio</li>
                                    <li>MTTR for incidents, deployment success rate</li>
                                </ul>
                                <p className="mt-3">Typical engagement: API-first MVPs (6–10 weeks), staged
                                    microservices (12+ weeks), or ongoing platform engineering retainers.</p>
                            </div>
                        ),
                    },
                    {
                        id: "03",
                        title: "Full-Stack Web Development",
                        target: "FSWD",
                        tags: ["Full-stack", "TypeScript", "Testing", "CI/CD"],
                        body: (
                            <div>
                                <h4 className="font-[600] mb-2">Overview</h4>
                                <p>
                                    Single-vendor, cross-disciplinary delivery that aligns design, frontend, backend and
                                    QA—accelerating feature delivery with shared types, contract tests and automated
                                    pipelines.
                                </p>
                                <h5 className="mt-3 font-[600]">Key deliverables</h5>
                                <ul className="mt-2 list-disc ml-6">
                                    <li>Feature-sliced delivery plan with acceptance criteria</li>
                                    <li>Shared TypeScript types and contract tests</li>
                                    <li>End-to-end test coverage and release automation</li>
                                </ul>
                                <h5 className="mt-3 font-[600]">Process & onboarding</h5>
                                <ol className="mt-2 list-decimal ml-6">
                                    <li>Discovery & measurable success metrics</li>
                                    <li>Scoped MVP with milestone-based deliveries</li>
                                    <li>Production readiness checklist and post-launch support</li>
                                </ol>
                                <p className="mt-3">Recommended for product teams seeking rapid, low-risk delivery of
                                    customer-facing capabilities.</p>
                            </div>
                        ),
                    },
                    {
                        id: "04",
                        title: "Open Source & CMS",
                        target: "OSWD",
                        tags: ["WordPress", "Headless CMS", "Strapi", "Content"],
                        body: (
                            <div>
                                <h4 className="font-[600] mb-2">Overview</h4>
                                <p>
                                    Implement headless CMS or hardened WordPress platforms depending on content
                                    complexity and editorial needs. Deliver migration strategies that preserve SEO and
                                    provide rollback safety.
                                </p>
                                <h5 className="mt-3 font-[600]">Deliverables</h5>
                                <ul className="mt-2 list-disc ml-6">
                                    <li>CMS architecture and editorial UX flows</li>
                                    <li>Content migration scripts and QA checklist</li>
                                    <li>Security hardening and caching strategies for scale</li>
                                </ul>
                                <p className="mt-3">Best for marketing sites, documentation platforms and editorial
                                    products that require frequent content updates.</p>
                            </div>
                        ),
                    },
                    {
                        id: "05",
                        title: "Maintenance & Support",
                        target: "MSS",
                        tags: ["SLA", "Monitoring", "Incident Response"],
                        body: (
                            <div>
                                <h4 className="font-[600] mb-2">Overview</h4>
                                <p>
                                    Ongoing operational care: security patching, monitoring, incident response, and
                                    continuous improvements driven by monthly metrics and roadmaps.
                                </p>
                                <h5 className="mt-3 font-[600]">Service components</h5>
                                <ul className="mt-2 list-disc ml-6">
                                    <li>24/7 monitoring, alerting, and playbooks</li>
                                    <li>Regular dependency and security patching</li>
                                    <li>Monthly performance & security reports with improvement backlog</li>
                                </ul>
                                <p className="mt-3">Available as tiered retainers with SLAs; we tailor response times
                                    and scope to your risk profile.</p>
                            </div>
                        ),
                    },
                    {
                        id: "06",
                        title: "Hosting & Infrastructure",
                        target: "HI",
                        tags: ["Cloud", "Infrastructure", "CI/CD", "Observability"],
                        body: (
                            <div>
                                <h4 className="font-[600] mb-2">Overview</h4>
                                <p>
                                    Design, provision and operate cloud infrastructure with a focus on cost, resilience
                                    and observability. We deliver Infrastructure-as-Code, secure networking and
                                    predictable deployments.
                                </p>
                                <h5 className="mt-3 font-[600]">Deliverables</h5>
                                <ul className="mt-2 list-disc ml-6">
                                    <li>Terraform modules and environment provisioning</li>
                                    <li>CI/CD pipelines with encrypted secrets and promotion gates</li>
                                    <li>Logging, metrics, tracing and SLO definitions</li>
                                </ul>
                                <p className="mt-3">We design for reliability, operability and cost efficiency. Typical
                                    setup time: 2–6 weeks depending on complexity.</p>
                            </div>
                        ),
                    },
                ]}
            />

            <div className={'relative max-w-full w-full h-auto'}>
                <FxFrame className="overflow-hidden rounded-2xl">
                    <div className="relative h-[420px] lg:h-[740px] w-full">
                        <Image
                            src={'/assets/webd/first.jpg'}
                            alt={'first image web development'}
                            fill
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                        {/* Futuristic overlays */}
                        <div
                            className="absolute inset-0 bg-gradient-to-tr from-teal-400/8 to-transparent pointer-events-none mix-blend-screen"/>
                        <div className="absolute inset-0 pointer-events-none">
                            <div
                                className="absolute -left-[15%] -top-[10%] opacity-10 w-[60vmax] h-[60vmax] rounded-full bg-gradient-to-r from-cyan-400 to-indigo-600 blur-3xl"/>
                        </div>
                        <div
                            className="absolute left-6 bottom-6 z-10 max-w-base sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]">
                            <div className="text-teal-300 text-xs uppercase tracking-wider font-semibold">Insight</div>
                            <h3 className="text-white text-2xl lg:text-4xl font-bold leading-tight">Modern platforms,
                                engineered for growth</h3>
                            <p className="text-white/70 mt-2">A sample hero visual demonstrating platform scale,
                                observability and resilience — built with production-grade architecture patterns and
                                design tokens for a consistent, futuristic brand language.</p>
                            <div className="mt-4 flex gap-3">
                                <FxButton day={isDayTime} className="px-4 py-2 rounded-full bg-teal-400 text-black">Start
                                    a project →</FxButton>
                                <FxButton day={isDayTime} variant="ghost"
                                          className="px-4 py-2 rounded-full border border-white/12 text-white">View case
                                    studies</FxButton>
                            </div>
                        </div>
                    </div>
                </FxFrame>
            </div>

            {/* Backend Technologies */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <FxBackground day={isDayTime} grid={true} aurora={true}/>
                <div id={'backend technology'}
                     className={`relative lg:mt-[4em] md:mt-[4em] pt-24 pb-16 lg:mb-8 mb-8 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header */}
                    <FxReveal>
                        <div
                            className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6  ${
                                isDayTime ? 'text-white' : 'text-black'
                            }`}>
                            <div>
                                <h2 className='text-[1em] capitalize sm:text-[2.15em] md:text-[3.3em] lg:text-[3.3em] font-[550] tracking-tight leading-[1.15] lg:pb-6'>
                                    <span className="gx-glitch">Back-End Web</span> <br
                                    className={'lg:block md:block hidden'}/>Development <br
                                    className={'lg:block md:block hidden'}/>technologies
                                </h2>
                            </div>
                            <div className='lg:-ml-[7.8em]'>
                                <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                    We may suggest a number of popular frameworks and technologies. Naturally, each
                                    project
                                    is unique, and before choosing a strategy with you, we weigh the advantages and
                                    disadvantages of several options.
                                </p>
                            </div>
                        </div>
                    </FxReveal>


                    {/* Tools — Back-end technologies (extremely detailed) */}
                    <div id={'tools'}
                         className={`relative w-full h-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 lg:gap-[3.5em] md:gap-[2.5em] sm:gap-[2em] gap-[1.5em] lg:mt-[3em] md:mt-[2em] sm:mt-[1.5em] mt-[1em] ${
                             isDayTime ? 'text-white' : 'text-black'
                         }`}>

                        {/* NEXT.js — Edge & platform spec */}
                        <FxReveal>
                            <FxHoloCard role="group" tabIndex={0} day={isDayTime}
                                        className="p-6 lg:p-8 border border-teal-400/8 bg-gradient-to-b from-black/20 to-transparent rounded-2xl">
                                <FxOrbit size={380} left="-120px" top="-80px" opacity={0.18} speed={30}/>
                                <div className="relative grid grid-cols-[auto_1fr] gap-4 items-start">
                                    <FxFrame className="w-14 h-14 flex items-center justify-center">
                                        <Image
                                            src={isDayTime ? '/assets/webd/icon/next.svg' : '/assets/webd/icon/next1.svg'}
                                            alt={'next'} width={44} height={44}/>
                                    </FxFrame>

                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h6 className={'text-[1.4em] lg:text-[1.6em] font-[800]'}>Next.js —
                                                Edge-first Platforms</h6>
                                            <FxChip day={isDayTime}>Edge</FxChip>
                                            <FxChip day={isDayTime}>ISR/SSR</FxChip>
                                        </div>

                                        <p className="text-[0.95em] text-white/80 mb-3">
                                            Architect platforms that combine server rendering benefits with CDN-edge
                                            execution.
                                            Build with deterministic caching, granular ISR, and image-delivery
                                            strategies to hit
                                            strict performance budgets while preserving SEO and accessibility.
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-3 mb-3 text-[0.92em]">
                                            <div>
                                                <div className="text-[0.78em] text-gray-300 mb-1">Phase 1 deliverables
                                                </div>
                                                <ul className="list-disc pl-5">
                                                    <li>Edge-aware routing & caching rules (CDN + platform config)</li>
                                                    <li>Server Components/SSR migration plan & hydration surface map
                                                    </li>
                                                    <li>Image & asset delivery policy (AVIF/WebP, responsive sizes)</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300 mb-1">Performance targets
                                                </div>
                                                <ul className="list-none pl-0">
                                                    <li>Lighthouse: Performance ≥ 90 for core pages</li>
                                                    <li>LCP ≤ 2.5s, TTFB targets per region</li>
                                                    <li>p95 API latency &lt; 200ms (cold/warm cache profiles)</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] grid grid-cols-3 gap-3 mb-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Timeline</div>
                                                <div>4–10 weeks</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Team</div>
                                                <div>1–3 engineers, 1 infra engineer</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Effort</div>
                                                <div>~160–420 hours</div>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] mb-3">
                                            <div className="text-[0.78em] text-gray-300 mb-1">Acceptance criteria</div>
                                            <ol className="list-decimal pl-5 space-y-1">
                                                <li>Primary pages meet Lighthouse and LCP targets in 3 major regions
                                                </li>
                                                <li>CI enforces image/asset budgets and cache-control headers</li>
                                                <li>Server Component migration reduces client JS by target percentage
                                                </li>
                                            </ol>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <Link href={'/services/Nextjs-Development'}>
                                                <FxButton variant="solid">Explore</FxButton>
                                            </Link>
                                            <FxButton href={'/contact'} variant="ghost">Discuss Edge Plan</FxButton>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        {/* Symfony / PHP — Hardened services */}
                        <FxReveal>
                            <FxHoloCard role="group" tabIndex={0} day={isDayTime}
                                        className="p-6 lg:p-8 border border-teal-400/8 bg-gradient-to-b from-black/12 to-transparent rounded-2xl">
                                <FxOrbit size={320} right="-100px" top="-60px" opacity={0.14} speed={28} reverse/>
                                <div className="relative grid grid-cols-[auto_1fr] gap-4 items-start">
                                    <FxFrame className="w-14 h-14 flex items-center justify-center">
                                        <Image
                                            src={isDayTime ? '/assets/webd/icon/sym.svg' : '/assets/webd/icon/sym1.svg'}
                                            alt={'symfony'} width={44} height={44}/>
                                    </FxFrame>

                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h6 className={'text-[1.4em] lg:text-[1.6em] font-[800]'}>Symfony / PHP —
                                                Hardened APIs</h6>
                                            <FxChip day={isDayTime}>Enterprise</FxChip>
                                            <FxChip day={isDayTime}>Modular</FxChip>
                                        </div>

                                        <p className="text-[0.95em] text-white/80 mb-3">
                                            Build long-lived, maintainable services with explicit layering, strong CI
                                            gates,
                                            and automated security scanning. Ideal for regulated domains and enterprise
                                            integrations.
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-3 mb-3 text-[0.92em]">
                                            <div>
                                                <div className="text-[0.78em] text-gray-300 mb-1">Phase 1 deliverables
                                                </div>
                                                <ul className="list-disc pl-5">
                                                    <li>API contract definitions (OpenAPI) and SDK generation</li>
                                                    <li>Modular service skeletons with CI templates</li>
                                                    <li>Automated dependency & security scanning configured in CI</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300 mb-1">Operational targets
                                                </div>
                                                <ul className="list-none pl-0">
                                                    <li>99.9% uptime SLO for critical endpoints</li>
                                                    <li>Mean time to recovery (MTTR) targets and runbook basics</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] grid grid-cols-3 gap-3 mb-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Timeline</div>
                                                <div>6–14 weeks</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Team</div>
                                                <div>2–4 backend engineers, 1 SRE</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Effort</div>
                                                <div>~240–520 hours</div>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] mb-3">
                                            <div className="text-[0.78em] text-gray-300 mb-1">Acceptance criteria</div>
                                            <ol className="list-decimal pl-5 space-y-1">
                                                <li>OpenAPI contracts validated and signed-off; generated SDKs pass
                                                    integration tests
                                                </li>
                                                <li>SCA reports cleared and critical vulnerabilities remediated before
                                                    release
                                                </li>
                                                <li>CI enforces linting, unit tests and basic integration smoke tests
                                                </li>
                                            </ol>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <Link href={'/services/PHP-Development'}>
                                                <FxButton variant="solid">Explore</FxButton>
                                            </Link>
                                            <FxButton href={'/contact'} variant="ghost">Request API Audit</FxButton>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        {/* .NET — Throughput & latency */}
                        <FxReveal>
                            <FxHoloCard role="group" tabIndex={0} day={isDayTime}
                                        className="p-6 lg:p-8 border border-teal-400/8 bg-gradient-to-b from-black/12 to-transparent rounded-2xl">
                                <FxOrbit size={300} left="-80px" bottom="0px" opacity={0.12} speed={36}/>
                                <div className="relative grid grid-cols-[auto_1fr] gap-4 items-start">
                                    <FxFrame className="w-14 h-14 flex items-center justify-center">
                                        <Image
                                            src={isDayTime ? '/assets/webd/icon/net.png' : '/assets/webd/icon/net1.png'}
                                            alt={'.Net'} width={44} height={44}/>
                                    </FxFrame>

                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h6 className={'text-[1.4em] lg:text-[1.6em] font-[800]'}>.NET —
                                                High-throughput Services</h6>
                                            <FxChip day={isDayTime}>Low-latency</FxChip>
                                        </div>

                                        <p className="text-[0.95em] text-white/80 mb-3">
                                            Strongly-typed runtime tuned for throughput and predictable latency.
                                            Preferred for
                                            compute-heavy or latency-sensitive backends where deterministic performance
                                            matters.
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-3 mb-3 text-[0.92em]">
                                            <div>
                                                <div className="text-[0.78em] text-gray-300 mb-1">Phase 1 deliverables
                                                </div>
                                                <ul className="list-disc pl-5">
                                                    <li>Service scaffolding with DI and observability hooks</li>
                                                    <li>Load-testing profiles & CI performance budgets</li>
                                                    <li>Automated telemetry (traces, metrics, logs)</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300 mb-1">SLO targets</div>
                                                <ul className="list-none pl-0">
                                                    <li>p99 latency goals documented per endpoint</li>
                                                    <li>Throughput baselines and scaling playbooks</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] grid grid-cols-3 gap-3 mb-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Timeline</div>
                                                <div>6–12 weeks</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Team</div>
                                                <div>2–3 backend engineers, 1 infra</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Effort</div>
                                                <div>~220–440 hours</div>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] mb-3">
                                            <div className="text-[0.78em] text-gray-300 mb-1">Acceptance criteria</div>
                                            <ol className="list-decimal pl-5 space-y-1">
                                                <li>Load tests show service meets p99 latency targets at expected load
                                                </li>
                                                <li>CI enforces telemetry emissions & alerting hooks</li>
                                                <li>Autoscaling and runbook verified in staging</li>
                                            </ol>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <Link href={'/services/Net-Development'}>
                                                <FxButton variant="solid">Explore</FxButton>
                                            </Link>
                                            <FxButton href={'/contact'} variant="ghost">Request Perf Review</FxButton>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        {/* Laravel — Rapid product */}
                        <FxReveal>
                            <FxHoloCard role="group" tabIndex={0} day={isDayTime}
                                        className="p-6 lg:p-8 border border-teal-400/8 bg-gradient-to-b from-black/12 to-transparent rounded-2xl">
                                <FxOrbit size={260} right="0px" top="-60px" opacity={0.14} speed={26}/>
                                <div className="relative grid grid-cols-[auto_1fr] gap-4 items-start">
                                    <FxFrame className="w-14 h-14 flex items-center justify-center">
                                        <Image
                                            src={isDayTime ? '/assets/webd/icon/laravel.svg' : '/assets/webd/icon/laravel1.svg'}
                                            alt={'Laravel'} width={44} height={44}/>
                                    </FxFrame>

                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h6 className={'text-[1.4em] lg:text-[1.6em] font-[800]'}>Laravel — Rapid
                                                Product Development</h6>
                                            <FxChip day={isDayTime}>Rapid</FxChip>
                                        </div>

                                        <p className="text-[0.95em] text-white/80 mb-3">
                                            Expressive PHP framework for shipping MVPs quickly with queues, events and
                                            an
                                            ergonomic developer experience. Strong for early-stage products and
                                            feature-driven
                                            iterations.
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-3 mb-3 text-[0.92em]">
                                            <div>
                                                <div className="text-[0.78em] text-gray-300 mb-1">Phase 1 deliverables
                                                </div>
                                                <ul className="list-disc pl-5">
                                                    <li>Feature scaffolding, authentication and queueing</li>
                                                    <li>Basic CI, env management and deploy workflow</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300 mb-1">Goals</div>
                                                <ul className="list-none pl-0">
                                                    <li>Fast iteration cadence and short lead times</li>
                                                    <li>Stability for initial user base</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] grid grid-cols-3 gap-3 mb-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Timeline</div>
                                                <div>3–8 weeks</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Team</div>
                                                <div>1–2 engineers, 1 designer</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Effort</div>
                                                <div>~80–240 hours</div>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] mb-3">
                                            <div className="text-[0.78em] text-gray-300 mb-1">Acceptance criteria</div>
                                            <ol className="list-decimal pl-5 space-y-1">
                                                <li>Critical user journeys pass smoke tests and basic acceptance in
                                                    staging
                                                </li>
                                                <li>Queueing and background jobs operate within expected latency</li>
                                                <li>Initial security scans show no high-severity findings</li>
                                            </ol>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <Link href={'/services/Laravel-Development'}>
                                                <FxButton variant="solid">Explore</FxButton>
                                            </Link>
                                            <FxButton href={'/contact'} variant="ghost">Start MVP</FxButton>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        {/* Ruby on Rails — Productivity & ops */}
                        <FxReveal>
                            <FxHoloCard role="group" tabIndex={0} day={isDayTime}
                                        className="p-6 lg:p-8 border border-teal-400/8 bg-gradient-to-b from-black/12 to-transparent rounded-2xl">
                                <FxOrbit size={240} left="0px" bottom="24px" opacity={0.12} speed={22}/>
                                <div className="relative grid grid-cols-[auto_1fr] gap-4 items-start">
                                    <FxFrame className="w-14 h-14 flex items-center justify-center">
                                        <Image
                                            src={isDayTime ? '/assets/webd/icon/ruby.svg' : '/assets/webd/icon/ruby1.svg'}
                                            alt={'Ruby on Rails'} width={44} height={44}/>
                                    </FxFrame>

                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h6 className={'text-[1.4em] lg:text-[1.6em] font-[800]'}>Ruby on Rails —
                                                Rapid Product Iteration</h6>
                                            <FxChip day={isDayTime}>Productive</FxChip>
                                        </div>

                                        <p className="text-[0.95em] text-white/80 mb-3">
                                            Convention-over-configuration framework that accelerates delivery. Good for
                                            early
                                            product-market fit cycles and teams that prioritise developer velocity.
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-3 mb-3 text-[0.92em]">
                                            <div>
                                                <div className="text-[0.78em] text-gray-300 mb-1">Phase 1 deliverables
                                                </div>
                                                <ul className="list-disc pl-5">
                                                    <li>Product scaffolding with auth, roles and key flows</li>
                                                    <li>Background job setup and monitoring</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300 mb-1">Stability</div>
                                                <ul className="list-none pl-0">
                                                    <li>Automated test suite and basic performance benchmarks</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] grid grid-cols-3 gap-3 mb-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Timeline</div>
                                                <div>4–10 weeks</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Team</div>
                                                <div>1–3 engineers</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Effort</div>
                                                <div>~120–360 hours</div>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] mb-3">
                                            <div className="text-[0.78em] text-gray-300 mb-1">Acceptance criteria</div>
                                            <ol className="list-decimal pl-5 space-y-1">
                                                <li>Core user journeys pass acceptance tests in staging</li>
                                                <li>Background jobs processed within SLA targets</li>
                                                <li>Basic security checks and dependency audits completed</li>
                                            </ol>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <Link href={'/services/Ruby-on-Rails'}>
                                                <FxButton variant="solid">Explore</FxButton>
                                            </Link>
                                            <FxButton href={'/contact'} variant="ghost">Start Iteration</FxButton>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        {/* Node.js — Microservices & realtime */}
                        <FxReveal>
                            <FxHoloCard role="group" tabIndex={0} day={isDayTime}
                                        className="p-6 lg:p-8 border border-teal-400/8 bg-gradient-to-b from-black/12 to-transparent rounded-2xl">
                                <FxOrbit size={340} right="-80px" top="-60px" opacity={0.14} speed={30}/>
                                <div className="relative grid grid-cols-[auto_1fr] gap-4 items-start">
                                    <FxFrame className="w-14 h-14 flex items-center justify-center">
                                        <Image
                                            src={isDayTime ? '/assets/webd/icon/node.svg' : '/assets/webd/icon/node1.svg'}
                                            alt={'Node'} width={44} height={44}/>
                                    </FxFrame>

                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h6 className={'text-[1.4em] lg:text-[1.6em] font-[800]'}>Node.js —
                                                Microservices & Realtime</h6>
                                            <FxChip day={isDayTime}>Event-driven</FxChip>
                                            <FxChip day={isDayTime}>TypeScript</FxChip>
                                        </div>

                                        <p className="text-[0.95em] text-white/80 mb-3">
                                            Build event-driven APIs, realtime channels and horizontally-scalable
                                            microservices
                                            using Node.js + TypeScript. Focus on contract-driven development and
                                            observability.
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-3 mb-3 text-[0.92em]">
                                            <div>
                                                <div className="text-[0.78em] text-gray-300 mb-1">Phase 1 deliverables
                                                </div>
                                                <ul className="list-disc pl-5">
                                                    <li>Service templates with typed contracts & message schemas</li>
                                                    <li>Realtime adapter prototypes (WebSocket / WebRTC)</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300 mb-1">Observability</div>
                                                <ul className="list-none pl-0">
                                                    <li>Structured logging, traces and metrics in CI</li>
                                                    <li>SLIs and SLOs for realtime paths</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] grid grid-cols-3 gap-3 mb-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Timeline</div>
                                                <div>4–12 weeks</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Team</div>
                                                <div>1–3 engineers, 1 infra</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-300">Effort</div>
                                                <div>~160–400 hours</div>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] mb-3">
                                            <div className="text-[0.78em] text-gray-300 mb-1">Acceptance criteria</div>
                                            <ol className="list-decimal pl-5 space-y-1">
                                                <li>Typed contracts and message schemas are enforced via CI</li>
                                                <li>Realtime adapters meet delivery & latency targets under load tests
                                                </li>
                                                <li>Tracing and error budgets integrated into CI dashboards</li>
                                            </ol>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <Link href={'/services/Nodejs-Development'}>
                                                <FxButton variant="solid">Explore</FxButton>
                                            </Link>
                                            <FxButton href={'/contact'} variant="ghost">Request Review</FxButton>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                    </div>
                </div>
            </div>

            {/* Front-end Web Development Technologies */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'Frontend-Technologies'}
                     className={`relative  pt-10 pb-10 lg:mb-8 mb-18 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6  ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}>
                        <div>
                            <h2 className='text-[1em] capitalize sm:text-[1.5em] md:text-[2em] lg:text-[3.3em] font-[550] tracking-tight leading-[1] lg:pb-6'>
                                Front-end Web <br className={'lg:block md:block hidden'}/>Development <br
                                className={'lg:block md:block hidden'}/>Technologies
                            </h2>
                        </div>
                        <div className='lg:-ml-[7.8em]'>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                Modern apps may be built using a wide range of front-end technologies and frameworks,
                                and we have selected a solid selection of popular choices that we can suggest.
                            </p>
                        </div>
                    </div>

                    {/* Tools - Futuristic holographic cards (extremely detailed) */}
                    <div id={'tools'}
                         className={`relative w-full h-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 lg:gap-[3.5em] md:gap-[2.5em] sm:gap-[2em] gap-[1.5em] lg:mt-[3em] md:mt-[2em] sm:mt-[1.5em] mt-[1em] ${
                             isDayTime ? 'text-black' : 'text-white'
                         }`}>

                        {/* Angular — Deeply detailed */}
                        <FxReveal>
                            <FxHoloCard day={isDayTime}
                                        className="p-6 lg:p-8 border border-teal-400/8 shadow-[0_24px_80px_-28px_rgba(45,212,191,0.30)]">
                                <div className="flex gap-4 lg:gap-6 items-start">
                                    <FxFrame className="w-[72px] h-[72px] flex items-center justify-center" glow>
                                        <Image
                                            src={isDayTime ? '/assets/webd/icon1/angular1.svg' : '/assets/webd/icon1/angular.svg'}
                                            alt={'Angular'}
                                            width={52}
                                            height={52}
                                        />
                                    </FxFrame>
                                    <div className="flex-1">
                                        <h6 className={'text-[1.15em] lg:text-[1.5em] font-[800] mb-2'}>Angular —
                                            Enterprise SPAs & Control Planes</h6>
                                        <p className={'text-[0.95em] text-justify mb-3'}>
                                            Architect robust, modular single-page applications and administrative
                                            control panels
                                            that scale with domain complexity. Emphasis on typed contracts, DI-led
                                            modularity,
                                            and observable state for mission-critical interfaces.
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">When to choose</div>
                                                <ul className="text-[0.9em] list-disc pl-5 text-justify">
                                                    <li>Large teams (greater than 6 developers) requiring strong
                                                        conventions
                                                    </li>
                                                    <li>Enterprise workflows, granular RBAC, and complex forms</li>
                                                    <li>Real-time dashboards with RxJS streams</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Typical stack</div>
                                                <ul className="text-[0.9em] list-none pl-0">
                                                    <li>Angular 16+, NgRx or Akita, RxJS</li>
                                                    <li>Nx monorepo, Storybook, Jest/Karma, Playwright</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] grid grid-cols-2 gap-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Deliverables — Phase
                                                    1
                                                </div>
                                                <ul className="list-disc pl-5">
                                                    <li>Design tokens & atomic component library (Storybook)</li>
                                                    <li>Core application shell with routing & module boundaries</li>
                                                    <li>State management strategy & initial data adapters</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">QA / Security /
                                                    Accessibility
                                                </div>
                                                <ul className="list-none pl-0">
                                                    <li>Unit & integration coverage targets (≥70%)</li>
                                                    <li>OWASP checklist & dependency scanning</li>
                                                    <li>WCAG 2.1 AA baseline for core flows</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-3 text-[0.9em] grid grid-cols-3 gap-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Timeline</div>
                                                <div>8–16 weeks (MVP → v1)</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Team</div>
                                                <div>2–4 engineers, 1 designer, 1 PM</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Estimated effort</div>
                                                <div>~320–640 engineering hours</div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-3">
                                            <Link href={'/services/angular-development'} className="relative">
                                                <span
                                                    className={`whitespace-nowrap border-b-[0.12em] pr-[0.2em] pb-[0.06em] inline-block ${isDayTime ? 'border-gray-300' : 'border-white/70'}`}>Angular Development</span>
                                            </Link>
                                            <FxButton href={'/contact'} variant={'ghost'}>Schedule Audit</FxButton>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        {/* React — Extremely detailed */}
                        <FxReveal>
                            <FxHoloCard day={isDayTime}
                                        className="p-6 lg:p-8 border border-teal-400/8 shadow-[0_24px_80px_-28px_rgba(45,212,191,0.30)]">
                                <div className="flex gap-4 lg:gap-6 items-start">
                                    <FxFrame className="w-[72px] h-[72px] flex items-center justify-center" glow>
                                        <Image
                                            src={isDayTime ? '/assets/webd/icon1/react1.svg' : '/assets/webd/icon1/react.svg'}
                                            alt={'React'}
                                            width={52}
                                            height={52}
                                        />
                                    </FxFrame>
                                    <div className="flex-1">
                                        <h6 className={'text-[1.15em] lg:text-[1.5em] font-[800] mb-2'}>React —
                                            Component-led UX & Performance</h6>
                                        <p className={'text-[0.95em] text-justify mb-3'}>
                                            Build composable, high-performance front-ends using server components,
                                            streaming
                                            SSR, and tactical hydration. Emphasis on observability, deterministic
                                            rendering, and
                                            incremental adoption strategies.
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">When to choose</div>
                                                <ul className="text-[0.9em] list-disc pl-5">
                                                    <li>Public-facing products with SEO & performance needs</li>
                                                    <li>Teams that value modular reuse and incremental migration</li>
                                                    <li>Complex UIs requiring fine-grained rendering control</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Typical stack</div>
                                                <ul className="text-[0.9em] list-none pl-0">
                                                    <li>React 18+, Next.js App Router, Vite (for micro-frontends)</li>
                                                    <li>TanStack Query/Redux Toolkit, Storybook, Playwright</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="text-[0.9em] grid grid-cols-2 gap-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Deliverables — Phase
                                                    1
                                                </div>
                                                <ul className="list-disc pl-5">
                                                    <li>Design system + Storybook + token migration</li>
                                                    <li>Core shell, routing UX, incremental hydration plan</li>
                                                    <li>Performance budget & caching strategy</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Quality &
                                                    Observability
                                                </div>
                                                <ul className="list-none pl-0">
                                                    <li>E2E & component tests (Playwright + Jest)</li>
                                                    <li>Real-user monitoring (RUM) + synthetic checks</li>
                                                    <li>Bundle analysis and CI budgets</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-3 text-[0.9em] grid grid-cols-3 gap-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Timeline</div>
                                                <div>6–12 weeks (MVP → v1)</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Team</div>
                                                <div>1–3 engineers, 1 designer</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Effort</div>
                                                <div>~200–480 engineering hours</div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-3">
                                            <Link href={'/services/Reactjs-Development'} className="relative">
                                                <span
                                                    className={`whitespace-nowrap border-b-[0.12em] pr-[0.2em] pb-[0.06em] inline-block ${isDayTime ? 'border-gray-300' : 'border-white/70'}`}>React Development</span>
                                            </Link>
                                            <FxButton href={'/contact'} variant={'ghost'}>Request Scope</FxButton>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        {/* HTML — Detailed foundational card */}
                        <FxReveal>
                            <FxHoloCard day={isDayTime}
                                        className="p-6 lg:p-8 border border-teal-400/6 shadow-[0_18px_48px_-20px_rgba(45,212,191,0.16)]">
                                <div className="flex gap-4 items-start">
                                    <FxFrame className="w-[60px] h-[60px] flex items-center justify-center" glow>
                                        <Image
                                            src={isDayTime ? '/assets/webd/icon1/html1.svg' : '/assets/webd/icon1/html.svg'}
                                            alt={'HTML'}
                                            width={44}
                                            height={44}
                                        />
                                    </FxFrame>
                                    <div>
                                        <h6 className={'text-[1.05em] font-[700] mb-2'}>HTML5 — Semantic Foundations &
                                            SEO</h6>
                                        <p className={'text-[0.9em] text-justify mb-2'}>
                                            Structured, semantic markup that improves accessibility, crawlability, and
                                            long-term
                                            maintainability. We embed metadata, structured data, and performance-first
                                            patterns.
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <FxChip day={isDayTime}>ARIA</FxChip>
                                            <FxChip day={isDayTime}>Structured Data</FxChip>
                                            <FxChip day={isDayTime}>Critical CSS</FxChip>
                                        </div>

                                        <div className="mt-3 text-[0.9em] grid grid-cols-2 gap-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Deliverables</div>
                                                <ul className="list-disc pl-5">
                                                    <li>Semantic templates & SSR-ready fragments</li>
                                                    <li>Structured data (JSON-LD) for key pages</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Accessibility</div>
                                                <ul className="list-none pl-0">
                                                    <li>Keyboard flows & screenreader validation</li>
                                                    <li>Color contrast & focus management</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        {/* CSS — Design system & scale */}
                        <FxReveal>
                            <FxHoloCard day={isDayTime}
                                        className="p-6 lg:p-8 border border-teal-400/6 shadow-[0_18px_48px_-20px_rgba(45,212,191,0.16)]">
                                <div className="flex gap-4 items-start">
                                    <FxFrame className="w-[60px] h-[60px] flex items-center justify-center" glow>
                                        <Image
                                            src={isDayTime ? '/assets/webd/icon1/css1.svg' : '/assets/webd/icon1/css.svg'}
                                            alt={'CSS'}
                                            width={44}
                                            height={44}
                                        />
                                    </FxFrame>
                                    <div>
                                        <h6 className={'text-[1.05em] font-[700] mb-2'}>Modern CSS — Tokens, Systems &
                                            Performance</h6>
                                        <p className={'text-[0.9em] text-justify mb-2'}>
                                            Design tokens, utility-first patterns and CSS architecture that enable
                                            consistent
                                            product design, theming and runtime performance optimizations (critical CSS,
                                            tree-shaking).
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <FxChip day={isDayTime}>Tokens</FxChip>
                                            <FxChip day={isDayTime}>Theming</FxChip>
                                            <FxChip day={isDayTime}>Critical CSS</FxChip>
                                        </div>

                                        <div className="mt-3 text-[0.9em] grid grid-cols-2 gap-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Deliverables</div>
                                                <ul className="list-disc pl-5">
                                                    <li>Design tokens + theme engine</li>
                                                    <li>Utility classes & component styles</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Performance</div>
                                                <ul className="list-none pl-0">
                                                    <li>Critical CSS extraction</li>
                                                    <li>Runtime CSS splitting for LPs</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        {/* Vue — Pragmatic detail */}
                        <FxReveal>
                            <FxHoloCard day={isDayTime}
                                        className="p-6 lg:p-8 border border-teal-400/8 shadow-[0_24px_80px_-28px_rgba(45,212,191,0.30)]">
                                <div className="flex gap-4 lg:gap-6 items-start">
                                    <FxFrame className="w-[72px] h-[72px] flex items-center justify-center" glow>
                                        <Image
                                            src={isDayTime ? '/assets/webd/icon1/vue1.svg' : '/assets/webd/icon1/vue.svg'}
                                            alt={'Vue'}
                                            width={52}
                                            height={52}
                                        />
                                    </FxFrame>
                                    <div className="flex-1">
                                        <h6 className={'text-[1.15em] lg:text-[1.5em] font-[800] mb-2'}>Vue.js — Fast
                                            Iteration & Prototyping</h6>
                                        <p className={'text-[0.95em] text-justify mb-3'}>
                                            Fast-moving teams benefit from Vue's approachable API for early-stage
                                            products,
                                            progressive enhancement and modular componentization.
                                        </p>

                                        <div className="flex gap-2 flex-wrap mt-2">
                                            <FxChip day={isDayTime}>MVPs</FxChip>
                                            <FxChip day={isDayTime}>SFCs</FxChip>
                                        </div>

                                        <div className="mt-3 text-[0.9em] grid grid-cols-3 gap-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Timeline</div>
                                                <div>4–10 weeks</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Team</div>
                                                <div>1–2 engineers</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Effort</div>
                                                <div>~120–320 hours</div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-3">
                                            <Link href={'/services/Vuejs-Development'} className="relative">
                                                <span
                                                    className={`whitespace-nowrap border-b-[0.12em] pr-[0.2em] pb-[0.06em] inline-block ${isDayTime ? 'border-gray-300' : 'border-white/70'}`}>Vue.js Development</span>
                                            </Link>
                                            <FxButton href={'/contact'} variant={'ghost'}>Prototype</FxButton>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        {/* JavaScript — Platform logic, extremely granular */}
                        <FxReveal>
                            <FxHoloCard day={isDayTime}
                                        className="p-6 lg:p-8 border border-teal-400/8 shadow-[0_24px_80px_-28px_rgba(45,212,191,0.30)]">
                                <div className="flex gap-4 lg:gap-6 items-start">
                                    <FxFrame className="w-[72px] h-[72px] flex items-center justify-center" glow>
                                        <Image
                                            src={isDayTime ? '/assets/webd/icon1/js.png' : '/assets/webd/icon1/js1.png'}
                                            alt={'JavaScript'}
                                            width={52}
                                            height={52}
                                        />
                                    </FxFrame>
                                    <div className="flex-1">
                                        <h6 className={'text-[1.15em] lg:text-[1.5em] font-[800] mb-2'}>JavaScript —
                                            ESNext & Real-time</h6>
                                        <p className={'text-[0.95em] text-justify mb-3'}>
                                            Focused on efficient runtime behavior, concurrency patterns, memoization and
                                            real-time channels (WebSockets, WebRTC) for interactive features and
                                            collaboration.
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <FxChip day={isDayTime}>ESNext</FxChip>
                                            <FxChip day={isDayTime}>Realtime</FxChip>
                                            <FxChip day={isDayTime}>Worker Threads</FxChip>
                                        </div>

                                        <div className="mt-3 text-[0.9em] grid grid-cols-2 gap-3">
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Deliverables</div>
                                                <ul className="list-disc pl-5">
                                                    <li>Realtime data adapters & conflict resolution</li>
                                                    <li>Performance tuning & algorithmic reviews</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="text-[0.78em] text-gray-400 mb-1">Observability</div>
                                                <ul className="list-none pl-0">
                                                    <li>Realtime metrics & tracing</li>
                                                    <li>Error budgets & SLOs for critical paths</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-3">
                                            <Link href={'/services/Javascript'} className="relative">
                                                <span
                                                    className={`whitespace-nowrap border-b-[0.12em] pr-[0.2em] pb-[0.06em] inline-block ${isDayTime ? 'border-gray-300' : 'border-white/70'}`}>Javascript Development</span>
                                            </Link>
                                            <FxButton href={'/contact'} variant={'ghost'}>Technical Review</FxButton>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                    </div>
                </div>
            </div>

            <div className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em]'}>
                <FxFrame className="rounded-2xl overflow-hidden">
                    <div className="relative h-[360px] lg:h-[720px] w-full">
                        <Image
                            src={'/assets/webd/mid.jpg'}
                            alt={'mid image'}
                            fill
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />

                        <div
                            className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none"/>
                        <div className="absolute inset-0 pointer-events-none">
                            <div
                                className="absolute right-[-10%] top-[-10%] opacity-8 w-[50vmax] h-[50vmax] rounded-full bg-gradient-to-r from-purple-500 to-pink-400 blur-3xl"/>
                        </div>

                        <div
                            className="absolute right-6 top-6 z-10 text-right max-w-base sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]">
                            <div className="text-teal-300 text-xs uppercase tracking-wider font-semibold">Capability
                            </div>
                            <h3 className="text-white text-xl lg:text-3xl font-bold leading-tight">Scalable architecture
                                & observability</h3>
                            <p className="text-white/70 mt-2 text-sm">Illustrative architecture graphic showing the flow
                                from front-end to data stores, with monitoring and failover baked in.</p>
                        </div>
                    </div>
                </FxFrame>
            </div>

            {/* The Benefits of Better Web Development */}
            <div id={'business benefit'}
                 className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                {/* Business Benefit Header — futuristic */}
                <FxReveal>
                    <div
                        className={`border-b-[0.08em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-teal-400/12 pb-[3.2em] lg:mb-[5.5em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <div>
                            <h2 className='text-[1.05em] text-start sm:text-[1.6em] md:text-[3.2em] lg:text-[3.1em] font-[700] tracking-tight leading-[1.05] lg:pb-6'>
                                Futuristic Outcomes —
                                <span className="gx-gradient-text"> Measurable Web Development</span>
                                <br className={'lg:block md:block hidden'}/>
                                Designed for speed, resilience and growth
                            </h2>
                        </div>

                        <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                            <p className={'text-justify text-[0.95em] font-[300] leading-[1.6]'}>
                                Not all development is equal. Our focus is outcome-first engineering — combining
                                holographic UI treatments, operational best-practices and measurable performance
                                targets so your product not only looks futuristic but performs and scales predictably.
                                Below are the strategic benefits, each with measurable KPIs and acceptance criteria.
                            </p>
                        </div>
                    </div>
                </FxReveal>

                {/* Futuristic benefits grid */}
                <div
                    className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 lg:gap-[3.5em] md:gap-[2.5em] sm:gap-[2em] ${isDayTime ? 'text-black' : 'text-white'}`}>

                    {/* Card helper */}
                    {/* Each card: FxHoloCard -> FxFrame icon -> title -> short pitch -> metrics -> acceptance */}

                    {/* Diverse Knowledge (engineered) */}
                    <FxReveal>
                        <FxHoloCard day={isDayTime}
                                    className="p-6 lg:p-8 rounded-2xl border border-teal-400/8 shadow-[0_24px_60px_-24px_rgba(45,212,191,0.18)]">
                            <div className="flex items-start gap-4">
                                <FxFrame className="w-[64px] h-[64px] flex items-center justify-center" glow>
                                    <Image
                                        src={isDayTime ? '/assets/webd/icon2/risk.svg' : '/assets/webd/icon2/risk1.svg'}
                                        alt={'Diverse Knowledge'} width={44} height={44}/>
                                </FxFrame>
                                <div className="flex-1">
                                    <h5 className="text-[1.15em] font-[700] mb-2">Diverse Knowledge — Right tool, right
                                        problem</h5>
                                    <p className="text-[0.9em] text-justify mb-3 font-[300]">We select stacks by
                                        outcomes: performance, time-to-market, and operational costs — not fashion. This
                                        reduces technical debt and accelerates delivery.</p>

                                    <div className="flex flex-col gap-2 mb-2 text-[0.88em]">
                                        <div className="flex gap-2 items-center">
                                            <span className="text-xs bg-teal-400/10 px-2 py-1 rounded">KPI</span>
                                            <span>Mean time to deploy (MTTD) &lt; 24h for minor releases</span>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="text-xs bg-teal-400/10 px-2 py-1 rounded">Metric</span>
                                            <span>Cross-team onboarding time &lt; 2 weeks</span>
                                        </div>
                                    </div>

                                    <div className="text-[0.86em]">
                                        <div className="text-[0.78em] text-gray-400 mb-1">Acceptance criteria</div>
                                        <ul className="list-disc pl-5 text-justify">
                                            <li>Reference implementation and docs exist for primary stack</li>
                                            <li>Onboarding checklist validates dev setup and sample feature build</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </FxHoloCard>
                    </FxReveal>

                    {/* Scalability — cloud-native patterns */}
                    <FxReveal>
                        <FxHoloCard day={isDayTime}
                                    className="p-6 lg:p-8 rounded-2xl border border-teal-400/8 shadow-[0_24px_60px_-24px_rgba(45,212,191,0.18)]">
                            <div className="flex items-start gap-4">
                                <FxFrame className="w-[64px] h-[64px] flex items-center justify-center" glow>
                                    <Image
                                        src={isDayTime ? '/assets/webd/icon2/sca.svg' : '/assets/webd/icon2/sca1.svg'}
                                        alt={'Scalability'} width={44} height={44}/>
                                </FxFrame>
                                <div className="flex-1">
                                    <h5 className="text-[1.15em] font-[700] mb-2">Scalability — Cloud-native by
                                        design</h5>
                                    <p className="text-[0.9em] text-justify mb-3 font-[300]">Design for unpredictable
                                        growth: autoscaling policies, cache-first architectures, and partition-tolerant
                                        services that maintain business SLAs under load.</p>

                                    <div className="grid grid-cols-1 gap-2 mb-2 text-[0.88em]">
                                        <div className="flex gap-2 items-center">
                                            <span className="text-xs bg-teal-400/10 px-2 py-1 rounded">SLO</span>
                                            <span>99.95% availability for critical paths</span>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span
                                                className="text-xs bg-teal-400/10 px-2 py-1 rounded">Load target</span>
                                            <span>Handle 10k concurrent users with <em>graceful</em> degradation</span>
                                        </div>
                                    </div>

                                    <div className="text-[0.86em]">
                                        <div className="text-[0.78em] text-gray-400 mb-1">Acceptance criteria</div>
                                        <ul className="list-disc pl-5 text-justify">
                                            <li>Load test passes with p95 latency under target at expected traffic
                                                profile
                                            </li>
                                            <li>Autoscaling playbook verified in staging and runbook created</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </FxHoloCard>
                    </FxReveal>

                    {/* Faster Value — iterative & measurable */}
                    <FxReveal>
                        <FxHoloCard day={isDayTime}
                                    className="p-6 lg:p-8 rounded-2xl border border-teal-400/8 shadow-[0_24px_60px_-24px_rgba(45,212,191,0.18)]">
                            <div className="flex items-start gap-4">
                                <FxFrame className="w-[64px] h-[64px] flex items-center justify-center" glow>
                                    <Image
                                        src={isDayTime ? '/assets/webd/icon2/test.svg' : '/assets/webd/icon2/test1.svg'}
                                        alt={'Faster Value'} width={44} height={44}/>
                                </FxFrame>
                                <div className="flex-1">
                                    <h5 className="text-[1.15em] font-[700] mb-2">Faster Value — MVP to growth
                                        loops</h5>
                                    <p className="text-[0.9em] text-justify mb-3 font-[300]">Ship validated increments
                                        fast. Establish funnels and telemetry from day one so each release drives
                                        measurable user and business outcomes.</p>

                                    <div className="flex flex-col gap-2 mb-2 text-[0.88em]">
                                        <div className="flex gap-2 items-center">
                                            <span className="text-xs bg-teal-400/10 px-2 py-1 rounded">Metric</span>
                                            <span>Release-to-feedback loop &lt; 2 weeks</span>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="text-xs bg-teal-400/10 px-2 py-1 rounded">Impact</span>
                                            <span>Validated feature adoption &gt; 10% in first 30 days</span>
                                        </div>
                                    </div>

                                    <div className="text-[0.86em]">
                                        <div className="text-[0.78em] text-gray-400 mb-1">Acceptance criteria</div>
                                        <ul className="list-disc pl-5 text-justify">
                                            <li>Telemetry dashboards show feature KPIs within 72h of release</li>
                                            <li>Post-release regression checks pass and rollbacks are documented</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </FxHoloCard>
                    </FxReveal>

                    {/* More Control — branching & governance */}
                    <FxReveal>
                        <FxHoloCard day={isDayTime}
                                    className="p-6 lg:p-8 rounded-2xl border border-teal-400/8 shadow-[0_24px_60px_-24px_rgba(45,212,191,0.18)]">
                            <div className="flex items-start gap-4">
                                <FxFrame className="w-[64px] h-[64px] flex items-center justify-center" glow>
                                    <Image
                                        src={isDayTime ? '/assets/webd/icon2/fast.svg' : '/assets/webd/icon2/fast1.svg'}
                                        alt={'More Control'} width={44} height={44}/>
                                </FxFrame>
                                <div className="flex-1">
                                    <h5 className="text-[1.15em] font-[700] mb-2">More Control — predictable
                                        delivery</h5>
                                    <p className="text-[0.9em] text-justify mb-3 font-[300]">Gitops, trunk-based
                                        strategies, and enforced CI policies give you predictable cadence and safe
                                        rollouts.</p>

                                    <div className="flex flex-col gap-2 mb-2 text-[0.88em]">
                                        <div className="flex gap-2 items-center">
                                            <span className="text-xs bg-teal-400/10 px-2 py-1 rounded">Policy</span>
                                            <span>CI gate: tests + security scan on every PR</span>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="text-xs bg-teal-400/10 px-2 py-1 rounded">Safety</span>
                                            <span>Automatic canary rollouts and telemetry-backed promotion</span>
                                        </div>
                                    </div>

                                    <div className="text-[0.86em]">
                                        <div className="text-[0.78em] text-gray-400 mb-1">Acceptance criteria</div>
                                        <ul className="list-disc pl-5 text-justify">
                                            <li>All PRs run full CI and security scans; no merge on failed gates</li>
                                            <li>Automatic canary promotes only when telemetry thresholds met</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </FxHoloCard>
                    </FxReveal>

                    {/* Stronger Security — continuous */}
                    <FxReveal>
                        <FxHoloCard day={isDayTime}
                                    className="p-6 lg:p-8 rounded-2xl border border-teal-400/8 shadow-[0_24px_60px_-24px_rgba(45,212,191,0.18)]">
                            <div className="flex items-start gap-4">
                                <FxFrame className="w-[64px] h-[64px] flex items-center justify-center" glow>
                                    <Image
                                        src={isDayTime ? '/assets/webd/icon2/att.svg' : '/assets/webd/icon2/att1.svg'}
                                        alt={'Stronger Security'} width={44} height={44}/>
                                </FxFrame>
                                <div className="flex-1">
                                    <h5 className="text-[1.15em] font-[700] mb-2">Stronger Security — built-in,
                                        continuous</h5>
                                    <p className="text-[0.9em] text-justify mb-3 font-[300]">Security is a lifecycle
                                        concern: SCA, dependency policy, automated pentest pipelines and runtime anomaly
                                        detection are baked into releases.</p>

                                    <div className="flex flex-col gap-2 mb-2 text-[0.88em]">
                                        <div className="flex gap-2 items-center">
                                            <span className="text-xs bg-teal-400/10 px-2 py-1 rounded">SLA</span>
                                            <span>Critical vuln remediation &lt; 48 hours</span>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="text-xs bg-teal-400/10 px-2 py-1 rounded">Audit</span>
                                            <span>Automated pentest coverage for release candidates</span>
                                        </div>
                                    </div>

                                    <div className="text-[0.86em]">
                                        <div className="text-[0.78em] text-gray-400 mb-1">Acceptance criteria</div>
                                        <ul className="list-disc pl-5 text-justify">
                                            <li>SCA scan results show no critical findings on release</li>
                                            <li>Runtime anomaly detection triggers alerts to SRE within 5 minutes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </FxHoloCard>
                    </FxReveal>

                    {/* Less Uncertainty — delivery confidence */}
                    <FxReveal>
                        <FxHoloCard day={isDayTime}
                                    className="p-6 lg:p-8 rounded-2xl border border-teal-400/8 shadow-[0_24px_60px_-24px_rgba(45,212,191,0.18)]">
                            <div className="flex items-start gap-4">
                                <FxFrame className="w-[64px] h-[64px] flex items-center justify-center" glow>
                                    <Image
                                        src={isDayTime ? '/assets/webd/icon2/risk.svg' : '/assets/webd/icon2/risk1.svg'}
                                        alt={'Less Uncertainty'} width={44} height={44}/>
                                </FxFrame>
                                <div className="flex-1">
                                    <h5 className="text-[1.15em] font-[700] mb-2">Less Uncertainty — predictable
                                        outcomes</h5>
                                    <p className="text-[0.9em] text-justify mb-3 font-[300]">SLAs, accepted runbooks and
                                        deterministic release criteria reduce surprises and align teams toward
                                        measurable goals.</p>

                                    <div className="text-[0.86em] mb-2">
                                        <div className="text-[0.78em] text-gray-400 mb-1">Acceptance criteria</div>
                                        <ul className="list-disc pl-5 text-justify">
                                            <li>Runbooks for critical flows exist and are validated in staging</li>
                                            <li>Post-mortem cadence and SLA reporting configured</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </FxHoloCard>
                    </FxReveal>

                    {/* Competitive Edge — strategic product */}
                    <FxReveal>
                        <FxHoloCard day={isDayTime}
                                    className="p-6 lg:p-8 rounded-2xl border border-teal-400/8 shadow-[0_24px_60px_-24px_rgba(45,212,191,0.18)]">
                            <div className="flex items-start gap-4">
                                <FxFrame className="w-[64px] h-[64px] flex items-center justify-center" glow>
                                    <Image
                                        src={isDayTime ? '/assets/webd/icon2/sca.svg' : '/assets/webd/icon2/sca1.svg'}
                                        alt={'Competitive Edge'} width={44} height={44}/>
                                </FxFrame>
                                <div className="flex-1">
                                    <h5 className="text-[1.15em] font-[700] mb-2">Competitive Edge — product as
                                        strategy</h5>
                                    <p className="text-[0.9em] text-justify mb-3 font-[300]">Products that combine
                                        delight with measurable user outcomes become strategic assets — we design
                                        features that improve retention, LTV and conversion.</p>

                                    <div className="text-[0.86em] mb-2">
                                        <div className="text-[0.78em] text-gray-400 mb-1">Metric</div>
                                        <div>Improve 30-day retention by target % through UX & feature experiments</div>
                                    </div>

                                    <div className="text-[0.86em]">
                                        <div className="text-[0.78em] text-gray-400 mb-1">Acceptance criteria</div>
                                        <ul className="list-disc pl-5 text-justify">
                                            <li>Retention experiment design and dashboarding in place</li>
                                            <li>Feature success criteria signed-off before implementation</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </FxHoloCard>
                    </FxReveal>

                    {/* Lower Costs — efficiency */}
                    <FxReveal>
                        <FxHoloCard day={isDayTime}
                                    className="p-6 lg:p-8 rounded-2xl border border-teal-400/8 shadow-[0_24px_60px_-24px_rgba(45,212,191,0.18)]">
                            <div className="flex items-start gap-4">
                                <FxFrame className="w-[64px] h-[64px] flex items-center justify-center" glow>
                                    <Image
                                        src={isDayTime ? '/assets/webd/icon2/test.svg' : '/assets/webd/icon2/test1.svg'}
                                        alt={'Lower Costs'} width={44} height={44}/>
                                </FxFrame>
                                <div className="flex-1">
                                    <h5 className="text-[1.15em] font-[700] mb-2">Lower Costs — optimized
                                        engineering</h5>
                                    <p className="text-[0.9em] text-justify mb-3 font-[300]">Efficiency is a feature —
                                        we architect for low operational overhead, right-sizing compute and automating
                                        toil to reduce long-term costs.</p>

                                    <div className="text-[0.86em] mb-2">
                                        <div className="text-[0.78em] text-gray-400 mb-1">Metric</div>
                                        <div>Reduce monthly infra spend by target % through caching and infra
                                            right-sizing
                                        </div>
                                    </div>

                                    <div className="text-[0.86em]">
                                        <div className="text-[0.78em] text-gray-400 mb-1">Acceptance criteria</div>
                                        <ul className="list-disc pl-5 text-justify">
                                            <li>Infra cost report and optimisation plan delivered</li>
                                            <li>Runtime regressions and latency kept within agreed SLOs</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </FxHoloCard>
                    </FxReveal>

                    {/* Continuous Improvement — lifecycle */}
                    <FxReveal>
                        <FxHoloCard day={isDayTime}
                                    className="p-6 lg:p-8 rounded-2xl border border-teal-400/8 shadow-[0_24px_60px_-24px_rgba(45,212,191,0.18)]">
                            <div className="flex items-start gap-4">
                                <FxFrame className="w-[64px] h-[64px] flex items-center justify-center" glow>
                                    <Image
                                        src={isDayTime ? '/assets/webd/icon2/fast.svg' : '/assets/webd/icon2/fast1.svg'}
                                        alt={'Continuous Improvement'} width={44} height={44}/>
                                </FxFrame>
                                <div className="flex-1">
                                    <h5 className="text-[1.15em] font-[700] mb-2">Continuous Improvement — the product
                                        never stops</h5>
                                    <p className="text-[0.9em] text-justify mb-3 font-[300]">Ongoing monitoring,
                                        experiment pipelines, and a roadmap cadence ensure the product evolves with
                                        users and market needs.</p>

                                    <div className="text-[0.86em] mb-2">
                                        <div className="text-[0.78em] text-gray-400 mb-1">Acceptance criteria</div>
                                        <ul className="list-disc pl-5 text-justify">
                                            <li>Quarterly roadmap with measurable outcomes</li>
                                            <li>Experiment pipeline and dashboard delivering A/B insights</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </FxHoloCard>
                    </FxReveal>

                </div>
            </div>

            {/* Bespoke Web Development — Futuristic, extremely detailed */}
            <div className={`lg:-mt-[3em] md:-mt-[3em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[6em] md:my-[6em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-[6em] md:pb-[6em] pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>

                    {/* Heading & Pitch */}
                    <div>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[700] font-[700] lg:tracking-wider tracking-tight'>
                            Tailored Web Solutions — Engineered for Impact
                        </h6>

                        <FxReveal>
                            <h3 className='lg:text-[3em] md:text-[3em] text-[1.9em] font-[800] lg:mt-[0.01em] lg:leading-[1.02] tracking-tight gx-gradient-text pb-2'>
                                Bespoke Web Development — Future-ready by Design
                            </h3>
                        </FxReveal>

                        <p className='font-[300] text-justify text-[0.95em] tracking-normal leading-[1.6] mb-6'>
                            Specialized engineering teams, holographic UI accents, and outcome-driven roadmaps converge
                            to deliver products that are not only visually futuristic but operationally predictable.
                            Each engagement includes measurable KPIs, acceptance criteria, and an implementation
                            blueprint — so engineering work translates to business impact.
                        </p>

                        <div className='grid grid-cols-2 gap-3'>
                            <FxHoloCard day={isDayTime} className='p-4 border border-teal-400/8'>
                                <div>
                                    <h6 className='text-[0.95em] font-[700]'>Core Guarantee</h6>
                                    <p className='text-[0.85em] font-[300]'>Deterministic delivery cadence with CI gates
                                        and measurable performance targets.</p>
                                    <div className='mt-2 text-[0.82em]'>
                                        <div className='flex gap-2 items-center'>
                                            <span className='text-xs bg-teal-400/10 px-2 py-1 rounded'>KPI</span>
                                            <span>Ship weekly increments; MTTD &lt; 24h for minor fixes</span>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>

                            <FxHoloCard day={isDayTime} className='p-4 border border-teal-400/8'>
                                <div>
                                    <h6 className='text-[0.95em] font-[700]'>Security by Default</h6>
                                    <p className='text-[0.85em] font-[300]'>SCA, automated pentest pipelines and runtime
                                        anomaly detection per release.</p>
                                    <div className='mt-2 text-[0.82em]'>
                                        <div className='flex gap-2 items-center'>
                                            <span className='text-xs bg-teal-400/10 px-2 py-1 rounded'>SLA</span>
                                            <span>Critical vuln remediation &lt; 48h</span>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </div>

                        <div className='mt-6 flex gap-3'>
                            <FxButton href={'/contact'} variant={'solid'}>Request a Technical Brief</FxButton>
                            <FxButton href={'/services'} variant={'ghost'}>Explore Services</FxButton>
                        </div>
                    </div>

                    {/* Detailed capabilities + blueprint cards */}
                    <div className='lg:-ml-[3em]'>
                        <FxReveal>
                            <FxHoloCard day={isDayTime}
                                        className='p-6 lg:p-8 rounded-2xl border border-teal-400/8 shadow-[0_20px_60px_-24px_rgba(45,212,191,0.18)]'>
                                <div className='flex gap-4'>
                                    <FxFrame className='w-[64px] h-[64px] flex items-center justify-center' glow>
                                        <Image
                                            src={isDayTime ? '/assets/wd/last.jpg' : '/assets/wd/nlast.jpg'}
                                            alt={'Blueprint'} width={44} height={44}/>
                                    </FxFrame>
                                    <div className='flex-1'>
                                        <h5 className='text-[1.05em] font-[800] mb-2'>Engagement Blueprint — What you
                                            get</h5>
                                        <p className='text-[0.9em] font-[300] mb-3 text-justify'>
                                            A compact, action-oriented blueprint delivered in the first sprint:
                                            architecture diagram,
                                            integration map, tokenised design system, performance budget, and CI/CD
                                            templates.
                                        </p>

                                        <div className='grid grid-cols-2 gap-4 text-[0.88em]'>
                                            <div>
                                                <div className='text-[0.78em] text-gray-400 mb-1'>Deliverables</div>
                                                <ul className='list-disc pl-5'>
                                                    <li>Architecture diagram & integration map</li>
                                                    <li>Tokenised component library (Storybook)</li>
                                                    <li>CI templates & deployment playbook</li>
                                                </ul>
                                            </div>

                                            <div>
                                                <div className='text-[0.78em] text-gray-400 mb-1'>Acceptance criteria
                                                </div>
                                                <ul className='list-disc pl-5'>
                                                    <li>Blueprint reviewed and approved by stakeholders</li>
                                                    <li>Smoke tests passing in staging environment</li>
                                                    <li>Performance budget verified by synthetic checks</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='mt-4 grid grid-cols-3 gap-3 text-[0.86em]'>
                                            <div>
                                                <div className='text-[0.78em] text-gray-400'>Timeline</div>
                                                <div>2–4 weeks (blueprint)</div>
                                            </div>
                                            <div>
                                                <div className='text-[0.78em] text-gray-400'>Team</div>
                                                <div>1 architect, 1–2 engineers</div>
                                            </div>
                                            <div>
                                                <div className='text-[0.78em] text-gray-400'>Effort</div>
                                                <div>~80–160 hours</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        <div className='mt-6 grid grid-cols-2 gap-4'>
                            <FxReveal>
                                <FxHoloCard day={isDayTime} className='p-4 border border-teal-400/8'>
                                    <h6 className='text-[0.95em] font-[700]'>Performance & Monitoring</h6>
                                    <p className='text-[0.85em] font-[300] mb-2'>SLOs, RUM, synthetic checks and
                                        alerting configured from day one.</p>
                                    <div className='text-[0.82em]'>
                                        <div className='flex gap-2 items-center'><span
                                            className='text-xs bg-teal-400/10 px-2 py-1 rounded'>SLO</span><span> LCP ≤ 2.5s target</span>
                                        </div>
                                        <div className='flex gap-2 items-center'><span
                                            className='text-xs bg-teal-400/10 px-2 py-1 rounded'>Alert</span><span> Error budget alerts in CI</span>
                                        </div>
                                    </div>
                                </FxHoloCard>
                            </FxReveal>

                            <FxReveal>
                                <FxHoloCard day={isDayTime} className='p-4 border border-teal-400/8'>
                                    <h6 className='text-[0.95em] font-[700]'>Security & Compliance</h6>
                                    <p className='text-[0.85em] font-[300] mb-2'>Automated SCA, CI gates and release
                                        checks with runtime anomaly detection.</p>
                                    <div className='text-[0.82em]'>
                                        <div className='flex gap-2 items-center'><span
                                            className='text-xs bg-teal-400/10 px-2 py-1 rounded'>Policy</span><span> Auto SCA on PRs</span>
                                        </div>
                                        <div className='flex gap-2 items-center'><span
                                            className='text-xs bg-teal-400/10 px-2 py-1 rounded'>Audit</span><span> Pentest on release candidates</span>
                                        </div>
                                    </div>
                                </FxHoloCard>
                            </FxReveal>
                        </div>
                    </div>

                </div>
            </div>

            {/* Trusted Digital Partners — seostyle */}
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
                            Strategic Web Development partners <span
                            className="gx-gradient-text">you can trust</span><br/>
                            <span
                                className={`text-[0.65em] font-[300] ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>delivering products that matter</span>
                        </h2>
                    </FxReveal>

                    <FxReveal delay={0.18}>
                        <p className={`text-[0.95em] leading-[1.8] mb-6 lg:max-w-[90%] ${isDayTime ? 'text-black/70' : 'text-white/75'}`}>
                            We specialise in building high-impact web products — from marketing sites to complex
                            web platforms. Our focus is measurable outcomes: performance, retention and revenue.
                        </p>
                        <p className={`text-[0.95em] leading-[1.8] mb-12 lg:max-w-[90%] ${isDayTime ? 'text-black/70' : 'text-white/75'}`}>
                            We combine design, engineering and data to deliver repeatable results for startups and
                            enterprises alike.
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
                            className={`rounded-2xl p-6 transition-all duration-300 ${isDayTime ? 'bg-black/3 border-teal-700/15' : 'bg-white/10 border-teal-400/15'}`}>
                            <h3 className="text-[1.3em] font-[700] mb-6">Why Grey InfoTech for Web Development</h3>

                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                                {/* Left — FxHoloCard accordion */}
                                <div className="flex flex-col gap-3 lg:pr-[3em]">
                                    {reasons.map((reason, index) => {
                                        const isActive = index + 1 === activeIndex;
                                        return (
                                            <FxHoloCard
                                                key={reason.id}
                                                day={!isDayTime}
                                                className={`p-5 transition-all duration-300 cursor-pointer ${isActive ? 'ring-1 ring-teal-500/40' : 'opacity-70 hover:opacity-90'}`}
                                                onClick={() => setActiveIndex(index + 1)}
                                            >
                                                <h3 className={`leading-[1.2] lg:text-[1.1em] text-[1em] font-[600] mb-2 transition-all ${isActive ? 'text-teal-400' : 'text-teal-700/70'}`}>
                                                    <span
                                                        className="font-mono text-[0.68em] mr-2 text-teal-500/70">{String(reason.id).padStart(2, '0')}</span>
                                                    {reason.title}
                                                </h3>
                                                <AnimatePresence initial={false} mode="wait">
                                                    {isActive && (
                                                        <motion.p
                                                            key={reason.id}
                                                            initial={{opacity: 0, height: 0}}
                                                            animate={{opacity: 1, height: 'auto'}}
                                                            exit={{opacity: 0, height: 0}}
                                                            transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                                                            className={`text-[0.95em] leading-[1.6] overflow-hidden ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}
                                                        >
                                                            {reason.description}
                                                        </motion.p>
                                                    )}
                                                </AnimatePresence>
                                            </FxHoloCard>
                                        );
                                    })}
                                </div>

                                {/* Right — image */}
                                <div>
                                    <FxFrame className="w-full">
                                        <Image
                                            src={(reasons as any)[activeIndex - 1]?.images?.[0] || '/assets/fin/grey.jpg'}
                                            alt="Why Grey InfoTech for Web Development"
                                            width={660} height={380}
                                            className="w-full h-auto rounded-xl object-cover"/>
                                    </FxFrame>
                                </div>
                            </div>

                            {/* CTA */}
                            <FxReveal className="mt-12 flex flex-col items-center justify-center text-center">
                                <FxGlitchText tag="h2"
                                              className={`lg:text-[2em] text-[1.1em] font-[600] tracking-tighter leading-[1.15] pb-4 ${isDayTime ? 'text-slate-800' : 'text-slate-100/40'}`}>
                                    Ready to build a product that performs?
                                </FxGlitchText>
                                <FxButton day={!isDayTime} href="/contact" variant="solid">Start Partnership
                                    →</FxButton>
                            </FxReveal>

                        </div>
                    </FxReveal>
                </div>
            </div>

            {/* Development Process & Methodology Section */}
            <section className={`relative py-20 lg:py-32 ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <FxBackground day={isDayTime}/>
                <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    {/* Section Header */}
                    <div className="max-w-3xl mb-16">
                        <FxChip day={!isDayTime}>OUR METHODOLOGY</FxChip>
                        <FxReveal>
                            <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] tracking-tight mt-4 mb-6">
                                Our Proven <span className="gx-gradient-text">Web Development Process</span>
                            </h2>
                        </FxReveal>
                        <FxReveal delay={0.08}>
                            <p className={`text-[1em] lg:text-[1.1em] leading-[1.7] font-[300] ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>
                                We follow a strategic, collaborative process that transforms your vision into a robust
                                digital product. Each phase is designed to ensure measurable results, continuous
                                alignment with your goals, and sustainable growth. From discovery to deployment and
                                beyond, we're committed to delivering excellence at every stage.
                            </p>
                        </FxReveal>
                    </div>

                    {/* Process Steps Grid */}
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
                        {[
                            {
                                step: "01",
                                title: "Discovery & Strategy",
                                description: "We conduct in-depth discovery sessions to understand your business objectives, target audience, competitive landscape, and technical requirements. Our strategic roadmap aligns your vision with actionable milestones, defining scope, timeline, team structure, and success metrics to ensure shared understanding and clear expectations."
                            },
                            {
                                step: "02",
                                title: "Architecture & Planning",
                                description: "We design the technical architecture, select optimal tech stacks, and create detailed specifications. Our planning phase includes wireframes, component blueprints, API contracts, and acceptance criteria. We establish performance targets, security protocols, and scalability requirements—ensuring a solid foundation before development begins."
                            },
                            {
                                step: "03",
                                title: "Development & Integration",
                                description: "Our engineers execute the build with precision, following best practices in code quality, testing, and documentation. We maintain continuous integration pipelines, conduct rigorous QA, and integrate third-party services seamlessly. Regular sprint reviews and demos keep you aligned with progress while we maintain our commitment to deadline and quality."
                            },
                            {
                                step: "04",
                                title: "Launch & Optimization",
                                description: "We deploy your product to production with zero-downtime strategies, comprehensive monitoring, and rapid incident response. Post-launch, we optimize performance, gather user feedback, and implement improvements. Ongoing support, analytics tracking, and continuous deployment capabilities ensure your application evolves with your business needs."
                            },
                        ].map((item, idx) => (
                            <FxReveal key={idx} delay={0.08 * idx}>
                                <div
                                    className={`p-8 rounded-2xl border transition-all duration-300 hover:border-teal-400/60 ${
                                        isDayTime
                                            ? 'border-gray-200 bg-white/50 hover:bg-white text-slate-50 hover:text-slate-950'
                                            : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-950 hover:text-slate-50'
                                    }`}>
                                    <div className="text-teal-400 text-[2.5em] font-[700] mb-3">{item.step}</div>
                                    <h3 className={`text-[1.3em] font-[600] mb-4 leading-tight`}>{item.title}</h3>
                                    <p className={`text-[0.98em] leading-[1.6] font-[300]`}>
                                        {item.description}
                                    </p>
                                </div>
                            </FxReveal>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default WebDevelopment;
