'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function CustomerDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [customer, setCustomer] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/admin/customers/${params.id}`);
      if (!res.ok) return;
      const payload = await res.json();
      setCustomer(payload.data);
    };
    load();
  }, [params.id]);

  const save = async () => {
    setSaving(true);
    const res = await fetch(`/api/admin/customers/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
    setSaving(false);
    if (res.ok) {
      router.push('/admin/customers');
    }
  };

  if (!customer) return <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 text-slate-200">Loading customer…</div>;

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Customers</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Customer management</h1>
      </header>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-200">
            <span>First name</span>
            <input value={customer.first_name || ''} onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>Last name</span>
            <input value={customer.last_name || ''} onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>Email</span>
            <input type="email" value={customer.email || ''} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>Phone</span>
            <input value={customer.phone || ''} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>City</span>
            <input value={customer.city || ''} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>State</span>
            <input value={customer.state || ''} onChange={(e) => setCustomer({ ...customer, state: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-200 md:col-span-2">
            <span>Country</span>
            <input value={customer.country || ''} onChange={(e) => setCustomer({ ...customer, country: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
          </label>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button type="button" onClick={save} disabled={saving} className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-slate-950 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save customer'}
          </button>
          <button type="button" onClick={() => router.push('/admin/customers')} className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm text-slate-200">
            Back
          </button>
          <button type="button" onClick={async () => {
            if (!confirm('Delete this customer? This will remove their orders and cannot be undone.')) return;
            try {
              const res = await fetch(`/api/admin/customers/${params.id}`, { method: 'DELETE' });
              if (res.ok) router.push('/admin/customers');
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
