'use client';

import React from 'react';
import SocialProof from '@/components/SocialProof';
import '@/app/globals.css';
import Link from 'next/link';
import { useIsDayTime } from '../components/useIsDayTime';
import { motion } from 'framer-motion';
import { FxBackground, FxCard, FxChip, FxSectionHeading, FxButton, FxReveal } from '@/components/futuristic/fx';
import { Zap, TrendingUp } from 'lucide-react';

const Portfolio = () => {
    const isDayTime = useIsDayTime();

    const works = [
        { title: 'SaaS Analytics Platform', category: 'Web Platform', impact: 'Reduced reporting time by 62% with unified data dashboards.' },
        { title: 'E-commerce Conversion Revamp', category: 'Commerce', impact: 'Improved checkout completion through UX simplification and speed gains.' },
        { title: 'Enterprise Client Portal', category: 'B2B Product', impact: 'Digitized support workflows and lowered response time for key accounts.' },
        { title: 'Healthcare Booking Experience', category: 'HealthTech', impact: 'Streamlined appointment journeys across patient, clinic, and admin views.' },
        { title: 'Operations Command Dashboard', category: 'Internal Tools', impact: 'Centralized alerts and decision data for faster day-to-day execution.' },
        { title: 'Product Discovery Microsite', category: 'Brand + Web', impact: 'Accelerated lead capture with focused messaging and modular storytelling.' },
    ];

    const featuredWork = works[0];

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>

            {/* ── Background effects ── */}
            <FxBackground day={isDayTime} grid aurora className="fixed opacity-[0.04]" />

            {/* ── Hero with video ── */}
            <section className="relative w-full h-[320px] md:h-[480px] lg:h-[650px] overflow-hidden pt-28">
                <video
                    src="/assets/digital/Hero-P.mp4"
                    autoPlay loop muted playsInline
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />

                <div className="relative z-10 h-full flex flex-col justify-center items-start px-4 sm:px-6 md:px-10 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl"
                    >
                        <FxChip day={false} className="mb-6">Selected work</FxChip>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                            Our<br />
                            <span className="gx-gradient-text">Portfolio</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl">
                            A showcase of digital products and platforms designed to drive growth and measurable business impact.
                        </p>

                        <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-md">
                            {[
                                { value: '8+', label: 'Years Experience' },
                                { value: '13+', label: 'Team Members' },
                                { value: '123+', label: 'Products Launched' },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-3xl sm:text-4xl font-bold gx-gradient-text">{stat.value}</div>
                                    <p className="text-sm text-slate-400 mt-2">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">

                {/* ── Featured Work ── */}
                <section className="mb-20 lg:mb-32">
                    <FxReveal>
                        <div className="mb-8">
                            <FxChip day={isDayTime} className="mb-4">
                                <Zap className="w-3 h-3 inline mr-1" /> Featured Work
                            </FxChip>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                                {featuredWork.title}
                            </h2>
                            <span className={`inline-flex rounded-full text-xs font-semibold px-4 py-2 mb-6 ${isDayTime ? 'bg-teal-100 text-teal-700 border border-teal-200' : 'bg-teal-400/10 text-teal-300 border border-teal-400/30'}`}>
                                {featuredWork.category}
                            </span>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <p className={`text-lg leading-relaxed mb-6 ${isDayTime ? 'text-gray-700' : 'text-slate-300'}`}>
                                    {featuredWork.impact}
                                </p>
                                <p className={`mb-8 ${isDayTime ? 'text-gray-500' : 'text-slate-400'}`}>
                                    Every engagement focuses on outcomes: improved efficiency, stronger conversion, and systems teams can scale confidently.
                                </p>
                                <FxButton day={isDayTime} href="/quote-request">Start a Project</FxButton>
                            </div>
                            <FxCard day={isDayTime} glow className="p-8">
                                <div className="flex flex-col h-full justify-between">
                                    <p className={`leading-relaxed mb-6 ${isDayTime ? 'text-gray-600' : 'text-slate-300'}`}>
                                        We deliver digital excellence through strategic design, robust development, and measurable results that drive real business growth.
                                    </p>
                                    <div className={`flex items-center ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>
                                        <TrendingUp className="w-5 h-5 mr-2" />
                                        <span>View case studies →</span>
                                    </div>
                                </div>
                            </FxCard>
                        </div>
                    </FxReveal>
                </section>

                {/* ── More Work Grid ── */}
                <section>
                    <FxReveal>
                        <FxSectionHeading
                            day={isDayTime}
                            eyebrow="All work"
                            title="More Work"
                            className="mb-12"
                        />
                    </FxReveal>
                    <motion.div
                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                        }}
                        initial="hidden"
                        whileInView="visible"
                    >
                        {works.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            >
                                <FxCard day={isDayTime} className="p-8 h-full flex flex-col justify-between">
                                    <div>
                                        <span className={`inline-flex rounded-full text-xs font-semibold px-3 py-1.5 mb-4 ${isDayTime ? 'bg-teal-100 text-teal-700 border border-teal-200' : 'bg-teal-400/10 text-teal-300 border border-teal-400/30'}`}>
                                            {item.category}
                                        </span>
                                        <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                                        <p className={`text-sm leading-relaxed ${isDayTime ? 'text-gray-600' : 'text-slate-400'}`}>
                                            {item.impact}
                                        </p>
                                    </div>
                                    <div className={`mt-6 flex items-center text-sm font-semibold ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>
                                        Learn more →
                                    </div>
                                </FxCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </main>

            <SocialProof page="portfolio" />
        </div>
    );
};

export default Portfolio;
