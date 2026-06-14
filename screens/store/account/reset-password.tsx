'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from '@/lib/routerCompat';
import StoreShell from '@/components/store/StoreShell';
import {useStore} from '@/components/store/StoreContext';
import {api} from '@/components/store/lib';

export default function ResetPasswordPage() {
    return (
        <StoreShell title="Reset Password">
            <Inner />
        </StoreShell>
    );
}

function Inner() {
    const router = useRouter();
    const {refreshAuth} = useStore();
    const [token, setToken] = useState('');
    const [checking, setChecking] = useState(true);
    const [valid, setValid] = useState(false);
    const [form, setForm] = useState({password: '', confirm: ''});
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    // Read token from the URL on mount and verify it server-side.
    useEffect(() => {
        const t =
            typeof window !== 'undefined'
                ? new URLSearchParams(window.location.search).get('token') || ''
                : '';
        setToken(t);
        if (!t) {
            setChecking(false);
            setValid(false);
            return;
        }
        (async () => {
            try {
                const r = await api<{valid: boolean}>(
                    `/api/store/auth/reset-password?token=${encodeURIComponent(t)}`,
                );
                setValid(Boolean(r?.valid));
            } catch {
                setValid(false);
            } finally {
                setChecking(false);
            }
        })();
    }, []);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (form.password.length < 8) return setError('Password must be at least 8 characters.');
        if (form.password !== form.confirm) return setError('Passwords do not match.');
        setLoading(true);
        try {
            await api('/api/store/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify({token, password: form.password}),
            });
            await refreshAuth();
            setDone(true);
            setTimeout(() => router.push('/store/account'), 1400);
        } catch (err) {
            setError((err as Error).message);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto st-card p-8">
            <h1 className="text-2xl font-bold mb-1">Set a new password</h1>

            {checking ? (
                <p className="text-[var(--st-muted)] text-sm mt-4">Verifying your reset link…</p>
            ) : !valid ? (
                <div className="space-y-4 mt-2">
                    <p className="text-[var(--st-muted)] text-sm">
                        This reset link is invalid or has expired. Request a fresh one to continue.
                    </p>
                    <Link
                        href="/store/account/forgot-password"
                        className="st-btn w-full py-3 inline-flex justify-center"
                    >
                        Request a new link
                    </Link>
                </div>
            ) : done ? (
                <div className="rounded-lg border border-[var(--st-teal)]/40 bg-[var(--st-teal)]/10 p-4 text-sm mt-2">
                    Password updated — you&apos;re signed in. Redirecting to your account…
                </div>
            ) : (
                <>
                    <p className="text-[var(--st-muted)] text-sm mb-6">
                        Choose a strong password you don&apos;t use anywhere else.
                    </p>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="relative">
                            <input
                                type={showPw ? 'text' : 'password'}
                                required
                                placeholder="New password"
                                value={form.password}
                                onChange={(e) => setForm({...form, password: e.target.value})}
                                className="st-input pr-16"
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--st-teal)]"
                            >
                                {showPw ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <input
                            type={showPw ? 'text' : 'password'}
                            required
                            placeholder="Confirm new password"
                            value={form.confirm}
                            onChange={(e) => setForm({...form, confirm: e.target.value})}
                            className="st-input"
                            autoComplete="new-password"
                        />
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button disabled={loading} className="st-btn w-full py-3">
                            {loading ? 'Saving…' : 'Reset password'}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}
