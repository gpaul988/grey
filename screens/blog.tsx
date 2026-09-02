'use client';

import React, { useState } from 'react';
import '@/app/globals.css';
import Link from 'next/link';
import { blogPosts } from '../data/blogPosts';
import Image from 'next/image';
import { getBlogImage } from '../data/blogMedia';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';
import { useIsDayTime } from '../components/useIsDayTime';
import {
    FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxGlitchText, FxSectionHeading
} from '@/components/futuristic/fx';

const CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map(p => p.tag))).sort()];

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    const isDayTime = useIsDayTime();
    const dark = !isDayTime;

    const filtered = activeCategory === 'All'
        ? blogPosts
        : blogPosts.filter(p => p.tag === activeCategory);

    const totalPages = Math.ceil(filtered.length / postsPerPage);
    const paginated = filtered.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
    const featured = filtered[0];
    const rest = paginated.slice(1);

    return (
        <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-[#04090f] text-white' : 'bg-white text-black'}`}>

            {/*  -  -  Hero  -  -  */}
            <section className="relative overflow-hidden min-h-[72vh] flex flex-col justify-end">
                {/* Editorial bg  - angled split */}
                <div className={`absolute inset-0 ${dark ? 'bg-[#04090f]' : 'bg-gray-900'}`} />
                {/* Diagonal accent */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute right-0 top-0 w-[55%] h-full opacity-30"
                        style={{
                            background: 'linear-gradient(135deg, transparent 40%, #0d9488 100%)',
                            clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        }}
                    />
                </div>

                <FxBackground day={false} grid aurora className="opacity-50" />
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-hero-scan" />
                <div className="gx-noise-overlay" />
                <div className="gx-orbit pointer-events-none absolute" style={{ width: '70vmax', height: '70vmax', top: '-25vmax', right: '-20vmax', opacity: .12 }} />

                <div className="relative z-10 gx-page-hero-content">
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal>
                            <FxChip day={false} className="mb-5">
                                <BookOpen className="w-3 h-3 inline mr-1.5" />
                                Insights & Ideas
                            </FxChip>
                            <div className="border-b border-white/15 pb-7 mb-7 max-w-5xl">
                                <FxGlitchText tag="h1" className="gx-hero-title text-white">
                                    The Grey <span className="gx-gradient-text">Journal</span>
                                </FxGlitchText>
                            </div>
                            <p className="text-white/65 max-w-2xl text-[0.95em] md:text-[1.05em] leading-relaxed mb-8">
                                Perspectives on technology, product design, and digital strategy  - written by the team building real products every day.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {[`${blogPosts.length} Articles`, 'Weekly Updates', 'Tech + Strategy + Design'].map(s => (
                                    <span key={s} className="gx-data-pill">{s}</span>
                                ))}
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/*  -  -  Intro  -  -  */}
            <section
                className={`pt-16 transition-colors duration-500 ${
                    isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                }`}
            >
                <FxBackground day={isDayTime} />
                <div className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={isDayTime}>INSIGHTS & STORIES</FxChip>
                    </div>
                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] lg:mt-[0.01em] rounded-none lg:tracking-normal tracking-tight leading-[1.3] lg:pb-10 pb-6">
                                Insights &<br/><span className="gx-gradient-text">Stories</span>
                            </h3>
                        </FxReveal>
                        <FxReveal delay={0.1}>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]">
                                <div><p>Perspectives on technology, product design, and digital strategy  - written by the team building real products every day. We share insights from our experience working with clients across industries.</p></div>
                                <div><p>From emerging trends to practical tips, our blog covers topics that matter to modern businesses. Read on for actionable advice, case studies, and thought leadership from our team.</p></div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/*  -  -  Category Filter  -  -  */}
            <section className={`sticky top-0 z-30 py-4 px-4 sm:px-6 md:px-10 lg:px-[4.5em] backdrop-blur-lg border-b ${
                dark ? 'bg-[#04090f]/90 border-white/10' : 'bg-white/90 border-gray-200'
            }`}>
                <div className="max-w-[90rem] mx-auto flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                            className={`px-4 py-1.5 rounded-full text-[0.78em] font-[600] border transition-all duration-200 ${
                                activeCategory === cat
                                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-transparent shadow-[0_4px_15px_rgba(45,212,191,0.3)]'
                                    : dark
                                        ? 'bg-transparent text-gray-300 border-white/15 hover:border-teal-400/50'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-teal-400'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/*  -  -  Featured Article  - Editorial Spread  -  -  */}
            {featured && (
                <section className={`relative py-16 px-4 sm:px-6 md:px-10 lg:px-[4.5em] ${dark ? 'bg-[#04090f]' : 'bg-gray-50'}`}>
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal className="mb-8">
                            <div className="flex items-center gap-3">
                                <TrendingUp className={`w-4 h-4 ${dark ? 'text-teal-400' : 'text-teal-600'}`} />
                                <span className={`text-[0.72em] font-[700] uppercase tracking-[0.2em] ${dark ? 'text-teal-400' : 'text-teal-600'}`}>
                                    Featured Article
                                </span>
                                <div className={`flex-1 h-px ${dark ? 'bg-white/08' : 'bg-gray-200'}`} />
                            </div>
                        </FxReveal>

                        <Link href={`/blog/${featured.slug}`}>
                            <FxHoloCard day={isDayTime} className="group overflow-hidden p-0 cursor-pointer">
                                <div className="grid lg:grid-cols-[1fr_1.2fr] items-stretch">
                                    {/* Image */}
                                    <div className="relative aspect-video lg:aspect-auto min-h-[280px] overflow-hidden">
                                        <Image
                                            src={getBlogImage(featured.slug) || '/assets/blog/default.jpg'}
                                            alt={featured.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className={`absolute inset-0 ${dark ? 'bg-gradient-to-r from-transparent to-[#04090f]/70' : 'bg-gradient-to-r from-transparent to-white/30'}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="p-10 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-5">
                                            <span className="gx-data-pill text-[0.65em]">{featured.tag}</span>
                                            <span className={`text-[0.72em] font-mono ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                <Calendar className="w-3 h-3 inline mr-1" />
                                                {featured.date}
                                            </span>
                                        </div>

                                        <h2 className={`text-[1.7em] md:text-[2.1em] font-[800] leading-[1.2] tracking-tight mb-4 group-hover:text-teal-400 transition-colors duration-300 ${dark ? 'text-white' : 'text-gray-900'}`}>
                                            {featured.title}
                                        </h2>

                                        <p className={`text-[0.9em] leading-[1.8] mb-6 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {featured.excerpt}
                                        </p>

                                        <div className={`flex items-center justify-between mt-auto pt-6 border-t ${dark ? 'border-white/10' : 'border-gray-100'}`}>
                                            <div className="flex items-center gap-2">
                                                <User className={`w-4 h-4 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
                                                <span className={`text-[0.8em] ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{featured.author}</span>
                                            </div>
                                            <span className={`inline-flex items-center gap-2 text-[0.8em] font-[700] transition-all duration-200 group-hover:gap-3 ${dark ? 'text-teal-400' : 'text-teal-600'}`}>
                                                Read Article <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </Link>
                    </div>
                </section>
            )}

            {/*  -  -  Article Grid  - Magazine Layout  -  -  */}
            <section className={`relative py-16 px-4 sm:px-6 md:px-10 lg:px-[4.5em] ${dark ? 'bg-[#020810]' : 'bg-white'}`}>
                <FxBackground day={isDayTime} grid={true} aurora={false} className="opacity-08" />
                <div className="max-w-[90rem] mx-auto relative z-10">

                    <FxReveal className="mb-12">
                        <FxSectionHeading
                            day={isDayTime}
                            eyebrow="All Articles"
                            title="More from the Journal"
                        />
                    </FxReveal>

                    {/* Masonry-style grid */}
                    <motion.div
                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                        layout
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {rest.map((post, i) => (
                            <motion.div
                                key={post.slug}
                                layout
                                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                                // Make every 4th item span 2 columns for magazine feel
                                className={i % 7 === 3 ? 'md:col-span-2 lg:col-span-1' : ''}
                            >
                                <Link href={`/blog/${post.slug}`} className="block h-full">
                                    <FxHoloCard day={isDayTime} className="h-full flex flex-col group cursor-pointer p-0 overflow-hidden">
                                        {/* Thumbnail */}
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image
                                                src={getBlogImage(post.slug) || '/assets/blog/default.jpg'}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Category overlay badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="gx-data-pill text-[0.62em]">{post.tag}</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className={`text-[0.7em] font-mono ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    <Calendar className="w-3 h-3 inline mr-1" />{post.date}
                                                </span>
                                                <span className={`text-[0.7em] ${dark ? 'text-gray-600' : 'text-gray-300'}`}>·</span>
                                                <span className={`text-[0.7em] font-mono ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    <User className="w-3 h-3 inline mr-1" />{post.author}
                                                </span>
                                            </div>

                                            <h3 className={`text-[1.05em] font-[700] leading-[1.3] mb-3 group-hover:text-teal-400 transition-colors duration-300 ${dark ? 'text-white' : 'text-gray-900'}`}>
                                                {post.title}
                                            </h3>

                                            <p className={`text-[0.84em] leading-[1.7] flex-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {post.excerpt?.slice(0, 120)}{post.excerpt?.length > 120 ? '…' : ''}
                                            </p>

                                            <div className={`mt-5 pt-4 border-t flex items-center justify-between ${dark ? 'border-white/08' : 'border-gray-100'}`}>
                                                <span className={`text-[0.75em] font-[600] uppercase tracking-wider ${dark ? 'text-teal-500' : 'text-teal-600'}`}>
                                                    Read More
                                                </span>
                                                <ArrowRight className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ${dark ? 'text-teal-400' : 'text-teal-600'}`} />
                                            </div>
                                        </div>
                                    </FxHoloCard>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <FxReveal className="mt-14 flex justify-center gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-full text-[0.82em] font-[700] border transition-all duration-200 ${
                                        currentPage === i + 1
                                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-transparent shadow-[0_4px_15px_rgba(45,212,191,0.35)]'
                                            : dark
                                                ? 'bg-transparent text-gray-300 border-white/15 hover:border-teal-400/50'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-teal-400'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </FxReveal>
                    )}
                </div>
            </section>

            {/*  -  -  CTA  -  -  */}
            <section className={`relative overflow-hidden py-24 px-4 sm:px-6 md:px-10 lg:px-[4.5em] text-center ${dark ? 'bg-black/40' : 'bg-teal-950'} text-white`}>
                <FxBackground day={false} grid aurora className="opacity-60" />
                <div className="gx-scanline pointer-events-none" />
                <div className="relative z-10">
                    <FxReveal>
                        <FxChip day={false} className="mb-6">Have a project?</FxChip>
                        <FxGlitchText tag="h2" className="text-[2.2em] md:text-[3em] font-[800] leading-[1.1] tracking-tight mb-6">
                            Turn ideas into<br />
                            <span className="gx-gradient-text">digital reality.</span>
                        </FxGlitchText>
                        <div className="flex flex-wrap justify-center gap-4">
                            <FxButton day={false} href="/quote-request" variant="solid">Get a Quote</FxButton>
                            <FxButton day={false} href="/contact" variant="ghost">Talk to Us</FxButton>
                        </div>
                    </FxReveal>
                </div>
            </section>
        </div>
    );
};

export default Blog;
