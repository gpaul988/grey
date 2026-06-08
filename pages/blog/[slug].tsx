import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {useRouter} from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import {getBlogPostBySlug, blogPosts} from '../../data/blogPosts';
import type {BlogPost} from '../../data/blogPosts';
import {getBlogImage} from '../../data/blogMedia';
import {getBlogPostMeta} from '../../data/blogMeta';

export default function BlogPost() {
    const router = useRouter();
    const {slug} = router.query;
    const [isDayTime, setIsDayTime] = useState(true);
    const [post, setPost] = useState<BlogPost | undefined>();

    useEffect(() => {
        const updateThemeByTime = () => {
            const hour = new Date().getHours();
            setIsDayTime(hour >= 6 && hour < 18);
        };

        updateThemeByTime();
        const intervalId = setInterval(updateThemeByTime, 60_000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (slug && typeof slug === 'string') {
            const foundPost = getBlogPostBySlug(slug);
            setPost(foundPost);
        }
    }, [slug]);

    // Ensure hooks order remains stable between renders by calling useMemo
    // even when `post` is undefined. When `post` is not available we return
    // safe defaults so that later render logic can safely check values.
    const meta = useMemo(() => {
        return post ? getBlogPostMeta(post) : {
            heroImage: '',
            publishedAt: '',
            tags: [],
            authorAvatar: '',
            author: '',
            authorRole: ''
        };
    }, [post]);

    const relatedPosts = useMemo(() => {
        if (!post) return [];
        return blogPosts.filter(p => p.tag === post.tag && p.slug !== post.slug).slice(0, 3);
    }, [post]);

    // Build content blocks and insert images between paragraphs for a more
    // magazine-like layout. Also extract headings to build a table-of-contents
    // similar to the Lightflows structure (headings are paragraphs wrapped in **...**).
    const {contentBlocks, headings} = useMemo(() => {
        if (!post) return {
            contentBlocks: [] as Array<{ type: string; text?: string; key?: string; id?: string; src?: string }>,
            headings: [] as Array<{ id: string; text: string }>
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
            '/assets/seo/hero.jpg',
        ];

        const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        paragraphs.forEach((paragraph, i) => {
            // detect bold-heading style **Heading**
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                const text = paragraph.replace(/\*\*/g, '').trim();
                const id = slugify(text || `heading-${i}`);
                foundHeadings.push({id, text});
                blocks.push({type: 'heading', text, key: `${post.slug}-h-${i}`, id});
                return;
            }

            // list detection: keep as paragraph block but will render as list if contains `- ` lines
            blocks.push({type: 'paragraph', text: paragraph, key: `${post.slug}-p-${i}`});

            // Insert an image after every 3 paragraphs (adjustable)
            if ((i + 1) % 3 === 0 && i !== paragraphs.length - 1) {
                const imageIndex = Math.floor((i + 1) / 3) - 1;
                blocks.push({
                    type: 'image',
                    key: `${post.slug}-img-${i}`,
                    src: inlineImages[imageIndex % inlineImages.length],
                });
            }
        });

        return {contentBlocks: blocks, headings: foundHeadings};
    }, [post]);

    // Share helpers (stable hooks placed before early return so Hooks order is consistent)
    const [copied, setCopied] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const shareUrl = useMemo(() => {
        if (typeof window !== 'undefined') return window.location.href;
        return `https://example.com${router.asPath || ''}`;
    }, [router.asPath]);

    const twitterShare = useMemo(() => `https://twitter.com/intent/tweet?text=${encodeURIComponent(post?.title || '')}&url=${encodeURIComponent(shareUrl)}`, [post?.title, shareUrl]);
    const linkedinShare = useMemo(() => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, [shareUrl]);
    const facebookShare = useMemo(() => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, [shareUrl]);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setShareOpen(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            /* ignore */
        }
    }, [shareUrl]);

    if (!post) {
        return (
            <div
                className={`${isDayTime ? 'bg-white text-black' : 'bg-black text-white'} min-h-screen transition-colors duration-500`}>
                <Header/>
                <div className="mx-auto max-w-[90rem] px-4 sm:px-6 md:px-10 lg:px-[4.5em] py-20">
                    <p>Loading...</p>
                </div>
                <Footer/>
            </div>
        );
    }


    return (
        <div
            className={`${isDayTime ? 'bg-white text-black' : 'bg-black text-white'} min-h-screen transition-colors duration-500`}>
            <Header/>

            <main className="mx-auto max-w-[100rem] px-4 sm:px-6 md:px-10 lg:px-[4.5em] py-16 md:py-20 lg:py-24">
                <article
                    className="mt-54 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-12 xl:gap-16 items-start">
                    <div className="min-w-0">
                        {/* Topic and title block (Lightflows-like: topic at the top) */}
                        <div className="max-w-4xl mb-6 text-left">

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                                {post.title}
                            </h1>
                            <div className="mt-3 flex items-center justify-start gap-4 text-sm text-gray-500 flex-wrap">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                                        <Image src={meta.authorAvatar || '/favicon.svg'} alt={meta.author} fill
                                               className="object-cover"/>
                                    </div>
                                    <div className="text-left">
                                        <div className="font-medium text-gray-900">{meta.author}</div>
                                        <div className="text-xs text-gray-500">{meta.authorRole}</div>
                                    </div>
                                </div>
                                <div>•</div>
                                <div>{meta.publishedAt}</div>
                                <div>•</div>
                                <div>{post.readTime}</div>
                            </div>
                        </div>

                        {/* Hero image (moved below title for Lightflows-like structure) */}
                        <div className="relative w-full rounded-3xl overflow-hidden mb-10">
                            <div className="relative w-full h-[420px] sm:h-[480px] md:h-[560px] lg:h-[640px]">
                                <Image
                                    src={meta.heroImage || getBlogImage(post.slug, post.tag)}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="100vw"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10"/>
                            </div>
                        </div>

                        {/* Lead / summary card under hero (Lightflows style) */}
                        <div className="max-w-3xl mx-auto mb-12">
                            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                                <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                                    {post.excerpt}
                                </p>
                            </div>
                        </div>

                        {/* Author & meta row (below hero) */}
                        <div className="flex items-center justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                                    <Image src={meta.authorAvatar || '/favicon.svg'} alt={meta.author} fill
                                           className="object-cover"/>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{meta.author}</p>
                                    <p className="text-sm text-gray-500">{meta.authorRole} • {meta.publishedAt}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Share button with click popup showing social handles */}
                                <div className="relative inline-block text-left">
                                    <button
                                        type="button"
                                        onClick={() => setShareOpen(prev => !prev)}
                                        className="inline-flex items-center px-3 py-1.5 border rounded text-sm text-gray-600 hover:bg-gray-100"
                                    >
                                        Share
                                    </button>

                                    <div
                                        className={`absolute right-0 mt-2 flex-col w-52 bg-white border rounded shadow-lg p-2 z-20 ${shareOpen ? 'flex' : 'hidden'}`}>
                                        <a href={twitterShare} target="_blank" rel="noopener noreferrer"
                                           className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M22 4.01c-.63.28-1.3.48-2 .57.72-.43 1.27-1.12 1.53-1.94-.68.4-1.44.68-2.24.84C18.6 2.6 17.5 2 16.3 2c-2.03 0-3.67 1.64-3.67 3.67 0 .29.03.57.1.84C9.69 6.36 6.14 4.65 3.9 2.1c-.32.55-.5 1.18-.5 1.86 0 1.28.65 2.41 1.65 3.07-.6-.02-1.16-.18-1.65-.45v.05c0 1.8 1.28 3.3 2.97 3.64-.31.09-.64.14-.98.14-.24 0-.48-.02-.71-.07.48 1.5 1.86 2.6 3.5 2.63C6.6 16.6 5 17.16 3.26 17.16c-.2 0-.39-.01-.58-.03 1.14.73 2.5 1.16 3.97 1.16 4.76 0 7.37-3.95 7.37-7.37v-.34c.5-.36.94-.8 1.28-1.3.43-.65.69-1.43.69-2.27 0-.16 0-.32-.02-.48.97-.7 1.7-1.56 2.32-2.55z"/>
                                            </svg>
                                            Twitter
                                        </a>
                                        <a href={linkedinShare} target="_blank" rel="noopener noreferrer"
                                           className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v12h-4zM8.5 8h3.7v1.6h.1c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.6V20h-4v-5.2c0-1.2 0-2.8-1.8-2.8-1.8 0-2.1 1.4-2.1 2.7V20h-4z"/>
                                            </svg>
                                            LinkedIn
                                        </a>
                                        <a href={facebookShare} target="_blank" rel="noopener noreferrer"
                                           className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.9h2.54V9.4c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.77l-.44 2.9h-2.33V22C18.34 21.12 22 16.99 22 12z"/>
                                            </svg>
                                            Facebook
                                        </a>
                                        <button onClick={handleCopy}
                                                className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M3 13h2v8h12v2H3a2 2 0 0 1-2-2V13h2zM21 3v12h-2V5H9V3h12z"/>
                                            </svg>
                                            {copied ? 'Copied' : 'Copy link'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Article content: render content blocks with images between paragraphs */}
                        <div className={`space-y-8 ${isDayTime ? 'text-gray-700' : 'text-gray-200'}`}>
                            {contentBlocks.map((block, idx) => {
                                if (block.type === 'heading') {
                                    return (
                                        <h2 id={block.id} key={block.key || idx}
                                            className={`text-2xl font-bold mt-10 mb-4 ${isDayTime ? 'text-black' : 'text-white'}`}>
                                            {block.text}
                                        </h2>
                                    );
                                }

                                if (block.type === 'paragraph') {
                                    const paragraph = block.text || '';

                                    if (paragraph.includes('- ')) {
                                        return (
                                            <ul key={block.key || idx}
                                                className="list-disc list-inside space-y-2 ml-2 text-base leading-relaxed">
                                                {paragraph.split('\n').filter(line => line.trim()).map((item, i) => (
                                                    <li key={i}
                                                        className="ml-4">{item.replace(/^[-•]\s/, '').trim()}</li>
                                                ))}
                                            </ul>
                                        );
                                    }

                                    // Lead paragraph styling: make the very first paragraph larger
                                    if (idx === 0) {
                                        return (
                                            <p key={block.key || idx}
                                               className="text-xl md:text-2xl leading-relaxed text-gray-800">
                                                {paragraph}
                                            </p>
                                        );
                                    }

                                    return (
                                        <p key={block.key || idx} className="text-base md:text-lg leading-relaxed">
                                            {paragraph}
                                        </p>
                                    );
                                }

                                if (block.type === 'image') {
                                    return (
                                        <div key={block.key || idx} className="rounded-2xl overflow-hidden">
                                            <Image
                                                src={block.src || getBlogImage(post.slug, post.tag)}
                                                alt={post.title}
                                                width={1200}
                                                height={675}
                                                className="object-cover w-full h-auto rounded-2xl"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-14 pt-10 border-t border-gray-100">
                            {meta.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${tag.toLowerCase()}`}
                                    className="text-sm text-gray-500 border border-gray-200 px-3 py-1 rounded-full hover:border-gray-400 hover:text-gray-800 transition-colors"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>

                        {/* Author bio */}
                        <div className="flex gap-5 p-6 rounded-2xl bg-gray-50 border border-gray-100 mt-10">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                                <Image src={meta.authorAvatar} alt={meta.author} fill className="object-cover"
                                       sizes="56px"/>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 mb-0.5">{meta.author}</p>
                                <p className="text-sm text-gray-500 mb-2">{meta.authorRole}</p>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Our editorial team shares practical guidance on building digital products, improving
                                    UX, and scaling software systems.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="xl:sticky xl:top-24 self-start w-full xl:w-[320px] space-y-8">
                        <div
                            className={`p-6 rounded-2xl border ${isDayTime ? 'bg-white border-gray-200' : 'bg-zinc-950 border-zinc-800'}`}>
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">On this
                                page</p>
                            <ul className="space-y-2 text-sm text-left">
                                {headings.length > 0 ? (
                                    headings.map(h => (
                                        <li key={h.id}>
                                            <a href={`#${h.id}`}
                                               className="block text-left text-gray-500 hover:text-gray-900 transition-colors py-0.5">{h.text}</a>
                                        </li>
                                    ))
                                ) : (
                                    meta.tags.map((tag) => (
                                        <li key={tag}>
                                            <Link href={`/blog?tag=${tag.toLowerCase()}`}
                                                  className="block text-left text-gray-500 hover:text-gray-900 transition-colors py-0.5">
                                                {tag}
                                            </Link>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>

                        <div
                            className={`p-6 rounded-2xl border ${isDayTime ? 'bg-white border-gray-200' : 'bg-zinc-950 border-zinc-800'}`}>
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Post
                                details</p>
                            <div className="space-y-3 text-sm text-gray-500">
                                <p><span className="font-medium text-gray-700">Category:</span> {post.tag}</p>
                                <p><span className="font-medium text-gray-700">Published:</span> {meta.publishedAt}</p>
                                <p><span className="font-medium text-gray-700">Read time:</span> {post.readTime}</p>
                            </div>
                        </div>

                        <div
                            className={`p-6 rounded-2xl border ${isDayTime ? 'bg-gray-50 border-gray-100' : 'bg-zinc-900 border-zinc-800'}`}>
                            <h3 className="text-lg font-semibold mb-3">Need help with a similar project?</h3>
                            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                                We can help you shape the content, structure, and imagery for your own blog and case
                                studies.
                            </p>
                            <Link href="/contact"
                                  className="inline-flex px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors">
                                Start a project
                            </Link>
                        </div>
                    </aside>
                </article>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <section className={`py-16 border-t mt-16 ${isDayTime ? 'border-gray-200' : 'border-zinc-800'}`}>
                        <h3 className="text-2xl md:text-3xl font-semibold mb-8">Related posts</h3>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {relatedPosts.map((relatedPost, idx) => (
                                <Link
                                    key={relatedPost.slug}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group"
                                >
                                    <div
                                        className={`${idx !== relatedPosts.length - 1 ? `border-b ${isDayTime ? 'border-gray-200' : 'border-zinc-800'}` : ''} pb-6`}>
                                        <div
                                            className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 ${isDayTime ? 'bg-gray-100' : 'bg-zinc-900'}`}>
                                            <Image
                                                src={getBlogImage(relatedPost.slug, relatedPost.tag)}
                                                alt={relatedPost.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <span
                                                className={`text-xs font-semibold tracking-widest uppercase ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>
                                                {relatedPost.tag}
                                            </span>
                                            <span
                                                className={`text-xs ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`}>
                                                {relatedPost.readTime}
                                            </span>
                                        </div>
                                        <h4 className={`text-xl font-semibold leading-snug mb-3 transition-colors ${
                                            isDayTime
                                                ? 'text-black group-hover:text-teal-600'
                                                : 'text-white group-hover:text-teal-400'
                                        }`}>
                                            {relatedPost.title}
                                        </h4>
                                        <p className={`${isDayTime ? 'text-gray-600' : 'text-gray-300'} text-sm leading-relaxed`}>
                                            {relatedPost.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className={`mt-16 py-12 px-8 rounded-lg ${
                    isDayTime ? 'bg-gray-50' : 'bg-zinc-900'
                }`}>
                    <h3 className="text-2xl font-semibold mb-3">Have a project or idea?</h3>
                    <p className={`mb-6 text-base ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                        Let's discuss how we can help you build what's next.
                    </p>
                    <Link
                        href="/contact"
                        className={`inline-flex px-6 py-3 rounded font-semibold text-sm transition-colors ${
                            isDayTime
                                ? 'bg-black text-white hover:bg-gray-900'
                                : 'bg-white text-black hover:bg-gray-100'
                        }`}
                    >
                        Start a conversation
                    </Link>
                </section>
            </main>

            <Footer/>
        </div>
    );
}

// Get all paths for static generation
export async function getStaticPaths() {
    return {
        paths: blogPosts.map(post => ({
            params: {slug: post.slug}
        })),
        fallback: 'blocking'
    };
}

// Generate props for each post
export async function getStaticProps({params}: { params: { slug: string } }) {
    const post = getBlogPostBySlug(params.slug);

    if (!post) {
        return {notFound: true};
    }

    return {
        props: {post},
        revalidate: 60
    };
}

