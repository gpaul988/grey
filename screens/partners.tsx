'use client';

import React, { useEffect, useRef, useState } from 'react';
import '@/app/globals.css';
import { motion } from 'framer-motion';
import {
    FaHandshake, FaPlug, FaNetworkWired, FaRocket, FaShieldAlt,
    FaCloud, FaCode, FaUsers, FaCheckCircle, FaArrowRight,
} from 'react-icons/fa';
import { useIsDayTime } from '../components/useIsDayTime';
import { FxBackground, FxCard, FxChip, FxSectionHeading, FxButton, FxReveal, FxHoloCard, FxGlitchText } from '@/components/futuristic/fx';

interface Partner {
    id: number;
    name: string;
    logo: string;
    url: string | null;
}

const fadeUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const PARTNERSHIP_TYPES = ['Technology', 'Reseller', 'Referral', 'Strategic', 'Integration', 'Other'];

const CATEGORIES = [
    { icon: FaCloud, title: 'Cloud & Infrastructure', desc: 'Hyperscalers and managed-cloud providers powering scalable deployments.' },
    { icon: FaCode, title: 'Technology & Platforms', desc: 'SaaS vendors and dev platforms that plug directly into our build stack.' },
    { icon: FaShieldAlt, title: 'Security & Compliance', desc: 'Identity, payments and compliance partners keeping ecosystems safe.' },
    { icon: FaNetworkWired, title: 'Integration & APIs', desc: 'Connectors that let Grey-built systems talk to the tools you already use.' },
    { icon: FaUsers, title: 'Resellers & Referrals', desc: 'Agencies and consultants extending our reach across new markets.' },
    { icon: FaRocket, title: 'Strategic Alliances', desc: 'Long-term collaborators co-creating products and entering markets together.' },
];

const BENEFITS = [
    'Co-marketing & joint go-to-market motion',
    'Technical enablement and shared roadmaps',
    'Revenue-share and referral incentives',
    'Priority engineering support',
    'Early access to Grey platform releases',
    'Listing in our partner ecosystem',
];

const Partners: React.FC = () => {
    const isDayTime = useIsDayTime();
    const [partners, setPartners] = useState<Partner[]>([]);
    const [form, setForm] = useState({
        company: '', contact_name: '', email: '', phone: '', website: '',
        country: 'Nigeria', reg_authority: 'CAC', reg_number: '',
        partnership_type: 'Technology', message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
    const [feedback, setFeedback] = useState('');
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch('/api/content')
            .then((r) => r.json())
            .then((d) => setPartners(Array.isArray(d.partners) ? d.partners : []))
            .catch(() => {});
    }, []);

    // subtle pointer parallax for hero
    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const mx = (e.clientX - r.left) / r.width - 0.5;
            const my = (e.clientY - r.top) / r.height - 0.5;
            el.style.setProperty('--grey-mx', String(mx));
            el.style.setProperty('--grey-my', String(my));
        };
        el.addEventListener('mousemove', onMove);
        return () => el.removeEventListener('mousemove', onMove);
    }, []);

    const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setFeedback('');
        try {
            const res = await fetch('/api/partner-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setStatus('ok');
                setFeedback(data.message || 'Thank you! Your request has been received.');
                setForm({ company: '', contact_name: '', email: '', phone: '', website: '', country: 'Nigeria', reg_authority: 'CAC', reg_number: '', partnership_type: 'Technology', message: '' });
            } else {
                setStatus('err');
                setFeedback(data.message || 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('err');
            setFeedback('Network error. Please try again.');
        }
    };

    const inputCls = `w-full rounded-xl px-4 py-3 text-sm outline-none transition border ${
        isDayTime
            ? 'bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-teal-500 focus:bg-white'
            : 'bg-white/[0.04] border-white/10 text-white placeholder-gray-500 focus:border-teal-400/60 focus:bg-white/[0.06]'
    }`;

    return (
        <div className={`${isDayTime ? 'bg-white text-black' : 'bg-[#050810] text-white'} min-h-screen flex flex-col overflow-x-hidden transition-colors duration-500`}>

            {/* ── Hero — extreme futuristic ── */}
            <section
                ref={heroRef}
                className="relative isolate overflow-hidden min-h-[80vh] flex flex-col justify-end"
            >
                {/* FX background */}
                <FxBackground day={false} grid aurora className="opacity-65" />
                {/* Scanlines */}
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-hero-scan" />
                <div className="gx-noise-overlay" />

                {/* Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

                {/* Orbit rings */}
                <div className="gx-orbit pointer-events-none absolute" style={{ width: '80vmax', height: '80vmax', top: '-30vmax', right: '-30vmax', opacity: .18 }} />
                <div className="gx-orbit gx-orbit-reverse pointer-events-none absolute" style={{ width: '50vmax', height: '50vmax', top: '-12vmax', right: '-6vmax', opacity: .12 }} />

                {/* Content */}
                <div className="gx-page-hero-content relative z-10">
                    <div className="max-w-[90rem] mx-auto text-center">
                        <FxReveal>
                            <FxChip day={false} className="mb-7">
                                <FaHandshake className="inline mr-1" /> Grey Partner Ecosystem
                            </FxChip>
                            <div className="border-b border-white/15 pb-7 mb-7 max-w-4xl mx-auto">
                                <FxGlitchText tag="h1" className="gx-hero-title text-white">
                                    Build the future on a{' '}
                                    <span className="gx-gradient-text">shared ecosystem</span>
                                </FxGlitchText>
                            </div>
                            <p className="text-white/65 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                                We partner with technology innovators, cloud leaders, resellers and integrators to
                                deliver outcomes no single company could build alone. Join the network powering
                                Grey InfoTech&apos;s solutions across Africa and beyond.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <FxButton day={false} href="#apply" variant="solid">Become a Partner</FxButton>
                                <a
                                    href="#ecosystem"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/20 text-white/90 hover:text-white hover:border-white/40 transition"
                                >
                                    Explore the Ecosystem
                                </a>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ── Existing Partners Marquee ── */}
            {partners.length > 0 && (
                <section className={`py-14 border-y ${isDayTime ? 'border-gray-100 bg-gray-50' : 'border-white/5 bg-white/[0.02]'}`}>
                    <p className={`text-center text-xs uppercase tracking-[0.25em] mb-9 ${isDayTime ? 'text-gray-400' : 'text-gray-400'}`}>
                        Trusted by partners we build with
                    </p>
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
                        {partners.map((p) => (
                            <a
                                key={p.id}
                                href={p.url || undefined}
                                target={p.url ? '_blank' : undefined}
                                rel="noreferrer"
                                className={`rounded-xl h-20 flex items-center justify-center p-4 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition ${isDayTime ? 'bg-white border border-gray-100 shadow-sm' : 'grey-glass'}`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.logo} alt={p.name} className="max-h-10 max-w-[120px] object-contain" />
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Intro ── */}
            <section
                className={`pt-16 transition-colors duration-500 ${
                    isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                }`}
            >
                <FxBackground day={isDayTime} />
                <div className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={isDayTime}>PARTNERSHIP OPPORTUNITIES</FxChip>
                    </div>
                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] lg:mt-[0.01em] rounded-none lg:tracking-normal tracking-tight leading-[1.3] lg:pb-10 pb-6">
                                Strategic<br/><span className="gx-gradient-text">Partnerships</span>
                            </h3>
                        </FxReveal>
                        <FxReveal delay={0.1}>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]">
                                <div><p>We believe in the power of collaboration. By partnering with technology leaders, integrators, and resellers, we extend our reach and deliver greater value to clients across new markets and use cases.</p></div>
                                <div><p>Whether you're a cloud provider, integration partner, or reseller, there's a partnership model that works for your business. Let's build something powerful together.</p></div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ── Ecosystem Categories ── */}
            <section id="ecosystem" className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <FxReveal>
                        <FxSectionHeading
                            day={isDayTime}
                            eyebrow="Partner types"
                            title="One ecosystem, many integration paths"
                            subtitle="However you build, sell or scale technology, there's a place for you in the Grey partner network."
                            align="center"
                            className="mb-16 mx-auto"
                        />
                    </FxReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {CATEGORIES.map((c, i) => (
                            <FxReveal key={c.title} delay={i * 0.05}>
                                <FxHoloCard day={isDayTime} className="p-7 h-full group">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform ${isDayTime ? 'bg-teal-50 text-teal-600' : 'bg-gradient-to-br from-teal-400/20 to-violet-500/20 text-teal-300'}`}>
                                        <c.icon />
                                    </div>
                                    <h3 className="text-[1.05em] font-[700] mb-2">{c.title}</h3>
                                    <p className={`text-[0.85em] leading-relaxed ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>{c.desc}</p>
                                </FxHoloCard>
                            </FxReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className={`py-20 px-6 border-y ${isDayTime ? 'border-gray-100 bg-gray-50' : 'border-white/5 bg-white/[0.02]'}`}>
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <FxReveal>
                        <FxChip day={isDayTime} className="mb-5">Why partner with us</FxChip>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-5">A partnership built to compound</h2>
                        <p className={`mb-7 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                            We invest in our partners with enablement, shared pipeline and real
                            engineering support — so the relationship grows beyond a single deal.
                        </p>
                        <FxButton day={isDayTime} href="#apply">Start the conversation</FxButton>
                    </FxReveal>
                    <FxReveal delay={0.1}>
                        <ul className="space-y-4">
                            {BENEFITS.map((b) => (
                                <li key={b}>
                                    <FxCard day={isDayTime} className="flex items-start gap-3 px-5 py-4">
                                        <FaCheckCircle className={`mt-0.5 shrink-0 ${isDayTime ? 'text-teal-600' : 'text-teal-300'}`} />
                                        <span className={`text-sm ${isDayTime ? 'text-gray-700' : 'text-gray-200'}`}>{b}</span>
                                    </FxCard>
                                </li>
                            ))}
                        </ul>
                    </FxReveal>
                </div>
            </section>

            {/* ── Application Form ── */}
            <section id="apply" className="py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <FxReveal>
                        <div className="text-center mb-12">
                            <FxChip day={isDayTime} className="mb-5">
                                <FaPlug className="inline mr-1" /> Apply to partner
                            </FxChip>
                            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-3">Tell us about your company</h2>
                            <p className={isDayTime ? 'text-gray-600' : 'text-gray-400'}>
                                Share a few details and our partnerships team will get back to you within 2–3 business days.
                            </p>
                        </div>
                    </FxReveal>

                    <FxReveal delay={0.1}>
                        <FxCard day={isDayTime} className="p-7 sm:p-10">
                            <form onSubmit={submit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <Field label="Company name *" isDayTime={isDayTime}>
                                        <input required value={form.company} onChange={update('company')} className={inputCls} placeholder="Acme Technologies Ltd" />
                                    </Field>
                                    <Field label="Contact name *" isDayTime={isDayTime}>
                                        <input required value={form.contact_name} onChange={update('contact_name')} className={inputCls} placeholder="Jane Doe" />
                                    </Field>
                                    <Field label="Work email *" isDayTime={isDayTime}>
                                        <input required type="email" value={form.email} onChange={update('email')} className={inputCls} placeholder="jane@acme.com" />
                                    </Field>
                                    <Field label="Phone" isDayTime={isDayTime}>
                                        <input value={form.phone} onChange={update('phone')} className={inputCls} placeholder="+234 ..." />
                                    </Field>
                                    <Field label="Website" isDayTime={isDayTime}>
                                        <input value={form.website} onChange={update('website')} className={inputCls} placeholder="https://acme.com" />
                                    </Field>
                                    <Field label="Country" isDayTime={isDayTime}>
                                        <input value={form.country} onChange={update('country')} className={inputCls} placeholder="Nigeria" />
                                    </Field>
                                    <Field label="Registration authority" isDayTime={isDayTime}>
                                        <input value={form.reg_authority} onChange={update('reg_authority')} className={inputCls} placeholder="CAC (Nigeria) or equivalent" />
                                    </Field>
                                    <Field label="Registration number" isDayTime={isDayTime}>
                                        <input value={form.reg_number} onChange={update('reg_number')} className={inputCls} placeholder="RC-123456" />
                                    </Field>
                                </div>

                                <Field label="Partnership type" isDayTime={isDayTime}>
                                    <select value={form.partnership_type} onChange={update('partnership_type')} className={inputCls}>
                                        {PARTNERSHIP_TYPES.map((t) => (
                                            <option key={t} value={t} className={isDayTime ? 'bg-white' : 'bg-[#0b0d1a]'}>{t}</option>
                                        ))}
                                    </select>
                                </Field>

                                <Field label="Tell us about the partnership" isDayTime={isDayTime}>
                                    <textarea value={form.message} onChange={update('message')} rows={4} className={inputCls} placeholder="What would you like to build or achieve together?" />
                                </Field>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 text-white disabled:opacity-60 hover:shadow-[0_12px_40px_rgba(45,212,191,.4)] transition-shadow"
                                >
                                    {status === 'sending' ? 'Sending…' : 'Submit partnership request'}
                                    {status !== 'sending' && <FaArrowRight />}
                                </button>

                                {feedback && (
                                    <p className={`text-sm text-center ${status === 'ok' ? 'text-teal-500' : 'text-red-400'}`}>
                                        {feedback}
                                    </p>
                                )}
                            </form>
                        </FxCard>
                    </FxReveal>
                </div>
            </section>
        </div>
    );
};

const Field: React.FC<{ label: string; isDayTime: boolean; children: React.ReactNode }> = ({ label, isDayTime, children }) => (
    <label className="block">
        <span className={`block text-xs font-medium mb-1.5 ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`}>{label}</span>
        {children}
    </label>
);

export default Partners;
