'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css';
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import Link from "next/link";
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
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
    FxOrbit
} from '@/components/futuristic/fx';

const AiDevelopmentServices = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);

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

                if (top < windowHeight * -0.2 || bottom < windowHeight * -0.1) {
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
            "CACA",
            "BPA",
            "ACIS",
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
        {label: 'Products Launched', value: 20, suffix: '+'},
        {label: 'Successful rebrands', value: 27, suffix: '+'},
        {label: 'Increase in Website Traffic', value: 350, suffix: '%'},
    ];

    // Reasons
    const reasons = [
        {
            id: 1,
            title: 'Creative Innovation',
            description: (
                <>
                    Innovation drives everything we do at Grey InfoTech. Whether it’s integrating the latest
                    technologies, enhancing user experiences, or building robust, scalable backends, we’re always
                    looking for smarter, more effective ways to give your business a competitive edge. Our team combines
                    creative thinking with technical expertise to develop solutions that not only look great and
                    function flawlessly but also help you achieve measurable business results in a rapidly evolving
                    digital landscape.
                </>
            ),
            images: ['/assets/ads/inn.jpg']
        },
        {
            id: 2,
            title: 'Experienced Team',
            description: (
                <>
                    Our strength lies in the depth and diversity of our team. Since 2018, we’ve brought together a
                    powerhouse of seasoned developers, UI/UX designers, project managers, and industry consultants with
                    hands-on experience across sectors including fintech, logistics, healthcare, education, and
                    e-commerce. This rich blend of cross-industry expertise allows us to grasp complex business
                    challenges quickly and craft high-performance applications that are strategically aligned with your
                    goals. Our team’s ability to adapt and innovate ensures that we deliver tailored solutions that not
                    only meet technical requirements but also drive measurable business outcomes.
                </>
            ),
            images: ['/assets/ads/exp.jpg']
        },
        {
            id: 3,
            title: 'Customer Service',
            description: (
                <>
                    From day one, you’ll experience a service culture grounded in professionalism, responsiveness, and
                    transparency. At Grey InfoTech, we prioritize clear and consistent communication, keeping you
                    informed at every stage of the development process. Our team is committed to staying on schedule,
                    proactively managing expectations, and addressing challenges before they become issues -ensuring a
                    seamless, collaborative, and stress-free experience from concept to launch.
                </>
            ),
            images: ['/assets/ads/cust.jpg']
        },
        {
            id: 4,
            title: 'Scalability Of Services',
            description: (
                <>
                    As your business expands, your software requirements evolve too. At Grey InfoTech, we provide
                    flexible and scalable solutions tailored to every stage -from Minimum Viable Products (MVPs) for
                    startups to robust, enterprise-grade systems. Our modular development approach allows your
                    applications to grow seamlessly with your organization, minimizing costly rebuilds and enabling
                    efficient enhancements that keep pace with your changing needs.
                </>
            ),
            images: ['/assets/ads/scal.jpg']
        },
        {
            id: 5,
            title: 'Proactive, Client Facing',
            description: (
                <>
                    We go beyond simply executing tasks - we become your strategic partner. By taking a proactive
                    approach, we anticipate your needs, recommend improvements, and offer valuable insights throughout
                    the development journey. With Grey InfoTech, you’re not just hiring a vendor; you’re gaining a
                    dedicated technology partner fully invested in driving your success.
                </>
            ),
            images: ['/assets/ads/pro.jpg']
        },
    ];

    // Why Grey infoTech For Your App Project Hook
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex % reasons.length) + 1);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [reasons.length]);

    const [webIndex, setWebIndex] = useState<number | null>(0);
    const toggleWeb = (index: number) => {
        setWebIndex(webIndex === index ? null : index);
    };

    const capabilityCards = [
        {
            title: 'Platforms & Models',
            eyebrow: 'Core stack',
            summary: 'Enterprise-grade model selection & platform architecture balanced for latency, cost and governance.',
            body: 'We conduct comprehensive evaluation of foundational models (OpenAI, Anthropic, Vertex, open-source alternatives) across cost-performance matrices. Our architecture implements intelligent routing, hybrid hosting strategies, and multi-model fallback mechanisms to ensure production stability, predictable economics, and vendor-agnostic resilience. We design platform abstractions that allow seamless model swaps, enabling rapid iteration and cost optimization without application-layer changes. Our frameworks provide deterministic latency bounds, throughput guarantees, and automated cost tracking with real-time spend visibility.',
            metrics: ['OpenAI', 'Anthropic', 'Vertex', 'Llama', 'Mistral'],
            points: ['Hybrid hosting', 'Fallback routing', 'Cost optimization', 'Vendor independence'],
            highlights: [{label: 'Latency', value: '40ms P95'}, {
                label: 'Throughput',
                value: '100k+ req/s'
            }, {label: 'Uptime', value: '99.95% SLA'}],
            details: [
                'Comprehensive model benchmarking framework across performance, cost, and accuracy dimensions',
                'Multi-provider orchestration with intelligent request routing and circuit breaking',
                'Predictive cost modeling and budget guardrails with spend anomaly detection',
                'Platform abstraction layer enabling zero-downtime model migrations'
            ]
        },
        {
            title: 'MLOps & Model Lifecycle',
            eyebrow: 'Production readiness',
            summary: 'Reproducible training pipelines, governance registries, and zero-downtime deployment strategies.',
            body: 'We architect comprehensive MLOps ecosystems with fully reproducible training pipelines instrumented with end-to-end artifact lineage and experiment provenance. Our model governance frameworks include automated validation, rigorous testing gates, and auditable decision logs. We implement sophisticated deployment patterns (canary releases, blue-green, progressive rollouts) with automated performance monitoring and intelligent rollback triggers. Model versioning systems provide complete observability, enabling rapid diagnosis of performance degradation and seamless A/B testing frameworks.',
            metrics: ['CI/CD Pipelines', 'Model Registry', 'Automated Testing', 'Canary Releases'],
            points: ['Reproducible runs', 'Lineage tracking', 'Zero-downtime deploys', 'Automated rollbacks'],
            highlights: [{label: 'Reproducibility', value: '100% experiment tracking'}, {
                label: 'Safety',
                value: 'Automated rollback'
            }, {label: 'Release cadence', value: 'Hourly capable'}],
            details: [
                'Containerized training pipelines with dependency management and artifact versioning',
                'Centralized model registry with rich metadata, performance metrics, and approval workflows',
                'Canary & progressive deployment orchestration with automated performance comparison',
                'Comprehensive rollback strategies with state synchronization and cache invalidation'
            ]
        },
        {
            title: 'Data & Feature Stores',
            eyebrow: 'Reliable inputs',
            summary: 'Feature engineering platforms, validation gates, and drift detection for consistent model inputs.',
            body: 'We design and operate sophisticated feature engineering platforms with real-time and batch processing capabilities. Our systems enforce strict data contracts, implement schema governance, and maintain feature point-in-time snapshots for complete reproducibility. We embed continuous data quality validation, automated PII detection, and schema evolution management throughout the pipeline. Drift detection systems monitor feature distributions, data quality metrics, and input/output skew with adaptive thresholds and automated alerting for performance anomalies.',
            metrics: ['Feature Store', 'Stream ETL', 'Drift Detection', 'Data Quality'],
            points: ['Schema governance', 'Point-in-time snapshots', 'Data contracts', 'Quality gates'],
            highlights: [{label: 'Stability', value: '99.9% uptime'}, {
                label: 'Traceability',
                value: 'Complete lineage'
            }, {label: 'Quality', value: 'Automated validation'}],
            details: [
                'Dual-path feature computation (streaming + batch) with consistency validation',
                'Data contract enforcement with backward compatibility and schema versioning',
                'Multi-dimensional drift detection: statistical, behavioral, and seasonal patterns',
                'Automated remediation workflows for PII redaction and data quality violations'
            ]
        },
        {
            title: 'Computer Vision & Perception',
            eyebrow: 'Visual Intelligence',
            summary: 'End-to-end annotation infrastructure, model optimization, and multi-domain perception.',
            body: 'We build comprehensive computer vision systems from annotation infrastructure through production serving. Our data labeling platforms support multiple annotation types (classification, bounding box, segmentation, 3D), inter-annotator agreement measurement, and quality control workflows. We conduct rigorous dataset curation with bias detection and augmentation strategies. Model optimization includes quantization-aware training, pruning, distillation, and architecture search to meet hardware constraints. Our production systems serve models across cloud and edge environments with adaptive quality-of-service and graceful degradation.',
            metrics: ['Annotation Platform', 'Quantization', 'Model Distillation', 'Edge Inference'],
            points: ['Labeling pipelines', 'Model compression', 'Accuracy-latency', 'Multi-device support'],
            highlights: [{label: 'Accuracy', value: '95%+ SOTA'}, {
                label: 'Latency',
                value: '15ms edge'
            }, {label: 'Scale', value: '10M+ images'}],
            details: [
                'Active learning frameworks for efficient data collection and annotation prioritization',
                'Comprehensive augmentation strategies including synthetic data generation',
                'Quantization-aware training with mixed-precision optimization for mobile/edge',
                'On-device model validation with fallback to cloud confidence scoring'
            ]
        },
        {
            title: 'Privacy, Safety & Governance',
            eyebrow: 'Responsible AI',
            summary: 'Privacy-first architecture, safety operations, and regulatory compliance frameworks.',
            body: 'We operationalize responsible AI through comprehensive privacy, safety, and governance frameworks. Our systems implement sophisticated PII detection and redaction, differential privacy mechanisms, and federated learning architectures where appropriate. Safety pipelines include content filtering, toxicity detection, and jailbreak prevention with escalation workflows. We maintain detailed model cards, bias audits, and regulatory compliance documentation for GDPR, HIPAA, and industry-specific frameworks. Our governance playbooks define clear approval processes, audit trails, and human-in-the-loop review procedures.',
            metrics: ['PII Redaction', 'Safety Filters', 'Model Cards', 'Compliance Docs'],
            points: ['Consent-aware logging', 'Human review', 'Risk registers', 'Audit trails'],
            highlights: [{label: 'Compliance', value: 'GDPR/HIPAA'}, {
                label: 'Safety',
                value: 'Automated filters'
            }, {label: 'Governance', value: 'Full docs'}],
            details: [
                'Multi-layer PII detection: pattern matching, NER, and semantic understanding',
                'Safety escalation workflows with human-in-the-loop and appeal mechanisms',
                'Bias measurement frameworks: demographic parity, equalized odds, calibration',
                'Audit-ready logging with immutable records and compliance certification support'
            ]
        },
        {
            title: 'Integration & API Engineering',
            eyebrow: 'Product integration',
            summary: 'High-performance APIs, SDKs, and resilient patterns for seamless AI embedding.',
            body: 'We engineer production-grade APIs designed for reliability, performance, and developer experience. Our API contracts are versioned with backward compatibility guarantees and clear deprecation paths. We implement sophisticated resilience patterns including connection pooling, adaptive timeouts, intelligent retry logic with exponential backoff, and circuit breaking. Streaming endpoints support real-time use cases with proper flow control and backpressure handling. Multi-language SDKs feature idiomatic API design, comprehensive documentation, and automated testing against API contracts.',
            metrics: ['REST/gRPC', 'Multi-language SDKs', 'Streaming APIs', 'WebSocket'],
            points: ['Versioned contracts', 'Rate limiting', 'Backwards compatible', 'Load-balanced'],
            highlights: [{label: 'Resilience', value: 'Retries & fallback'}, {
                label: 'Compatibility',
                value: 'V1-V5 support'
            }, {label: 'Performance', value: 'Sub-100ms p95'}],
            details: [
                'Contract-driven API design with OpenAPI/gRPC specifications and client generation',
                'Sophisticated rate limiting with per-user, per-endpoint, and adaptive throttling',
                'Request deduplication for idempotent operations and retry safety',
                'Client-side SDKs with caching, batching, and offline queueing capabilities'
            ]
        },
        {
            title: 'Edge & On-Device ML',
            eyebrow: 'Offline Intelligence',
            summary: 'Optimized models for constrained devices with offline capability and OTA updates.',
            body: 'We specialize in deploying sophisticated AI systems on resource-constrained devices. Our quantization-aware training process creates models that maintain accuracy while fitting extreme computational budgets. We conduct architecture search specifically optimized for target hardware (mobile CPUs, edge accelerators, IoT processors). Our systems implement efficient inference runtimes, selective feature computation, and progressive quality degradation. OTA update mechanisms support staged rollouts, version manifests, and atomic updates that preserve device state and handle network interruptions gracefully.',
            metrics: ['Quantization-Aware', 'Architecture Search', 'TensorFlow Lite', 'ONNX Runtime'],
            points: ['Model compression', 'Runtime validation', 'OTA manifests', 'Offline-first'],
            highlights: [{label: 'Latency', value: '8-15ms'}, {label: 'Footprint', value: '2-5MB'}, {
                label: 'Accuracy',
                value: '95%+ preserved'
            }],
            details: [
                'Mixed-precision and dynamic quantization with post-training & QAT workflows',
                'Neural architecture search optimized for hardware-specific constraints',
                'Efficient tensor operations: operator fusion, memory layout optimization, batching',
                'OTA infrastructure with manifest verification, staged rollout, and rollback capabilities'
            ]
        },
        {
            title: 'Tooling & Observability',
            eyebrow: 'Production visibility',
            summary: 'Comprehensive monitoring, evaluation, and cost profiling for operational excellence.',
            body: 'We architect comprehensive observability systems that provide complete visibility into model behavior and system health. Our evaluation frameworks conduct continuous assessment across accuracy, fairness, robustness, and performance metrics. Telemetry systems capture request-level details, inference results, and business outcomes with automated correlation analysis. SLO frameworks define clear performance targets with automated breach detection and alert routing. Cost profiling systems track infrastructure usage, API spending, and computational overhead at fine-grained levels, enabling rapid identification of optimization opportunities. Our dashboards integrate model performance, business metrics, and system health for holistic operational awareness.',
            metrics: ['Dashboards', 'Eval Suites', 'Cost Profiling', 'Telemetry'],
            points: ['SLOs & alerts', 'A/B testing', 'Cost controls', 'Performance trends'],
            highlights: [{label: 'Visibility', value: 'End-to-end spans'}, {
                label: 'Evaluation',
                value: 'Continuous'
            }, {label: 'Cost tracking', value: 'Real-time'}],
            details: [
                'Distributed tracing: request flow, inference latency breakdowns, dependency analysis',
                'Continuous evaluation harnesses running periodic assessments against production traffic',
                'Champion-challenger framework for automated model comparison and safe promotion',
                'Cost attribution across models, endpoints, and customers with trend analysis'
            ]
        }
    ];

    const activeCapability = capabilityCards[webIndex ?? 0] ?? capabilityCards[0];

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>

            {/* Unified Futuristic Web Design Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video Background (desktop) and Image fallback (mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/ads/hero.jpg"
                >
                    <source src="/assets/ads/hero-mobile.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/ads/hero.jpg"
                    alt="Web Design Hero"
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
                                    className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">AI Development</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Artificial Intelligence <span className="gx-gradient-text">Development</span> Company
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                Empower your company with next-generation AI solutions designed to simplify processes,
                                strengthen business insights, and ignite innovation. From model building to MLOps and
                                deployment, we deliver production-ready systems that scale.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['ML Engineering', 'MLOps', 'NLP', 'Computer Vision', 'Data Engineering'].map((badge) => (
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
                                    {label: 'Projects Delivered', value: '20+'},
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'Customers', value: '40+'},
                                    {label: 'Avg Model Accuracy', value: '92%'}
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
                            {label: 'Projects', value: '20+'},
                            {label: 'Experts', value: '10+'},
                            {label: 'Accuracy', value: '92%'}
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
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>AI EXCELLENCE</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Build Intelligent, <span className="gx-gradient-text">Production-Ready</span> AI Systems
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>
                                        AI isn't magic — it's engineering. Grey InfoTech combines rigorous data
                                        practices,
                                        robust model engineering, and production-grade MLOps to turn prototypes into
                                        reliable, scalable systems. We prioritise observability, performance, and
                                        reproducibility so your models deliver consistent value in production.
                                    </p>
                                    <p>
                                        Our process emphasises measurable outcomes: define KPIs, iterate on experiments,
                                        and ship with confidence. From feature engineering and model training to CI/CD
                                        pipelines, containerised serving, and continuous monitoring — every step is
                                        optimised for reliability and impact.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['ML Engineering', 'MLOps', 'Data Pipelines', 'Model Ops'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>
                                        Whether you need bespoke NLP, computer vision, recommendation systems, or
                                        intelligent automation, Grey InfoTech builds end-to-end solutions tailored to
                                        your business. We design for latency, cost, and scalability while preserving
                                        model accuracy and interpretability.
                                    </p>
                                    <p>
                                        We partner with your team across discovery, prototyping, and deployment — and
                                        provide ongoing optimisation to keep models performing as data and requirements
                                        evolve.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['NLP', 'Computer Vision', 'Realtime Inference', 'Monitoring & Alerts'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* AI Development Services Overview - Enhanced with FxStickyScrollSection */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>AI Development<br/>services overview</>}
                intro={"Enterprise-grade AI engineering, from strategic alignment to production delivery. We combine rigorous data practices, model engineering, and MLOps to ensure measurable value, operational reliability, and secure deployments at scale."}
                navLabel="AI Solutions"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: "01",
                        title: "Business Process Automation with AI",
                        target: "BPA",
                        tags: ["RPA", "NLP", "Predictive Analytics", "OCR", "Integration"],
                        body: (
                            <div>
                                <p>
                                    Architect and deliver automation workflows that embed intelligence into
                                    mission-critical processes. Typical solutions combine document OCR/ICR,
                                    transformer-based NLP for information extraction, rule-based and ML-driven routing,
                                    and predictive models to prioritise work queues. Integrations are provided for ERPs,
                                    CRMs, and ticketing systems via secure API connectors and event-driven middleware.
                                </p>
                                <ul className="mt-3 list-disc ml-6">
                                    <li><strong>Approach:</strong> discovery & process mapping, data capture design,
                                        model prototyping, integration & orchestration, staged rollouts with A/B
                                        measurement.
                                    </li>
                                    <li><strong>Deliverables:</strong> extraction pipelines, inference microservices
                                        (containerised), orchestration playbooks, monitoring dashboards, and an ROI
                                        forecast with KPIs (throughput, error-rate reduction, time-to-complete).
                                    </li>
                                    <li><strong>Security & Compliance:</strong> encryption at-rest/in-transit,
                                        role-based access, PII redaction patterns, audit logging, and optional on-prem
                                        deployment for regulated environments.
                                    </li>
                                </ul>
                            </div>
                        ),
                    },
                    {
                        id: "02",
                        title: "AI Consultancy & Implementation Strategy",
                        target: "ACIS",
                        tags: ["Roadmapping", "PoC", "Governance", "Cost Modeling"],
                        body: (
                            <div>
                                <p>
                                    Strategic engagement to align AI initiatives with business objectives. We run
                                    stakeholder workshops, data readiness assessments, use-case prioritisation with
                                    quantifiable ROI, and architecture trade-off analyses. Emphasis is placed on risk
                                    mitigation, governance, and measurable success criteria.
                                </p>
                                <ul className="mt-3 list-disc ml-6">
                                    <li><strong>Phases:</strong> discovery & scoping, feasibility & PoC, architecture
                                        design, implementation planning, and change management.
                                    </li>
                                    <li><strong>Artifacts:</strong> prioritized backlog, technical and data architecture
                                        blueprints, compliance and privacy playbook, cost and capacity models, and an
                                        MVP success plan with acceptance criteria.
                                    </li>
                                    <li><strong>Outcomes:</strong> validated PoC deliverables, roadmap for incremental
                                        value delivery, and clear KPIs (precision/recall, latency, business metric
                                        uplift).
                                    </li>
                                </ul>
                            </div>
                        ),
                    },
                    {
                        id: "03",
                        title: "Custom AI Chatbots & Agents",
                        target: "CACA",
                        tags: ["Conversational AI", "RAG", "LangChain", "Integrations", "Security"],
                        body: (
                            <div>
                                <p>
                                    Design and deploy conversational agents that perform transactional work and surface
                                    authoritative answers. Architecture options include retrieval-augmented generation
                                    (RAG) over validated knowledge sources, blended LLM pipelines for response
                                    synthesis, and deterministic business logic for actions and integrations.
                                </p>
                                <ul className="mt-3 list-disc ml-6">
                                    <li><strong>Design:</strong> conversation flows, slot-filling, fallback strategies,
                                        escalation & human-in-the-loop patterns.
                                    </li>
                                    <li><strong>Engineering:</strong> vector stores, semantic search tuning, prompt
                                        engineering, connectors to CRMs, databases and 3rd-party APIs, and secure
                                        session management.
                                    </li>
                                    <li><strong>Deliverables & Ops:</strong> dialogue design docs, reproducible RAG
                                        pipelines, test harnesses, deployment scripts, SLOs for latency and accuracy,
                                        and monitoring for hallucinations and drift.
                                    </li>
                                </ul>
                            </div>
                        ),
                    },
                    {
                        id: "04",
                        title: "MLOps & Model Deployment",
                        target: "MLOPS",
                        tags: ["CI/CD", "Monitoring", "Model Registry", "Autoscaling"],
                        body: (
                            <div>
                                <p>
                                    End-to-end MLOps to move models from experimentation into repeatable, observable
                                    production. This includes automated training pipelines, model versioning,
                                    reproducible environments (Infrastructure as Code), canary or blue-green deployments
                                    for model rollouts, and real-time observability for data and model performance.
                                </p>
                                <ul className="mt-3 list-disc ml-6">
                                    <li><strong>Key Components:</strong> feature store, model registry, CI for data &
                                        models, containerised serving with autoscaling, and metrics & tracing.
                                    </li>
                                    <li><strong>Operational Deliverables:</strong> deployment pipelines, rollback
                                        procedures, monitoring & alerting (data drift, model degradation),
                                        cost-optimised serving configurations, and runbooks for incident response.
                                    </li>
                                    <li><strong>Governance:</strong> model cards, reproducibility artifacts, lineage,
                                        and automated bias checks where applicable.
                                    </li>
                                </ul>
                            </div>
                        ),
                    },
                    {
                        id: "05",
                        title: "Data Engineering & Pipelines",
                        target: "DE",
                        tags: ["ETL", "Streaming", "Feature Store", "Data Quality"],
                        body: (
                            <div>
                                <p>
                                    Build scalable, observable data platforms that provide trustworthy inputs for ML and
                                    analytics. Focus areas include robust ingestion, schema enforcement, transformation
                                    with lineage, feature engineering pipelines, and operational data services that meet
                                    SLAs.
                                </p>
                                <ul className="mt-3 list-disc ml-6">
                                    <li><strong>Practices:</strong> idempotent pipelines, schema evolution strategies,
                                        contract testing, and automated data quality checks.
                                    </li>
                                    <li><strong>Deliverables:</strong> ETL/ELT templates, streaming ingestion
                                        (Kafka/Managed Streams), feature stores, data contracts, lineage dashboards, and
                                        SLO definitions for freshness and completeness.
                                    </li>
                                    <li><strong>Security & Compliance:</strong> access controls, encryption, PII
                                        handling patterns, and retention policies to support regulatory obligations.
                                    </li>
                                </ul>
                            </div>
                        ),
                    },
                    {
                        id: "06",
                        title: "Computer Vision & Visual AI",
                        target: "CV",
                        tags: ["Object Detection", "Segmentation", "OCR", "Model Compression"],
                        body: (
                            <div>
                                <p>
                                    Deliver computer vision systems for inspection, automation, and analytics. Solutions
                                    range from real-time object detection and instance segmentation to OCR and visual
                                    search. We prioritise dataset curation, augmentation strategies, and efficient model
                                    architectures for edge deployment.
                                </p>
                                <ul className="mt-3 list-disc ml-6">
                                    <li><strong>Approach:</strong> data collection & labelling strategy, baseline model
                                        selection, augmentation & synthetic data generation, and performance
                                        benchmarking.
                                    </li>
                                    <li><strong>Deliverables:</strong> trained models (FP16/INT8), inference
                                        microservices, evaluation reports, and deployment guides for cloud or edge
                                        targets.
                                    </li>
                                    <li><strong>Considerations:</strong> privacy-preserving anonymization, latency
                                        targets, and model lifecycle management for continued accuracy.
                                    </li>
                                </ul>
                            </div>
                        ),
                    },
                    {
                        id: "07",
                        title: "Recommendation Systems & Personalization",
                        target: "REC",
                        tags: ["Collaborative Filtering", "Ranking", "A/B Testing"],
                        body: (
                            <div>
                                <p>
                                    Build personalization pipelines to increase engagement and conversion. From
                                    candidate generation to ranking and online experimentation, systems are designed for
                                    latency, freshness, and interpretability.
                                </p>
                                <ul className="mt-3 list-disc ml-6">
                                    <li><strong>Architecture:</strong> hybrid candidate generation (content +
                                        collaborative), feature stores for dense/sparse features, and latency-optimised
                                        ranking services.
                                    </li>
                                    <li><strong>Deliverables:</strong> offline evaluation pipelines, online serving
                                        stack, A/B testing frameworks, and dashboards for business KPIs.
                                    </li>
                                </ul>
                            </div>
                        ),
                    },
                    {
                        id: "08",
                        title: "Edge & On-device ML",
                        target: "EDGE",
                        tags: ["Model Compression", "On-device", "Latency"],
                        body: (
                            <div>
                                <p>
                                    Architect ML solutions that run on-device for low-latency, offline capability and
                                    privacy-preserving inference. Techniques include quantization, pruning, knowledge
                                    distillation, and platform-specific optimisations.
                                </p>
                                <ul className="mt-3 list-disc ml-6">
                                    <li><strong>Deliverables:</strong> compressed models, cross-platform SDKs,
                                        benchmarking reports, and deployment pipelines for mobile or embedded targets.
                                    </li>
                                    <li><strong>Considerations:</strong> energy profile, cold-start behavior, and
                                        over-the-air update strategies.
                                    </li>
                                </ul>
                            </div>
                        ),
                    },
                    {
                        id: "09",
                        title: "AI Ethics, Governance & Responsible AI",
                        target: "ETHICS",
                        tags: ["Bias Audits", "Explainability", "Policy"],
                        body: (
                            <div>
                                <p>
                                    Operationalise responsible AI with bias audits, explainability tooling, and
                                    governance policies. We help teams build guardrails—model cards, documentation, and
                                    processes—to make AI safe, auditable, and aligned with organisational values.
                                </p>
                                <ul className="mt-3 list-disc ml-6">
                                    <li><strong>Services:</strong> dataset bias evaluation, fairness metrics,
                                        explainability reports, and governance playbooks.
                                    </li>
                                    <li><strong>Outcomes:</strong> risk registers, compliance artefacts, and monitoring
                                        for fairness drift.
                                    </li>
                                </ul>
                            </div>
                        ),
                    },
                    {
                        id: "10",
                        title: "AI Integration & Platform Engineering",
                        target: "API",
                        tags: ["APIs", "Platform", "Observability"],
                        body: (
                            <div>
                                <p>
                                    Integrate AI components into business platforms with robust APIs, developer SDKs,
                                    and platform services. Provide lifecycle tooling for model deployment, feature
                                    discovery, and observability so engineering teams can own models like production
                                    services.
                                </p>
                                <ul className="mt-3 list-disc ml-6">
                                    <li><strong>Deliverables:</strong> API gateways, SDKs, role-based access controls,
                                        observability dashboards, and onboarding documentation.
                                    </li>
                                    <li><strong>Operational Focus:</strong> SLA definitions, autoscaling patterns, cost
                                        monitoring, and developer experience improvements.
                                    </li>
                                </ul>
                            </div>
                        ),
                    },
                ]}
            />


            {/* Mid Showcase - Futuristic AI Visual Demonstrator */}
            <section id={'mid-showcase'}
                     className={`relative lg:max-w-full w-full py-20 lg:py-28 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]`}>
                <div className={'relative grid lg:grid-cols-2 grid-cols-1 gap-10 items-center'}>
                    {/* Left: Layered visual mockup with ambient glow & micro-motion */}
                    <div className="relative flex items-center justify-center group">
                        <div className="relative w-full max-w-4xl lg:h-[680px] h-[420px]">
                            {/* Ambient gradient glow (decorative) */}
                            <div aria-hidden
                                 className="absolute -inset-6 rounded-2xl blur-3xl opacity-30 bg-gradient-to-tr from-teal-400 via-indigo-500 to-purple-600 transform-gpu rotate-6 pointer-events-none"/>

                            {/* Main device mockup with subtle lift on hover */}
                            <div
                                className={`relative rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(2,6,23,0.7)] border ${isDayTime ? 'border-black/8' : 'border-white/8'} ${isDayTime ? 'bg-gradient-to-b from-white/5 to-white/0' : 'bg-gradient-to-b from-black/40 to-black/20'} transition-transform duration-700 will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.01] h-full`}>
                                <Image
                                    src={'/assets/ads/mid.jpg'}
                                    alt={'AI showcase mockup'}
                                    fill
                                    priority
                                    style={{objectFit: 'cover', objectPosition: 'center'}}
                                    className="rounded-2xl"
                                />
                            </div>

                            {/* Floating holo cards with tactical stats and microcopy */}
                            <div className="absolute -bottom-14 left-6 flex flex-col gap-3 z-20">
                                <FxHoloCard day={isDayTime} className="px-4 py-3">
                                    <div className="text-teal-300 text-[0.75em] font-[600]">Low-latency inference</div>
                                    <div className="text-white text-[0.95em] font-[700]">~25ms P95</div>
                                </FxHoloCard>
                                <FxHoloCard day={isDayTime} className="px-4 py-3">
                                    <div className="text-indigo-300 text-[0.75em] font-[600]">Scalable serving</div>
                                    <div className="text-white text-[0.95em] font-[700]">Autoscaling & canary</div>
                                </FxHoloCard>
                                <FxHoloCard day={isDayTime} className="px-4 py-3">
                                    <div className="text-purple-300 text-[0.75em] font-[600]">Continuous retraining
                                    </div>
                                    <div className="text-white text-[0.95em] font-[700]">Data drift detection</div>
                                </FxHoloCard>
                            </div>

                            {/* Decorative right-floating badges */}
                            <div className="absolute -top-10 right-6 flex flex-col gap-3 pointer-events-none">
                                <div
                                    className={`${isDayTime ? 'bg-white/80 text-black border-black/6' : 'bg-black/60 text-white border-white/6'} px-4 py-2 rounded-2xl backdrop-blur-md border text-sm`}>Throughput:
                                    8k req/min
                                </div>
                                <div
                                    className={`${isDayTime ? 'bg-white/80 text-black border-black/6' : 'bg-black/60 text-white border-white/6'} px-4 py-2 rounded-2xl backdrop-blur-md border text-sm`}>Model
                                    Size: 120MB (quantized)
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Context, details, and actionable metrics */}
                    <div className="lg:pl-12">
                        <FxReveal>
                            <h3 className={`lg:text-[2.4em] md:text-[2em] text-[1.6em] font-[700] tracking-tight leading-[1.05] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                Futuristic AI Showcase — Designed for Production
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.06}>
                            <p className={`mt-6 text-[0.98em] leading-[1.6] text-justify font-[300] ${isDayTime ? 'text-gray-800' : 'text-white'}`}>
                                A demonstration of end-to-end AI engineering: optimised model inference, resilient
                                serving topology, automated retraining pipelines, and observability built for
                                enterprise SLAs. This visual showcases how models perform under real traffic, the
                                telemetry exposed for SREs, and the guardrails enforced for safe operation.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div
                                    className={`${isDayTime ? 'bg-black/5 border-black/6' : 'bg-white/5 border-white/6'} px-4 py-3 rounded-lg`}>
                                    <div
                                        className={`${isDayTime ? 'text-teal-600' : 'text-teal-300'} text-[0.7em] uppercase tracking-wide font-[600]`}>P95
                                        Latency
                                    </div>
                                    <div
                                        className={`${isDayTime ? 'text-black' : 'text-white'} text-[1.4em] font-[700]`}>25
                                        ms
                                    </div>
                                </div>
                                <div
                                    className={`${isDayTime ? 'bg-black/5 border-black/6' : 'bg-white/5 border-white/6'} px-4 py-3 rounded-lg`}>
                                    <div
                                        className={`${isDayTime ? 'text-teal-600' : 'text-teal-300'} text-[0.7em] uppercase tracking-wide font-[600]`}>Uptime
                                    </div>
                                    <div
                                        className={`${isDayTime ? 'text-black' : 'text-white'} text-[1.4em] font-[700]`}>99.99%
                                    </div>
                                </div>
                                <div
                                    className={`${isDayTime ? 'bg-black/5 border-black/6' : 'bg-white/5 border-white/6'} px-4 py-3 rounded-lg`}>
                                    <div
                                        className={`${isDayTime ? 'text-teal-600' : 'text-teal-300'} text-[0.7em] uppercase tracking-wide font-[600]`}>Model
                                        Accuracy
                                    </div>
                                    <div
                                        className={`${isDayTime ? 'text-black' : 'text-white'} text-[1.4em] font-[700]`}>92%
                                        (weighted)
                                    </div>
                                </div>
                                <div
                                    className={`${isDayTime ? 'bg-black/5 border-black/6' : 'bg-white/5 border-white/6'} px-4 py-3 rounded-lg`}>
                                    <div
                                        className={`${isDayTime ? 'text-teal-600' : 'text-teal-300'} text-[0.7em] uppercase tracking-wide font-[600]`}>Data
                                        Freshness
                                    </div>
                                    <div
                                        className={`${isDayTime ? 'text-black' : 'text-white'} text-[1.4em] font-[700]`}>
                                        <span>5 min</span></div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <Link href="/contact"
                                      className={`${isDayTime ? 'bg-teal-500 text-black' : 'bg-teal-400 text-black'} inline-flex items-center px-6 py-3 rounded-full font-semibold shadow hover:opacity-95`}>Start
                                    a project</Link>
                                <Link href="/services#MLOPS"
                                      className={`${isDayTime ? 'text-black border-black/10' : 'text-white border-white/20'} inline-flex items-center px-5 py-3 border rounded-full hover:bg-white/5`}>Explore
                                    MLOps</Link>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* AI Services — Professional Futuristic Grid (mirrors Front-end Technologies design) */}
            <div
                className={`${isDayTime ? 'bg-gradient-to-br from-white via-slate-50 to-indigo-50' : 'bg-gradient-to-br from-slate-900 via-indigo-950 to-black'}`}>
                <div id={'ai-services-overview'}
                     className={`relative py-20 lg:py-32 max-w-full w-full mx-auto px-6 sm:px-8 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]`}>

                    {/* Header */}
                    <header
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-8 items-start ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                        <div>
                            <h2 className='text-[1.05em] sm:text-[1.6em] md:text-[2.2em] lg:text-[3.2em] font-semibold tracking-tight leading-[0.95]'>
                                AI Services & Capability Matrix
                            </h2>
                            <div className='mt-3 flex gap-3 items-center'>
                                <span
                                    className='inline-block px-3 py-1 text-[0.72em] rounded-full bg-teal-400/10 text-teal-500 border border-teal-400/10'>Enterprise</span>
                                <span
                                    className='inline-block px-3 py-1 text-[0.72em] rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/10'>Scalable</span>
                                <span
                                    className='inline-block px-3 py-1 text-[0.72em] rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/10'>Responsible</span>
                            </div>
                        </div>

                        <div className='lg:ml-8'>
                            <p className='text-[0.95em] font-light leading-6'>
                                A curated portfolio of AI services with operational guidance, maturity, and measurable
                                outcomes. Each block below outlines use-cases, deployment maturity, performance/security
                                notes, testing strategy, and a concise implementation plan.
                            </p>

                            <div className='mt-4 text-sm text-slate-500 space-y-1'>
                                <div>Deliverables per service: Architecture diagram • Model contract • CI/CD recipe •
                                    Monitoring plan
                                </div>
                                <div>Observability: Suggested telemetry, SLOs, and model performance thresholds</div>
                            </div>
                        </div>
                    </header>

                    {/* Tools Grid */}
                    <section id={'ai-tools'} className='mt-12 grid lg:grid-cols-2 gap-8 relative z-10'>
                        {[
                            {
                                id: 'llm-engineering',
                                title: 'LLM Engineering & Prompting',
                                icon: '/assets/ads/icon/rel.svg',
                                tags: ['Prompt Design', 'Chain-of-Thought', 'Safety'],
                                shortDesc: 'Design and validate high-impact prompts, instruction tuning, and interaction patterns for reliable LLM-driven features.',
                                description: 'Specialized prompt engineering, prompt chaining, and instruction tuning to ensure consistent, controllable outputs from large language models. Emphasis on few-shot design, rate-limited fallback strategies, and rigorous testing harnesses to reduce hallucination and align behavior with business goals.',
                                details: 'Prompt templates | Evaluation harnesses | Safety filters | Temperature & sampling strategy | Cost/perf tradeoffs | Retry & fallback logic'
                            },
                            {
                                id: 'mlops',
                                title: 'MLOps & Model Lifecycle',
                                icon: '/assets/ads/icon/thi.svg',
                                tags: ['Training Pipelines', 'CI/CD', 'Model Versioning'],
                                shortDesc: 'Automated model training, deployment, and monitoring pipelines to move models from research to production safely and reliably.',
                                description: 'End-to-end MLOps: reproducible training pipelines, artifact versioning, model registries, and automated deployment strategies (canary/blue-green). We implement reproducible experiments, lineage tracking, and rollback-safe releases to reduce risk in production model updates.',
                                details: 'CI pipelines (train/validate/publish) | Model registry | Canary releases | A/B testing | Retraining cadence | Data lineage'
                            },
                            {
                                id: 'data-engineering',
                                title: 'Data Engineering & Feature Stores',
                                icon: '/assets/ads/icon/sca.svg',
                                tags: ['ETL', 'Feature Store', 'Data Quality'],
                                shortDesc: 'Robust data pipelines and feature stores ensuring reliable inputs, reproducible features, and observability for model training and serving.',
                                description: 'Design and implement scalable ingestion pipelines, transformation layers, and feature stores to provide consistent, low-latency features for model training and inference. Includes data validation, drift detection, and snapshotting to support reproducible experiments.',
                                details: 'Stream & batch ETL | Feature store design | Data validation (tests) | Drift detection | Schema governance'
                            },
                            {
                                id: 'computer-vision',
                                title: 'Computer Vision & Perception',
                                icon: '/assets/ads/icon/speed.svg',
                                tags: ['CV Models', 'Annotation', 'Edge Inference'],
                                shortDesc: 'Custom vision models for detection, segmentation, and classification, optimized for cloud and edge deployment.',
                                description: 'From dataset curation and labeling workflows to model architecture selection and edge-optimized inference, deliverables include accuracy benchmarks, latency targets, and deployment recipes for on-device or cloud inference.',
                                details: 'Annotation pipelines | Model compression & quantization | Edge runtime integration | Accuracy & latency tradeoffs'
                            },
                            {
                                id: 'recommendation-systems',
                                title: 'Recommendation & Personalization',
                                icon: '/assets/ads/icon/web.svg',
                                tags: ['Ranking', 'A/B Testing', 'Personalization'],
                                shortDesc: 'Scalable recommendation systems tailored to your content, trading off relevance and diversity for business KPIs.',
                                description: 'Design hybrid recommendation stacks combining collaborative filtering, content-based signals, and model-based rerankers. Include offline evaluation metrics, online A/B plans, and instrumentation for long-term learning.',
                                details: 'Candidate generation | Reranking models | Offline & online evaluation | Cold-start strategies | A/B experimentation'
                            },
                            {
                                id: 'privacy-safety',
                                title: 'Privacy, Ethics & Safety',
                                icon: '/assets/ads/icon/web.svg',
                                tags: ['Pseudonymization', 'Content Safety', 'Governance'],
                                shortDesc: 'Practical governance: privacy-preserving patterns, safety filters, and compliance-ready practices for production AI.',
                                description: 'Implement data minimization, anonymization techniques, consent-aware logging, and content-safety pipelines. Establish governance practices, model cards, and risk registers to operationalise responsible AI at scale.',
                                details: 'Data contracts | Model cards | Safety filters | PII redaction | Compliance checklists'
                            },
                            {
                                id: 'edge-ml',
                                title: 'Edge & On-Device ML',
                                icon: '/assets/ads/icon/thi.svg',
                                tags: ['TinyML', 'Quantization', 'Low-Latency'],
                                shortDesc: 'Deploy models to constrained devices with quantization, pruning, and optimized runtimes to meet strict latency requirements.',
                                description: 'Optimize model architectures and pipelines for on-device execution, including quantization-aware training, pruning, and evaluation against strict latency and power budgets. Provide deployment manifests for popular runtimes.',
                                details: 'Quantization | Pruning | Runtime selection | OTA updates | Performance budgets'
                            },
                            {
                                id: 'integration-apis',
                                title: 'Integration & API Engineering',
                                icon: '/assets/ads/icon/rel.svg',
                                tags: ['REST/GRPC', 'Realtime', 'SDKs'],
                                shortDesc: 'Robust API layers, SDKs, and connectors to integrate AI features into products and analyst workflows.',
                                description: 'Design API contracts, streaming endpoints, SDKs, and connectors for downstream systems. Focus on versioned APIs, rate limiting, retries, and backward-compatible schema evolution to minimise client disruption.',
                                details: 'API contracts | SDKs | Rate limiting | Authentication & quotas | Backwards compatibility'
                            },
                        ].map((tech, index) => (
                            <article key={tech.id} role='article'
                                     className='group flex flex-col gap-4 p-6 rounded-2xl border border-gray-200/8 bg-white/6 dark:bg-black/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-transform hover:-translate-y-2'>
                                <div className='flex gap-6 items-start'>
                                    <div className='flex-shrink-0'>
                                        <div
                                            className='w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-tr from-teal-400 to-cyan-500 p-1'>
                                            <div className='bg-white/90 dark:bg-gray-900/70 rounded-lg p-2'>
                                                <Image src={isDayTime ? tech.icon : tech.icon.replace('.svg', '1.svg')}
                                                       alt={tech.title} width={44} height={44}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex-1'>
                                        <div className='flex items-start justify-between gap-4'>
                                            <div>
                                                <h3 className='text-2xl font-semibold'>{tech.title}</h3>
                                                <div
                                                    className='mt-1 text-sm text-slate-500 dark:text-slate-300'>{tech.shortDesc}</div>
                                            </div>

                                            <div className='text-right space-y-1'>
                                                <span
                                                    className='inline-block px-2 py-1 text-xs rounded-md bg-slate-800/10 dark:bg-slate-200/6'>Maturity: High</span>
                                                <span
                                                    className='inline-block px-2 py-1 text-xs rounded-md bg-slate-800/10 dark:bg-slate-200/6'>Production-ready</span>
                                            </div>
                                        </div>

                                        <p className='mt-3 text-[0.92em] text-justify text-slate-600 dark:text-slate-300'>
                                            {tech.description}
                                        </p>

                                        <div className='mt-4 text-xs text-slate-500 dark:text-slate-400'>
                                            <span className='font-semibold block mb-2'>Key Capabilities:</span>
                                            {tech.details}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>

                </div>
            </div>

            {/* What Powers Our AI Development */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative mx-auto w-full max-w-full px-4 sm:px-6 lg:px-[4.6em] lg:pt-[6em] lg:pb-[6em] md:pt-[6em] md:pb-[6em] pt-[1.2em] pb-[1.2em] mt-14`}>
                    <div
                        className={`relative overflow-hidden rounded-[2rem] border p-6 sm:p-8 lg:p-10 ${isDayTime ? 'border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(241,245,249,0.86))]' : 'border-white/10 bg-[linear-gradient(135deg,rgba(6,10,20,0.98),rgba(10,16,29,0.94))]'}`}>
                        <div
                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.2),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_32%)]"/>
                        <div className="pointer-events-none absolute inset-0 border border-white/10 rounded-[2rem]"/>

                        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                            <div>
                                <div
                                    className={`mb-4 inline-flex rounded-full border px-3 py-1 text-[0.62em] font-[600] uppercase tracking-[0.35em] ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-700' : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200'}`}>
                                    AI Capability Matrix
                                </div>
                                <h2 className={`text-[1.6rem] sm:text-[2.1rem] lg:text-[2.8rem] font-[700] leading-[1.08] tracking-tight ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                    What powers our <span className="gx-gradient-text">AI development</span>
                                </h2>
                                <p className={`mt-5 max-w-xl text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                    Our comprehensive AI engineering practice integrates cutting-edge model
                                    architecture, production-grade MLOps systems, rigorous data governance, and
                                    enterprise-ready deployment patterns. We architect solutions that scale reliably
                                    across millions of requests while maintaining strict accuracy, latency, and cost
                                    objectives.
                                </p>

                                <div
                                    className={`mt-7 rounded-[1.4rem] border p-5 ${isDayTime ? 'border-slate-200 bg-white/80' : 'border-white/10 bg-white/5'}`}>
                                    <div
                                        className={`text-[0.6em] uppercase tracking-[0.3em] font-bold ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>
                                        ▶ Active Capability
                                    </div>
                                    <h3 className={`mt-2 text-[1.15rem] font-[700] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                        {activeCapability.title}
                                    </h3>
                                    <p className={`mt-3 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        {activeCapability.summary}
                                    </p>

                                    {/* Technology Stack Badges */}
                                    <div className="mt-5">
                                        <div
                                            className={`text-[0.56em] uppercase tracking-[0.2em] font-bold mb-2 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                            Technology Stack
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {activeCapability.metrics.map((metric: string) => (
                                                <span key={metric}
                                                      className={`rounded-full border px-3 py-1 text-[0.66em] font-[700] uppercase tracking-[0.24em] ${isDayTime ? 'border-cyan-500/30 bg-cyan-500/15 text-cyan-700' : 'border-cyan-400/30 bg-cyan-400/15 text-cyan-200'}`}>
                                            {metric}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Performance Highlights */}
                                    <div className="mt-6">
                                        <div
                                            className={`text-[0.56em] uppercase tracking-[0.2em] font-bold mb-3 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                            Performance Targets & SLOs
                                        </div>
                                        <div className="grid gap-3 md:grid-cols-3">
                                            {activeCapability.highlights.map((highlight) => (
                                                <div key={highlight.label}
                                                     className={`rounded-[1rem] border p-4 ${isDayTime ? 'border-slate-200 bg-slate-50/80' : 'border-white/10 bg-black/30'}`}>
                                                    <div
                                                        className={`text-[0.56em] uppercase tracking-[0.3em] font-bold ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>
                                                        {highlight.label}
                                                    </div>
                                                    <div
                                                        className={`mt-2 text-[0.95rem] font-[700] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                                        {highlight.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Detailed Description */}
                                    <div
                                        className={`mt-6 border-t pt-5 text-[0.85em] leading-8 space-y-3 ${isDayTime ? 'border-slate-200 text-slate-700' : 'border-white/10 text-slate-300'}`}>
                                        <div>{activeCapability.body}</div>
                                        <div
                                            className={`pt-3 ${isDayTime ? 'border-t border-slate-200 text-slate-600' : 'border-t border-white/10 text-slate-400'}`}>
                                            <span
                                                className="font-semibold">Recommended Deliverables:</span> Architecture
                                            documentation, CI/CD integration guide, monitoring & alerting playbook, SLO
                                            compliance metrics
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {capabilityCards.map((capability, index) => {
                                    const isActive = webIndex === index;
                                    return (
                                        <div key={capability.title}
                                             className={`overflow-hidden rounded-[1.35rem] border transition-all duration-300 ${isActive ? (isDayTime ? 'border-cyan-500/40 bg-white shadow-lg' : 'border-cyan-400/40 bg-white/15 shadow-lg shadow-cyan-500/10') : (isDayTime ? 'border-slate-200/70 bg-white/70 hover:bg-white hover:border-slate-200' : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20')}`}>
                                            <button
                                                onClick={() => toggleWeb(index)}
                                                className={`flex w-full items-start justify-between gap-4 px-4 py-4 text-left sm:px-5 transition-colors ${isActive ? (isDayTime ? 'bg-slate-50' : 'bg-white/5') : ''}`}
                                            >
                                                <div>
                                                    <div
                                                        className={`text-[0.58em] font-[700] uppercase tracking-[0.3em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-300'}`}>
                                                        {capability.eyebrow}
                                                    </div>
                                                    <div
                                                        className={`mt-2 text-[1rem] font-[700] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                                        {capability.title}
                                                    </div>
                                                </div>
                                                {isActive ? (
                                                    <AiFillCaretUp
                                                        className={`mt-1 text-[1.1rem] flex-shrink-0 ${isDayTime ? 'text-cyan-700' : 'text-cyan-300'}`}/>
                                                ) : (
                                                    <AiFillCaretDown
                                                        className={`mt-1 text-[1.1rem] flex-shrink-0 ${isDayTime ? 'text-slate-500' : 'text-slate-400'}`}/>
                                                )}
                                            </button>
                                            {isActive && (
                                                <div
                                                    className={`border-t px-4 py-5 sm:px-5 space-y-4 ${isDayTime ? 'border-slate-200 bg-slate-50/90' : 'border-white/10 bg-black/20'}`}>

                                                    {/* Main Body */}
                                                    <p className={`text-[0.9em] leading-8 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                                        {capability.body}
                                                    </p>

                                                    {/* Execution Insights */}
                                                    <div
                                                        className={`border-t pt-4 ${isDayTime ? 'border-slate-200' : 'border-white/10'}`}>
                                                        <div
                                                            className={`text-[0.7em] uppercase tracking-[0.3em] font-[700] mb-3 ${isDayTime ? 'text-cyan-700' : 'text-cyan-300'}`}>
                                                            📋 Execution Insights
                                                        </div>
                                                        <ul className="mt-3 space-y-2.5">
                                                            {capability.details?.map((detail: string) => (
                                                                <li key={detail} className="flex gap-3">
                                                                    <span
                                                                        className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${isDayTime ? 'bg-cyan-600' : 'bg-cyan-400'}`}/>
                                                                    <span
                                                                        className={`text-[0.82em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                                                        {detail}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Key Benefits */}
                                                    <div
                                                        className={`border-t pt-4 ${isDayTime ? 'border-slate-200' : 'border-white/10'}`}>
                                                        <div
                                                            className={`text-[0.7em] uppercase tracking-[0.3em] font-[700] mb-3 ${isDayTime ? 'text-cyan-700' : 'text-cyan-300'}`}>
                                                            ✓ Business Outcomes
                                                        </div>
                                                        <div className="grid gap-2 sm:grid-cols-3">
                                                            {capability.points?.map((point: string) => (
                                                                <span key={point}
                                                                      className={`rounded-lg px-3 py-2 text-[0.7em] font-[600] uppercase tracking-[0.2em] inline-block ${isDayTime ? 'bg-cyan-50 border border-cyan-200 text-cyan-700' : 'bg-cyan-900/30 border border-cyan-700/30 text-cyan-200'}`}>
                                                                    {point}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enterprise AI Transformation Partnership CTA */}
            <div
                className={`relative overflow-hidden lg:mb-20 mb-16 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                {/* Background FX */}
                <div
                    className={`absolute inset-0 rounded-[2.5rem] border ${isDayTime ? 'border-slate-200/50 bg-gradient-to-br from-slate-50 via-white to-slate-50' : 'border-white/10 bg-gradient-to-br from-slate-950 via-black to-slate-900'}`}/>
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_35%)] rounded-[2.5rem]"/>
                <div className="pointer-events-none absolute -inset-1 gx-scanline rounded-[2.5rem]"/>

                <div className="relative z-10 py-20 lg:py-28 px-6 sm:px-8 lg:px-16">
                    {/* Section Badge */}
                    <div className="mb-8 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"/>
                        <div
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.65em] font-[700] uppercase tracking-[0.35em] ${isDayTime ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-700' : 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200'}`}>
                            <span
                                className={`h-2 w-2 rounded-full ${isDayTime ? 'bg-cyan-600 animate-pulse' : 'bg-cyan-400 animate-pulse'}`}/>
                            Ready to Transform
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"/>
                    </div>

                    {/* Heading with Gradient */}
                    <div className="mb-10 max-w-4xl">
                        <h2 className={`text-[2.2rem] sm:text-[3.2rem] lg:text-[4.2rem] font-[800] leading-[1.05] tracking-tight mb-6 ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                            Your trusted <br className="lg:block md:block hidden"/>
                            <span className="gx-gradient-text">AI development partner</span>
                        </h2>
                        <p className={`text-[0.95em] sm:text-[1em] leading-8 max-w-3xl ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                            We architect and operationalize enterprise-grade AI systems that drive measurable business
                            impact. From predictive analytics and generative intelligence to autonomous automation and
                            intelligent recommendation engines, we combine deep ML expertise with proven production
                            discipline to deliver AI solutions that scale reliably, perform predictably, and remain
                            maintainable for years.
                        </p>
                    </div>

                    {/* Value Propositions Grid */}
                    <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {icon: '⚡', label: 'Production-Ready', desc: 'Immediately deployable solutions'},
                            {icon: '📊', label: 'ROI-Focused', desc: 'Business metrics alignment'},
                            {icon: '🔒', label: 'Enterprise-Grade', desc: 'Compliance & governance included'},
                            {icon: '🚀', label: 'Scalable Architecture', desc: 'Grows with your business'}
                        ].map((prop, idx) => (
                            <div key={idx}
                                 className={`rounded-xl border p-4 ${isDayTime ? 'border-slate-200 bg-white/60' : 'border-white/10 bg-white/5'}`}>
                                <div className="text-2xl mb-2">{prop.icon}</div>
                                <div
                                    className={`text-[0.8em] font-[700] uppercase tracking-[0.2em] mb-1 ${isDayTime ? 'text-cyan-700' : 'text-cyan-300'}`}>{prop.label}</div>
                                <div
                                    className={`text-[0.75em] leading-5 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>{prop.desc}</div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button with Premium Styling */}
                    <div className="mb-16 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <Link href='/contact'>
                            <button
                                className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg px-8 py-4 text-[0.9em] font-[700] uppercase tracking-[0.15em] transition-all duration-300 ${
                                    isDayTime
                                        ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/40 border border-cyan-600/20'
                                        : 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:shadow-lg hover:shadow-cyan-400/40 border border-cyan-400/20'
                                }`}>
                                <span className="relative z-10 flex items-center gap-2">
                                    Initiate AI Transformation
                                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none"
                                         stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                    </svg>
                                </span>
                                <div
                                    className={`absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDayTime ? 'bg-cyan-600' : 'bg-cyan-400'}`}/>
                            </button>
                        </Link>
                        <div className={`text-[0.8em] font-[500] ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                            Or explore our <Link href="#services"><span
                            className={`underline font-[700] cursor-pointer ${isDayTime ? 'text-cyan-700 hover:text-cyan-600' : 'text-cyan-300 hover:text-cyan-200'}`}>AI service capabilities</span></Link>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div
                        className={`relative rounded-xl border-t pt-12 ${isDayTime ? 'border-slate-200' : 'border-white/10'}`}>
                        <div
                            className={`mb-6 text-[0.7em] font-[700] uppercase tracking-[0.3em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-300'}`}>
                            📈 Enterprise Impact Metrics
                        </div>
                        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 lg:gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex flex-col">
                                    <div
                                        className={`mb-3 text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-[800] leading-none ${isDayTime ? 'gx-gradient-text' : 'text-cyan-300'}`}>
                                        <CountUp end={stat.value} duration={2.5} suffix={stat.suffix || ''}/>
                                    </div>
                                    <div
                                        className={`text-[0.85em] font-[700] uppercase tracking-[0.15em] mb-2 ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>
                                        {stat.label}
                                    </div>
                                    <div
                                        className={`text-[0.75em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        {index === 0 && 'Successful AI initiatives launched and operating in production'}
                                        {index === 1 && 'Aggregate value delivered through AI transformation initiatives'}
                                        {index === 2 && 'Cross-functional specialists spanning AI, ML, and Data'}
                                        {index === 3 && 'Years of combined enterprise AI engineering expertise'}
                                        {index === 4 && 'Industries transformed through intelligent automation'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trust Statement */}
                    <div
                        className={`mt-12 rounded-lg border-l-4 pl-6 py-4 ${isDayTime ? 'border-l-cyan-600 bg-cyan-50/50 text-slate-800' : 'border-l-cyan-400 bg-cyan-950/30 text-slate-200'}`}>
                        <p className="text-[0.9em] font-[500] leading-7">
                            <span className="font-[700]">Enterprise Commitment:</span> Every AI solution we deliver
                            comes with comprehensive production readiness assessments, governance frameworks,
                            operational playbooks, and 24/7 technical support—ensuring your AI systems remain reliable,
                            performant, and secure.
                        </p>
                    </div>
                </div>
            </div>

            {/* AI Development Process & Methodology Section - FUTURISTIC, DETAILED */}
            <section className={`relative py-20 lg:py-32 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime} aurora grid/>
                <FxOrbit size={520} top="-120px" right="-160px" opacity={0.08} speed={22}/>
                <FxOrbit size={320} bottom="-80px" left="-100px" opacity={0.06} speed={30} reverse/>

                <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    {/* Section Header */}
                    <div className="max-w-3xl mb-14">
                        <FxChip day={!isDayTime}>AI METHODOLOGY</FxChip>
                        <FxReveal>
                            <h2 className="text-[2.6em] lg:text-[4.2em] font-[800] leading-[1.04] tracking-tight mt-4 mb-4">
                                Intelligent Delivery — <span
                                className="gx-gradient-text">Enterprise-Ready AI Systems</span>
                            </h2>
                        </FxReveal>
                        <FxReveal delay={0.06}>
                            <p className={`text-[1em] lg:text-[1.05em] leading-[1.7] font-[300] ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                A rigorous, science-driven methodology combining deep learning expertise, production
                                engineering, and operational discipline. Each phase includes measurable deliverables,
                                acceptance criteria, and rigorous testing to ensure production-grade AI systems that
                                scale reliably and deliver measurable business outcomes.
                            </p>
                        </FxReveal>
                    </div>

                    {/* Detailed process grid — rich cards */}
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Discovery & Strategy',
                                timeframe: '2–4 weeks',
                                items: ['Executive stakeholder workshops & objective mapping', 'Technical capability assessment & use case prioritization', 'Enterprise data landscape audit with compliance review', 'Detailed ROI modeling, resource estimation & risk assessment'],
                                acceptance: 'Comprehensive AI strategy document, business case with financial projections, prioritized use case roadmap'
                            },
                            {
                                step: '02',
                                title: 'Data Engineering',
                                timeframe: '3–8 weeks',
                                items: ['Enterprise-scale pipeline architecture & infrastructure design', 'Streaming & batch ETL orchestration with SLA guarantees', 'Feature store implementation with point-in-time snapshots', 'Comprehensive data quality monitoring & automated validation'],
                                acceptance: 'Production-grade data infrastructure, feature schemas with versioning, quality assurance reports with SLA metrics'
                            },
                            {
                                step: '03',
                                title: 'Model Research & Development',
                                timeframe: '4–12 weeks',
                                items: ['Rigorous algorithm benchmarking against industry baselines', 'Advanced hyperparameter optimization with AutoML integration', 'Ensemble modeling with cross-validation & stress testing', 'Comprehensive evaluation framework with explainability analysis'],
                                acceptance: 'Validated production models with performance documentation, baseline metrics, methodology documentation with reproducibility guarantees'
                            },
                            {
                                step: '04',
                                title: 'Production Engineering & Deployment',
                                timeframe: '2–6 weeks',
                                items: ['Containerized model deployment with artifact versioning', 'High-performance API endpoints with load balancing', 'Enterprise observability with distributed tracing & alerting', 'CI/CD pipelines with automated governance & policy enforcement'],
                                acceptance: 'Production-ready deployment, real-time dashboards, operational playbooks, SLO documentation'
                            },
                            {
                                step: '05',
                                title: 'Monitoring & Optimization',
                                timeframe: 'Ongoing',
                                items: ['Real-time performance monitoring with anomaly detection', 'Advanced drift detection across statistical & behavioral dimensions', 'Automated retraining pipelines with A/B testing framework', 'Dynamic cost optimization with performance-cost tradeoff analysis'],
                                acceptance: 'Comprehensive SLO framework, optimization reports with business impact, proactive alert system'
                            },
                            {
                                step: '06',
                                title: 'Safety & Governance',
                                timeframe: 'Concurrent',
                                items: ['Rigorous bias & fairness audits across protected attributes', 'Compliance frameworks for GDPR, HIPAA, SOC 2 & industry standards', 'Detailed model cards with risk assessment & mitigation strategies', 'Human-in-loop workflows with escalation procedures'],
                                acceptance: 'Governance playbook with policies & procedures, audit records & attestations, compliance certifications'
                            },
                            {
                                step: '07',
                                title: 'Integration & Handoff',
                                timeframe: '2–4 weeks',
                                items: ['Deep system integration planning with existing enterprise stack', 'Comprehensive technical training with certification programs', 'Detailed knowledge transfer sessions with shadowing', '24/7 support plan with escalation procedures & SLA guarantees'],
                                acceptance: 'Complete technical documentation, trained operations team, support runbook with maintenance procedures'
                            },
                            {
                                step: '08',
                                title: 'Continuous Evolution',
                                timeframe: 'Ongoing',
                                items: ['Quarterly model performance analysis with business impact metrics', 'Systematic capability enhancements based on usage patterns', 'Architecture refinements for improved efficiency & scalability', 'Continuous cost-performance optimization with ROI tracking'],
                                acceptance: 'Quarterly impact reports, optimization roadmap, annual strategy review & capability assessments'
                            }
                        ].map((c, idx) => (
                            <FxReveal key={c.step} delay={0.06 + idx * 0.06}>
                                <div
                                    className={`relative p-6 rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl ${isDayTime ? 'bg-white/95 text-black border-slate-100' : 'bg-white/6 text-white border-white/8'}`}>

                                    {/* ambient glow */}
                                    <div className="absolute inset-0 pointer-events-none rounded-2xl"
                                         style={{boxShadow: isDayTime ? '0 30px 80px rgba(14,165,233,0.04)' : '0 40px 120px rgba(2,6,23,0.6)'}}/>

                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-[0.9em] font-mono text-slate-400">{c.step}</div>
                                            <h3 className="mt-3 text-[1.35em] font-[700] leading-[1.05]">{c.title}</h3>
                                            <div
                                                className={`mt-2 text-xs font-semibold ${isDayTime ? 'text-slate-600' : 'text-white/70'}`}>{c.timeframe}</div>
                                        </div>
                                        <div className="hidden lg:flex flex-col items-end gap-2">
                                            <div
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${isDayTime ? 'bg-slate-50 text-slate-700' : 'bg-white/6 text-white/80'} border ${isDayTime ? 'border-slate-100' : 'border-white/8'}`}>Deliverables
                                            </div>
                                            <div
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${isDayTime ? 'bg-slate-50 text-slate-700' : 'bg-white/6 text-white/80'} border ${isDayTime ? 'border-slate-100' : 'border-white/8'}`}>Outcomes
                                            </div>
                                        </div>
                                    </div>

                                    <p className={`mt-4 text-[0.95em] font-[300] leading-[1.6] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>{c.acceptance}</p>

                                    <div className="mt-4 grid gap-2">
                                        {c.items.map((it) => (
                                            <div key={it}
                                                 className={`flex items-center gap-3 text-sm ${isDayTime ? 'text-slate-600' : 'text-white/70'}`}>
                                                <div
                                                    className={`w-2 h-2 rounded-full ${isDayTime ? 'bg-cyan-400' : 'bg-teal-300'}`}/>
                                                <div className="truncate">{it}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 flex items-center justify-between">
                                        <div className="text-[0.85em] font-[500] text-slate-400">Acceptance</div>
                                        <div
                                            className="text-[0.9em] font-extrabold gx-gradient-text">{c.acceptance.split(',')[0]}</div>
                                    </div>

                                    <div
                                        className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
                                        style={{background: isDayTime ? 'radial-gradient(circle,#7dd3fc,transparent)' : 'radial-gradient(circle,#0891b2,transparent)'}}/>
                                </div>
                            </FxReveal>
                        ))}
                    </div>

                    {/* Horizontal KPI strip */}
                    <FxReveal delay={0.4}>
                        <div
                            className={`mt-10 p-6 rounded-2xl backdrop-blur-md border ${isDayTime ? 'bg-white/5 border-teal-400/20' : 'bg-black/5 border-teal-700/20'}`}>
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                                {[{
                                    val: 'Rigorous Testing',
                                    label: 'Multi-phase validation with comprehensive benchmarking'
                                }, {
                                    val: 'MLOps Integrated',
                                    label: 'Automated governance with policy enforcement'
                                }, {
                                    val: 'Compliance Ready',
                                    label: 'Enterprise-grade security & regulatory adherence'
                                }, {
                                    val: 'Continuous Evolution',
                                    label: 'Quarterly optimization & capability growth'
                                }].map((s, i) => (
                                    <div key={i} className="text-center lg:text-left">
                                        <div className="text-[1.6em] font-[800] gx-gradient-text mb-1">{s.val}</div>
                                        <div
                                            className={`text-[0.78em] font-[600] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FxReveal>

                    {/* CTA */}
                    <FxReveal delay={0.52}>
                        <div
                            className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div>
                                <h4 className={`text-[1.05em] font-[700] ${isDayTime ? 'text-gray-800' : 'text-white/90'}`}>Ready
                                    for enterprise-grade AI delivery?</h4>
                                <p className={`text-[0.95em] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>Our
                                    proven methodology ensures scalable, secure, and production-ready AI systems with
                                    measurable ROI. Start your transformation today.</p>
                            </div>
                            <Link href='/contact'>
                                <button
                                    className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-[0.85em] font-[700] uppercase tracking-[0.1em] transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                                        isDayTime
                                            ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/40 border border-cyan-600/20'
                                            : 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:shadow-lg hover:shadow-cyan-400/40 border border-cyan-400/20'
                                    }`}>
                                    <span className="relative z-10">Start Discovery</span>
                                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none"
                                         stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/* Strategic Showcase - Premium Visual */}
            <section id={'last-image'} className={`relative w-full h-[420px] sm:h-[520px] md:h-[640px] lg:h-[760px] overflow-hidden ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                {/* Base media */}
                <Image
                    src={'/assets/ads/scal.jpg'}
                    alt={'Strategic AI Showcase'}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Ambient overlays & FX */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 mix-blend-multiply" />
                    <FxOrbit size={420} top="6%" left="-12%" opacity={0.08} speed={36} />
                    <FxOrbit size={220} bottom="6%" right="-8%" opacity={0.06} speed={48} reverse />
                </div>

                {/* Center content */}
                <div className="relative z-20 max-w-7xl mx-auto h-full px-6 sm:px-8 flex flex-col justify-center lg:items-center lg:text-center">
                    <FxReveal>
                        <div className={`inline-flex items-center rounded-full px-3 py-1 text-[0.62em] font-[600] uppercase tracking-[0.35em] ${isDayTime ? 'bg-cyan-50 text-cyan-700 border border-cyan-200/30' : 'bg-cyan-900/20 text-cyan-200 border border-cyan-400/20'}`}>
                            Strategic Showcase
                        </div>
                    </FxReveal>

                    <FxReveal delay={0.06}>
                        <h2 className={`mt-6 text-[1.6rem] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[4rem] font-[800] leading-tight tracking-tight ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                            Production-Ready AI, Designed for Impact
                        </h2>
                    </FxReveal>

                    <FxReveal delay={0.12}>
                        <p className={`mt-4 max-w-3xl text-[0.98em] md:text-[1.05em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                            Rapid prototyping to robust production delivery — low-latency inference, secure data flows, and measurable product outcomes. We combine product-first engineering with rigorous MLOps to move ideas into value.
                        </p>
                    </FxReveal>

                    <FxReveal delay={0.18}>
                        <div className="mt-6 flex flex-wrap gap-3 justify-center">
                            <Link href="/contact" className={`inline-flex items-center px-6 py-3 rounded-md font-semibold shadow transition ${isDayTime ? 'bg-cyan-600 text-white' : 'bg-cyan-400 text-black'}`}>
                                Get Started
                            </Link>
                            <Link href="#services" className="inline-flex items-center px-5 py-3 border border-white/20 text-white rounded-md">
                                View Services
                            </Link>
                        </div>
                    </FxReveal>
                </div>

                {/* Bottom-left KPI strip */}
                <div className="absolute left-6 bottom-6 z-30 grid grid-cols-3 gap-3">
                    <FxReveal>
                        <div className={`p-3 rounded-xl ${isDayTime ? 'bg-white/90 text-slate-900' : 'bg-white/8 text-white'}`}>
                            <div className="text-lg font-bold gx-gradient-text">50+</div>
                            <div className="text-[0.7em]">AI Projects</div>
                        </div>
                    </FxReveal>
                    <FxReveal delay={0.04}>
                        <div className={`p-3 rounded-xl ${isDayTime ? 'bg-white/90 text-slate-900' : 'bg-white/8 text-white'}`}>
                            <div className="text-lg font-bold gx-gradient-text">99%</div>
                            <div className="text-[0.7em]">On-Time Delivery</div>
                        </div>
                    </FxReveal>
                    <FxReveal delay={0.08}>
                        <div className={`p-3 rounded-xl ${isDayTime ? 'bg-white/90 text-slate-900' : 'bg-white/8 text-white'}`}>
                            <div className="text-lg font-bold gx-gradient-text">12+</div>
                            <div className="text-[0.7em]">Clients</div>
                        </div>
                    </FxReveal>
                </div>

                {/* Decorative scanline / noise for futurism */}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.02) 0 1px, transparent 1px 6px)] mix-blend-overlay opacity-10" />
            </section>

            {/* Why Grey InfoTech - Premium Enterprise AI Partnership */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'} relative overflow-hidden`}>
                <div
                    className={`relative mx-auto w-full max-w-full px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] lg:pt-[8em] lg:pb-[8em] md:pt-[6em] md:pb-[6em] pt-[3em] pb-[3em]`}>
                    {/* Multi-Layer Background Effects */}
                    <FxBackground day={isDayTime}/>
                    <FxOrbit size={380} top="5%" left="-18%" opacity={0.12} speed={35}/>
                    <FxOrbit size={240} bottom="8%" right="-12%" opacity={0.08} speed={55} reverse/>
                    <FxOrbit size={180} top="45%" right="-8%" opacity={0.06} speed={60}/>

                    {/* Premium gradient overlay */}
                    <div
                        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(45,212,191,0.03),transparent_40%)]"/>
                    <div
                        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.02),transparent_35%)]"/>

                    {/* Executive Section Header */}
                    <div className="mb-24 relative z-10">
                        <FxReveal>
                            <div className="flex items-center gap-3 mb-6">
                                <FxChip day={!isDayTime}>ENTERPRISE PARTNERSHIP EXCELLENCE</FxChip>
                                <div
                                    className={`text-[0.7em] uppercase tracking-[0.35em] font-bold px-3 py-1 rounded-full ${
                                        isDayTime
                                            ? 'bg-emerald-100/60 text-emerald-700 border border-emerald-200/50'
                                            : 'bg-emerald-900/40 text-emerald-300 border border-emerald-400/20'
                                    }`}>
                                    Industry-Leading Track Record
                                </div>
                            </div>
                        </FxReveal>
                        <FxReveal delay={0.05}>
                            <h2 className={`text-[3.2em] lg:text-[5.2em] font-[900] leading-[1.02] tracking-tight mt-6 mb-8 ${
                                isDayTime ? 'text-slate-950' : 'text-white'
                            }`}>
                                Why <span className="gx-gradient-text">Enterprise & Scale</span><br
                                className="hidden lg:block"/>
                                Choose Grey InfoTech
                            </h2>
                        </FxReveal>
                        <FxReveal delay={0.1}>
                            <p className={`text-[1.18em] lg:text-[1.35em] leading-9 max-w-4xl font-[500] ${
                                isDayTime ? 'text-slate-700' : 'text-slate-200'
                            }`}>
                                We've built production AI systems for high-growth startups and scaling enterprises. Our
                                engineers move fast with rigor—delivering robust, observable, and cost-efficient
                                platforms that translate ML research into measurable product value.
                            </p>
                        </FxReveal>

                        {/* Trust Metrics Bar */}
                        <FxReveal delay={0.15}>
                            <div className={`mt-8 flex flex-wrap gap-6 lg:gap-8 py-6 border-t border-b ${
                                isDayTime ? 'border-slate-200' : 'border-white/10'
                            }`}>
                                <div>
                                    <div className="text-[2em] lg:text-[2.5em] font-bold gx-gradient-text">20+</div>
                                    <div
                                        className={`text-[0.85em] font-semibold tracking-wide ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>Pilot
                                        Projects
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[2em] lg:text-[2.5em] font-bold gx-gradient-text">98%</div>
                                    <div
                                        className={`text-[0.85em] font-semibold tracking-wide ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>Sprint
                                        Delivery Rate
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[2em] lg:text-[2.5em] font-bold gx-gradient-text">12+</div>
                                    <div
                                        className={`text-[0.85em] font-semibold tracking-wide ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>Paying
                                        Clients
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[2em] lg:text-[2.5em] font-bold gx-gradient-text">10+</div>
                                    <div
                                        className={`text-[0.85em] font-semibold tracking-wide ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>Years
                                        of Founding Experience
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>

                    {/* Three-Column Strategic Deep-Dive */}
                    <div
                        className='relative grid lg:grid-cols-[1fr_1fr_1fr] md:grid-cols-1 grid-cols-1 lg:gap-28 gap-16 mb-48'>
                        {/* Left: Premium Interactive Capability Stack */}
                        <div className={`relative space-y-4 flex flex-col justify-start`}>
                            <FxReveal delay={0.2}>
                                <div
                                    className={`mb-10 text-[0.75em] uppercase tracking-[0.4em] font-bold ${isDayTime ? 'text-cyan-700' : 'text-cyan-300'}`}>
                                    ━━━ CORE STRATEGIC COMPETENCIES
                                </div>
                            </FxReveal>

                            {reasons.map((reason, index) => (
                                <FxReveal key={reason.id} delay={0.25 + index * 0.08}>
                                    <div className="relative group">
                                        <motion.button
                                            onClick={() => setActiveIndex(index + 1)}
                                            className={`w-full text-left rounded-3xl border transition-all duration-300 p-8 sm:p-9 overflow-hidden group/btn ${
                                                index + 1 === activeIndex
                                                    ? isDayTime
                                                        ? 'border-cyan-400/50 bg-gradient-to-br from-cyan-50/95 via-white/50 to-cyan-50/40 shadow-2xl shadow-cyan-500/30'
                                                        : 'border-cyan-400/50 bg-gradient-to-br from-cyan-950/60 via-slate-950/40 to-cyan-900/30 shadow-2xl shadow-cyan-400/30'
                                                    : isDayTime
                                                        ? 'border-slate-200/80 bg-gradient-to-br from-white/90 to-slate-50/50 hover:border-cyan-300/40 hover:bg-white/98 hover:shadow-lg'
                                                        : 'border-white/15 bg-gradient-to-br from-white/10 to-white/3 hover:border-cyan-400/45 hover:bg-white/22 hover:shadow-xl hover:shadow-cyan-400/12'
                                            }`}
                                            whileHover={{y: -4, transition: {duration: 0.22}}}
                                            transition={{duration: 0.32}}
                                        >
                                            {/* Animated background gradient on hover */}
                                            <div
                                                className={`absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ${
                                                    isDayTime
                                                        ? 'bg-gradient-to-r from-cyan-100/0 via-cyan-50/20 to-cyan-100/0'
                                                        : 'bg-gradient-to-r from-cyan-950/0 via-cyan-400/10 to-cyan-950/0'
                                                }`}/>

                                            <div className="relative z-10 flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div
                                                        className={`text-[0.65em] uppercase tracking-[0.3em] font-bold mb-3 transition-colors duration-300 ${
                                                            index + 1 === activeIndex
                                                                ? isDayTime ? 'text-cyan-700' : 'text-cyan-300'
                                                                : isDayTime ? 'text-slate-500' : 'text-slate-400'
                                                        }`}>
                                                        Strategic Pillar {index + 1}
                                                    </div>
                                                    <h3 className={`text-[1.3em] lg:text-[1.45em] font-[800] leading-[1.12] transition-colors duration-300 ${
                                                        index + 1 === activeIndex
                                                            ? isDayTime ? 'text-slate-900' : 'text-white'
                                                            : isDayTime ? 'text-slate-700' : 'text-slate-300'
                                                    }`}>
                                                        {reason.title}
                                                    </h3>
                                                    <p className={`mt-2 text-[0.85em] leading-5 line-clamp-2 transition-colors duration-300 ${
                                                        index + 1 === activeIndex
                                                            ? isDayTime ? 'text-slate-600' : 'text-slate-400'
                                                            : isDayTime ? 'text-slate-500' : 'text-slate-500'
                                                    }`}>
                                                        {(typeof reason.description === 'string' ? reason.description : reason.title).slice(0, 80)}...
                                                    </p>
                                                </div>
                                                <div
                                                    className={`mt-2 flex-shrink-0 text-[1.5em] transition-all duration-300 ${
                                                        index + 1 === activeIndex ? 'scale-125 rotate-180' : 'group-hover/btn:scale-110'
                                                    }`}>
                                                    {index + 1 === activeIndex ? '▲' : '▼'}
                                                </div>
                                            </div>
                                        </motion.button>

                                        {/* Expandable Premium Content */}
                                        <AnimatePresence mode="wait">
                                            {index + 1 === activeIndex && (
                                                <motion.div
                                                    key={reason.id}
                                                    initial={{opacity: 0, height: 0, marginTop: 0}}
                                                    animate={{opacity: 1, height: "auto", marginTop: 16}}
                                                    exit={{opacity: 0, height: 0, marginTop: 0}}
                                                    transition={{duration: 0.5, ease: "easeInOut"}}
                                                    className={`overflow-hidden rounded-xl border-t ${isDayTime ? 'border-cyan-200/40' : 'border-cyan-400/25'}`}
                                                >
                                                    <div className={`px-6 sm:px-7 py-8 space-y-8 ${
                                                        isDayTime ? 'bg-gradient-to-b from-cyan-50/60 to-white/40' : 'bg-gradient-to-b from-cyan-950/30 to-black/60'
                                                    }`}>
                                                        {/* Full Professional Description */}
                                                        <div>
                                                            <h4 className={`text-[0.75em] uppercase tracking-[0.3em] font-bold mb-3 ${isDayTime ? 'text-cyan-700' : 'text-cyan-300'}`}>
                                                                COMPREHENSIVE OVERVIEW
                                                            </h4>
                                                            <p className={`text-[0.96em] leading-8 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                                                {reason.description}
                                                            </p>
                                                        </div>

                                                        {/* Advanced Technical Specifications */}
                                                        <div className="pt-4 border-t"
                                                             style={{borderColor: isDayTime ? 'rgba(51, 65, 85, 0.15)' : 'rgba(255, 255, 255, 0.08)'}}>
                                                            <h4 className={`text-[0.75em] uppercase tracking-[0.3em] font-bold mb-4 ${isDayTime ? 'text-cyan-700' : 'text-cyan-300'}`}>
                                                                ⚙️ TECHNICAL EXCELLENCE MARKERS
                                                            </h4>
                                                            <div className="space-y-3">
                                                                {                                                                [
                                                                    index === 0 && "Production-ready architecture and secure deployments",
                                                                    index === 0 && "Operational SLAs and monitoring",
                                                                    index === 1 && "Safe rollout patterns and performance tuning",
                                                                    index === 1 && "Cost-aware infrastructure choices",
                                                                    index === 2 && "Stakeholder alignment and measurable KPIs",
                                                                    index === 3 && "Modular, API-first architectures for scale",
                                                                    index === 4 && "Reliable integrations and simple data pipelines"
                                                                ].filter(Boolean).map((point, idx) => (
                                                                    <motion.div
                                                                        key={idx}
                                                                        initial={{opacity: 0, x: -10}}
                                                                        animate={{opacity: 1, x: 0}}
                                                                        transition={{delay: idx * 0.05, duration: 0.3}}
                                                                        className="flex gap-3 group/point"
                                                                    >
                                                                        <div
                                                                            className={`mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0 transition-transform group-hover/point:scale-125 ${isDayTime ? 'bg-cyan-600' : 'bg-cyan-400'}`}/>
                                                                        <p className={`text-[0.92em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                                                            {point}
                                                                        </p>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Premium Enterprise Outcomes */}
                                                        <div className="pt-4 border-t"
                                                             style={{borderColor: isDayTime ? 'rgba(51, 65, 85, 0.15)' : 'rgba(255, 255, 255, 0.08)'}}>
                                                            <div
                                                                className={`text-[0.75em] uppercase tracking-[0.3em] font-bold mb-4 flex items-center gap-2 ${isDayTime ? 'text-emerald-700' : 'text-emerald-300'}`}>
                                                                <span>✓</span> ENTERPRISE OUTCOME GUARANTEE
                                                            </div>
                                                            <p className={`text-[0.95em] leading-8 font-[500] ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                                                {index === 0 && '→ Lower risk and faster time-to-market.'}
                                                                {index === 1 && '→ Reduced costs and better performance.'}
                                                                {index === 2 && '→ Aligned teams and clearer product focus.'}
                                                                {index === 3 && '→ Smooth, reliable scaling.'}
                                                                {index === 4 && '→ Connected data for faster decisions.'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </FxReveal>
                            ))}
                        </div>

                        {/* Center: Premium Visual + Advanced Metrics */}
                        <div className='lg:sticky lg:top-32 h-fit'>
                            <div className={`relative rounded-2xl overflow-hidden border p-6 sm:p-8 ${
                                isDayTime
                                    ? 'border-slate-200 bg-gradient-to-br from-slate-50/80 to-white'
                                    : 'border-white/10 bg-gradient-to-br from-white/5 to-white/2'
                            }`}>
                                {/* Radiant Gradient Background */}
                                <div
                                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.15),transparent_65%)]"/>
                                <div
                                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_50%)]"/>

                                {/* Image Showcase */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{opacity: 0, scale: 0.96}}
                                        animate={{opacity: 1, scale: 1}}
                                        exit={{opacity: 0, scale: 0.96}}
                                        transition={{duration: 0.6, ease: "easeInOut"}}
                                        className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl"
                                    >
                                        {reasons[activeIndex - 1]?.images?.[0] && (
                                            <Image
                                                src={reasons[activeIndex - 1]?.images?.[0]}
                                                alt={`${reasons[activeIndex - 1]?.title} Showcase`}
                                                fill
                                                className="object-cover rounded-xl"
                                                priority
                                            />
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                {/* KPI Metrics Below Image */}
                                <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
                                    <FxReveal>
                                        <div className={`p-5 rounded-lg border ${
                                            isDayTime
                                                ? 'border-slate-200 bg-white/80'
                                                : 'border-white/10 bg-white/5'
                                        }`}>
                                            <div className="text-[2em] font-bold gx-gradient-text">18+</div>
                                            <div
                                                className={`text-[0.8em] font-semibold mt-1 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>Enterprise
                                                Clients
                                            </div>
                                        </div>
                                    </FxReveal>
                                    <FxReveal delay={0.08}>
                                        <div className={`p-5 rounded-lg border ${
                                            isDayTime
                                                ? 'border-slate-200 bg-white/80'
                                                : 'border-white/10 bg-white/5'
                                        }`}>
                                            <div className="text-[2em] font-bold gx-gradient-text">99%</div>
                                            <div
                                                className={`text-[0.8em] font-semibold mt-1 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>Project
                                                Success
                                            </div>
                                        </div>
                                    </FxReveal>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final Premium CTA Section */}
                    <FxReveal delay={0.3}>
                        <div className={`relative rounded-3xl border overflow-hidden p-8 lg:p-16 text-center ${
                            isDayTime
                                ? 'border-cyan-400/20 bg-gradient-to-b from-cyan-50/60 to-white'
                                : 'border-cyan-400/20 bg-gradient-to-b from-cyan-950/30 to-black'
                        }`}>
                            {/* Decorative elements */}
                            <div
                                className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(45,212,191,0.08),transparent_70%)]"/>
                            <div className="pointer-events-none absolute inset-0 border border-white/5 rounded-3xl"/>

                            <div className="relative z-10">
                                <FxChip day={!isDayTime}>NEXT STEPS</FxChip>

                                <h2 className={`text-[3em] lg:text-[4.4em] font-[800] leading-[1.05] mt-6 mb-6 ${
                                    isDayTime ? 'text-slate-900' : 'text-white'
                                }`}>
                                    Ready to <span className="gx-gradient-text">Build Your AI Future</span>?
                                </h2>

                                <p className={`text-[1.05em] lg:text-[1.3em] leading-8 mb-10 max-w-3xl mx-auto ${
                                    isDayTime ? 'text-slate-700' : 'text-slate-300'
                                }`}>
                                    Let's explore how Grey InfoTech's rapid delivery model can unlock measurable product
                                    value quickly for your startup. Schedule a confidential consultation with our
                                    leadership team today.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <Link href='/contact'>
                                        <motion.button
                                            whileHover={{scale: 1.05}}
                                            whileTap={{scale: 0.98}}
                                            className={isDayTime ? 'inline-flex items-center gap-3 px-10 py-5 rounded-lg text-[1em] font-[800] uppercase tracking-[0.12em] transition-all duration-300 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white hover:shadow-2xl hover:shadow-cyan-500/45 border border-cyan-600/20' : 'inline-flex items-center gap-3 px-10 py-5 rounded-lg text-[1em] font-[800] uppercase tracking-[0.12em] transition-all duration-300 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:shadow-2xl hover:shadow-cyan-400/45 border border-cyan-400/20'}
                                        >
                                            Schedule Consultation
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                            </svg>
                                        </motion.button>
                                    </Link>
                                    <motion.button
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.98}}
                                        className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg text-[0.95em] font-[700] uppercase tracking-[0.12em] transition-all duration-300 ${
                                            isDayTime
                                                ? 'border-2 border-slate-900/20 text-slate-900 hover:bg-slate-900/5'
                                                : 'border-2 border-white/20 text-white hover:bg-white/5'
                                        }`}
                                    >
                                        View Case Studies
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 5l7 7-7 7"/>
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </FxReveal>
                </div>
            </div>
        </div>
    );
};

export default AiDevelopmentServices;

