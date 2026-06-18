import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';
import { adminUsers } from '@/lib/db/schema';

interface JWTPayload {
  id: number;
  email: string;
  role: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'admin-secret-key-change-me') as JWTPayload;

    // Check if user is admin
    if (!['superadmin', 'admin'].includes(decoded.role)) {
      return res.status(403).json({ error: 'Forbidden - admin access required' });
    }

    // Get all admin users
    const users = await db.select().from(adminUsers).orderBy(adminUsers.createdAt);

    // Hide password hashes
    const safeUsers = users.map((u) => ({
      id: u.id,
      email: u.email,
      role: u.role,
      isActive: u.isActive,
      lastLogin: u.lastLogin,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    }));

    res.status(200).json({ users: safeUsers, count: safeUsers.length });
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.error('List admin users error:', error);
    res.status(500).json({ error: 'Failed to list users' });
  }
}
