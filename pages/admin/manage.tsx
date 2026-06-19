'use client';

/**
 * Unified admin "Add New" console.
 *
 * One page, entity tabs down the side, a dynamic form generated from the shared
 * schema (lib/admin/entitySchema). Submits to the generic create endpoint
 * /api/admin/create/:entity. Every entity persists to SQLite via Admin/models.
 */

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ENTITIES, type EntityDef, type FieldDef } from '@/lib/admin/entitySchema';

type FormState = Record<string, string | boolean>;

function defaultsFor(entity: EntityDef): FormState {
  const out: FormState = {};
  for (const f of entity.fields) {
    if (f.type === 'checkbox') out[f.name] = Boolean(f.default);
    else out[f.name] = f.default !== undefined ? String(f.default) : '';
  }
  return out;
}

export default function AdminManagePage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const initialKey =
    (typeof router.query.tab === 'string' &&
      ENTITIES.find((e) => e.key === router.query.tab)?.key) ||
    ENTITIES[0].key;
  const [activeKey, setActiveKey] = useState(initialKey);
  const [form, setForm] = useState<FormState>(
    () => defaultsFor(ENTITIES.find((e) => e.key === initialKey) ?? ENTITIES[0]),
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const entity = useMemo(
    () => ENTITIES.find((e) => e.key === activeKey) ?? ENTITIES[0],
    [activeKey],
  );

  // Auth gate
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('admin-token') : null;
    if (!stored) {
      router.push('/admin/login');
      return;
    }
    setToken(stored);
    fetch('/api/admin/auth/verify', { headers: { 'X-Admin-Token': stored } })
      .then((r) => {
        if (!r.ok) {
          localStorage.removeItem('admin-token');
          router.push('/admin/login');
          return;
        }
        setLoading(false);
      })
      .catch(() => router.push('/admin/login'));
  }, [router]);

  // Sync active tab when the ?tab= query changes (deep links).
  useEffect(() => {
    const t = router.query.tab;
    if (typeof t === 'string') {
      const match = ENTITIES.find((e) => e.key === t);
      if (match && match.key !== activeKey) {
        setActiveKey(match.key);
        setForm(defaultsFor(match));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.tab]);

  function selectEntity(key: string) {
    setActiveKey(key);
    const e = ENTITIES.find((x) => x.key === key)!;
    setForm(defaultsFor(e));
    setError(null);
    setSuccess(null);
  }

  function setField(name: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    // client-side required check
    const missing = entity.fields
      .filter((f) => f.required && !String(form[f.name] ?? '').trim())
      .map((f) => f.label);
    if (missing.length) {
      setError(`Required: ${missing.join(', ')}`);
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`/api/admin/create/${entity.key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
      setSuccess(`${entity.label} created successfully (id #${data.item?.id ?? '—'}).`);
      setForm(defaultsFor(entity));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div style={S.center}>
        <p style={{ color: '#64748b' }}>Loading…</p>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={S.shell}>
        {/* Sidebar */}
        <aside style={S.sidebar}>
          <div style={S.brand}>
            <span style={{ fontWeight: 800 }}>Grey</span>
            <span style={{ color: '#94a3b8' }}> Admin</span>
          </div>
          <Link href="/admin" style={S.back}>← Dashboard</Link>
          <nav style={{ marginTop: 16 }}>
            {ENTITIES.map((e) => (
              <button
                key={e.key}
                onClick={() => selectEntity(e.key)}
                style={{
                  ...S.tab,
                  ...(e.key === activeKey ? S.tabActive : {}),
                }}
              >
                {e.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Form panel */}
        <main style={S.main}>
          <header style={{ marginBottom: 20 }}>
            <h1 style={S.h1}>New {entity.label}</h1>
            {entity.hint && <p style={S.hint}>{entity.hint}</p>}
          </header>

          {error && <div style={{ ...S.banner, ...S.bannerErr }}>{error}</div>}
          {success && <div style={{ ...S.banner, ...S.bannerOk }}>{success}</div>}

          <form onSubmit={handleSubmit} style={S.form}>
            <div style={S.grid}>
              {entity.fields.map((f) => (
                <Field key={f.name} field={f} value={form[f.name]} onChange={setField} />
              ))}
            </div>
            <div style={S.actions}>
              <button type="button" onClick={() => setForm(defaultsFor(entity))} style={S.btnGhost}>
                Reset
              </button>
              <button type="submit" disabled={submitting} style={{ ...S.btn, ...(submitting ? S.btnDisabled : {}) }}>
                {submitting ? 'Saving…' : `Create ${entity.label}`}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string | boolean;
  onChange: (name: string, value: string | boolean) => void;
}) {
  const full = field.type === 'textarea' || field.type === 'json';
  return (
    <div style={{ ...S.field, ...(full ? { gridColumn: '1 / -1' } : {}) }}>
      <label style={S.label}>
        {field.label}
        {field.required && <span style={{ color: '#ef4444' }}> *</span>}
      </label>

      {field.type === 'textarea' || field.type === 'json' ? (
        <textarea
          value={String(value ?? '')}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
          rows={field.type === 'json' ? 4 : 3}
          style={S.input}
        />
      ) : field.type === 'select' ? (
        <select value={String(value ?? '')} onChange={(e) => onChange(field.name, e.target.value)} style={S.input}>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : field.type === 'checkbox' ? (
        <label style={S.checkRow}>
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(field.name, e.target.checked)}
          />
          <span style={{ color: '#475569' }}>Enabled</span>
        </label>
      ) : (
        <input
          type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
          value={String(value ?? '')}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
          style={S.input}
        />
      )}

      {field.help && <span style={S.help}>{field.help}</span>}
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#f1f5f9', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' },
  center: { minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f1f5f9' },
  shell: { display: 'flex', maxWidth: 1100, margin: '0 auto', minHeight: '100vh' },
  sidebar: { width: 220, background: '#0f172a', color: '#e2e8f0', padding: 20, flexShrink: 0 },
  brand: { fontSize: 20, marginBottom: 8 },
  back: { color: '#94a3b8', fontSize: 13, textDecoration: 'none' },
  tab: {
    display: 'block', width: '100%', textAlign: 'left', background: 'transparent',
    color: '#cbd5e1', border: 'none', padding: '9px 12px', borderRadius: 8,
    cursor: 'pointer', fontSize: 14, marginBottom: 2,
  },
  tabActive: { background: '#1e293b', color: '#fff', fontWeight: 600 },
  main: { flex: 1, padding: '28px 32px' },
  h1: { fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 },
  hint: { color: '#64748b', fontSize: 14, marginTop: 6 },
  form: { background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: '#334155' },
  input: {
    width: '100%', padding: '9px 11px', border: '1px solid #cbd5e1', borderRadius: 8,
    fontSize: 14, color: '#0f172a', background: '#fff', boxSizing: 'border-box',
  },
  checkRow: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 },
  help: { fontSize: 12, color: '#94a3b8' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 },
  btn: { background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 14 },
  btnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  btnGhost: { background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', padding: '10px 18px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 14 },
  banner: { padding: '11px 14px', borderRadius: 8, marginBottom: 16, fontSize: 14 },
  bannerErr: { background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' },
  bannerOk: { background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' },
};
