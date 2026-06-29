'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsDayTime } from '../components/useIsDayTime';
import {
    FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxGlitchText, FxFrame, FxTerminal
} from '@/components/futuristic/fx';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
    {
        num: '01',
        title: 'Enquiry',
        subtitle: 'First Contact',
        body: 'From your initial call or message, we get to understand your requirements, budget, and timescale. We dive straight into what matters — your goals — so we can align from day one.',
        tags: ['Discovery Call', 'Budget Scoping', 'Timeline'],
        accent: '#2dd4bf',
    },
    {
        num: '02',
        title: 'Discovery',
        subtitle: 'Deep Dive',
        body: 'The discovery phase unlocks the full picture. We explore your business, competitors, market trends, and technical landscape. Everything gets factored in — deadlines, growth goals, user needs — before we agree on exact specifications.',
        tags: ['Competitor Review', 'Tech Audit', 'Spec Sign-off'],
        link: { href: '/services/discovery-phase', label: 'Learn about Discovery →' },
        accent: '#06b6d4',
    },
    {
        num: '03',
        title: 'Design',
        subtitle: 'Visual Architecture',
        body: "Fast, fun, and collaborative. We create fully interactive mockups of key pages — establishing color systems, messaging hierarchy, and high-conversion UI patterns — before a single line of code is written.",
        tags: ['Wireframes', 'UI Mockups', 'Design System'],
        link: { href: '/services/ui-ux-design', label: 'See our UI/UX work →' },
        accent: '#a855f7',
    },
    {
        num: '04',
        title: 'Development',
        subtitle: 'Build Phase',
        body: 'Once specs and designs are agreed, we move into build. You get live access to the dev environment at every stage. We use the right technology for your project — no stack religion, just the best tools for the job.',
        tags: ['Agile Sprints', 'Dev Preview', 'API Integration'],
        link: { href: '/services/Web-Development', label: 'Web Development services →' },
        accent: '#22d3ee',
    },
    {
        num: '05',
        title: 'Testing',
        subtitle: 'Quality Gate',
        body: 'Rigorous QA is baked in from day one. We test across all devices, browsers, and real-world scenarios — including accessibility, performance, and edge cases — before any launch is considered.',
        tags: ['Cross-browser', 'Accessibility', 'Performance'],
        accent: '#2dd4bf',
    },
    {
        num: '06',
        title: 'Launch',
        subtitle: 'Go Live',
        body: "When defects are resolved, code is validated, and everything passes our checklist — we go live. Launch is not the end; it's the beginning of a post-launch feedback loop.",
        tags: ['Deployment', 'DNS Migration', 'Monitoring'],
        accent: '#14b8a6',
    },
    {
        num: '07',
        title: 'Review',
        subtitle: 'Post-Launch Optimisation',
        body: 'As your product matures, we assess its performance together and tackle new challenges. Our SEO, SEM, and product growth experts keep your digital asset improving long after launch.',
        tags: ['Analytics Review', 'SEO', 'Feature Roadmap'],
        link: { href: '/services/digital-marketing', label: 'SEO & Marketing services →' },
        accent: '#0d9488',
    },
];

const OurApproach = () => {
    const isDayTime = useIsDayTime();
    const dark = !isDayTime;

    const terminalLines = [
        '> initialising project.config.ts',
        '> loading client requirements...',
        '> discovery phase: complete ✓',
        '> design system: scaffolded ✓',
        '> build env: initialised ✓',
        '> running quality assurance...',
        '> all tests passed ✓',
        '> deploying to production...',
        '> [SUCCESS] project is live 🚀',
    ];

    return (
        <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-[#040b14] text-white' : 'bg-white text-black'}`}>

            {/* ── Hero ── */}
            <section className="relative overflow-hidden min-h-[78vh] flex flex-col justify-end">
                <FxBackground day={false} grid aurora className="opacity-80" />
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-hero-scan" />
                <div className="gx-noise-overlay" />

                {/* Orbit rings */}
                <div className="gx-orbit pointer-events-none absolute" style={{ width: '72vmax', height: '72vmax', top: '-26vmax', right: '-26vmax', opacity: .18 }} />
                <div className="gx-orbit gx-orbit-reverse pointer-events-none absolute" style={{ width: '46vmax', height: '46vmax', top: '-8vmax', right: '-4vmax', opacity: .12 }} />

                {/* Vertical numbered steps decoration */}
                <div className="absolute left-[4.5em] top-20 bottom-0 hidden lg:flex flex-col gap-4 opacity-20 pointer-events-none">
                    {steps.map(s => (
                        <div key={s.num} className="text-[0.55em] font-mono text-teal-400 tracking-[0.25em]">{s.num}</div>
                    ))}
                </div>

                <div className="relative z-10 gx-page-hero-content">
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal>
                            <FxChip day={false} className="mb-5">How We Work</FxChip>
                            <div className="border-b border-white/15 pb-7 mb-7 max-w-5xl">
                                <FxGlitchText tag="h1" className="gx-hero-title text-white">
                                    Our <span className="gx-gradient-text">Approach</span>
                                </FxGlitchText>
                            </div>
                            <p className="text-white/65 max-w-2xl text-[0.95em] md:text-[1.05em] leading-relaxed mb-8">
                                Seven battle-tested stages. From first conversation to ongoing optimisation — this is how we build digital products that last.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['7 Stages', 'Transparent Process', 'Collaborative at Every Step', 'No Surprises'].map(s => (
                                    <span key={s} className="gx-data-pill">{s}</span>
                                ))}
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ── Intro + Terminal ── */}
            <section className={`relative py-20 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-[4.5em] ${dark ? 'bg-[#040b14]' : 'bg-gray-50'}`}>
                <div className="max-w-[90rem] mx-auto grid lg:grid-cols-2 gap-14 items-center">
                    <FxReveal>
                        <FxChip day={isDayTime} className="mb-6">Our Philosophy</FxChip>
                        <h2 className={`text-[2em] md:text-[2.8em] font-[700] leading-[1.15] tracking-tight mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>
                            We don&apos;t just build software.<br />
                            <span className="gx-gradient-text">We engineer outcomes.</span>
                        </h2>
                        <p className={`text-[0.9em] leading-[1.8] mb-6 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Starting a digital project can feel daunting. Our process removes the fog — with clear stages, shared access to the dev environment, and a team that communicates proactively at every milestone.
                        </p>
                        <p className={`text-[0.9em] leading-[1.8] ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                            We treat your business goals as our technical brief. Every stage feeds into the next, building a product that is robust, scalable, and ready for the real world.
                        </p>
                    </FxReveal>

                    <FxReveal delay={0.2}>
                        <FxTerminal day={isDayTime} lines={terminalLines} className="w-full" />
                    </FxReveal>
                </div>
            </section>

            {/* ── Numbered Timeline Steps ── */}
            <section className={`relative py-24 px-4 sm:px-6 md:px-10 lg:px-[4.5em] ${dark ? 'bg-[#020c18]' : 'bg-white'}`}>
                <FxBackground day={isDayTime} grid={true} aurora={false} className="opacity-10" />
                <div className="max-w-[90rem] mx-auto relative z-10">

                    <FxReveal className="mb-16">
                        <FxChip day={isDayTime} className="mb-4">Process Breakdown</FxChip>
                        <h2 className={`text-[2.2em] md:text-[3em] font-[800] leading-[1.1] tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
                            The <span className="gx-gradient-text">7 Stages</span>
                        </h2>
                    </FxReveal>

                    <div className="relative">
                        {/* Vertical connector line */}
                        <div className={`absolute left-6 lg:left-8 top-0 bottom-0 w-px hidden lg:block ${dark ? 'bg-gradient-to-b from-teal-500/30 via-cyan-500/20 to-transparent' : 'bg-gradient-to-b from-teal-400/30 via-teal-300/20 to-transparent'}`} />

                        <div className="space-y-12">
                            {steps.map((step, i) => (
                                <FxReveal key={step.num} delay={i * 0.07}>
                                    <div className="relative grid lg:grid-cols-[auto_1fr] gap-6 lg:gap-12 items-start">
                                        {/* Number badge */}
                                        <div className="hidden lg:flex flex-col items-center">
                                            <div
                                                className="w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono text-[0.85em] font-[700] relative z-10"
                                                style={{ borderColor: step.accent + '60', color: step.accent, background: step.accent + '12' }}
                                            >
                                                {step.num}
                                            </div>
                                        </div>

                                        {/* Card */}
                                        <FxHoloCard day={isDayTime} className="p-8 group">
                                            <div className="flex items-start justify-between mb-5">
                                                <div>
                                                    <span
                                                        className="text-[0.68em] font-mono font-[600] uppercase tracking-[0.2em] mb-2 block"
                                                        style={{ color: step.accent }}
                                                    >
                                                        {step.subtitle}
                                                    </span>
                                                    <h3 className={`text-[1.5em] md:text-[1.8em] font-[700] tracking-tight leading-[1.1] ${dark ? 'text-white' : 'text-gray-900'}`}>
                                                        {step.title}
                                                    </h3>
                                                </div>
                                                <span
                                                    className="font-mono text-[2.5em] font-[900] leading-none opacity-15 hidden md:block"
                                                    style={{ color: step.accent }}
                                                >
                                                    {step.num}
                                                </span>
                                            </div>

                                            <p className={`text-[0.9em] leading-[1.8] mb-6 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {step.body}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {step.tags.map(tag => (
                                                    <span key={tag} className="gx-data-pill text-[0.65em]">{tag}</span>
                                                ))}
                                            </div>

                                            {step.link && (
                                                <Link
                                                    href={step.link.href}
                                                    className={`inline-flex items-center gap-2 text-[0.82em] font-[600] mt-2 transition-all duration-200 hover:gap-3 ${dark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'}`}
                                                >
                                                    {step.link.label} <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            )}

                                            {/* Accent line */}
                                            <div
                                                className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-700 rounded-full"
                                                style={{ background: `linear-gradient(90deg, ${step.accent}00, ${step.accent}80, ${step.accent}00)` }}
                                            />
                                        </FxHoloCard>
                                    </div>
                                </FxReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Why This Process Works ── */}
            <section className={`relative py-24 px-4 sm:px-6 md:px-10 lg:px-[4.5em] overflow-hidden ${dark ? 'bg-[#040b14]' : 'bg-gray-50'}`}>
                <FxBackground day={false} grid aurora className="opacity-40" />
                <div className="gx-noise-overlay" />
                <div className="relative z-10 max-w-[90rem] mx-auto">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        <FxReveal>
                            <FxChip day={false} className="mb-6">Why It Works</FxChip>
                            <FxGlitchText tag="h2" className="text-[2.2em] md:text-[2.8em] font-[800] leading-[1.1] tracking-tight text-white mb-8">
                                No black boxes.<br />
                                <span className="gx-gradient-text">Full transparency.</span>
                            </FxGlitchText>
                            <ul className="space-y-5">
                                {[
                                    'You have live access to the dev environment throughout',
                                    'We communicate proactively — no chasing required',
                                    'Every milestone is agreed before work begins',
                                    'Testing is integrated, not bolted on at the end',
                                    'We stay involved post-launch, not just until delivery',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-white/75 text-[0.9em] leading-[1.6]">
                                        <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </FxReveal>

                        <FxReveal delay={0.15}>
                            <FxFrame className="p-10">
                                <div className="text-center">
                                    <div className="text-[0.72em] font-mono text-teal-400 uppercase tracking-[0.2em] mb-4">Success Rate</div>
                                    <div className="text-[5em] font-[900] gx-gradient-text leading-none mb-2">98%</div>
                                    <p className="text-white/50 text-[0.85em]">of projects delivered on time and on brief</p>
                                    <div className={`mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-center`}>
                                        {[
                                            { v: '150+', l: 'Projects Shipped' },
                                            { v: '8+', l: 'Years Experience' },
                                            { v: '15+', l: 'Industries Served' },
                                        ].map(s => (
                                            <div key={s.l}>
                                                <div className="text-[1.8em] font-[800] gx-gradient-text">{s.v}</div>
                                                <div className="text-white/40 text-[0.65em] uppercase tracking-wider mt-1">{s.l}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FxFrame>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className={`relative overflow-hidden py-28 px-4 sm:px-6 md:px-10 lg:px-[4.5em] text-center ${dark ? 'bg-black/60' : 'bg-teal-950'} text-white`}>
                <FxBackground day={false} grid aurora className="opacity-60" />
                <div className="gx-scanline pointer-events-none" />
                <div className="relative z-10">
                    <FxReveal>
                        <FxChip day={false} className="mb-6">Ready to Start?</FxChip>
                        <FxGlitchText tag="h2" className="text-[2.5em] md:text-[3.5em] font-[800] leading-[1.1] tracking-tight mb-6">
                            Let&apos;s build something<br />
                            <span className="gx-gradient-text">extraordinary together.</span>
                        </FxGlitchText>
                        <p className="text-white/60 max-w-xl mx-auto mb-10 text-[0.95em] leading-relaxed">
                            Start with a quick conversation. No commitments, no pressure — just clarity on how we can help.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <FxButton day={false} href="/contact" variant="solid">Start the Conversation</FxButton>
                            <FxButton day={false} href="/quote-request" variant="ghost">Get a Quote</FxButton>
                        </div>
                    </FxReveal>
                </div>
            </section>
        </div>
    );
};

export default OurApproach;
