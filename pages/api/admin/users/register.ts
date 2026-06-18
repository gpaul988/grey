import { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import { db } from '@/lib/db';
import { adminUsers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers['x-admin-token'];
  if (!token || process.env.ADMIN_TOKEN !== token) {
    return res.status(401).json({ error: 'Unauthorized - superadmin token required' });
  }

  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  if (!['admin', 'editor', 'viewer'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    // Check if user exists
    const existing = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const passwordHash = await bcryptjs.hash(password, salt);

    // Create user
    const result = await db
      .insert(adminUsers)
      .values({
        email,
        passwordHash,
        role,
        isActive: true,
      })
      .returning({ id: adminUsers.id, email: adminUsers.email, role: adminUsers.role });

    res.status(201).json({ user: result[0] });
  } catch (error) {
    console.error('Admin user registration error:', error);
    res.status(500).json({ error: 'Failed to register admin user' });
  }
}
