'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';
import { useIsDayTime } from '../../components/useIsDayTime';
import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxGlitchText,
    FxTerminal,
} from '@/components/futuristic/fx';

const ROLES = [
    'Frontend Developer',
    'Backend Developer',
    'Full-Stack Developer',
    'Mobile Developer (React Native)',
    'UI/UX Designer',
    'Product Manager',
    'DevOps / Cloud Engineer',
    'Data Analyst',
    'Digital Marketing Specialist',
    'Content Writer / Strategist',
    'Project Manager',
    'Business Development',
    'Other',
];

const EXP_LEVELS = [
    '< 1 year',
    '1 – 2 years',
    '3 – 5 years',
    '5 – 8 years',
    '8+ years',
];

const AVAILABILITY = [
    'Immediately',
    'Within 2 weeks',
    'Within 1 month',
    '1 – 3 months',
    'Not actively looking — open to the right role',
];

const WORK_TYPES = ['Full-time', 'Part-time', 'Contract / Freelance', 'Internship'];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function CareerIntroduceScreen() {
    const isDayTime = useIsDayTime();
    const dark = !isDayTime;
    const router = useRouter();

    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [charCount, setCharCount] = useState(0);

    const [form, setForm] = useState({
        full_name: '',
        email: '',
        phone: '',
        country: '',
        role_interest: '',
        experience_years: '',
        linkedin_url: '',
        portfolio_url: '',
        availability: '',
        work_type: '',
        cover_letter: '', // Used as the personal introduction field
    });

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const val = e.target.value;
        setForm(prev => ({ ...prev, [k]: val }));
        if (k === 'cover_letter') setCharCount(val.length);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.full_name || !form.email) {
            setErrorMsg('Full name and email are required.');
            return;
        }
        if (!form.cover_letter || form.cover_letter.length < 50) {
            setErrorMsg('Please write at least a brief introduction (50+ characters).');
            return;
        }
        setStatus('loading');
        setErrorMsg('');

        try {
            // Merge availability + work_type into cover_letter for storage, keep full context
            const enrichedLetter = `${form.cover_letter}${form.availability ? `\n\nAvailability: ${form.availability}` : ''}${form.work_type ? `\nWork Type: ${form.work_type}` : ''}`;

            const payload = {
                form_type: 'self_introduction',
                full_name: form.full_name,
                email: form.email,
                phone: form.phone,
                country: form.country,
                role_interest: form.role_interest,
                experience_years: form.experience_years,
                linkedin_url: form.linkedin_url,
                portfolio_url: form.portfolio_url,
                cover_letter: enrichedLetter,
            };

            const res = await fetch('/api/career-apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (!res.ok || !data.ok) {
                setErrorMsg(data.error || 'Something went wrong. Please try again.');
                setStatus('error');
                return;
            }
            setStatus('success');
        } catch {
            setErrorMsg('Network error. Please check your connection and try again.');
            setStatus('error');
        }
    };

    const inputCls = `w-full bg-transparent border rounded-lg px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 ${
        dark
            ? 'border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/60 focus:ring-cyan-400/20'
            : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-500/60 focus:ring-cyan-500/10'
    }`;

    const labelCls = `block text-[0.75em] font-[600] uppercase tracking-widest mb-2 ${dark ? 'text-cyan-400/70' : 'text-cyan-600/70'}`;

    if (status === 'success') {
        return (
            <div className={`min-h-screen flex items-center justify-center px-4 ${dark ? 'bg-[#050810] text-white' : 'bg-white text-gray-900'}`}>
                <FxBackground day={isDayTime} grid aurora className="opacity-30" />
                <FxReveal className="relative z-10 text-center max-w-lg mx-auto">
                    <div className="w-20 h-20 mx-auto mb-8 relative">
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-ping" style={{ animationDuration: '1.5s' }} />
                        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-[2em] ${dark ? 'bg-cyan-400/10' : 'bg-cyan-50'}`}>
                            🚀
                        </div>
                    </div>
                    <FxChip day={isDayTime} className="mb-4">Introduction Received</FxChip>
                    <FxGlitchText tag="h2" className="text-[2em] font-[800] tracking-tight mb-4">
                        Nice to meet you!
                    </FxGlitchText>
                    <p className={`text-[0.9em] leading-relaxed mb-8 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We've stored your introduction and will keep your profile on file.
                        We'll reach out when a role that matches you opens up.
                        Check your inbox for a confirmation email.
                    </p>
                    <FxButton day={isDayTime} href="/careers" variant="ghost">Back to Careers</FxButton>
                </FxReveal>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${dark ? 'bg-[#050810] text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-500`}>
            <FxBackground day={isDayTime} grid aurora className="opacity-20" />
            <div className="gx-scanline pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">

                {/* Header */}
                <div className="grid lg:grid-cols-5 gap-12 mb-14 items-start">
                    <FxReveal className="lg:col-span-3">
                        <FxChip day={isDayTime} className="mb-5">Don't see the right role?</FxChip>
                        <FxGlitchText tag="h1" className="text-[2.4em] md:text-[3em] font-[900] tracking-tight leading-[1.1] mb-4">
                            Introduce <span className="gx-gradient-text">Yourself</span>
                        </FxGlitchText>
                        <p className={`text-[0.92em] leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                            We occasionally open positions that aren't publicly listed.
                            Tell us who you are, what you're great at, and what you're looking for.
                            We'll keep your profile and reach out when the right fit emerges.
                        </p>
                    </FxReveal>
                    <FxReveal delay={0.15} className="lg:col-span-2">
                        <FxTerminal
                            day={isDayTime}
                            lines={[
                                '# grey infotech — talent radar',
                                'npm run meet-the-team',
                                '',
                                '> Scanning incoming profile...',
                                '> Indexing skills...',
                                '> Matching opportunities...',
                                '',
                                '✓ Profile stored. We\'ll be in touch.',
                            ]}
                        />
                    </FxReveal>
                </div>

                {/* Form */}
                <FxReveal delay={0.1}>
                    <div className={`relative rounded-2xl border p-8 md:p-10 ${
                        dark
                            ? 'bg-white/[0.02] border-white/8 backdrop-blur-sm'
                            : 'bg-white border-gray-100 shadow-xl shadow-gray-100/80'
                    }`}>
                        {/* Corner accents — cyan theme to differentiate from CV form */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-2xl pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400/30 rounded-br-2xl pointer-events-none" />

                        <form onSubmit={handleSubmit} noValidate>
                            {/* Section: Who are you */}
                            <div className="mb-8">
                                <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${dark ? 'border-white/8' : 'border-gray-100'}`}>
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.7em] font-[900] ${dark ? 'bg-cyan-400/15 text-cyan-400' : 'bg-cyan-50 text-cyan-600'}`}>01</span>
                                    <span className={`text-[0.8em] font-[700] uppercase tracking-widest ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Who Are You?</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
                                        <input type="text" className={inputCls} placeholder="Sobiribo Graham"
                                            value={form.full_name} onChange={set('full_name')} required />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Email Address <span className="text-red-400">*</span></label>
                                        <input type="email" className={inputCls} placeholder="you@example.com"
                                            value={form.email} onChange={set('email')} required />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Phone Number</label>
                                        <input type="tel" className={inputCls} placeholder="+234 800 000 0000"
                                            value={form.phone} onChange={set('phone')} />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Country</label>
                                        <input type="text" className={inputCls} placeholder="Nigeria"
                                            value={form.country} onChange={set('country')} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Your Craft */}
                            <div className="mb-8">
                                <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${dark ? 'border-white/8' : 'border-gray-100'}`}>
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.7em] font-[900] ${dark ? 'bg-cyan-400/15 text-cyan-400' : 'bg-cyan-50 text-cyan-600'}`}>02</span>
                                    <span className={`text-[0.8em] font-[700] uppercase tracking-widest ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Your Craft</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelCls}>Role / Discipline</label>
                                        <select className={inputCls} value={form.role_interest} onChange={set('role_interest')}>
                                            <option value="">What do you do best?</option>
                                            {ROLES.map(r => (
                                                <option key={r} value={r} className={dark ? 'bg-[#0d1117]' : 'bg-white'}>{r}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelCls}>Years of Experience</label>
                                        <select className={inputCls} value={form.experience_years} onChange={set('experience_years')}>
                                            <option value="">How long have you been at it?</option>
                                            {EXP_LEVELS.map(e => (
                                                <option key={e} value={e} className={dark ? 'bg-[#0d1117]' : 'bg-white'}>{e}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelCls}>LinkedIn URL</label>
                                        <input type="url" className={inputCls} placeholder="https://linkedin.com/in/yourname"
                                            value={form.linkedin_url} onChange={set('linkedin_url')} />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Portfolio / GitHub</label>
                                        <input type="url" className={inputCls} placeholder="https://yourportfolio.com"
                                            value={form.portfolio_url} onChange={set('portfolio_url')} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Availability */}
                            <div className="mb-8">
                                <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${dark ? 'border-white/8' : 'border-gray-100'}`}>
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.7em] font-[900] ${dark ? 'bg-cyan-400/15 text-cyan-400' : 'bg-cyan-50 text-cyan-600'}`}>03</span>
                                    <span className={`text-[0.8em] font-[700] uppercase tracking-widest ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Availability & Preference</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelCls}>When can you start?</label>
                                        <select className={inputCls} value={form.availability} onChange={set('availability')}>
                                            <option value="">Select availability…</option>
                                            {AVAILABILITY.map(a => (
                                                <option key={a} value={a} className={dark ? 'bg-[#0d1117]' : 'bg-white'}>{a}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelCls}>Work Type Preference</label>
                                        <select className={inputCls} value={form.work_type} onChange={set('work_type')}>
                                            <option value="">Select work type…</option>
                                            {WORK_TYPES.map(w => (
                                                <option key={w} value={w} className={dark ? 'bg-[#0d1117]' : 'bg-white'}>{w}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section: Your Introduction */}
                            <div className="mb-8">
                                <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${dark ? 'border-white/8' : 'border-gray-100'}`}>
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.7em] font-[900] ${dark ? 'bg-cyan-400/15 text-cyan-400' : 'bg-cyan-50 text-cyan-600'}`}>04</span>
                                    <span className={`text-[0.8em] font-[700] uppercase tracking-widest ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Your Introduction <span className="text-red-400 normal-case font-[500] tracking-normal">*</span></span>
                                </div>
                                <div className="relative">
                                    <textarea
                                        className={`${inputCls} min-h-[200px] resize-y`}
                                        placeholder="Tell us about yourself — what you've built, what drives you, why you're excited about what Grey InfoTech does, and what you bring to the table. Be genuine. We read every message."
                                        value={form.cover_letter}
                                        onChange={set('cover_letter')}
                                        rows={8}
                                        required
                                    />
                                    <span className={`absolute bottom-3 right-4 text-[0.72em] tabular-nums ${
                                        charCount < 50 ? 'text-red-400/60' : dark ? 'text-gray-600' : 'text-gray-400'
                                    }`}>
                                        {charCount} chars{charCount < 50 ? ` (${50 - charCount} more needed)` : ''}
                                    </span>
                                </div>
                            </div>

                            {/* Error */}
                            {(status === 'error' || errorMsg) && (
                                <div className="mb-6 rounded-lg border border-red-400/30 bg-red-400/8 px-4 py-3 text-[0.85em] text-red-400">
                                    {errorMsg || 'Something went wrong. Please try again.'}
                                </div>
                            )}

                            {/* Submit */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={`relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-[700] text-[0.9em] tracking-wide transition-all duration-300 overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed
                                        ${dark
                                            ? 'bg-cyan-400 text-black hover:bg-cyan-300 shadow-lg shadow-cyan-400/20'
                                            : 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg shadow-cyan-600/25'
                                        }`}
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                                    {status === 'loading' ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30" strokeDashoffset="10" />
                                            </svg>
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Introduction</span>
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className={`text-[0.85em] font-[500] transition-colors ${dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    ← Go back
                                </button>
                            </div>
                        </form>
                    </div>
                </FxReveal>
            </div>
        </div>
    );
}
