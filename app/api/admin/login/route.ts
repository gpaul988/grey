import { NextResponse } from 'next/server';
import { signAdminSession } from '@/app/lib/adminAuth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim();
    const password = String(body.password || '').trim();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Minimal demo verification - replace with real user check
    const user = { name: email.split('@')[0] || 'Admin', email };
    const signed = signAdminSession(user);

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: 'admin_user',
      value: signed,
      httpOnly: true,
      path: '/admin',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7
    });

    return res;
  } catch (err) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}

