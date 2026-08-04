'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsDayTime } from '../components/useIsDayTime';
import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxHoloCard,
    FxGlitchText,
    FxOrbit,
} from '@/components/futuristic/fx';

type FaqItem = { id: number; question: string; answer: string };
type FaqCategory = { name: string; items: FaqItem[] };

export default function FaqScreen() {
    const isDayTime = useIsDayTime();
    const [categories, setCategories] = useState<FaqCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState<string>('All');
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const PER_PAGE = 15;

    useEffect(() => {
        fetch('/api/faqs')
            .then((r) => r.json())
            .then((d: { categories: FaqCategory[] }) => setCategories(d.categories || []))
            .catch(() => setCategories([]))
            .finally(() => setLoading(false));
    }, []);

    const tabs = useMemo(() => ['All', ...categories.map((c) => c.name)], [categories]);

    const normalize = (s: string) =>
        s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const filtered = useMemo(() => {
        const q = normalize(query.trim());
        const src = active === 'All' ? categories : categories.filter((c) => c.name === active);
        if (!q) return src;
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

    useEffect(() => { setPage(1); }, [active, query]);

    const visible = useMemo(() => {
        const start = (page - 1) * PER_PAGE;
        const end = start + PER_PAGE;
        let idx = 0;
        const out: typeof filtered = [];
        for (const cat of filtered) {
            const pageItems: typeof cat['items'] = [];
            for (const item of cat.items) {
                if (idx >= start && idx < end) pageItems.push(item);
                idx++;
                if (idx >= end) break;
            }
            if (pageItems.length) out.push({ ...cat, items: pageItems });
            if (idx >= end) break;
        }
        return out;
    }, [filtered, page]);

    const mutedText = isDayTime ? 'text-gray-500' : 'text-white/50';
    const headingText = isDayTime ? 'text-gray-900' : 'text-white';
    const borderCol = isDayTime ? 'border-gray-200' : 'border-white/10';

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDayTime ? 'bg-white text-black' : 'bg-[#050810] text-white'}`}>

            {/*  -  -  Hero  -  -  */}
            <section className="relative overflow-hidden min-h-[42vh] flex flex-col justify-end">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#050810] to-[#071420]" />
                <FxBackground day={false} grid aurora className="opacity-60" />
                <FxOrbit size={700} top="-180px" right="-220px" opacity={0.13} speed={38} />
                <FxOrbit size={380} top="60px" left="-140px" opacity={0.09} speed={25} reverse />
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-noise-overlay pointer-events-none" />

                <div className="relative z-10 gx-page-hero-content">
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal>
                            <FxChip day={false} className="mb-5">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse mr-1.5" />
                                Knowledge base
                            </FxChip>
                            <div className="border-b border-white/15 pb-7 mb-6 max-w-4xl">
                                <FxGlitchText tag="h1" className="gx-hero-title text-white">
                                    Frequently Asked <span className="gx-gradient-text">Questions</span>
                                </FxGlitchText>
                            </div>
                            <p className="text-white/55 max-w-2xl text-[0.95em] leading-relaxed">
                                Everything about working with Grey InfoTech  - process, pricing, timelines and support.
                                Can&apos;t find an answer?{' '}
                                <Link href="/contact" className="text-teal-400 hover:text-teal-300 underline underline-offset-4 transition-colors">
                                    Talk to us
                                </Link>.
                            </p>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/*  -  -  Search + Tabs  -  -  */}
            <section className={`relative py-10 px-4 sm:px-6 lg:px-[4.5em] border-b ${borderCol} ${isDayTime ? 'bg-white' : 'bg-[#050810]'}`}>
                <FxBackground day={isDayTime} grid={false} aurora className="opacity-20" />
                <div className="relative z-10 max-w-3xl mx-auto">
                    {/* Search */}
                    <div className="relative mb-7">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isDayTime ? 'text-gray-400' : 'text-teal-300/60'}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                        </svg>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search questions…"
                            className={`w-full rounded-full border py-3.5 pl-12 pr-4 text-sm outline-none backdrop-blur-sm transition focus:ring-2 ${
                                isDayTime
                                    ? 'border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-teal-400 focus:ring-teal-100'
                                    : 'border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-teal-400/50 focus:ring-teal-400/20'
                            }`}
                        />
                    </div>

                    {/* Category tabs */}
                    {tabs.length > 1 && (
                        <div className="flex flex-wrap gap-2 justify-center">
                            {tabs.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => { setActive(t); setOpen(null); }}
                                    className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-200 ${
                                        active === t
                                            ? 'border-teal-400/60 bg-teal-400/10 text-teal-300 shadow-[0_0_14px_-4px_rgba(45,212,191,0.5)]'
                                            : isDayTime
                                                ? 'border-gray-200 bg-white text-gray-500 hover:border-teal-300 hover:text-teal-600'
                                                : 'border-white/10 bg-white/5 text-white/50 hover:border-teal-400/30 hover:text-white'
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/*  -  -  FAQ list  -  -  */}
            <section className={`relative px-4 sm:px-6 lg:px-[4.5em] py-14 pb-28 ${isDayTime ? 'bg-white' : 'bg-[#050810]'}`}>
                <FxBackground day={isDayTime} grid={false} aurora className="opacity-15" />
                <div className="relative z-10 max-w-3xl mx-auto">

                    {loading ? (
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={`h-16 animate-pulse rounded-xl border ${isDayTime ? 'border-gray-100 bg-gray-50' : 'border-white/5 bg-white/5'}`} />
                            ))}
                        </div>
                    ) : totalShown === 0 ? (
                        <FxHoloCard day={isDayTime} className="p-10 text-center">
                            <p className={`${mutedText} mb-4`}>No questions match your search.</p>
                            <FxButton day={isDayTime} href="/contact" variant="ghost">Ask us directly →</FxButton>
                        </FxHoloCard>
                    ) : (
                        visible.map((cat) => (
                            <div key={cat.name} className="mb-10">
                                {active === 'All' && (
                                    <FxReveal>
                                        <div className="flex items-center gap-3 mb-4">
                                            <FxChip day={isDayTime}>{cat.name}</FxChip>
                                        </div>
                                    </FxReveal>
                                )}
                                <div className="space-y-3">
                                    {cat.items.map((item, i) => {
                                        const isOpen = open === item.id;
                                        return (
                                            <FxReveal key={item.id} delay={0.04 * i}>
                                                <FxHoloCard
                                                    day={isDayTime}
                                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'ring-1 ring-teal-400/40' : ''}`}
                                                >
                                                    <button
                                                        onClick={() => setOpen(isOpen ? null : item.id)}
                                                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                                                    >
                                                        <span className={`text-[0.97rem] font-[500] ${headingText}`}>
                                                            {item.question}
                                                        </span>
                                                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                                                            isOpen
                                                                ? 'border-teal-400/50 text-teal-300 rotate-45 bg-teal-400/10'
                                                                : isDayTime ? 'border-gray-200 text-gray-400' : 'border-white/15 text-white/40'
                                                        }`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <AnimatePresence initial={false}>
                                                        {isOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                            >
                                                                <div
                                                                    className={`px-5 pb-5 text-[0.92rem] leading-relaxed border-t ${
                                                                        isDayTime ? 'text-gray-600 border-gray-100' : 'text-white/60 border-white/5'
                                                                    } pt-4`}
                                                                    dangerouslySetInnerHTML={{ __html: item.answer }}
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </FxHoloCard>
                                            </FxReveal>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}

                    {/* Pagination */}
                    {!loading && totalShown > PER_PAGE && (
                        <div className="mt-10 flex flex-col items-center gap-3">
                            <p className={`text-xs ${mutedText}`}>
                                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, totalShown)} of {totalShown}
                            </p>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => { setPage((p) => Math.max(1, p - 1)); setOpen(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    disabled={page === 1}
                                    className={`rounded-full border px-4 py-2 text-sm transition hover:border-teal-400/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 ${isDayTime ? 'border-gray-200 text-gray-600' : 'border-white/10 text-gray-300'}`}
                                >← Prev</button>
                                <div className="flex flex-wrap items-center justify-center gap-1.5">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                        .map((p, i, arr) => (
                                            <React.Fragment key={p}>
                                                {i > 0 && p - arr[i - 1] > 1 && <span className={`px-1 ${mutedText}`}>…</span>}
                                                <button
                                                    onClick={() => { setPage(p); setOpen(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                                    className={`h-9 min-w-9 rounded-full px-3 text-sm transition ${
                                                        p === page
                                                            ? 'border border-teal-400/60 bg-teal-400/10 text-teal-300'
                                                            : isDayTime ? 'border border-gray-200 text-gray-500 hover:text-black' : 'border border-white/10 text-gray-400 hover:text-white'
                                                    }`}
                                                >{p}</button>
                                            </React.Fragment>
                                        ))}
                                </div>
                                <button
                                    onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); setOpen(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    disabled={page === totalPages}
                                    className={`rounded-full border px-4 py-2 text-sm transition hover:border-teal-400/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 ${isDayTime ? 'border-gray-200 text-gray-600' : 'border-white/10 text-gray-300'}`}
                                >Next →</button>
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <FxReveal className="mt-14">
                        <FxHoloCard day={isDayTime} className="p-8 text-center">
                            <FxGlitchText tag="h3" className={`text-xl font-[600] mb-2 ${headingText}`}>
                                Still have questions?
                            </FxGlitchText>
                            <p className={`text-sm mb-6 max-w-md mx-auto ${mutedText}`}>
                                Our team usually replies within a few hours. Let&apos;s talk about your project.
                            </p>
                            <FxButton day={isDayTime} href="/contact" variant="solid">
                                Get in touch →
                            </FxButton>
                        </FxHoloCard>
                    </FxReveal>
                </div>
            </section>
        </div>
    );
}
