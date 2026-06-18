import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';
import { adminUsers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

/**
 * GET /api/admin/users - List all admin users (superadmin only)
 * POST /api/admin/users - Create new admin user (superadmin only)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify admin token
  const token = req.headers['x-admin-token'] as string;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // TODO: Verify token with JWT

  if (req.method === 'GET') {
    try {
      const db = await getDb();
      const users = await db.select().from(adminUsers);

      // Remove password hashes from response
      const safeUsers = users.map(({ passwordHash, ...user }) => user);

      return res.status(200).json(safeUsers);
    } catch (error) {
      console.error('Failed to list admin users:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { email, password, role } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      const db = await getDb();
      const newUser = await db
        .insert(adminUsers)
        .values({
          email,
          passwordHash,
          role: role || 'admin',
          isActive: true,
        })
        .returning({ id: adminUsers.id, email: adminUsers.email, role: adminUsers.role });

      return res.status(201).json(newUser[0]);
    } catch (error) {
      console.error('Failed to create admin user:', error);
      if ((error as any).code === '23505') {
        return res.status(409).json({ error: 'User already exists' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
