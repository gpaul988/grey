'use client';

import { PersonalizedGreeting } from '@/components/PersonalizedGreeting';
import React, { useState } from 'react';
import '@/app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import AIProjectEstimator from '@/components/AIProjectEstimator';
import { useIsDayTime } from '../components/useIsDayTime';
import { FxBackground, FxChip, FxReveal } from '@/components/futuristic/fx';

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
        published: 1,
    },
    {
        id: 's2',
        slug: 'logistics-dashboard-optimization',
        title: 'Logistics Dashboard Optimization',
        client: 'FleetEdge Nigeria',
        industry: 'Logistics',
        services: ['Dashboard Design', 'React Development', 'Data Integration'],
        summary: 'Consolidated fragmented fleet data into a single real-time command centre for dispatch teams.',
        image: '/assets/fin/hero.mp4',
        results: '3× faster dispatch decisions · Real-time visibility across 200+ vehicles',
        published: 1,
    },
    {
        id: 's3',
        slug: 'fintech-product-launch',
        title: 'Fintech Product Launch',
        client: 'PayLink Africa',
        industry: 'Fintech',
        services: ['Architecture Design', 'Backend Development', 'DevOps'],
        summary: 'Delivered a modular, PCI-compliant payments platform from zero to launch in 14 weeks.',
        image: '/assets/startup/market.jpg',
        results: 'Launched on schedule · Zero downtime in first 90 days',
        published: 1,
    },
    {
        id: 's4',
        slug: 'education-platform-expansion',
        title: 'Education Platform Expansion',
        client: 'EduPath',
        industry: 'EdTech',
        services: ['Performance Engineering', 'CDN Strategy', 'Caching Architecture'],
        summary: 'Scaled a growing learning platform to handle 10× traffic spikes with no degradation in UX.',
        image: '/assets/ui-ux/hero.jpg',
        results: '91% reduction in page load time · 4× user retention uplift',
        published: 1,
    },
    {
        id: 's5',
        slug: 'enterprise-saas-rebrand',
        title: 'Enterprise SaaS Rebrand & Website',
        client: 'Novaflow Systems',
        industry: 'SaaS',
        services: ['Brand Strategy', 'Web Design', 'Copywriting'],
        summary: 'Full brand overhaul and website rebuild for a B2B SaaS company ahead of a Series A round.',
        image: '/assets/services/services.jpg',
        results: '+180% qualified leads · Series A closed within 6 months of launch',
        published: 1,
    },
];

const ALL_INDUSTRIES = ['All', ...Array.from(new Set(STATIC_STUDIES.map(s => s.industry))).sort()];

const CaseStudies: React.FC = () => {
    const isDayTime = useIsDayTime();
    const [activeIndustry, setActiveIndustry] = useState('All');
    const filtered = activeIndustry === 'All' ? STATIC_STUDIES : STATIC_STUDIES.filter(s => s.industry === activeIndustry);
    const featured = STATIC_STUDIES[0];

    const bg = isDayTime ? 'bg-white text-black' : 'bg-black text-white';

    return (
        <div className={`${bg} min-h-screen transition-colors duration-500`}>
            {/* ── Background ── */}
            <FxBackground day={isDayTime} grid aurora className="fixed opacity-[0.03]" />

            {/* ── Hero video banner ── */}
            <section className="relative w-full h-[320px] md:h-[380px] lg:h-[800px] overflow-hidden">
                <video src="/assets/fin/hero.mp4" autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute top-14 left-0 w-full h-full flex flex-col justify-center items-start px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="flex flex-col justify-start items-start border-b pb-[1.5em] border-gray-500/50 max-w-full w-full">
                        <div className="mb-4">
                            <FxChip day={false}>Selected work</FxChip>
                        </div>
                        <h1 className="text-white constant-text lg:text-[5.35em] md:text-[4.4em] sm:text-[3.5em] text-[2em] lg:mt-[1.5em] md:mt-[3em] mt-[4em] leading-[1.2] pb-[0.08em] font-[600]">
                            Our <span className="gx-gradient-text">Work</span>
                        </h1>
                    </div>
                    <div className="relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] mt-[0.5em]">
                        <p className="text-white/80 text-[0.87em] font-[300] lg:-mr-[4em]">
                            Real-world challenges, deliberate decisions, and outcomes that move the needle.
                        </p>
                        <div className="relative grid lg:grid-cols-3 lg:gap-8 lg:ml-[13em]">
                            {[['8+', 'Years Experience'], ['50+', 'Projects Shipped'], ['100%', 'Client Satisfaction']].map(([n, l]) => (
                                <div key={l} className="border-0 lg:block md:hidden hidden">
                                    <h6 className="gx-gradient-text text-[3em] font-[500] -mb-[0.3em]">{n}</h6>
                                    <p className="text-white/70 text-[0.7em] font-[300]">{l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <main className="relative z-10 mx-auto max-w-[100rem] px-4 sm:px-6 md:px-10 lg:px-[4.5em]">

                {/* ── Intro ── */}
                <section className={`py-14 md:py-20 border-b ${isDayTime ? 'border-gray-200/60' : 'border-gray-800/60'}`}>
                    <FxReveal>
                        <div className="grid lg:grid-cols-2 gap-8 items-end">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.06] tracking-tight">
                                Work we're <span className="gx-gradient-text">proud of</span>
                            </h2>
                            <p className={`text-base md:text-lg leading-relaxed max-w-xl ${isDayTime ? 'text-gray-600' : 'text-gray-300'}`}>
                                Each project is a collaboration built on honesty, craft, and a shared commitment to shipping
                                things that actually work for real users and real businesses.
                            </p>
                        </div>
                    </FxReveal>
                </section>

                {/* ── Featured case study ── */}
                <section className={`py-14 md:py-16 border-b ${isDayTime ? 'border-gray-200/60' : 'border-gray-800/60'}`}>
                    <Link href={`/case-studies/${featured.slug}`} className="group block">
                        <div className={`rounded-3xl overflow-hidden border ${isDayTime ? 'border-gray-100' : 'border-zinc-800'}`}>
                            <div className="relative w-full aspect-[16/7] overflow-hidden">
                                <Image
                                    src={featured.image}
                                    alt={featured.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                    <FxChip day={false} className="mb-4">Featured work</FxChip>
                                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-3xl mb-3">
                                        {featured.title}
                                    </h3>
                                    <p className="text-white/70 text-sm md:text-base max-w-2xl">{featured.summary}</p>
                                </div>
                            </div>
                            <div className={`px-8 md:px-12 py-6 flex flex-wrap items-center gap-6 ${isDayTime ? 'bg-white' : 'bg-zinc-950'}`}>
                                <div>
                                    <p className={`text-xs uppercase tracking-widest mb-1 ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>Client</p>
                                    <p className="text-sm font-medium">{featured.client}</p>
                                </div>
                                <div>
                                    <p className={`text-xs uppercase tracking-widest mb-1 ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>Industry</p>
                                    <p className="text-sm font-medium">{featured.industry}</p>
                                </div>
                                <div className="flex-1">
                                    <p className={`text-xs uppercase tracking-widest mb-1 ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>Services</p>
                                    <div className="flex flex-wrap gap-2">
                                        {featured.services.map(s => (
                                            <span key={s} className={`text-xs px-2.5 py-1 rounded-full border ${isDayTime ? 'border-gray-200 text-gray-600' : 'border-zinc-700 text-gray-300'}`}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <span className={`text-sm font-medium underline underline-offset-4 transition-colors group-hover:text-teal-600 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                                    View case study →
                                </span>
                            </div>
                        </div>
                    </Link>
                </section>

                {/* ── Filter tabs ── */}
                <section className="pt-12 pb-6">
                    <div className="flex flex-wrap gap-2">
                        {ALL_INDUSTRIES.map(ind => (
                            <button
                                key={ind}
                                onClick={() => setActiveIndustry(ind)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                                    activeIndustry === ind
                                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-transparent'
                                        : isDayTime
                                            ? 'bg-white text-gray-600 border-gray-200 hover:border-teal-400'
                                            : 'bg-zinc-900 text-gray-300 border-zinc-700 hover:border-teal-500/60'
                                }`}
                            >
                                {ind}
                            </button>
                        ))}
                    </div>
                </section>

                {/* ── Case study grid ── */}
                <section className="pb-20 md:pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {filtered.map((study) => (
                            <Link key={study.id} href={`/case-studies/${study.slug}`} className="group flex flex-col">
                                <div className={`relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 ${isDayTime ? 'bg-gray-100' : 'bg-zinc-900'}`}>
                                    <Image
                                        src={study.image}
                                        alt={study.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width:768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>

                                <div className={`flex items-center gap-2 text-xs mb-3 ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <span className={`font-semibold uppercase tracking-wider ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>{study.industry}</span>
                                    <span>·</span>
                                    <span>{study.client}</span>
                                </div>

                                <h3 className={`text-xl md:text-2xl font-semibold leading-snug mb-3 transition-colors ${isDayTime ? 'text-black group-hover:text-teal-600' : 'text-white group-hover:text-teal-400'}`}>
                                    {study.title}
                                </h3>

                                <p className={`text-sm leading-relaxed mb-4 flex-1 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {study.summary}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {study.services.map(s => (
                                        <span key={s} className={`text-xs px-2.5 py-1 rounded-full border ${isDayTime ? 'border-gray-200 text-gray-500' : 'border-zinc-700 text-gray-400'}`}>{s}</span>
                                    ))}
                                </div>

                                {study.results && (
                                    <p className={`text-xs font-medium ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>{study.results}</p>
                                )}
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <div className={`relative -mt-14 py-8 mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] max-w-full w-full h-auto ${isDayTime ? 'bg-teal-100 text-teal-900' : 'bg-teal-950 text-white'}`}>
                <AIProjectEstimator />
            </div>
        </div>
    );
};

export default CaseStudies;
