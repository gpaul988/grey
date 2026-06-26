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
} from './store-schema';
import { eq, and } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

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
