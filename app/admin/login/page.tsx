'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const DEFAULT_ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@greyinfotech.com.ng';
const DEFAULT_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'ChangeThisInCPanel2024!';
const ALLOWED_PASSWORDS = new Set([
  DEFAULT_ADMIN_PASSWORD,
  'ChangeThisInCPanel2024!',
  'DevPassword123!ChangeMeInProduction',
  'test-admin-password',
  'admin123',
]);

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState(DEFAULT_ADMIN_EMAIL);
  const [password, setPassword] = useState(DEFAULT_ADMIN_PASSWORD);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isExpressAdmin = document.querySelector('form[action*="/login"]') !== null || document.body.innerText.includes('Sign in to your workspace');
      if (isExpressAdmin) {
        window.location.replace('/login');
      }
    }
  }, []);

  const loginHint = useMemo(
    () => `Use ${DEFAULT_ADMIN_EMAIL} / ${DEFAULT_ADMIN_PASSWORD}`,
    []
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      const normalizedPassword = String(password || '').trim();

      if (!normalizedEmail || !normalizedPassword) {
        setError('Please enter both email and password.');
        return;
      }

      const validEmail = normalizedEmail === DEFAULT_ADMIN_EMAIL || normalizedEmail === 'graham@greyinfotech.com.ng';
      const validPassword = ALLOWED_PASSWORDS.has(normalizedPassword);

      if (!validEmail || !validPassword) {
        setError('Invalid admin credentials. Use the default admin login below.');
        return;
      }

      localStorage.setItem('admin-token', `admin-session-${Date.now()}`);
      localStorage.setItem('admin-email', normalizedEmail);
      router.push('/admin');
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-slate-400 mb-8">Sign in to access the backend admin dashboard</p>

          <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            Demo login: {loginHint}
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-white font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 text-white rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="admin@greyinfotech.com.ng"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 text-white rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg font-medium transition"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
