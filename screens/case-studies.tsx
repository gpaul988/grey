'use client';

import React, { useState } from 'react';
import '@/app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import AIProjectEstimator from '@/components/AIProjectEstimator';
import { useIsDayTime } from '../components/useIsDayTime';
import { motion } from 'framer-motion';
import { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxGlitchText, FxStatBar } from '@/components/futuristic/fx';
import CountUp from 'react-countup';

const STATIC_STUDIES = [
    {
        id: 's1',
        slug: 'healthcare-platform-transformation',
        title: 'Healthcare Platform Transformation',
        client: 'MediConnect NG',
        industry: 'Healthcare',
        services: ['Product Strategy', 'UX Design', 'Web Development'],
        summary: 'Redesigned a legacy patient booking system that was causing high support volume and drop-off.',
        image: '/assets/services/digital-transformatio.jpg',
        results: '+62% booking completion · −40% support tickets',
        resultMetrics: [62, 40, 98],
        resultLabels: ['Booking Completion', 'Support Reduction', 'Uptime SLA'],
        published: 1,
        year: '2024',
    },
    {
        id: 's2',
        slug: 'logistics-dashboard-optimization',
        title: 'Logistics Dashboard Optimization',
        client: 'FleetEdge Nigeria',
        industry: 'Logistics',
        services: ['Dashboard Design', 'React Development', 'Data Integration'],
        summary: 'Consolidated fragmented fleet data into a single real-time command centre for dispatch teams.',
        image: '/assets/startup/market.jpg',
        results: '3× faster dispatch decisions · Real-time visibility across 200+ vehicles',
        resultMetrics: [80, 95, 100],
        resultLabels: ['Dispatch Speed', 'Fleet Visibility', 'Data Accuracy'],
        published: 1,
        year: '2024',
    },
    {
        id: 's3',
        slug: 'fintech-product-launch',
        title: 'Fintech Product Launch',
        client: 'PayLink Africa',
        industry: 'Fintech',
        services: ['Architecture Design', 'Backend Development', 'DevOps'],
        summary: 'Delivered a modular, PCI-compliant payments platform from zero to launch in 14 weeks.',
        image: '/assets/ui-ux/hero.jpg',
        results: 'Launched on schedule · Zero downtime in first 90 days',
        resultMetrics: [100, 99.9, 90],
        resultLabels: ['On-time Delivery', 'Uptime', 'Security Score'],
        published: 1,
        year: '2023',
    },
    {
        id: 's4',
        slug: 'education-platform-expansion',
        title: 'Education Platform Expansion',
        client: 'EduPath',
        industry: 'EdTech',
        services: ['Performance Engineering', 'CDN Strategy', 'Caching Architecture'],
        summary: 'Scaled a growing learning platform to handle 10× traffic spikes with no degradation in UX.',
        image: '/assets/services/services.jpg',
        results: '91% reduction in page load time · 4× user retention uplift',
        resultMetrics: [91, 80, 400],
        resultLabels: ['Load Time Reduction', 'User Retention Up', 'Traffic Scale'],
        published: 1,
        year: '2023',
    },
    {
        id: 's5',
        slug: 'enterprise-saas-rebrand',
        title: 'Enterprise SaaS Rebrand & Website',
        client: 'Novaflow Systems',
        industry: 'SaaS',
        services: ['Brand Strategy', 'Web Design', 'Copywriting'],
        summary: 'Full brand overhaul and website rebuild for a B2B SaaS company ahead of a Series A round.',
        image: '/assets/services/digital-transformatio.jpg',
        results: '+180% qualified leads · Series A closed within 6 months of launch',
        resultMetrics: [180, 95, 6],
        resultLabels: ['Lead Increase', 'Conversion Rate', 'Months to Series A'],
        published: 1,
        year: '2023',
    },
];

const ALL_INDUSTRIES = ['All', ...Array.from(new Set(STATIC_STUDIES.map(s => s.industry))).sort()];

const CaseStudies: React.FC = () => {
    const isDayTime = useIsDayTime();
    const dark = !isDayTime;
    const [activeIndustry, setActiveIndustry] = useState('All');

    const filtered = activeIndustry === 'All' ? STATIC_STUDIES : STATIC_STUDIES.filter(s => s.industry === activeIndustry);
    const featured = STATIC_STUDIES[0];

    return (
        <div className={`${dark ? 'bg-[#050810] text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-500`}>

            {/* ── Hero ── */}
            <section className="relative overflow-hidden min-h-[78vh] flex flex-col justify-end">
                <video src="/assets/fin/hero.mp4" autoPlay loop muted playsInline
                    className="absolute inset-0 h-full w-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

                {/* FX */}
                <FxBackground day={false} grid aurora className="opacity-55" />
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-hero-scan" />
                <div className="gx-noise-overlay" />
                <div className="gx-orbit pointer-events-none absolute" style={{ width: '72vmax', height: '72vmax', top: '-26vmax', right: '-26vmax', opacity: .18 }} />

                {/* Content */}
                <div className="gx-page-hero-content relative z-10">
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal>
                            <FxChip day={false} className="mb-5">Selected Work</FxChip>
                            <div className="border-b border-white/15 pb-7 mb-7 max-w-4xl">
                                <h1 className="gx-hero-title text-white">
                                    Our{' '}
                                    <span className="gx-gradient-text">Work</span>
                                </h1>
                            </div>
                            <p className="text-white/65 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
                                Real-world challenges, deliberate decisions, and outcomes that move the needle.
                            </p>
                            {/* Stat chips */}
                            <div className="grid grid-cols-3 gap-8 max-w-sm">
                                {[
                                    { value: 8, suffix: '+', label: 'Years' },
                                    { value: 50, suffix: '+', label: 'Shipped' },
                                    { value: 100, suffix: '%', label: 'Satisfaction' },
                                ].map(s => (
                                    <div key={s.label}>
                                        <div className="text-[2.4em] font-[900] gx-gradient-text leading-none">
                                            <CountUp end={s.value} duration={2} suffix={s.suffix} />
                                        </div>
                                        <p className="text-white/40 text-[0.7em] uppercase tracking-wider mt-1">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            <main className="relative z-10">

                {/* ── Intro ── */}
                <section className={`py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-[4.5em] border-b ${dark ? 'border-white/08' : 'border-gray-100'}`}>
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal>
                            <div className="grid lg:grid-cols-2 gap-8 items-end">
                                <FxGlitchText tag="h2" className="text-[2.5em] md:text-[3.5em] font-[800] leading-[1.06] tracking-tight">
                                    Work we&apos;re{' '}
                                    <span className="gx-gradient-text">proud of</span>
                                </FxGlitchText>
                                <p className={`text-[0.95em] md:text-[1.05em] leading-relaxed max-w-xl ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Each project is a collaboration built on honesty, craft, and a shared commitment to
                                    shipping things that actually work for real users and real businesses.
                                </p>
                            </div>
                        </FxReveal>
                    </div>
                </section>

                {/* ── Featured ── */}
                <section className={`py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-[4.5em] border-b ${dark ? 'border-white/08' : 'border-gray-100'}`}>
                    <div className="max-w-[90rem] mx-auto">
                        <Link href={`/case-studies/${featured.slug}`} className="group block">
                            <div className={`rounded-3xl overflow-hidden border transition-all duration-500 group-hover:border-teal-400/50 ${dark ? 'border-white/10 bg-white/[0.02]' : 'border-gray-100'}`}>
                                <div className="relative w-full aspect-[16/7] overflow-hidden">
                                    <Image
                                        src={featured.image}
                                        alt={featured.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="100vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    {/* Scanline */}
                                    <div className="absolute inset-0 pointer-events-none"
                                        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.03) 3px, rgba(45,212,191,0.03) 4px)' }} />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                        <FxChip day={false} className="mb-4">Featured work</FxChip>
                                        <h3 className="text-[1.6em] md:text-[2.5em] font-[800] text-white leading-tight max-w-3xl mb-3">
                                            {featured.title}
                                        </h3>
                                        <p className="text-white/65 text-[0.9em] max-w-2xl">{featured.summary}</p>
                                    </div>
                                </div>
                                <div className={`px-8 md:px-12 py-6 flex flex-wrap items-center gap-6 ${dark ? 'bg-white/[0.02]' : 'bg-white'}`}>
                                    <div>
                                        <p className={`text-[0.68em] uppercase tracking-[0.2em] mb-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Client</p>
                                        <p className="text-[0.88em] font-[600]">{featured.client}</p>
                                    </div>
                                    <div>
                                        <p className={`text-[0.68em] uppercase tracking-[0.2em] mb-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Industry</p>
                                        <p className="text-[0.88em] font-[600]">{featured.industry}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-[0.68em] uppercase tracking-[0.2em] mb-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Services</p>
                                        <div className="flex flex-wrap gap-2">
                                            {featured.services.map(s => (
                                                <span key={s} className="gx-data-pill text-[0.65em]">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <span className={`text-[0.88em] font-[600] transition-colors group-hover:text-teal-500 ${dark ? 'text-teal-400' : 'text-teal-600'}`}>
                                        View case study →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* ── Filter + grid ── */}
                <section className="px-4 sm:px-6 md:px-10 lg:px-[4.5em] py-14">
                    <div className="max-w-[90rem] mx-auto">
                        {/* Filter */}
                        <div className="flex flex-wrap gap-2 mb-12">
                            {ALL_INDUSTRIES.map(ind => (
                                <button
                                    key={ind}
                                    onClick={() => setActiveIndustry(ind)}
                                    className={`px-4 py-2 rounded-full text-[0.8em] font-[600] border transition-all duration-200 ${
                                        activeIndustry === ind
                                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-transparent shadow-[0_6px_20px_rgba(45,212,191,0.35)]'
                                            : dark
                                                ? 'bg-transparent text-gray-300 border-white/15 hover:border-teal-400/50'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-teal-400'
                                    }`}
                                >
                                    {ind}
                                </button>
                            ))}
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filtered.map((study, idx) => (
                                <motion.div
                                    key={study.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                                >
                                    <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                                        <FxHoloCard day={isDayTime} className="h-full overflow-hidden">
                                            {/* Thumbnail */}
                                            <div className={`relative w-full aspect-[16/9] overflow-hidden ${dark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                                                <Image
                                                    src={study.image}
                                                    alt={study.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    sizes="(max-width:768px) 100vw, 50vw"
                                                />
                                                {/* Scanline */}
                                                <div className="absolute inset-0 pointer-events-none"
                                                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.025) 3px, rgba(45,212,191,0.025) 4px)' }} />
                                                {/* Year badge */}
                                                <div className="absolute top-4 right-4">
                                                    <span className="gx-data-pill text-[0.62em]">{study.year}</span>
                                                </div>
                                            </div>

                                            {/* Body */}
                                            <div className="p-7">
                                                <div className={`flex items-center gap-2 text-[0.72em] mb-3 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    <span className={`font-[700] uppercase tracking-wider ${dark ? 'text-teal-400' : 'text-teal-600'}`}>{study.industry}</span>
                                                    <span>·</span>
                                                    <span>{study.client}</span>
                                                </div>

                                                <h3 className={`text-[1.15em] font-[700] leading-snug mb-3 transition-colors ${dark ? 'text-white group-hover:text-teal-400' : 'text-black group-hover:text-teal-600'}`}>
                                                    {study.title}
                                                </h3>

                                                <p className={`text-[0.87em] leading-relaxed mb-5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {study.summary}
                                                </p>

                                                <div className="flex flex-wrap gap-2 mb-5">
                                                    {study.services.map(s => (
                                                        <span key={s} className="gx-data-pill text-[0.62em]">{s}</span>
                                                    ))}
                                                </div>

                                                {study.results && (
                                                    <p className={`text-[0.78em] font-[600] ${dark ? 'text-teal-400' : 'text-teal-600'}`}>
                                                        {study.results}
                                                    </p>
                                                )}
                                            </div>
                                        </FxHoloCard>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <div className={`relative py-8 mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] max-w-full w-full h-auto ${isDayTime ? 'bg-teal-100 text-teal-900' : 'bg-teal-950 text-white'}`}>
                <AIProjectEstimator />
            </div>
        </div>
    );
};

export default CaseStudies;
