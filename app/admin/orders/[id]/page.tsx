'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/admin/orders/${params.id}`);
      if (!res.ok) return;
      const payload = await res.json();
      setOrder(payload.data);
    };
    load();
  }, [params.id]);

  const save = async () => {
    setSaving(true);
    const res = await fetch(`/api/admin/orders/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: order.status,
        payment_status: order.payment_status,
        payment_method: order.payment_method,
        payment_ref: order.payment_ref,
      }),
    });
    setSaving(false);
    if (res.ok) router.push('/admin/orders');
  };

  if (!order) return <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 text-slate-200">Loading order…</div>;

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Orders</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Order #{order.order_number}</h1>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              <span>Status</span>
              <select value={order.status || 'pending'} onChange={(e) => setOrder({ ...order, status: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white">
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              <span>Payment status</span>
              <select value={order.payment_status || 'unpaid'} onChange={(e) => setOrder({ ...order, payment_status: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white">
                <option value="unpaid">Unpaid</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </label>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              <span>Payment method</span>
              <input value={order.payment_method || ''} onChange={(e) => setOrder({ ...order, payment_method: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              <span>Payment reference</span>
              <input value={order.payment_ref || ''} onChange={(e) => setOrder({ ...order, payment_ref: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
            </label>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button type="button" onClick={save} disabled={saving} className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 disabled:opacity-50">
              {saving ? 'Saving...' : 'Update order'}
            </button>
            <button type="button" onClick={() => router.push('/admin/orders')} className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm text-slate-200">
              Back
            </button>
              <button type="button" onClick={async () => {
                if (!confirm('Delete this order? This action cannot be undone.')) return;
                try {
                  const res = await fetch(`/api/admin/orders/${params.id}`, { method: 'DELETE' });
                  if (res.ok) router.push('/admin/orders');
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

        <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6">
          <h2 className="text-lg font-semibold text-white">Items</h2>
          <div className="mt-4 space-y-3">
            {(order.items || []).map((item: any) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                <div>
                  <div className="font-medium text-white">{item.product_name}</div>
                  <div className="text-xs text-slate-400">Qty {item.quantity}</div>
                </div>
                <div className="text-sm font-semibold text-slate-100">₦{Number(item.total_price || 0).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
