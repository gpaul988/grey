'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import StoreShell from '@/components/store/StoreShell';
import { useStore } from '@/components/store/StoreContext';
import { api } from '@/components/store/lib';

export default function LoginPage() {
    return <StoreShell title="Sign In"><LoginInner /></StoreShell>;
}

function LoginInner() {
    const router = useRouter();
    const { refreshAuth } = useStore();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); setLoading(true);
        try {
            await api('/api/store/auth/login', { method: 'POST', body: JSON.stringify(form) });
            await refreshAuth();
            const next = (router.query.next as string) || '/store/account';
            router.push(next);
        } catch (e) { setError((e as Error).message); setLoading(false); }
    };

    return (
        <div className="max-w-md mx-auto st-card p-8">
            <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
            <p className="text-[var(--st-muted)] text-sm mb-6">Sign in to your Grey TechStore account.</p>
            <form onSubmit={submit} className="space-y-4">
                <input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="st-input" />
                <input type="password" required placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="st-input" />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button disabled={loading} className="st-btn w-full py-3">{loading ? 'Signing in…' : 'Sign In'}</button>
            </form>
            <p className="text-sm text-[var(--st-muted)] mt-5 text-center">
                No account? <Link href={`/store/account/register${router.query.next ? `?next=${router.query.next}` : ''}`} className="text-[var(--st-teal)] font-semibold">Create one</Link>
            </p>
        </div>
    );
}
