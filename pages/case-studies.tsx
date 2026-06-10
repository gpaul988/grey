'use client';

import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import {motion, AnimatePresence} from 'framer-motion';
import {FaArrowRight, FaFilter} from 'react-icons/fa';

interface CaseStudyMerged {
    id: string;
    slug: string;
    title: string;
    client: string;
    industry: string;
    summary: string;
    body: string;
    image: string;
    results: string;
    published?: boolean;
}

const CaseStudiesList = () => {
    const [isDayTime, setIsDayTime] = useState(true);
    const [fetchedStudies, setFetchedStudies] = useState<CaseStudyMerged[]>([]);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const updateThemeByTime = () => {
            const hour = new Date().getHours();
            setIsDayTime(hour >= 6 && hour < 18);
        };
        updateThemeByTime();
        const intervalId = setInterval(updateThemeByTime, 60_000);
        return () => clearInterval(intervalId);
    }, []);

    // Fetch dynamic case studies from sqlite admin API
    useEffect(() => {
        const loadStudies = async () => {
            try {
                const res = await fetch('/admin/api/case-studies');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && Array.isArray(data.data)) {
                        const mapped: CaseStudyMerged[] = data.data.map((c: any) => ({
                            id: String(c.id),
                            slug: c.slug || `case-${c.id}`,
                            title: c.title,
                            client: c.client || 'Client Partner',
                            industry: c.industry || 'Technology',
                            summary: c.summary || 'Strategic solution delivered.',
                            body: c.body || '',
                            image: c.image || '/assets/mvp/start.jpg',
                            results: c.results || '99.9% uptime achieved.',
                            published: c.published === 1
                        }));
                        setFetchedStudies(mapped);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch case studies:', err);
            }
        };
        loadStudies();
    }, []);

    // Pre-seeded high quality Case Studies mapped to Lightflows templates
    const staticStudies: CaseStudyMerged[] = [
        {
            id: 'static-1',
            slug: 'healthcare-transformation',
            title: 'Healthcare Platform Transformation',
            client: 'Clinify Health',
            industry: 'Healthcare / SaaS',
            summary: 'How we re-engineered legacy appointment booking flows to achieve rapid user adoption.',
            body: 'Detailed approach and strategy around clinify health booking solutions.',
            image: '/assets/ui-ux/hero.jpg',
            results: '68% faster bookings, 40% reduction in support calls'
        },
        {
            id: 'static-2',
            slug: 'logistics-dashboard',
            title: 'Logistics Command Center Optimization',
            client: 'Sendcargo Ltd',
            industry: 'Logistics / Cloud',
            summary: 'Designing a real-time tracking suite to optimize driver schedules and fuel economics.',
            body: 'Detailed system architecture for logistics command and route optimizations.',
            image: '/assets/node/hero.jpg',
            results: '24% mileage savings, 99.4% on-time dispatches'
        },
        {
            id: 'static-3',
            slug: 'fintech-launch',
            title: 'Fintech Product & Payment Rails Launch',
            client: 'NaijaPay Co',
            industry: 'Fintech / Security',
            summary: 'Deploying highly secure banking layers and microservices within a strict 6-week window.',
            body: 'Detailed merchant payment APIs and mobile wallet onboarding pathways.',
            image: '/assets/mvp/start.jpg',
            results: '₦400M processed weekly, 0.01% transaction error rate'
        },
        {
            id: 'static-4',
            slug: 'education-expansion',
            title: 'EduTech High-Traffic Platform Expansion',
            client: 'SkillVerse Nigeria',
            industry: 'Education / Web Development',
            summary: 'Scaling streaming backend servers to handle heavy concurrent video cohorts smoothly.',
            body: 'Caching strategy and global content distribution layers deployed.',
            image: '/assets/startup/market.jpg',
            results: '120k concurrent streams, 0.5s initial page loads'
        }
    ];

    // Combine database studies & static studies (avoiding duplicates)
    const dbSlugs = new Set(fetchedStudies.map(s => s.slug));
    const allStudies = [
        ...fetchedStudies,
        ...staticStudies.filter(s => !dbSlugs.has(s.slug))
    ];

    // Filter studies
    const filters = ['All', 'SaaS', 'Healthcare', 'Logistics', 'Fintech', 'Education'];
    const filteredStudies = activeFilter === 'All'
        ? allStudies
        : allStudies.filter(s => s.industry.toLowerCase().includes(activeFilter.toLowerCase()) ||
            s.title.toLowerCase().includes(activeFilter.toLowerCase()));

    // Lightflows-like header color themes
    const themeBg = isDayTime ? 'bg-[#fcfbf9] text-[#121212]' : 'bg-[#0f0e0c] text-[#f7f5f0]';
    const cardBg = isDayTime ? 'bg-white border-zinc-100 hover:shadow-lg hover:shadow-zinc-100/50' : 'bg-[#151412] border-zinc-800/80 hover:shadow-lg hover:shadow-black/50';

    return (
        <div className={`min-h-screen ${themeBg} transition-colors duration-500 font-sans flex flex-col`}>
            <Header/>

            {/* Lightflows styled top hero section */}
            <section className={`pt-32 pb-16 border-b ${isDayTime ? 'border-zinc-200/60' : 'border-zinc-800/60'}`}>
                <div className="max-w-[85rem] mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="max-w-4xl">
                        <span className="text-teal-600 font-semibold tracking-[0.25em] text-xs uppercase block mb-4">
                            Our Case Studies
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                            We design and build bespoke software, mobile apps, and Cloud systems.
                        </h1>
                        <p className={`text-lg sm:text-xl font-normal leading-relaxed max-w-2xl ${isDayTime ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            Explore real-world challenges, deep strategy, and pristine digital products engineered to
                            accelerate venture and enterprise growth.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filtration toolbar */}
            <section className="py-8 bg-transparent">
                <div className="max-w-[85rem] mx-auto px-6 sm:px-8 lg:px-12">
                    <div
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-500/10">
                        <div
                            className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-zinc-400">
                            <FaFilter className="text-teal-600"/> Filter Work
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {filters.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                                        activeFilter === f
                                            ? 'bg-teal-600 text-white shadow-md shadow-teal-600/10'
                                            : isDayTime
                                                ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black'
                                                : 'bg-[#181714] text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                    }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid of Work */}
            <main className="flex-grow max-w-[85rem] w-full mx-auto px-6 sm:px-8 lg:px-12 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
                    <AnimatePresence mode="popLayout">
                        {filteredStudies.map((study, idx) => (
                            <motion.article
                                key={study.id}
                                layout
                                initial={{opacity: 0, y: 30}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, scale: 0.95}}
                                transition={{duration: 0.5, delay: idx * 0.05}}
                                className={`rounded-3xl overflow-hidden border p-5 sm:p-6 group flex flex-col transition-all duration-300 ${cardBg}`}
                            >
                                {/* Thumbnail Image Section */}
                                <Link href={`/case-studies/${study.slug}`}
                                      className="block relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 z-10">
                                    <div
                                        className="absolute inset-0 bg-neutral-900/10 z-[1] group-hover:bg-neutral-900/40 transition-colors duration-500"/>
                                    <Image
                                        src={study.image || getBlogImage(study.slug, study.industry)}
                                        alt={study.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        referrerPolicy="no-referrer"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />

                                    {/* Hover Arrow Overlay */}
                                    <div
                                        className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/95 rounded-full flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-zinc-900 shadow-md">
                                        <FaArrowRight className="text-sm"/>
                                    </div>

                                    {/* Tag overlays */}
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <span
                                            className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-600 text-white shadow-lg">
                                            {study.industry}
                                        </span>
                                    </div>
                                </Link>

                                {/* Project Meta Description */}
                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <span
                                            className={`text-xs font-semibold tracking-wider uppercase ${isDayTime ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                            Client: <strong
                                            className={isDayTime ? 'text-zinc-700' : 'text-zinc-300'}>{study.client}</strong>
                                        </span>
                                        <h3 className={`text-xl sm:text-2xl font-bold mt-2 mb-3 leading-snug group-hover:text-teal-600 transition-colors`}>
                                            <Link href={`/case-studies/${study.slug}`}>
                                                {study.title}
                                            </Link>
                                        </h3>
                                        <p className={`text-sm leading-relaxed mb-6 ${isDayTime ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                            {study.summary}
                                        </p>
                                    </div>

                                    {/* Footer view case link */}
                                    <div className="pt-4 border-t border-zinc-500/10 flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#14b8a6]">
                                            Core Outcome:
                                        </span>
                                        <span
                                            className={`text-xs font-semibold leading-relaxed max-w-[70%] text-right ${isDayTime ? 'text-zinc-700' : 'text-zinc-300'}`}>
                                            {study.results}
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredStudies.length === 0 && (
                    <div className="text-center py-24">
                        <p className={`text-lg font-medium ${isDayTime ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            No case studies match this filter. Try selecting 'All'.
                        </p>
                    </div>
                )}
            </main>

            <Footer/>
        </div>
    );
};

// NextJS expects default exported components
export default CaseStudiesList;

// Helper media fallback
function getBlogImage(slug: string, tag: string): string {
    const images = [
        '/assets/mvp/start.jpg',
        '/assets/services/product-design.jpg',
        '/assets/ui-ux/hero.jpg',
        '/assets/startup/market.jpg',
        '/assets/node/hero.jpg'
    ];
    let sum = 0;
    for (let i = 0; i < slug.length; i++) sum += slug.charCodeAt(i);
    return images[sum % images.length];
}
