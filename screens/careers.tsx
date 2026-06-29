'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import '@/app/globals.css';
import { useIsDayTime } from '../components/useIsDayTime';
import { FxBackground, FxChip, FxSectionHeading, FxButton, FxReveal, FxGlitchText, FxTerminal } from '@/components/futuristic/fx';

// ─── Data ────────────────────────────────────────────────────────────────────

const perks = [
    { num: '01', title: 'Remote-first', body: 'Work from anywhere in the world. We care about great output, not where you open your laptop.', icon: '🌍' },
    { num: '02', title: 'Learning budget', body: 'Yearly budget for courses, books, and conferences. Growth is part of the job.', icon: '📚' },
    { num: '03', title: 'Ownership culture', body: 'Propose, build, ship. Every team member has real influence on what we make.', icon: '🚀' },
    { num: '04', title: 'Real products', body: 'Ship features that real people use every day — no throwaway projects.', icon: '⚡' },
];

const techStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'];

const ROLES = [
    'Frontend Developer', 'Backend Developer', 'Full-Stack Developer',
    'Mobile Developer (React Native)', 'UI/UX Designer', 'Product Manager',
    'DevOps / Cloud Engineer', 'Data Analyst', 'Digital Marketing Specialist',
    'Content Writer / Strategist', 'Project Manager', 'Business Development', 'Other',
];

const EXP_LEVELS = ['< 1 year', '1 – 2 years', '3 – 5 years', '5 – 8 years', '8+ years'];
const AVAILABILITY = [
    'Immediately', 'Within 2 weeks', 'Within 1 month', '1 – 3 months',
    'Not actively looking — open to the right role',
];
const WORK_TYPES = ['Full-time', 'Part-time', 'Contract / Freelance', 'Internship'];

type ModalType = 'apply' | 'introduce' | null;
type Status = 'idle' | 'loading' | 'success' | 'error';

// ─── Modal Shell ─────────────────────────────────────────────────────────────

interface CareerModalProps {
    type: ModalType;
    onClose: () => void;
    isDayTime: boolean;
}

function CareerModal({ type, onClose, isDayTime }: CareerModalProps) {
    const dark = !isDayTime;

    // Close on backdrop click
    const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    // Close on Escape
    React.useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    if (!type) return null;

    return (
        <div
            className={`fixed inset-0 z-50 overflow-y-auto ${dark ? 'bg-black/85' : 'bg-white/85'} backdrop-blur-md`}
            onClick={handleBackdrop}
        >
            {/* Close button */}
            <button
                className={`fixed top-5 right-5 z-[60] w-10 h-10 rounded-full flex items-center justify-center transition-colors
                    ${dark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/15 text-gray-900'}`}
                onClick={onClose}
                aria-label="Close"
                type="button"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                </svg>
            </button>

            {/* Scrollable inner */}
            <div className="min-h-full flex items-start justify-center py-10 px-4">
                <div className="w-full max-w-3xl">
                    {type === 'apply' ? (
                        <ApplyForm isDayTime={isDayTime} onClose={onClose} />
                    ) : (
                        <IntroduceForm isDayTime={isDayTime} onClose={onClose} />
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Apply Form (Send CV) ─────────────────────────────────────────────────────

function ApplyForm({ isDayTime, onClose }: { isDayTime: boolean; onClose: () => void }) {
    const dark = !isDayTime;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [dragOver, setDragOver] = useState(false);

    const [form, setForm] = useState({
        full_name: '', email: '', phone: '', country: '',
        role_interest: '', experience_years: '',
        linkedin_url: '', portfolio_url: '', cover_letter: '',
    });

    const set = (k: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setForm(prev => ({ ...prev, [k]: e.target.value }));

    const handleFile = (file: File | null) => {
        if (!file) return;
        const allowed = ['application/pdf', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowed.includes(file.type)) { setErrorMsg('Only PDF, DOC, or DOCX files are accepted.'); return; }
        if (file.size > 5 * 1024 * 1024) { setErrorMsg('CV must be under 5 MB.'); return; }
        setErrorMsg('');
        setCvFile(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); setDragOver(false);
        handleFile(e.dataTransfer.files[0] || null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.full_name || !form.email) { setErrorMsg('Full name and email are required.'); return; }
        setStatus('loading'); setErrorMsg('');
        try {
            const fd = new FormData();
            fd.append('form_type', 'cv_submission');
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            if (cvFile) fd.append('cv', cvFile);
            const res = await fetch('/api/career-apply', { method: 'POST', body: fd });
            const data = await res.json();
            if (!res.ok || !data.ok) { setErrorMsg(data.error || 'Something went wrong.'); setStatus('error'); return; }
            setStatus('success');
        } catch { setErrorMsg('Network error. Please try again.'); setStatus('error'); }
    };

    const inputCls = `w-full bg-transparent border rounded-lg px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 ${
        dark ? 'border-white/10 text-white placeholder-gray-500 focus:border-teal-400/60 focus:ring-teal-400/20'
             : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-teal-500/60 focus:ring-teal-500/10'
    }`;
    const labelCls = `block text-[0.75em] font-[600] uppercase tracking-widest mb-2 ${dark ? 'text-teal-400/70' : 'text-teal-600/70'}`;
    const sectionBadge = `w-7 h-7 rounded-full flex items-center justify-center text-[0.7em] font-[900] ${dark ? 'bg-teal-400/15 text-teal-400' : 'bg-teal-50 text-teal-600'}`;
    const sectionLabel = `text-[0.8em] font-[700] uppercase tracking-widest ${dark ? 'text-gray-400' : 'text-gray-500'}`;
    const divider = `flex items-center gap-3 mb-6 pb-4 border-b ${dark ? 'border-white/8' : 'border-gray-100'}`;

    if (status === 'success') {
        return (
            <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-8 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-teal-400/40 animate-ping" style={{ animationDuration: '1.5s' }} />
                    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-[2em] ${dark ? 'bg-teal-400/10' : 'bg-teal-50'}`}>✅</div>
                </div>
                <FxChip day={isDayTime} className="mb-4">Application Received</FxChip>
                <FxGlitchText tag="h2" className="text-[2em] font-[800] tracking-tight mb-4">CV Submitted</FxGlitchText>
                <p className={`text-[0.9em] leading-relaxed mb-8 max-w-md mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    We've received your CV and will reach out when the right role opens up. Check your inbox for a confirmation.
                </p>
                <button
                    onClick={onClose}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-[600] text-[0.9em] border transition-colors
                        ${dark ? 'border-teal-400/30 text-teal-400 hover:bg-teal-400/10' : 'border-teal-500/30 text-teal-600 hover:bg-teal-50'}`}
                >
                    ← Back to Careers
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="text-center mb-10">
                <FxChip day={isDayTime} className="mb-5">No Open Roles Right Now</FxChip>
                <FxGlitchText tag="h2" className="text-[2.2em] md:text-[2.8em] font-[900] tracking-tight leading-[1.1] mb-4">
                    Send Us Your <span className="gx-gradient-text">CV</span>
                </FxGlitchText>
                <p className={`text-[0.92em] max-w-xl mx-auto leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    We're always on the lookout for exceptional talent. Drop your CV and we'll reach out when the right opportunity arises.
                </p>
            </div>

            {/* Card */}
            <div className={`relative rounded-2xl border p-8 md:p-10 ${
                dark ? 'bg-white/[0.02] border-white/8 backdrop-blur-sm' : 'bg-white border-gray-100 shadow-xl shadow-gray-100/80'
            }`}>
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-teal-400/30 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-teal-400/30 rounded-br-2xl pointer-events-none" />

                <form onSubmit={handleSubmit} noValidate>
                    {/* 01 Personal */}
                    <div className="mb-8">
                        <div className={divider}><span className={sectionBadge}>01</span><span className={sectionLabel}>Personal Information</span></div>
                        <div className="grid md:grid-cols-2 gap-5">
                            <div><label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
                                <input type="text" className={inputCls} placeholder="Your full name" value={form.full_name} onChange={set('full_name')} required /></div>
                            <div><label className={labelCls}>Email Address <span className="text-red-400">*</span></label>
                                <input type="email" className={inputCls} placeholder="you@example.com" value={form.email} onChange={set('email')} required /></div>
                            <div><label className={labelCls}>Phone Number</label>
                                <input type="tel" className={inputCls} placeholder="+234 800 000 0000" value={form.phone} onChange={set('phone')} /></div>
                            <div><label className={labelCls}>Country</label>
                                <input type="text" className={inputCls} placeholder="Nigeria" value={form.country} onChange={set('country')} /></div>
                        </div>
                    </div>

                    {/* 02 Professional */}
                    <div className="mb-8">
                        <div className={divider}><span className={sectionBadge}>02</span><span className={sectionLabel}>Professional Profile</span></div>
                        <div className="grid md:grid-cols-2 gap-5">
                            <div><label className={labelCls}>Role of Interest</label>
                                <select className={inputCls} value={form.role_interest} onChange={set('role_interest')}>
                                    <option value="">Select a role…</option>
                                    {ROLES.map(r => <option key={r} value={r} className={dark ? 'bg-[#0d1117]' : 'bg-white'}>{r}</option>)}
                                </select></div>
                            <div><label className={labelCls}>Years of Experience</label>
                                <select className={inputCls} value={form.experience_years} onChange={set('experience_years')}>
                                    <option value="">Select experience…</option>
                                    {EXP_LEVELS.map(e => <option key={e} value={e} className={dark ? 'bg-[#0d1117]' : 'bg-white'}>{e}</option>)}
                                </select></div>
                            <div><label className={labelCls}>LinkedIn URL</label>
                                <input type="url" className={inputCls} placeholder="https://linkedin.com/in/yourname" value={form.linkedin_url} onChange={set('linkedin_url')} /></div>
                            <div><label className={labelCls}>Portfolio / GitHub URL</label>
                                <input type="url" className={inputCls} placeholder="https://yourportfolio.com" value={form.portfolio_url} onChange={set('portfolio_url')} /></div>
                        </div>
                    </div>

                    {/* 03 CV Upload */}
                    <div className="mb-8">
                        <div className={divider}><span className={sectionBadge}>03</span><span className={sectionLabel}>Upload CV / Resume</span></div>
                        <div
                            className={`relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
                                dragOver ? 'border-teal-400/60 bg-teal-400/5'
                                : cvFile ? (dark ? 'border-teal-400/40 bg-teal-400/5' : 'border-teal-500/40 bg-teal-50')
                                : (dark ? 'border-white/10 hover:border-teal-400/30' : 'border-gray-200 hover:border-teal-400/40 hover:bg-teal-50/40')
                            }`}
                            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                                onChange={e => handleFile(e.target.files?.[0] || null)} />
                            {cvFile ? (
                                <><div className="text-[2em] mb-3">📄</div>
                                <p className={`font-[600] text-[0.9em] mb-1 ${dark ? 'text-teal-400' : 'text-teal-600'}`}>{cvFile.name}</p>
                                <p className={`text-[0.78em] ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{(cvFile.size / 1024).toFixed(0)} KB · Click to replace</p></>
                            ) : (
                                <><div className="text-[2.4em] mb-3">📁</div>
                                <p className={`font-[600] text-[0.9em] mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Drag & drop your CV here, or <span className="text-teal-400">browse</span>
                                </p>
                                <p className={`text-[0.78em] ${dark ? 'text-gray-500' : 'text-gray-400'}`}>PDF, DOC, DOCX — max 5 MB</p></>
                            )}
                        </div>
                    </div>

                    {/* 04 Cover Letter */}
                    <div className="mb-8">
                        <div className={divider}><span className={sectionBadge}>04</span>
                            <span className={sectionLabel}>Cover Letter <span className={`normal-case font-[400] ${dark ? 'text-gray-600' : 'text-gray-400'}`}>(optional)</span></span></div>
                        <textarea className={`${inputCls} min-h-[160px] resize-y`}
                            placeholder="Tell us why you'd be a great fit for Grey InfoTech."
                            value={form.cover_letter} onChange={set('cover_letter')} rows={6} />
                    </div>

                    {/* Error */}
                    {(status === 'error' || errorMsg) && (
                        <div className="mb-6 rounded-lg border border-red-400/30 bg-red-400/8 px-4 py-3 text-[0.85em] text-red-400">
                            {errorMsg || 'Something went wrong. Please try again.'}
                        </div>
                    )}

                    {/* Submit */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <button type="submit" disabled={status === 'loading'}
                            className={`relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-[700] text-[0.9em] tracking-wide transition-all duration-300 overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed
                                ${dark ? 'bg-teal-400 text-black hover:bg-teal-300 shadow-lg shadow-teal-400/20'
                                       : 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/25'}`}>
                            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                            {status === 'loading' ? (
                                <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30" strokeDashoffset="10" /></svg>Submitting…</>
                            ) : (
                                <><span>Submit Application</span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></>
                            )}
                        </button>
                        <button type="button" onClick={onClose}
                            className={`text-[0.85em] font-[500] transition-colors ${dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                            ← Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Introduce Form ───────────────────────────────────────────────────────────

function IntroduceForm({ isDayTime, onClose }: { isDayTime: boolean; onClose: () => void }) {
    const dark = !isDayTime;

    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [charCount, setCharCount] = useState(0);

    const [form, setForm] = useState({
        full_name: '', email: '', phone: '', country: '',
        role_interest: '', experience_years: '',
        linkedin_url: '', portfolio_url: '',
        availability: '', work_type: '', cover_letter: '',
    });

    const set = (k: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const val = e.target.value;
            setForm(prev => ({ ...prev, [k]: val }));
            if (k === 'cover_letter') setCharCount(val.length);
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.full_name || !form.email) { setErrorMsg('Full name and email are required.'); return; }
        if (!form.cover_letter || form.cover_letter.length < 50) { setErrorMsg('Please write at least a brief introduction (50+ characters).'); return; }
        setStatus('loading'); setErrorMsg('');
        try {
            const enriched = `${form.cover_letter}${form.availability ? `\n\nAvailability: ${form.availability}` : ''}${form.work_type ? `\nWork Type: ${form.work_type}` : ''}`;
            const res = await fetch('/api/career-apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ form_type: 'self_introduction', ...form, cover_letter: enriched }),
            });
            const data = await res.json();
            if (!res.ok || !data.ok) { setErrorMsg(data.error || 'Something went wrong.'); setStatus('error'); return; }
            setStatus('success');
        } catch { setErrorMsg('Network error. Please try again.'); setStatus('error'); }
    };

    const inputCls = `w-full bg-transparent border rounded-lg px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 ${
        dark ? 'border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/60 focus:ring-cyan-400/20'
             : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-500/60 focus:ring-cyan-500/10'
    }`;
    const labelCls = `block text-[0.75em] font-[600] uppercase tracking-widest mb-2 ${dark ? 'text-cyan-400/70' : 'text-cyan-600/70'}`;
    const sectionBadge = `w-7 h-7 rounded-full flex items-center justify-center text-[0.7em] font-[900] ${dark ? 'bg-cyan-400/15 text-cyan-400' : 'bg-cyan-50 text-cyan-600'}`;
    const sectionLabel = `text-[0.8em] font-[700] uppercase tracking-widest ${dark ? 'text-gray-400' : 'text-gray-500'}`;
    const divider = `flex items-center gap-3 mb-6 pb-4 border-b ${dark ? 'border-white/8' : 'border-gray-100'}`;

    if (status === 'success') {
        return (
            <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-8 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-ping" style={{ animationDuration: '1.5s' }} />
                    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-[2em] ${dark ? 'bg-cyan-400/10' : 'bg-cyan-50'}`}>🚀</div>
                </div>
                <FxChip day={isDayTime} className="mb-4">Introduction Received</FxChip>
                <FxGlitchText tag="h2" className="text-[2em] font-[800] tracking-tight mb-4">Nice to meet you!</FxGlitchText>
                <p className={`text-[0.9em] leading-relaxed mb-8 max-w-md mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    We've stored your introduction and will reach out when a matching role opens up.
                </p>
                <button onClick={onClose}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-[600] text-[0.9em] border transition-colors
                        ${dark ? 'border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10' : 'border-cyan-500/30 text-cyan-600 hover:bg-cyan-50'}`}>
                    ← Back to Careers
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="grid lg:grid-cols-5 gap-10 mb-12 items-start">
                <div className="lg:col-span-3">
                    <FxChip day={isDayTime} className="mb-5">Don't see the right role?</FxChip>
                    <FxGlitchText tag="h2" className="text-[2.2em] md:text-[2.8em] font-[900] tracking-tight leading-[1.1] mb-4">
                        Introduce <span className="gx-gradient-text">Yourself</span>
                    </FxGlitchText>
                    <p className={`text-[0.92em] leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We occasionally open positions that aren't publicly listed. Tell us who you are and what you're looking for.
                    </p>
                </div>
                <div className="lg:col-span-2">
                    <FxTerminal day={isDayTime} lines={[
                        '# grey infotech — talent radar',
                        'npm run meet-the-team', '',
                        '> Scanning incoming profile...',
                        '> Indexing skills...',
                        '> Matching opportunities...', '',
                        "✓ Profile stored. We'll be in touch.",
                    ]} />
                </div>
            </div>

            {/* Card */}
            <div className={`relative rounded-2xl border p-8 md:p-10 ${
                dark ? 'bg-white/[0.02] border-white/8 backdrop-blur-sm' : 'bg-white border-gray-100 shadow-xl shadow-gray-100/80'
            }`}>
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400/30 rounded-br-2xl pointer-events-none" />

                <form onSubmit={handleSubmit} noValidate>
                    {/* 01 Who are you */}
                    <div className="mb-8">
                        <div className={divider}><span className={sectionBadge}>01</span><span className={sectionLabel}>Who Are You?</span></div>
                        <div className="grid md:grid-cols-2 gap-5">
                            <div><label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
                                <input type="text" className={inputCls} placeholder="Your full name" value={form.full_name} onChange={set('full_name')} required /></div>
                            <div><label className={labelCls}>Email Address <span className="text-red-400">*</span></label>
                                <input type="email" className={inputCls} placeholder="you@example.com" value={form.email} onChange={set('email')} required /></div>
                            <div><label className={labelCls}>Phone Number</label>
                                <input type="tel" className={inputCls} placeholder="+234 800 000 0000" value={form.phone} onChange={set('phone')} /></div>
                            <div><label className={labelCls}>Country</label>
                                <input type="text" className={inputCls} placeholder="Nigeria" value={form.country} onChange={set('country')} /></div>
                        </div>
                    </div>

                    {/* 02 Craft */}
                    <div className="mb-8">
                        <div className={divider}><span className={sectionBadge}>02</span><span className={sectionLabel}>Your Craft</span></div>
                        <div className="grid md:grid-cols-2 gap-5">
                            <div><label className={labelCls}>Role / Discipline</label>
                                <select className={inputCls} value={form.role_interest} onChange={set('role_interest')}>
                                    <option value="">What do you do best?</option>
                                    {ROLES.map(r => <option key={r} value={r} className={dark ? 'bg-[#0d1117]' : 'bg-white'}>{r}</option>)}
                                </select></div>
                            <div><label className={labelCls}>Years of Experience</label>
                                <select className={inputCls} value={form.experience_years} onChange={set('experience_years')}>
                                    <option value="">How long have you been at it?</option>
                                    {EXP_LEVELS.map(e => <option key={e} value={e} className={dark ? 'bg-[#0d1117]' : 'bg-white'}>{e}</option>)}
                                </select></div>
                            <div><label className={labelCls}>LinkedIn URL</label>
                                <input type="url" className={inputCls} placeholder="https://linkedin.com/in/yourname" value={form.linkedin_url} onChange={set('linkedin_url')} /></div>
                            <div><label className={labelCls}>Portfolio / GitHub</label>
                                <input type="url" className={inputCls} placeholder="https://yourportfolio.com" value={form.portfolio_url} onChange={set('portfolio_url')} /></div>
                        </div>
                    </div>

                    {/* 03 Availability */}
                    <div className="mb-8">
                        <div className={divider}><span className={sectionBadge}>03</span><span className={sectionLabel}>Availability & Preference</span></div>
                        <div className="grid md:grid-cols-2 gap-5">
                            <div><label className={labelCls}>When can you start?</label>
                                <select className={inputCls} value={form.availability} onChange={set('availability')}>
                                    <option value="">Select availability…</option>
                                    {AVAILABILITY.map(a => <option key={a} value={a} className={dark ? 'bg-[#0d1117]' : 'bg-white'}>{a}</option>)}
                                </select></div>
                            <div><label className={labelCls}>Work Type Preference</label>
                                <select className={inputCls} value={form.work_type} onChange={set('work_type')}>
                                    <option value="">Select work type…</option>
                                    {WORK_TYPES.map(w => <option key={w} value={w} className={dark ? 'bg-[#0d1117]' : 'bg-white'}>{w}</option>)}
                                </select></div>
                        </div>
                    </div>

                    {/* 04 Introduction */}
                    <div className="mb-8">
                        <div className={divider}><span className={sectionBadge}>04</span>
                            <span className={sectionLabel}>Your Introduction <span className="text-red-400 normal-case font-[500] tracking-normal">*</span></span></div>
                        <div className="relative">
                            <textarea className={`${inputCls} min-h-[200px] resize-y`}
                                placeholder="Tell us about yourself — what you've built, what drives you, why you're excited about Grey InfoTech, and what you bring to the table."
                                value={form.cover_letter} onChange={set('cover_letter')} rows={8} required />
                            <span className={`absolute bottom-3 right-4 text-[0.72em] tabular-nums ${
                                charCount < 50 ? 'text-red-400/60' : dark ? 'text-gray-600' : 'text-gray-400'
                            }`}>{charCount} chars{charCount < 50 ? ` (${50 - charCount} more needed)` : ''}</span>
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
                        <button type="submit" disabled={status === 'loading'}
                            className={`relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-[700] text-[0.9em] tracking-wide transition-all duration-300 overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed
                                ${dark ? 'bg-cyan-400 text-black hover:bg-cyan-300 shadow-lg shadow-cyan-400/20'
                                       : 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg shadow-cyan-600/25'}`}>
                            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                            {status === 'loading' ? (
                                <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30" strokeDashoffset="10" /></svg>Sending…</>
                            ) : (
                                <><span>Send Introduction</span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></>
                            )}
                        </button>
                        <button type="button" onClick={onClose}
                            className={`text-[0.85em] font-[500] transition-colors ${dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                            ← Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const Careers: React.FC = () => {
    const isDayTime = useIsDayTime();
    const dark = !isDayTime;
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const openModal = useCallback((type: ModalType) => {
        setActiveModal(type);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
        document.body.style.overflow = '';
    }, []);

    return (
        <div className={`${dark ? 'bg-[#050810] text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-500`}>

            {/* ── Modal overlay ── */}
            {activeModal && (
                <CareerModal type={activeModal} onClose={closeModal} isDayTime={isDayTime} />
            )}

            {/* ── Hero ── */}
            <section className="relative overflow-hidden min-h-[76vh] flex flex-col justify-end">
                <Image
                    src="/assets/header/careers.jpg"
                    alt="Careers at Grey InfoTech"
                    fill sizes="100vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    priority className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/90" />
                <FxBackground day={false} grid aurora className="opacity-55" />
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-hero-scan" />
                <div className="gx-noise-overlay" />
                <div className="gx-orbit pointer-events-none absolute" style={{ width: '70vmax', height: '70vmax', top: '-25vmax', right: '-25vmax', opacity: .18 }} />
                <div className="gx-orbit gx-orbit-reverse pointer-events-none absolute" style={{ width: '44vmax', height: '44vmax', top: '-8vmax', right: '-4vmax', opacity: .11 }} />
                <div className="gx-page-hero-content relative z-10">
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal>
                            <FxChip day={false} className="mb-5">We're Hiring</FxChip>
                            <div className="border-b border-white/20 pb-7 mb-7 max-w-4xl">
                                <h1 className="gx-hero-title text-white gx-glitch">
                                    Jobs at{' '}<span className="gx-gradient-text">Grey InfoTech</span>
                                </h1>
                            </div>
                            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
                                Build the future of digital products with a team of passionate engineers, designers, and strategists.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {techStack.map(t => <span key={t} className="gx-data-pill text-[0.65em]">{t}</span>)}
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ── Intro + Terminal ── */}
            <section className="relative z-10 py-20 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                <FxBackground day={isDayTime} grid={false} aurora={true} className="opacity-20" />
                <div className="max-w-[90rem] mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FxReveal>
                            <FxChip day={isDayTime} className="mb-6">Open Positions</FxChip>
                            <FxGlitchText tag="h2" className="text-[2.5em] md:text-[3em] font-[800] leading-[1.1] tracking-tight mb-6">
                                Build the future<br /><span className="gx-gradient-text">with us</span>
                            </FxGlitchText>
                            <p className={`text-[0.92em] leading-[1.8] mb-4 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                                If you're looking for a role in a progressive company with a varied, highly respected clientele, you've come to the right place.
                            </p>
                            <p className={`text-[0.92em] leading-[1.8] ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                                We look forward to receiving your application!
                            </p>
                        </FxReveal>
                        <FxReveal delay={0.15}>
                            <FxTerminal day={isDayTime} lines={[
                                '# Grey InfoTech — open to talent',
                                'npm run join-the-team', '',
                                '> Scanning for creative engineers...',
                                '> Scanning for visionary designers...',
                                '> Scanning for bold strategists...', '',
                                '✓ Positions available — apply now',
                            ]} />
                        </FxReveal>
                    </div>
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
                            <div className="relative w-20 h-20 mx-auto mb-8">
                                <div className="absolute inset-0 rounded-full border-2 border-teal-400/30 animate-ping" style={{ animationDuration: '2s' }} />
                                <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-[1.6em] ${dark ? 'bg-teal-400/10' : 'bg-teal-50'}`}>📡</div>
                            </div>
                            <div className="mb-4"><FxChip day={isDayTime}>Scanning for positions</FxChip></div>
                            <h3 className={`text-[1.4em] font-[700] mb-3 ${dark ? 'text-gray-200' : 'text-gray-700'}`}>
                                No open positions right now
                            </h3>
                            <p className={`text-[0.88em] max-w-md mx-auto mb-8 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
                                We're always on the lookout for talented people. Send us your CV and we'll reach out when the right role opens up.
                            </p>
                            {/* ← button, not link */}
                            <button
                                onClick={() => openModal('apply')}
                                className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl font-[700] text-[0.9em] tracking-wide transition-all duration-300
                                    ${dark ? 'bg-teal-400 text-black hover:bg-teal-300 shadow-lg shadow-teal-400/20'
                                           : 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20'}`}
                            >
                                Get in Touch
                            </button>
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
                            align="center" className="mb-16 mx-auto"
                        />
                    </FxReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {perks.map(({ num, title, body, icon }, i) => (
                            <FxReveal key={num} delay={i * 0.1}>
                                <div className="gx-hologram-card p-7 h-full flex flex-col group">
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
                        Don't see the right role?
                    </FxGlitchText>
                    <p className={`text-[0.92em] max-w-lg mx-auto mb-10 leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We occasionally open positions that aren't publicly listed. Reach out and introduce yourself.
                    </p>
                    {/* ← button, not link */}
                    <button
                        onClick={() => openModal('introduce')}
                        className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl font-[700] text-[0.9em] tracking-wide transition-all duration-300
                            ${dark ? 'bg-teal-400 text-black hover:bg-teal-300 shadow-lg shadow-teal-400/20'
                                   : 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20'}`}
                    >
                        Introduce Yourself
                    </button>
                </FxReveal>
            </section>
        </div>
    );
};

export default Careers;
