'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/globals.css';
import {motion} from 'framer-motion';
import {FaTicketAlt, FaCheckCircle, FaExclamationCircle} from 'react-icons/fa';

const PRIORITIES = [
    {value: 'low', label: 'Low', desc: 'General question or minor issue'},
    {value: 'medium', label: 'Medium', desc: 'Something is broken but has a workaround'},
    {value: 'high', label: 'High', desc: 'Major feature is impacted'},
    {value: 'urgent', label: 'Urgent', desc: 'Critical — system is down or unusable'},
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
    const [isDayTime, setIsDayTime] = useState(true);
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

    useEffect(() => {
        const update = () => {
            const h = new Date().getHours();
            setIsDayTime(h >= 6 && h < 18);
        };
        update();
        const id = setInterval(update, 60_000);
        return () => clearInterval(id);
    }, []);

    const bg = isDayTime ? 'bg-white text-black' : 'bg-black text-white';
    const inputCls = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2 ${
        isDayTime
            ? 'border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-teal-400 focus:ring-teal-100'
            : 'border-zinc-700 bg-zinc-900 text-white placeholder-zinc-500 focus:border-teal-500 focus:ring-teal-900/30'
    }`;
    const labelCls = `block text-sm font-medium mb-1.5 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`;
    const errorCls = 'text-red-500 text-xs mt-1';

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
                headers: {'Content-Type': 'application/json'},
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
        setForm(prev => ({...prev, [field]: val}));
        if (errors[field]) setErrors(prev => {
            const n = {...prev};
            delete n[field];
            return n;
        });
    }

    if (submitted) {
        const ref = `GIT-${String(ticketId || 0).padStart(4, '0')}`;
        return (
            <div className={`${bg} min-h-screen flex flex-col transition-colors duration-500`}>
                <Header/>
                <main className="flex-1 flex items-center justify-center px-4 py-20">
                    <motion.div
                        initial={{opacity: 0, scale: 0.95, y: 20}}
                        animate={{opacity: 1, scale: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className={`w-full max-w-lg text-center rounded-3xl p-10 border ${isDayTime ? 'bg-white border-gray-100 shadow-lg' : 'bg-zinc-950 border-zinc-800'}`}
                    >
                        <div
                            className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
                            <FaCheckCircle className="text-teal-500 text-3xl"/>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Ticket submitted!</h2>
                        <p className={`text-sm mb-6 ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`}>
                            We've received your request and sent a confirmation to <strong>{form.email}</strong>.
                        </p>
                        <div
                            className={`inline-block px-6 py-3 rounded-xl mb-6 ${isDayTime ? 'bg-teal-50' : 'bg-teal-900/20'}`}>
                            <p className={`text-xs mb-1 ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>Your ticket
                                reference</p>
                            <p className="text-2xl font-bold tracking-widest text-teal-600">{ref}</p>
                        </div>
                        <p className={`text-sm mb-8 ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`}>
                            Our team will respond within one business day (Mon–Fri, 9am–6pm WAT).
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/"
                                  className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${isDayTime ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-white text-black hover:bg-gray-100'}`}>
                                Back to home
                            </Link>
                            <button
                                onClick={() => {
                                    setSubmitted(false);
                                    setForm({
                                        name: '',
                                        email: '',
                                        subject: '',
                                        customSubject: '',
                                        priority: 'medium',
                                        description: ''
                                    });
                                }}
                                className={`px-6 py-3 rounded-full text-sm font-medium border transition-colors ${isDayTime ? 'border-gray-200 text-gray-700 hover:border-gray-400' : 'border-zinc-700 text-gray-300 hover:border-zinc-500'}`}
                            >
                                Open another ticket
                            </button>
                        </div>
                    </motion.div>
                </main>
                <Footer/>
            </div>
        );
    }

    return (
        <div className={`${bg} min-h-screen flex flex-col transition-colors duration-500`}>
            <Header/>

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-16 md:py-24">
                    <motion.div initial={{opacity: 0, y: 24}} animate={{opacity: 1, y: 0}} transition={{duration: 0.55}}
                                className="max-w-2xl">
                        <span
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-teal-400 mb-4">
                            <FaTicketAlt/> Support Centre
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">Open a support
                            ticket</h1>
                        <p className="text-gray-300 text-base sm:text-lg">
                            Tell us what's going on and we'll get back to you as quickly as possible. No account needed.
                        </p>
                    </motion.div>
                </div>
            </section>

            <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-8 py-14 md:py-20">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-8">

                        {/* Contact info */}
                        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.4, delay: 0.05}}
                                    className={`rounded-2xl border p-6 sm:p-8 ${isDayTime ? 'bg-white border-gray-100 shadow-sm' : 'bg-zinc-950 border-zinc-800'}`}>
                            <h2 className="text-base font-semibold mb-5">Your contact details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelCls}>Full name <span
                                        className="text-red-500">*</span></label>
                                    <input
                                        className={`${inputCls} ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                                        placeholder="e.g. Chukwuemeka Obi" value={form.name}
                                        onChange={e => set('name', e.target.value)}/>
                                    {errors.name && <p className={errorCls}>{errors.name}</p>}
                                </div>
                                <div>
                                    <label className={labelCls}>Email address <span
                                        className="text-red-500">*</span></label>
                                    <input type="email"
                                           className={`${inputCls} ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
                                           placeholder="you@example.com" value={form.email}
                                           onChange={e => set('email', e.target.value)}/>
                                    {errors.email && <p className={errorCls}>{errors.email}</p>}
                                </div>
                            </div>
                        </motion.div>

                        {/* Issue details */}
                        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.4, delay: 0.1}}
                                    className={`rounded-2xl border p-6 sm:p-8 ${isDayTime ? 'bg-white border-gray-100 shadow-sm' : 'bg-zinc-950 border-zinc-800'}`}>
                            <h2 className="text-base font-semibold mb-5">Issue details</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className={labelCls}>Subject <span className="text-red-500">*</span></label>
                                    <select className={`${inputCls} ${errors.subject ? 'border-red-400' : ''}`}
                                            value={form.subject} onChange={e => set('subject', e.target.value)}>
                                        <option value="">Select a subject…</option>
                                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    {errors.subject && <p className={errorCls}>{errors.subject}</p>}
                                </div>

                                {form.subject === 'Other' && (
                                    <div>
                                        <label className={labelCls}>Describe the subject <span
                                            className="text-red-500">*</span></label>
                                        <input className={`${inputCls} ${errors.customSubject ? 'border-red-400' : ''}`}
                                               placeholder="Brief subject line" value={form.customSubject}
                                               onChange={e => set('customSubject', e.target.value)}/>
                                        {errors.customSubject && <p className={errorCls}>{errors.customSubject}</p>}
                                    </div>
                                )}

                                <div>
                                    <label className={labelCls}>Description <span
                                        className="text-red-500">*</span></label>
                                    <textarea
                                        rows={6}
                                        className={`${inputCls} resize-y min-h-[120px] ${errors.description ? 'border-red-400' : ''}`}
                                        placeholder="Please describe the issue in as much detail as possible — what happened, what you expected, and any steps to reproduce it."
                                        value={form.description}
                                        onChange={e => set('description', e.target.value)}
                                    />
                                    {errors.description && <p className={errorCls}>{errors.description}</p>}
                                </div>
                            </div>
                        </motion.div>

                        {/* Priority */}
                        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.4, delay: 0.15}}
                                    className={`rounded-2xl border p-6 sm:p-8 ${isDayTime ? 'bg-white border-gray-100 shadow-sm' : 'bg-zinc-950 border-zinc-800'}`}>
                            <h2 className="text-base font-semibold mb-5">Priority</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {PRIORITIES.map(p => {
                                    const active = form.priority === p.value;
                                    const colors: Record<string, string> = {
                                        low: 'teal',
                                        medium: 'blue',
                                        high: 'amber',
                                        urgent: 'red'
                                    };
                                    const c = colors[p.value];
                                    return (
                                        <button
                                            type="button"
                                            key={p.value}
                                            onClick={() => set('priority', p.value)}
                                            className={`text-left rounded-xl border px-4 py-3.5 transition-all ${active
                                                ? `border-${c}-400 bg-${c}-50 ring-1 ring-${c}-200`
                                                : isDayTime ? 'border-gray-200 hover:border-gray-300 bg-white' : 'border-zinc-800 hover:border-zinc-600 bg-zinc-900'
                                            }`}
                                        >
                                            <span
                                                className={`text-sm font-semibold block mb-0.5 ${active ? `text-${c}-700` : ''}`}>{p.label}</span>
                                            <span
                                                className={`text-xs ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`}>{p.desc}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Server error */}
                        {serverError && (
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                                <FaExclamationCircle className="text-red-500 mt-0.5 shrink-0"/>
                                <p className="text-sm text-red-700">{serverError}</p>
                            </div>
                        )}

                        {/* Submit */}
                        <motion.div initial={{opacity: 0, y: 16}} animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.4, delay: 0.2}}
                                    className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className={`text-xs ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>
                                By submitting you agree to our{' '}
                                <Link href="/Terms-Conditions"
                                      className="underline underline-offset-2 hover:text-gray-700">Terms
                                    of Service</Link>.
                                We'll only use your email to respond to this ticket.
                            </p>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {submitting ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    strokeWidth="4"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                        </svg>
                                        Submitting…
                                    </>
                                ) : (
                                    <><FaTicketAlt/> Submit ticket</>
                                )}
                            </button>
                        </motion.div>
                    </div>
                </form>
            </main>

            <Footer/>
        </div>
    );
};

export default OpenTicket;