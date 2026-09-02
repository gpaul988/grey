import db from '@/Admin/db';
import { requireAdminSession } from '@/lib/admin/server-auth';

export const dynamic = 'force-dynamic';

export default async function CustomersPage() {
  await requireAdminSession();
  const customers = (db.prepare(
    `SELECT id, first_name, last_name, email, phone, status, created_at AS createdAt
     FROM customers
     ORDER BY created_at DESC
     LIMIT 10`,
  ).all() as Array<{ id: number; first_name: string; last_name: string; email: string | null; phone: string | null; status: string; createdAt: string }>);

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/40">
        <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Customers</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Customer directory</h1>
      </header>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Top contacts</h2>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-300">
              {customers.length} records
            </span>
            <a href="/admin/customers/new" className="rounded-xl bg-violet-500 px-3 py-2 text-xs font-semibold text-slate-950">Add customer</a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr className="border-b border-slate-800">
                <th className="pb-3 pr-4 font-medium">Customer</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium">Phone</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Joined</th>
                <th className="pb-3 pr-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-slate-800/70 last:border-b-0">
                  <td className="py-3 pr-4 font-medium text-white">{customer.first_name} {customer.last_name}</td>
                  <td className="py-3 pr-4 text-slate-200">{customer.email ?? '—'}</td>
                  <td className="py-3 pr-4 text-slate-300">{customer.phone ?? '—'}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs capitalize text-emerald-300">
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-slate-300">{new Date(customer.createdAt).toLocaleString()}</td>
                  <td className="py-3 pr-4">
                    <a href={`/admin/customers/${customer.id}`} className="text-xs font-medium text-violet-300 hover:text-violet-200">Open</a>
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
