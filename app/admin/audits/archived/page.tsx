import db from '@/Admin/db';
import { requireAdminSession } from '@/lib/admin/server-auth';

export const dynamic = 'force-dynamic';

export default async function ArchivedAuditsPage() {
  await requireAdminSession();
  const audits = (db.prepare(
    `SELECT id, title, status, created_at AS createdAt
     FROM audit_submissions
     WHERE status = 'archived'
     ORDER BY created_at DESC`
  ).all() as Array<{ id: number; title: string; status: string; createdAt: string }> );

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/40">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Audits</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Archived audits</h1>
      </header>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Trash / Archived</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr className="border-b border-slate-800">
                <th className="pb-3 pr-4 font-medium">Title</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {audits.map((a) => (
                <tr id={`row-audits-${a.id}`} key={a.id} className="border-b border-slate-800/70 last:border-b-0">
                  <td className="py-3 pr-4 font-medium text-white">{a.title}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs capitalize text-slate-200">{a.status}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <div>
                      <script type="module" src="/js/restore-loader.js"></script>
                      <div data-restore-entity="audits" data-restore-id={a.id} className="restore-mount" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
