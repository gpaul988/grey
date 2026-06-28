'use client';

import React, {useEffect, useState} from 'react';
import SocialProof from '@/components/SocialProof';
import '@/app/globals.css';
import Link from 'next/link';
import {useIsDayTime} from '../components/useIsDayTime';
import { motion } from 'framer-motion';
import { FuturisticCard } from '@/components/futuristic/FuturisticCard';
import { ModernSection } from '@/components/futuristic/ModernSection';
import { ArrowRight, Zap, TrendingUp, CheckCircle } from 'lucide-react';

const Portfolio = () => {    const isDayTime = useIsDayTime();
    const works = [
        {
            title: 'SaaS Analytics Platform',
            category: 'Web Platform',
            impact: 'Reduced reporting time by 62% with unified data dashboards.',
        },
        {
            title: 'E-commerce Conversion Revamp',
            category: 'Commerce',
            impact: 'Improved checkout completion through UX simplification and speed gains.',
        },
        {
            title: 'Enterprise Client Portal',
            category: 'B2B Product',
            impact: 'Digitized support workflows and lowered response time for key accounts.',
        },
        {
            title: 'Healthcare Booking Experience',
            category: 'HealthTech',
            impact: 'Streamlined appointment journeys across patient, clinic, and admin views.',
        },
        {
            title: 'Operations Command Dashboard',
            category: 'Internal Tools',
            impact: 'Centralized alerts and decision data for faster day-to-day execution.',
        },
        {
            title: 'Product Discovery Microsite',
            category: 'Brand + Web',
            impact: 'Accelerated lead capture with focused messaging and modular storytelling.',
        },
    ];

    const featuredWork = works[0];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background effects */}
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(#00f5d4 1px, transparent 1px), linear-gradient(90deg, #00f5d4 1px, transparent 1px)',
                  backgroundSize: '60px 60px',
                }}
              />
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
              <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px]" />
              <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
            </div>

            {/* Hero with video */}
            <section className="relative w-full h-[320px] md:h-[480px] lg:h-[650px] overflow-hidden pt-28">
                <video
                    src="/assets/digital/Hero-P.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
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
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            Our
                            <br />
                            <span className="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">Portfolio</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl">
                            A showcase of digital products and platforms designed to drive growth and measurable business impact.
                        </p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-md">
                            {[
                                { value: '8+', label: 'Years Experience' },
                                { value: '13+', label: 'Team Members' },
                                { value: '123+', label: 'Products Launched' },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-3xl sm:text-4xl font-bold text-cyan-300">{stat.value}</div>
                                    <p className="text-sm text-slate-500 mt-2">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                {/* Featured Work Section */}
                <section className="mb-20 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-8">
                            <span className="inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-4">
                                <Zap className="w-4 h-4" /> Featured Work
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                                {featuredWork.title}
                            </h2>
                            <span className="inline-flex rounded-full text-xs font-semibold px-4 py-2 bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 mb-6">
                                {featuredWork.category}
                            </span>
                        </div>
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                    {featuredWork.impact}
                                </p>
                                <p className="text-slate-400 mb-8">
                                    Every engagement focuses on outcomes: improved efficiency, stronger conversion, and systems teams can scale confidently.
                                </p>
                                <Link
                                    href="/quote-request"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 group"
                                >
                                    Start a Project
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                            <FuturisticCard gradient="purple" hover="glow" className="p-8">
                                <div className="flex flex-col h-full justify-between">
                                    <p className="text-slate-300 leading-relaxed mb-6">
                                        We deliver digital excellence through strategic design, robust development, and measurable results that drive real business growth.
                                    </p>
                                    <div className="flex items-center text-cyan-400">
                                        <TrendingUp className="w-5 h-5 mr-2" />
                                        <span>View case studies →</span>
                                    </div>
                                </div>
                            </FuturisticCard>
                        </div>
                    </motion.div>
                </section>

                {/* More Work Grid */}
                <section>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-12">More Work</h3>
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
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                <FuturisticCard
                                    gradient={idx % 2 === 0 ? 'cyan' : 'purple'}
                                    hover="lift"
                                    className="p-8 h-full flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="inline-flex rounded-full text-xs font-semibold px-3 py-1.5 bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 mb-4">
                                            {item.category}
                                        </span>
                                        <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {item.impact}
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center text-cyan-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                                        Learn more →
                                    </div>
                                </FuturisticCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </main>
            <SocialProof page="portfolio"/>
            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer />}
        </div>
    );
};

export default Portfolio;