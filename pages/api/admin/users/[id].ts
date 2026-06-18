import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';
import { adminUsers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

/**
 * GET /api/admin/users/[id] - Get user by ID
 * PUT /api/admin/users/[id] - Update user
 * DELETE /api/admin/users/[id] - Delete user (superadmin only)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const token = req.headers['x-admin-token'] as string;

  if (!token || !id) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // TODO: Verify token with JWT and user role

  const userId = parseInt(id as string);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  if (req.method === 'GET') {
    try {
      const db = await getDb();
      const user = await db.select().from(adminUsers).where(eq(adminUsers.id, userId));

      if (!user.length) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Remove password hash
      const { passwordHash, ...safeUser } = user[0];
      return res.status(200).json(safeUser);
    } catch (error) {
      console.error('Failed to get admin user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { email, role, isActive, password } = req.body;
      const db = await getDb();

      const updateData: any = {};
      if (email !== undefined) updateData.email = email;
      if (role !== undefined) updateData.role = role;
      if (isActive !== undefined) updateData.isActive = isActive;
      if (password !== undefined) {
        updateData.passwordHash = await bcrypt.hash(password, 10);
      }
      updateData.updatedAt = new Date();

      const updated = await db
        .update(adminUsers)
        .set(updateData)
        .where(eq(adminUsers.id, userId))
        .returning({ id: adminUsers.id, email: adminUsers.email, role: adminUsers.role });

      if (!updated.length) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(updated[0]);
    } catch (error) {
      console.error('Failed to update admin user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const db = await getDb();
      const deleted = await db.delete(adminUsers).where(eq(adminUsers.id, userId)).returning();

      if (!deleted.length) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      console.error('Failed to delete admin user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
