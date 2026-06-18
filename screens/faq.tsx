'use client';


import { PersonalizedGreeting } from '@/components/PersonalizedGreeting';

/**
 * FAQ — a single, futuristic FAQ hub for the whole site.
 * Pulls all active FAQs grouped by category from /api/faqs.
 * Replaces the inline FAQ sections previously scattered across pages.
 */

import React, {useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import {motion, AnimatePresence} from 'framer-motion';

type FaqItem = {id: number; question: string; answer: string};
type FaqCategory = {name: string; items: FaqItem[]};

export default function FaqScreen() {
    const [categories, setCategories] = useState<FaqCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState<string>('All');
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/faqs')
            .then((r) => r.json())
            .then((d: {categories: FaqCategory[]}) => setCategories(d.categories || []))
            .catch(() => setCategories([]))
            .finally(() => setLoading(false));
    }, []);

    const tabs = useMemo(() => ['All', ...categories.map((c) => c.name)], [categories]);

    const PER_PAGE = 15;
    const [page, setPage] = useState(1);

    // Normalize text for accent-insensitive search
    const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    // Filtered categories (by active tab + search) — still grouped for display.
    const filtered = useMemo(() => {
        const q = normalize(query.trim());
        const src = active === 'All' ? categories : categories.filter((c) => c.name === active);
        if (q.length === 0) return src;
        return src
            .map((c) => ({
                ...c,
                items: c.items.filter(
                    (i) => normalize(i.question).includes(q) || normalize(i.answer).includes(q)
                ),
            }))
            .filter((c) => c.items.length);
    }, [categories, active, query]);

    const totalShown = filtered.reduce((n, c) => n + c.items.length, 0);
    const totalPages = Math.max(1, Math.ceil(totalShown / PER_PAGE));

    // Reset to first page whenever the filter/search changes or results shrink.
    useEffect(() => {
        setPage(1);
    }, [active, query]);

    // Slice the flattened result set to the current page (15 per page), then
    // regroup the visible slice back into its categories for rendering.
    const visible = useMemo(() => {
        const start = (page - 1) * PER_PAGE;
        const end = start + PER_PAGE;
        let idx = 0;
        const out: typeof filtered = [];
        for (const cat of filtered) {
            const pageItems = [];
            for (const item of cat.items) {
                if (idx >= start && idx < end) pageItems.push(item);
                idx++;
                if (idx >= end) break;
            }
            if (pageItems.length) out.push({...cat, items: pageItems});
            if (idx >= end) break;
        }
        return out;
    }, [filtered, page]);

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#05070f] text-white">
            {/* ambient neon background */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-500/20 blur-[120px]" />
                <div className="absolute right-1/4 top-40 h-96 w-96 translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                        maskImage: 'radial-gradient(ellipse at top, black, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at top, black, transparent 70%)',
                    }}
                />
            </div>

            {/* Hero */}
            <section className="relative mx-auto max-w-4xl px-4 pt-28 pb-10 text-center sm:pt-32">
                <motion.span
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-cyan-200"
                >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
                    Knowledge base
                </motion.span>
                <motion.h1
                    initial={{opacity: 0, y: 16}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.05}}
                    className="bg-gradient-to-r from-teal-300 via-cyan-200 to-indigo-300 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
                >
                    Frequently Asked Questions
                </motion.h1>
                <motion.p
                    initial={{opacity: 0, y: 16}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.1}}
                    className="mx-auto mt-4 max-w-2xl text-gray-400"
                >
                    Everything you need to know about working with Grey InfoTech — our process, pricing,
                    timelines and support. Can&apos;t find an answer? <Link href="/contact" className="text-cyan-300 underline-offset-4 hover:underline">Talk to us</Link>.
                </motion.p>

                {/* Search */}
                <div className="relative mx-auto mt-8 max-w-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-300/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search questions…"
                        className="w-full rounded-full border border-cyan-400/20 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none backdrop-blur-sm transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                    />
                </div>
            </section>

            {/* Category tabs */}
            {tabs.length > 1 && (
                <section className="relative mx-auto max-w-4xl px-4">
                    <div className="flex flex-wrap justify-center gap-2">
                        {tabs.map((t) => (
                            <button
                                key={t}
                                onClick={() => {
                                    setActive(t);
                                    setOpen(null);
                                }}
                                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                                    active === t
                                        ? 'border-cyan-400/60 bg-gradient-to-r from-teal-500/30 to-indigo-500/30 text-white'
                                        : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* List */}
            <section className="relative mx-auto max-w-3xl px-4 py-10 pb-28">
                {loading ? (
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-16 animate-pulse rounded-xl border border-white/5 bg-white/5" />
                        ))}
                    </div>
                ) : totalShown === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-gray-400">
                        No questions match your search.{' '}
                        <Link href="/contact" className="text-cyan-300 hover:underline">Ask us directly →</Link>
                    </div>
                ) : (
                    visible.map((cat) => (
                        <div key={cat.name} className="mb-8">
                            {active === 'All' && (
                                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-300/80">
                                    {cat.name}
                                </h2>
                            )}
                            <div className="space-y-3">
                                {cat.items.map((item) => {
                                    const isOpen = open === item.id;
                                    return (
                                        <div
                                            key={item.id}
                                            className={`overflow-hidden rounded-xl border transition ${
                                                isOpen
                                                    ? 'border-cyan-400/40 bg-gradient-to-br from-cyan-500/10 to-indigo-500/5'
                                                    : 'border-white/10 bg-white/[0.03] hover:border-cyan-400/20'
                                            }`}
                                        >
                                            <button
                                                onClick={() => setOpen(isOpen ? null : item.id)}
                                                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                                            >
                                                <span className="text-[0.97rem] font-medium text-white">{item.question}</span>
                                                <span
                                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 text-cyan-300 transition-transform ${isOpen ? 'rotate-45' : ''}`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{height: 0, opacity: 0}}
                                                        animate={{height: 'auto', opacity: 1}}
                                                        exit={{height: 0, opacity: 0}}
                                                        transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                                                    >
                                                        <div
                                                            className="px-5 pb-5 text-[0.92rem] leading-relaxed text-gray-300"
                                                            dangerouslySetInnerHTML={{__html: item.answer}}
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                )}

                {/* Pagination — 15 FAQs per page */}
                {!loading && totalShown > PER_PAGE && (
                    <div className="mt-8 flex flex-col items-center gap-3">
                        <p className="text-xs text-gray-500">
                            Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, totalShown)} of {totalShown}
                        </p>
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => {
                                    setPage((p) => Math.max(1, p - 1));
                                    setOpen(null);
                                    if (typeof window !== 'undefined') window.scrollTo({top: 0, behavior: 'smooth'});
                                }}
                                disabled={page === 1}
                                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:border-cyan-400/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                ← Prev
                            </button>
                            <div className="flex flex-wrap items-center justify-center gap-1.5">
                                {Array.from({length: totalPages}, (_, i) => i + 1)
                                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                    .map((p, i, arr) => (
                                        <React.Fragment key={p}>
                                            {i > 0 && p - arr[i - 1] > 1 && (
                                                <span className="px-1 text-gray-600">…</span>
                                            )}
                                            <button
                                                onClick={() => {
                                                    setPage(p);
                                                    setOpen(null);
                                                    if (typeof window !== 'undefined') window.scrollTo({top: 0, behavior: 'smooth'});
                                                }}
                                                className={`h-9 min-w-9 rounded-full px-3 text-sm transition ${
                                                    p === page
                                                        ? 'border border-cyan-400/60 bg-gradient-to-r from-teal-500/30 to-indigo-500/30 text-white'
                                                        : 'border border-white/10 bg-white/5 text-gray-400 hover:text-white'
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        </React.Fragment>
                                    ))}
                            </div>
                            <button
                                onClick={() => {
                                    setPage((p) => Math.min(totalPages, p + 1));
                                    setOpen(null);
                                    if (typeof window !== 'undefined') window.scrollTo({top: 0, behavior: 'smooth'});
                                }}
                                disabled={page === totalPages}
                                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:border-cyan-400/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-12 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-indigo-500/10 p-8 text-center">
                    <h3 className="text-xl font-semibold text-white">Still have questions?</h3>
                    <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
                        Our team usually replies within a few hours. Let&apos;s talk about your project.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:shadow-cyan-400/40"
                    >
                        Get in touch
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </main>
    );
}
