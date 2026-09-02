'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {useSearchParams} from 'next/navigation';
import type {AuditReport, AuditSection, Finding, Severity} from '@/lib/audit/engine';
import {AuditRequestFixModal} from '@/components/AuditRequestFixModal';
import {exportAsJSON, exportAsHTML} from '@/lib/audit/export';
import {useIsDayTime} from "@/components/useIsDayTime";

/*  -  -  severity metadata  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
const SEV_META: Record<Severity, { label: string; color: string; ring: string; bg: string }> = {
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

interface AuditReportExtended extends AuditReport {
    externalId?: string;
    shareUrl?: string;
}

/*  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
   MAIN SCREEN
 -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
export default function AuditScreen() {
    const searchParams = useSearchParams();
    const [website, setWebsite] = useState('');
    const [repo, setRepo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [report, setReport] = useState<AuditReportExtended | null>(null);
    const [showFixModal, setShowFixModal] = useState(false);

    const isDayTime = useIsDayTime();

    useEffect(() => {
        if (!searchParams) return;
        const w = searchParams.get('website');
        const r = searchParams.get('repo');
        if (w) setWebsite(decodeURIComponent(w));
        if (r) setRepo(decodeURIComponent(r));
    }, [searchParams]);

    // Instant SEO quick-check panel (futuristic, high-detail)
    function InstantSeoPanel() {
        const [input, setInput] = useState('');
        const [loadingSeo, setLoadingSeo] = useState(false);
        const [seoResult, setSeoResult] = useState<any | null>(null);
        const [seoError, setSeoError] = useState<string | null>(null);

        const runSeo = async (u?: string) => {
            setSeoError(null);
            setSeoResult(null);
            setLoadingSeo(true);
            try {
                let url = (u ?? input).trim();
                if (!/^https?:\/\//i.test(url)) {
                    if (url.startsWith('/')) url = window.location.origin + url;
                    else url = 'https://' + url;
                }
                const res = await fetch('/api/seo-audit', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({url})
                });
                const payload = await res.json();
                if (!res.ok) throw new Error(payload?.error || 'Audit failed');
                setSeoResult({...payload, url});
            } catch (err: any) {
                setSeoError(err?.message || String(err));
            } finally {
                setLoadingSeo(false);
            }
        };

        return (
            <section
                className="mt-8 mb-8 rounded-2xl border border-white/8 bg-gradient-to-br from-slate-900/70 to-slate-950/80 p-6 shadow-lg">
                <div className="flex items-start gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"/>
                            <h3 className="text-lg font-bold">Instant SEO Console</h3>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">Run a focused, high-fidelity SEO check instantly.
                            Uses server-side crawling to avoid browser CORS/CSP limits.</p>

                        <div className="flex gap-3">
                            <input value={input} onChange={(e) => setInput(e.target.value)}
                                   className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white"
                                   placeholder="example.com or /path or https://example.com"/>
                            <button onClick={() => runSeo()} disabled={loadingSeo}
                                    className="rounded-xl px-4 py-2 font-semibold" style={{
                                background: 'linear-gradient(135deg,#06b6d4,#6366f1)',
                                color: 'white'
                            }}>{loadingSeo ? 'Running…' : 'Run SEO'}</button>
                        </div>

                        <div className="mt-3 text-xs text-slate-500">Tip: Use full URL for external sites. Results
                            include title, meta, H1s, canonical, robots, images missing alt, link counts, word count,
                            and an automated score with prioritized fixes.
                        </div>
                    </div>

                    <div className="w-72 hidden sm:block">
                        <div
                            className="rounded-xl border border-white/6 p-3 bg-gradient-to-b from-white/3 to-transparent">
                            <div className="text-xs text-slate-400">Quick Metrics</div>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <div className="text-sm">Live audit</div>
                                <div className="font-mono text-right text-sm">Server</div>
                                <div className="text-sm">Response</div>
                                <div className="font-mono text-right text-sm">jsdom</div>
                                <div className="text-sm">Checks</div>
                                <div className="font-mono text-right text-sm">10+</div>
                                <div className="text-sm">Output</div>
                                <div className="font-mono text-right text-sm">JSON</div>
                            </div>
                        </div>
                    </div>
                </div>

                {seoError && <div
                    className="mt-4 rounded-md bg-rose-600/10 border border-rose-500/10 p-3 text-sm text-rose-300">{seoError}</div>}

                {seoResult && (
                    <div className="mt-5 grid lg:grid-cols-3 gap-4">
                        <div className="p-3 rounded-lg border bg-black/20">
                            <div className="text-xs text-slate-400">URL</div>
                            <div className="font-mono break-all text-sm">{seoResult.url}</div>
                            <div className="mt-3 text-xs text-slate-400">Score</div>
                            <div className="text-2xl font-black"
                                 style={{color: gradeColor(seoResult.score)}}>{seoResult.score}/100
                            </div>
                            <div className="mt-3 text-xs text-slate-400">Word count</div>
                            <div className="font-medium">{seoResult.wordCount}</div>
                        </div>

                        <div className="lg:col-span-2 p-3 rounded-lg border bg-black/10">
                            <div className="grid gap-3">
                                <div>
                                    <div className="text-xs text-slate-400">Title</div>
                                    <div
                                        className={`font-semibold ${!seoResult.title ? 'text-rose-400' : ''}`}>{seoResult.title || 'Missing'}</div>
                                </div>

                                <div>
                                    <div className="text-xs text-slate-400">Meta description</div>
                                    <div
                                        className={`${!seoResult.metaDescription ? 'text-rose-400' : ''}`}>{seoResult.metaDescription || 'Missing'}</div>
                                </div>

                                <div>
                                    <div className="text-xs text-slate-400">H1(s)</div>
                                    <div
                                        className="font-medium">{seoResult.h1s && seoResult.h1s.length ? seoResult.h1s.join(' • ') : 'None found'}</div>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-3">
                                    <div>
                                        <div className="text-xs text-slate-400">Canonical</div>
                                        <div>{seoResult.canonical || 'Not set'}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400">Robots</div>
                                        <div>{seoResult.robots || 'Not specified'}</div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-slate-400">Images missing alt (first 8)</div>
                                    <div className="text-sm">
                                        {seoResult.imagesMissingAlt && seoResult.imagesMissingAlt.length ? (
                                            <ul className="list-disc pl-5">
                                                {seoResult.imagesMissingAlt.slice(0, 8).map((src: any, i: number) => <li
                                                    key={i}><code className="font-mono">{src}</code></li>)}
                                            </ul>
                                        ) : <div>None</div>}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-slate-400">Links</div>
                                    <div className="text-sm">Total: {seoResult.totalLinks} —
                                        Internal: {seoResult.internalLinks} — External: {seoResult.externalLinks}</div>
                                </div>

                                <div>
                                    <div className="text-xs text-slate-400">Automated Prioritized Fixes</div>
                                    <ol className="list-decimal pl-5 text-sm">
                                        {(!seoResult.title || !seoResult.metaDescription) &&
                                            <li>Add meaningful title and meta description focusing on primary
                                                keywords.</li>}
                                        {seoResult.imagesMissingAlt && seoResult.imagesMissingAlt.length > 0 &&
                                            <li>Add descriptive alt attributes to images
                                                ({seoResult.imagesMissingAlt.length} missing).</li>}
                                        {seoResult.canonical ? null :
                                            <li>Set a canonical link element to avoid duplicate content issues.</li>}
                                        <li>Ensure H1(s) reflect page topic and primary keywords (reduce multiplicity
                                            if {'>'} 1).
                                        </li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </section>
        );
    }

    // Insert the InstantSeoPanel above the main input form


    const handleRun = useCallback(async (e?: React.FormEvent) => {
        e?.preventDefault();
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
                body: JSON.stringify({
                    website: website.trim() || undefined,
                    repo: repo.trim() || undefined
                }),
            });
            const ct = res.headers.get('content-type') || '';
            if (!ct.includes('application/json')) {
                throw new Error('Server returned an unexpected response. Please try again.');
            }
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'Audit failed.');
            setReport(data as AuditReportExtended);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Audit failed. Try again.');
        } finally {
            setLoading(false);
        }
    }, [website, repo]);

    return (
        <main className="relative min-h-screen pb-24 pt-48">
            {/* Background grid */}
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        'linear-gradient(#00f5d4 1px, transparent 1px), linear-gradient(90deg, #00f5d4 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />
            {/* Glow blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[120px]"/>
                <div
                    className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[100px]"/>
            </div>

            <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
                {/*  -  -  Hero header  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */}
                <header className="mb-14 text-center">
                    <div
                        className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-5 py-1.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400"/>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400">
              Grey Audit Engine v2.0
            </span>
                    </div>
                    <h1 className={`text-5xl font-black tracking-tight sm:text-6xl ${isDayTime ? 'text-slate-800' : 'text-white'}`}>
                        Brutally honest{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{backgroundImage: 'linear-gradient(135deg, #00f5d4, #818cf8)'}}
                        >
              site & repo audit
            </span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
                        Drop a live website and/or GitHub repository. We run security, performance, SEO, and
                        engineering checks - then tell you exactly what&apos;s broken. No sugar-coating.
                    </p>

                    {/* Feature pills */}
                    <div className="mt-7 flex flex-wrap justify-center gap-2">
                        {['TLS & Security Headers', 'SEO Analysis', 'Performance Signals', 'Repo Health', 'Licensing', 'CI/CD Checks'].map((f) => (
                            <span
                                key={f}
                                className="rounded-full border border-slate-700/60 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-400"
                            >
                {f}
              </span>
                        ))}
                    </div>
                </header>

                {/*  -  -  Input form  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */}
                <InstantSeoPanel/>
                <form
                    onSubmit={handleRun}
                    className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 p-6 shadow-2xl backdrop-blur-md sm:p-8"
                >
                    {/* corner accent */}
                    <div className="pointer-events-none absolute left-0 top-0 h-24 w-24 rounded-br-full bg-cyan-500/5"/>
                    <div
                        className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 rounded-tl-full bg-indigo-500/5"/>

                    <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Enter a domain, full website URL, and/or GitHub repository
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                🌐 Website (Optional)
              </span>
                            <input
                                type="text"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                placeholder="example.com or https://example.com"
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                            />
                        </label>
                        <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                📦 GitHub Repo (Optional)
              </span>
                            <input
                                type="text"
                                value={repo}
                                onChange={(e) => setRepo(e.target.value)}
                                placeholder="owner/repo or full URL"
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                            />
                        </label>
                    </div>

                    {error && (
                        <div
                            className="mt-4 flex items-center gap-3 rounded-xl border border-rose-400/30 bg-rose-400/8 px-4 py-3">
                            <span className="text-rose-400">⚠</span>
                            <p className="text-sm text-rose-300">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="relative mt-6 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl px-6 py-4 text-sm font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                        style={{background: 'linear-gradient(135deg, #06b6d4, #6366f1)'}}
                    >
            <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity hover:opacity-100"
                style={{background: 'linear-gradient(135deg, #06b6d4aa, #6366f1aa)'}}
            />
                        {loading ? (
                            <>
                                <span
                                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"/>
                                Running audit - this takes ~20s…
                            </>
                        ) : (
                            <>
                                <span>⚡</span> Run Full Audit
                            </>
                        )}
                    </button>
                </form>

                {/*  -  -  Loading state  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */}
                {loading && (
                    <div className="mt-14 flex flex-col items-center gap-5">
                        <div className="relative h-16 w-16">
                            <div
                                className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cyan-400"/>
                            <div
                                className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-indigo-400"
                                style={{animationDirection: 'reverse', animationDuration: '0.8s'}}/>
                            <div className="absolute inset-4 rounded-full bg-cyan-400/10"/>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-slate-300">Fetching targets and running live
                                checks…</p>
                            <p className="mt-1 text-xs text-slate-500">Security · Performance · SEO · Repo ·
                                Licensing</p>
                        </div>
                        <div className="mt-2 flex gap-1.5">
                            {[0, 0.2, 0.4, 0.6, 0.8].map((d) => (
                                <div
                                    key={d}
                                    className="h-1 w-8 rounded-full bg-cyan-400/30 animate-pulse"
                                    style={{animationDelay: `${d}s`}}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/*  -  -  Report  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */}
                {report && (
                    <Report
                        report={report}
                        onRequestFix={() => setShowFixModal(true)}
                    />
                )}

                {/*  -  -  Request Fix Modal  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */}
                <AuditRequestFixModal
                    isOpen={showFixModal}
                    onClose={() => setShowFixModal(false)}
                    auditReportId={report?.externalId}
                    website={website}
                    gitHubRepo={repo}
                    onSuccess={() => setShowFixModal(false)}
                    auditReport={report ?? undefined}
                />
            </div>
        </main>
    );
}

/*  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
   SHARE MODAL
 -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
function ShareModal({isOpen, onClose, report}: { isOpen: boolean; onClose: () => void; report: AuditReportExtended }) {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    // Build a shareable URL: use externalId if available, else encode report summary as params
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = report.externalId
        ? `${baseUrl}/audit?reportId=${report.externalId}`
        : `${baseUrl}/audit?website=${encodeURIComponent(report.target?.website || '')}&repo=${encodeURIComponent(report.target?.repo || '')}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // fallback
            const ta = document.createElement('textarea');
            ta.value = shareUrl;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const shareLinks = [
        {
            label: 'Twitter / X',
            icon: ' - ',
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this site audit by Graham Sobiribo Paul  - Score: ${report.grade} (${report.overallScore}/100)`)}&url=${encodeURIComponent(shareUrl)}`,
        },
        {
            label: 'LinkedIn',
            icon: 'in',
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        },
        {
            label: 'WhatsApp',
            icon: '💬',
            href: `https://wa.me/?text=${encodeURIComponent(`Site audit result  - Grade ${report.grade} (${report.overallScore}/100): ${shareUrl}`)}`,
        },
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-[0_0_80px_-20px_rgba(6,182,212,.4)]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                    -
                </button>

                <div className="mb-6">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="text-xl"> --</span>
                        <h3 className="text-xl font-bold text-white">Share Report</h3>
                    </div>
                    <p className="text-sm text-slate-400">
                        Share this audit report with your team or clients.
                    </p>
                </div>

                {/* Score summary */}
                <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500">Overall Grade</p>
                            <p className="text-2xl font-black" style={{color: gradeColor(report.overallScore)}}>
                                {report.grade}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-500">Score</p>
                            <p className="text-2xl font-black text-white">{report.overallScore}<span
                                className="text-sm text-slate-500">/100</span></p>
                        </div>
                    </div>
                    {report.target?.website && (
                        <p className="mt-2 truncate text-xs text-slate-500">{report.target.website}</p>
                    )}
                </div>

                {/* URL copy */}
                <div className="mb-5 flex gap-2">
                    <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-xs text-slate-300 outline-none"
                    />
                    <button
                        onClick={handleCopy}
                        className="flex-shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold transition"
                        style={{
                            background: copied ? '#36e0a0' : 'linear-gradient(135deg, #06b6d4, #6366f1)',
                            color: 'white',
                        }}
                    >
                        {copied ? '✓ Copied!' : 'Copy'}
                    </button>
                </div>

                {/* Social share */}
                <div className="flex gap-2">
                    {shareLinks.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Share on ${s.label}`}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                        >
                            <span className="text-base">{s.icon}</span>
                            <span className="hidden sm:inline">{s.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

/*  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
   REPORT
 -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
function Report({report, onRequestFix}: { report: AuditReportExtended; onRequestFix?: () => void }) {
    const [shareOpen, setShareOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [exportStatus, setExportStatus] = useState<Record<string, string>>({});

    const handleExportJSON = () => {
        try {
            setExportStatus((p) => ({...p, json: 'loading'}));
            // If we have externalId, try server export first; fallback to inline
            if (report.externalId) {
                window.open(`/api/audit/export/${report.externalId}?format=json`, '_blank');
                setExportStatus((p) => ({...p, json: 'done'}));
                setTimeout(() => setExportStatus((p) => ({...p, json: ''})), 2000);
                return;
            }
            // Inline export from in-memory report
            const json = JSON.stringify(report, null, 2);
            const blob = new Blob([json], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `audit-report-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            setExportStatus((p) => ({...p, json: 'done'}));
            setTimeout(() => setExportStatus((p) => ({...p, json: ''})), 2000);
        } catch (e) {
            console.error(e);
            setExportStatus((p) => ({...p, json: 'error'}));
            setTimeout(() => setExportStatus((p) => ({...p, json: ''})), 2000);
        }
    };

    const handlePrintPDF = () => {
        try {
            setExportStatus((p) => ({...p, pdf: 'loading'}));
            if (report.externalId) {
                // Open HTML in new tab for browser print-to-PDF
                window.open(`/api/audit/export/${report.externalId}?format=html`, '_blank');
                setExportStatus((p) => ({...p, pdf: 'done'}));
                setTimeout(() => setExportStatus((p) => ({...p, pdf: ''})), 2000);
                return;
            }
            // Inline: open a print window with the report HTML
            // Build a minimal inline HTML from the report using exportAsHTML-style markup
            const html = buildPrintHTML(report);
            const w = window.open('', '_blank');
            if (w) {
                w.document.write(html);
                w.document.close();
                setTimeout(() => {
                    w.focus();
                    w.print();
                }, 600);
            }
            setExportStatus((p) => ({...p, pdf: 'done'}));
            setTimeout(() => setExportStatus((p) => ({...p, pdf: ''})), 2000);
        } catch (e) {
            console.error(e);
            setExportStatus((p) => ({...p, pdf: 'error'}));
            setTimeout(() => setExportStatus((p) => ({...p, pdf: ''})), 2000);
        }
    };

    const findings = report.sections.flatMap((s) => s.findings);
    const critical = findings.filter((f) => f.severity === 'critical').length;
    const high = findings.filter((f) => f.severity === 'high').length;
    const passes = findings.filter((f) => f.severity === 'pass').length;

    return (
        <section className="mt-16">
            {/*  -  -  Overview card  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */}
            <div
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-6 shadow-2xl sm:p-8">
                <div className="flex flex-col items-center gap-8 sm:flex-row">
                    <ScoreRing score={report.overallScore} grade={report.grade}/>
                    <div className="flex-1 text-center sm:text-left">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">Overall
                            Verdict</p>
                        <h2 className="text-3xl font-black text-white">Grade {report.grade}</h2>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-300">{report.summary}</p>

                        {/* Target chips */}
                        <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                            {report.target?.website && (
                                <a
                                    href={report.target.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
                                >
                                    🌐 {report.target.website}
                                </a>
                            )}
                            {report.target?.repo && (
                                <a
                                    href={report.target.repo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition hover:border-indigo-400/40 hover:text-indigo-300"
                                >
                                    📦 {report.target.repo}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats row */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                        {label: 'Critical Issues', value: critical, color: '#ff4d6d'},
                        {label: 'High Issues', value: high, color: '#ff8a3d'},
                        {label: 'Passed Checks', value: passes, color: '#36e0a0'},
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="rounded-xl border p-4 text-center"
                            style={{borderColor: s.color + '30', background: s.color + '08'}}
                        >
                            <p className="text-2xl font-black" style={{color: s.color}}>{s.value}</p>
                            <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/*  -  -  Detailed analysis accordion  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */}
            {report.detailedSummary && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-7">
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="flex w-full items-center justify-between text-left"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-cyan-400">📊</span>
                            <h3 className="font-bold text-white">Detailed Analysis &amp; Recommendations</h3>
                        </div>
                        <span
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-600 text-xs text-slate-400 transition hover:border-cyan-400 hover:text-cyan-400">
              {showDetails ? '−' : '+'}
            </span>
                    </button>
                    {showDetails && (
                        <div className="mt-5 space-y-2 text-sm leading-relaxed text-slate-300">
                            {report.detailedSummary.split('\n').map((line, i) => {
                                if (!line.trim()) return <br key={i}/>;
                                const clean = line.replace(/\*\*/g, '');
                                if (line.startsWith('**') || line.startsWith('##')) {
                                    return <p key={i}
                                              className="mt-3 font-bold text-white">{clean.replace(/^#+\s*/, '')}</p>;
                                }
                                if (line.startsWith('-') || line.startsWith('•')) {
                                    return <p key={i} className="ml-4 text-slate-400">{clean}</p>;
                                }
                                return <p key={i}>{clean}</p>;
                            })}
                        </div>
                    )}
                </div>
            )}

            {/*  -  -  Section cards  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */}
            <div className="mt-5 grid gap-4">
                {report.sections.map((s) => <SectionCard key={s.name} section={s}/>)}
            </div>

            {/*  -  -  Action buttons  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
                <button
                    onClick={() => setShareOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/8 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/15 hover:shadow-[0_0_20px_-6px_rgba(34,211,238,.4)]"
                >
                    -- Share Report
                </button>

                <button
                    onClick={handleExportJSON}
                    disabled={exportStatus.json === 'loading'}
                    className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/40 bg-indigo-400/8 px-5 py-2.5 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-400/15 hover:shadow-[0_0_20px_-6px_rgba(99,102,241,.4)] disabled:opacity-60"
                >
                    {exportStatus.json === 'loading' ? (
                        <span
                            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-indigo-300/40 border-t-indigo-300"/>
                    ) : exportStatus.json === 'done' ? '✓' : '📋'}
                    {exportStatus.json === 'done' ? 'Downloaded!' : 'JSON Export'}
                </button>

                <button
                    onClick={handlePrintPDF}
                    disabled={exportStatus.pdf === 'loading'}
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-400/8 px-5 py-2.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/15 hover:shadow-[0_0_20px_-6px_rgba(52,211,153,.4)] disabled:opacity-60"
                >
                    {exportStatus.pdf === 'loading' ? (
                        <span
                            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-emerald-300/40 border-t-emerald-300"/>
                    ) : exportStatus.pdf === 'done' ? '✓' : '📄'}
                    {exportStatus.pdf === 'done' ? 'Opened!' : 'Print / PDF'}
                </button>

                <button
                    onClick={onRequestFix}
                    className="ml-auto inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110 hover:shadow-[0_0_30px_-6px_rgba(34,211,238,.5)]"
                    style={{background: 'linear-gradient(135deg, #06b6d4, #6366f1)'}}
                >
                    ⚡ Request Fix
                </button>
            </div>

            {/*  -  -  Support CTA  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */}
            <div
                className="mt-12 overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/8 via-indigo-500/5 to-transparent p-8 text-center">
                <div
                    className="mb-2 inline-block rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                    Expert Remediation
                </div>
                <h3 className="mt-2 text-2xl font-bold text-white">Need Help Fixing These Issues?</h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
                    Our senior full-stack team turns audit findings into production-grade software - security hardening,
                    performance optimization, architecture refactoring, and more.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {[
                        {icon: '📞', label: 'Phone', value: '+234 802 809 5571', href: 'tel:+2348028095571'},
                        {icon: '💬', label: 'WhatsApp', value: 'Direct Message', href: 'https://wa.me/2348028095571'},
                        {
                            icon: '✉️',
                            label: 'Email',
                            value: 'hello@greyinfotech.com.ng',
                            href: 'mailto:hello@greyinfotech.com.ng'
                        },
                    ].map((c) => (
                        <a
                            key={c.label}
                            href={c.href}
                            target={c.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="group rounded-xl border border-white/10 bg-white/5 p-4 text-center transition hover:border-cyan-400/30 hover:bg-white/10"
                        >
                            <p className="text-sm font-semibold text-cyan-300">{c.icon} {c.label}</p>
                            <p className="mt-1 text-sm text-white group-hover:text-cyan-200 transition">{c.value}</p>
                        </a>
                    ))}
                </div>

                <button
                    onClick={onRequestFix}
                    className="mt-7 inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
                    style={{background: 'linear-gradient(135deg, #06b6d4, #6366f1)'}}
                >
                    ⚡ Request Fix Now
                </button>
            </div>

            <p className="mt-8 text-center text-xs text-slate-600">
                Generated {new Date(report.generatedAt).toLocaleString()} · Graham Sobiribo Paul Audit Engine
                {report.externalId ? ` · Report #${report.externalId}` : ''}
            </p>

            <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} report={report}/>
        </section>
    );
}

/*  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
   SCORE RING
 -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
function ScoreRing({score, grade}: { score: number; grade: string }) {
    const color = gradeColor(score);
    const deg = Math.round((score / 100) * 360);
    return (
        <div
            className="relative grid h-36 w-36 shrink-0 place-items-center rounded-full"
            style={{
                background: `conic-gradient(${color} ${deg}deg, rgba(255,255,255,.06) ${deg}deg)`,
                boxShadow: `0 0 40px -10px ${color}80`,
            }}
        >
            <div className="grid h-[112px] w-[112px] place-items-center rounded-full bg-[#080c18]">
                <div className="text-center">
                    <span className="block text-4xl font-black" style={{color}}>{grade}</span>
                    <span className="text-xs text-slate-500">{score}/100</span>
                </div>
            </div>
        </div>
    );
}

/*  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
   SECTION CARD
 -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
function SectionCard({section}: { section: AuditSection }) {
    const [open, setOpen] = useState(true);
    const color = gradeColor(section.score);
    const sorted = [...section.findings].sort((a, b) => sevRank(b.severity) - sevRank(a.severity));

    return (
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
            >
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full" style={{background: color, boxShadow: `0 0 8px ${color}`}}/>
                    <h3 className="font-bold text-white">{section.name}</h3>
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                          style={{color, background: color + '1a'}}>
            {section.score}/100
          </span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-white/10 sm:block">
                        <div className="h-full rounded-full transition-all"
                             style={{width: `${section.score}%`, background: color}}/>
                    </div>
                    <span className="text-xs text-slate-500">{open ? ' - ' : ' - '}</span>
                </div>
            </button>

            {open && (
                <div className="border-t border-white/5 px-5 pb-5 pt-4 sm:px-6">
                    {sorted.length === 0 ? (
                        <p className="text-sm text-emerald-300">✓ No issues found. Clean.</p>
                    ) : (
                        <ul className="space-y-3">
                            {sorted.map((f) => <FindingRow key={f.id} f={f}/>)}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

/*  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
   FINDING ROW
 -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
function FindingRow({f}: { f: Finding }) {
    const m = SEV_META[f.severity];
    return (
        <li className="rounded-xl border p-4" style={{borderColor: m.ring, background: m.bg}}>
            <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
          <span
              className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
              style={{color: m.color, background: m.color + '1f'}}
          >
            {m.label}
          </span>
                    <span className="text-sm font-semibold text-white">{f.title}</span>
                </div>
            </div>
            <p className="mt-2 text-sm text-slate-300">{f.detail}</p>
        </li>
    );
}

/*  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
   HELPERS
 -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
function sevRank(s: Severity): number {
    return {critical: 5, high: 4, medium: 3, low: 2, pass: 1}[s];
}

function buildPrintHTML(report: AuditReportExtended): string {
    const color = gradeColor(report.overallScore);
    const sections = report.sections
        .map(
            (s) => `
      <div style="margin-bottom:28px;page-break-inside:avoid">
        <h2 style="font-size:18px;font-weight:700;margin-bottom:8px;color:#0f172a">${s.name}  - ${s.score}/100</h2>
        <div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:12px">
          <div style="height:100%;width:${s.score}%;background:${gradeColor(s.score)}"></div>
        </div>
        ${s.findings.length === 0 ? '<p style="color:#10b981;font-size:13px">✓ No issues found.</p>' : s.findings.map((f) => `
          <div style="border:1px solid ${SEV_META[f.severity].ring};background:${SEV_META[f.severity].bg.replace('rgba', 'rgba')};padding:10px 12px;border-radius:8px;margin-bottom:8px">
            <span style="background:${SEV_META[f.severity].color};color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:700;text-transform:uppercase">${f.severity}</span>
            <strong style="margin-left:8px;font-size:13px">${f.title}</strong>
            <p style="margin:6px 0 0;font-size:12px;color:#475569">${f.detail}</p>
            ${f.fix ? `<p style="margin:4px 0 0;font-size:11px;color:#64748b"><strong>Fix:</strong> ${f.fix}</p>` : ''}
          </div>`).join('')}
      </div>`
        )
        .join('');

    return `<!DOCTYPE html><html><head><title>Audit Report  - Graham Sobiribo Paul</title>
  <style>body{font-family:system-ui,sans-serif;max-width:900px;margin:0 auto;padding:40px 24px;color:#1e293b}h1{font-size:28px;font-weight:900;margin-bottom:4px}@media print{button{display:none}}</style>
  </head><body>
  <h1>Audit Report</h1>
  <p style="color:#64748b;font-size:14px;margin-bottom:4px">${report.target?.website || report.target?.repo || ''}</p>
  <p style="margin-bottom:24px">
    <span style="font-size:36px;font-weight:900;color:${color}">${report.grade}</span>
    <span style="color:#64748b;font-size:14px;margin-left:6px">${report.overallScore}/100</span>
  </p>
  <p style="margin-bottom:32px;color:#475569;font-size:14px">${report.summary}</p>
  ${sections}
  <p style="color:#94a3b8;font-size:11px;margin-top:40px;border-top:1px solid #e2e8f0;padding-top:16px">Generated ${new Date(report.generatedAt).toLocaleString()} · Graham Sobiribo Paul Audit Engine</p>
  </body></html>`;
}
