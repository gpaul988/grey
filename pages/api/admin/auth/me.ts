import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAdmin } from '../../../../lib/admin/auth';
import { Users } from '@/Admin/models';

/**
 * Current Admin User Endpoint
 *
 * GET /api/admin/auth/me
 *   Authorization: Bearer <admin-jwt>   (also accepts X-Admin-Token / cookie)
 *
 * Validates the admin JWT using the SAME secret + helper as login/verify
 * (lib/admin/auth, SQLite source of truth) and returns the live DB user.
 *
 * NOTE: This previously used the dead Drizzle/Postgres layer (@/lib/db) and a
 * different JWT secret, which rejected valid tokens ("Invalid token") and made
 * the admin dashboard bounce back to /admin/login. Standardised on SQLite.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validates signature with the shared admin secret; sends 401 on failure.
  const tokenUser = requireAdmin(req, res);
  if (!tokenUser) return;

  // Hydrate from the live SQLite record when available; fall back to the token.
  let dbUser: Record<string, unknown> | null = null;
  try {
    dbUser = (Users.find(Number(tokenUser.id)) as Record<string, unknown>) ?? null;
  } catch {
    dbUser = null;
  }

  return res.status(200).json({
    user: {
      id: tokenUser.id,
      email: (dbUser?.email as string) ?? tokenUser.email,
      name: (dbUser?.name as string) ?? tokenUser.name,
      role: (dbUser?.role as string) ?? tokenUser.role,
      isActive: dbUser ? (dbUser.status ?? 'active') === 'active' : true,
      lastLogin: (dbUser?.last_login as string) ?? null,
      createdAt: (dbUser?.created_at as string) ?? null,
    },
  });
}
