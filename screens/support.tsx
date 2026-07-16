'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '@/app/globals.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaTicketAlt, FaQuestionCircle, FaBook, FaPhoneAlt } from 'react-icons/fa';
import { useIsDayTime } from '../components/useIsDayTime';
import QuoteRequest from '@/components/QuoteRequest';
import {
    FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxGlitchText,
    FxSectionHeading, FxTerminal, FxFrame,
} from '@/components/futuristic/fx';

const FAQS = [
    {
        q: 'How do I report a problem or raise a support ticket?',
        a: 'Use the contact form, email us at hello@greyinfotech.com.ng, or message us on WhatsApp. Include your project name and a clear description of the issue and our team will respond promptly.',
    },
    {
        q: 'What are your support hours?',
        a: 'Our team is available Monday to Friday, 9:00am – 6:00pm (WAT). For urgent issues on active projects with a support agreement, we offer extended and priority response.',
    },
    {
        q: 'How quickly will I get a response?',
        a: 'We aim to acknowledge new requests within one business day. Priority and critical issues for clients on a support plan are handled faster, according to your agreed service levels.',
    },
    {
        q: 'Do you offer ongoing maintenance and support plans?',
        a: 'Yes. We provide flexible maintenance and support retainers covering updates, monitoring, bug fixes and improvements. Contact us to discuss a plan that fits your product.',
    },
    {
        q: 'I have a new project, not a support issue. Where do I start?',
        a: 'Head to our contact page or request a quote. Tell us about your idea and goals, and we will schedule a discovery call to map out the right approach.',
    },
];

const Support: React.FC = () => {
    const whatsappNumber = '2348028095571';
    const whatsappMessage = 'Hello Grey InfoTech, I need support with my project.';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const isDayTime = useIsDayTime();
    const dark = !isDayTime;
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    const channels = [
        {
            icon: <FaWhatsapp className="text-2xl" />,
            title: 'WhatsApp',
            desc: 'Chat with our team in real time for quick questions and updates.',
            cta: 'Message us',
            href: whatsappUrl,
            external: true,
            accent: '#25d366',
        },
        {
            icon: <FaEnvelope className="text-2xl" />,
            title: 'Email Support',
            desc: `Send a detailed message and we'll get back within one business day.`,
            cta: 'hello@greyinfotech.com.ng',
            href: 'mailto:hello@greyinfotech.com.ng',
            external: true,
            accent: '#2dd4bf',
        },
        {
            icon: <FaTicketAlt className="text-2xl" />,
            title: 'Raise a Ticket',
            desc: 'Report an issue or request through our contact form to open a tracked ticket.',
            cta: 'Open a ticket',
            href: '/open-ticket',
            external: false,
            accent: '#a855f7',
        },
        {
            icon: <FaPhoneAlt className="text-2xl" />,
            title: 'Call Us',
            desc: 'Speak directly with our team during business hours (WAT).',
            cta: '+234 802 809 5571',
            href: 'tel:+2348028095571',
            external: true,
            accent: '#06b6d4',
        },
    ];

    const terminalLines = [
        '> connecting to support.greyinfotech.com...',
        '> auth: verified ✓',
        '> channels: WhatsApp · Email · Ticket · Phone',
        '> avg first response: < 1 business day',
        '> current status: ONLINE  - team ready',
    ];

    return (
        <div className={`${dark ? 'bg-[#050810] text-white' : 'bg-white text-black'} min-h-screen flex flex-col transition-colors duration-500`}>

            {/*  -  -  Hero  -  -  */}
            <section className="relative overflow-hidden min-h-[60vh] flex flex-col justify-end">
                <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/95" />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-950/70 to-black/50" />
                <FxBackground day={false} grid aurora className="opacity-65" />
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-hero-scan" />
                <div className="gx-noise-overlay" />
                <div className="gx-orbit pointer-events-none absolute" style={{ width: '65vmax', height: '65vmax', top: '-22vmax', right: '-22vmax', opacity: .18 }} />
                <div className="gx-orbit gx-orbit-reverse pointer-events-none absolute" style={{ width: '40vmax', height: '40vmax', top: '-8vmax', right: '-5vmax', opacity: .11 }} />

                <div className="gx-page-hero-content relative z-10">
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal>
                            <FxChip day={false} className="mb-5">Support Centre</FxChip>
                            <div className="border-b border-white/15 pb-7 mb-7 max-w-4xl">
                                <h1 className="gx-hero-title text-white gx-glitch">
                                    We&apos;re here<br /><span className="gx-gradient-text">to help</span>
                                </h1>
                            </div>
                            <p className="text-white/65 max-w-2xl text-[0.95em] md:text-[1.05em] leading-relaxed mb-8">
                                Get support for your project, report an issue, or find answers to common questions.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['< 1 Day Response', 'Mon–Fri 9–6 WAT', 'Priority Plans Available'].map(s => (
                                    <span key={s} className="gx-data-pill">{s}</span>
                                ))}
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/*  -  -  Support Channels  -  -  */}
            <section className={`relative overflow-hidden px-4 sm:px-6 md:px-10 lg:px-[4.5em] py-20 lg:py-28 ${dark ? '' : ''}`}>
                <FxBackground day={isDayTime} grid={true} aurora={false} className="opacity-25" />
                <div className="relative z-10 max-w-[90rem] mx-auto">
                    <FxReveal className="mb-12">
                        <FxChip day={isDayTime} className="mb-4">Reach Us</FxChip>
                        <FxSectionHeading
                            day={isDayTime}
                            title="How can we help you?"
                            subtitle="Reach our team through any of these channels  - we're ready."
                            align="left"
                        />
                    </FxReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
                        {channels.map((c, i) => {
                            const inner = (
                                <FxHoloCard day={isDayTime} className="p-7 h-full flex flex-col group">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                                        style={{ background: c.accent + '18', color: c.accent, border: `1px solid ${c.accent}30` }}
                                    >
                                        {c.icon}
                                    </div>
                                    <h3 className={`text-[1.1em] font-[700] mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>{c.title}</h3>
                                    <p className={`text-[0.84em] leading-relaxed mb-4 flex-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{c.desc}</p>
                                    <span className="text-[0.82em] font-[600] transition-all duration-300 group-hover:translate-x-1" style={{ color: c.accent }}>
                                        {c.cta} →
                                    </span>
                                    <div className="mt-4 h-[1px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                                        style={{ background: `linear-gradient(90deg, ${c.accent}80, transparent)` }} />
                                </FxHoloCard>
                            );
                            return (
                                <FxReveal key={c.title} delay={0.07 * i}>
                                    {c.external ? (
                                        <a href={c.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                                            {inner}
                                        </a>
                                    ) : (
                                        <Link href={c.href} className="block h-full">
                                            {inner}
                                        </Link>
                                    )}
                                </FxReveal>
                            );
                        })}
                    </div>

                    {/* Resources */}
                    <FxReveal className="mb-20">
                        <FxChip day={isDayTime} className="mb-6">Resources</FxChip>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {[
                                { href: '/case-studies', icon: <FaBook className="text-xl" />, title: 'Case Studies', desc: `See how we've solved problems for other clients.`, accent: '#2dd4bf' },
                                { href: '/blog', icon: <FaQuestionCircle className="text-xl" />, title: 'Guides & Articles', desc: 'Tips, insights and how-tos from our team.', accent: '#a855f7' },
                            ].map((r, i) => (
                                <FxReveal key={r.title} delay={0.08 * i}>
                                    <Link href={r.href} className="block">
                                        <FxHoloCard day={isDayTime} className="p-6 flex items-start gap-4 group">
                                            <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: r.accent + '18', color: r.accent }}>
                                                {r.icon}
                                            </div>
                                            <div>
                                                <h3 className={`text-[1em] font-[700] mb-1 group-hover:text-teal-400 transition-colors ${dark ? 'text-white' : 'text-gray-900'}`}>{r.title}</h3>
                                                <p className={`text-[0.82em] leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{r.desc}</p>
                                            </div>
                                        </FxHoloCard>
                                    </Link>
                                </FxReveal>
                            ))}
                            {/* Request a Quote - Opens Modal */}
                            <FxReveal delay={0.16}>
                                <button
                                    onClick={() => setIsQuoteModalOpen(true)}
                                    className="block w-full"
                                >
                                    <FxHoloCard day={isDayTime} className="p-6 flex items-start gap-4 group cursor-pointer hover:scale-105 transition-transform">
                                        <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#06b6d418', color: '#06b6d4' }}>
                                            <FaTicketAlt className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className={`text-[1em] font-[700] mb-1 group-hover:text-teal-400 transition-colors ${dark ? 'text-white' : 'text-gray-900'}`}>Request a Quote</h3>
                                            <p className={`text-[0.82em] leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Starting something new? Tell us about it.</p>
                                        </div>
                                    </FxHoloCard>
                                </button>
                            </FxReveal>
                        </div>
                    </FxReveal>

                    {/* FAQ */}
                    <FxReveal className="max-w-3xl">
                        <FxChip day={isDayTime} className="mb-6">FAQ</FxChip>
                        <FxGlitchText tag="h2" className={`text-[2em] font-[700] leading-[1.1] mb-8 ${dark ? 'text-white' : 'text-gray-900'}`}>
                            Frequently Asked Questions
                        </FxGlitchText>

                        <div className="space-y-3">
                            {FAQS.map((faq, i) => {
                                const isOpen = openFaq === i;
                                return (
                                    <FxReveal key={faq.q} delay={0.04 * i}>
                                        <FxHoloCard day={isDayTime} className="overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() => setOpenFaq(isOpen ? null : i)}
                                                className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
                                                aria-expanded={isOpen}
                                            >
                                                <span className={`text-[0.97em] font-[500] leading-snug ${dark ? 'text-white' : 'text-gray-900'}`}>{faq.q}</span>
                                                <motion.span
                                                    animate={{ rotate: isOpen ? 45 : 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className={`text-[1.6em] leading-none shrink-0 transition-colors ${isOpen ? 'text-teal-400' : dark ? 'text-gray-500' : 'text-gray-400'}`}
                                                >
                                                    +
                                                </motion.span>
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.35 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className={`px-6 pb-6 text-[0.88em] leading-[1.7] ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                            {faq.a}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </FxHoloCard>
                                    </FxReveal>
                                );
                            })}
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/*  -  -  CTA  -  -  */}
            <section className="relative overflow-hidden bg-[#050810] py-24 px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                <FxBackground day={false} grid aurora className="opacity-60" />
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-orbit pointer-events-none absolute" style={{ width: '60vmax', height: '60vmax', top: '-20vmax', right: '-15vmax', opacity: .12 }} />

                <div className="relative z-10 max-w-[90rem] mx-auto lg:grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <FxReveal>
                            <FxChip day={false} className="mb-5">Still Need Help?</FxChip>
                            <FxGlitchText tag="h2" className="gx-gradient-text text-[2.5em] md:text-[3.2em] font-[800] leading-[1.1] mb-5">
                                Still need help?
                            </FxGlitchText>
                            <p className="text-white/60 max-w-xl mb-8 text-[0.95em] leading-relaxed">
                                Our team is ready to assist. Reach out and we&apos;ll get back to you as soon as possible.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <FxButton day={false} href="/contact" variant="solid">Contact Support</FxButton>
                                <FxButton day={false} href={whatsappUrl} variant="ghost">Chat on WhatsApp</FxButton>
                            </div>
                        </FxReveal>
                    </div>
                    <FxReveal delay={0.2} className="mt-12 lg:mt-0">
                        <FxTerminal day={false} lines={terminalLines} />
                    </FxReveal>
                </div>
            </section>

            {/*  -  -  Quote Request Modal  -  -  */}
            <AnimatePresence>
                {isQuoteModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsQuoteModalOpen(false)}
                        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-xl flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0, rotateX: 15 }}
                            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                            exit={{ scale: 0.85, opacity: 0, rotateX: 15 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-slate-900/98 via-slate-850/95 to-slate-900/98 border border-cyan-400/40 shadow-2xl shadow-cyan-600/30 backdrop-blur-xl transform transition-all duration-300 overflow-hidden"
                        >
                            {/* Decorative top border glow */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                            {/* Close Button - Premium Circular Design */}
                            <button
                                type="button"
                                onClick={() => setIsQuoteModalOpen(false)}
                                className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full transition-all duration-300 backdrop-blur-lg border-2 border-cyan-300/40 flex items-center justify-center hover:scale-125 hover:rotate-90 group/close text-cyan-300 hover:text-cyan-100 bg-gradient-to-br from-slate-800/60 to-slate-800/40 hover:from-slate-700/80 hover:to-slate-700/60 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40"
                                aria-label="Close quote request modal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 transition-all duration-300 group-hover/close:scale-110"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Premium Modal Header with gradient */}
                            <div className="relative px-10 py-12 border-b border-cyan-400/25 bg-gradient-to-b from-slate-800/70 via-slate-800/40 to-transparent">
                                {/* Decorative accent line */}
                                <div className="absolute left-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-transparent w-24" />

                                <div className="inline-block px-4 py-1.5 rounded-full mb-4 bg-cyan-500/20 border border-cyan-400/50">
                                    <span className="text-xs font-bold tracking-widest uppercase text-cyan-300">
                                        Project Consultation
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-3 bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-200 bg-clip-text text-transparent">
                                    Let's Build Your
                                    <span className="block mt-1 text-teal-400">Digital Future</span>
                                </h2>
                                <p className="text-base mt-4 font-medium tracking-wide max-w-2xl text-cyan-200/80">
                                    Transform your vision into cutting-edge enterprise solutions. Our experts are ready to deliver premium, scalable digital products tailored to your goals.
                                </p>
                            </div>

                            {/* Premium Modal Body with spacing */}
                            <div className="px-10 py-12">
                                <QuoteRequest />
                            </div>

                            {/* Premium Modal Footer Effects */}
                            <div className="relative h-24 bg-gradient-to-t from-slate-900/50 to-transparent border-t border-cyan-400/20 backdrop-blur-sm pointer-events-none">
                                {/* Floating accent elements */}
                                <div className="absolute bottom-4 left-10 text-xs font-semibold tracking-widest uppercase text-cyan-400/50">
                                    Trusted by 50+ Enterprise Clients
                                </div>
                                <div className="absolute bottom-4 right-10 flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" />
                                    <span className="text-xs font-medium text-cyan-300/70">Available 24/7</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Support;
