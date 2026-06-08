import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

const frontendBaseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

const readBackendBaseUrl = async () => {
  try {
    const raw = await readFile(path.join(process.cwd(), '.backend-port.json'), 'utf8');
    const parsed = JSON.parse(raw) as { url?: string; port?: number };

    if (parsed.url) return parsed.url;
    if (parsed.port) return `http://localhost:${parsed.port}`;
  } catch {
    // Fallback if the backend has not written its runtime file yet.
  }

  return 'http://localhost:3002';
};

export const metadata: Metadata = {
  title: 'Login',
  description: 'Route to the Grey_InfoTech backend login portal.',
};

export default async function LoginPage() {
  const backendBaseUrl = await readBackendBaseUrl();
  const backendLoginUrl = `${backendBaseUrl.replace(/\/$/, '')}/login`;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
            Grey_InfoTech Frontend
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Login gateway</h1>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
            The frontend and backend now run side by side. Use the backend portal for authentication, or return to
            the main website from here.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={backendLoginUrl}
              className="inline-flex items-center justify-center rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
            >
              Open backend login
            </a>
            <a
              href={frontendBaseUrl}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:text-teal-300"
            >
              Back to frontend
            </a>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-slate-300">
            <p className="mb-2 font-semibold text-white">Direct links</p>
            <ul className="space-y-2">
              <li>
                Frontend: <span className="text-teal-300">{frontendBaseUrl}</span>
              </li>
              <li>
                Backend login: <span className="text-teal-300">{backendLoginUrl}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}


