/**
 * Webhook Types & Interfaces
 */

export enum WebhookEvent {
  // Order events
  ORDER_CREATED = 'order.created',
  ORDER_UPDATED = 'order.updated',
  ORDER_CANCELLED = 'order.cancelled',
  ORDER_COMPLETED = 'order.completed',

  // Review events
  REVIEW_CREATED = 'review.created',
  REVIEW_UPDATED = 'review.updated',
  REVIEW_DELETED = 'review.deleted',

  // User events
  USER_REGISTERED = 'user.registered',
  USER_UPDATED = 'user.updated',
  USER_DELETED = 'user.deleted',

  // Service events
  SERVICE_CREATED = 'service.created',
  SERVICE_UPDATED = 'service.updated',
  SERVICE_DELETED = 'service.deleted',

  // Product events
  PRODUCT_CREATED = 'product.created',
  PRODUCT_UPDATED = 'product.updated',
  PRODUCT_DELETED = 'product.deleted',

  // Payment events
  PAYMENT_RECEIVED = 'payment.received',
  PAYMENT_FAILED = 'payment.failed',
  PAYMENT_REFUNDED = 'payment.refunded',
}

export enum WebhookProvider {
  SLACK = 'slack',
  DISCORD = 'discord',
  CUSTOM_HTTP = 'custom_http',
  EMAIL = 'email',
  ZAPIER = 'zapier',
}

export interface WebhookEndpoint {
  id: string;
  userId: string;
  url: string;
  provider: WebhookProvider;
  events: WebhookEvent[];
  active: boolean;
  headers?: Record<string, string>;
  secret?: string;
  retryCount: number;
  retryInterval: number; // seconds
  createdAt: Date;
  updatedAt: Date;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface WebhookPayload<T = any> {
  id: string;
  event: WebhookEvent;
  timestamp: Date;
  data: T;
  retryCount: number;
  signature?: string; // HMAC-SHA256
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  event: WebhookEvent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  statusCode?: number;
  responseBody?: string;
  attemptNumber: number;
  nextRetryAt?: Date;
  completedAt?: Date;
  failed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SlackMessage {
  channel?: string;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attachments?: any[];
}

export interface DiscordMessage {
  content?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  embeds?: any[];
  username?: string;
  avatar_url?: string;
}
