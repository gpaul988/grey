'use client';

import React, { useState } from 'react';
import { useRouter } from '@/lib/routerCompat';
import Link from 'next/link';
import StoreShell from '@/components/store/StoreShell';
import { useStore } from '@/components/store/StoreContext';
import { api } from '@/components/store/lib';

export default function RegisterPage() {
    return <StoreShell title="Create Account"><RegisterInner /></StoreShell>;
}

function RegisterInner() {
    const router = useRouter();
    const { refreshAuth } = useStore();
    const [form, setForm] = useState({
        first_name: '', last_name: '', email: '', phone: '', password: '',
        address: '', city: '', state: '', country: 'Nigeria', date_of_birth: '', gender: '',
    });
    const [error, setError] = useState('');
    const [emailTaken, setEmailTaken] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPw, setShowPw] = useState(false);
    const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); setEmailTaken(false); setLoading(true);
        try {
            await api('/api/store/auth/register', { method: 'POST', body: JSON.stringify(form) });
            await refreshAuth();
            router.push((router.query.next as string) || '/store/account');
        } catch (e) {
            const msg = (e as Error).message;
            setError(msg);
            if (/already exists/i.test(msg)) setEmailTaken(true);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto st-card p-8">
            <h1 className="text-2xl font-bold mb-1">Create your account</h1>
            <p className="text-[var(--st-muted)] text-sm mb-6">Save your details for faster checkout, track orders & build a wishlist.</p>
            <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
                <F l="First name *"><input required value={form.first_name} onChange={(e) => set('first_name', e.target.value)} className="st-input" /></F>
                <F l="Last name *"><input required value={form.last_name} onChange={(e) => set('last_name', e.target.value)} className="st-input" /></F>
                <F l="Email *"><input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} className="st-input" /></F>
                <F l="Phone *"><input required value={form.phone} onChange={(e) => set('phone', e.target.value)} className="st-input" /></F>
                <F l="Password *">
                    <div className="relative">
                        <input type={showPw ? 'text' : 'password'} required value={form.password} onChange={(e) => set('password', e.target.value)} className="st-input pr-16" placeholder="Min 6 characters" />
                        <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--st-teal)]">
                            {showPw ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </F>
                <F l="Date of birth"><input type="date" value={form.date_of_birth} onChange={(e) => set('date_of_birth', e.target.value)} className="st-input" /></F>
                <F l="Gender">
                    <select value={form.gender} onChange={(e) => set('gender', e.target.value)} className="st-input">
                        <option value="">Prefer not to say</option><option>Male</option><option>Female</option><option>Other</option>
                    </select>
                </F>
                <F l="Country"><input value={form.country} onChange={(e) => set('country', e.target.value)} className="st-input" /></F>
                <F l="Address" full><input value={form.address} onChange={(e) => set('address', e.target.value)} className="st-input" /></F>
                <F l="City"><input value={form.city} onChange={(e) => set('city', e.target.value)} className="st-input" /></F>
                <F l="State"><input value={form.state} onChange={(e) => set('state', e.target.value)} className="st-input" /></F>
                {error && <p className="text-red-400 text-sm sm:col-span-2">{error}</p>}
                {emailTaken && (
                    <div className="sm:col-span-2">
                        <Link href={`/store/account/login${form.email ? `?email=${encodeURIComponent(form.email)}` : ''}`} className="st-btn w-full py-3 block text-center">
                            Go to login
                        </Link>
                    </div>
                )}
                <div className="sm:col-span-2">
                    <button disabled={loading} className="st-btn w-full py-3">{loading ? 'Creating…' : 'Create Account'}</button>
                </div>
            </form>
            <p className="text-sm text-[var(--st-muted)] mt-5 text-center">
                Already have an account? <Link href="/store/account/login" className="text-[var(--st-teal)] font-semibold">Sign in</Link>
            </p>
        </div>
    );
}

function F({ l, children, full }: { l: string; children: React.ReactNode; full?: boolean }) {
    return <label className={`block ${full ? 'sm:col-span-2' : ''}`}><span className="text-xs text-[var(--st-muted)] mb-1 block">{l}</span>{children}</label>;
}
