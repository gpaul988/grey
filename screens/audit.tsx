'use client';

import React, {useState} from 'react';
import type {AuditReport, AuditSection, Finding, Severity} from '@/lib/audit/engine';

const SEV_META: Record<Severity, {label: string; color: string; ring: string; bg: string}> = {
    critical: {label: 'Critical', color: '#ff4d6d', ring: 'rgba(255,77,109,.5)', bg: 'rgba(255,77,109,.08)'},
    high: {label: 'High', color: '#ff8a3d', ring: 'rgba(255,138,61,.5)', bg: 'rgba(255,138,61,.08)'},
    medium: {label: 'Medium', color: '#ffd24d', ring: 'rgba(255,210,77,.45)', bg: 'rgba(255,210,77,.07)'},
    low: {label: 'Low', color: '#7aa2ff', ring: 'rgba(122,162,255,.45)', bg: 'rgba(122,162,255,.07)'},
    pass: {label: 'Pass', color: '#36e0a0', ring: 'rgba(54,224,160,.45)', bg: 'rgba(54,224,160,.07)'},
};

function gradeColor(score: number): string {
    if (score >= 90) return '#36e0a0';
    if (score >= 70) return '#9ad84f';
    if (score >= 50) return '#ffd24d';
    if (score >= 30) return '#ff8a3d';
    return '#ff4d6d';
}

export default function AuditScreen() {
    const [website, setWebsite] = useState('');
    const [repo, setRepo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [report, setReport] = useState<AuditReport | null>(null);

    const run = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!website.trim() && !repo.trim()) {
            setError('Enter a website URL, a GitHub repo URL, or both.');
            return;
        }
        setLoading(true);
        setReport(null);
        try {
            const res = await fetch('/api/audit/run', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({website: website.trim(), repo: repo.trim()}),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || (data?.errors && Object.values(data.errors)[0]) || 'Audit failed.');
            setReport(data as AuditReport);
        } catch (err: any) {
            setError(err?.message || 'Audit failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen px-4 pb-24 pt-28 sm:px-6">
            <div className="mx-auto max-w-5xl">
                <header className="text-center">
                    <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-300">
                        Grey Audit Engine
                    </span>
                    <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Brutally honest <span className="grey-neon-text">site &amp; repo audit</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300/90">
                        Drop a live website and/or a GitHub repository. We run security, performance, SEO, and
                        engineering checks — then tell you exactly what&apos;s broken and what it lacks. No sugar-coating.
                    </p>
                </header>

                <form onSubmit={run} className="grey-glass grey-neon-border mx-auto mt-10 max-w-3xl rounded-2xl p-5 sm:p-7">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Website URL
                            </span>
                            <input
                                type="url"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                            />
                        </label>
                        <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                                GitHub Repo URL
                            </span>
                            <input
                                type="text"
                                value={repo}
                                onChange={(e) => setRepo(e.target.value)}
                                placeholder="https://github.com/owner/repo"
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                            />
                        </label>
                    </div>

                    {error && (
                        <p className="mt-4 rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-2.5 text-sm text-rose-300">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_-6px_rgba(34,211,238,.6)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                Running audit…
                            </>
                        ) : (
                            'Run Audit'
                        )}
                    </button>
                    <p className="mt-3 text-center text-xs text-slate-500">
                        Checks: TLS, security headers, SEO meta, performance signals, repo health, licensing, tests.
                    </p>
                </form>

                {loading && (
                    <p className="mt-10 text-center text-sm text-slate-400">
                        Fetching targets and running live checks — this can take up to ~20 seconds.
                    </p>
                )}

                {report && <Report report={report} />}
            </div>
        </main>
    );
}

function Report({report}: {report: AuditReport}) {
    return (
        <section className="mt-12">
            <div className="grey-glass rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <ScoreRing score={report.overallScore} grade={report.grade} />
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-white">Overall verdict</h2>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">{report.summary}</p>
                        <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                            {report.target.website && (
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                                    🌐 {report.target.website}
                                </span>
                            )}
                            {report.target.repo && (
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                                    📦 {report.target.repo}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid gap-5">
                {report.sections.map((s) => (
                    <SectionCard key={s.name} section={s} />
                ))}
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
                Generated {new Date(report.generatedAt).toLocaleString()} · Grey InfoTech Audit Engine
            </p>
        </section>
    );
}

function ScoreRing({score, grade}: {score: number; grade: string}) {
    const color = gradeColor(score);
    const deg = Math.round((score / 100) * 360);
    return (
        <div
            className="relative grid h-32 w-32 shrink-0 place-items-center rounded-full"
            style={{background: `conic-gradient(${color} ${deg}deg, rgba(255,255,255,.08) ${deg}deg)`}}
        >
            <div className="grid h-[104px] w-[104px] place-items-center rounded-full bg-[#0a0e1a]">
                <span className="text-3xl font-extrabold" style={{color}}>
                    {grade}
                </span>
                <span className="text-xs text-slate-400">{score}/100</span>
            </div>
        </div>
    );
}

function SectionCard({section}: {section: AuditSection}) {
    const color = gradeColor(section.score);
    const sorted = [...section.findings].sort((a, b) => sevRank(b.severity) - sevRank(a.severity));
    return (
        <div className="grey-glass rounded-2xl p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-white">{section.name}</h3>
                <span className="rounded-full px-3 py-1 text-xs font-bold" style={{color, background: `${color}1a`}}>
                    {section.score}/100
                </span>
            </div>
            <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{width: `${section.score}%`, background: color}} />
            </div>
            {sorted.length === 0 ? (
                <p className="text-sm text-emerald-300">No issues found in this section. Clean.</p>
            ) : (
                <ul className="space-y-3">
                    {sorted.map((f) => (
                        <FindingRow key={f.id} f={f} />
                    ))}
                </ul>
            )}
        </div>
    );
}

function FindingRow({f}: {f: Finding}) {
    const m = SEV_META[f.severity];
    return (
        <li className="rounded-xl border p-3.5" style={{borderColor: m.ring, background: m.bg}}>
            <div className="flex flex-wrap items-center gap-2">
                <span
                    className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{color: m.color, background: `${m.color}1f`}}
                >
                    {m.label}
                </span>
                <span className="text-sm font-semibold text-white">{f.title}</span>
            </div>
            <p className="mt-1.5 text-sm text-slate-300">{f.detail}</p>
            {f.fix && (
                <p className="mt-1.5 text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">Fix:</span> {f.fix}
                </p>
            )}
        </li>
    );
}

function sevRank(s: Severity): number {
    return {critical: 5, high: 4, medium: 3, low: 2, pass: 1}[s];
}
