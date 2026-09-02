'use client';

import { useState } from 'react';

export function RestoreButton({ entity, id }: { entity: string; id: number }) {
  const [loading, setLoading] = useState(false);
  const handle = async () => {
    if (!confirm('Restore this item?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${entity}/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ action: 'restore' }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.ok) {
        // Dispatch a DOM event so the hosting page can remove the row without reload
        try {
          const ev = new CustomEvent('restored', { detail: { entity, id } });
          window.dispatchEvent(ev);
          const toast = new CustomEvent('toast', { detail: { message: 'Restored.' } });
          window.dispatchEvent(toast);
        } catch (e) {
          // Fallback: reload
          location.reload();
        }
      } else {
        alert(json?.error || 'Restore failed');
      }
    } catch (err) {
      console.error(err);
      alert('Restore request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handle}
      disabled={loading}
      className="rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 disabled:opacity-50"
    >
      {loading ? 'Restoring…' : 'Restore'}
    </button>
  );
}
