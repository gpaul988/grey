import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

export async function requireAdminSession() {
  const store = await cookies();
  if (!store.get('grey.sid')) {
    redirect('/admin/login');
  }
}

/** Read express session from the SQLite sessions table by sid cookie. */
export async function getServerSession(request: NextRequest): Promise<any | null> {
  const sid = request.cookies.get('grey.sid')?.value;
  if (!sid) return null;

  try {
    const db = (await import('@/Admin/db')).default;
    // Try both raw sid and signed variant 's:' + sid
    const row = db.prepare("SELECT sess FROM sessions WHERE sid = ? AND expire > datetime('now')").get(sid)
      || db.prepare("SELECT sess FROM sessions WHERE sid = ? AND expire > datetime('now')").get('s:' + sid);
    if (!row) return null;
    // sess stored as JSON string or JSON blob depending on driver
    const sess = typeof row.sess === 'string' ? JSON.parse(row.sess) : row.sess;
    return sess as any;
  } catch (err) {
    // If sessions table or DB not available, fail closed (no session)
    return null;
  }
}
