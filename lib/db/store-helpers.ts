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
  storeSoftwareLicenses,
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

/**
 * Get product by slug
 */
export async function getProductBySlug(slug: string) {
  const products = await db
    .select()
    .from(storeProducts)
    .where(eq(storeProducts.slug, slug));
  return products[0] || null;
}

/**
 * Get all active products
 */
export async function getAllProducts(limit?: number, offset?: number) {
  let query = db
    .select()
    .from(storeProducts)
    .where(eq(storeProducts.isActive, true));
  
  if (limit) query = query.limit(limit);
  if (offset) query = query.offset(offset);
  
  return query;
}

/**
 * Get products by type (software or hardware)
 */
export async function getProductsByType(type: 'software' | 'hardware', limit?: number) {
  let query = db
    .select()
    .from(storeProducts)
    .where(and(
      eq(storeProducts.isActive, true),
      eq(storeProducts.productType, type)
    ));
  
  if (limit) query = query.limit(limit);
  return query;
}

/**
 * Create software license key
 */
export async function createSoftwareLicense(data: {
  orderId: number;
  productId: number;
  licenseKey: string;
  maxActivations?: number;
  expiresAt?: string;
}) {
  const result = await db.insert(storeSoftwareLicenses).values({
    orderId: data.orderId,
    productId: data.productId,
    licenseKey: data.licenseKey,
    maxActivations: data.maxActivations || 1,
    expiresAt: data.expiresAt || null,
    status: 'pending',
  });
  
  return result;
}

/**
 * Get software license by key
 */
export async function getSoftwareLicenseByKey(licenseKey: string) {
  const licenses = await db
    .select()
    .from(storeSoftwareLicenses)
    .where(eq(storeSoftwareLicenses.licenseKey, licenseKey));
  
  return licenses[0] || null;
}

/**
 * Activate software license
 */
export async function activateSoftwareLicense(
  licenseKey: string,
  activationCode: string,
  deviceInfo: Record<string, string>
) {
  const license = await getSoftwareLicenseByKey(licenseKey);
  if (!license) return { success: false, error: 'License key not found' };
  
  if (license.status === 'revoked') {
    return { success: false, error: 'License has been revoked' };
  }
  
  if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
    return { success: false, error: 'License has expired' };
  }
  
  if (license.activationCount! >= license.maxActivations!) {
    return { success: false, error: 'Maximum activations reached' };
  }
  
  await db
    .update(storeSoftwareLicenses)
    .set({
      status: 'activated',
      activationCode,
      activationCount: (license.activationCount || 0) + 1,
      activatedAt: new Date().toISOString(),
      deviceInfo: JSON.stringify(deviceInfo),
    })
    .where(eq(storeSoftwareLicenses.licenseKey, licenseKey));
  
  return { success: true };
}

