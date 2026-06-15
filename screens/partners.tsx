'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css';
import Footer from '@/components/Footer';
import {motion} from 'framer-motion';
import {
    FaHandshake, FaPlug, FaNetworkWired, FaRocket, FaShieldAlt,
    FaCloud, FaCode, FaUsers, FaCheckCircle, FaArrowRight,
} from 'react-icons/fa';

interface Partner {
    id: number;
    name: string;
    logo: string;
    url: string | null;
}

const fadeUp = {
    initial: {opacity: 0, y: 28},
    whileInView: {opacity: 1, y: 0},
    viewport: {once: true, amount: 0.2},
    transition: {duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number]},
};

const PARTNERSHIP_TYPES = [
    'Technology', 'Reseller', 'Referral', 'Strategic', 'Integration', 'Other',
];

const CATEGORIES = [
    {icon: FaCloud, title: 'Cloud & Infrastructure', desc: 'Hyperscalers and managed-cloud providers powering scalable deployments.'},
    {icon: FaCode, title: 'Technology & Platforms', desc: 'SaaS vendors and dev platforms that plug directly into our build stack.'},
    {icon: FaShieldAlt, title: 'Security & Compliance', desc: 'Identity, payments and compliance partners keeping ecosystems safe.'},
    {icon: FaNetworkWired, title: 'Integration & APIs', desc: 'Connectors that let Grey-built systems talk to the tools you already use.'},
    {icon: FaUsers, title: 'Resellers & Referrals', desc: 'Agencies and consultants extending our reach across new markets.'},
    {icon: FaRocket, title: 'Strategic Alliances', desc: 'Long-term collaborators co-creating products and entering markets together.'},
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
        setForm((f) => ({...f, [k]: e.target.value}));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setFeedback('');
        try {
            const res = await fetch('/api/partner-inquiry', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setStatus('ok');
                setFeedback(data.message || 'Thank you! Your request has been received.');
                setForm({
                    company: '', contact_name: '', email: '', phone: '', website: '',
                    country: 'Nigeria', reg_authority: 'CAC', reg_number: '',
                    partnership_type: 'Technology', message: '',
                });
            } else {
                setStatus('err');
                setFeedback(data.message || 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('err');
            setFeedback('Network error. Please try again.');
        }
    };

    return (
        <div className="bg-[#05060f] text-white min-h-screen flex flex-col overflow-x-hidden">
            {/* ============ HERO ============ */}
            <section
                ref={heroRef}
                className="relative isolate flex items-center justify-center min-h-[78vh] px-4 pt-28 pb-20"
            >
                <div className="grey-hero-fallback" aria-hidden>
                    <span className="grey-hero-blob b1 grey-parallax-soft"/>
                    <span className="grey-hero-blob b2 grey-parallax-mid"/>
                    <span className="grey-hero-blob b3 grey-parallax-deep"/>
                </div>
                <div
                    className="absolute inset-0 -z-10 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)',
                        backgroundSize: '54px 54px',
                        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 100%)',
                    }}
                    aria-hidden
                />
                <div className="relative max-w-4xl mx-auto text-center">
                    <motion.span
                        {...fadeUp}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide grey-glass text-teal-300 mb-7"
                    >
                        <FaHandshake/> GREY PARTNER ECOSYSTEM
                    </motion.span>
                    <motion.h1
                        {...fadeUp}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] mb-6"
                    >
                        Build the future on a{' '}
                        <span className="grey-neon-text bg-gradient-to-r from-teal-300 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                            shared ecosystem
                        </span>
                    </motion.h1>
                    <motion.p
                        {...fadeUp}
                        transition={{...fadeUp.transition, delay: 0.08}}
                        className="text-base sm:text-lg text-gray-300/90 max-w-2xl mx-auto mb-10"
                    >
                        We partner with technology innovators, cloud leaders, resellers and integrators to
                        deliver outcomes no single company could build alone. Join the network powering
                        Grey InfoTech&apos;s solutions across Africa and beyond.
                    </motion.p>
                    <motion.div {...fadeUp} transition={{...fadeUp.transition, delay: 0.16}} className="flex flex-wrap items-center justify-center gap-4">
                        <a href="#apply"
                           className="grey-squish inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-gradient-to-r from-teal-400 to-cyan-500 text-[#05060f] hover:shadow-[0_12px_40px_rgba(45,212,191,.45)] transition-shadow">
                            Become a partner <FaArrowRight/>
                        </a>
                        <a href="#ecosystem"
                           className="grey-glass inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white/90 hover:text-white transition">
                            Explore the ecosystem
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ============ EXISTING PARTNERS MARQUEE ============ */}
            {partners.length > 0 && (
                <section className="py-14 border-y border-white/5 bg-white/[0.02]">
                    <p className="text-center text-xs uppercase tracking-[0.25em] text-gray-400 mb-9">
                        Trusted by partners we build with
                    </p>
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
                        {partners.map((p) => (
                            <a
                                key={p.id}
                                href={p.url || undefined}
                                target={p.url ? '_blank' : undefined}
                                rel="noreferrer"
                                className="grey-glass rounded-xl h-20 flex items-center justify-center p-4 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.logo} alt={p.name} className="max-h-10 max-w-[120px] object-contain"/>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* ============ ECOSYSTEM CATEGORIES ============ */}
            <section id="ecosystem" className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">One ecosystem, many integration paths</h2>
                        <p className="text-gray-400">
                            However you build, sell or scale technology, there&apos;s a place for you in the
                            Grey partner network.
                        </p>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CATEGORIES.map((c, i) => (
                            <motion.div
                                key={c.title}
                                {...fadeUp}
                                transition={{...fadeUp.transition, delay: i * 0.05}}
                                className="grey-glass grey-tilt-card group rounded-2xl p-7 border border-white/5 hover:border-teal-400/40 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400/20 to-violet-500/20 flex items-center justify-center text-teal-300 text-xl mb-5 group-hover:scale-110 transition-transform">
                                    <c.icon/>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ BENEFITS ============ */}
            <section className="py-20 px-6 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div {...fadeUp}>
                        <span className="text-teal-300 text-xs font-semibold tracking-[0.2em] uppercase">Why partner with us</span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-5">A partnership built to compound</h2>
                        <p className="text-gray-400 mb-7">
                            We invest in our partners with enablement, shared pipeline and real
                            engineering support — so the relationship grows beyond a single deal.
                        </p>
                        <a href="#apply"
                           className="grey-squish inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-teal-400 to-cyan-500 text-[#05060f]">
                            Start the conversation <FaArrowRight/>
                        </a>
                    </motion.div>
                    <motion.ul {...fadeUp} transition={{...fadeUp.transition, delay: 0.1}} className="space-y-4">
                        {BENEFITS.map((b) => (
                            <li key={b} className="flex items-start gap-3 grey-glass rounded-xl px-5 py-4">
                                <FaCheckCircle className="text-teal-300 mt-0.5 shrink-0"/>
                                <span className="text-sm text-gray-200">{b}</span>
                            </li>
                        ))}
                    </motion.ul>
                </div>
            </section>

            {/* ============ APPLICATION FORM ============ */}
            <section id="apply" className="py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 text-teal-300 text-xs font-semibold tracking-[0.2em] uppercase">
                            <FaPlug/> Apply to partner
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-3">Tell us about your company</h2>
                        <p className="text-gray-400">
                            Share a few details and our partnerships team will get back to you within 2&ndash;3 business days.
                        </p>
                    </motion.div>

                    <motion.form
                        {...fadeUp}
                        onSubmit={submit}
                        className="grey-glass rounded-3xl p-7 sm:p-10 border border-white/5 space-y-5"
                    >
                        <div className="grid sm:grid-cols-2 gap-5">
                            <Field label="Company name *">
                                <input required value={form.company} onChange={update('company')} className={inputCls} placeholder="Acme Technologies Ltd"/>
                            </Field>
                            <Field label="Contact name *">
                                <input required value={form.contact_name} onChange={update('contact_name')} className={inputCls} placeholder="Jane Doe"/>
                            </Field>
                            <Field label="Work email *">
                                <input required type="email" value={form.email} onChange={update('email')} className={inputCls} placeholder="jane@acme.com"/>
                            </Field>
                            <Field label="Phone">
                                <input value={form.phone} onChange={update('phone')} className={inputCls} placeholder="+234 ..."/>
                            </Field>
                            <Field label="Website">
                                <input value={form.website} onChange={update('website')} className={inputCls} placeholder="https://acme.com"/>
                            </Field>
                            <Field label="Country">
                                <input value={form.country} onChange={update('country')} className={inputCls} placeholder="Nigeria"/>
                            </Field>
                            <Field label="Registration authority">
                                <input value={form.reg_authority} onChange={update('reg_authority')} className={inputCls} placeholder="CAC (Nigeria) or equivalent"/>
                            </Field>
                            <Field label="Registration number">
                                <input value={form.reg_number} onChange={update('reg_number')} className={inputCls} placeholder="RC-123456"/>
                            </Field>
                        </div>

                        <Field label="Partnership type">
                            <select value={form.partnership_type} onChange={update('partnership_type')} className={inputCls}>
                                {PARTNERSHIP_TYPES.map((t) => (
                                    <option key={t} value={t} className="bg-[#0b0d1a]">{t}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Tell us about the partnership">
                            <textarea value={form.message} onChange={update('message')} rows={4} className={inputCls} placeholder="What would you like to build or achieve together?"/>
                        </Field>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="grey-squish w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold bg-gradient-to-r from-teal-400 to-cyan-500 text-[#05060f] disabled:opacity-60 hover:shadow-[0_12px_40px_rgba(45,212,191,.4)] transition-shadow"
                        >
                            {status === 'sending' ? 'Sending…' : 'Submit partnership request'}
                            {status !== 'sending' && <FaArrowRight/>}
                        </button>

                        {feedback && (
                            <p className={`text-sm text-center ${status === 'ok' ? 'text-teal-300' : 'text-red-400'}`}>
                                {feedback}
                            </p>
                        )}
                    </motion.form>
                </div>
            </section>

            <Footer/>
        </div>
    );
};

const inputCls =
    'w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-teal-400/60 focus:bg-white/[0.06] transition';

const Field: React.FC<{label: string; children: React.ReactNode}> = ({label, children}) => (
    <label className="block">
        <span className="block text-xs font-medium text-gray-400 mb-1.5">{label}</span>
        {children}
    </label>
);

export default Partners;
