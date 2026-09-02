import db from '@/Admin/db';
import { requireAdminSession } from '@/lib/admin/server-auth';

export const dynamic = 'force-dynamic';

export default async function ActivityPage() {
  await requireAdminSession();
  const rows = db.prepare('SELECT id, user_name, action, entity, entity_id, detail, created_at FROM activity_log ORDER BY created_at DESC LIMIT 100').all() as Array<{ id: number; user_name: string | null; action: string; entity: string | null; entity_id: number | null; detail: string | null; created_at: string }>;

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Activity</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Audit log</h1>
      </header>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent admin actions</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr className="border-b border-slate-800">
                <th className="pb-3 pr-4 font-medium">When</th>
                <th className="pb-3 pr-4 font-medium">User</th>
                <th className="pb-3 pr-4 font-medium">Action</th>
                <th className="pb-3 pr-4 font-medium">Entity</th>
                <th className="pb-3 pr-4 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-slate-800/70 last:border-b-0">
                  <td className="py-3 pr-4 text-slate-300">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="py-3 pr-4 font-medium text-white">{r.user_name ?? 'system'}</td>
                  <td className="py-3 pr-4 text-slate-200">{r.action}</td>
                  <td className="py-3 pr-4 text-slate-200">{r.entity}{r.entity_id ? ` #${r.entity_id}` : ''}</td>
                  <td className="py-3 pr-4 text-slate-300">{r.detail ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
