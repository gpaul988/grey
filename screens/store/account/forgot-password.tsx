'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import StoreShell from '@/components/store/StoreShell';
import {api} from '@/components/store/lib';

export default function ForgotPasswordPage() {
    return (
        <StoreShell title="Forgot Password">
            <Inner />
        </StoreShell>
    );
}

function Inner() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api('/api/store/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({email}),
            });
            setSent(true);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto st-card p-8">
            <h1 className="text-2xl font-bold mb-1">Forgot your password?</h1>
            <p className="text-[var(--st-muted)] text-sm mb-6">
                Enter the email tied to your account and we&apos;ll send you a secure link to reset it.
            </p>

            {sent ? (
                <div className="space-y-4">
                    <div className="rounded-lg border border-[var(--st-teal)]/40 bg-[var(--st-teal)]/10 p-4 text-sm">
                        If an account exists for <strong>{email}</strong>, a password reset link is on its way.
                        Check your inbox (and spam). The link expires in 60 minutes.
                    </div>
                    <Link href="/store/account/login" className="st-btn w-full py-3 inline-flex justify-center">
                        Back to Sign In
                    </Link>
                </div>
            ) : (
                <form onSubmit={submit} className="space-y-4">
                    <input
                        type="email"
                        required
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="st-input"
                        autoComplete="email"
                    />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button disabled={loading} className="st-btn w-full py-3">
                        {loading ? 'Sending…' : 'Send reset link'}
                    </button>
                    <p className="text-sm text-[var(--st-muted)] text-center">
                        Remembered it?{' '}
                        <Link href="/store/account/login" className="text-[var(--st-teal)] font-semibold">
                            Sign in
                        </Link>
                    </p>
                </form>
            )}
        </div>
    );
}
