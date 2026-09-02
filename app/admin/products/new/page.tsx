'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    sku: '',
    price: '0',
    stock: '0',
    status: 'draft',
    description: '',
    featured: false,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      router.push('/admin/products');
      return;
    }
    alert('Unable to create product.');
  };

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Products</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Create product</h1>
      </header>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-200">
            <span>Product name</span>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" required />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>SKU</span>
            <input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>Price</span>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" required />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>Stock</span>
            <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" required />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>Status</span>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white">
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-slate-200">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured item
          </label>
        </div>

        <label className="mt-5 block space-y-2 text-sm text-slate-200">
          <span>Description</span>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-32 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" />
        </label>

        <div className="mt-6 flex items-center gap-3">
          <button type="submit" disabled={saving} className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 disabled:opacity-50">
            {saving ? 'Saving...' : 'Create product'}
          </button>
          <button type="button" onClick={() => router.back()} className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm text-slate-200">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
