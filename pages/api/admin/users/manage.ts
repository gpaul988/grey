import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { users } from '@/lib/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const db = getDb();

  try {
    if (method === 'GET') {
      // List all users with pagination
      const { page = '1', limit = '50' } = req.query;
      const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

      const allUsers = await db.select().from(users);
      const total = allUsers.length;
      const userList = allUsers.slice(offset, offset + parseInt(limit as string));

      return res.status(200).json({
        users: userList.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          status: u.status,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
        })),
        pagination: {
          total,
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      });
    } else if (method === 'PATCH') {
      // Update user
      const { userId, role, status } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'userId required' });
      }

      const updates: Record<string, any> = {
        updatedAt: new Date(),
      };

      if (role && ['superadmin', 'admin', 'manager', 'staff'].includes(role)) {
        updates.role = role;
      }

      if (status && ['active', 'suspended'].includes(status)) {
        updates.status = status;
      }

      const result = await db
        .update(users)
        .set(updates)
        .where(eq(users.id, userId))
        .returning();

      const updated = result[0];
      return res.status(200).json({
        message: 'User updated',
        user: updated ? {
          id: updated.id,
          name: updated.name,
          email: updated.email,
          role: updated.role,
          status: updated.status,
        } : null,
      });
    } else if (method === 'DELETE') {
      // Delete user
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'userId required' });
      }

      await db.delete(users).where(eq(users.id, userId));

      return res.status(200).json({ message: 'User deleted' });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('[User Management API] Error:', error);
    return res.status(500).json({ error: 'Failed to manage users' });
  }
}
