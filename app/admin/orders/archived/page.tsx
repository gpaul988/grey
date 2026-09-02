import db from '@/Admin/db';
import { requireAdminSession } from '@/lib/admin/server-auth';

export const dynamic = 'force-dynamic';

export default async function ArchivedOrdersPage() {
  await requireAdminSession();
  const orders = (db.prepare(
    `SELECT id, order_number, total, status, updated_at AS updatedAt
     FROM orders
     WHERE status = 'cancelled'
     ORDER BY updated_at DESC`
  ).all() as Array<{ id: number; order_number: string; total: number; status: string; updatedAt: string }> );

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/40">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Orders</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Archived / Cancelled orders</h1>
      </header>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Trash / Archived</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr className="border-b border-slate-800">
                <th className="pb-3 pr-4 font-medium">Order</th>
                <th className="pb-3 pr-4 font-medium">Total</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr id={`row-orders-${o.id}`} key={o.id} className="border-b border-slate-800/70 last:border-b-0">
                  <td className="py-3 pr-4 font-medium text-white">{o.order_number}</td>
                  <td className="py-3 pr-4 text-slate-300">{formatMoney(o.total)}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs capitalize text-slate-200">{o.status}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <div>
                      <script type="module" src="/js/restore-loader.js"></script>
                      <div data-restore-entity="orders" data-restore-id={o.id} className="restore-mount" />
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
