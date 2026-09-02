/**
 * Store Database Helpers
 * High-level functions for store operations (SQLite)
 */

import { db } from '@/lib/db';
import {
  storeCustomers,
  storePayments,
  storeOrders,
  storeOrderItems,
  storeProducts,
  storeCategories,
  storePasswordResetTokens,
  storeWishlists,
  storeCartSessions,
  storeCustomerAddresses,
} from './store-schema';
import { eq, and, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

/**
 * Create a new store customer
 */
export async function createStoreCustomer(data: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
}) {
  const passwordHash = await bcrypt.hash(data.password, 10);
  
  const result = await db
    .insert(storeCustomers)
    .values({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      passwordHash,
      phone: data.phone,
    });

  // SQLite returns lastID, need to fetch customer by email
  const customer = await getStoreCustomerByEmail(data.email);
  return customer;
}

/**
 * Verify store customer password
 */
export async function verifyStoreCustomerPassword(
  email: string,
  password: string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any | null> {
  const customers = await db
    .select()
    .from(storeCustomers)
    .where(eq(storeCustomers.email, email));

  const customer = customers[0];
  if (!customer) return null;

  const isValid = await bcrypt.compare(password, customer.passwordHash);
  return isValid ? customer : null;
}

/**
 * Get store customer by email
 */
export async function getStoreCustomerByEmail(email: string) {
  const customers = await db
    .select()
    .from(storeCustomers)
    .where(eq(storeCustomers.email, email));

  return customers[0] || null;
}

/**
 * Get store customer by ID
 */
export async function getStoreCustomerById(id: number) {
  const customers = await db
    .select()
    .from(storeCustomers)
    .where(eq(storeCustomers.id, id));

  return customers[0] || null;
}

/**
 * Update store customer profile
 */
export async function updateStoreCustomerProfile(
  id: number,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }
) {
  await db
    .update(storeCustomers)
    .set({
      ...data,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(storeCustomers.id, id));

  const updated = await getStoreCustomerById(id);
  return updated;
}

/**
 * Create store order
 */
export async function createStoreOrder(data: {
  customerId: number;
  email: string;
  subtotal: number;
  shippingCost?: number;
  tax?: number;
  total: number;
  currency?: string;
  items: Array<{ productId: number; quantity: number; price: number }>;
}) {
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  // Create order
  await db
    .insert(storeOrders)
    .values({
      orderNumber,
      customerId: data.customerId,
      email: data.email,
      subtotal: data.subtotal,
      shippingCost: data.shippingCost || 0,
      tax: data.tax || 0,
      total: data.total,
      currency: data.currency || 'NGN',
    });

  // Create order items
  if (data.items && data.items.length > 0) {
    await db.insert(storeOrderItems).values(
      data.items.map((item) => ({
        orderId: 0, // Will be populated after order creation, for now use placeholder
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      }))
    );
  }

  // Fetch the created order by orderNumber
  const orders = await db
    .select()
    .from(storeOrders)
    .where(eq(storeOrders.orderNumber, orderNumber));

  return orders[0];
}

/**
 * Create store payment
 */
export async function createStorePayment(data: {
  orderId: number;
  customerId: number;
  amount: number;
  currency?: string;
  provider: string;
  transactionId: string;
  reference?: string;
  paymentMethod?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
}) {
  await db
    .insert(storePayments)
    .values({
      orderId: data.orderId,
      customerId: data.customerId,
      amount: data.amount,
      currency: data.currency || 'NGN',
      provider: data.provider,
      transactionId: data.transactionId,
      reference: data.reference,
      paymentMethod: data.paymentMethod,
      metadata: JSON.stringify(data.metadata || {}),
    });

  // Fetch the created payment by transactionId
  const payments = await db
    .select()
    .from(storePayments)
    .where(eq(storePayments.transactionId, data.transactionId));

  return payments[0];
}

/**
 * Verify store payment
 */
export async function verifyStorePayment(transactionId: string) {
  const payments = await db
    .select()
    .from(storePayments)
    .where(eq(storePayments.transactionId, transactionId));

  return payments[0] || null;
}

/**
 * Get store products
 */
export async function getStoreProducts(
  limit = 20,
  offset = 0,
  categoryId?: number
) {
  let query = db.select().from(storeProducts).where(eq(storeProducts.isActive, true));

  if (categoryId) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query = query.where(eq(storeProducts.categoryId, categoryId)) as any;
  }

  const products = await query.limit(limit).offset(offset);
  return products;
}

/**
 * Get store product by slug
 */
export async function getStoreProductBySlug(slug: string) {
  const products = await db
    .select()
    .from(storeProducts)
    .where(and(eq(storeProducts.slug, slug), eq(storeProducts.isActive, true)));

  return products[0] || null;
}

/**
 * Get store categories
 */
export async function getStoreCategories() {
  const categories = await db
    .select()
    .from(storeCategories)
    .where(eq(storeCategories.isActive, true));

  return categories;
}

/**
 * Reset store customer password
 */
export async function resetStoreCustomerPassword(email: string, newPassword: string) {
  const passwordHash = await bcrypt.hash(newPassword, 10);

  await db
    .update(storeCustomers)
    .set({
      passwordHash,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(storeCustomers.email, email));

  const updated = await getStoreCustomerByEmail(email);
  return updated;
}

/**
 * Create password reset token
 * Returns token string to be sent in email
 */
export async function createPasswordResetToken(customerId: number, email: string) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(); // 1 hour

  await db
    .insert(storePasswordResetTokens)
    .values({
      customerId,
      email,
      token,
      expiresAt,
    });

  return token;
}

/**
 * Validate password reset token
 * Returns customer email if valid, null if expired or used
 */
export async function validatePasswordResetToken(token: string) {
  const tokens = await db
    .select()
    .from(storePasswordResetTokens)
    .where(eq(storePasswordResetTokens.token, token));

  const resetToken = tokens[0];
  if (!resetToken) return null;
  if (resetToken.used) return null;
  if (new Date(resetToken.expiresAt) < new Date()) return null;

  return resetToken.email;
}

/**
 * Mark password reset token as used
 */
export async function markTokenAsUsed(token: string) {
  await db
    .update(storePasswordResetTokens)
    .set({
      used: true,
      usedAt: new Date().toISOString(),
    })
    .where(eq(storePasswordResetTokens.token, token));
}

/**
 * Clean up expired password reset tokens (optional maintenance)
 */
export async function cleanupExpiredResetTokens() {
  const now = new Date().toISOString();
  await db
    .delete(storePasswordResetTokens)
    .where(and(
      eq(storePasswordResetTokens.used, false),
      sql`${storePasswordResetTokens.expiresAt} < ${now}`
    ));
}

export async function getStoreCustomerWishlist(customerId: number) {
  const rows = await db
    .select({ productId: storeWishlists.productId })
    .from(storeWishlists)
    .where(eq(storeWishlists.customerId, customerId));

  return rows.map((row: any) => row.productId);
}

export async function toggleStoreCustomerWishlist(customerId: number, productId: number) {
  const existing = await db
    .select({ id: storeWishlists.id })
    .from(storeWishlists)
    .where(and(
      eq(storeWishlists.customerId, customerId),
      eq(storeWishlists.productId, productId)
    ));

  if (existing.length > 0) {
    await db
      .delete(storeWishlists)
      .where(and(
        eq(storeWishlists.customerId, customerId),
        eq(storeWishlists.productId, productId)
      ));
    return getStoreCustomerWishlist(customerId);
  }

  await db.insert(storeWishlists).values({ customerId, productId });
  return getStoreCustomerWishlist(customerId);
}

export async function saveStoreCartSession({
  customerId,
  sessionId,
  items,
  couponCode,
}: {
  customerId?: number | null;
  sessionId?: string | null;
  items: Array<{ productId: number; quantity: number; price?: number }>;
  couponCode?: string | null;
}) {
  const payload = JSON.stringify(items ?? []);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const existing = sessionId
    ? await db.select().from(storeCartSessions).where(eq(storeCartSessions.sessionId, sessionId))
    : (customerId ? await db.select().from(storeCartSessions).where(eq(storeCartSessions.customerId, customerId)) : []);

  if (existing.length > 0) {
    const row = existing[0];
    await db
      .update(storeCartSessions)
      .set({
        customerId: customerId ?? row.customerId,
        items: payload,
        couponCode: couponCode ?? row.couponCode,
        expiresAt,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(storeCartSessions.id, row.id));

    return { ...row, items: payload, couponCode: couponCode ?? row.couponCode, expiresAt };
  }

  const inserted = await db.insert(storeCartSessions).values({
    customerId: customerId ?? null,
    sessionId: sessionId ?? `cart_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    items: payload,
    couponCode: couponCode ?? null,
    expiresAt,
  });

  const id = Number((inserted as any).lastInsertRowid ?? 0);
  const row = id ? await db.select().from(storeCartSessions).where(eq(storeCartSessions.id, id)) : [];
  return row[0] ?? null;
}

export async function getStoreCartSession({ customerId, sessionId }: { customerId?: number | null; sessionId?: string | null }) {
  if (customerId) {
    const rows = await db.select().from(storeCartSessions).where(eq(storeCartSessions.customerId, customerId));
    if (rows[0]) return rows[0];
  }
  if (sessionId) {
    const rows = await db.select().from(storeCartSessions).where(eq(storeCartSessions.sessionId, sessionId));
    if (rows[0]) return rows[0];
  }
  return null;
}

export async function getStoreCustomerOrders(customerId: number) {
  const orders = await db
    .select()
    .from(storeOrders)
    .where(eq(storeOrders.customerId, customerId))
    .orderBy(sql`${storeOrders.createdAt} DESC`);

  const rows = await Promise.all(orders.map(async (order: any) => {
    const items = await db
      .select({
        id: storeOrderItems.id,
        productId: storeOrderItems.productId,
        productName: storeProducts.name,
        productImage: storeProducts.thumbnail,
        quantity: storeOrderItems.quantity,
        unitPrice: storeOrderItems.price,
        totalPrice: storeOrderItems.subtotal,
      })
      .from(storeOrderItems)
      .leftJoin(storeProducts, eq(storeOrderItems.productId, storeProducts.id))
      .where(eq(storeOrderItems.orderId, order.id));

    return {
      id: order.id,
      order_number: order.orderNumber,
      status: order.status,
      payment_status: order.paymentStatus,
      total: order.total,
      currency: order.currency,
      created_at: order.createdAt,
      items,
    };
  }));

  return rows;
}

export async function getStoreOrderByRef(orderNumber: string) {
  const orders = await db.select().from(storeOrders).where(eq(storeOrders.orderNumber, orderNumber));
  const order = orders[0];
  if (!order) return null;

  const items = await db
    .select({
      id: storeOrderItems.id,
      product_name: storeProducts.name,
      product_image: storeProducts.thumbnail,
      quantity: storeOrderItems.quantity,
      unit_price: storeOrderItems.price,
      total_price: storeOrderItems.subtotal,
    })
    .from(storeOrderItems)
    .leftJoin(storeProducts, eq(storeOrderItems.productId, storeProducts.id))
    .where(eq(storeOrderItems.orderId, order.id));

  const customer = order.customerId ? await getStoreCustomerById(order.customerId) : null;
  const addresses = customer ? await db.select().from(storeCustomerAddresses).where(eq(storeCustomerAddresses.customerId, customer.id)) : [];
  const defaultAddress = addresses.find((addr: any) => addr.isDefault) ?? addresses[0] ?? null;

  return {
    id: order.id,
    order_number: order.orderNumber,
    status: order.status,
    payment_status: order.paymentStatus,
    payment_method: order.paymentStatus === 'pending' ? 'bank_transfer' : 'online',
    subtotal: order.subtotal,
    shipping_fee: order.shippingCost,
    tax: order.tax,
    discount: 0,
    total: order.total,
    currency: order.currency,
    coupon_code: null,
    created_at: order.createdAt,
    shipping_address: defaultAddress ? {
      first_name: customer?.firstName ?? '',
      last_name: customer?.lastName ?? '',
      phone: customer?.phone ?? '',
      address: defaultAddress.street,
      city: defaultAddress.city,
      state: defaultAddress.state,
    } : {
      first_name: customer?.firstName ?? '',
      last_name: customer?.lastName ?? '',
      phone: customer?.phone ?? '',
      address: '',
      city: '',
      state: '',
    },
    items,
  };
}

export async function updateStoreOrderStatus(orderId: number, patch: {
  status?: string;
  paymentStatus?: string;
  shippingStatus?: string;
  notes?: string | null;
}) {
  const current = await db.select().from(storeOrders).where(eq(storeOrders.id, orderId));
  const existing = current[0];
  if (!existing) return null;

  await db
    .update(storeOrders)
    .set({
      status: patch.status ?? existing.status,
      paymentStatus: patch.paymentStatus ?? existing.paymentStatus,
      shippingStatus: patch.shippingStatus ?? existing.shippingStatus,
      notes: patch.notes ?? existing.notes,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(storeOrders.id, orderId));

  return getStoreOrderByRef(existing.orderNumber);
}

export async function updateStorePaymentStatus(
  transactionId: string,
  status: 'pending' | 'completed' | 'failed' | 'refunded',
  metadata?: Record<string, any>
) {
  const payments = await db
    .select()
    .from(storePayments)
    .where(eq(storePayments.transactionId, transactionId));

  const payment = payments[0];
  if (!payment) return null;

  await db
    .update(storePayments)
    .set({
      status,
      metadata: JSON.stringify(metadata ?? {}),
      updatedAt: new Date().toISOString(),
    })
    .where(eq(storePayments.transactionId, transactionId));

  if (payment.orderId) {
    const orderRows = await db.select().from(storeOrders).where(eq(storeOrders.id, payment.orderId));
    const currentOrder = orderRows[0];
    const nextOrderStatus = status === 'completed' ? 'confirmed' : (currentOrder?.status ?? 'pending');

    await db
      .update(storeOrders)
      .set({
        paymentStatus: status === 'completed' ? 'completed' : status === 'failed' ? 'failed' : 'pending',
        status: nextOrderStatus,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(storeOrders.id, payment.orderId));
  }

  return payment;
}
