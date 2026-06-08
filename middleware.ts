import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Only guard admin pages (not API routes or static files)
  if (!pathname.startsWith('/admin')) return NextResponse.next();
  if (pathname.startsWith('/api/admin')) return NextResponse.next();

  // Allow the login page and static assets so the login UI can load unauthenticated
  if (pathname === '/admin/login') return NextResponse.next();
  if (pathname.startsWith('/admin/css') || pathname.startsWith('/admin/js') || pathname.startsWith('/admin/images') || pathname.startsWith('/admin/vendor') || pathname.startsWith('/admin/fonts')) {
    return NextResponse.next();
  }

  // Allow if the path looks like a file (has an extension)
  if (/\.[a-zA-Z0-9]{1,6}$/.test(pathname)) return NextResponse.next();

  const cookie = req.cookies.get('admin_user');
  if (!cookie) {
    // redirect to login
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // If cookie present, allow. Detailed verification still happens server-side.
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};

