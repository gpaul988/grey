'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCustomerPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: 'Nigeria',
    status: 'active',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const res = await fetch('/api/admin/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      router.push('/admin/customers');
      return;
    }
    alert('Unable to create customer.');
  };

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Customers</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Add customer</h1>
      </header>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-200">
            <span>First name</span>
            <input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" required />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>Last name</span>
            <input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" required />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>Email</span>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>Phone</span>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" required />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>City</span>
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>State</span>
            <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-200 md:col-span-2">
            <span>Country</span>
            <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
          </label>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button type="submit" disabled={saving} className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-slate-950 disabled:opacity-50">
            {saving ? 'Saving...' : 'Create customer'}
          </button>
          <button type="button" onClick={() => router.back()} className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm text-slate-200">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
