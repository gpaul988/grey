'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import '@/app/globals.css';
import { useIsDayTime } from '../components/useIsDayTime';
import { FxBackground, FxChip, FxSectionHeading, FxButton, FxReveal, FxGlitchText, FxTerminal } from '@/components/futuristic/fx';

// ─── Types ────────────────────────────────────────────────────────────────────

interface JobOpening {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    experience_level: string;
    salary_range: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    nice_to_have: string[];
    benefits: string[];
    status: string;
    deadline: string | null;
    created_at: string;
}

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

const ALLOWED_DOC_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
];

type ModalType = 'apply' | 'introduce' | 'job-detail' | 'job-apply' | null;
type Status = 'idle' | 'loading' | 'success' | 'error';

const TYPE_COLOR: Record<string, string> = {
    'full-time': '#14b8a6',
    'part-time': '#06b6d4',
    'contract': '#f59e0b',
    'remote': '#22c55e',
};

// ─── Shared file upload component ────────────────────────────────────────────

interface DocUploadProps {
    dark: boolean;
    files: File[];
    onChange: (files: File[]) => void;
    label?: string;
    sectionNum: string;
    accentColor?: string;
}

function DocUpload({ dark, files, onChange, label = 'Supporting Documents', sectionNum, accentColor = 'teal' }: DocUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState('');

    const labelCls = `block text-[0.75em] font-[600] uppercase tracking-widest mb-2 ${dark ? `text-${accentColor}-400/70` : `text-${accentColor}-600/70`}`;
    const sectionBadge = `w-7 h-7 rounded-full flex items-center justify-center text-[0.7em] font-[900] ${dark ? `bg-${accentColor}-400/15 text-${accentColor}-400` : `bg-${accentColor}-50 text-${accentColor}-600`}`;
    const sectionLabel = `text-[0.8em] font-[700] uppercase tracking-widest ${dark ? 'text-gray-400' : 'text-gray-500'}`;
    const divider = `flex items-center gap-3 mb-6 pb-4 border-b ${dark ? 'border-white/8' : 'border-gray-100'}`;

    const addFiles = (incoming: FileList | null) => {
        if (!incoming) return;
        setError('');
        const arr = Array.from(incoming);
        const remaining = 5 - files.length;
        if (arr.length > remaining) {
            setError(`You can upload at most 5 documents total.`);
        }
        const valid: File[] = [];
        for (const f of arr.slice(0, remaining)) {
            if (!ALLOWED_DOC_TYPES.includes(f.type)) {
                setError(`"${f.name}" must be PDF, DOC, DOCX, PNG, or JPG.`);
                continue;
            }
            if (f.size > 10 * 1024 * 1024) {
                setError(`"${f.name}" must be under 10 MB.`);
                continue;
            }
            valid.push(f);
        }
        if (valid.length) onChange([...files, ...valid]);
    };

    const remove = (idx: number) => {
        onChange(files.filter((_, i) => i !== idx));
    };

    return (
        <div className="mb-8">
            <div className={divider}>
                <span className={sectionBadge}>{sectionNum}</span>
                <span className={sectionLabel}>
                    {label}
                    <span className={`normal-case font-[400] ml-2 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>(optional, max 5 · 10 MB each)</span>
                </span>
            </div>
            <div
                className={`relative rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-300 ${
                    dragOver
                        ? 'border-teal-400/60 bg-teal-400/5'
                        : files.length
                        ? dark ? 'border-teal-400/30 bg-teal-400/4' : 'border-teal-500/30 bg-teal-50/60'
                        : dark ? 'border-white/10 hover:border-teal-400/30' : 'border-gray-200 hover:border-teal-400/40 hover:bg-teal-50/40'
                }`}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    multiple
                    className="hidden"
                    onChange={e => { addFiles(e.target.files); e.target.value = ''; }}
                />
                <div className="text-[2em] mb-2">📎</div>
                <p className={`font-[600] text-[0.88em] mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Drag & drop files here, or <span className="text-teal-400">browse</span>
                </p>
                <p className={`text-[0.75em] ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
                    PDF, DOC, DOCX, PNG, JPG — {files.length}/5 uploaded
                </p>
            </div>

            {error && <p className="mt-2 text-[0.8em] text-red-400">{error}</p>}

            {files.length > 0 && (
                <ul className="mt-4 space-y-2">
                    {files.map((f, i) => (
                        <li key={i} className={`flex items-center gap-3 rounded-lg px-4 py-2.5 ${dark ? 'bg-white/4' : 'bg-gray-50'}`}>
                            <span className="text-[1.2em]">📄</span>
                            <div className="flex-1 min-w-0">
                                <p className={`text-[0.83em] font-[500] truncate ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{f.name}</p>
                                <p className={`text-[0.72em] ${dark ? 'text-gray-600' : 'text-gray-400'}`}>{(f.size / 1024).toFixed(0)} KB</p>
                            </div>
                            <button
                                type="button"
                                onClick={e => { e.stopPropagation(); remove(i); }}
                                className={`text-[1em] transition-opacity hover:opacity-70 ${dark ? 'text-gray-500' : 'text-gray-400'}`}
                                aria-label="Remove file"
                            >✕</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// ─── Job Detail Modal ─────────────────────────────────────────────────────────

interface JobDetailModalProps {
    job: JobOpening;
    isDayTime: boolean;
    onClose: () => void;
    onApply: (job: JobOpening) => void;
}

function JobDetailModal({ job, isDayTime, onClose, onApply }: JobDetailModalProps) {
    const dark = !isDayTime;

    React.useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const typeColor = TYPE_COLOR[job.type] || '#14b8a6';
    const pill = `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.72em] font-[700] uppercase tracking-wide border`;

    return (
        <div
            className={`fixed inset-0 z-50 overflow-y-auto ${dark ? 'bg-black/88' : 'bg-white/88'} backdrop-blur-md`}
            onClick={handleBackdrop}
        >
            {/* Close */}
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

            <div className="min-h-full flex items-start justify-center py-10 px-4">
                <div className="w-full max-w-3xl">
                    {/* Header card */}
                    <div className={`rounded-2xl border p-8 md:p-10 mb-6 ${
                        dark ? 'bg-white/[0.03] border-white/10 backdrop-blur-sm' : 'bg-white border-gray-100 shadow-xl shadow-gray-100/80'
                    }`}>
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-teal-400/30 rounded-tl-2xl pointer-events-none" />

                        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                            <div>
                                <FxChip day={isDayTime} className="mb-3">{job.department || 'Open Role'}</FxChip>
                                <h1 className={`text-[1.8em] md:text-[2.2em] font-[900] tracking-tight leading-[1.1] ${dark ? 'text-white' : 'text-gray-900'}`}>
                                    {job.title}
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className={pill} style={{ borderColor: `${typeColor}40`, color: typeColor, backgroundColor: `${typeColor}12` }}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                                {job.type}
                            </span>
                            {job.location && (
                                <span className={pill + ` ${dark ? 'border-white/15 text-gray-300' : 'border-gray-200 text-gray-600'}`}>
                                    📍 {job.location}
                                </span>
                            )}
                            {job.experience_level && (
                                <span className={pill + ` ${dark ? 'border-white/15 text-gray-300' : 'border-gray-200 text-gray-600'}`}>
                                    🎓 {job.experience_level}
                                </span>
                            )}
                            {job.salary_range && (
                                <span className={pill + ` ${dark ? 'border-white/15 text-gray-300' : 'border-gray-200 text-gray-600'}`}>
                                    💰 {job.salary_range}
                                </span>
                            )}
                            {job.deadline && (
                                <span className={pill + ` ${dark ? 'border-amber-400/30 text-amber-400' : 'border-amber-500/30 text-amber-600'}`} style={{ backgroundColor: 'rgba(245,158,11,0.08)' }}>
                                    ⏰ Closes {job.deadline}
                                </span>
                            )}
                        </div>

                        {job.description && (
                            <p className={`text-[0.93em] leading-relaxed whitespace-pre-wrap ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                                {job.description}
                            </p>
                        )}
                    </div>

                    {/* Content sections */}
                    <div className={`rounded-2xl border p-8 md:p-10 mb-6 ${
                        dark ? 'bg-white/[0.02] border-white/8' : 'bg-white border-gray-100 shadow-xl shadow-gray-100/80'
                    }`}>
                        {job.responsibilities.length > 0 && (
                            <JobSection dark={dark} title="What you'll do" items={job.responsibilities} icon="→" accentColor="teal" />
                        )}
                        {job.requirements.length > 0 && (
                            <JobSection dark={dark} title="What we're looking for" items={job.requirements} icon="✓" accentColor="teal" />
                        )}
                        {job.nice_to_have.length > 0 && (
                            <JobSection dark={dark} title="Nice to have" items={job.nice_to_have} icon="+" accentColor="cyan" />
                        )}
                        {job.benefits.length > 0 && (
                            <JobSection dark={dark} title="What we offer" items={job.benefits} icon="★" accentColor="teal" />
                        )}
                    </div>

                    {/* Sticky apply bar */}
                    <div className={`sticky bottom-4 rounded-2xl border px-6 py-4 flex items-center justify-between gap-4 ${
                        dark ? 'bg-[#050810]/90 border-white/10 backdrop-blur-md shadow-2xl shadow-black/60'
                              : 'bg-white/95 border-gray-100 backdrop-blur-md shadow-2xl shadow-gray-200/80'
                    }`}>
                        <div>
                            <p className={`text-[0.9em] font-[700] ${dark ? 'text-white' : 'text-gray-900'}`}>{job.title}</p>
                            <p className={`text-[0.78em] ${dark ? 'text-gray-500' : 'text-gray-500'}`}>{job.location} · {job.type}</p>
                        </div>
                        <button
                            onClick={() => onApply(job)}
                            className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl font-[700] text-[0.9em] tracking-wide transition-all duration-300
                                ${dark ? 'bg-teal-400 text-black hover:bg-teal-300 shadow-lg shadow-teal-400/25'
                                       : 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/25'}`}
                        >
                            Apply Now
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function JobSection({ dark, title, items, icon, accentColor = 'teal' }: {
    dark: boolean; title: string; items: string[]; icon: string; accentColor?: string;
}) {
    return (
        <div className="mb-8 last:mb-0">
            <h3 className={`text-[1em] font-[800] uppercase tracking-widest mb-4 ${
                accentColor === 'teal'
                    ? dark ? 'text-teal-400' : 'text-teal-600'
                    : dark ? 'text-cyan-400' : 'text-cyan-600'
            }`}>{title}</h3>
            <ul className="space-y-2.5">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[0.65em] font-[900] ${
                            accentColor === 'teal'
                                ? dark ? 'bg-teal-400/15 text-teal-400' : 'bg-teal-50 text-teal-600'
                                : dark ? 'bg-cyan-400/15 text-cyan-400' : 'bg-cyan-50 text-cyan-600'
                        }`}>{icon}</span>
                        <span className={`text-[0.9em] leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// ─── Job Apply Modal (applies to a specific opening) ─────────────────────────

interface JobApplyModalProps {
    job: JobOpening;
    isDayTime: boolean;
    onClose: () => void;
}

function JobApplyModal({ job, isDayTime, onClose }: JobApplyModalProps) {
    const dark = !isDayTime;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [docFiles, setDocFiles] = useState<File[]>([]);
    const [cvDragOver, setCvDragOver] = useState(false);

    const [form, setForm] = useState({
        full_name: '', email: '', phone: '', country: '',
        experience_years: '', linkedin_url: '', portfolio_url: '', cover_letter: '',
    });

    const set = (k: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setForm(prev => ({ ...prev, [k]: e.target.value }));

    React.useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleCvFile = (file: File | null) => {
        if (!file) return;
        const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowed.includes(file.type)) { setErrorMsg('CV must be PDF, DOC, or DOCX.'); return; }
        if (file.size > 5 * 1024 * 1024) { setErrorMsg('CV must be under 5 MB.'); return; }
        setErrorMsg('');
        setCvFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.full_name || !form.email) { setErrorMsg('Full name and email are required.'); return; }
        setStatus('loading'); setErrorMsg('');
        try {
            const fd = new FormData();
            fd.append('form_type', 'cv_submission');
            fd.append('job_opening_id', String(job.id));
            fd.append('role_interest', job.title);
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            if (cvFile) fd.append('cv', cvFile);
            docFiles.forEach(f => fd.append('documents', f));

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
            <div
                className={`fixed inset-0 z-[60] overflow-y-auto ${dark ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-md flex items-center justify-center`}
            >
                <div className="text-center py-20 px-6">
                    <div className="w-20 h-20 mx-auto mb-8 relative">
                        <div className="absolute inset-0 rounded-full border-2 border-teal-400/40 animate-ping" style={{ animationDuration: '1.5s' }} />
                        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-[2em] ${dark ? 'bg-teal-400/10' : 'bg-teal-50'}`}>✅</div>
                    </div>
                    <FxChip day={isDayTime} className="mb-4">Application Received</FxChip>
                    <FxGlitchText tag="h2" className="text-[2em] font-[800] tracking-tight mb-4">You're In The Pipeline</FxGlitchText>
                    <p className={`text-[0.9em] leading-relaxed mb-8 max-w-md mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We've received your application for <strong>{job.title}</strong>. Check your inbox for a confirmation email. We'll be in touch.
                    </p>
                    <button
                        onClick={onClose}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-[600] text-[0.9em] border transition-colors
                            ${dark ? 'border-teal-400/30 text-teal-400 hover:bg-teal-400/10' : 'border-teal-500/30 text-teal-600 hover:bg-teal-50'}`}
                    >
                        ← Back to Careers
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`fixed inset-0 z-[60] overflow-y-auto ${dark ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-md`}
            onClick={handleBackdrop}
        >
            {/* Close */}
            <button
                className={`fixed top-5 right-5 z-[70] w-10 h-10 rounded-full flex items-center justify-center transition-colors
                    ${dark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/15 text-gray-900'}`}
                onClick={onClose}
                aria-label="Close"
                type="button"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                </svg>
            </button>

            <div className="min-h-full flex items-start justify-center py-10 px-4">
                <div className="w-full max-w-3xl">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <FxChip day={isDayTime} className="mb-4">{job.department || 'Open Role'}</FxChip>
                        <FxGlitchText tag="h2" className="text-[2em] md:text-[2.6em] font-[900] tracking-tight leading-[1.1] mb-3">
                            Apply — <span className="gx-gradient-text">{job.title}</span>
                        </FxGlitchText>
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                            {job.location && <span className={`text-[0.8em] ${dark ? 'text-gray-400' : 'text-gray-500'}`}>📍 {job.location}</span>}
                            {job.type && <span className={`text-[0.8em] ${dark ? 'text-gray-400' : 'text-gray-500'}`}>· {job.type}</span>}
                            {job.salary_range && <span className={`text-[0.8em] ${dark ? 'text-gray-400' : 'text-gray-500'}`}>· {job.salary_range}</span>}
                        </div>
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
                                    <div><label className={labelCls}>Years of Experience</label>
                                        <select className={inputCls} value={form.experience_years} onChange={set('experience_years')}>
                                            <option value="">Select experience…</option>
                                            {EXP_LEVELS.map(e => <option key={e} value={e} className={dark ? 'bg-[#0d1117]' : 'bg-white'}>{e}</option>)}
                                        </select></div>
                                    <div><label className={labelCls}>LinkedIn URL</label>
                                        <input type="url" className={inputCls} placeholder="https://linkedin.com/in/yourname" value={form.linkedin_url} onChange={set('linkedin_url')} /></div>
                                    <div className="md:col-span-2"><label className={labelCls}>Portfolio / GitHub URL</label>
                                        <input type="url" className={inputCls} placeholder="https://yourportfolio.com" value={form.portfolio_url} onChange={set('portfolio_url')} /></div>
                                </div>
                            </div>

                            {/* 03 CV Upload */}
                            <div className="mb-8">
                                <div className={divider}><span className={sectionBadge}>03</span><span className={sectionLabel}>Upload CV / Resume</span></div>
                                <div
                                    className={`relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
                                        cvDragOver ? 'border-teal-400/60 bg-teal-400/5'
                                        : cvFile ? (dark ? 'border-teal-400/40 bg-teal-400/5' : 'border-teal-500/40 bg-teal-50')
                                        : (dark ? 'border-white/10 hover:border-teal-400/30' : 'border-gray-200 hover:border-teal-400/40 hover:bg-teal-50/40')
                                    }`}
                                    onDragOver={e => { e.preventDefault(); setCvDragOver(true); }}
                                    onDragLeave={() => setCvDragOver(false)}
                                    onDrop={e => { e.preventDefault(); setCvDragOver(false); handleCvFile(e.dataTransfer.files[0] || null); }}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                                        onChange={e => handleCvFile(e.target.files?.[0] || null)} />
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

                            {/* 04 Supporting Docs */}
                            <DocUpload
                                dark={dark}
                                files={docFiles}
                                onChange={setDocFiles}
                                label="Supporting Documents"
                                sectionNum="04"
                                accentColor="teal"
                            />

                            {/* 05 Cover Letter */}
                            <div className="mb-8">
                                <div className={divider}><span className={sectionBadge}>05</span>
                                    <span className={sectionLabel}>Cover Letter <span className={`normal-case font-[400] ${dark ? 'text-gray-600' : 'text-gray-400'}`}>(optional)</span></span></div>
                                <textarea className={`${inputCls} min-h-[160px] resize-y`}
                                    placeholder={`Tell us why you'd be a great fit for the ${job.title} role at Grey InfoTech.`}
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
            </div>
        </div>
    );
}

// ─── Apply Form (Send CV — no specific job) ───────────────────────────────────

function ApplyForm({ isDayTime, onClose }: { isDayTime: boolean; onClose: () => void }) {
    const dark = !isDayTime;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [docFiles, setDocFiles] = useState<File[]>([]);
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
        const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
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
            docFiles.forEach(f => fd.append('documents', f));
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
                <button onClick={onClose}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-[600] text-[0.9em] border transition-colors
                        ${dark ? 'border-teal-400/30 text-teal-400 hover:bg-teal-400/10' : 'border-teal-500/30 text-teal-600 hover:bg-teal-50'}`}>
                    ← Back to Careers
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="text-center mb-10">
                <FxChip day={isDayTime} className="mb-5">Open Application</FxChip>
                <FxGlitchText tag="h2" className="text-[2.2em] md:text-[2.8em] font-[900] tracking-tight leading-[1.1] mb-4">
                    Send Us Your <span className="gx-gradient-text">CV</span>
                </FxGlitchText>
                <p className={`text-[0.92em] max-w-xl mx-auto leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    We're always on the lookout for exceptional talent. Drop your CV and we'll reach out when the right opportunity arises.
                </p>
            </div>

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

                    {/* 04 Supporting Docs */}
                    <DocUpload
                        dark={dark}
                        files={docFiles}
                        onChange={setDocFiles}
                        label="Supporting Documents"
                        sectionNum="04"
                        accentColor="teal"
                    />

                    {/* 05 Cover Letter */}
                    <div className="mb-8">
                        <div className={divider}><span className={sectionBadge}>05</span>
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
    const [docFiles, setDocFiles] = useState<File[]>([]);

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

            if (docFiles.length) {
                // multipart — include docs
                const fd = new FormData();
                fd.append('form_type', 'self_introduction');
                Object.entries({ ...form, cover_letter: enriched }).forEach(([k, v]) => fd.append(k, v));
                docFiles.forEach(f => fd.append('documents', f));
                const res = await fetch('/api/career-apply', { method: 'POST', body: fd });
                const data = await res.json();
                if (!res.ok || !data.ok) { setErrorMsg(data.error || 'Something went wrong.'); setStatus('error'); return; }
            } else {
                const res = await fetch('/api/career-apply', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ form_type: 'self_introduction', ...form, cover_letter: enriched }),
                });
                const data = await res.json();
                if (!res.ok || !data.ok) { setErrorMsg(data.error || 'Something went wrong.'); setStatus('error'); return; }
            }
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

                    {/* 05 Supporting Docs */}
                    <DocUpload
                        dark={dark}
                        files={docFiles}
                        onChange={setDocFiles}
                        label="Supporting Documents"
                        sectionNum="05"
                        accentColor="cyan"
                    />

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

// ─── Career Modal Shell ───────────────────────────────────────────────────────

interface CareerModalProps {
    type: ModalType;
    onClose: () => void;
    isDayTime: boolean;
}

function CareerModal({ type, onClose, isDayTime }: CareerModalProps) {
    const dark = !isDayTime;

    const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

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

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({ job, isDayTime, onClick }: { job: JobOpening; isDayTime: boolean; onClick: () => void }) {
    const dark = !isDayTime;
    const typeColor = TYPE_COLOR[job.type] || '#14b8a6';

    return (
        <button
            onClick={onClick}
            className={`w-full text-left rounded-2xl border p-6 transition-all duration-300 group hover:scale-[1.01] ${
                dark
                    ? 'bg-white/[0.02] border-white/8 hover:bg-white/[0.04] hover:border-teal-400/25'
                    : 'bg-white border-gray-100 hover:border-teal-400/40 hover:shadow-xl hover:shadow-gray-100'
            }`}
        >
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                    <p className={`text-[0.75em] font-[700] uppercase tracking-widest mb-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {job.department}
                    </p>
                    <h3 className={`text-[1.05em] font-[800] leading-tight group-hover:text-teal-400 transition-colors ${dark ? 'text-white' : 'text-gray-900'}`}>
                        {job.title}
                    </h3>
                </div>
                <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                    style={{ backgroundColor: `${typeColor}15`, border: `1px solid ${typeColor}30` }}>
                    <svg className="w-4 h-4" style={{ color: typeColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.7em] font-[700] border uppercase tracking-wide"
                    style={{ borderColor: `${typeColor}40`, color: typeColor, backgroundColor: `${typeColor}10` }}>
                    {job.type}
                </span>
                {job.location && (
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.7em] font-[600] border ${
                        dark ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-500'
                    }`}>
                        📍 {job.location}
                    </span>
                )}
                {job.experience_level && (
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[0.7em] font-[600] border ${
                        dark ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-500'
                    }`}>
                        {job.experience_level}
                    </span>
                )}
                {job.salary_range && (
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[0.7em] font-[600] border ${
                        dark ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-500'
                    }`}>
                        {job.salary_range}
                    </span>
                )}
            </div>

            {job.description && (
                <p className={`mt-3 text-[0.83em] leading-relaxed line-clamp-2 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {job.description}
                </p>
            )}
        </button>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const Careers: React.FC = () => {
    const isDayTime = useIsDayTime();
    const dark = !isDayTime;

    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [jobs, setJobs] = useState<JobOpening[]>([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

    // Fetch live job openings
    useEffect(() => {
        fetch('/api/job-openings')
            .then(r => r.json())
            .then(d => { if (d.ok) setJobs(d.data || []); })
            .catch(() => {})
            .finally(() => setJobsLoading(false));
    }, []);

    const openModal = useCallback((type: ModalType) => {
        setActiveModal(type);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
        document.body.style.overflow = '';
    }, []);

    const openJobDetail = useCallback((job: JobOpening) => {
        setSelectedJob(job);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeJobDetail = useCallback(() => {
        setSelectedJob(null);
        document.body.style.overflow = '';
    }, []);

    const openJobApply = useCallback((job: JobOpening) => {
        setSelectedJob(job);
        setActiveModal('job-apply');
        document.body.style.overflow = 'hidden';
    }, []);

    const closeJobApply = useCallback(() => {
        setActiveModal(null);
        document.body.style.overflow = '';
    }, []);

    return (
        <div className={`${dark ? 'bg-[#050810] text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-500`}>

            {/* ── Generic modals (apply / introduce) ── */}
            {(activeModal === 'apply' || activeModal === 'introduce') && (
                <CareerModal type={activeModal} onClose={closeModal} isDayTime={isDayTime} />
            )}

            {/* ── Job detail modal ── */}
            {selectedJob && activeModal !== 'job-apply' && (
                <JobDetailModal
                    job={selectedJob}
                    isDayTime={isDayTime}
                    onClose={closeJobDetail}
                    onApply={(job) => {
                        setSelectedJob(job);
                        setActiveModal('job-apply');
                    }}
                />
            )}

            {/* ── Job apply modal ── */}
            {activeModal === 'job-apply' && selectedJob && (
                <JobApplyModal
                    job={selectedJob}
                    isDayTime={isDayTime}
                    onClose={closeJobApply}
                />
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

            {/* ── Intro ── */}
            <section
                className={`pt-16 transition-colors duration-500 ${
                    isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                }`}
            >
                <FxBackground day={isDayTime} />
                <div className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={isDayTime}>JOIN OUR TEAM</FxChip>
                    </div>
                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] lg:mt-[0.01em] rounded-none lg:tracking-normal tracking-tight leading-[1.3] lg:pb-10 pb-6">
                                Build Your<br/><span className="gx-gradient-text">Career With Us</span>
                            </h3>
                        </FxReveal>
                        <FxReveal delay={0.1}>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]">
                                <div><p>We're looking for talented individuals who are passionate about technology and driven to create impact. Join a collaborative team where your skills matter, your ideas are heard, and your growth is our priority.</p></div>
                                <div><p>We believe in building products that matter and crafting experiences that drive results. If you're ready to work on meaningful projects with a supportive team, we'd love to hear from you.</p></div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ── Job Listings ── */}
            <section className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-[4.5em] pb-20">
                <div className="max-w-[90rem] mx-auto">
                    {jobsLoading ? (
                        // Skeleton loading
                        <div className="grid md:grid-cols-2 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`rounded-2xl border p-6 animate-pulse ${dark ? 'bg-white/[0.02] border-white/8' : 'bg-gray-50 border-gray-100'}`}>
                                    <div className={`h-3 rounded w-24 mb-3 ${dark ? 'bg-white/8' : 'bg-gray-200'}`} />
                                    <div className={`h-5 rounded w-3/4 mb-4 ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
                                    <div className="flex gap-2">
                                        <div className={`h-6 rounded-full w-20 ${dark ? 'bg-white/8' : 'bg-gray-200'}`} />
                                        <div className={`h-6 rounded-full w-24 ${dark ? 'bg-white/8' : 'bg-gray-200'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : jobs.length > 0 ? (
                        <div>
                            <FxReveal>
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <FxChip day={isDayTime} className="mb-3">Now Hiring</FxChip>
                                        <h3 className={`text-[1.5em] font-[800] ${dark ? 'text-white' : 'text-gray-900'}`}>
                                            {jobs.length} Open {jobs.length === 1 ? 'Position' : 'Positions'}
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => openModal('apply')}
                                        className={`text-[0.82em] font-[600] px-4 py-2 rounded-xl border transition-colors ${
                                            dark ? 'border-white/10 text-gray-400 hover:border-teal-400/30 hover:text-teal-400'
                                                 : 'border-gray-200 text-gray-500 hover:border-teal-400/40 hover:text-teal-600'
                                        }`}
                                    >
                                        Send open CV
                                    </button>
                                </div>
                            </FxReveal>
                            <div className="grid md:grid-cols-2 gap-4">
                                {jobs.map((job, i) => (
                                    <FxReveal key={job.id} delay={i * 0.07}>
                                        <JobCard
                                            job={job}
                                            isDayTime={isDayTime}
                                            onClick={() => openJobDetail(job)}
                                        />
                                    </FxReveal>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // No openings state
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
                    )}
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
