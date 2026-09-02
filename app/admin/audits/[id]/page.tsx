'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function AuditReviewPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [audit, setAudit] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/admin/audits/${params.id}`);
      if (!res.ok) return;
      const payload = await res.json();
      setAudit(payload.data);
    };
    load();
  }, [params.id]);

  const save = async () => {
    setSaving(true);
    const res = await fetch(`/api/admin/audits/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: audit.status,
        admin_notes: audit.admin_notes,
        proposed_solution: audit.proposed_solution,
      }),
    });
    setSaving(false);
    if (res.ok) router.push('/admin/audits');
  };

  if (!audit) return <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 text-slate-200">Loading audit review…</div>;

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">Audit review</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Review audit #{audit.id}</h1>
      </header>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-200">
            <span>Submission status</span>
            <select value={audit.status || 'new'} onChange={(e) => setAudit({ ...audit, status: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white">
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="quoted">Quoted</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </label>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300">
            <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Client</div>
            <div className="mt-2 font-medium text-white">{audit.user_name || 'Customer'}</div>
            <div className="mt-1 text-slate-300">{audit.user_email || 'No email'}</div>
          </div>
        </div>

        <label className="mt-5 block space-y-2 text-sm text-slate-200">
          <span>Admin notes</span>
          <textarea value={audit.admin_notes || ''} onChange={(e) => setAudit({ ...audit, admin_notes: e.target.value })} className="min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
        </label>

        <label className="mt-5 block space-y-2 text-sm text-slate-200">
          <span>Proposed solution</span>
          <textarea value={audit.proposed_solution || ''} onChange={(e) => setAudit({ ...audit, proposed_solution: e.target.value })} className="min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
        </label>

        <div className="mt-6 flex items-center gap-3">
          <button type="button" onClick={save} disabled={saving} className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 disabled:opacity-50">
            {saving ? 'Saving...' : 'Update review'}
          </button>
          <button type="button" onClick={() => router.push('/admin/audits')} className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm text-slate-200">
            Back
          </button>
          <button type="button" onClick={async () => {
            if (!confirm('Delete this audit submission?')) return;
            try {
              const res = await fetch(`/api/admin/audits/${params.id}`, { method: 'DELETE' });
              if (res.ok) router.push('/admin/audits');
              else {
                const err = await res.json();
                alert('Delete failed: ' + (err?.error || res.statusText));
              }
            } catch (e) {
              alert('Delete failed');
            }
          }} className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white">Delete</button>
        </div>
      </div>
    </div>
  );
}
