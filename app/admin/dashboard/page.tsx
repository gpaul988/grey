import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/app/lib/adminAuth';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get('admin_user');

  if (!adminCookie) {
    redirect('/admin/login');
  }

  // Verify signed cookie
  const user = verifyAdminSession(adminCookie.value || '');
  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
      <p className="mb-6">You are signed in as <strong>{user.email}</strong></p>

      <div className="space-y-3">
        <a href="/api/admin/logout" className="inline-block px-4 py-2 border rounded">Sign out</a>
      </div>
    </div>
  );
}

