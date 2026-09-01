'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import {AnimatePresence, motion} from "framer-motion";
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

// Why Grey InfoTech — comprehensive reasons
const reasons = [
    {
        id: 1,
        title: <>Full-Stack Expertise Across Web Platforms</>,
        description: (
            <>
                We've engineered 200+ web applications across SaaS, e-commerce, content platforms, and collaboration
                tools.
                From React and Vue frontends to Node.js and Python backends, our team masters the complete stack.
                We architect for scale, security, and performance—delivering applications handling millions of daily
                active users.
            </>
        ),
    },
    {
        id: 2,
        title: <>Obsessive Performance & User Experience</>,
        description: (
            <>
                Every millisecond matters. We implement aggressive code splitting, CDN optimization, and real-time
                monitoring.
                Core Web Vitals tracking, accessibility hardening (WCAG 2.1 AA), and responsive design across all
                devices.
                Our applications see 45% average improvement in Lighthouse scores and 60% faster load times.
            </>
        ),
    },
    {
        id: 3,
        title: <>Pragmatic Security & Compliance Architecture</>,
        description: (
            <>
                Security isn't an afterthought. We implement defense-in-depth: input validation, XSS/CSRF protection,
                encrypted data at rest and in transit, RBAC, audit logging, and automated vulnerability scanning.
                Our applications meet GDPR, SOC 2, and ISO 27001 requirements from day one.
            </>
        ),
    },
    {
        id: 4,
        title: <>Sustainable Partnership & Continuous Improvement</>,
        description: (
            <>
                Launch is the beginning. We provide post-launch support, incident response, dependency management,
                and quarterly roadmap reviews. Our retainer programs include performance optimization sprints,
                security updates, and feature iteration. 92% of clients remain in multi-year partnerships.
            </>
        ),
    },
];

const WebApplication = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);

    // Floating button visibility
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isDayTime = useIsDayTime();

    // Desktop detection for responsive layout (guarded for SSR)
    const [isDesktop, setIsDesktop] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);
    useEffect(() => {
        const onResize = () => setIsDesktop(window.innerWidth >= 1024);
        if (typeof window !== 'undefined') {
            onResize();
            window.addEventListener('resize', onResize);
        }
        return () => {
            if (typeof window !== 'undefined') window.removeEventListener('resize', onResize);
        };
    }, []);

    // Accordion active index for industry panels
    const [activeAcc, setActiveAcc] = useState<number>(0);

    // Intro section background toggle
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

    // Solutions sticky scroll
    const handleScroll = () => {
        const sections = ["SAAS", "PWA", "CMS", "ECOM", "COLLAB", "ANALYTICS"];
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
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (target: string) => {
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({behavior: "smooth", block: "start"});
            setActiveId(target);
        }
    };

    const stats = [
        {label: 'Years Experience', value: '8+', percent: 90},
        {label: 'Team Members', value: '15+', percent: 75},
        {label: 'Applications Built', value: '34+', percent: 95},
        {label: 'Successful Launches', value: '280+', percent: 98},
        {label: 'Avg Performance Improvement', value: '45%', percent: 85},
    ];

    // Auto-rotate reasons carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex % reasons.length) + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} relative h-auto`}>

            {/* ===== HERO SECTION ===== */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/wad/hero.jpg"
                >
                    <source src="/assets/wad/hero.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/wad/hero.jpg"
                    alt="Web Application Hero"
                    fill
                    priority
                    className="lg:hidden object-cover"
                />

                <div className="pointer-events-none absolute inset-0 z-[1]">
                    <FxBackground day={false} grid={true} aurora={true}/>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50 z-[2]"/>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.12),transparent_50%)] z-[2]"/>

                <div className="pointer-events-none absolute inset-0 z-[3]">
                    <div className="gx-scanline"/>
                    <div className="gx-noise-overlay"/>
                    <div className="gx-orbit absolute"
                         style={{width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .12}}/>
                    <div className="gx-orbit absolute"
                         style={{width: '40vmax', height: '40vmax', bottom: '-15vmax', left: '-10vmax', opacity: .08}}/>
                </div>

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-center top-32 z-[11] px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                                <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"/>
                                <span
                                    className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Web Applications</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Browser-Native Platforms <span className="gx-gradient-text">Built for Scale</span>
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                SaaS applications, progressive web apps, and content platforms engineered for
                                performance and accessibility.
                                We build applications handling millions of users with sub-100ms response times, 99.99%
                                uptime, and offline-first architecture.
                                200+ launched. 92% client retention. Proven at scale.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['React & Vue', 'Real-time APIs', 'Offline-First', 'PWA', 'Multi-tenant'].map((badge) => (
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
                                        <span className="absolute inset-0"
                                              style={{background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'}}/>
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

                        {/* Hero Stats */}
                        <div className="hidden lg:flex flex-col items-end">
                            <div className="grid grid-cols-2 gap-6 w-full">
                                {[
                                    {label: 'Apps Delivered', value: '34+'},
                                    {label: 'Years Expertise', value: '8+'},
                                    {label: 'Client Retention', value: '92%'},
                                    {label: 'Uptime SLA', value: '99.99%'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className="px-3 py-2 rounded-xl border border-cyan-400/25 bg-cyan-400/8 backdrop-blur-md">
                                        <div
                                            className="text-cyan-300 text-[0.5em] uppercase tracking-wider font-[600] mb-1">{stat.label}</div>
                                        <div className="text-white text-[1.2em] font-[700]">{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animated Particles */}
                <div className="absolute top-1/4 left-8 z-[4] w-2 h-2 rounded-full bg-cyan-400 animate-pulse"/>
                <div className="absolute bottom-1/3 right-12 z-[4] w-3 h-3 rounded-full bg-cyan-500 animate-pulse"
                     style={{animationDelay: '0.5s'}}/>
                <div className="absolute top-3/4 left-1/3 z-[4] w-2 h-2 rounded-full bg-teal-400 animate-pulse"
                     style={{animationDelay: '1s'}}/>
            </section>

            {/* ===== INTRO SECTION (Deep detail) ===== */}
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
                    className="relative z-10 grid lg:grid-cols-3 gap-12 lg:gap-16 items-start lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
                    {/* Left: Credibility */}
                    <div className="lg:col-span-1 max-w-md">
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>WEB APPLICATIONS</FxChip>

                        <FxReveal>
                            <h4 className="mt-6 text-[1.05em] font-[600] tracking-tight">Enterprise-grade web
                                platforms</h4>
                        </FxReveal>

                        <FxReveal delay={0.06}>
                            <p className="mt-3 text-[0.95em] font-[300] leading-relaxed">
                                We deliver pragmatic, highly scalable applications focused on performance, security, and
                                user experience.
                                Our teams architect systems built for growth, supporting millions of concurrent users
                                without compromise.
                            </p>
                        </FxReveal>

                        <FxReveal delay={0.12}>
                            <div className="mt-6 space-y-3">
                                {stats.map((s) => (
                                    <div key={s.label}
                                         className={`px-3 py-2 rounded-lg border ${isDayTime ? 'border-white/10 bg-white/5' : 'border-black/80 bg-white/5'}`}>
                                        <div
                                            className="text-[0.75em] text-bLack/60 uppercase tracking-wider font-[600]">{s.label}</div>
                                        <div className="text-[1.1em] font-[700] mt-1">
                                            {s.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.2}>
                            <div className="mt-6">
                                <FxButton day={isDayTime} href="/contact" variant="solid">Schedule a
                                    consultation</FxButton>
                            </div>
                        </FxReveal>
                    </div>

                    {/* Right: Detailed Content */}
                    <div className="lg:col-span-2">
                        <FxReveal>
                            <h3 className="lg:text-[3.4em] md:text-[2.8em] text-[1.9em] font-[700] tracking-tight leading-[1.04]">
                                Full-Stack Web Applications for Modern Business
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.06}>
                            <p className="mt-6 text-[1em] md:text-[1.05em] leading-relaxed font-[300] text-justify">
                                Web applications have become the default platform for business software. We architect
                                and build
                                applications that combine the accessibility of the web with the performance and
                                capabilities of native apps.
                                From SaaS platforms and progressive web apps to content management systems and real-time
                                collaboration tools,
                                our applications serve millions of users reliably.
                            </p>
                        </FxReveal>

                        {/* Deep-dive sections */}
                        <div className="mt-8 grid lg:grid-cols-2 gap-6">
                            <div>
                                <FxReveal delay={0.12}>
                                    <h4 className="text-[1.05em] font-[600] mb-3">Architecture & Performance</h4>
                                    <p className="text-[0.95em] font-[300] leading-relaxed mb-3">
                                        Cloud-native architecture with service-oriented design, real-time APIs, and
                                        progressive enhancement.
                                        Aggressive code splitting, edge caching, and CDN optimization ensure sub-100ms
                                        response times globally.
                                    </p>
                                    <ul className="list-inside space-y-2 text-[0.92em]">
                                        <li>• React/Vue with server-side rendering (SSR/SSG)</li>
                                        <li>• GraphQL & REST APIs with proper caching</li>
                                        <li>• Service workers for offline-first PWA support</li>
                                        <li>• Database indexing and query optimization</li>
                                    </ul>
                                </FxReveal>
                            </div>

                            <div>
                                <FxReveal delay={0.12}>
                                    <h4 className="text-[1.05em] font-[600] mb-3">Security & Compliance</h4>
                                    <p className="text-[0.95em] font-[300] leading-relaxed mb-3">
                                        Multi-layer security architecture with encryption, RBAC, audit logging, and
                                        automated vulnerability scanning.
                                        Built-in compliance for GDPR, SOC 2, HIPAA, and PCI DSS from day one.
                                    </p>
                                    <ul className="list-inside space-y-2 text-[0.92em]">
                                        <li>• XSS/CSRF/SQLi protection at every layer</li>
                                        <li>• JWT-based authentication & session management</li>
                                        <li>• Encrypted data at rest and in transit (TLS 1.3)</li>
                                        <li>• Automated security patching and scanning</li>
                                    </ul>
                                </FxReveal>
                            </div>
                        </div>

                        <FxReveal delay={0.16}>
                            <div className="mt-8 border-t border-white/10 pt-8">
                                <h4 className="text-[1.05em] font-[600] mb-3">Expected Outcomes</h4>
                                <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            label: 'Response time',
                                            value: '<100ms',
                                            desc: 'Sub-100ms globally distributed'
                                        },
                                        {
                                            label: 'Uptime SLA',
                                            value: '99.99%',
                                            desc: 'Resilient fault-tolerant architecture'
                                        },
                                        {
                                            label: 'Performance grade',
                                            value: 'A+ Lighthouse',
                                            desc: 'Accessibility & Core Web Vitals'
                                        }
                                    ].map((stat, i) => (
                                        <div key={i} className="p-3 rounded-md bg-white/3 border border-white/6">
                                            <div className="text-[0.85em] text-cyan-200 font-[600]">{stat.label}</div>
                                            <div className="text-[1.4em] font-[700] mt-1">{stat.value}</div>
                                            <div className="text-[0.9em] mt-2 font-[300]">{stat.desc}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 text-[0.95em] font-[300]">
                                    <p>
                                        Every engagement delivers measurable impact within the first 3-6 months: faster
                                        load times, improved conversion rates,
                                        reduced infrastructure costs, and stronger user retention. We establish clear
                                        KPIs and track every metric.
                                    </p>
                                </div>

                                <div className="mt-6">
                                    <FxButton day={isDayTime} href="/contact" variant="ghost">Request technical
                                        documentation</FxButton>
                                </div>
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.22}>
                            <div className="mt-10">
                                <h4 className="text-[1.05em] font-[600] mb-3">Infrastructure & Operations</h4>
                                <p className="text-[0.95em] font-[300] leading-relaxed mb-3">
                                    Modern infrastructure as code using Kubernetes, Docker, and Terraform. CI/CD
                                    pipelines with automated testing,
                                    staging environments, and zero-downtime deployments. Comprehensive monitoring with
                                    Prometheus, ELK, and Datadog.
                                </p>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-md border bg-white/3">Automated deployments &
                                        rollbacks
                                    </div>
                                    <div className="p-4 rounded-md border bg-white/3">Database replication & backups
                                    </div>
                                    <div className="p-4 rounded-md border bg-white/3">Load balancing & auto-scaling
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>

                {/* Animated accents */}
                <div className="absolute top-1/4 left-8 z-[4] w-2 h-2 rounded-full bg-cyan-400 animate-pulse"/>
                <div className="absolute bottom-1/3 right-12 z-[4] w-3 h-3 rounded-full bg-cyan-500 animate-pulse"
                     style={{animationDelay: '0.5s'}}/>
            </section>

            {/* ===== SOLUTIONS (Sticky Scroll) ===== */}
            <FxStickyScrollSection
                day={isDayTime}
                activeId={activeId}
                onNavClickAction={scrollToSection}
                heading="Web Application Solutions"
                intro="Enterprise-grade web applications engineered for performance, scale, and user satisfaction. From SaaS platforms serving millions to offline-first PWAs and real-time collaboration tools—we build the digital backbone of modern business."
                items={[
                    {
                        id: "SAAS",
                        target: "SAAS",
                        title: "SaaS & Multi-tenant Platforms",
                        body: `Enterprise-scale SaaS applications with advanced multi-tenancy architecture, sophisticated data isolation patterns (row-level security, virtual row security), and zero-downtime deployment strategies. Our platforms handle unlimited customer growth through: (1) Billing & Revenue Engine: subscription management with proration, dunning workflows, usage-based billing with real-time metering, seat-based licensing, feature entitlements with rollout controls, and revenue recognition compliance (ASC 606); (2) Access Control: role-based (RBAC) and attribute-based (ABAC) permission models, field-level encryption, audit logging of every data access, SOC 2 Type II compliance; (3) Collaboration: team hierarchies with delegated administration, real-time notifications with WebSocket delivery, audit trails with immutable event logs, time-series data retention policies; (4) Operations: comprehensive monitoring with distributed tracing (OpenTelemetry), automated scaling policies based on workload patterns, blue-green deployments for zero downtime, canary releases with automatic rollback. Proven infrastructure: sub-100ms p99 latency across global regions, 99.99% uptime SLA with automated failover, encryption at rest (AES-256) and in transit (TLS 1.3), DDoS mitigation with WAF rules. Payment integrations (Stripe, Adyen, Square) with PCI DSS compliance, identity federation (OIDC, SAML 2.0) with single sign-on, API rate limiting with token bucket algorithms. Case studies: HR platform managing 100K+ companies with 5M+ daily active users, project management tool serving enterprise Fortune 500, CRM system processing 2B+ transactions annually. Metrics: 45% average revenue expansion year-over-year, 92% net retention rate, <2 hour mean time to resolution for incidents.`,
                        tags: ["Multi-tenant", "RBAC/ABAC", "Billing Engine", "Usage Metering", "Revenue Recognition", "Zero-downtime", "Encryption", "99.99% SLA", "ASC 606", "Audit Logs"],
                    },
                    {
                        id: "PWA",
                        target: "PWA",
                        title: "Progressive Web Apps (PWA)",
                        body: `Next-generation Progressive Web Apps delivering native app experiences without friction or app store gatekeeping. Technical architecture: Service Worker with stale-while-revalidate caching strategy (assets served instantly from cache while background fetch updates), IndexedDB with 50MB+ local storage for complex data structures, background sync with exponential backoff retry logic for failed requests, push notifications via Web Push Protocol (VAPID keys, payload encryption). Performance optimization: code splitting with dynamic imports reducing initial bundle 65-75%, tree-shaking and minification for 40KB average JS payload, HTTP/2 Server Push for critical resources, image optimization with WebP with PNG fallback, lazy loading with Intersection Observer. Offline capability: full app functionality in airplane mode with automatic conflict resolution when connectivity returns, local-first architecture with eventual consistency model, network status detection with fallback UI indicators. Security: Content Security Policy headers preventing XSS/clickjacking, Subresource Integrity for CDN resources, secure context enforcement (HTTPS required), isolated Web Workers for CPU-intensive tasks. Installation & Distribution: Web App Manifest with app metadata, maskable icons for diverse OS display modes, custom themed splash screens, home screen shortcuts with deep linking, install prompts with engagement analytics. Business metrics: 45% higher mobile conversion vs. responsive sites, 80% data savings vs. native apps, 90%+ install rate for engaged users, 3x faster page loads vs. non-PWA, zero App Store review delays. Deployment: 500K+ daily active user footprint, logistics platforms with 24/7 operation in low-bandwidth environments, retail apps with offline checkout, financial services apps with secure local transaction queuing. Cross-browser compatibility verified (Chrome, Firefox, Safari, Edge), periodic lighthouse audits for performance score >90.`,
                        tags: ["Service Workers", "Offline-First", "IndexedDB", "Web Manifest", "Push API", "Background Sync", "Code Splitting", "PWA Install", "WebRTC", "Conflict Resolution"],
                    },
                    {
                        id: "CMS",
                        target: "CMS",
                        title: "Content Management & Publishing",
                        body: `Headless CMS architecture fully decoupling content management from delivery, enabling omnichannel publishing (web, mobile apps, email, social, IoT, voice assistants) from single content source. Content Modeling: flexible schema with custom field types (text, rich text, media, references, nested objects), versioning with full audit trail, draft/published lifecycle with scheduled publishing, content inheritance and templating for consistency. Editorial Workflows: multi-stage approval chains with role-based gatekeeping, editorial calendar with dependencies, collaborative editing with presence awareness, AI-assisted content suggestions and auto-corrections, bulk import/export with validation rules. Localization: built-in multi-language management with automatic translation APIs (Google Translate, DeepL), locale-specific variants, regional content scheduling, RTL language support. Asset Management: advanced image processing pipeline (auto-cropping, format detection, quality optimization), vector SVG support with optimization, video transcoding to HLS/DASH, responsive image generation with srcset variants, metadata extraction (EXIF, document text via OCR), CDN delivery with edge caching and automatic purge. SEO Toolkit: meta tag management with Open Graph/Twitter Card generation, XML sitemap automation with hreflang tags, structured data (Schema.org JSON-LD) generation and validation, canonical URL management, robots.txt rules per content type, search preview in editor. API Layer: GraphQL with query complexity analysis to prevent DoS, REST endpoints with content negotiation (JSON, XML, CSV), pagination with cursor-based offsets, real-time webhooks for content changes (with signing for verification), API versioning for backward compatibility. Performance: handle 1M+ monthly API requests with <100ms p99 latency, automatic caching layer (Redis) reducing origin load 85%, query optimization with database indexing strategies, database sharding for horizontal scale. Integrations: design system asset linking, analytics (GA, Mixpanel) for content performance, marketing automation (HubSpot, Marketo) for personalization, commerce platforms (Shopify, WooCommerce) for product data sync. Governance: content ownership with conflict prevention, retention policies with automatic deletion, data residency compliance (GDPR, CCPA), backup and disaster recovery with RTO <1 hour. Case studies: news organizations publishing 10K+ articles daily, enterprise product companies managing 5M+ SKUs, educational institutions distributing 100K+ learning modules. Metrics: 40% faster time-to-publish, 60% reduction in content governance overhead, 25% increase in content reuse across channels.`,
                        tags: ["Headless CMS", "GraphQL API", "Multi-language", "Visual Builder", "Workflows", "Asset Pipeline", "SEO Toolkit", "Webhooks", "Versioning", "Localization", "Image Optimization", "Governance"],
                    },
                    {
                        id: "ECOM",
                        target: "ECOM",
                        title: "E-commerce & Storefronts",
                        body: `High-conversion e-commerce platforms optimized for transactional excellence, operational efficiency, and customer lifetime value. Product Catalog: faceted search with Elasticsearch (millions of products queryable in <50ms), dynamic filtering by attributes/variants/price, personalized recommendations via collaborative filtering, real-time inventory sync preventing oversells (inventory reservation with TTL), product bundles and frequently-bought-together suggestions, reviews and ratings with moderation workflows, rich media with zoom/360°/video viewing. Shopping Cart: saved items and wishlists with sharing capabilities, estimated delivery dates based on inventory location, gift messaging, bulk purchasing discounts, abandoned cart recovery with automated email/SMS sequences (3-day recovery window, 20% ROI average), persistent cross-device cart state. Checkout: single-page progressive disclosure reducing friction, multiple payment options (credit cards, digital wallets, BNPL, cryptocurrency), recurring/subscription billing with proration, guest checkout with account creation upsell, address validation and auto-complete, fraud detection (3D Secure, AVS, CVV), tax calculation with nexus rules, real-time shipping quote integration. Payment Processing: PCI DSS Level 1 compliance with tokenization, multi-processor failover for 99.99% payment success, webhook reconciliation for settlement accuracy, fraud scoring with ML models identifying high-risk patterns, chargeback management with evidence uploading. Order Management: real-time order tracking with customer notifications, fulfillment orchestration across multiple warehouses, return/exchange workflows with RMA generation, order modification capability (pre-shipment changes), subscription management with pause/cancel workflows. Analytics & Insights: conversion funnel analysis with session replay for abandoned carts, cohort analysis tracking customer lifetime value, attribution modeling (first-click, last-click, multi-touch), product performance dashboards, A/B testing framework with statistical significance calculation. Performance: <2 second page load globally (LCP), sub-100ms product search, <100ms payment authorization, image optimization with responsive srcset, edge caching with stale-while-revalidate. Integrations: shipping carriers (FedEx, UPS, DHL) with label printing, ERP systems for inventory sync, accounting (QuickBooks, Xero) for revenue recognition, analytics (GA4, Mixpanel), customer support (Zendesk, Intercom). Compliance: GDPR personal data handling, CCPA opt-out mechanisms, PCI DSS certification, accessibility (WCAG 2.1 AA). Deployment: direct-to-consumer brands generating $50M+ annual revenue, B2B marketplaces with 100K+ sellers, subscription box services with predictable churn optimization. Business metrics: 35% average conversion rate increase vs. legacy systems, 12% revenue uplift from faster pages, 40% cart abandonment reduction, average order value uplift via recommendations.`,
                        tags: ["Product Catalog", "Faceted Search", "Inventory Management", "Smart Checkout", "Payment Integration", "Subscription Billing", "Fulfillment", "Analytics", "A/B Testing", "Personalization", "PCI Compliance", "Multi-warehouse", "Fraud Detection"],
                    },
                    {
                        id: "COLLAB",
                        target: "COLLAB",
                        title: "Collaboration & Productivity",
                        body: `Real-time collaboration platforms enabling distributed teams to achieve synchronous workflow across global time zones with sub-50ms synchronization latency. Synchronization Engine: Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs) for conflict-free simultaneous editing, vector clocks for causality tracking, compression algorithms for bandwidth efficiency, exponential backoff reconnection for network resilience. Real-time Editing: character-level presence awareness showing cursor positions and selections, rich text support with formatting preservation (bold, italic, lists, code blocks), infinite undo/redo with linear history, version history with timestamp and author attribution, branching for parallel editing workflows with merge strategies. Spatial Collaboration: shared workspaces with project hierarchies, team folders with inherited permissions, @mentions triggering notifications to specific users, threads for contextual discussion tethered to content, inline comments with resolution tracking, shared whiteboarding with infinite canvas. Communication: low-latency chat with message search and thread replies, voice/video calling via WebRTC with bandwidth adaptation, screen sharing with annotation tools, meet recording with automatic transcription (via speech-to-text), presence status (online/away/offline). Task Management: task boards (Kanban) with drag-and-drop, Gantt charts for timeline view, dependencies with critical path highlighting, resource allocation with capacity planning, time tracking with integrations, milestone management with burndown tracking. Permissions & Security: granular access control (view/edit/admin) at workspace/folder/document level, role-based access (owner/editor/viewer/commenter), external sharing with expiring links, permission inheritance with override capability, access audit logs, data encryption at rest (AES-256) and in transit (TLS 1.3), single sign-on (SAML 2.0, OIDC) with session management. Integrations: Slack notifications (real-time updates), calendar sync (Google Calendar, Outlook), email notifications with digest options, Zapier for custom workflows, webhook support for third-party automation, Git webhooks for code sync. Performance: sub-50ms synchronization p99 latency globally, handle 10,000+ concurrent users per workspace with auto-scaling, 99.9% uptime SLA, automatic cleanup of unused data with retention policies. Offline Mode: full editing capability in offline state with automatic sync when connectivity restored, conflict resolution with user-guided merge for conflicting edits. Deployment: distributed creative agencies with 500+ team members, software development teams using for specs and docs, consulting firms collaborating with clients, financial services for deal flows and analysis. Metrics: 4 hours/week time saved per user vs. email, 30% faster project completion, 85% reduction in meeting time needed for alignment.`,
                        tags: ["Real-time Sync", "WebRTC", "CRDT/OT", "Presence Awareness", "Conflict Resolution", "Global Infrastructure", "Video Calling", "Whiteboarding", "Permissions", "Task Management", "Encryption", "SSO", "Webhooks", "Offline Sync"],
                    },
                    {
                        id: "ANALYTICS",
                        target: "ANALYTICS",
                        title: "Analytics & Business Intelligence",
                        body: `Enterprise-grade analytics platforms transforming massive data volumes into real-time actionable intelligence for strategic decision-making. Data Ingestion: stream processing (Apache Kafka, AWS Kinesis) handling 100B+ events daily with sub-second latency, batch processing for historical data backfills, ETL pipelines with data quality checks and validation, schema evolution handling new fields gracefully, data deduplication and idempotency guarantees. Data Storage: columnar databases (ClickHouse, DuckDB) for analytical queries on terabytes of data, dimensional data modeling (star schema) for semantic clarity, partitioning strategies (time-series, geographic) for query performance, materialized views for common aggregations, automatic index management for optimal query plans. Query Layer: distributed query processing with sub-second response times for interactive exploration, drill-down capabilities from aggregate metrics to individual events, full-text search on text fields, geospatial queries on location data, time-series analysis with windowing functions. Dashboards & Visualization: interactive visualizations (time-series, bar charts, heatmaps, scatter plots, pie charts, gauges), cross-filtering across dashboard elements, drill-through to underlying row-level data, custom metric builders with formula support, conditional formatting and alerts, shared dashboards with row-level security. Analytics Features: cohort analysis tracking user segments over time, funnel analysis identifying drop-off points, retention curves showing user churn, attribution modeling (first-touch, last-touch, multi-touch, time-decay) connecting marketing touchpoints to outcomes, path analysis showing user journeys, session reconstruction from events. Predictive Analytics: forecasting with time-series models (ARIMA, Prophet), anomaly detection with statistical methods or ML, churn prediction enabling proactive retention, customer lifetime value calculation, propensity scoring for targeting. Reporting: scheduled reports (daily, weekly, monthly) with email delivery, templated report generation, data export (CSV, Excel, PDF), versioned reports with historical comparisons, access controls per report with audit trails. Data Governance: data lineage tracking (what feeds what), data quality monitoring (completeness, accuracy), retention policies with automatic purging, GDPR-compliant data deletion, PII masking in lower environments, backup and disaster recovery with RTO <1 hour. Integrations: data warehouses (Snowflake, BigQuery, Redshift) with federation, BI tools (Tableau, Looker, Power BI), data lakes (S3, ADLS), marketing platforms (HubSpot, Marketo) for campaign performance, product analytics (Amplitude, Mixpanel) for engagement metrics, payment processors (Stripe) for revenue data. Performance: 1M+ simultaneous dashboard viewers, sub-second query response for pre-aggregated metrics, automatic caching (Redis) of common queries, query optimizer handling complex joins, query cost estimation preventing runaway queries. Compliance: GDPR data residency in EU regions, CCPA data export/deletion requests, SOC 2 Type II audit logs, PII detection and masking, role-based access control with MFA, encryption at rest and in transit. Deployment: B2B SaaS platforms tracking product adoption and expansion, e-commerce monitoring conversion funnels and customer lifetime value, fintech firms tracking fraud indicators and regulatory metrics, healthcare tracking outcomes and operational efficiency. Business metrics: 50% faster decision-making with real-time dashboards, 25% increase in data-driven decisions, 15% revenue increase from predictive interventions, 40% reduction in data team inquiry backlog through self-service analytics.`,
                        tags: ["Stream Processing", "Real-time Dashboards", "Columnar Database", "Predictive Analytics", "Anomaly Detection", "Cohort Analysis", "Attribution Modeling", "Data Governance", "Row-level Security", "Data Lineage", "Drill-down", "Self-service BI", "Forecast", "Compliance"],
                    },
                ]}
            />

            {/* ===== WHY GREY (Futuristic Carousel) ===== */}
            <section
                className={`relative py-24 lg:py-48 px-6 overflow-hidden ${isDayTime ? 'bg-gradient-to-b from-white via-gray-50 to-white' : 'bg-gradient-to-b from-black via-gray-950 to-black'}`}>
                {/* Animated background elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Floating orbs */}
                    <motion.div
                        className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
                        style={{background: 'radial-gradient(circle, #2dd4bf, transparent)'}}
                        animate={{y: [0, 40, 0], x: [0, 20, 0]}}
                        transition={{duration: 8, repeat: Infinity}}
                    />
                    <motion.div
                        className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
                        style={{background: 'radial-gradient(circle, #0891b2, transparent)'}}
                        animate={{y: [0, -40, 0], x: [0, -20, 0]}}
                        transition={{duration: 10, repeat: Infinity}}
                    />
                </div>

                {/* Grid background */}
                <div className="absolute inset-0 pointer-events-none opacity-5">
                    <div className="gx-grid"/>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <FxReveal>
                        <div className="text-center mb-16">
                            {/* Futuristic badge */}
                            <motion.div 
                                className="inline-block mb-8"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.6}}
                            >
                                <div className={`relative group`}>
                                    <div className={`absolute inset-0 rounded-full blur-lg opacity-60 ${isDayTime ? 'bg-gradient-to-r from-teal-400 to-cyan-400' : 'bg-gradient-to-r from-teal-500 to-cyan-500'}`}/>
                                    <span className={`relative px-6 py-2.5 rounded-full text-xs lg:text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-md border ${isDayTime ? 'bg-teal-50/40 border-teal-200/60 text-teal-700' : 'bg-teal-950/40 border-teal-400/40 text-teal-200'}`}>
                                        ⚡ Why Choose Grey
                                    </span>
                                </div>
                            </motion.div>

                            {/* Futuristic title with gradient & effects */}
                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.8, delay: 0.1}}
                            >
                                <h2 className={`text-5xl lg:text-6xl xl:text-7xl font-[900] tracking-tight leading-[1.1] mb-6 ${isDayTime ? 'text-black' : 'text-white'}`}>
                                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDayTime ? 'from-teal-600 via-cyan-600 to-teal-600' : 'from-teal-300 via-cyan-300 to-teal-400'}`}>
                                        Engineering Excellence
                                    </span>
                                    <br/>
                                    <span className={`font-light ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>at Every Layer</span>
                                </h2>
                            </motion.div>

                            {/* Futuristic divider with animated line */}
                            <motion.div 
                                className="flex items-center justify-center gap-4 mb-8"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 0.8, delay: 0.2}}
                            >
                                <div className={`flex-1 h-px ${isDayTime ? 'bg-gradient-to-r from-transparent via-teal-400 to-transparent' : 'bg-gradient-to-r from-transparent via-teal-400 to-transparent'}`}/>
                                <div className={`w-2 h-2 rounded-full ${isDayTime ? 'bg-teal-500' : 'bg-teal-400'} animate-pulse`}/>
                                <div className={`flex-1 h-px ${isDayTime ? 'bg-gradient-to-r from-transparent via-teal-400 to-transparent' : 'bg-gradient-to-r from-transparent via-teal-400 to-transparent'}`}/>
                            </motion.div>

                            {/* Enhanced description */}
                            <motion.p 
                                className={`mt-8 text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto ${isDayTime ? 'text-gray-600' : 'text-gray-300'}`}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.8, delay: 0.3}}
                            >
                                Strategic partnerships backed by proven expertise, transformative results, and unwavering commitment to your success. We combine cutting-edge architecture, rigorous security practices, and relentless performance optimization to deliver outcomes that exceed expectations.
                            </motion.p>

                            {/* Futuristic accent elements */}
                            <div className="absolute top-10 left-10 w-32 h-32 opacity-20 pointer-events-none">
                                <div className={`absolute inset-0 rounded-full blur-3xl ${isDayTime ? 'bg-teal-300' : 'bg-teal-500'} animate-pulse`} style={{animationDuration: '4s'}}/>
                            </div>
                            <div className="absolute bottom-10 right-10 w-40 h-40 opacity-15 pointer-events-none">
                                <div className={`absolute inset-0 rounded-full blur-3xl ${isDayTime ? 'bg-cyan-300' : 'bg-cyan-500'} animate-pulse`} style={{animationDuration: '5s', animationDelay: '0.5s'}}/>
                            </div>
                        </div>
                    </FxReveal>

                    {/* Main carousel container */}
                    <div className="mt-16 relative">
                        <AnimatePresence mode="wait">
                            {reasons
                                .filter(reason => activeIndex === reason.id)
                                .map((reason) => (
                                    <motion.div
                                        key={reason.id}
                                        initial={{opacity: 0, y: 20, scale: 0.95}}
                                        animate={{opacity: 1, y: 0, scale: 1}}
                                        exit={{opacity: 0, y: -20, scale: 0.95}}
                                        transition={{duration: 0.6, ease: "easeOut"}}
                                        className="relative"
                                    >
                                        {/* Glow effect behind card */}
                                        <div
                                            className={`absolute -inset-1 rounded-2xl blur-2xl opacity-30 pointer-events-none ${activeIndex === 1 ? 'bg-gradient-to-r from-teal-500 to-cyan-500' : activeIndex === 2 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : activeIndex === 3 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-cyan-500 to-teal-500'}`}/>

                                        {/* Main card */}
                                        <div
                                            className={`relative backdrop-blur-xl rounded-2xl border p-8 lg:p-12 transition-all duration-500 ${isDayTime
                                                ? 'bg-white/40 border-white/60 shadow-2xl hover:shadow-3xl'
                                                : 'bg-gray-900/40 border-gray-800/60 shadow-2xl hover:shadow-3xl hover:shadow-cyan-500/20'}`}>

                                            {/* Icon accent */}
                                            <motion.div
                                                className={`inline-block mb-6 p-4 rounded-xl ${isDayTime ? 'bg-teal-100' : 'bg-teal-950'}`}
                                                animate={{y: [0, -8, 0]}}
                                                transition={{duration: 3, repeat: Infinity}}
                                            >
                                                <span className="text-3xl">
                                                    {activeIndex === 1 ? '⚙️' : activeIndex === 2 ? '🔒' : activeIndex === 3 ? '🤝' : '⭐'}
                                                </span>
                                            </motion.div>

                                            {/* Title with gradient */}
                                            <h3 className={`text-3xl lg:text-4xl font-bold mb-6 bg-clip-text ${isDayTime
                                                ? 'text-transparent bg-gradient-to-r from-teal-600 to-cyan-600'
                                                : 'text-transparent bg-gradient-to-r from-teal-400 to-cyan-300'}`}>
                                                {reason.title}
                                            </h3>

                                            {/* Description with enhanced typography */}
                                            <p className={`text-lg lg:text-lg leading-relaxed font-light mb-6 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                                                {reason.description}
                                            </p>

                                            {/* Deep dive section */}
                                            <div className={`p-4 rounded-lg mb-6 ${isDayTime ? 'bg-teal-50/40' : 'bg-teal-950/40'} border ${isDayTime ? 'border-teal-100/60' : 'border-teal-900/60'}`}>
                                                <p className={`text-sm leading-relaxed ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                                    {activeIndex === 1 ? 'Our engineering team brings 15+ years combined expertise in building scalable systems handling millions of concurrent users. We architect with security-first principles, implement comprehensive monitoring and observability, and maintain zero-downtime deployment practices. Every project includes architectural review, performance profiling, and continuous optimization cycles.' 
                                                    : activeIndex === 2 ? 'Security is embedded in our DNA. We implement defense-in-depth strategies: network layer (DDoS mitigation, WAF), application layer (input validation, CSRF protection), infrastructure (encryption at rest/transit), and access control (RBAC/ABAC, MFA). All systems undergo annual penetration testing and maintain SOC 2 Type II compliance with continuous audit logging.' 
                                                    : activeIndex === 3 ? 'Partnership is not transactional—it\'s transformational. We embed with your team, understand your business metrics, and align engineering decisions with revenue impact. Our methodology includes quarterly business reviews, roadmap co-planning, and dedicated account management ensuring alignment and visibility.' 
                                                    : 'We provide enterprise-grade support with 24/7/365 availability, sub-1 hour response times for critical issues, and a dedicated support engineer who understands your entire system. Our knowledge base and runbooks ensure continuity, and proactive monitoring catches issues before they impact users.'}
                                                </p>
                                            </div>

                                            {/* Metrics or details */}
                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                {activeIndex === 1 && [
                                                    {label: 'Projects Delivered', value: '120+'},
                                                    {label: 'Combined Experience', value: '8+ Years'},
                                                    {label: 'Technologies', value: '50+'},
                                                    {label: 'Client Retention', value: '95%'},
                                                ].map((m, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{opacity: 0}}
                                                        animate={{opacity: 1}}
                                                        transition={{delay: 0.3 + i * 0.1}}
                                                        className={`p-3 rounded-lg border ${isDayTime ? 'bg-white/30 border-white/40' : 'bg-gray-800/30 border-gray-700/40'}`}
                                                    >
                                                        <div
                                                            className={`text-xs font-semibold uppercase tracking-wider ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>{m.label}</div>
                                                        <div
                                                            className={`text-lg font-bold mt-1 ${isDayTime ? 'text-teal-700' : 'text-teal-300'}`}>{m.value}</div>
                                                    </motion.div>
                                                ))}
                                                {activeIndex === 2 && [
                                                    {label: 'Compliance', value: 'SOC 2 Type II'},
                                                    {label: 'Uptime SLA', value: '99.99%'},
                                                    {label: 'Encryption', value: 'AES-256 + TLS'},
                                                    {label: 'Incident Response', value: '<1hr'},
                                                ].map((m, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{opacity: 0}}
                                                        animate={{opacity: 1}}
                                                        transition={{delay: 0.3 + i * 0.1}}
                                                        className={`p-3 rounded-lg border ${isDayTime ? 'bg-white/30 border-white/40' : 'bg-gray-800/30 border-gray-700/40'}`}
                                                    >
                                                        <div
                                                            className={`text-xs font-semibold uppercase tracking-wider ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>{m.label}</div>
                                                        <div
                                                            className={`text-lg font-bold mt-1 ${isDayTime ? 'text-blue-700' : 'text-blue-300'}`}>{m.value}</div>
                                                    </motion.div>
                                                ))}
                                                {activeIndex === 3 && [
                                                    {label: 'Client Retention', value: '92%'},
                                                    {label: 'Multi-year Partnerships', value: '78%'},
                                                    {label: 'Net Promoter Score', value: '78+'},
                                                    {label: 'Revenue Growth', value: '45% avg'},
                                                ].map((m, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{opacity: 0}}
                                                        animate={{opacity: 1}}
                                                        transition={{delay: 0.3 + i * 0.1}}
                                                        className={`p-3 rounded-lg border ${isDayTime ? 'bg-white/30 border-white/40' : 'bg-gray-800/30 border-gray-700/40'}`}
                                                    >
                                                        <div
                                                            className={`text-xs font-semibold uppercase tracking-wider ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>{m.label}</div>
                                                        <div
                                                            className={`text-lg font-bold mt-1 ${isDayTime ? 'text-purple-700' : 'text-purple-300'}`}>{m.value}</div>
                                                    </motion.div>
                                                ))}
                                                {activeIndex === 4 && [
                                                    {label: 'Engineering Team', value: '15+ Engineers'},
                                                    {label: 'Response Time', value: '<1 hour'},
                                                    {label: '24/7 Support', value: 'Always On'},
                                                    {label: 'MTTR', value: '<30 min'},
                                                ].map((m, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{opacity: 0}}
                                                        animate={{opacity: 1}}
                                                        transition={{delay: 0.3 + i * 0.1}}
                                                        className={`p-3 rounded-lg border ${isDayTime ? 'bg-white/30 border-white/40' : 'bg-gray-800/30 border-gray-700/40'}`}
                                                    >
                                                        <div
                                                            className={`text-xs font-semibold uppercase tracking-wider ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>{m.label}</div>
                                                        <div
                                                            className={`text-lg font-bold mt-1 ${isDayTime ? 'text-teal-700' : 'text-teal-300'}`}>{m.value}</div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* CTA */}
                                            <motion.div
                                                className="mt-8"
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1}}
                                                transition={{delay: 0.4}}
                                            >
                                                <Link href="/contact">
                                                    <button
                                                        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${isDayTime
                                                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-teal-500/50'
                                                            : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-black hover:shadow-lg hover:shadow-teal-500/50'}`}>
                                                        Explore Our Expertise →
                                                    </button>
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                        </AnimatePresence>

                        {/* Navigation dots with enhanced styling */}
                        <motion.div
                            className="mt-12 flex justify-center gap-3"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.3}}
                        >
                            {reasons.map((r) => (
                                <motion.button
                                    key={r.id}
                                    onClick={() => setActiveIndex(r.id)}
                                    className={`relative transition-all duration-500 ${activeIndex === r.id ? 'w-10 h-3' : 'w-3 h-3'} rounded-full backdrop-blur-sm ${activeIndex === r.id
                                        ? isDayTime ? 'bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/50' : 'bg-gradient-to-r from-teal-400 to-cyan-300 shadow-lg shadow-teal-500/50'
                                        : isDayTime ? 'bg-gray-300 hover:bg-gray-400' : 'bg-gray-600 hover:bg-gray-500'}`}
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.95}}
                                    aria-label={`Navigate to reason ${r.id}`}
                                />
                            ))}
                        </motion.div>

                        {/* Progress indicator */}
                        <div className="mt-8 flex justify-center">
                            <div className={`text-sm font-semibold ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                <span
                                    className={isDayTime ? 'text-teal-600' : 'text-teal-400'}>{activeIndex}</span> / {reasons.length}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            

            {/* ===== OUR METHODOLOGY ===== */}
            <section className={`relative py-20 lg:py-32 ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <FxBackground day={isDayTime}/>
                <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    {/* Section Header */}
                    <div className="max-w-3xl mb-16">
                        <FxChip day={!isDayTime}>OUR METHODOLOGY</FxChip>
                        <FxReveal>
                            <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] tracking-tight mt-4 mb-6">
                                Our Web Application <span className="gx-gradient-text">Development Framework</span>
                            </h2>
                        </FxReveal>
                        <FxReveal delay={0.08}>
                            <p className={`text-[1em] lg:text-[1.1em] leading-[1.7] font-[300] ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>
                                A rigorous, agile process that transforms requirements into production-grade web applications. 
                                Every phase emphasizes scalability, security, and user experience. From conception to post-launch optimization, 
                                we maintain transparency and deliver measurable business outcomes. Our methodology has powered 200+ successful applications 
                                across SaaS, e-commerce, publishing, and enterprise domains.
                            </p>
                        </FxReveal>
                    </div>

                    {/* Process Steps Grid */}
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
                        {[
                            {
                                step: "01",
                                title: "Strategy & Requirements Analysis",
                                description: "Comprehensive discovery covering business goals, user research, competitive analysis, and technical feasibility. We define KPIs, create detailed user journeys, establish performance targets, and select optimal tech stacks. Deliverables: requirements specification, system architecture overview, project roadmap, and success metrics."
                            },
                            {
                                step: "02",
                                title: "Architecture & System Design",
                                description: "Design scalable microservices or monolithic architecture based on scale requirements. We create API contracts, database schemas, authentication/authorization frameworks, and CI/CD pipelines. Security architecture includes threat modeling and compliance planning (GDPR, SOC 2). Deliverable: detailed technical specifications and infrastructure diagrams."
                            },
                            {
                                step: "03",
                                title: "Development & Testing",
                                description: "Agile development in 2-week sprints with continuous integration and automated testing. Our team implements features with 90%+ code coverage, performance monitoring, and accessibility compliance (WCAG 2.1 AA). Regular demos and code reviews ensure quality. Security scanning and dependency management throughout development."
                            },
                            {
                                step: "04",
                                title: "Deployment, Monitoring & Optimization",
                                description: "Blue-green zero-downtime deployments with automated rollback capabilities. Real user monitoring (RUM) setup, performance profiling, and continuous optimization. 90-day post-launch support includes incident response, dependency updates, and feature iteration. Multi-year retainer programs cover maintenance, security, and strategic enhancements."
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

            {/* Web Application Solutions For Diverse Industries */}
            <div
                className={`lg:pt-[3em] md:pt-[2.5em] pt-[1.5em] lg:pb-[3em] md:pb-[2.5em] pb-[1.5em] relative overflow-hidden ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                {/* Animated background gradient */}
                <div
                    className={`absolute inset-0 ${isDayTime ? 'bg-gradient-to-br from-[#031E29]/30 via-transparent to-[#041f2d]/30' : 'bg-gradient-to-br from-[#f0f9ff]/50 via-transparent to-[#f3e8ff]/50'} pointer-events-none`}/>
                <div id={'industry-solutions'}
                     className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] z-10`}>

                    {/* Header with EXTREME Detail */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 border-b-2 lg:pb-[3em] md:pb-[3em] pb-[1em] mb-20 ${
                            isDayTime ? 'text-white border-[#0ef0dd]/30' : 'text-black border-[#0ef0dd]/20'
                        }`}>
                        <div className='animate-fade-in'>
                            <h2 className={`capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[800] tracking-tight leading-[1.2] lg:pb-6 text-shadow-lg`}>
                                <span className={`text-[#0ef0dd] drop-shadow-lg`}>Purpose-Built Web Apps</span> <br
                                className={'lg:block md:block hidden'}/>Engineered for <span
                                className={`text-[#06b6d4] drop-shadow-lg`}>Industry-Specific Excellence</span>
                            </h2>
                            <p className={`text-[0.9em] font-[400] leading-[1.7] mb-4 ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>
                                Transforming business operations with intelligent web solutions tailored to unique sector challenges and regulatory requirements
                            </p>
                            <div className={`flex gap-2 mt-5 flex-wrap`}>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#0ef0dd]/60 bg-[#0ef0dd]/20 text-[#0ef0dd]' : 'border-[#0ef0dd]/40 bg-[#0ef0dd]/15 text-[#0ef0dd]'}`}>🏭 Multi-Industry</span>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#06b6d4]/60 bg-[#06b6d4]/20 text-[#06b6d4]' : 'border-[#06b6d4]/40 bg-[#06b6d4]/15 text-[#06b6d4]'}`}> - Compliant</span>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#7c3aed]/60 bg-[#7c3aed]/20 text-[#7c3aed]' : 'border-[#7c3aed]/40 bg-[#7c3aed]/15 text-[#7c3aed]'}`}>✅ Domain-Focused</span>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#f59e0b]/60 bg-[#f59e0b]/20 text-[#f59e0b]' : 'border-[#f59e0b]/40 bg-[#f59e0b]/15 text-[#f59e0b]'}`}>⚡ Real-Time</span>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#10b981]/60 bg-[#10b981]/20 text-[#10b981]' : 'border-[#10b981]/40 bg-[#10b981]/15 text-[#10b981]'}`}>🔐 Secure</span>
                            </div>
                        </div>
                        <div className='animate-fade-in-delayed'>
                            <p className={`text-[0.92em] font-[400] lg:-mt-[0.2em] rounded-lg leading-[1.85] mb-5 p-5 ${isDayTime ? 'bg-[#0ef0dd]/5 border border-[#0ef0dd]/20' : 'bg-[#0ef0dd]/5 border border-[#0ef0dd]/20'}`}>
                                Our purpose-built web applications represent the pinnacle of modern web engineering, meticulously customized to address the most demanding operational challenges across healthcare, financial services, real estate, logistics, retail, manufacturing, media & entertainment, education, hospitality, and government sectors. We architect solutions that seamlessly navigate complex regulatory frameworks (HIPAA, PCI-DSS, GDPR, SOX, FDA), optimize mission-critical workflows, and overcome sector-specific challenges with surgical precision. Our web platforms consistently deliver transformative business outcomes through intelligent automation, enterprise-grade security, real-time data synchronization, and scalable cloud infrastructure supporting millions of concurrent users globally.
                            </p>
                            <div className={`grid grid-cols-2 gap-4 mb-5`}>
                                <div
                                    className={`p-4 rounded-xl border-l-4 transition-all hover:shadow-lg ${isDayTime ? 'border-[#0ef0dd]/80 bg-gradient-to-br from-[#0ef0dd]/15 to-[#0ef0dd]/5' : 'border-[#0ef0dd]/60 bg-gradient-to-br from-[#0ef0dd]/20 to-[#0ef0dd]/10'}`}>
                                    <p className={`text-[0.8em] font-[800] ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'}`}>200+</p>
                                    <p className={`text-[0.75em] font-[600] ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Applications Deployed</p>
                                </div>
                                <div
                                    className={`p-4 rounded-xl border-l-4 transition-all hover:shadow-lg ${isDayTime ? 'border-[#06b6d4]/80 bg-gradient-to-br from-[#06b6d4]/15 to-[#06b6d4]/5' : 'border-[#06b6d4]/60 bg-gradient-to-br from-[#06b6d4]/20 to-[#06b6d4]/10'}`}>
                                    <p className={`text-[0.8em] font-[800] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>18+</p>
                                    <p className={`text-[0.75em] font-[600] ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Industries Served</p>
                                </div>
                                <div
                                    className={`p-4 rounded-xl border-l-4 transition-all hover:shadow-lg ${isDayTime ? 'border-[#7c3aed]/80 bg-gradient-to-br from-[#7c3aed]/15 to-[#7c3aed]/5' : 'border-[#7c3aed]/60 bg-gradient-to-br from-[#7c3aed]/20 to-[#7c3aed]/10'}`}>
                                    <p className={`text-[0.8em] font-[800] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#7c3aed]'}`}>$1.5B+</p>
                                    <p className={`text-[0.75em] font-[600] ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Transaction Value</p>
                                </div>
                                <div
                                    className={`p-4 rounded-xl border-l-4 transition-all hover:shadow-lg ${isDayTime ? 'border-[#f59e0b]/80 bg-gradient-to-br from-[#f59e0b]/15 to-[#f59e0b]/5' : 'border-[#f59e0b]/60 bg-gradient-to-br from-[#f59e0b]/20 to-[#f59e0b]/10'}`}>
                                    <p className={`text-[0.8em] font-[800] ${isDayTime ? 'text-[#f59e0b]' : 'text-[#f59e0b]'}`}>99.97%</p>
                                    <p className={`text-[0.75em] font-[600] ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Uptime SLA</p>
                                </div>
                            </div>
                            <div
                                className={`p-5 rounded-xl border-l-4 ${isDayTime ? 'border-[#0ef0dd] bg-gradient-to-r from-[#0ef0dd]/10 to-transparent' : 'border-[#0ef0dd]/50 bg-gradient-to-r from-[#0ef0dd]/15 to-transparent'}`}>
                                <p className={`text-[0.85em] font-[600] leading-[1.8] ${isDayTime ? 'text-gray-200' : 'text-gray-800'}`}>
                                    🏆 <strong>Proven Excellence:</strong> 200+ successful web application deployments across 18+ industries with $1.5B+ in managed transaction value, 99.97% uptime SLA, and average 18-month ROI achievement ensuring measurable competitive advantage
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Accordion Tabs with Enhanced Styling */}
                    <div className={`flex max-w-full mx-auto gap-[2px] ${isDesktop ? "flex-row h-[600px]" : "flex-col h-auto"}`}>
                        {(() => {
                            // pull the industries data into a reusable array for the accordion
                            const industries = [
                                { number: '01', title: 'Healthcare & Life Sciences', heading: 'Patient-Centric Digital Ecosystems', description: 'Build HIPAA-compliant, patient engagement platforms with integrated telemedicine, EHR interoperability, appointment scheduling, secure messaging, and AI-powered diagnostics. Our architectures support real-time clinical workflows, multi-facility coordination, and advanced analytics for population health management.', capabilities: [ {icon: '🏥', title: 'HIPAA & HITRUST Compliance', desc: 'End-to-end encryption, audit trails, role-based access control, and data residency compliance'}, {icon: '📱', title: 'Patient Engagement Portal', desc: 'Mobile-first design with appointment booking, prescription refills, secure messaging, and health records access'}, {icon: '🔬', title: 'Clinical Integration Layer', desc: 'HL7/FHIR standards, EHR interoperability, lab system connectors, pharmacy integration'}, {icon: '📊', title: 'Predictive Analytics', desc: 'ML models for readmission risk, treatment optimization, population segmentation'} ] },
                                { number: '02', title: 'Financial Services & Fintech', heading: 'Secure, Compliant Payment Ecosystems', description: 'Engineering robust banking, lending, and investment platforms with real-time settlement, multi-currency support, KYC/AML automation, and advanced fraud detection. Our solutions support PCI-DSS Level 1 compliance, regulatory reporting (MiFID II, Dodd-Frank), and seamless API integrations with core banking systems.', capabilities: [ {icon: '🏦', title: 'PCI-DSS Level 1 Compliance', desc: '3DSecure, tokenization, encrypted payment processing, comprehensive audit trails'}, {icon: '💳', title: 'Multi-Channel Payments', desc: 'Card processing, wallet integrations, wire transfers, SWIFT, ACH, blockchain settlement'}, {icon: '🔍', title: 'KYC/AML & Fraud Prevention', desc: 'Real-time identity verification, sanctions screening, behavioral analysis, anomaly detection'}, {icon: '📈', title: 'Portfolio & Risk Analytics', desc: 'Real-time VaR calculations, stress testing, regulatory reporting, multi-asset trading'} ] },
                                { number: '03', title: 'Real Estate & Property Management', heading: 'Intelligent Property Platforms', description: 'Transform real estate operations with comprehensive property management, tenant portals, maintenance scheduling, rent collection automation, and market analytics. Our platforms integrate IoT sensors, smart building automation, dynamic pricing engines, and investment analysis dashboards.', capabilities: [ {icon: '🏢', title: 'Property Management Suite', desc: 'Multi-property control, tenant communication, lease management, document storage'}, {icon: '🔧', title: 'Maintenance & Operations', desc: 'Predictive maintenance, work order automation, contractor management, asset tracking'}, {icon: '💰', title: 'Rent & Financial Management', desc: 'Automated rent collection, late payment notifications, expense tracking, profitability analysis'}, {icon: '📍', title: 'Market Intelligence & Valuations', desc: 'Comparable property analysis, price forecasting, neighborhood insights, investment ROI modeling'} ] },
                                { number: '04', title: 'E-Commerce & Retail', heading: 'Omnichannel Commerce Platforms', description: 'Build high-performance e-commerce and retail solutions with unified inventory, dynamic pricing, personalization engines, and seamless POS integration. Our platforms scale to billions of transactions annually with real-time recommendations, social commerce integration, and advanced fulfillment automation.', capabilities: [ {icon: '🛍️', title: 'Unified Commerce', desc: 'Omnichannel inventory, seamless checkout, subscription management, loyalty programs'}, {icon: '🤖', title: 'AI Personalization & Recommendations', desc: 'ML-driven product recommendations, dynamic content, A/B testing, behavioral targeting'}, {icon: '📦', title: 'Fulfillment Automation', desc: 'Real-time order routing, warehouse management, last-mile tracking, returns processing'}, {icon: '💳', title: 'Payment & Risk Management', desc: '200+ payment gateways, fraud detection, chargeback prevention, currency conversion'} ] },
                                { number: '05', title: 'Logistics & Supply Chain', heading: 'End-to-End Supply Chain Visibility', description: 'Create intelligent logistics platforms with real-time fleet tracking, route optimization, predictive maintenance, and supply chain visibility. Our solutions integrate IoT telematics, blockchain verification, demand forecasting, and multi-modal transportation coordination.', capabilities: [ {icon: '🚚', title: 'Fleet Management & Tracking', desc: 'Real-time GPS tracking, fuel optimization, driver behavior monitoring, maintenance alerts'}, {icon: '📍', title: 'Route Optimization Engine', desc: 'ML-powered route planning, traffic prediction, delivery time accuracy, cost minimization'}, {icon: '📦', title: 'Warehouse & Inventory Control', desc: 'RFID integration, automated picking, barcode scanning, predictive stocking, network optimization'}, {icon: '⛓️', title: 'Supply Chain Transparency', desc: 'Blockchain tracking, supplier collaboration, quality assurance, regulatory documentation'} ] },
                                { number: '06', title: 'Manufacturing & Industry 4.0', heading: 'Intelligent Manufacturing Operations', description: 'Engineer advanced manufacturing platforms with predictive maintenance, production optimization, quality control automation, and IoT integration. Our solutions leverage digital twins, AI-powered defect detection, real-time shop floor control, and supply chain coordination.', capabilities: [ {icon: '🏭', title: 'MES & Shop Floor Control', desc: 'Real-time production tracking, worker assignment, quality control, downtime reduction'}, {icon: '🔧', title: 'Predictive Maintenance', desc: 'Sensor data analytics, equipment health monitoring, failure prediction, optimal maintenance scheduling'}, {icon: '🤖', title: 'Quality & Defect Detection', desc: 'Computer vision inspection, SPC charts, defect root cause analysis, continuous improvement'}, {icon: '⛓️', title: 'Supply Chain & Demand Planning', desc: 'Demand forecasting, inventory optimization, supplier coordination, procurement automation'} ] },
                                { number: '07', title: 'Media & Entertainment', heading: 'Content Delivery & Engagement Platforms', description: 'Build powerful media platforms with video streaming, content management, monetization engines, and audience analytics. Our solutions support adaptive bitrate streaming, multi-format delivery, rights management, recommendation systems, and audience engagement tools.', capabilities: [ {icon: '📺', title: 'Video Streaming Infrastructure', desc: 'HLS/DASH adaptive streaming, CDN optimization, 4K/HDR support, offline download capability'}, {icon: '📝', title: 'Content Management System', desc: 'Metadata management, multi-language support, scheduling, publishing workflows, rights tracking'}, {icon: '💰', title: 'Monetization & Analytics', desc: 'Subscription management, ad insertion, pay-per-view, audience analytics, revenue optimization'}, {icon: '👥', title: 'Audience Engagement', desc: 'Social integration, recommendation engine, interactive experiences, live chat & engagement tools'} ] },
                                { number: '08', title: 'Education & E-Learning', heading: 'Intelligent Learning Platforms', description: 'Create comprehensive education technology platforms with course management, adaptive learning, student progress tracking, and institutional analytics. Our solutions support virtual classrooms, AI tutoring, assessment automation, certification management, and institutional integration.', capabilities: [ {icon: '📚', title: 'Learning Management System', desc: 'Course authoring, assignment submission, grading automation, progress tracking, certification'}, {icon: '🎓', title: 'Adaptive Learning Engine', desc: 'Personalized learning paths, AI-powered tutoring, knowledge gap analysis, content recommendation'}, {icon: '🎥', title: 'Virtual Classroom Technology', desc: 'Live streaming, screen sharing, whiteboarding, recording, interactive engagement tools'}, {icon: '📊', title: 'Analytics & Outcomes Tracking', desc: 'Student performance analytics, cohort analysis, retention prediction, institutional effectiveness metrics'} ] },
                                { number: '09', title: 'Hospitality & Tourism', heading: 'Guest-Centric Hospitality Platforms', description: 'Engineer guest experience platforms with reservation management, property control, revenue optimization, and guest engagement. Our solutions integrate smart room technology, dynamic pricing, loyalty programs, and comprehensive property analytics.', capabilities: [ {icon: '🏨', title: 'Booking & Reservation Engine', desc: 'Multi-property availability, dynamic pricing, channel management, corporate contracts, OTA integration'}, {icon: '🔑', title: 'Smart Room & Property Control', desc: 'IoT-enabled rooms, mobile check-in, keyless entry, room automation, energy optimization'}, {icon: '💰', title: 'Revenue Management System', desc: 'Demand forecasting, rate optimization, length-of-stay recommendations, revenue maximization'}, {icon: '👥', title: 'Guest Experience & Loyalty', desc: 'Guest profiles, personalization, loyalty programs, feedback collection, satisfaction metrics'} ] },
                                { number: '10', title: 'Government & Public Sector', heading: 'Secure Citizen Services Platforms', description: 'Build secure government and public sector platforms with citizen portals, benefit management, license processing, and compliance reporting. Our solutions ensure SOC 2 Type II compliance, accessibility standards, multi-language support, and secure data handling.', capabilities: [ {icon: '🏛️', title: 'Citizen Portals & Self-Service', desc: 'License renewal, benefit applications, document submission, payment processing, status tracking'}, {icon: '🔐', title: 'Security & Compliance', desc: 'FedRAMP certification, SOC 2 Type II, WCAG accessibility, multi-factor authentication, data residency'}, {icon: '📋', title: 'Case & License Management', desc: 'Automated workflows, document management, approval routing, archival, compliance reporting'}, {icon: '📊', title: 'Public Sector Analytics', desc: 'Service usage analytics, performance metrics, outcome measurement, budget optimization'} ] },
                            ];

                            return industries.map((step, idx) => {
                                const isActive = idx === activeAcc;
                                return (
                                    <div
                                        key={idx}
                                        className={`transition-all duration-700 ease-in-out flex flex-col bg-gradient-to-br ${isDayTime ? 'from-[#031E29] via-[#041f2d] to-[#0a2d3a]' : 'from-[#f8fafb] via-[#f0f3f7] to-[#e8ecf1]'} border-2 ${isDayTime ? 'border-[#0E3B46]' : 'border-[#d1e7f1]'} rounded-xl overflow-hidden transition-all shadow-xl hover:shadow-2xl relative ${
                                            isActive ? isDayTime ? 'hover:border-[#0ef0dd]/80' : 'hover:border-[#0ef0dd]/60' : isDayTime ? 'hover:border-[#0ef0dd]/40' : 'hover:border-[#06b6d4]/40'
                                        } ${
                                            isDesktop ? "mx-[0.15em]" : "mb-4"
                                        }`}
                                        style={{
                                            width: isDesktop
                                                ? isActive
                                                    ? '100%'
                                                    : '70px'
                                                : '100%'
                                        }}
                                    >
                                        {/* Inactive Panel - Compact */}
                                        {!isActive && (
                                            <div
                                                onClick={() => setActiveAcc(idx)}
                                                className={`flex cursor-pointer group ${isDayTime ? 'hover:bg-[#0E3B46]/50' : 'hover:bg-[#0ef0dd]/8'} transition-all duration-300 ${
                                                    isDesktop
                                                        ? "flex-col items-center justify-center h-full pt-6 px-3"
                                                        : "flex-row items-center p-6"
                                                }`}>
                                                <div className={`${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'} text-[2.2em] font-[800] group-hover:scale-125 transition-transform duration-300`}>
                                                    {step.number}
                                                </div>

                                                <div className={`${isDesktop ? 'flex items-center justify-center h-full flex-col' : 'items-center w-full '} `}>
                                                    <span className={`text-[0.8em] font-[700] tracking-wider uppercase ${isDayTime ? 'text-gray-500 group-hover:text-[#0ef0dd]' : 'text-gray-700 group-hover:text-[#0ef0dd]'} transition-all duration-300 ${
                                                        isDesktop ? "mt-6 text-center" : "ml-4 text-left"
                                                    }`}
                                                        style={
                                                            isDesktop
                                                                ? {
                                                                    writingMode: "vertical-rl",
                                                                    transform: "rotate(180deg)",
                                                                }
                                                                : {}
                                                        }
                                                    >
                                                        {step.title}
                                                    </span>
                                                </div>
                                                <div className={`text-[0.65em] mt-2 font-[600] ${isDayTime ? 'text-gray-600 group-hover:text-gray-400' : 'text-gray-500 group-hover:text-gray-700'} transition-all duration-300`}>
                                                    {isDesktop ? '↑' : '→'}
                                                </div>
                                            </div>
                                        )}

                                        {/* Active Panel - EXTREMELY DETAILED & COMPREHENSIVE */}
                                        {isActive && (
                                            <div
                                                className={`flex ${
                                                    isDesktop
                                                        ? "flex-row"
                                                        : "flex-col"
                                                } flex-1 cursor-pointer transition-all duration-500`}
                                                onClick={() => setActiveAcc(idx)}
                                            >
                                                <div
                                                    className={`${
                                                        isDesktop
                                                            ? 'w-28 flex flex-col items-center justify-start pt-8 border-r px-4'
                                                            : 'flex-row items-center p-6 border-b'
                                                    } ${isDayTime ? 'border-[#0E3B46]/70 bg-gradient-to-b from-[#0E3B46]/60 to-[#0E3B46]/20' : 'border-[#d1e7f1] bg-gradient-to-b from-[#f0f9ff] to-[#e8ecf1]'}`}
                                                >
                                                    <div className={`${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'} text-[2.5em] font-[800] drop-shadow-lg`}>
                                                        {step.number}
                                                    </div>

                                                    <span className={`text-[0.8em] font-[800] tracking-wider uppercase ${isDayTime ? 'text-gray-300' : 'text-gray-800'} ${
                                                        isDesktop ? 'mt-10 text-center' : 'ml-4'
                                                    }`}
                                                        style={
                                                            isDesktop
                                                                ? {
                                                                    writingMode: "vertical-rl",
                                                                    transform: "rotate(180deg)",
                                                                }
                                                                : {}
                                                        }
                                                    >
                                                        {step.title}
                                                    </span>
                                                </div>

                                                {/* Right content - EXTREMELY DETAILED & COMPREHENSIVE */}
                                                <div
                                                    className={`flex-1 mx-0 relative overflow-y-auto transition-all duration-500 ease-in-out ${
                                                        isDesktop
                                                            ? "max-h-[600px]"
                                                            : isActive
                                                                ? "max-h-[4000px]"
                                                                : "max-h-0"
                                                    }`}>
                                                    <div
                                                        className={`h-full border-l-2 ${isDayTime ? 'border-[#0E3B46]/70' : 'border-[#d1e7f1]'} px-8 md:px-12 py-8 flex flex-col justify-start transform transition-all duration-500 ease-in-out bg-gradient-to-br ${isDayTime ? 'from-[#041f2d]/50 to-transparent' : 'from-white/50 to-transparent'} ${
                                                            isActive
                                                                ? "opacity-100 translate-y-0"
                                                                : "opacity-0 -translate-y-4"
                                                        }`}>

                                                        {/* Main Heading with Badge */}
                                                        <div className='flex items-start justify-between mb-4 gap-4'>
                                                            <h2 className={`text-2xl md:text-4xl font-[900] ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'} leading-tight max-w-4xl drop-shadow-lg`}>
                                                                {step.heading}
                                                            </h2>
                                                            <span className={`text-[0.7em] px-3.5 py-1.5 rounded-full font-[700] whitespace-nowrap ml-3 ${isDayTime ? 'bg-gradient-to-r from-[#0ef0dd]/30 to-[#06b6d4]/20 text-[#0ef0dd] border border-[#0ef0dd]/50' : 'bg-gradient-to-r from-[#0ef0dd]/25 to-[#06b6d4]/15 text-[#0ef0dd] border border-[#0ef0dd]/40'}`}>
                                                                {['⭐ Enterprise', '📈 Scalable', '🧠 Intelligent', '✅ Compliant'][idx] || '🚀 Advanced'}
                                                            </span>
                                                        </div>

                                                        {/* Subheading */}
                                                        <p className={`text-[1em] font-[700] mb-3 ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0284c7]'} tracking-wide`}>
                                                            🎯 Comprehensive web solution for industry-specific challenges
                                                        </p>
                                                        <div className={`w-16 h-1.5 rounded-full mb-7 ${isDayTime ? 'bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#7c3aed]' : 'bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#7c3aed]'} shadow-lg`}/>

                                                        {/* Main Comprehensive Description */}
                                                        <p className={`text-[0.95em] leading-[1.95] mb-8 ${isDayTime ? 'text-gray-200' : 'text-gray-800'} text-justify font-[500]`}>
                                                            {step.description}
                                                        </p>

                                                        {/* Advanced Capabilities Grid - 4 Columns */}
                                                        <div className='mb-8'>
                                                            <h3 className={`text-[1em] font-[800] mb-5 ${isDayTime ? 'text-gray-100' : 'text-gray-900'} uppercase tracking-wider drop-shadow-md`}>⚙️ Core Capabilities & Features</h3>
                                                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-2xl border-2 ${isDayTime ? 'bg-[#0E3B46]/30 border-[#0E3B46]/60' : 'bg-gradient-to-br from-[#f0f9ff]/80 to-[#e0f7ff]/60 border-[#bae6fd]/70'} backdrop-blur-sm`}>
                                                                {step.capabilities.map((c,i) => (
                                                                    <div key={i} className={`flex gap-4 p-4 rounded-xl transition-all hover:scale-105 ${isDayTime ? 'bg-[#0E3B46]/20 text-gray-200' : 'bg-white/50 text-gray-900'}`}>
                                                                        <span className={`text-2xl font-[800] flex-shrink-0`}>{c.icon}</span>
                                                                        <div>
                                                                            <p className='font-[800] text-[0.98em] mb-2'>{c.title}</p>
                                                                            <p className={`text-[0.85em] leading-[1.7] font-[500] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>{c.desc}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className='mt-auto'>
                                                            <Link href="/contact" className={`inline-block px-6 py-3 rounded-lg font-[700] text-[0.95em] transition-all duration-300 ${isDayTime ? 'bg-gradient-to-r from-[#0ef0dd]/30 to-[#06b6d4]/20 text-[#0ef0dd] hover:from-[#0ef0dd]/50 hover:to-[#06b6d4]/30 border border-[#0ef0dd]/50' : 'bg-gradient-to-r from-[#0ef0dd]/25 to-[#06b6d4]/15 text-[#0ef0dd] hover:from-[#0ef0dd]/40 hover:to-[#06b6d4]/25 border border-[#0ef0dd]/40'}`}>
                                                                Explore Solution →
                                                            </Link>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            });
                        })()}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WebApplication;
