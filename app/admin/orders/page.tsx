import { getAdminDashboardSummary } from '@/lib/admin/dashboard-data';
import { requireAdminSession } from '@/lib/admin/server-auth';

const formatMoney = (amount: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  await requireAdminSession();
  const dashboard = await getAdminDashboardSummary();

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/40">
        <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Orders</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Order operations</h1>
      </header>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent transactions</h2>
          <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-300">
            {dashboard.recentOrders.length} visible
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr className="border-b border-slate-800">
                <th className="pb-3 pr-4 font-medium">Order</th>
                <th className="pb-3 pr-4 font-medium">Customer</th>
                <th className="pb-3 pr-4 font-medium">Amount</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Created</th>
                <th className="pb-3 pr-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-800/70 last:border-b-0">
                  <td className="py-3 pr-4 font-medium text-white">{order.orderNumber}</td>
                  <td className="py-3 pr-4 text-slate-200">{order.customer}</td>
                  <td className="py-3 pr-4 text-slate-100">{formatMoney(order.total)}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs capitalize text-slate-200">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-slate-300">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="py-3 pr-4">
                    <a href={`/admin/orders/${order.id}`} className="text-xs font-medium text-sky-300 hover:text-sky-200">Manage</a>
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
