"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      // Redirect to dashboard
      router.push('/admin/dashboard');
    } else {
      const data = await res.json();
      setError(data?.message || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} required type="password" className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div className="flex items-center justify-between">
          <button disabled={loading} type="submit" className="px-4 py-2 bg-teal-500 text-white rounded">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}

