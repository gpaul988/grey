import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminIndex() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get('admin_user');

  if (adminCookie) {
    redirect('/admin/dashboard');
  }

  redirect('/admin/login');
}

