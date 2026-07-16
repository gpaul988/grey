'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertTriangle, AlertCircle, Info, CheckCircle, Wrench } from 'lucide-react';

/*  -  -  -  Types  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
interface Finding {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'pass';
  detail: string;
  fix?: string;
  implementation?: string;
}

interface AuditSection {
  name: string;
  score: number;
  findings: Finding[];
}

interface AuditData {
  overallScore?: number;
  grade?: string;
  summary?: string;
  detailedSummary?: string;
  sections?: AuditSection[];
  generatedAt?: string;
  target?: { website?: string; repo?: string };
  externalId?: string;
  submittedAt?: string;
  // audit-run rows
  kind?: string;
  findingsCount?: number;
}

interface AuditSubmission {
  id: number;
  userName: string;
  userEmail: string;
  userPhone: string | null;
  userCompany: string | null;
  website: string | null;
  gitHubRepo: string | null;
  priority: 'low' | 'medium' | 'high' | 'critical';
  budgetEstimate: string | null;
  specificIssues: string | null;
  preferredContact: string;
  status: 'new' | 'reviewed' | 'quoted' | 'in_progress' | 'completed' | 'archived';
  adminNotes: string | null;
  proposedSolution: string | null;
  auditData: AuditData | null;
  createdAt: string;
  respondedAt: string | null;
}

/*  -  -  -  Colour maps  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
const priorityColors = {
  low:      { bg: 'bg-blue-500/20',   text: 'text-blue-300',   label: '🟢 Low' },
  medium:   { bg: 'bg-yellow-500/20', text: 'text-yellow-300', label: '🟡 Medium' },
  high:     { bg: 'bg-orange-500/20', text: 'text-orange-300', label: ' -  High' },
  critical: { bg: 'bg-red-500/20',    text: 'text-red-300',    label: ' -  Critical' },
};

const statusColors = {
  new:         { bg: 'bg-blue-500/20',    text: 'text-blue-300',    label: 'New' },
  reviewed:    { bg: 'bg-purple-500/20',  text: 'text-purple-300',  label: 'Reviewed' },
  quoted:      { bg: 'bg-cyan-500/20',    text: 'text-cyan-300',    label: 'Quoted' },
  in_progress: { bg: 'bg-indigo-500/20',  text: 'text-indigo-300',  label: 'In Progress' },
  completed:   { bg: 'bg-emerald-500/20', text: 'text-emerald-300', label: 'Completed' },
  archived:    { bg: 'bg-slate-500/20',   text: 'text-slate-300',   label: 'Archived' },
};

const sevMeta: Record<string, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  critical: { icon: <AlertCircle className="h-3.5 w-3.5" />, color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/30',    label: 'Critical' },
  high:     { icon: <AlertTriangle className="h-3.5 w-3.5" />, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30', label: 'High' },
  medium:   { icon: <Info className="h-3.5 w-3.5" />,          color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30', label: 'Medium' },
  low:      { icon: <Info className="h-3.5 w-3.5" />,          color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/30',   label: 'Low' },
  pass:     { icon: <CheckCircle className="h-3.5 w-3.5" />,   color: 'text-emerald-400',bg: 'bg-emerald-500/10 border-emerald-500/30', label: 'Pass' },
};

/*  -  -  -  Sub-components  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */

/** Renders a single finding with its fix/implementation steps */
function FindingCard({ f }: { f: Finding }) {
  const [open, setOpen] = useState(false);
  const m = sevMeta[f.severity] ?? sevMeta.low;
  const hasFix = f.fix || f.implementation;

  return (
    <div className={`rounded-lg border text-xs ${m.bg} mb-2`}>
      <button
        onClick={() => hasFix && setOpen((v) => !v)}
        className={`w-full flex items-start gap-2 px-3 py-2.5 text-left ${hasFix ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <span className={`mt-0.5 shrink-0 ${m.color}`}>{m.icon}</span>
        <span className="flex-1">
          <span className={`font-semibold ${m.color}`}>[{m.label}]</span>{' '}
          <span className="text-slate-200">{f.title}</span>
          <span className="ml-2 text-slate-400">{f.detail}</span>
        </span>
        {hasFix && (
          <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform mt-0.5 ${open ? 'rotate-180' : ''}`} />
        )}
      </button>
      {open && hasFix && (
        <div className="border-t border-white/5 px-3 pb-3 pt-2 space-y-2">
          {f.fix && (
            <div className="flex gap-2 items-start">
              <Wrench className="h-3.5 w-3.5 shrink-0 text-cyan-400 mt-0.5" />
              <p className="text-cyan-300"><span className="font-semibold">Fix:</span> {f.fix}</p>
            </div>
          )}
          {f.implementation && (
            <div className="bg-slate-900/60 rounded p-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Step-by-step</p>
              <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[11px] leading-relaxed">{f.implementation}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Renders all audit sections from the stored auditData */
function AuditFindingsPanel({ auditData }: { auditData: AuditData }) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const sections = auditData.sections ?? [];

  if (sections.length === 0) return (
    <div className="rounded-lg border border-slate-700/40 bg-slate-800/30 px-4 py-3 text-xs text-slate-500">
      No detailed findings attached to this submission.
    </div>
  );

  const allFindings = sections.flatMap((s) => s.findings);
  const counts = {
    critical: allFindings.filter((f) => f.severity === 'critical').length,
    high:     allFindings.filter((f) => f.severity === 'high').length,
    medium:   allFindings.filter((f) => f.severity === 'medium').length,
    low:      allFindings.filter((f) => f.severity === 'low').length,
  };

  return (
    <div className="space-y-3">
      {/* Score strip */}
      {auditData.overallScore !== undefined && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-700/40 bg-slate-900/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black" style={{ color: auditData.overallScore >= 70 ? '#36e0a0' : auditData.overallScore >= 50 ? '#ffd24d' : '#ff4d6d' }}>
              {auditData.grade}
            </span>
            <span className="text-lg font-bold text-white">{auditData.overallScore}<span className="text-xs text-slate-500">/100</span></span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {counts.critical > 0 && <span className="rounded px-2 py-0.5 bg-red-500/20 text-red-300"> -  {counts.critical} Critical</span>}
            {counts.high     > 0 && <span className="rounded px-2 py-0.5 bg-orange-500/20 text-orange-300">🟠 {counts.high} High</span>}
            {counts.medium   > 0 && <span className="rounded px-2 py-0.5 bg-yellow-500/20 text-yellow-300">🟡 {counts.medium} Medium</span>}
            {counts.low      > 0 && <span className="rounded px-2 py-0.5 bg-blue-500/20 text-blue-300"> -  {counts.low} Low</span>}
          </div>
          {auditData.generatedAt && (
            <span className="ml-auto text-[10px] text-slate-600">
              Audited {new Date(auditData.generatedAt).toLocaleString()}
            </span>
          )}
        </div>
      )}

      {/* Summary */}
      {auditData.summary && (
        <p className="text-xs text-slate-400 px-1">{auditData.summary}</p>
      )}

      {/* Sections */}
      {sections.map((sec) => {
        const isOpen = openSection === sec.name;
        const nonPassFindings = sec.findings.filter((f) => f.severity !== 'pass');
        return (
          <div key={sec.name} className="rounded-lg border border-slate-700/40 overflow-hidden">
            <button
              onClick={() => setOpenSection(isOpen ? null : sec.name)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-800/40 transition"
            >
              {/* Score bar */}
              <div className="relative h-1.5 w-16 shrink-0 rounded-full bg-slate-700">
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: `${sec.score}%`,
                    background: sec.score >= 80 ? '#36e0a0' : sec.score >= 60 ? '#ffd24d' : '#ff4d6d',
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-white flex-1">{sec.name}</span>
              <span className="text-[10px] text-slate-500">{sec.score}/100</span>
              {nonPassFindings.length > 0 && (
                <span className="rounded bg-slate-700/60 px-1.5 py-0.5 text-[10px] text-slate-300">
                  {nonPassFindings.length} issue{nonPassFindings.length !== 1 ? 's' : ''}
                </span>
              )}
              <ChevronDown className={`h-3.5 w-3.5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="border-t border-slate-700/40 bg-slate-900/40 px-4 py-3">
                {nonPassFindings.length === 0 ? (
                  <p className="text-xs text-emerald-400">✓ No issues found in this section.</p>
                ) : (
                  nonPassFindings.map((f) => <FindingCard key={f.id} f={f} />)
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/*  -  -  -  Main page  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
export default function AdminAuditsPage() {
  const [submissions, setSubmissions] = useState<AuditSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Record<number, 'details' | 'findings'>>({});
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ status: '', adminNotes: '', proposedSolution: '' });

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      let url = '/api/admin/audits';
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (priorityFilter) params.append('priority', priorityFilter);
      if (params.toString()) url += '?' + params.toString();
      const response = await fetch(url);
      const data = await response.json();
      setSubmissions(data.submissions || []);
      setError('');
    } catch (err) {
      setError('Failed to load audit submissions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubmissions(); }, [statusFilter, priorityFilter]);

  const handleUpdateSubmission = async (id: number) => {
    try {
      const response = await fetch('/api/admin/audits', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editData }),
      });
      if (!response.ok) throw new Error('Failed to update');
      setEditingId(null);
      fetchSubmissions();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getTab = (id: number) => activeTab[id] ?? 'details';
  const setTab = (id: number, tab: 'details' | 'findings') =>
    setActiveTab((prev) => ({ ...prev, [id]: tab }));

  const filteredSubmissions = submissions.filter((sub) => {
    if (statusFilter && sub.status !== statusFilter) return false;
    if (priorityFilter && sub.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Audit Submissions</h1>
          <p className="mt-1 text-slate-400">Client audit fix requests  - findings &amp; solutions included</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="quoted">Quoted</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
          >
            <option value="">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 border border-red-400/30 px-4 py-3 text-red-300">
            {error}
          </div>
        )}

        {/* Submissions list */}
        <div className="space-y-4">
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading submissions…</div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="p-8 rounded-lg border border-slate-700/50 bg-slate-900/50 text-center text-slate-400">
              No submissions match your filters.
            </div>
          ) : (
            filteredSubmissions.map((submission) => {
              const auditData: AuditData | null =
                typeof submission.auditData === 'string'
                  ? (() => { try { return JSON.parse(submission.auditData); } catch { return null; } })()
                  : submission.auditData;

              const hasSections = Array.isArray(auditData?.sections) && (auditData?.sections?.length ?? 0) > 0;
              const isExpanded = expandedId === submission.id;
              const tab = getTab(submission.id);

              return (
                <div
                  key={submission.id}
                  className="rounded-lg border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm overflow-hidden hover:border-cyan-400/30 transition"
                >
                  {/* Summary row */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : submission.id)}
                    className="w-full px-6 py-4 text-left hover:bg-slate-800/50 transition flex items-start justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{submission.userName}</h3>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${priorityColors[submission.priority].bg} ${priorityColors[submission.priority].text}`}>
                          {priorityColors[submission.priority].label}
                        </span>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColors[submission.status].bg} ${statusColors[submission.status].text}`}>
                          {statusColors[submission.status].label}
                        </span>
                        {hasSections && (
                          <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                            📊 Audit attached
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">{submission.userEmail}</p>
                      {submission.website && (
                        <p className="text-xs text-slate-500 mt-1">🌐 {submission.website}</p>
                      )}
                    </div>
                    <div className="text-right flex flex-col items-end gap-1 shrink-0">
                      <p className="text-xs text-slate-400">{new Date(submission.createdAt).toLocaleDateString()}</p>
                      <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="border-t border-slate-700/50 bg-slate-800/20">

                      {/* Tabs  - only show Findings tab when sections exist */}
                      <div className="flex border-b border-slate-700/40">
                        <button
                          onClick={() => setTab(submission.id, 'details')}
                          className={`px-5 py-2.5 text-xs font-semibold transition border-b-2 ${
                            tab === 'details'
                              ? 'border-cyan-400 text-cyan-300'
                              : 'border-transparent text-slate-400 hover:text-white'
                          }`}
                        >
                          Client Details
                        </button>
                        <button
                          onClick={() => setTab(submission.id, 'findings')}
                          className={`px-5 py-2.5 text-xs font-semibold transition border-b-2 flex items-center gap-1.5 ${
                            tab === 'findings'
                              ? 'border-cyan-400 text-cyan-300'
                              : 'border-transparent text-slate-400 hover:text-white'
                          }`}
                        >
                          Audit Findings &amp; Fixes
                          {hasSections && (
                            <span className="rounded-full bg-cyan-500/25 px-1.5 py-0.5 text-[10px] text-cyan-400">
                              {(auditData?.sections ?? []).reduce((n, s) => n + s.findings.filter(f => f.severity !== 'pass').length, 0)}
                            </span>
                          )}
                        </button>
                      </div>

                      {/* Tab: Client Details */}
                      {tab === 'details' && (
                        <div className="px-6 py-4 space-y-4">
                          {/* Contact info grid */}
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-xs font-semibold text-slate-400 mb-1">PHONE</p>
                              <p className="text-white">{submission.userPhone || ' -'}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-400 mb-1">COMPANY</p>
                              <p className="text-white">{submission.userCompany || ' -'}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-400 mb-1">PREFERRED CONTACT</p>
                              <p className="text-white">{submission.preferredContact.toUpperCase()}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-400 mb-1">BUDGET RANGE</p>
                              <p className="text-white">{submission.budgetEstimate || ' -'}</p>
                            </div>
                          </div>

                          {/* Issues the client wants fixed */}
                          {submission.specificIssues && (
                            <div>
                              <p className="text-xs font-semibold text-slate-400 mb-2">CLIENT DESCRIPTION OF ISSUES</p>
                              <p className="text-slate-300 text-sm whitespace-pre-wrap bg-slate-800/50 rounded-lg p-3">
                                {submission.specificIssues}
                              </p>
                            </div>
                          )}

                          {/* Admin response area */}
                          {editingId === submission.id ? (
                            <div className="space-y-3">
                              <div>
                                <label className="text-xs font-semibold text-slate-400 mb-1 block">STATUS</label>
                                <select
                                  value={editData.status}
                                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                  className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-white outline-none focus:border-cyan-400/60"
                                >
                                  <option value="new">New</option>
                                  <option value="reviewed">Reviewed</option>
                                  <option value="quoted">Quoted</option>
                                  <option value="in_progress">In Progress</option>
                                  <option value="completed">Completed</option>
                                  <option value="archived">Archived</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-400 mb-1 block">ADMIN NOTES (internal)</label>
                                <textarea
                                  value={editData.adminNotes}
                                  onChange={(e) => setEditData({ ...editData, adminNotes: e.target.value })}
                                  className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-white outline-none focus:border-cyan-400/60 resize-none"
                                  rows={3}
                                  placeholder="Internal notes…"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-400 mb-1 block">PROPOSED SOLUTION / QUOTE</label>
                                <textarea
                                  value={editData.proposedSolution}
                                  onChange={(e) => setEditData({ ...editData, proposedSolution: e.target.value })}
                                  className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-white outline-none focus:border-cyan-400/60 resize-none"
                                  rows={5}
                                  placeholder="Describe the work scope, timeline, and cost estimate…"
                                />
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleUpdateSubmission(submission.id)}
                                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700 transition"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="flex-1 rounded-lg border border-slate-600 px-4 py-2 font-semibold text-slate-300 hover:bg-white/10 transition"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              {submission.adminNotes && (
                                <div>
                                  <p className="text-xs font-semibold text-slate-400 mb-2">ADMIN NOTES</p>
                                  <p className="text-slate-300 text-sm whitespace-pre-wrap bg-slate-800/50 rounded-lg p-3">
                                    {submission.adminNotes}
                                  </p>
                                </div>
                              )}
                              {submission.proposedSolution && (
                                <div>
                                  <p className="text-xs font-semibold text-slate-400 mb-2">PROPOSED SOLUTION / QUOTE</p>
                                  <p className="text-slate-300 text-sm whitespace-pre-wrap bg-slate-800/50 rounded-lg p-3">
                                    {submission.proposedSolution}
                                  </p>
                                </div>
                              )}
                              <button
                                onClick={() => {
                                  setEditingId(submission.id);
                                  setEditData({
                                    status: submission.status,
                                    adminNotes: submission.adminNotes || '',
                                    proposedSolution: submission.proposedSolution || '',
                                  });
                                }}
                                className="w-full rounded-lg bg-cyan-500/20 px-4 py-2 font-semibold text-cyan-300 hover:bg-cyan-500/30 transition"
                              >
                                ✏️ Edit Response
                              </button>
                            </>
                          )}
                        </div>
                      )}

                      {/* Tab: Audit Findings & Fixes */}
                      {tab === 'findings' && (
                        <div className="px-6 py-4">
                          {hasSections && auditData ? (
                            <AuditFindingsPanel auditData={auditData} />
                          ) : (
                            <div className="rounded-lg border border-slate-700/40 bg-slate-800/30 px-5 py-6 text-center">
                              <p className="text-slate-400 text-sm">No audit findings attached to this submission.</p>
                              <p className="text-slate-600 text-xs mt-1">
                                This happens when the client submitted a fix request without running the audit tool first,
                                or before the fix was deployed. Ask the client to re-run the audit and resubmit.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
