'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Clock, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';

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
  createdAt: string;
  respondedAt: string | null;
}

const priorityColors = {
  low: { bg: 'bg-blue-500/20', text: 'text-blue-300', label: '🟢 Low' },
  medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', label: '🟡 Medium' },
  high: { bg: 'bg-orange-500/20', text: 'text-orange-300', label: '🔴 High' },
  critical: { bg: 'bg-red-500/20', text: 'text-red-300', label: '🔥 Critical' },
};

const statusColors = {
  new: { bg: 'bg-blue-500/20', text: 'text-blue-300', label: 'New' },
  reviewed: { bg: 'bg-purple-500/20', text: 'text-purple-300', label: 'Reviewed' },
  quoted: { bg: 'bg-cyan-500/20', text: 'text-cyan-300', label: 'Quoted' },
  in_progress: { bg: 'bg-indigo-500/20', text: 'text-indigo-300', label: 'In Progress' },
  completed: { bg: 'bg-emerald-500/20', text: 'text-emerald-300', label: 'Completed' },
  archived: { bg: 'bg-slate-500/20', text: 'text-slate-300', label: 'Archived' },
};

export default function AdminAuditsPage() {
  const [submissions, setSubmissions] = useState<AuditSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ status: '', adminNotes: '', proposedSolution: '' });

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter, priorityFilter]);

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
    } catch (err: any) {
      setError(err.message);
    }
  };

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
          <p className="mt-1 text-slate-400">Manage client audit fix requests</p>
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

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 border border-red-400/30 px-4 py-3 text-red-300">
            {error}
          </div>
        )}

        {/* Submissions List */}
        <div className="space-y-4">
          {loading ? (
            <div className="p-8 text-center text-slate-400">
              Loading submissions...
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="p-8 rounded-lg border border-slate-700/50 bg-slate-900/50 text-center text-slate-400">
              No submissions match your filters.
            </div>
          ) : (
            filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="rounded-lg border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm overflow-hidden hover:border-cyan-400/30 transition"
              >
                {/* Summary */}
                <button
                  onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                  className="w-full px-6 py-4 text-left hover:bg-slate-800/50 transition flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{submission.userName}</h3>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${priorityColors[submission.priority].bg} ${priorityColors[submission.priority].text}`}>
                        {priorityColors[submission.priority].label}
                      </span>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColors[submission.status].bg} ${statusColors[submission.status].text}`}>
                        {statusColors[submission.status].label}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{submission.userEmail}</p>
                    {submission.website && (
                      <p className="text-xs text-slate-500 mt-1">🌐 {submission.website}</p>
                    )}
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <p className="text-xs text-slate-400">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </p>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-500 transition-transform ${
                        expandedId === submission.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Details */}
                {expandedId === submission.id && (
                  <div className="border-t border-slate-700/50 px-6 py-4 space-y-4 bg-slate-800/20">
                    {/* Contact Info */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold text-slate-400 mb-1">PHONE</p>
                        <p className="text-white">{submission.userPhone || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 mb-1">COMPANY</p>
                        <p className="text-white">{submission.userCompany || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 mb-1">PREFERRED CONTACT</p>
                        <p className="text-white">{submission.preferredContact.toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 mb-1">BUDGET RANGE</p>
                        <p className="text-white">{submission.budgetEstimate || '—'}</p>
                      </div>
                    </div>

                    {/* Issues */}
                    {submission.specificIssues && (
                      <div>
                        <p className="text-xs font-semibold text-slate-400 mb-2">SPECIFIC ISSUES</p>
                        <p className="text-slate-300 text-sm whitespace-pre-wrap">
                          {submission.specificIssues}
                        </p>
                      </div>
                    )}

                    {/* Admin Notes & Solution */}
                    {editingId === submission.id ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-400 mb-1 block">
                            STATUS
                          </label>
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
                          <label className="text-xs font-semibold text-slate-400 mb-1 block">
                            ADMIN NOTES
                          </label>
                          <textarea
                            value={editData.adminNotes}
                            onChange={(e) => setEditData({ ...editData, adminNotes: e.target.value })}
                            className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-white outline-none focus:border-cyan-400/60 resize-none"
                            rows={3}
                            placeholder="Internal notes..."
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-400 mb-1 block">
                            PROPOSED SOLUTION
                          </label>
                          <textarea
                            value={editData.proposedSolution}
                            onChange={(e) => setEditData({ ...editData, proposedSolution: e.target.value })}
                            className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-white outline-none focus:border-cyan-400/60 resize-none"
                            rows={4}
                            placeholder="What we will do to fix..."
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
                            <p className="text-xs font-semibold text-slate-400 mb-2">PROPOSED SOLUTION</p>
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
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
