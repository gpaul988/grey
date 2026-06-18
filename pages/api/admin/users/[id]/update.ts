import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';
import { adminUsers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface JWTPayload {
  id: number;
  email: string;
  role: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const { role, isActive } = req.body;

  if (!id || isNaN(parseInt(id as string))) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'admin-secret-key-change-me') as JWTPayload;

    // Check if user is superadmin
    if (decoded.role !== 'superadmin') {
      return res.status(403).json({ error: 'Forbidden - superadmin access required' });
    }

    // Validate role if provided
    if (role && !['admin', 'editor', 'viewer', 'superadmin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Update user
    const updates: any = {};
    if (role !== undefined) updates.role = role;
    if (isActive !== undefined) updates.isActive = isActive;
    updates.updatedAt = new Date();

    const result = await db
      .update(adminUsers)
      .set(updates)
      .where(eq(adminUsers.id, parseInt(id as string)))
      .returning({
        id: adminUsers.id,
        email: adminUsers.email,
        role: adminUsers.role,
        isActive: adminUsers.isActive,
      });

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: result[0], message: 'User updated successfully' });
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.error('Update admin user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
}
