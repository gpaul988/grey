import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { userBehavior } from '@/lib/db/schema';
import { withAuth, SessionPayload } from '@/lib/auth';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse, session: SessionPayload) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = session?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { action, serviceId, metadata } = req.body;

    if (!action) {
      return res.status(400).json({ error: 'action is required' });
    }

    const validActions = ['view', 'click', 'purchase', 'review', 'share'];
    if (!validActions.includes(action)) {
      return res.status(400).json({ error: `action must be one of: ${validActions.join(', ')}` });
    }

    const behavior = await db
      .insert(userBehavior)
      .values({
        userId,
        action,
        serviceId: serviceId ? parseInt(serviceId) : null,
        metadata: metadata || {},
      })
      .returning();

    res.status(201).json({ data: behavior[0], message: 'Behavior tracked' });
  } catch (error: any) {
    console.error('Behavior track error:', error);
    res.status(500).json({ error: error.message || 'Failed to track behavior' });
  }
});
