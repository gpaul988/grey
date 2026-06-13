'use client';
import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {useRouter} from '@/lib/routerCompat';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import {getBlogPostBySlug, blogPosts} from '../../data/blogPosts';
import type {BlogPost} from '../../data/blogPosts';
import {getBlogImage} from '../../data/blogMedia';
import {getBlogPostMeta} from '../../data/blogMeta';
import AIProjectEstimator from "@/components/AIProjectEstimator";

export default function BlogPostPage() {
    const router = useRouter();
    const {slug} = router.query;
    const [isDayTime, setIsDayTime] = useState(true);
    const [post, setPost] = useState<BlogPost | undefined>();
    const [copied, setCopied] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const [tocOpen, setTocOpen] = useState(false);

    useEffect(() => {
        const update = () => {
            const h = new Date().getHours();
            setIsDayTime(h >= 6 && h < 18);
        };
        update();
        const id = setInterval(update, 60_000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (slug && typeof slug === 'string') setPost(getBlogPostBySlug(slug));
    }, [slug]);

    const meta = useMemo(() => post ? getBlogPostMeta(post) : {
        heroImage: '',
        publishedAt: '',
        tags: [],
        authorAvatar: '',
        author: '',
        authorRole: ''
    }, [post]);

    const relatedPosts = useMemo(() => {
        if (!post) return [];
        return blogPosts.filter(p => p.tag === post.tag && p.slug !== post.slug).slice(0, 3);
    }, [post]);

    const {contentBlocks, headings} = useMemo(() => {
        if (!post) return {
            contentBlocks: [] as Array<{ type: string; text?: string; key?: string; id?: string; src?: string }>,
            headings: [] as Array<{ id: string; text: string }>,
        };
        const paragraphs = post.content.split('\n\n').map(p => p.trim()).filter(Boolean);
        const blocks: Array<{ type: string; text?: string; key?: string; id?: string; src?: string }> = [];
        const foundHeadings: Array<{ id: string; text: string }> = [];
        const inlineImages = [
            getBlogImage(post.slug, post.tag),
            '/assets/mvp/start.jpg',
            '/assets/services/product-design.jpg',
            '/assets/ui-ux/hero.jpg',
            '/assets/startup/market.jpg',
            '/assets/node/hero.jpg',
        ];
        const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        paragraphs.forEach((paragraph, i) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                const text = paragraph.replace(/\*\*/g, '').trim();
                const id = slugify(text || `heading-${i}`);
                foundHeadings.push({id, text});
                blocks.push({type: 'heading', text, key: `${post.slug}-h-${i}`, id});
                return;
            }
            blocks.push({type: 'paragraph', text: paragraph, key: `${post.slug}-p-${i}`});
            if ((i + 1) % 4 === 0 && i !== paragraphs.length - 1) {
                const idx = Math.floor((i + 1) / 4) - 1;
                blocks.push({
                    type: 'image',
                    key: `${post.slug}-img-${i}`,
                    src: inlineImages[idx % inlineImages.length]
                });
            }
        });
        return {contentBlocks: blocks, headings: foundHeadings};
    }, [post]);

    const shareUrl = useMemo(() => typeof window !== 'undefined' ? window.location.href : `https://greyinfotech.com.ng${router.asPath || ''}`, [router.asPath]);
    const twitterShare = useMemo(() => `https://twitter.com/intent/tweet?text=${encodeURIComponent(post?.title || '')}&url=${encodeURIComponent(shareUrl)}`, [post?.title, shareUrl]);
    const linkedinShare = useMemo(() => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, [shareUrl]);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { /* ignore */
        }
    }, [shareUrl]);

    const bg = isDayTime ? 'bg-white text-black' : 'bg-black text-white';

    if (!post) {
        return (
            <div className={`${bg} min-h-screen`}>
                <Header/>
                <div className="mx-auto max-w-[90rem] px-4 sm:px-6 md:px-10 lg:px-[4.5em] py-20">
                    <p className={isDayTime ? 'text-gray-500' : 'text-gray-400'}>Loading…</p>
                </div>
                <Footer/>
            </div>
        );
    }

    return (
        <div className={`${bg} min-h-screen transition-colors duration-500`}>
            <Header/>

            {/* ── Breadcrumb ── */}
            <div className={`border-b ${isDayTime ? 'border-gray-100' : 'border-zinc-800'}`}>
                <div
                    className="mx-auto max-w-[100rem] px-4 sm:px-6 md:px-10 lg:px-[4.5em] py-3.5 flex items-center gap-2 text-xs">
                    <Link href="/blog"
                          className={`transition-colors ${isDayTime ? 'text-gray-400 hover:text-gray-700' : 'text-gray-500 hover:text-gray-300'}`}>Blog</Link>
                    <span className={isDayTime ? 'text-gray-300' : 'text-gray-600'}>/</span>
                    <span
                        className={`font-semibold uppercase tracking-wider ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>{post.tag}</span>
                </div>
            </div>

            <main className="mx-auto max-w-[100rem] px-4 sm:px-6 md:px-10 lg:px-[4.5em] py-14 md:py-20">
                <article className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-12 xl:gap-16 items-start">

                    {/* ── Main column ── */}
                    <div className="min-w-0">

                        {/* Category + Title */}
                        <div className="max-w-3xl mb-8">
                            <span
                                className={`text-xs font-semibold uppercase tracking-widest block mb-4 ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>{post.tag}</span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
                                {post.title}
                            </h1>
                            {/* Author + date inline */}
                            <div
                                className={`flex flex-wrap items-center gap-4 text-sm ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`}>
                                <div className="flex items-center gap-2.5">
                                    <div
                                        className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                        {meta.authorAvatar ? (
                                            <Image src={meta.authorAvatar} alt={meta.author} fill
                                                   className="object-cover" sizes="32px"/>
                                        ) : (
                                            <div
                                                className="w-full h-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs font-bold">
                                                {meta.author.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <span
                                        className={`font-medium ${isDayTime ? 'text-gray-700' : 'text-gray-200'}`}>{meta.author}</span>
                                </div>
                                <span className={isDayTime ? 'text-gray-300' : 'text-gray-700'}>·</span>
                                <span>{meta.publishedAt}</span>
                                <span className={isDayTime ? 'text-gray-300' : 'text-gray-700'}>·</span>
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        {/* Hero image */}
                        <div className="relative w-full rounded-3xl overflow-hidden mb-10">
                            <div className="relative w-full h-[380px] sm:h-[440px] md:h-[520px] lg:h-[600px]">
                                <Image
                                    src={meta.heroImage || getBlogImage(post.slug, post.tag)}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5"/>
                            </div>
                        </div>

                        {/* Lead summary card */}
                        <div
                            className={`max-w-3xl mb-12 p-6 md:p-8 rounded-2xl border-l-4 border-teal-400 ${isDayTime ? 'bg-teal-50/60' : 'bg-teal-900/10'}`}>
                            <p className={`text-lg md:text-xl leading-relaxed ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>{post.excerpt}</p>
                        </div>

                        {/* Mobile TOC toggle */}
                        {headings.length > 0 && (
                            <div className="xl:hidden mb-10">
                                <button
                                    type="button"
                                    onClick={() => setTocOpen(p => !p)}
                                    className={`flex items-center justify-between w-full text-sm font-medium px-4 py-3 rounded-xl border ${isDayTime ? 'border-gray-200 text-gray-700' : 'border-zinc-700 text-gray-300'}`}
                                >
                                    <span>Table of contents</span>
                                    <svg className={`w-4 h-4 transition-transform ${tocOpen ? 'rotate-180' : ''}`}
                                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M19 9l-7 7-7-7"/>
                                    </svg>
                                </button>
                                {tocOpen && (
                                    <ul className={`mt-2 space-y-1.5 px-4 py-3 rounded-xl border text-sm ${isDayTime ? 'border-gray-100 bg-gray-50' : 'border-zinc-800 bg-zinc-900'}`}>
                                        {headings.map(h => (
                                            <li key={h.id}>
                                                <a href={`#${h.id}`} onClick={() => setTocOpen(false)}
                                                   className={`block py-0.5 transition-colors ${isDayTime ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`}>{h.text}</a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Article body */}
                        <div className={`space-y-7 ${isDayTime ? 'text-gray-700' : 'text-gray-200'}`}>
                            {contentBlocks.map((block, idx) => {
                                if (block.type === 'heading') {
                                    return (
                                        <h2 id={block.id} key={block.key || idx}
                                            className={`text-2xl md:text-3xl font-bold mt-12 mb-3 scroll-mt-24 ${isDayTime ? 'text-black' : 'text-white'}`}>
                                            {block.text}
                                        </h2>
                                    );
                                }
                                if (block.type === 'paragraph') {
                                    const para = block.text || '';
                                    if (para.includes('\n- ') || para.startsWith('- ')) {
                                        return (
                                            <ul key={block.key || idx} className="list-none space-y-2.5 ml-0">
                                                {para.split('\n').filter(l => l.trim()).map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5 shrink-0"/>
                                                        <span
                                                            className="text-base md:text-lg leading-relaxed">{item.replace(/^[-•]\s/, '').trim()}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        );
                                    }
                                    if (idx === 0) {
                                        return <p key={block.key || idx}
                                                  className="text-xl md:text-2xl leading-relaxed text-gray-800 font-[400]">{para}</p>;
                                    }
                                    return <p key={block.key || idx}
                                              className="text-base md:text-lg leading-[1.8]">{para}</p>;
                                }
                                if (block.type === 'image') {
                                    return (
                                        <figure key={block.key || idx} className="my-10">
                                            <div className="rounded-2xl overflow-hidden">
                                                <Image
                                                    src={block.src || getBlogImage(post.slug, post.tag)}
                                                    alt={post.title}
                                                    width={1200} height={675}
                                                    className="object-cover w-full h-auto rounded-2xl"
                                                    sizes="(max-width:768px) 100vw, 70vw"
                                                />
                                            </div>
                                        </figure>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {/* Tags */}
                        <div
                            className={`flex flex-wrap gap-2 mt-14 pt-10 border-t ${isDayTime ? 'border-gray-100' : 'border-zinc-800'}`}>
                            {meta.tags.map(tag => (
                                <Link key={tag} href={`/blog?tag=${tag.toLowerCase()}`}
                                      className={`text-sm border px-3 py-1 rounded-full transition-colors ${isDayTime ? 'text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800' : 'text-gray-400 border-zinc-700 hover:border-zinc-500 hover:text-white'}`}>
                                    {tag}
                                </Link>
                            ))}
                        </div>

                        {/* Share row */}
                        <div
                            className={`flex items-center justify-between gap-4 mt-8 pt-8 border-t ${isDayTime ? 'border-gray-100' : 'border-zinc-800'}`}>
                            <div className="flex items-center gap-3">
                                <div
                                    className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                                    {meta.authorAvatar ? (
                                        <Image src={meta.authorAvatar} alt={meta.author} fill className="object-cover"
                                               sizes="48px"/>
                                    ) : (
                                        <div
                                            className="w-full h-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
                                            {meta.author.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className={`font-semibold text-sm ${isDayTime ? 'text-gray-900' : 'text-white'}`}>{meta.author}</p>
                                    <p className={`text-xs ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`}>{meta.authorRole || 'Grey InfoTech Editorial'} · {meta.publishedAt}</p>
                                </div>
                            </div>
                            <div className="relative flex items-center gap-2">
                                <a href={twitterShare} target="_blank" rel="noopener noreferrer"
                                   className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors ${isDayTime ? 'border-gray-200 text-gray-500 hover:bg-gray-100' : 'border-zinc-700 text-gray-400 hover:bg-zinc-900'}`}
                                   aria-label="Share on Twitter">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M22 4.01c-.63.28-1.3.48-2 .57.72-.43 1.27-1.12 1.53-1.94-.68.4-1.44.68-2.24.84C18.6 2.6 17.5 2 16.3 2c-2.03 0-3.67 1.64-3.67 3.67 0 .29.03.57.1.84C9.69 6.36 6.14 4.65 3.9 2.1c-.32.55-.5 1.18-.5 1.86 0 1.28.65 2.41 1.65 3.07-.6-.02-1.16-.18-1.65-.45v.05c0 1.8 1.28 3.3 2.97 3.64-.31.09-.64.14-.98.14-.24 0-.48-.02-.71-.07.48 1.5 1.86 2.6 3.5 2.63C6.6 16.6 5 17.16 3.26 17.16c-.2 0-.39-.01-.58-.03 1.14.73 2.5 1.16 3.97 1.16 4.76 0 7.37-3.95 7.37-7.37v-.34c.5-.36.94-.8 1.28-1.3.43-.65.69-1.43.69-2.27 0-.16 0-.32-.02-.48.97-.7 1.7-1.56 2.32-2.55z"/>
                                    </svg>
                                </a>
                                <a href={linkedinShare} target="_blank" rel="noopener noreferrer"
                                   className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors ${isDayTime ? 'border-gray-200 text-gray-500 hover:bg-gray-100' : 'border-zinc-700 text-gray-400 hover:bg-zinc-900'}`}
                                   aria-label="Share on LinkedIn">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v12h-4zM8.5 8h3.7v1.6h.1c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.6V20h-4v-5.2c0-1.2 0-2.8-1.8-2.8-1.8 0-2.1 1.4-2.1 2.7V20h-4z"/>
                                    </svg>
                                </a>
                                <button onClick={handleCopy}
                                        className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors ${isDayTime ? 'border-gray-200 text-gray-500 hover:bg-gray-100' : 'border-zinc-700 text-gray-400 hover:bg-zinc-900'}`}
                                        aria-label="Copy link">
                                    {copied ? (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" strokeWidth="2">
                                            <path d="M20 6L9 17l-5-5"/>
                                        </svg>
                                    ) : (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" strokeWidth="2">
                                            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                                            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Sidebar ── */}
                    <aside className="xl:sticky xl:top-24 self-start w-full xl:w-[300px] space-y-6">

                        {/* Table of contents */}
                        {headings.length > 0 && (
                            <div
                                className={`p-5 rounded-2xl border hidden xl:block ${isDayTime ? 'bg-white border-gray-100 shadow-sm' : 'bg-zinc-950 border-zinc-800'}`}>
                                <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>On
                                    this page</p>
                                <ul className="space-y-2 text-sm">
                                    {headings.map(h => (
                                        <li key={h.id}>
                                            <a href={`#${h.id}`}
                                               className={`block py-0.5 transition-colors ${isDayTime ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`}>{h.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Post details */}
                        <div
                            className={`p-5 rounded-2xl border ${isDayTime ? 'bg-white border-gray-100 shadow-sm' : 'bg-zinc-950 border-zinc-800'}`}>
                            <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>Post
                                details</p>
                            <div className="space-y-2.5 text-sm">
                                <div className="flex justify-between"><span
                                    className={isDayTime ? 'text-gray-400' : 'text-gray-500'}>Category</span><span
                                    className="font-medium">{post.tag}</span></div>
                                <div className="flex justify-between"><span
                                    className={isDayTime ? 'text-gray-400' : 'text-gray-500'}>Published</span><span
                                    className="font-medium">{meta.publishedAt}</span></div>
                                <div className="flex justify-between"><span
                                    className={isDayTime ? 'text-gray-400' : 'text-gray-500'}>Read time</span><span
                                    className="font-medium">{post.readTime}</span></div>
                            </div>
                        </div>

                        {/* CTA card */}
                        <div
                            className={`p-5 rounded-2xl border ${isDayTime ? 'bg-teal-50 border-teal-100' : 'bg-teal-900/10 border-teal-800/30'}`}>
                            <h3 className={`text-base font-semibold mb-2 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>Need
                                help with a project?</h3>
                            <p className={`text-sm mb-4 leading-relaxed ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                We build, design, and ship digital products for founders and growing teams.
                            </p>
                            <Link href="/contact"
                                  className={`block w-full text-center px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${isDayTime ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-white text-black hover:bg-gray-100'}`}>
                                Start a project
                            </Link>
                        </div>
                    </aside>
                </article>

                {/* ── Related posts ── */}
                {relatedPosts.length > 0 && (
                    <section className={`py-16 border-t mt-16 ${isDayTime ? 'border-gray-200' : 'border-zinc-800'}`}>
                        <div className="flex items-end justify-between mb-10">
                            <h3 className="text-2xl md:text-3xl font-semibold">Related posts</h3>
                            <Link href="/blog"
                                  className={`text-sm font-medium underline underline-offset-4 ${isDayTime ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`}>
                                All posts →
                            </Link>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {relatedPosts.map(rp => (
                                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group flex flex-col gap-4">
                                    <div
                                        className={`relative w-full aspect-[16/10] rounded-2xl overflow-hidden ${isDayTime ? 'bg-gray-100' : 'bg-zinc-900'}`}>
                                        <Image src={getBlogImage(rp.slug, rp.tag)} alt={rp.title} fill
                                               className="object-cover transition-transform duration-500 group-hover:scale-105"
                                               sizes="(max-width:768px) 100vw, 33vw"/>
                                    </div>
                                    <div
                                        className={`flex items-center gap-2 text-xs ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <span
                                            className={`font-semibold uppercase tracking-wider ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>{rp.tag}</span>
                                        <span>·</span>
                                        <span>{rp.readTime}</span>
                                    </div>
                                    <h4 className={`text-lg font-semibold leading-snug transition-colors ${isDayTime ? 'text-gray-900 group-hover:text-teal-600' : 'text-white group-hover:text-teal-400'}`}>
                                        {rp.title}
                                    </h4>
                                    <p className={`text-sm leading-relaxed line-clamp-2 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>{rp.excerpt}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── CTA ── */}
                <div
                    className={`relative py-8 mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] max-w-full w-full h-auto ${
                        isDayTime ? 'bg-teal-100 text-teal-900' : 'bg-teal-950 text-white'
                    }`}
                >
                    <AIProjectEstimator/>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

// NOTE: Migrated to App Router. Data is read client-side from router.query.slug,
// so these Pages-Router data hooks are preserved (commented) for reference.
// Static params + metadata now live in app/blog/[slug]/page.tsx.
/*
export async function getStaticPaths() {
    return {paths: blogPosts.map(post => ({params: {slug: post.slug}})), fallback: 'blocking'};
}

export async function getStaticProps({params}: { params: { slug: string } }) {
    const post = getBlogPostBySlug(params.slug);
    if (!post) return {notFound: true};
    return {props: {post}, revalidate: 60};
}
*/