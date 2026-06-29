'use client';

import React from 'react';
import Image from 'next/image';
import '@/app/globals.css';
import { useIsDayTime } from '../components/useIsDayTime';
import { FxBackground, FxChip, FxSectionHeading, FxButton, FxReveal, FxHoloCard, FxGlitchText, FxFrame, FxTerminal } from '@/components/futuristic/fx';

const perks = [
    { num: '01', title: 'Remote-first', body: 'Work from anywhere in the world. We care about great output, not where you open your laptop.', icon: '🌍' },
    { num: '02', title: 'Learning budget', body: 'Yearly budget for courses, books, and conferences. Growth is part of the job.', icon: '📚' },
    { num: '03', title: 'Ownership culture', body: 'Propose, build, ship. Every team member has real influence on what we make.', icon: '🚀' },
    { num: '04', title: 'Real products', body: 'Ship features that real people use every day — no throwaway projects.', icon: '⚡' },
];

const techStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'];

const Careers: React.FC = () => {
    const isDayTime = useIsDayTime();
    const dark = !isDayTime;

    return (
        <div className={`${dark ? 'bg-[#050810] text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-500`}>

            {/* ── Hero ── */}
            <section className="relative overflow-hidden min-h-[76vh] flex flex-col justify-end">
                {/* Background image */}
                <Image
                    src="/assets/header/careers.jpg"
                    alt="Careers at Grey InfoTech"
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    priority
                    className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/90" />

                {/* FX */}
                <FxBackground day={false} grid aurora className="opacity-55" />
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-hero-scan" />
                <div className="gx-noise-overlay" />

                {/* Orbit */}
                <div className="gx-orbit pointer-events-none absolute" style={{ width: '70vmax', height: '70vmax', top: '-25vmax', right: '-25vmax', opacity: .18 }} />
                <div className="gx-orbit gx-orbit-reverse pointer-events-none absolute" style={{ width: '44vmax', height: '44vmax', top: '-8vmax', right: '-4vmax', opacity: .11 }} />

                {/* Content */}
                <div className="gx-page-hero-content relative z-10">
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal>
                            <FxChip day={false} className="mb-5">We&apos;re Hiring</FxChip>
                            <div className="border-b border-white/20 pb-7 mb-7 max-w-4xl">
                                <h1 className="gx-hero-title text-white gx-glitch">
                                    Jobs at{' '}
                                    <span className="gx-gradient-text">Grey InfoTech</span>
                                </h1>
                            </div>
                            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
                                Build the future of digital products with a team of passionate engineers, designers, and strategists.
                            </p>
                            {/* Tech pills */}
                            <div className="flex flex-wrap gap-2">
                                {techStack.map(t => (
                                    <span key={t} className="gx-data-pill text-[0.65em]">{t}</span>
                                ))}
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ── Intro + Terminal ── */}
            <section className={`relative z-10 py-20 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-[4.5em]`}>
                <FxBackground day={isDayTime} grid={false} aurora={true} className="opacity-20" />
                <div className="max-w-[90rem] mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FxReveal>
                            <FxChip day={isDayTime} className="mb-6">Open Positions</FxChip>
                            <FxGlitchText tag="h2" className="text-[2.5em] md:text-[3em] font-[800] leading-[1.1] tracking-tight mb-6">
                                Build the future<br />
                                <span className="gx-gradient-text">with us</span>
                            </FxGlitchText>
                            <p className={`text-[0.92em] leading-[1.8] mb-4 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                                If you&apos;re looking for a role in a progressive company with a varied,
                                highly respected clientele, you&apos;ve come to the right place.
                            </p>
                            <p className={`text-[0.92em] leading-[1.8] ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                                We look forward to receiving your application!
                            </p>
                        </FxReveal>

                        <FxReveal delay={0.15}>
                            <FxTerminal
                                day={isDayTime}
                                lines={[
                                    '# Grey InfoTech — open to talent',
                                    'npm run join-the-team',
                                    '',
                                    '> Scanning for creative engineers...',
                                    '> Scanning for visionary designers...',
                                    '> Scanning for bold strategists...',
                                    '',
                                    '✓ Positions available — apply now',
                                ]}
                            />
                        </FxReveal>
                    </div>

                    {/* Divider */}
                    <div className={`mt-16 border-b ${dark ? 'border-white/10' : 'border-gray-100'}`} />
                </div>
            </section>

            {/* ── Job listings placeholder ── */}
            <section className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-[4.5em] pb-20">
                <div className="max-w-[90rem] mx-auto">
                    <FxReveal>
                        <div className={`rounded-2xl border-2 border-dashed py-24 text-center ${
                            dark ? 'border-teal-400/20 bg-teal-400/02' : 'border-teal-200 bg-teal-50/50'
                        }`}>
                            {/* Animated ring */}
                            <div className="relative w-20 h-20 mx-auto mb-8">
                                <div className={`absolute inset-0 rounded-full border-2 border-teal-400/30 animate-ping`} style={{ animationDuration: '2s' }} />
                                <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-[1.6em] ${dark ? 'bg-teal-400/10' : 'bg-teal-50'}`}>
                                    📡
                                </div>
                            </div>
                            <div className="mb-4">
                                <FxChip day={isDayTime}>Scanning for positions</FxChip>
                            </div>
                            <h3 className={`text-[1.4em] font-[700] mb-3 ${dark ? 'text-gray-200' : 'text-gray-700'}`}>
                                No open positions right now
                            </h3>
                            <p className={`text-[0.88em] max-w-md mx-auto mb-8 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
                                We&apos;re always on the lookout for talented people. Send us your CV and we&apos;ll reach out when the right role opens up.
                            </p>
                            <FxButton day={isDayTime} href="/contact" variant="solid">Get in Touch</FxButton>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/* ── Why join us ── */}
            <section className={`relative overflow-hidden py-28 px-4 sm:px-6 md:px-10 lg:px-[4.5em] ${dark ? 'bg-black/30' : 'bg-teal-950'} text-white`}>
                <FxBackground day={false} grid aurora className="opacity-65" />
                <div className="gx-scanline pointer-events-none" />
                <div className="relative z-10 max-w-[90rem] mx-auto">
                    <FxReveal>
                        <FxSectionHeading
                            day={false}
                            eyebrow="Why Grey InfoTech"
                            title="A place where great work happens"
                            subtitle="We build software people love — in an environment where craft, honesty, and ambition are the default."
                            align="center"
                            className="mb-16 mx-auto"
                        />
                    </FxReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {perks.map(({ num, title, body, icon }, i) => (
                            <FxReveal key={num} delay={i * 0.1}>
                                <div className={`gx-hologram-card p-7 h-full flex flex-col group`}>
                                    <span className="text-[2em] mb-4 group-hover:scale-110 transition-transform inline-block">{icon}</span>
                                    <span className="gx-gradient-text text-[2.8em] font-[900] leading-none mb-3">{num}</span>
                                    <h3 className="text-[1em] font-[700] mb-3 text-white">{title}</h3>
                                    <p className="text-[0.84em] leading-relaxed text-gray-400 flex-1">{body}</p>
                                </div>
                            </FxReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className={`relative z-10 py-24 px-4 sm:px-6 md:px-10 lg:px-[4.5em] text-center ${dark ? '' : 'bg-gray-50'}`}>
                <FxReveal>
                    <FxChip day={isDayTime} className="mb-6">Stay Connected</FxChip>
                    <FxGlitchText tag="h2" className="text-[2.2em] md:text-[3em] font-[800] tracking-tight mb-5">
                        Don&apos;t see the right role?
                    </FxGlitchText>
                    <p className={`text-[0.92em] max-w-lg mx-auto mb-10 leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We occasionally open positions that aren&apos;t publicly listed. Reach out and introduce yourself.
                    </p>
                    <FxButton day={isDayTime} href="/contact" variant="solid">Introduce Yourself</FxButton>
                </FxReveal>
            </section>
        </div>
    );
};

export default Careers;
