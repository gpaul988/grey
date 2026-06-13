'use client';

import React, {useEffect, useState} from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/globals.css';
import Link from 'next/link';
import {blogPosts} from '../data/blogPosts';
import Image from 'next/image';
import {getBlogImage} from '../data/blogMedia';
import AIProjectEstimator from "@/components/AIProjectEstimator";

const CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map(p => p.tag))).sort()];

const Blog = () => {
    const [isDayTime, setIsDayTime] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    useEffect(() => {
        const update = () => {
            const h = new Date().getHours();
            setIsDayTime(h >= 6 && h < 18);
        };
        update();
        const id = setInterval(update, 60_000);
        return () => clearInterval(id);
    }, []);

    const allPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const filtered = activeCategory === 'All' ? allPosts : allPosts.filter(p => p.tag === activeCategory);
    const totalPages = Math.ceil(filtered.length / postsPerPage);
    const paginatedPosts = filtered.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
    const featuredPost = allPosts[0];
    // Top 3 posts after featured for the editorial row
    const editorialPosts = allPosts.filter(p => p.slug !== featuredPost?.slug).slice(0, 3);

    const bg = isDayTime ? 'bg-white text-black' : 'bg-black text-white';

    return (
        <div className={`${bg} min-h-screen transition-colors duration-500`}>
            {/* Header now provided globally by app/layout.tsx — duplicate render disabled to fix doubled header */ false && <Header/>}

            {/* ── Hero ── */}
            <section className="relative w-full h-[320px] md:h-[380px] lg:h-[800px] overflow-hidden">
                <video src="/assets/hero/hero.mp4" autoPlay loop muted playsInline
                       className="absolute inset-0 h-full w-full object-cover"/>
                <div className="absolute inset-0 bg-black/40"/>
                <div
                    className="absolute top-14 left-0 w-full h-full flex flex-col justify-center items-start px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div
                        className="flex flex-col justify-start items-start border-b pb-[1.5em] border-gray-500/50 max-w-full w-full">
                        <h1 className="text-white constant-text lg:text-[5.35em] md:text-[4.4em] sm:text-[3.5em] text-[2em] lg:mt-[3em] md:mt-[3em] mt-[4em] leading-[1.2] pb-[0.08em] font-[600]">
                            The Blog
                        </h1>
                    </div>
                    <div className="relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] mt-[0.5em]">
                        <div className="lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em]">
                            <p className="text-white/80 text-[0.87em] font-[300]">
                                Insights on product, engineering, and scaling — written for founders, engineers, and
                                teams building great software.
                            </p>
                        </div>
                        <div className="relative grid lg:grid-cols-3 lg:gap-8 lg:ml-[13em]">
                            {[
                                [`${blogPosts.length}+`, 'Posts Published'],
                                ['8+', 'Years Experience'],
                                ['13+', 'Team Members'],
                            ].map(([n, l]) => (
                                <div key={l} className="border-0 lg:block md:hidden hidden">
                                    <h6 className="text-white text-[3em] font-[500] -mb-[0.3em]">{n}</h6>
                                    <p className="text-white/70 text-[0.7em] font-[300]">{l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-[100rem] px-4 sm:px-6 md:px-10 lg:px-[4.5em]">

                {/* ── Intro text ── */}
                <section className="py-12 md:py-16 border-b border-gray-200/60">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                            Practical guides, honest takes, and deep dives on building digital products that actually
                            work.
                        </p>
                        <Link href="/contact"
                              className={`text-sm font-medium underline underline-offset-4 whitespace-nowrap ${isDayTime ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`}>
                            Have a topic request? →
                        </Link>
                    </div>
                </section>

                {/* ── Featured post (full-width hero card) ── */}
                {featuredPost && (
                    <section className="py-12 md:py-14 border-b border-gray-200/60">
                        <Link href={`/blog/${featuredPost.slug}`}
                              className="group block rounded-3xl overflow-hidden relative w-full aspect-[16/8] md:aspect-[16/7]">
                            <Image
                                src={getBlogImage(featuredPost.slug, featuredPost.tag)}
                                alt={featuredPost.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                                sizes="100vw"
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"/>
                            <div className="absolute top-6 left-6 md:top-8 md:left-10">
                                <span
                                    className="text-xs font-semibold uppercase tracking-widest text-teal-300 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                    Latest post
                                </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12">
                                <span
                                    className={`text-xs font-semibold uppercase tracking-widest text-teal-300 mb-3 block`}>{featuredPost.tag}</span>
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-4xl mb-3">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-white/60 text-sm">{featuredPost.readTime}</p>
                            </div>
                        </Link>
                    </section>
                )}

                {/* ── Editorial row (3 highlight cards) ── */}
                {editorialPosts.length > 0 && (
                    <section className="py-10 md:py-12 border-b border-gray-200/60">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {editorialPosts.map(post => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col gap-3">
                                    <div
                                        className={`relative w-full aspect-[16/10] rounded-2xl overflow-hidden ${isDayTime ? 'bg-gray-100' : 'bg-zinc-900'}`}>
                                        <Image
                                            src={getBlogImage(post.slug, post.tag)}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width:768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <div
                                        className={`flex items-center gap-2 text-xs ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <span
                                            className={`font-semibold uppercase tracking-wider ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>{post.tag}</span>
                                        <span>·</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className={`text-base md:text-lg font-semibold leading-snug transition-colors ${isDayTime ? 'text-gray-900 group-hover:text-teal-600' : 'text-white group-hover:text-teal-400'}`}>
                                        {post.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── Category Filter ── */}
                <section className="pt-12 pb-6">
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                                    activeCategory === cat
                                        ? isDayTime ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-black border-white'
                                        : isDayTime ? 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900' : 'bg-zinc-900 text-gray-300 border-zinc-700 hover:border-zinc-600 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* ── Posts Grid ── */}
                <section className="pb-16 md:pb-20">
                    {paginatedPosts.length === 0 ? (
                        <p className={`py-16 text-center text-sm ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>No
                            posts in this category yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-14">
                            {paginatedPosts.map(post => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col gap-4">
                                    {/* Thumbnail */}
                                    <div
                                        className={`relative w-full aspect-[16/10] rounded-2xl overflow-hidden ${isDayTime ? 'bg-gray-100' : 'bg-zinc-900'}`}>
                                        <Image
                                            src={getBlogImage(post.slug, post.tag)}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                                        />
                                    </div>

                                    {/* Meta */}
                                    <div
                                        className={`flex items-center gap-2 text-xs ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <span
                                            className={`font-semibold uppercase tracking-wider ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>{post.tag}</span>
                                        <span>·</span>
                                        <span>{post.readTime}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className={`text-lg md:text-xl font-semibold leading-snug transition-colors ${isDayTime ? 'text-gray-900 group-hover:text-teal-600' : 'text-white group-hover:text-teal-400'}`}>
                                        {post.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className={`text-sm leading-relaxed line-clamp-3 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                        {post.excerpt}
                                    </p>

                                    {/* Read more */}
                                    <span
                                        className={`text-sm font-medium underline underline-offset-4 transition-colors ${isDayTime ? 'text-gray-500 group-hover:text-teal-600' : 'text-gray-400 group-hover:text-teal-400'}`}>
                                        Read article →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* ── Pagination ── */}
                {totalPages > 1 && (
                    <div className="pb-20 flex items-center justify-center gap-1">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDayTime ? 'text-gray-500 hover:bg-gray-100 disabled:opacity-40' : 'text-gray-500 hover:bg-zinc-900 disabled:opacity-40'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>
                        {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                onClick={() => setCurrentPage(p)}
                                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${currentPage === p ? isDayTime ? 'bg-gray-900 text-white' : 'bg-white text-black' : isDayTime ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-400 hover:bg-zinc-900'}`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDayTime ? 'text-gray-500 hover:bg-gray-100 disabled:opacity-40' : 'text-gray-500 hover:bg-zinc-900 disabled:opacity-40'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                )}
            </main>

            <div
                className={`relative -mt-14 py-8 mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] max-w-full w-full h-auto ${
                    isDayTime ? 'bg-teal-100 text-teal-900' : 'bg-teal-950 text-white'
                }`}
            >
                <AIProjectEstimator/>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default Blog;