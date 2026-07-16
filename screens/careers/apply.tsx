'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';
import { useIsDayTime } from '../../components/useIsDayTime';
import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxGlitchText,
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

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function CareerApplyScreen() {
    const isDayTime = useIsDayTime();
    const dark = !isDayTime;
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [dragOver, setDragOver] = useState(false);

    const [form, setForm] = useState({
        full_name: '',
        email: '',
        phone: '',
        country: '',
        role_interest: '',
        experience_years: '',
        linkedin_url: '',
        portfolio_url: '',
        cover_letter: '',
    });

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(prev => ({ ...prev, [k]: e.target.value }));

    const handleFile = (file: File | null) => {
        if (!file) return;
        const allowed = ['application/pdf', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowed.includes(file.type)) {
            setErrorMsg('Only PDF, DOC, or DOCX files are accepted for CV.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setErrorMsg('CV must be under 5 MB.');
            return;
        }
        setErrorMsg('');
        setCvFile(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0] || null;
        handleFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.full_name || !form.email) {
            setErrorMsg('Full name and email are required.');
            return;
        }
        setStatus('loading');
        setErrorMsg('');

        try {
            const fd = new FormData();
            fd.append('form_type', 'cv_submission');
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            if (cvFile) fd.append('cv', cvFile);

            const res = await fetch('/api/career-apply', { method: 'POST', body: fd });
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
            ? 'border-white/10 text-white placeholder-gray-500 focus:border-teal-400/60 focus:ring-teal-400/20'
            : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-teal-500/60 focus:ring-teal-500/10'
    }`;

    const labelCls = `block text-[0.75em] font-[600] uppercase tracking-widest mb-2 ${dark ? 'text-teal-400/70' : 'text-teal-600/70'}`;

    if (status === 'success') {
        return (
            <div className={`min-h-screen flex items-center justify-center px-4 ${dark ? 'bg-[#050810] text-white' : 'bg-white text-gray-900'}`}>
                <FxBackground day={isDayTime} grid aurora className="opacity-30" />
                <FxReveal className="relative z-10 text-center max-w-lg mx-auto">
                    <div className="w-20 h-20 mx-auto mb-8 relative">
                        <div className="absolute inset-0 rounded-full border-2 border-teal-400/40 animate-ping" style={{ animationDuration: '1.5s' }} />
                        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-[2em] ${dark ? 'bg-teal-400/10' : 'bg-teal-50'}`}>
                            ✅
                        </div>
                    </div>
                    <FxChip day={isDayTime} className="mb-4">Application Received</FxChip>
                    <FxGlitchText tag="h2" className="text-[2em] font-[800] tracking-tight mb-4">
                        CV Submitted
                    </FxGlitchText>
                    <p className={`text-[0.9em] leading-relaxed mb-8 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We've received your CV and will keep your profile on file.
                        We'll reach out as soon as a role that matches your profile opens up.
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

            <div className="relative z-10 max-w-3xl mx-auto px-4 py-20">

                {/* Header */}
                <FxReveal className="text-center mb-14">
                    <FxChip day={isDayTime} className="mb-5">No Open Roles Right Now</FxChip>
                    <FxGlitchText tag="h1" className="text-[2.4em] md:text-[3em] font-[900] tracking-tight leading-[1.1] mb-4">
                        Send Us Your <span className="gx-gradient-text">CV</span>
                    </FxGlitchText>
                    <p className={`text-[0.92em] max-w-xl mx-auto leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We're always on the lookout for exceptional talent. Drop your CV here
                        and we'll reach out when the right opportunity arises.
                    </p>
                </FxReveal>

                {/* Form card */}
                <FxReveal delay={0.1}>
                    <div className={`relative rounded-2xl border p-8 md:p-10 ${
                        dark
                            ? 'bg-white/[0.02] border-white/8 backdrop-blur-sm'
                            : 'bg-white border-gray-100 shadow-xl shadow-gray-100/80'
                    }`}>
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-teal-400/30 rounded-tl-2xl pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-teal-400/30 rounded-br-2xl pointer-events-none" />

                        <form onSubmit={handleSubmit} noValidate>
                            {/* Section: Personal Info */}
                            <div className="mb-8">
                                <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${dark ? 'border-white/8' : 'border-gray-100'}`}>
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.7em] font-[900] ${dark ? 'bg-teal-400/15 text-teal-400' : 'bg-teal-50 text-teal-600'}`}>01</span>
                                    <span className={`text-[0.8em] font-[700] uppercase tracking-widest ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Personal Information</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
                                        <input
                                            type="text"
                                            className={inputCls}
                                            placeholder="Sobiribo Graham"
                                            value={form.full_name}
                                            onChange={set('full_name')}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Email Address <span className="text-red-400">*</span></label>
                                        <input
                                            type="email"
                                            className={inputCls}
                                            placeholder="you@example.com"
                                            value={form.email}
                                            onChange={set('email')}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Phone Number</label>
                                        <input
                                            type="tel"
                                            className={inputCls}
                                            placeholder="+234 800 000 0000"
                                            value={form.phone}
                                            onChange={set('phone')}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Country</label>
                                        <input
                                            type="text"
                                            className={inputCls}
                                            placeholder="Nigeria"
                                            value={form.country}
                                            onChange={set('country')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Professional */}
                            <div className="mb-8">
                                <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${dark ? 'border-white/8' : 'border-gray-100'}`}>
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.7em] font-[900] ${dark ? 'bg-teal-400/15 text-teal-400' : 'bg-teal-50 text-teal-600'}`}>02</span>
                                    <span className={`text-[0.8em] font-[700] uppercase tracking-widest ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Professional Profile</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelCls}>Role of Interest</label>
                                        <select
                                            className={inputCls}
                                            value={form.role_interest}
                                            onChange={set('role_interest')}
                                        >
                                            <option value="">Select a role…</option>
                                            {ROLES.map(r => (
                                                <option key={r} value={r} className={dark ? 'bg-[#0d1117]' : 'bg-white'}>{r}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelCls}>Years of Experience</label>
                                        <select
                                            className={inputCls}
                                            value={form.experience_years}
                                            onChange={set('experience_years')}
                                        >
                                            <option value="">Select experience…</option>
                                            {EXP_LEVELS.map(e => (
                                                <option key={e} value={e} className={dark ? 'bg-[#0d1117]' : 'bg-white'}>{e}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelCls}>LinkedIn URL</label>
                                        <input
                                            type="url"
                                            className={inputCls}
                                            placeholder="https://linkedin.com/in/yourname"
                                            value={form.linkedin_url}
                                            onChange={set('linkedin_url')}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Portfolio / GitHub URL</label>
                                        <input
                                            type="url"
                                            className={inputCls}
                                            placeholder="https://yourportfolio.com"
                                            value={form.portfolio_url}
                                            onChange={set('portfolio_url')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section: CV Upload */}
                            <div className="mb-8">
                                <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${dark ? 'border-white/8' : 'border-gray-100'}`}>
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.7em] font-[900] ${dark ? 'bg-teal-400/15 text-teal-400' : 'bg-teal-50 text-teal-600'}`}>03</span>
                                    <span className={`text-[0.8em] font-[700] uppercase tracking-widest ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Upload CV / Resume</span>
                                </div>

                                <div
                                    className={`relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
                                        dragOver
                                            ? 'border-teal-400/60 bg-teal-400/5'
                                            : cvFile
                                                ? dark ? 'border-teal-400/40 bg-teal-400/5' : 'border-teal-500/40 bg-teal-50'
                                                : dark ? 'border-white/10 hover:border-teal-400/30 hover:bg-teal-400/2' : 'border-gray-200 hover:border-teal-400/40 hover:bg-teal-50/40'
                                    }`}
                                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        onChange={e => handleFile(e.target.files?.[0] || null)}
                                    />
                                    {cvFile ? (
                                        <>
                                            <div className="text-[2em] mb-3">📄</div>
                                            <p className={`font-[600] text-[0.9em] mb-1 ${dark ? 'text-teal-400' : 'text-teal-600'}`}>{cvFile.name}</p>
                                            <p className={`text-[0.78em] ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{(cvFile.size / 1024).toFixed(0)} KB · Click to replace</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-[2.4em] mb-3">📁</div>
                                            <p className={`font-[600] text-[0.9em] mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Drag & drop your CV here, or <span className="text-teal-400">browse</span>
                                            </p>
                                            <p className={`text-[0.78em] ${dark ? 'text-gray-500' : 'text-gray-400'}`}>PDF, DOC, DOCX  - max 5 MB</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Section: Cover Letter */}
                            <div className="mb-8">
                                <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${dark ? 'border-white/8' : 'border-gray-100'}`}>
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.7em] font-[900] ${dark ? 'bg-teal-400/15 text-teal-400' : 'bg-teal-50 text-teal-600'}`}>04</span>
                                    <span className={`text-[0.8em] font-[700] uppercase tracking-widest ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Cover Letter <span className={`normal-case font-[400] ${dark ? 'text-gray-600' : 'text-gray-400'}`}>(optional)</span></span>
                                </div>
                                <textarea
                                    className={`${inputCls} min-h-[160px] resize-y`}
                                    placeholder="Tell us why you'd be a great fit for Grey InfoTech. What excites you about what we build?"
                                    value={form.cover_letter}
                                    onChange={set('cover_letter')}
                                    rows={6}
                                />
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
                                            ? 'bg-teal-400 text-black hover:bg-teal-300 shadow-lg shadow-teal-400/20'
                                            : 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/25'
                                        }`}
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                                    {status === 'loading' ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30" strokeDashoffset="10" />
                                            </svg>
                                            Submitting…
                                        </>
                                    ) : (
                                        <>
                                            <span>Submit Application</span>
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
