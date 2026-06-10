'use client';

import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {useRouter} from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import {FaArrowLeft, FaClock, FaLinkedin, FaTwitter, FaFacebook, FaLink} from 'react-icons/fa';

interface BlogPostDetails {
    slug: string;
    title: string;
    excerpt: string;
    body: string;
    cover: string;
    tag: string;
    readTime: string;
    date: string;
    author: string;
    authorRole?: string;
    authorAvatar?: string;
}

const BlogArticlePage = () => {
    const router = useRouter();
    const {slug} = router.query;
    const [isDayTime, setIsDayTime] = useState(true);
    const [post, setPost] = useState<BlogPostDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const updateThemeByTime = () => {
            const hour = new Date().getHours();
            setIsDayTime(hour >= 6 && hour < 18);
        };
        updateThemeByTime();
        const intervalId = setInterval(updateThemeByTime, 60_000);
        return () => clearInterval(intervalId);
    }, []);

    // Selections corresponding to seeded blog posts
    const staticPostsContent: Record<string, BlogPostDetails> = {
        'designing-for-scale': {
            slug: 'designing-for-scale',
            title: 'Designing for Scale: What Growing Teams Miss',
            tag: 'Product Strategy',
            readTime: '6 min read',
            date: '2026-05-28',
            excerpt: 'Practical patterns for avoiding rework when your product starts moving from MVP to growth stage.',
            cover: '/assets/ui-ux/hero.jpg',
            author: 'Damilola Shofoluwe',
            authorRole: 'Product Director',
            authorAvatar: '/favicon.svg',
            body: `When you are shipping fast at the MVP stage, design decisions often prioritize speed over structure. This works beautifully until it does not. We have seen countless teams hit a wall around 50–100k users. The patterns that got them there suddenly become bottlenecks. Features interact in waves no one predicted. Performance degrades. User friction compounds.

## Async clarity beats sync perfection
Rather than endless alignment meetings, document decisions clearly and let teams move in parallel. This requires discipline, but it is the only way to maintain velocity at scale. Build self-contained service packages that do not require synchronous locking during daily tasks.

## Systems before features
Before you add post-notification aggregation or advanced filtering, get your core data model and API response patterns right. One small mistake here costs you months of rework later. Implement strict schema audits, consistent envelope outputs, and keep your memory allocations linear.

## Friction surfaces early
The best teams instrument their products heavily from day one. Not for vanity metrics — for real friction points. Where do users get stuck? Where do they drop off? What paths are slow? Use query analyzers and client tracing to spot and resolve drops immediately.

## Progressive enhancement over rewrites
Fresh starts feel good but waste months. Instead, incrementally upgrade your systems. Keep shipping features while you strengthen the foundation. Rebuild small endpoints behind proxies rather than restarting from zero.`
        },
        'scope-mvp-delivery': {
            slug: 'scope-mvp-delivery',
            title: 'How to Scope an MVP Without Slowing Delivery',
            tag: 'Venture Build',
            readTime: '5 min read',
            date: '2026-05-21',
            excerpt: 'A lightweight framework we use to protect budget while still delivering measurable user value.',
            cover: '/assets/startup/market.jpg',
            author: 'Godwin Paul',
            authorRole: 'Technical Cofounder',
            authorAvatar: '/favicon.svg',
            body: `Scope creep kills MVPs. But too little scope leaves you with a toy instead of a testable product. We have found a simple framework that balances both.

## The Must-Should-Could model
Identify features based on delivery tiers:
- Must: Core value prop that users would pay for.
- Should: Features that make the experience feel complete.
- Could: Nice-to-haves that do not block launch.

Most teams get this backwards. They build everything and ship late. Instead, ship Must + best Should features, then let real usage guide what is next.

## Time-box by layer
Structure MVP timelines strictly:
- Backend configuration: 2 weeks max.
- Frontend compilation: 2 weeks max.
- Polish & security testing: 1 week.

This forces trade-offs, prevents over-engineering, and keeps team momentum high by shipping something real within a month.

## Measure from day one
Do not wait for "launch" to start collecting data. Instrument your MVP to understand what users actually do, not what you assumed they would do. Let telemetry and actual usage data guide your revision budgets.`
        },
        'refactor-vs-rebuild': {
            slug: 'refactor-vs-rebuild',
            title: 'When to Refactor vs When to Rebuild Codebases',
            tag: 'Engineering',
            readTime: '7 min read',
            date: '2026-05-14',
            excerpt: 'Signals that indicate whether incremental modernization or a full reset is the better business move.',
            cover: '/assets/node/hero.jpg',
            author: 'Efe Otuama',
            authorRole: 'Senior System Engineer',
            authorAvatar: '/favicon.svg',
            body: `The refactor-or-rebuild decision has killed more engineering momentum than almost any other choice. Most teams default to refactoring because it feels safer. But sometimes rebuilding is faster, cheaper, and less risky.

## Core arguments for Refactoring
Incremental upgrades work best if:
- Your core architecture is sound but execution is messy.
- You have strong test coverage to work against.
- The team knows why the current code is structured that way.
- Most of your system can stay, just parts need updating.

## Hard indicators for a Rebuild
Commit to a fresh foundation if:
- Your architecture has fundamental flaws (wrong database pattern, bad abstractions).
- You have almost no tests and can not safely make edits.
- More than 60% of the files require complete rewrite.
- New team members struggle to understand basic patterns.

## Parallel Building as a compromise
Keep the old system alive while you build the new one. Gradually route traffic to the new version. This lowers risk dramatically and gives you an escape hatch if problems emerge.`
        }
    };

    // Load blog post details
    useEffect(() => {
        if (!slug || typeof slug !== 'string') return;
        setIsLoading(true);

        const fetchPost = async () => {
            // First check dynamic sqlite database
            try {
                const res = await fetch('/admin/api/blog');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && Array.isArray(data.data)) {
                        const matchedDb = data.data.find((p: any) => p.slug === slug);
                        if (matchedDb) {
                            let parsedTags: string[] = [];
                            try {
                                parsedTags = JSON.parse(matchedDb.tags || '[]');
                            } catch (e) {
                                parsedTags = matchedDb.tags ? [matchedDb.tags] : [];
                            }
                            setPost({
                                slug: matchedDb.slug,
                                title: matchedDb.title,
                                excerpt: matchedDb.excerpt || '',
                                body: matchedDb.body || '',
                                cover: matchedDb.cover || '/assets/ui-ux/hero.jpg',
                                tag: parsedTags[0] || 'Technical',
                                readTime: matchedDb.read_time || '5 min read',
                                date: matchedDb.published_at || new Date().toISOString().slice(0, 10),
                                author: matchedDb.author || 'Grey InfoTech',
                                authorRole: 'Technical Contributor',
                                authorAvatar: '/favicon.svg'
                            });
                            setIsLoading(false);
                            return;
                        }
                    }
                }
            } catch (err) {
                console.error('Failed to query DB for slug:', err);
            }

            // Fallback to static post content
            const foundStatic = staticPostsContent[slug] || null;

            setPost(foundStatic);
            setIsLoading(false);
        };

        fetchPost();
    }, [slug]);

    // Parse Headings out of the body for the Floating Table of Contents
    const headings = useMemo(() => {
        if (!post) return [];
        const lines = post.body.split('\n');
        const found: { text: string; id: string; }[] = [];
        const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        for (const line of lines) {
            if (line.startsWith('## ')) {
                const text = line.replace('## ', '').trim();
                found.push({
                    text,
                    id: slugify(text)
                });
            }
        }
        return found;
    }, [post]);

    // Split body into stylized paragraphs and headers for display matching ChatGPT meets Shopify
    const bodyElements = useMemo(() => {
        if (!post) return [];
        const paragraphs = post.body.split('\n\n').map(p => p.trim()).filter(Boolean);
        const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        return paragraphs.map((para, i) => {
            if (para.startsWith('## ')) {
                const text = para.replace('## ', '').trim();
                return {
                    type: 'heading',
                    text,
                    id: slugify(text),
                    key: `h-${i}`
                };
            }
            if (para.startsWith('- ') || para.startsWith('* ')) {
                return {
                    type: 'list',
                    items: para.split('\n').map(line => line.replace(/^[-*]\s/, '').trim()),
                    key: `l-${i}`
                };
            }
            return {
                type: 'paragraph',
                text: para,
                key: `p-${i}`
            };
        });
    }, [post]);

    const handleCopyLink = useCallback(async () => {
        try {
            if (typeof window !== 'undefined') {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (e) {
        }
    }, []);

    if (isLoading) {
        return (
            <div
                className={`${isDayTime ? 'bg-white text-black' : 'bg-black text-white'} min-h-screen flex flex-col justify-between transition-colors`}>
                <Header/>
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-sm font-semibold tracking-wider text-zinc-500 uppercase animate-pulse">Loading
                        article details...</p>
                </div>
                <Footer/>
            </div>
        );
    }

    if (!post) {
        return (
            <div
                className={`${isDayTime ? 'bg-white text-black' : 'bg-[#0a0a0a] text-white'} min-h-screen flex flex-col justify-between transition-colors`}>
                <Header/>
                <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
                    <p className="text-zinc-500 max-w-sm mb-6 text-sm">We couldn't locate this blog article.</p>
                    <Link href="/blog"
                          className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-600 text-white">
                        Browse All Articles
                    </Link>
                </div>
                <Footer/>
            </div>
        );
    }

    const themeBg = isDayTime ? 'bg-[#fcfbf9] text-[#121212]' : 'bg-[#0f0e0c] text-[#f7f5f0]';
    const cellBg = isDayTime ? 'bg-[#f4f2ee]' : 'bg-[#181613]';
    const sectionBorder = isDayTime ? 'border-zinc-200' : 'border-zinc-800/80';
    const contentColor = isDayTime ? 'text-zinc-700' : 'text-zinc-300';

    return (
        <div className={`min-h-screen ${themeBg} transition-colors duration-500 font-sans flex flex-col`}>
            <Header/>

            {/* Back Button Sub-header */}
            <div className={`pt-28 pb-4 border-b ${sectionBorder} bg-transparent`}>
                <div className="max-w-6xl mx-auto px-6">
                    <Link href="/blog"
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-teal-600 hover:text-teal-500 transition-colors">
                        <FaArrowLeft/> Back to Blog Index
                    </Link>
                </div>
            </div>

            {/* Core Article Layout */}
            <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-12">
                {/* Title and Metadata */}
                <div className="max-w-3xl mb-10">
                    <span
                        className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-600 inline-block mb-4">
                        {post.tag}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.12]">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 mt-6 text-xs text-zinc-400 font-medium">
                        <span className="font-bold text-zinc-700 dark:text-zinc-300">{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><FaClock/> {post.readTime}</span>
                    </div>
                </div>

                {/* Cover Image */}
                <div
                    className={`relative aspect-video w-full rounded-[2.5rem] overflow-hidden border ${sectionBorder} mb-12`}>
                    <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        priority
                        referrerPolicy="no-referrer"
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>

                {/* Columns: Sidebar (TOC) + Article Body Column + Sidebar (CTA) */}
                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_240px] gap-10 xl:gap-14 items-start">
                    {/* Left Sidebar: Table of Contents */}
                    <aside
                        className="sticky top-28 self-start hidden lg:block border-r border-zinc-500/15 pr-6 font-medium">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4">Table of
                            Contents</h4>
                        {headings.length > 0 ? (
                            <ul className="space-y-3.5 text-xs text-left">
                                {headings.map((h, i) => (
                                    <li key={i}>
                                        <a href={`#${h.id}`}
                                           className="block text-zinc-500 hover:text-teal-600 transition-colors py-0.5 leading-tight">
                                            {h.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-[10px] text-zinc-500 font-normal">Standard Editorial format.</p>
                        )}

                        {/* Social Shares */}
                        <div className="mt-10 pt-8 border-t border-zinc-500/15">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4">Share
                                Article</h4>
                            <div className="flex gap-4 text-sm text-zinc-500">
                                <button onClick={handleCopyLink} className="hover:text-teal-600 transition-colors"
                                        title="Copy Link">
                                    <FaLink/>
                                </button>
                                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                                   target="_blank" rel="noopener noreferrer"
                                   className="hover:text-teal-500 transition-colors">
                                    <FaTwitter/>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                   className="hover:text-teal-700 transition-colors">
                                    <FaLinkedin/>
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                   className="hover:text-teal-600 transition-colors">
                                    <FaFacebook/>
                                </a>
                            </div>
                            {copied && <span className="text-[10px] text-teal-600 font-bold block mt-2 animate-pulse">Link Copied!</span>}
                        </div>
                    </aside>

                    {/* Central Column: Article Body */}
                    <div className="min-w-0">
                        {/* Excerpt Lead paragraph */}
                        {post.excerpt && (
                            <div className="p-6 rounded-2xl bg-teal-500/5 border border-teal-500/10 mb-8">
                                <p className="text-base sm:text-lg font-medium leading-relaxed text-teal-800/90 dark:text-teal-400">
                                    {post.excerpt}
                                </p>
                            </div>
                        )}

                        {/* Block body content mapped */}
                        <div className="space-y-6 text-sm sm:text-base leading-relaxed">
                            {bodyElements.map((el) => {
                                if (el.type === 'heading') {
                                    return (
                                        <h2 id={el.id} key={el.key}
                                            className="text-xl sm:text-2xl font-bold mt-10 mb-4 pt-4 border-t border-zinc-500/10 tracking-tight">
                                            {el.text}
                                        </h2>
                                    );
                                }
                                if (el.type === 'list' && el.items) {
                                    return (
                                        <ul key={el.key} className="list-disc list-inside ml-4 space-y-2 font-medium">
                                            {el.items.map((it, idx) => (
                                                <li key={idx} className={contentColor}>{it}</li>
                                            ))}
                                        </ul>
                                    );
                                }
                                return (
                                    <p key={el.key} className={contentColor}>
                                        {el.text}
                                    </p>
                                );
                            })}
                        </div>

                        {/* Author Bio Card at bottom */}
                        <div
                            className={`mt-16 p-6 sm:p-8 rounded-3xl ${cellBg} border ${sectionBorder} flex gap-4 sm:gap-6 items-start`}>
                            <div
                                className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 bg-zinc-200">
                                <Image src={post.authorAvatar || '/favicon.svg'} alt={post.author} fill
                                       className="object-cover"/>
                            </div>
                            <div>
                                <h4 className="text-base font-bold mb-1">{post.author}</h4>
                                <p className="text-xs text-zinc-400 mb-3">{post.authorRole || 'Contributor Director'}</p>
                                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                                    Writes regularly on digital products strategy, microservice engineering, UX
                                    diagnostics, and venture launches. Feel free to connect to discover robust systems.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar: Dynamic CTA */}
                    <aside className="sticky top-28 self-start w-full gap-8 space-y-8">
                        <div
                            className={`p-6 rounded-2xl border ${isDayTime ? 'bg-zinc-50 border-zinc-200' : 'bg-[#141311] border-zinc-800'} text-left`}>
                            <h3 className="text-base font-bold mb-3">Enterprise SaaS & Mobile Audits</h3>
                            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                                Our development team optimizes slow web routes and deploys high-volume cloud systems.
                                Sit down with us to examine your codebase.
                            </p>
                            <Link href="/contact"
                                  className="w-full text-center px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide bg-teal-600 block text-white hover:bg-teal-500 transition-colors">
                                Talk to engineers
                            </Link>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default BlogArticlePage;
