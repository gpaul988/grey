import db from '@/Admin/db';
import { Notifications } from '@/Admin/models';
import { broadcast, broadcastStats } from '@/Admin/routes/sse';

export type AdminNotificationType = 'submission' | 'application' | 'subscription' | 'audit' | 'sale' | 'ad_click';

const notificationTemplates: Record<AdminNotificationType, { title: string; message: string }> = {
  submission: {
    title: 'New Contact Form Submission',
    message: 'New contact form submission received',
  },
  application: {
    title: 'New Career Application',
    message: 'New career application received',
  },
  subscription: {
    title: 'New Newsletter Subscription',
    message: 'New newsletter subscription received',
  },
  audit: {
    title: 'New Audit Request',
    message: 'New audit request received',
  },
  sale: {
    title: 'New Sale',
    message: 'New sale recorded',
  },
  ad_click: {
    title: 'Ad Click Recorded',
    message: 'New ad click recorded',
  },
};

export function notifyAdminPanel(input: {
  type: AdminNotificationType;
  id?: number | bigint | string | null;
  name?: string | null;
  email?: string | null;
}): boolean {
  try {
    const template = notificationTemplates[input.type];
    const entityId = typeof input.id === 'number' ? input.id : typeof input.id === 'bigint' ? Number(input.id) : 0;
    Notifications.create({
      type: input.type,
      title: template.title,
      message: template.message,
      entity_type: input.type,
      entity_id: entityId,
      related_data: JSON.stringify({
        name: input.name ?? null,
        email: input.email ?? null,
      }),
      status: 'unread',
    });

    const unreadRow = db.prepare("SELECT COUNT(*) AS c FROM notifications WHERE status = 'unread'").get() as { c?: number } | undefined;
    const unreadCount = unreadRow?.c ?? 0;

    broadcast('notification', {
      action: 'create',
      title: template.title,
      message: template.message,
      type: input.type,
      unreadCount,
    });
    broadcast(input.type, {
      action: 'create',
      type: input.type,
      title: template.title,
      message: template.message,
      id: input.id ?? null,
      name: input.name ?? null,
      email: input.email ?? null,
    });
    broadcastStats();
    return true;
  } catch (error) {
    console.error('[admin-notify] Failed to record notification:', error);
    return false;
  }
}
