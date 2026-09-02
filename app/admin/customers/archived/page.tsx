import db from '@/Admin/db';
import { requireAdminSession } from '@/lib/admin/server-auth';

export const dynamic = 'force-dynamic';

export default async function ArchivedCustomersPage() {
  await requireAdminSession();
  const customers = (db.prepare(
    `SELECT id, first_name, last_name, email, phone, status, updated_at AS updatedAt
     FROM customers
     WHERE status = 'deleted'
     ORDER BY updated_at DESC`
  ).all() as Array<{ id: number; first_name: string; last_name: string; email: string; phone: string; status: string; updatedAt: string }> );

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/40">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Customers</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Archived customers</h1>
      </header>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Trash / Archived</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr className="border-b border-slate-800">
                <th className="pb-3 pr-4 font-medium">Customer</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium">Phone</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr id={`row-customers-${c.id}`} key={c.id} className="border-b border-slate-800/70 last:border-b-0">
                  <td className="py-3 pr-4 font-medium text-white">{c.first_name} {c.last_name}</td>
                  <td className="py-3 pr-4 text-slate-300">{c.email}</td>
                  <td className="py-3 pr-4 text-slate-200">{c.phone ?? '—'}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs capitalize text-slate-200">{c.status}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <div>
                      <script type="module" src="/js/restore-loader.js"></script>
                      <div data-restore-entity="customers" data-restore-id={c.id} className="restore-mount" />
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
