/**
 * Public API to fetch clients (active customers).
 * GET /api/clients — returns all active clients.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { Clients } from '@/Admin/models';
import type { Client } from '@/Admin/db/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clients = (Clients.all() as Client[]).filter((c) => c.status === 'active');

  res.setHeader('Cache-Control', 'no-store');
  return res.json({
    clients: clients.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      company: c.company || '',
      phone: c.phone || '',
      avatar: c.avatar || '',
      created_at: c.created_at,
    })),
  });
}
