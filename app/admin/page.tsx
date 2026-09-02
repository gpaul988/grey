import Link from 'next/link';
import { Activity, ArrowUpRight, DollarSign, PackageCheck, ShoppingCart, Users } from 'lucide-react';

import { getAdminDashboardSummary } from '@/lib/admin/dashboard-data';
import { requireAdminSession } from '@/lib/admin/server-auth';

const toneClasses = {
  sky: 'border-sky-500/30 bg-sky-500/10 text-sky-100',
  emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100',
  violet: 'border-violet-500/30 bg-violet-500/10 text-violet-100',
  amber: 'border-amber-500/30 bg-amber-500/10 text-amber-100',
  rose: 'border-rose-500/30 bg-rose-500/10 text-rose-100',
} as const;

const statIcons = {
  sky: ShoppingCart,
  emerald: DollarSign,
  violet: Users,
  amber: PackageCheck,
  rose: Activity,
} as const;

function formatMoney(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);
}

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  await requireAdminSession();
  const dashboard = await getAdminDashboardSummary();

  return (
    <div className="space-y-6 text-slate-100">
      <header className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Operations overview</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Backend admin dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/orders" className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white">
            Review orders
          </Link>
          <Link href="/admin/products" className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
            Manage catalog
          </Link>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {dashboard.kpis.map((item) => {
          const Icon = statIcons[item.tone];
          return (
            <div key={item.label} className={`rounded-2xl border p-4 ${toneClasses[item.tone]}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.22em] text-slate-300">{item.label}</span>
                <div className="rounded-lg border border-white/10 bg-slate-950/20 p-2">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold text-white">{item.value}</div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-200">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-300">
                  <ArrowUpRight className="h-3 w-3" />
                  {item.delta}
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-300">{item.detail}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.55fr_0.95fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5 shadow-xl shadow-slate-950/35">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Revenue</p>
              <h2 className="text-xl font-semibold text-white">Last 7 days</h2>
            </div>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300">
              +{dashboard.kpis[0]?.delta ?? '0%'}
            </span>
          </div>

          <div className="grid h-52 grid-cols-7 items-end gap-2">
            {dashboard.revenueSeries.map((point) => {
              const maxRevenue = Math.max(...dashboard.revenueSeries.map((row) => row.revenue), 1);
              const height = Math.max((point.revenue / maxRevenue) * 100, 8);
              return (
                <div key={point.label} className="flex h-full flex-col items-center justify-end gap-2">
                  <div className="flex w-full items-end justify-center rounded-t-2xl bg-gradient-to-t from-sky-500 to-cyan-300/80" style={{ height: `${height}%` }} title={`${point.label}: ${formatMoney(point.revenue)}`} />
                  <div className="text-center text-[10px] text-slate-400">{point.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5 shadow-xl shadow-slate-950/35">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Channel mix</p>
              <h2 className="text-xl font-semibold text-white">Order status</h2>
            </div>
          </div>
          <div className="space-y-4">
            {dashboard.orderStatus.map((status) => {
              const total = dashboard.orderStatus.reduce((sum, item) => sum + item.value, 0) || 1;
              const pct = (status.value / total) * 100;
              return (
                <div key={status.name}>
                  <div className="mb-1 flex items-center justify-between text-sm text-slate-300">
                    <span className="capitalize">{status.name}</span>
                    <span>{status.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: status.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5 shadow-xl shadow-slate-950/35">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Transactions</p>
              <h2 className="text-xl font-semibold text-white">Recent orders</h2>
            </div>
            <Link href="/admin/orders" className="text-sm text-sky-300 hover:text-sky-200">Manage all</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr className="border-b border-slate-800">
                  <th className="pb-3 pr-4 font-medium">Order</th>
                  <th className="pb-3 pr-4 font-medium">Customer</th>
                  <th className="pb-3 pr-4 font-medium">Amount</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-800/70 text-slate-200 last:border-b-0">
                    <td className="py-3 pr-4 font-medium text-white">{order.orderNumber}</td>
                    <td className="py-3 pr-4">{order.customer}</td>
                    <td className="py-3 pr-4">{formatMoney(order.total)}</td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs capitalize text-slate-100">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5 shadow-xl shadow-slate-950/35">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Catalog</p>
              <h2 className="text-xl font-semibold text-white">Inventory watchlist</h2>
            </div>
            <Link href="/admin/products" className="text-sm text-sky-300 hover:text-sky-200">Open stock</Link>
          </div>

          <div className="space-y-3">
            {dashboard.lowStock.length > 0 ? dashboard.lowStock.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3">
                <div>
                  <div className="font-medium text-white">{item.name}</div>
                  <div className="text-xs text-slate-400">SKU {item.sku}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-amber-300">{item.stock} left</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{item.status}</div>
                </div>
              </div>
            )) : <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-300">No SKUs are running low.</div>}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5 shadow-xl shadow-slate-950/35">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Performance</p>
              <h2 className="text-xl font-semibold text-white">Top products</h2>
            </div>
          </div>
          <div className="space-y-3">
            {dashboard.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sm font-bold text-sky-300">#{index + 1}</div>
                  <div>
                    <div className="font-medium text-white">{product.name}</div>
                    <div className="text-xs text-slate-400">{product.sold} sold</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">{formatMoney(product.revenue)}</div>
                  <div className="text-xs text-slate-400">{product.stock} in stock</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5 shadow-xl shadow-slate-950/35">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Activity</p>
              <h2 className="text-xl font-semibold text-white">Recent activity</h2>
            </div>
          </div>
          <div className="space-y-3">
            {dashboard.recentActivity.map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium text-white capitalize">{entry.action}</div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{entry.entity}</span>
                </div>
                <div className="mt-2 text-sm text-slate-300">{entry.actor}</div>
                <div className="mt-1 text-xs text-slate-400">{new Date(entry.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
