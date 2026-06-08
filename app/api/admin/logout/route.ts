import { NextResponse } from 'next/server';

export async function GET() {
  const res = NextResponse.redirect(new URL('/admin/login', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
  res.cookies.set({ name: 'admin_user', value: '', path: '/admin', maxAge: 0, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  return res;
}

