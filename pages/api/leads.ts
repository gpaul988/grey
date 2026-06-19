/**
 * Public API to fetch leads (CRM prospects).
 * GET /api/leads — returns all active leads, optionally filtered by stage.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { Leads } from '@/Admin/models';
import type { Lead } from '@/Admin/db/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stage = req.query.stage ? String(req.query.stage) : null;

  let leads = Leads.all() as Lead[];
  if (stage) {
    leads = leads.filter((l) => l.stage === stage);
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.json({
    leads: leads.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      company: l.company || '',
      stage: l.stage,
      value: l.value,
      created_at: l.created_at,
    })),
  });
}
