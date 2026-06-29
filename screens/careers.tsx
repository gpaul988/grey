'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/app/globals.css';
import { useIsDayTime } from '../components/useIsDayTime';
import { FxBackground, FxCard, FxChip, FxSectionHeading, FxButton, FxReveal } from '@/components/futuristic/fx';

const Careers: React.FC = () => {
    const isDayTime = useIsDayTime();

    const perks = [
        { num: '01', title: 'Remote-first', body: 'Work from anywhere in the world. We care about great output, not where you open your laptop.' },
        { num: '02', title: 'Learning budget', body: 'Yearly budget for courses, books, and conferences. Growth is part of the job.' },
        { num: '03', title: 'Ownership culture', body: 'Propose, build, ship. Every team member has real influence on what we make.' },
        { num: '04', title: 'Work on real products', body: 'Ship features that real people use every day — no throwaway projects.' },
    ];

    return (
        <div className={`${isDayTime ? 'bg-white text-black' : 'bg-black text-white'} min-h-screen transition-colors duration-500`}>

            {/* ── Hero ── */}
            <section className="relative w-full h-[70vh] overflow-hidden">
                <Image
                    src="/assets/header/careers.jpg"
                    alt="Careers at Grey InfoTech"
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <FxBackground day={false} grid aurora className="z-0" />
                <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="border-b border-gray-300/40 pb-6 mb-6 max-w-full">
                        <FxChip day={false} className="mb-5">We're hiring</FxChip>
                        <h1 className="text-white font-extrabold leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-[5rem]">
                            Jobs at Grey InfoTech
                        </h1>
                    </div>
                    <p className="text-white/80 text-base md:text-lg max-w-2xl">
                        Check out our current openings and opportunities to grow with us.
                    </p>
                </div>
            </section>

            {/* ── Intro ── */}
            <section className={`relative py-20 px-4 sm:px-6 md:px-10 lg:px-[4.5em] overflow-hidden`}>
                <FxBackground day={isDayTime} grid={false} aurora className="opacity-40" />
                <div className="relative z-10 max-w-4xl">
                    <FxReveal>
                        <FxChip day={isDayTime} className="mb-6">Open positions</FxChip>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-6">
                            Build the future with us
                        </h2>
                        <p className={`text-base leading-relaxed mb-3 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                            If you're looking for a role in a progressive company with a varied,
                            highly respected clientele, you've come to the right place. Check
                            out all our current jobs at Grey InfoTech below.
                        </p>
                        <p className={`text-base leading-relaxed ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                            We look forward to receiving your application!
                        </p>
                    </FxReveal>
                </div>

                {/* Divider */}
                <div className={`mt-12 border-b ${isDayTime ? 'border-gray-200' : 'border-gray-800'}`} />
            </section>

            {/* ── Job listings ── */}
            <section className="px-4 sm:px-6 md:px-10 lg:px-[4.5em] pb-20">
                <FxReveal>
                    <div className={`rounded-2xl border-2 border-dashed ${isDayTime ? 'border-gray-200 bg-gray-50' : 'border-gray-800 bg-gray-950/50'} py-20 text-center`}>
                        <div className="mb-4">
                            <FxChip day={isDayTime}>Coming soon</FxChip>
                        </div>
                        <h3 className={`text-2xl font-semibold mb-3 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                            No open positions right now
                        </h3>
                        <p className={`text-sm max-w-md mx-auto mb-8 ${isDayTime ? 'text-gray-500' : 'text-gray-500'}`}>
                            We're always on the lookout for talented people. Send us your CV and we'll reach out when the right role opens up.
                        </p>
                        <FxButton day={isDayTime} href="/contact">Get in touch</FxButton>
                    </div>
                </FxReveal>
            </section>

            {/* ── Why join us ── */}
            <section className={`relative py-24 px-4 sm:px-6 md:px-10 lg:px-[4.5em] overflow-hidden ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <FxBackground day={!isDayTime} grid aurora className="opacity-60" />
                <div className="relative z-10">
                    <FxReveal>
                        <FxSectionHeading
                            day={!isDayTime}
                            eyebrow="Why Grey InfoTech"
                            title="A place where great work happens"
                            subtitle="We build software people love — and we do it in an environment where craft, honesty, and ambition are the default."
                            align="center"
                            className="mb-16 mx-auto"
                        />
                    </FxReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {perks.map(({ num, title, body }, i) => (
                            <FxReveal key={num} delay={i * 0.1}>
                                <FxCard day={!isDayTime} className="p-7 h-full flex flex-col">
                                    <span className="gx-gradient-text text-[3em] font-[700] leading-none mb-4">{num}</span>
                                    <h3 className="text-lg font-semibold mb-3">{title}</h3>
                                    <p className={`text-sm leading-relaxed flex-1 ${!isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>{body}</p>
                                </FxCard>
                            </FxReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className={`py-20 px-4 sm:px-6 md:px-10 lg:px-[4.5em] text-center ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <FxReveal>
                    <FxChip day={isDayTime} className="mb-6">Stay connected</FxChip>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                        Don't see the right role?
                    </h2>
                    <p className={`text-base max-w-lg mx-auto mb-10 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                        We occasionally open up positions that aren't publicly listed. Reach out and introduce yourself — we'd love to know you.
                    </p>
                    <FxButton day={isDayTime} href="/contact">Introduce yourself</FxButton>
                </FxReveal>
            </section>
        </div>
    );
};

export default Careers;
