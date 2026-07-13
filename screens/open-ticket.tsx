'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '@/app/globals.css';
import { motion } from 'framer-motion';
import { FaTicketAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useIsDayTime } from '../components/useIsDayTime';
import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxHoloCard,
    FxGlitchText,
} from '@/components/futuristic/fx';


const PRIORITIES = [
    { value: 'low',    label: 'Low',    color: '#2dd4bf', desc: 'General question or minor issue' },
    { value: 'medium', label: 'Medium', color: '#06b6d4', desc: 'Something is broken but has a workaround' },
    { value: 'high',   label: 'High',   color: '#f59e0b', desc: 'Major feature is impacted' },
    { value: 'urgent', label: 'Urgent', color: '#ef4444', desc: 'Critical — system is down or unusable' },
];

const SUBJECTS = [
    'Bug report',
    'Feature request',
    'Account / billing question',
    'Performance issue',
    'Integration help',
    'Security concern',
    'General question',
    'Other',
];

interface FormState {
    name: string;
    email: string;
    subject: string;
    customSubject: string;
    priority: string;
    description: string;
}

const OpenTicket: React.FC = () => {
    const isDayTime = useIsDayTime();
    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        subject: '',
        customSubject: '',
        priority: 'medium',
        description: '',
    });
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [ticketId, setTicketId] = useState<number | null>(null);
    const [serverError, setServerError] = useState('');

    const inputCls = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2 ${
        isDayTime
            ? 'border-gray-200 bg-white/80 text-gray-900 placeholder-gray-400 focus:border-teal-400 focus:ring-teal-100'
            : 'border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-teal-400 focus:ring-teal-400/20'
    }`;
    const labelCls = `block text-sm font-medium mb-1.5 ${isDayTime ? 'text-gray-700' : 'text-white/70'}`;
    const errorCls = 'text-red-400 text-xs mt-1';

    function validate(): boolean {
        const e: Partial<FormState> = {};
        if (!form.name.trim()) e.name = 'Your name is required.';
        if (!form.email.trim()) e.email = 'Your email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
        if (!form.subject) e.subject = 'Please select a subject.';
        if (form.subject === 'Other' && !form.customSubject.trim()) e.customSubject = 'Please describe the subject.';
        if (!form.description.trim()) e.description = 'Please describe your issue.';
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        setServerError('');
        const finalSubject = form.subject === 'Other' ? form.customSubject.trim() : form.subject;
        try {
            const res = await fetch('/api/open-ticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    subject: finalSubject,
                    priority: form.priority,
                    description: form.description.trim(),
                }),
            });
            const data = await res.json();
            if (data.success) {
                setTicketId(data.ticketId);
                setSubmitted(true);
            } else {
                setServerError(data.message || 'Something went wrong. Please try again.');
            }
        } catch {
            setServerError('Network error. Please check your connection and try again.');
        } finally {
            setSubmitting(false);
        }
    }

    function set(field: keyof FormState, val: string) {
        setForm(prev => ({ ...prev, [field]: val }));
        if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
    }

    /* ── Success state ── */
    if (submitted) {
        const ref = `GIT-${String(ticketId || 0).padStart(4, '0')}`;
        return (
            <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDayTime ? 'bg-white text-black' : 'bg-[#050810] text-white'}`}>
                <div className="absolute inset-0 pointer-events-none">
                    <FxBackground day={isDayTime} grid aurora className="opacity-40" />
                </div>
                <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-lg"
                    >
                        <FxHoloCard day={isDayTime} className="p-10 text-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${isDayTime ? 'bg-teal-50' : 'bg-teal-500/10'}`}>
                                <FaCheckCircle className="text-teal-400 text-3xl" />
                            </div>
                            <FxGlitchText tag="h2" className="text-2xl font-bold mb-2">
                                Ticket submitted!
                            </FxGlitchText>
                            <p className={`text-sm mb-6 ${isDayTime ? 'text-gray-500' : 'text-white/50'}`}>
                                We&apos;ve received your request and sent a confirmation to{' '}
                                <strong className={isDayTime ? 'text-gray-800' : 'text-white/80'}>{form.email}</strong>.
                            </p>
                            <div className={`inline-block px-6 py-3 rounded-xl mb-6 border ${isDayTime ? 'bg-teal-50 border-teal-200' : 'bg-teal-500/10 border-teal-400/20'}`}>
                                <p className={`text-xs mb-1 font-mono uppercase tracking-widest ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>Ticket reference</p>
                                <p className="text-2xl font-bold tracking-widest text-teal-400">{ref}</p>
                            </div>
                            <p className={`text-sm mb-8 ${isDayTime ? 'text-gray-500' : 'text-white/45'}`}>
                                Our team will respond within one business day (Mon–Fri, 9am–6pm WAT).
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <FxButton day={isDayTime} href="/" variant="solid">Back to home</FxButton>
                                <FxButton
                                    day={isDayTime}
                                    variant="ghost"
                                    onClickAction={() => {
                                        setSubmitted(false);
                                        setForm({ name: '', email: '', subject: '', customSubject: '', priority: 'medium', description: '' });
                                    }}
                                >
                                    Open another ticket
                                </FxButton>
                            </div>
                        </FxHoloCard>
                    </motion.div>
                </main>
            </div>
        );
    }

    /* ── Main form ── */
    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDayTime ? 'bg-white text-black' : 'bg-[#050810] text-white'}`}>

            {/* ── Hero ── */}
            <section className="relative overflow-hidden min-h-[38vh] flex flex-col justify-end">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#050810] to-[#071420]" />
                <FxBackground day={false} grid aurora className="opacity-60" />
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-noise-overlay pointer-events-none" />
                <div className="gx-orbit pointer-events-none absolute" style={{ width: '60vmax', height: '60vmax', top: '-20vmax', right: '-18vmax', opacity: .12 }} />

                <div className="relative z-10 gx-page-hero-content">
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal>
                            <FxChip day={false} className="mb-5">
                                <FaTicketAlt className="inline mr-1.5 -mt-0.5" /> Support Centre
                            </FxChip>
                            <div className="border-b border-white/15 pb-6 mb-6 max-w-3xl">
                                <FxGlitchText tag="h1" className="gx-hero-title text-white">
                                    Open a support ticket
                                </FxGlitchText>
                            </div>
                            <p className="text-white/55 max-w-xl text-[0.95em] leading-relaxed">
                                Tell us what&apos;s going on and we&apos;ll get back to you as quickly as possible. No account needed.
                            </p>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ── Form ── */}
            <main className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-4 sm:px-8 py-14 md:py-20">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-6">

                        {/* Contact info */}
                        <FxReveal delay={0.05}>
                            <FxHoloCard day={isDayTime} className="p-6 sm:p-8">
                                <h2 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isDayTime ? 'text-gray-500' : 'text-white/40'}`}>
                                    01 / Contact details
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelCls}>Full name <span className="text-red-400">*</span></label>
                                        <input
                                            className={`${inputCls} ${errors.name ? 'border-red-400/60' : ''}`}
                                            placeholder="e.g. Chukwuemeka Obi"
                                            value={form.name}
                                            onChange={e => set('name', e.target.value)}
                                        />
                                        {errors.name && <p className={errorCls}>{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className={labelCls}>Email address <span className="text-red-400">*</span></label>
                                        <input
                                            type="email"
                                            className={`${inputCls} ${errors.email ? 'border-red-400/60' : ''}`}
                                            placeholder="you@example.com"
                                            value={form.email}
                                            onChange={e => set('email', e.target.value)}
                                        />
                                        {errors.email && <p className={errorCls}>{errors.email}</p>}
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        {/* Issue details */}
                        <FxReveal delay={0.1}>
                            <FxHoloCard day={isDayTime} className="p-6 sm:p-8">
                                <h2 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isDayTime ? 'text-gray-500' : 'text-white/40'}`}>
                                    02 / Issue details
                                </h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className={labelCls}>Subject <span className="text-red-400">*</span></label>
                                        <select
                                            className={`${inputCls} ${errors.subject ? 'border-red-400/60' : ''}`}
                                            value={form.subject}
                                            onChange={e => set('subject', e.target.value)}
                                        >
                                            <option value="">Select a subject…</option>
                                            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        {errors.subject && <p className={errorCls}>{errors.subject}</p>}
                                    </div>

                                    {form.subject === 'Other' && (
                                        <div>
                                            <label className={labelCls}>Describe the subject <span className="text-red-400">*</span></label>
                                            <input
                                                className={`${inputCls} ${errors.customSubject ? 'border-red-400/60' : ''}`}
                                                placeholder="Brief subject line"
                                                value={form.customSubject}
                                                onChange={e => set('customSubject', e.target.value)}
                                            />
                                            {errors.customSubject && <p className={errorCls}>{errors.customSubject}</p>}
                                        </div>
                                    )}

                                    <div>
                                        <label className={labelCls}>Description <span className="text-red-400">*</span></label>
                                        <textarea
                                            rows={6}
                                            className={`${inputCls} resize-y min-h-[120px] ${errors.description ? 'border-red-400/60' : ''}`}
                                            placeholder="Describe the issue — what happened, what you expected, and steps to reproduce."
                                            value={form.description}
                                            onChange={e => set('description', e.target.value)}
                                        />
                                        {errors.description && <p className={errorCls}>{errors.description}</p>}
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        {/* Priority */}
                        <FxReveal delay={0.15}>
                            <FxHoloCard day={isDayTime} className="p-6 sm:p-8">
                                <h2 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isDayTime ? 'text-gray-500' : 'text-white/40'}`}>
                                    03 / Priority level
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {PRIORITIES.map(p => {
                                        const active = form.priority === p.value;
                                        return (
                                            <button
                                                type="button"
                                                key={p.value}
                                                onClick={() => set('priority', p.value)}
                                                className={`text-left rounded-xl border px-4 py-3.5 transition-all duration-200 ${
                                                    active
                                                        ? 'ring-1'
                                                        : isDayTime
                                                            ? 'border-gray-200 hover:border-gray-300 bg-white/60'
                                                            : 'border-white/10 hover:border-white/20 bg-white/[0.03]'
                                                }`}
                                                style={active ? {
                                                    borderColor: p.color + '60',
                                                    background: p.color + '12',
                                                    boxShadow: `0 0 0 1px ${p.color}30`,
                                                } : {}}
                                            >
                                                <span
                                                    className="text-sm font-semibold block mb-0.5"
                                                    style={active ? { color: p.color } : { color: isDayTime ? '#374151' : '#ffffff99' }}
                                                >
                                                    {p.label}
                                                </span>
                                                <span className={`text-xs ${isDayTime ? 'text-gray-500' : 'text-white/40'}`}>{p.desc}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </FxHoloCard>
                        </FxReveal>

                        {/* Server error */}
                        {serverError && (
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-400/30">
                                <FaExclamationCircle className="text-red-400 mt-0.5 shrink-0" />
                                <p className="text-sm text-red-300">{serverError}</p>
                            </div>
                        )}

                        {/* Submit row */}
                        <FxReveal delay={0.2}>
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className={`text-xs ${isDayTime ? 'text-gray-400' : 'text-white/30'}`}>
                                    By submitting you agree to our{' '}
                                    <Link href="/Terms-Conditions" className="underline underline-offset-2 hover:text-teal-400 transition-colors">
                                        Terms of Service
                                    </Link>.
                                    We&apos;ll only use your email to respond to this ticket.
                                </p>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-[0.9em] font-[600] tracking-tight transition-all duration-300 whitespace-nowrap text-[#04110f] bg-gradient-to-r from-teal-400 to-cyan-400 shadow-[0_10px_30px_-10px_rgba(34,211,238,.8)] hover:shadow-[0_16px_40px_-10px_rgba(45,212,191,.9)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10 inline-flex items-center gap-2">
                                        {submitting ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                                Submitting…
                                            </>
                                        ) : (
                                            <><FaTicketAlt /> Submit ticket</>
                                        )}
                                    </span>
                                    <span className="absolute inset-0 -translate-x-full bg-white/30 blur-md transition-transform duration-500 group-hover:translate-x-full" />
                                </button>
                            </div>
                        </FxReveal>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default OpenTicket;
