'use client';

import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../app/globals.css';
import Link from 'next/link';
import {blogPosts} from '../data/blogPosts';
import Image from 'next/image';
import {getBlogImage} from '../data/blogMedia';

// Get all unique categories
const CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map(p => p.tag))).sort()];

const Blog = () => {
    const [isDayTime, setIsDayTime] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    useEffect(() => {
        const updateThemeByTime = () => {
            const hour = new Date().getHours();
            setIsDayTime(hour >= 6 && hour < 18);
        };

        updateThemeByTime();
        const intervalId = setInterval(updateThemeByTime, 60_000);
        return () => clearInterval(intervalId);
    }, []);

    const allPosts = blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Filter by category
    const filtered = activeCategory === 'All'
        ? allPosts
        : allPosts.filter(p => p.tag === activeCategory);

    // Pagination
    const totalPages = Math.ceil(filtered.length / postsPerPage);
    const startIdx = (currentPage - 1) * postsPerPage;
    const paginatedPosts = filtered.slice(startIdx, startIdx + postsPerPage);
    const featuredPost = allPosts[0]; // First post is featured

    return (
        <div
            className={`${isDayTime ? 'bg-white text-black' : 'bg-black text-white'} min-h-screen transition-colors duration-500`}>
            <Header/>

            {/* Hero Section */}
            <section className="relative w-full h-[320px] md:h-[380px] lg:h-[800px] overflow-hidden">
                <video
                    src="/assets/hero/hero.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                    className={`absolute top-14 left-0 w-full h-full flex flex-col justify-center items-start text-start lg:max-w-[90em] px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                        isDayTime ? 'text-white' : 'text-white'
                    }`}>
                    <div
                        className="flex flex-col justify-start items-start border-b pb-[1.5em] border-gray-500/50 max-w-full w-full mx-auto ">
                        <h1
                            className={`px-0 constant-text lg:text-[5.35em] md:text-[4.4em] sm:text-[3.5em] text-[2em] lg:mt-[3em] md:mt-[3em] mt-[4em] w-auto h-auto leading-[1.2] pb-[0.08em] font-[600]`}>
                            The Blog
                        </h1>
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                        <div className={'lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em] md:mt-[1em]'}>
                            <p className={'text-[0.87em] font-[300]'}>
                                Insights on product, engineering, and scaling—written for founders, engineers, and teams
                                building great software.
                            </p>
                        </div>
                        <div
                            className={'relative grid lg:grid-cols-3 lg:gap-8 lg:ml-[13em]'}>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>{blogPosts.length}+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Posts Published</p>
                            </div>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>8+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Years Experience</p>
                            </div>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>13+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Team Members</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className={`mx-auto max-w-[100rem] px-4 sm:px-6 md:px-10 lg:px-[4.5em]`}>
                {/* Intro Text */}
                <section className="py-12 md:py-16">
                    <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                        Explore insights on product, engineering, and scaling. Delve into practical guides and expert
                        insights to keep you ahead of the curve.
                    </p>
                </section>

                {/* Featured Post */}
                {featuredPost && (
                    <section className="mb-16 md:mb-20">
                        <Link
                            href={`/blog/${featuredPost.slug}`}
                            className="group relative block w-full rounded-2xl overflow-hidden aspect-video md:aspect-[16/7]"
                        >
                            <div
                                className={`absolute inset-0 ${isDayTime ? 'bg-gradient-to-br from-gray-800 to-gray-600' : 'bg-gradient-to-br from-gray-800 to-gray-900'} group-hover:scale-105 transition-transform duration-500`}/>

                            {/* Overlay content */}
                            <div
                                className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <div className="flex items-center gap-3 mb-4">
                                    <span
                                        className={`text-xs font-semibold uppercase tracking-wider ${isDayTime ? 'text-teal-300' : 'text-teal-400'}`}>
                                        {featuredPost.tag}
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-3xl mb-3">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-sm text-white/70">
                                    {featuredPost.readTime}
                                </p>
                            </div>

                            {/* Latest insights label */}
                            <div className="absolute top-6 right-6 flex items-center gap-2">
                                <span className="text-xs font-semibold tracking-widest text-white/80 uppercase">
                                    Latest insights
                                </span>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Category Filter */}
                <section className="mb-12 md:mb-16">
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                                    activeCategory === cat
                                        ? isDayTime
                                            ? 'bg-gray-900 text-white border-gray-900'
                                            : 'bg-white text-black border-white'
                                        : isDayTime
                                            ? 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900'
                                            : 'bg-zinc-900 text-gray-300 border-zinc-700 hover:border-zinc-600 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Posts Grid */}
                <section className="mb-16 md:mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {paginatedPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col gap-3"
                            >
                                <div
                                    className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden ${isDayTime ? 'bg-gray-100' : 'bg-zinc-900'}`}>
                                    <Image
                                        src={getBlogImage(post.slug, post.tag)}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                                {/* Meta */}
                                <div
                                    className={`flex items-center gap-2 text-xs ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <span className={`font-medium ${isDayTime ? 'text-gray-600' : 'text-gray-300'}`}>
                                        {post.tag}
                                    </span>
                                    <span>·</span>
                                    <span>{post.readTime}</span>
                                </div>

                                {/* Title */}
                                <h3 className={`text-lg md:text-xl font-semibold leading-snug transition-colors ${
                                    isDayTime
                                        ? 'text-gray-900 group-hover:text-teal-600'
                                        : 'text-white group-hover:text-teal-400'
                                }`}>
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className={`text-sm leading-relaxed ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {post.excerpt}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className={`mb-20 md:mb-24 flex items-center justify-center gap-1`}>
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                isDayTime
                                    ? 'text-gray-500 hover:bg-gray-100 disabled:opacity-50'
                                    : 'text-gray-500 hover:bg-zinc-900 disabled:opacity-50'
                            }`}
                            aria-label="Previous page"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>

                        {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setCurrentPage(p)}
                                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                                    currentPage === p
                                        ? isDayTime
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-white text-black'
                                        : isDayTime
                                            ? 'text-gray-600 hover:bg-gray-100'
                                            : 'text-gray-400 hover:bg-zinc-900'
                                }`}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                isDayTime
                                    ? 'text-gray-500 hover:bg-gray-100 disabled:opacity-50'
                                    : 'text-gray-500 hover:bg-zinc-900 disabled:opacity-50'
                            }`}
                            aria-label="Next page"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                )}
            </main>

            {/* CTA Banner */}
            <section
                className={`py-20 md:py-24 px-4 sm:px-6 md:px-10 ${isDayTime ? 'bg-gray-900 text-white' : 'bg-gray-950 text-white'}`}>
                <div
                    className="mx-auto max-w-[90rem] lg:px-[4.5em] flex flex-col md:flex-row items-center justify-between gap-8">
                    <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
                        Let's make<br/>something incredible.
                    </h2>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap"
                    >
                        Start a project
                    </Link>
                </div>
            </section>

            <Footer/>
        </div>
    );
};

export default Blog;

