'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import {FaArrowLeft, FaCheckCircle, FaProjectDiagram} from 'react-icons/fa';

interface CaseStudyDetails {
    slug: string;
    title: string;
    client: string;
    industry: string;
    summary: string;
    body: string;
    image: string;
    results: string;
    services?: string[];
    techStack?: string[];
    challenge?: string;
    approach?: string;
    solution?: string;
}

const CaseStudyArticle = () => {
    const router = useRouter();
    const {slug} = router.query;
    const [isDayTime, setIsDayTime] = useState(true);
    const [study, setStudy] = useState<CaseStudyDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const updateThemeByTime = () => {
            const hour = new Date().getHours();
            setIsDayTime(hour >= 6 && hour < 18);
        };
        updateThemeByTime();
        const intervalId = setInterval(updateThemeByTime, 60_000);
        return () => clearInterval(intervalId);
    }, []);

    const staticStudies: Record<string, CaseStudyDetails> = {
        'healthcare-transformation': {
            slug: 'healthcare-transformation',
            title: 'Healthcare Platform Transformation',
            client: 'Clinify Health PLC',
            industry: 'Healthcare / Biotechnology / SaaS',
            summary: 'How we re-engineered legacy appointment booking flows to achieve rapid user adoption.',
            body: 'Clinify Health faced critical system timeouts. By rewriting booking routes, migrating queries into modern multi-index setups and implementing precise UI feedback, we created an optimal patient booking workflow.',
            image: '/assets/ui-ux/hero.jpg',
            results: '68% faster bookings, 40% reduction in support calls',
            services: ['Product Strategy', 'UI/UX Redesign', 'State Management Integration', 'QA Automation Testing'],
            techStack: ['React', 'NextJS App Router', 'Tailwind', 'PostgreSQL', 'Framer Motion'],
            challenge: 'Legacy calendar APIs loaded entire customer portfolios simultaneously. When slots crossed timezone segments, synchronization stalled, triggering redundant calls and database locks.',
            approach: 'Our digital strategy team analyzed user dropoffs. We built clean infinite scrolling, cached timezone buckets locally in the patient browser, and restructured API payloads to strictly query active weeks.',
            solution: 'Created custom schedule synthesizers with responsive web indicators. Leveraged Server-Sent Events to push slot updates instantly, resulting in fluid bookings and eliminating duplicate billing alerts.',
        },
        'logistics-dashboard': {
            slug: 'logistics-dashboard',
            title: 'Logistics Command Center Optimization',
            client: 'Sendcargo Ltd',
            industry: 'Logistics / Supply Chain / Cloud',
            summary: 'Designing a real-time tracking suite to optimize driver schedules and fuel economics.',
            body: 'An enterprise control dashboard coordinating fleet vehicles real-time. Integrating GPS APIs and route planners on top of robust multi-tenant web layouts.',
            image: '/assets/node/hero.jpg',
            results: '24% mileage savings, 99.4% on-time dispatches',
            services: ['System Architecture', 'API Development', 'Real-time WebSocket maps', 'Cloud Optimization'],
            techStack: ['Node.js', 'Express', 'D3.js maps', 'Redis', 'AWS Cloud architecture'],
            challenge: 'Dispatch agents loaded up to seven distinct platform tabs simultaneously to compare vehicle progress, weather, traffic, and order status, resulting in highly slow, error-prone operations.',
            approach: 'Built a consolidated dashboard displaying multiple layers of cartography in real time, leveraging React Context for map triggers and custom worker threads to run route calculations.',
            solution: 'Developed custom dispatch monitors. Introduced pathfinding routing algorithms that dynamically push alternate routes to drivers, with status maps auto-rendered on server side for instant delivery.',
        },
        'fintech-launch': {
            slug: 'fintech-launch',
            title: 'Fintech Product & Payment Rails Launch',
            client: 'NaijaPay Co',
            industry: 'Fintech / Financial Services / Security',
            summary: 'Deploying highly secure banking layers and microservices within a strict 6-week window.',
            body: 'A digital banking solution crafted to empower local vendor networks. It required high security levels, custom API integrations with Central Bank directories, and reliable core ledger accounts.',
            image: '/assets/mvp/start.jpg',
            results: '₦400M processed weekly, 0.01% transaction error rate',
            services: ['Payment Rails Integration', 'Security Audits', 'Infrastructure provisioning', 'Backoffice UI'],
            techStack: ['TypeScript', 'Kubernetes', 'PCI-DSS Compliant servers', 'Docker', 'SQLite'],
            challenge: 'Strict compliance regulations required robust, isolated processing networks, while the vendor network demanded near-zero latency payouts on extremely weak mobile network bounds.',
            approach: 'We stripped payload headers to minimize overhead, used encrypted local databases for temporary offline transactions, and structured secure proxy API routes to prevent key leakage.',
            solution: 'Implemented micro-ledgers with automatic reconciliation. Audited every security touchpoint to gain licensing approval inside record time, launching smoothly across target jurisdictions.',
        },
        'education-expansion': {
            slug: 'education-expansion',
            title: 'EduTech High-Traffic Platform Expansion',
            client: 'SkillVerse Nigeria',
            industry: 'Education / Web Development',
            summary: 'Scaling streaming backend servers to handle heavy concurrent video cohorts smoothly.',
            body: 'How we optimized high-volume live video feeds for interactive online instruction, integrating low-latency chats and dynamic progress dashboards.',
            image: '/assets/startup/market.jpg',
            results: '120k concurrent streams, 0.5s initial page loads',
            services: ['High Concurrent scaling', 'Database sharding', 'CDN edge caching', 'Interactive UI Design'],
            techStack: ['Next.js', 'GraphQL', 'AWS CloudFront', 'HLS Live Streaming', 'Vercel Edge'],
            challenge: 'Sudden surges of 40,000+ school students accessing synchronous virtual classrooms at top of the hour crashed authentication services and degraded stream qualities to unviewable resolution.',
            approach: 'Restructured the authentication logic into Edge Middlewares to bypass central database lookups. Configured caching matrices directly at edge servers for asset files.',
            solution: 'Leveraged low-latency HLS distributions and implemented staggered queue loaders. Instructors can now broadcast in premium visual crispness while auto-syncing notes reliably.',
        }
    };

    useEffect(() => {
        if (!slug || typeof slug !== 'string') return;
        setIsLoading(true);

        const fetchStudy = async () => {
            try {
                const res = await fetch('/admin/api/case-studies');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && Array.isArray(data.data)) {
                        const matchedDb = data.data.find((c: any) => c.slug === slug);
                        if (matchedDb) {
                            setStudy({
                                slug: matchedDb.slug,
                                title: matchedDb.title,
                                client: matchedDb.client || 'Client Partner',
                                industry: matchedDb.industry || 'Technology Solutions',
                                summary: matchedDb.summary || '',
                                body: matchedDb.body || '',
                                image: matchedDb.image || '/assets/mvp/start.jpg',
                                results: matchedDb.results || 'Milestone achieved.',
                                services: ['Custom Engineering', 'System Auditing', 'Digital Strategy'],
                                techStack: ['React', 'Enterprise Database', 'Modern Web Framework'],
                                challenge: 'The client approached us with a set of critical, high-friction operational bottlenecks preventing reliable scalability.',
                                approach: 'Our strategy and development team deployed in-depth workflow audits, identified database locks, and designed highly specific solutions.',
                                solution: matchedDb.body || 'Implemented highly scalable digital workflows incorporating modern interactive cards, reduced memory consumption, and advanced APIs.',
                            });
                            setIsLoading(false);
                            return;
                        }
                    }
                }
            } catch (err) {
                console.error('Failed to query DB for slug:', err);
            }

            const foundStatic = staticStudies[slug];
            if (foundStatic) {
                setStudy(foundStatic);
            } else {
                setStudy(null);
            }
            setIsLoading(false);
        };

        fetchStudy();
    }, [slug]);

    if (isLoading) {
        return (
            <div
                className={`${isDayTime ? 'bg-white text-black' : 'bg-black text-white'} min-h-screen flex flex-col justify-between transition-colors`}>
                <Header/>
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-sm font-semibold tracking-wider text-zinc-500 uppercase animate-pulse">Loading
                        study details...</p>
                </div>
                <Footer/>
            </div>
        );
    }

    if (!study) {
        return (
            <div
                className={`${isDayTime ? 'bg-white text-black' : 'bg-black text-white'} min-h-screen flex flex-col justify-between transition-colors`}>
                <Header/>
                <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">Case Study Not Found</h2>
                    <p className="text-zinc-500 max-w-sm mb-6 text-sm">We couldn't locate the specified case study.</p>
                    <Link href="/case-studies"
                          className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-600 text-white">
                        Browse All Case Studies
                    </Link>
                </div>
                <Footer/>
            </div>
        );
    }

    const themeBg = isDayTime ? 'bg-[#fcfbf9] text-[#121212]' : 'bg-[#0f0e0c] text-[#f7f5f0]';
    const cellBg = isDayTime ? 'bg-[#f4f2ee]' : 'bg-[#181613]';
    const sectionBorder = isDayTime ? 'border-zinc-200' : 'border-zinc-800/80';

    return (
        <div className={`min-h-screen ${themeBg} transition-colors duration-500 font-sans flex flex-col`}>
            <Header/>

            <div className={`pt-28 pb-4 border-b ${sectionBorder}`}>
                <div className="max-w-6xl mx-auto px-6">
                    <Link href="/case-studies"
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#14b8a6] hover:text-[#119e8e] transition-colors">
                        <FaArrowLeft/> Back to Case Studies
                    </Link>
                </div>
            </div>

            <section className="py-12 lg:py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
                        <div>
                            <span className="text-teal-600 text-xs font-bold uppercase tracking-wider block mb-3">
                                Case Study • {study.industry}
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.12]">
                                {study.title}
                            </h1>
                            <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-500 font-normal">
                                {study.summary}
                            </p>
                        </div>

                        <div className={`p-6 sm:p-8 rounded-3xl ${cellBg} border ${sectionBorder}`}>
                            <h4 className="text-sm font-extrabold pb-3 uppercase tracking-wider border-b border-zinc-500/15 mb-4 flex items-center gap-2">
                                <FaProjectDiagram className="text-teal-500"/> Project Metadata
                            </h4>
                            <div className="space-y-4 text-xs font-medium">
                                <div className="grid grid-cols-3">
                                    <span className="text-zinc-500">CLIENT</span>
                                    <span className="col-span-2 text-right font-bold">{study.client}</span>
                                </div>
                                <div className="grid grid-cols-3">
                                    <span className="text-zinc-500">INDUSTRY</span>
                                    <span className="col-span-2 text-right font-bold">{study.industry}</span>
                                </div>
                                {study.services && (
                                    <div className="grid grid-cols-3 border-t border-zinc-500/10 pt-4">
                                        <span className="text-zinc-500">SERVICES</span>
                                        <div className="col-span-2 text-right flex flex-col gap-1">
                                            {study.services.map((serv, i) => (
                                                <span key={i}
                                                      className="text-xs text-teal-600 dark:text-teal-400 font-bold">{serv}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {study.techStack && (
                                    <div className="grid grid-cols-3 border-t border-zinc-500/10 pt-4">
                                        <span className="text-zinc-500">STACK</span>
                                        <div className="col-span-2 text-right flex flex-wrap gap-1 justify-end">
                                            {study.techStack.map((stack, i) => (
                                                <span key={i}
                                                      className="inline-block px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 font-bold text-[9px] uppercase tracking-wide">{stack}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 w-full mb-12 lg:mb-20">
                <div
                    className={`relative h-[300px] sm:h-[450px] md:h-[550px] lg:h-[650px] rounded-[2.5rem] overflow-hidden border ${sectionBorder}`}>
                    <Image
                        src={study.image}
                        alt={`${study.title} Presentation`}
                        fill
                        priority
                        referrerPolicy="no-referrer"
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>
            </section>

            <section className="pb-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-14">
                        <div
                            className={`p-8 rounded-3xl ${isDayTime ? 'bg-zinc-50' : 'bg-[#131210]'} border ${sectionBorder}`}>
                            <span
                                className="text-teal-600 font-extrabold uppercase tracking-widest text-[10px] block mb-3">01 / Structural Challenge</span>
                            <h3 className="text-lg font-bold mb-4">The Challenge</h3>
                            <p className="text-sm leading-relaxed text-zinc-500">
                                {study.challenge || "The existing workflows suffered from high structural debt, slow UI feedback, and bottlenecks preventing reliable scaling."}
                            </p>
                        </div>

                        <div
                            className={`p-8 rounded-3xl ${isDayTime ? 'bg-zinc-50' : 'bg-[#131210]'} border ${sectionBorder}`}>
                            <span
                                className="text-teal-600 font-extrabold uppercase tracking-widest text-[10px] block mb-3">02 / Digital Strategy</span>
                            <h3 className="text-lg font-bold mb-4">The Approach</h3>
                            <p className="text-sm leading-relaxed text-zinc-500">
                                {study.approach || "We performed deep operational workflow mapping, analyzed system bottlenecks, and restructured transaction flows."}
                            </p>
                        </div>

                        <div
                            className={`p-8 rounded-3xl ${isDayTime ? 'bg-zinc-50' : 'bg-[#131210]'} border ${sectionBorder}`}>
                            <span
                                className="text-teal-600 font-extrabold uppercase tracking-widest text-[10px] block mb-3">03 / Implementation</span>
                            <h3 className="text-lg font-bold mb-4">The Solution</h3>
                            <p className="text-sm leading-relaxed text-zinc-500">
                                {study.solution || study.body || "Delivered a modern, optimized digital system custom engineered to reduce user friction and process orders flawlessly."}
                            </p>
                        </div>
                    </div>

                    <div
                        className="mt-12 lg:mt-16 p-8 sm:p-12 rounded-[2rem] bg-teal-900 text-white border-none flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                        <div className="max-w-lg">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-300 block mb-3">04 / Real-World Value</span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">The Outcomes
                                & Impact</h2>
                            <p className="mt-3 text-sm text-teal-100">
                                Our optimizations yielded tangible improvements and operational efficiency across
                                critical touchpoints.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 bg-teal-800/80 p-6 rounded-2xl border border-teal-700">
                            <FaCheckCircle className="text-3xl text-teal-300 flex-shrink-0"/>
                            <div>
                                <span className="text-[9px] font-extrabold tracking-wider uppercase text-teal-200">OUTCOME METRIC</span>
                                <p className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight mt-1">
                                    {study.results}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`py-16 md:py-24 border-t ${sectionBorder} bg-teal-50 dark:bg-[#12110e]`}>
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                        Ready to build a high-performance product?
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-500 max-w-lg mx-auto mb-8">
                        Let’s sit down to explore your current product barriers and define a seamless digital pathway to
                        scale.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact"
                              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-md">
                            Discuss Your Project
                        </Link>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    );
};

export default CaseStudyArticle;
