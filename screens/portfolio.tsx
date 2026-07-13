'use client';

import React, { useState, useEffect, useRef } from 'react';
import SocialProof from '@/components/SocialProof';
import '@/app/globals.css';
import Link from 'next/link';
import { useIsDayTime } from '../components/useIsDayTime';
import { motion } from 'framer-motion';
import { FxBackground, FxChip, FxSectionHeading, FxButton, FxReveal, FxHoloCard, FxGlitchText, FxStatBar, FxFrame } from '@/components/futuristic/fx';
import { Zap, TrendingUp, ExternalLink } from 'lucide-react';
import CountUp from 'react-countup';

const works = [
    { title: 'SaaS Analytics Platform', category: 'Web Platform', tag: 'SaaS', impact: 'Reduced reporting time by 62% with unified data dashboards.', year: '2024', color: '#22d3ee' },
    { title: 'E-commerce Conversion Revamp', category: 'Commerce', tag: 'E-Com', impact: 'Improved checkout completion through UX simplification and speed gains.', year: '2024', color: '#a855f7' },
    { title: 'Enterprise Client Portal', category: 'B2B Product', tag: 'Enterprise', impact: 'Digitized support workflows and lowered response time for key accounts.', year: '2023', color: '#2dd4bf' },
    { title: 'Healthcare Booking Experience', category: 'HealthTech', tag: 'Health', impact: 'Streamlined appointment journeys across patient, clinic, and admin views.', year: '2023', color: '#14b8a6' },
    { title: 'Operations Command Dashboard', category: 'Internal Tools', tag: 'Ops', impact: 'Centralized alerts and decision data for faster day-to-day execution.', year: '2023', color: '#06b6d4' },
    { title: 'Product Discovery Microsite', category: 'Brand + Web', tag: 'Brand', impact: 'Accelerated lead capture with focused messaging and modular storytelling.', year: '2022', color: '#0d9488' },
];

const CATEGORIES = ['All', 'Web Platform', 'Commerce', 'B2B Product', 'HealthTech', 'Internal Tools', 'Brand + Web'];

export default function Portfolio() {
    const isDayTime = useIsDayTime();
    const dark = !isDayTime;
    const [activeCategory, setActiveCategory] = useState('All');
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const { top, bottom } = sectionRef.current.getBoundingClientRect();
                const wh = window.innerHeight;
                setIsBackgroundActive(top < wh * -0.1 || bottom < wh * -0.1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filtered = activeCategory === 'All' ? works : works.filter(w => w.category === activeCategory);

    return (
        <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-[#050810] text-white' : 'bg-white text-black'}`}>

            {/* ── Hero ── */}
            <section className="relative overflow-hidden min-h-[78vh] flex flex-col justify-end">
                {/* Video bg */}
                <video
                    src="/assets/digital/Hero-P.mp4"
                    autoPlay loop muted playsInline
                    className="absolute inset-0 h-full w-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

                {/* FX layers */}
                <FxBackground day={false} grid aurora className="opacity-55" />
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-hero-scan" />
                <div className="gx-noise-overlay" />

                {/* Orbit rings */}
                <div className="gx-orbit pointer-events-none absolute" style={{ width: '75vmax', height: '75vmax', top: '-28vmax', right: '-28vmax', opacity: .18 }} />
                <div className="gx-orbit gx-orbit-reverse pointer-events-none absolute" style={{ width: '48vmax', height: '48vmax', top: '-10vmax', right: '-6vmax', opacity: .12 }} />

                {/* Content */}
                <div className="gx-page-hero-content relative z-10">
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal>
                            <FxChip day={false} className="mb-5">Selected Work</FxChip>
                            <div className="border-b border-white/15 pb-7 mb-7 max-w-4xl">
                                <h1 className="gx-hero-title text-white">
                                    Our{' '}
                                    <span className="gx-gradient-text">Portfolio</span>
                                </h1>
                            </div>
                            <p className="text-white/65 max-w-2xl text-base md:text-lg leading-relaxed mb-8">
                                A showcase of digital products and platforms designed to drive growth and measurable business impact.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8 max-w-sm">
                                {[
                                    { value: 8, suffix: '+', label: 'Years' },
                                    { value: 13, suffix: '+', label: 'Team' },
                                    { value: 123, suffix: '+', label: 'Products' },
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

            {/* ── Intro ── */}
            <section
                ref={sectionRef}
                className={`pt-16 transition-colors duration-500 ${
                    isBackgroundActive
                        ? isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                        : isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                }`}
            >
                <FxBackground day={isDayTime} />
                <div className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>SELECTED WORK</FxChip>
                    </div>
                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] lg:mt-[0.01em] rounded-none lg:tracking-normal tracking-tight leading-[1.3] lg:pb-10 pb-6">
                                Showcasing<br/><span className="gx-gradient-text">Digital Excellence</span>
                            </h3>
                        </FxReveal>
                        <FxReveal delay={0.1}>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]">
                                <div><p>Every project in our portfolio represents a strategic engagement where we&#39;ve helped clients achieve measurable business impact. From concept to launch, we focus on delivering digital solutions that solve real problems.</p></div>
                                <div><p>From enterprise platforms to innovative startups, we craft digital solutions that drive growth and deliver results. Each project showcases our commitment to excellence, innovation, and creating lasting value.</p></div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ── Featured Work ── */}
            <section className={`relative z-10 px-4 sm:px-6 md:px-10 lg:px-[4.5em] py-20 ${dark ? '' : ''}`}>
                <FxBackground day={isDayTime} grid={false} aurora={true} className="opacity-20" />
                <div className="max-w-[90rem] mx-auto relative z-10">
                    <FxReveal>
                        <div className="flex items-center gap-4 mb-10">
                            <FxChip day={isDayTime}><Zap className="w-3 h-3 inline mr-1" /> Featured Work</FxChip>
                            <div className={`flex-1 h-px ${dark ? 'bg-white/08' : 'bg-gray-200'}`} />
                        </div>

                        <div className="grid lg:grid-cols-2 gap-10 items-start">
                            <div>
                                <span className="gx-data-pill mb-4 inline-block">{works[0].tag}</span>
                                <FxGlitchText tag="h2" className="text-[2.5em] md:text-[3em] font-[800] leading-[1.1] tracking-tight mb-5">
                                    {works[0].title}
                                </FxGlitchText>
                                <p className={`text-[0.95em] leading-[1.8] mb-6 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {works[0].impact}
                                </p>
                                <p className={`text-[0.88em] mb-8 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Every engagement focuses on outcomes: improved efficiency, stronger conversion, and systems teams can scale confidently.
                                </p>
                                <div className="flex gap-3">
                                    <FxButton day={isDayTime} href="/quote-request" variant="solid">Start a Project</FxButton>
                                    <FxButton day={isDayTime} href="/case-studies" variant="ghost">Case Studies</FxButton>
                                </div>
                            </div>

                            <FxHoloCard day={isDayTime} className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                                    <span className={`text-[0.72em] uppercase tracking-[0.15em] font-[600] ${dark ? 'text-teal-400' : 'text-teal-600'}`}>
                                        Project Metrics
                                    </span>
                                </div>
                                <div className="space-y-5">
                                    <FxStatBar day={isDayTime} label="Reporting Time Reduction" value="62%" percent={62} />
                                    <FxStatBar day={isDayTime} label="User Adoption Rate" value="94%" percent={94} />
                                    <FxStatBar day={isDayTime} label="Performance Score" value="98%" percent={98} />
                                    <FxStatBar day={isDayTime} label="Client Satisfaction" value="100%" percent={100} />
                                </div>
                                <div className={`mt-6 pt-6 border-t flex items-center gap-2 text-[0.82em] font-[600] ${dark ? 'border-white/10 text-teal-400' : 'border-gray-100 text-teal-600'}`}>
                                    <TrendingUp className="w-4 h-4" />
                                    <span>View full case study →</span>
                                </div>
                            </FxHoloCard>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/* ── Filter + Grid ── */}
            <section className={`relative z-10 px-4 sm:px-6 md:px-10 lg:px-[4.5em] pb-24 ${dark ? '' : ''}`}>
                <div className="max-w-[90rem] mx-auto">

                    {/* Section heading */}
                    <FxReveal className="mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <FxSectionHeading
                                day={isDayTime}
                                eyebrow="All Work"
                                title="More Projects"
                            />
                        </div>
                    </FxReveal>

                    {/* Filter tabs */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-[0.8em] font-[600] border transition-all duration-200 ${
                                    activeCategory === cat
                                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-transparent shadow-[0_6px_20px_rgba(45,212,191,0.35)]'
                                        : dark
                                            ? 'bg-transparent text-gray-300 border-white/15 hover:border-teal-400/50'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-teal-400'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <motion.div
                        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
                        layout
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {filtered.map((item) => (
                            <motion.div
                                key={item.title}
                                layout
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            >
                                <FxHoloCard day={isDayTime} className="p-7 h-full flex flex-col justify-between group cursor-default">
                                    {/* Tag row */}
                                    <div>
                                        <div className="flex items-center justify-between mb-5">
                                            <span className="gx-data-pill text-[0.65em]">{item.tag}</span>
                                            <span className={`text-[0.72em] font-mono ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{item.year}</span>
                                        </div>

                                        <h4 className="text-[1.05em] font-[700] mb-3 tracking-tight group-hover:text-teal-400 transition-colors duration-300">
                                            {item.title}
                                        </h4>
                                        <p className={`text-[0.85em] leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {item.impact}
                                        </p>
                                    </div>

                                    {/* Bottom */}
                                    <div className={`mt-5 pt-5 border-t flex items-center justify-between ${dark ? 'border-white/08' : 'border-gray-100'}`}>
                                        <span className={`text-[0.72em] font-[600] uppercase tracking-wider ${dark ? 'text-teal-500' : 'text-teal-600'}`}>
                                            {item.category}
                                        </span>
                                        <ExternalLink className={`w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity ${dark ? 'text-teal-400' : 'text-teal-600'}`} />
                                    </div>

                                    {/* Animated bottom neon line */}
                                    <div className="mt-3 h-[1px] w-0 group-hover:w-full transition-all duration-500"
                                        style={{ background: `linear-gradient(90deg, transparent, ${item.color}66, transparent)` }} />
                                </FxHoloCard>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA */}
                    <FxReveal className="mt-16 text-center">
                        <p className={`text-[0.9em] mb-6 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Ready to add your project to this list?
                        </p>
                        <FxButton day={isDayTime} href="/quote-request" variant="solid">
                            Start Your Project
                        </FxButton>
                    </FxReveal>
                </div>
            </section>

            <SocialProof page="portfolio" />
        </div>
    );
}
