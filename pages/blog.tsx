'use client';

import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import {motion, AnimatePresence} from 'framer-motion';
import {FaFilter, FaClock} from 'react-icons/fa';

interface BlogPostMerged {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    tag: string;
    readTime: string;
    date: string;
    cover: string;
    author: string;
    authorRole?: string;
    authorAvatar?: string;
    tags?: string[];
    featured?: boolean;
}

const BlogIndexPage = () => {
    const [isDayTime, setIsDayTime] = useState(true);
    const [fetchedPosts, setFetchedPosts] = useState<BlogPostMerged[]>([]);
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

    // Fetch live posts from SQLite database API
    useEffect(() => {
        const loadDbPosts = async () => {
            try {
                const res = await fetch('/admin/api/blog');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && Array.isArray(data.data)) {
                        const mapped: BlogPostMerged[] = data.data.map((p: any) => {
                            let parsedTags: string[] = [];
                            try {
                                parsedTags = JSON.parse(p.tags || '[]');
                            } catch (e) {
                                parsedTags = p.tags ? [p.tags] : [];
                            }
                            return {
                                id: String(p.id),
                                slug: p.slug || `post-${p.id}`,
                                title: p.title,
                                excerpt: p.excerpt || 'Read the full article written by our engineering team details.',
                                content: p.body || '',
                                tag: parsedTags[0] || 'Technical',
                                tags: parsedTags,
                                readTime: p.read_time || `${Math.max(2, Math.ceil((p.body || '').length / 900))} min read`,
                                date: p.published_at || new Date().toISOString().slice(0, 10),
                                cover: p.cover || '/assets/mvp/start.jpg',
                                author: p.author || 'Grey InfoTech',
                                authorRole: 'Technical Contributor',
                                authorAvatar: '/favicon.svg'
                            };
                        });
                        setFetchedPosts(mapped);
                    }
                }
            } catch (err) {
                console.error('Failed to load DB blog posts:', err);
            }
        };
        loadDbPosts();
    }, []);

    const staticPosts: BlogPostMerged[] = [
        {
            id: 'static-post-1',
            slug: 'designing-for-scale',
            title: 'Designing for Scale: What Growing Teams Miss',
            tag: 'Product Strategy',
            readTime: '6 min read',
            date: '2026-05-28',
            excerpt: 'Practical patterns for avoiding rework when your product starts moving from MVP to growth stage.',
            content: '',
            cover: '/assets/ui-ux/hero.jpg',
            author: 'Damilola Shofoluwe',
            authorRole: 'Product Director',
            authorAvatar: '/favicon.svg'
        },
        {
            id: 'static-post-2',
            slug: 'scope-mvp-delivery',
            title: 'How to Scope an MVP Without Slowing Delivery',
            tag: 'Venture Build',
            readTime: '5 min read',
            date: '2026-05-21',
            excerpt: 'A lightweight framework we use to protect budget while still delivering measurable user value.',
            content: '',
            cover: '/assets/startup/market.jpg',
            author: 'Godwin Paul',
            authorRole: 'Technical Cofounder',
            authorAvatar: '/favicon.svg'
        },
        {
            id: 'static-post-3',
            slug: 'refactor-vs-rebuild',
            title: 'When to Refactor vs When to Rebuild Codebases',
            tag: 'Engineering',
            readTime: '7 min read',
            date: '2026-05-14',
            excerpt: 'Signals that indicate whether incremental modernization or a full reset is the better business move.',
            content: '',
            cover: '/assets/node/hero.jpg',
            author: 'Efe Otuama',
            authorRole: 'Senior System Engineer',
            authorAvatar: '/favicon.svg'
        }
    ];

    // Combine database posts and static posts
    const dbSlugs = new Set(fetchedPosts.map(p => p.slug));
    const allPosts = [
        ...fetchedPosts,
        ...staticPosts.filter(p => !dbSlugs.has(p.slug))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Category lists
    const categories = ['All', 'Product Strategy', 'Venture Build', 'Engineering', 'Security', 'Technical'];

    // Filtered lists
    const filtered = activeCategory === 'All'
        ? allPosts
        : allPosts.filter(p => p.tag.toLowerCase().includes(activeCategory.toLowerCase()));

    // Pagination
    const totalPages = Math.ceil(filtered.length / postsPerPage);
    const startIdx = (currentPage - 1) * postsPerPage;
    const paginated = filtered.slice(startIdx, startIdx + postsPerPage);

    // Featured post
    const featuredPost = allPosts[0];

    const themeBg = isDayTime ? 'bg-[#fcfbf9] text-[#121212]' : 'bg-[#0f0e0c] text-[#f7f5f0]';
    const cardBg = isDayTime ? 'bg-white border-zinc-100 hover:shadow-lg' : 'bg-[#151412] border-zinc-800/80 hover:shadow-lg hover:shadow-black';

    return (
        <div className={`min-h-screen ${themeBg} transition-colors duration-500 font-sans flex flex-col`}>
            <Header/>

            {/* Lightflows styled banner header */}
            <section className={`pt-32 pb-16 border-b ${isDayTime ? 'border-zinc-200/60' : 'border-zinc-800/60'}`}>
                <div className="max-w-[85rem] mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="max-w-4xl">
                        <span className="text-teal-600 font-semibold tracking-[0.25em] text-xs uppercase block mb-4">
                            Insights & Strategy
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                            Thinking, guides and perspectives on building modern software.
                        </h1>
                        <p className={`text-lg sm:text-xl font-normal leading-relaxed max-w-2xl ${isDayTime ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            Practical advice on digital transformation, system scaling, visual UX audits, and product
                            deliveries.
                        </p>
                    </div>
                </div>
            </section>

            {/* Top Featured Post - Lightflows Style */}
            {featuredPost && activeCategory === 'All' && currentPage === 1 && (
                <section className="py-12 bg-transparent">
                    <div className="max-w-[85rem] mx-auto px-6 sm:px-8 lg:px-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#14b8a6] block mb-6">★ Featured Insight</span>
                        <div
                            className={`rounded-3xl overflow-hidden border p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${cardBg}`}>
                            {/* Hero Image */}
                            <Link href={`/blog/${featuredPost.slug}`}
                                  className="block relative aspect-video rounded-2xl overflow-hidden">
                                <Image
                                    src={featuredPost.cover || '/assets/ui-ux/hero.jpg'}
                                    alt={featuredPost.title}
                                    fill
                                    referrerPolicy="no-referrer"
                                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </Link>

                            {/* Content info */}
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <span
                                        className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-600 inline-block mb-4">
                                        {featuredPost.tag}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight hover:text-teal-600 transition-colors">
                                        <Link href={`/blog/${featuredPost.slug}`}>
                                            {featuredPost.title}
                                        </Link>
                                    </h2>
                                    <p className={`text-sm sm:text-base leading-relaxed mt-4 mb-6 ${isDayTime ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                        {featuredPost.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 pt-6 border-t border-zinc-500/10">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-200">
                                        <Image src={featuredPost.authorAvatar || '/favicon.svg'}
                                               alt={featuredPost.author} fill className="object-cover"/>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold leading-tight">{featuredPost.author}</p>
                                        <p className="text-xs text-zinc-400">{featuredPost.authorRole || 'Contributor'} • {featuredPost.readTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Category / Filter toolbar */}
            <section className="py-6 border-b border-zinc-500/10">
                <div
                    className="max-w-[85rem] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span
                        className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                        <FaFilter className="text-teal-600 text-xs"/> Categories
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => {
                                    setActiveCategory(c);
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                                    activeCategory === c
                                        ? 'bg-teal-600 text-white shadow-md shadow-teal-600/10'
                                        : isDayTime
                                            ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black'
                                            : 'bg-[#181714] text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main grid of blog articles */}
            <main className="flex-grow max-w-[85rem] w-full mx-auto px-6 sm:px-8 lg:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    <AnimatePresence mode="popLayout">
                        {paginated.map((post, idx) => (
                            <motion.article
                                key={post.id}
                                layout
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, scale: 0.95}}
                                transition={{duration: 0.4, delay: idx * 0.05}}
                                className={`rounded-2xl border p-5 group flex flex-col justify-between transition-all duration-300 ${cardBg}`}
                            >
                                <div className="flex flex-col">
                                    {/* Article cover */}
                                    <Link href={`/blog/${post.slug}`}
                                          className="block relative aspect-[16/9] rounded-xl overflow-hidden mb-5">
                                        <Image
                                            src={post.cover}
                                            alt={post.title}
                                            fill
                                            referrerPolicy="no-referrer"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                    </Link>

                                    {/* Meta row */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <span
                                            className="text-[9px] font-bold uppercase tracking-wider text-teal-600 px-2 py-0.5 bg-teal-500/10 rounded">
                                            {post.tag}
                                        </span>
                                        <span className="text-zinc-400 text-xs">•</span>
                                        <span className="text-[10px] text-zinc-400 font-medium flex items-center gap-1">
                                            <FaClock className="text-[9px]"/> {post.readTime}
                                        </span>
                                    </div>

                                    {/* Title and Excerpt */}
                                    <h3 className="text-lg font-bold leading-tight hover:text-teal-600 transition-colors mb-2">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className={`text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 ${isDayTime ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                        {post.excerpt}
                                    </p>
                                </div>

                                {/* Author info */}
                                <div className="flex items-center gap-3 pt-4 border-t border-zinc-500/10">
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-200">
                                        <Image src={post.authorAvatar || '/favicon.svg'} alt={post.author} fill
                                               className="object-cover"/>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold leading-tight">{post.author}</p>
                                        <p className="text-[10px] text-zinc-500">{post.date}</p>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className={`text-zinc-500 text-base`}>No articles found matching this category filter.</p>
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-16">
                        {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => {
                                    setCurrentPage(p);
                                    window.scrollTo({top: 300, behavior: 'smooth'});
                                }}
                                className={`w-10 h-10 rounded-full font-semibold text-xs border transition-colors ${
                                    currentPage === p
                                        ? 'bg-teal-600 text-white border-teal-600'
                                        : isDayTime
                                            ? 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
                                            : 'bg-[#151412] text-zinc-400 border-zinc-800 hover:border-zinc-600'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}
            </main>

            <Footer/>
        </div>
    );
};

export default BlogIndexPage;
