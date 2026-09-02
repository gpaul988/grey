import Link from 'next/link';

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/85 p-8 shadow-2xl shadow-slate-950/50">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-lg font-bold text-sky-300 ring-1 ring-sky-400/30">
            G
          </div>
          <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Grey</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Admin access</h1>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300">
          Use the central admin authentication flow to access the backend dashboard, orders, products, and customer data.
        </div>

        <div className="mt-6 space-y-3">
          <Link href="/login" className="flex w-full items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
            Continue to sign in
          </Link>
          <Link href="/" className="flex w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white">
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
