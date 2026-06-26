/**
 * Store Schema - E-commerce tables for products, customers, orders, payments
 * Uses Drizzle ORM with SQLite
 */

import {
  sqliteTable,
  integer,
  text,
  real,
  blob,
  index,
  uniqueIndex,
  primaryKey,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

/**
 * Store Customers - customers for the e-commerce store
 */
export const storeCustomers = sqliteTable(
  'store_customers',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    email: text('email').notNull().unique(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    passwordHash: text('password_hash').notNull(),
    phone: text('phone'),
    defaultAddress: integer('default_address_id'),
    status: text('status').notNull().default('active'), // active | inactive | suspended
    emailVerified: integer('email_verified', { mode: 'boolean' }).default(false),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex('idx_store_customers_email').on(table.email),
    statusIdx: index('idx_store_customers_status').on(table.status),
  })
);

/**
 * Store Customer Addresses
 */
export const storeCustomerAddresses = sqliteTable(
  'store_customer_addresses',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    customerId: integer('customer_id').notNull(),
    type: text('type').notNull().default('shipping'), // shipping | billing
    street: text('street').notNull(),
    city: text('city').notNull(),
    state: text('state').notNull(),
    postalCode: text('postal_code').notNull(),
    country: text('country').notNull().default('NG'),
    isDefault: integer('is_default', { mode: 'boolean' }).default(false),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    customerIdIdx: index('idx_store_customer_addresses_customer_id').on(table.customerId),
  })
);

/**
 * Store Categories
 */
export const storeCategories = sqliteTable(
  'store_categories',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    image: text('image'),
    parentId: integer('parent_id'), // for subcategories
    sortOrder: integer('sort_order').default(0),
    isActive: integer('is_active', { mode: 'boolean' }).default(true),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('idx_store_categories_slug').on(table.slug),
    parentIdIdx: index('idx_store_categories_parent_id').on(table.parentId),
  })
);

/**
 * Store Brands
 */
export const storeBrands = sqliteTable(
  'store_brands',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    logo: text('logo'),
    website: text('website'),
    isActive: integer('is_active', { mode: 'boolean' }).default(true),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('idx_store_brands_slug').on(table.slug),
  })
);

/**
 * Store Products
 */
export const storeProducts = sqliteTable(
  'store_products',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    sku: text('sku').unique(),
    description: text('description'),
    categoryId: integer('category_id').notNull(),
    brandId: integer('brand_id'),
    price: real('price').notNull(), // store as REAL for decimal
    priceUsd: real('price_usd'),
    comparePrice: real('compare_price'),
    stock: integer('stock').default(0),
    rating: real('rating').default(0),
    reviewCount: integer('review_count').default(0),
    images: text('images').default('[]'), // JSON string array of image URLs
    thumbnail: text('thumbnail'),
    specs: text('specs').default('{}'), // JSON string key-value specs
    tags: text('tags').default('[]'), // JSON string array of tags
    featured: integer('featured', { mode: 'boolean' }).default(false),
    isActive: integer('is_active', { mode: 'boolean' }).default(true),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('idx_store_products_slug').on(table.slug),
    skuIdx: index('idx_store_products_sku').on(table.sku),
    categoryIdIdx: index('idx_store_products_category_id').on(table.categoryId),
    brandIdIdx: index('idx_store_products_brand_id').on(table.brandId),
    featuredIdx: index('idx_store_products_featured').on(table.featured),
  })
);

/**
 * Store Product Reviews
 */
export const storeProductReviews = sqliteTable(
  'store_product_reviews',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    productId: integer('product_id').notNull(),
    customerId: integer('customer_id').notNull(),
    rating: integer('rating').notNull(), // 1-5
    title: text('title'),
    content: text('content'),
    isVerified: integer('is_verified', { mode: 'boolean' }).default(false), // verified purchase
    helpful: integer('helpful').default(0),
    unhelpful: integer('unhelpful').default(0),
    status: text('status').notNull().default('pending'), // pending | approved | rejected
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    productIdIdx: index('idx_store_product_reviews_product_id').on(table.productId),
    customerIdIdx: index('idx_store_product_reviews_customer_id').on(table.customerId),
  })
);

/**
 * Store Orders
 */
export const storeOrders = sqliteTable(
  'store_orders',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    orderNumber: text('order_number').notNull().unique(),
    customerId: integer('customer_id').notNull(),
    email: text('email').notNull(),
    status: text('status').notNull().default('pending'), // pending | confirmed | shipped | delivered | cancelled
    shippingAddressId: integer('shipping_address_id'),
    billingAddressId: integer('billing_address_id'),
    subtotal: real('subtotal').notNull(),
    shippingCost: real('shipping_cost').default(0),
    tax: real('tax').default(0),
    total: real('total').notNull(),
    currency: text('currency').default('NGN'),
    paymentStatus: text('payment_status').default('pending'), // pending | completed | failed | refunded
    shippingStatus: text('shipping_status').default('pending'), // pending | shipped | delivered | returned
    notes: text('notes'),
    metadata: text('metadata').default('{}'), // JSON string
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    orderNumberIdx: uniqueIndex('idx_store_orders_order_number').on(table.orderNumber),
    customerIdIdx: index('idx_store_orders_customer_id').on(table.customerId),
    statusIdx: index('idx_store_orders_status').on(table.status),
    paymentStatusIdx: index('idx_store_orders_payment_status').on(table.paymentStatus),
  })
);

/**
 * Store Order Items
 */
export const storeOrderItems = sqliteTable(
  'store_order_items',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    orderId: integer('order_id').notNull(),
    productId: integer('product_id').notNull(),
    quantity: integer('quantity').notNull().default(1),
    price: real('price').notNull(), // price at time of order
    subtotal: real('subtotal').notNull(),
    metadata: text('metadata').default('{}'), // JSON string: selected options, etc
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    orderIdIdx: index('idx_store_order_items_order_id').on(table.orderId),
    productIdIdx: index('idx_store_order_items_product_id').on(table.productId),
  })
);

/**
 * Store Payments
 */
export const storePayments = sqliteTable(
  'store_payments',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    orderId: integer('order_id').notNull(),
    customerId: integer('customer_id').notNull(),
    amount: real('amount').notNull(),
    currency: text('currency').default('NGN'),
    provider: text('provider').notNull(), // paystack | flutterwave | bank_transfer
    transactionId: text('transaction_id').notNull().unique(),
    reference: text('reference'),
    status: text('status').notNull().default('pending'), // pending | completed | failed | refunded
    paymentMethod: text('payment_method'), // card | bank_transfer | ussd
    metadata: text('metadata').default('{}'), // JSON string: gateway response data
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    orderIdIdx: index('idx_store_payments_order_id').on(table.orderId),
    customerIdIdx: index('idx_store_payments_customer_id').on(table.customerId),
    transactionIdIdx: uniqueIndex('idx_store_payments_transaction_id').on(table.transactionId),
    statusIdx: index('idx_store_payments_status').on(table.status),
  })
);

/**
 * Store Coupons/Discounts
 */
export const storeCoupons = sqliteTable(
  'store_coupons',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    code: text('code').notNull().unique(),
    description: text('description'),
    discountType: text('discount_type').notNull(), // percentage | fixed
    discountValue: real('discount_value').notNull(),
    maxUses: integer('max_uses'),
    currentUses: integer('current_uses').default(0),
    minOrderValue: real('min_order_value'),
    validFrom: text('valid_from').notNull(),
    validTo: text('valid_to').notNull(),
    isActive: integer('is_active', { mode: 'boolean' }).default(true),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    codeIdx: uniqueIndex('idx_store_coupons_code').on(table.code),
  })
);

/**
 * Store Cart Sessions (for abandoned carts)
 */
export const storeCartSessions = sqliteTable(
  'store_cart_sessions',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    customerId: integer('customer_id'),
    sessionId: text('session_id').unique(),
    items: text('items').default('[]'), // JSON string: [{productId, quantity, price}, ...]
    couponCode: text('coupon_code'),
    expiresAt: text('expires_at').notNull(),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    customerIdIdx: index('idx_store_cart_sessions_customer_id').on(table.customerId),
    expiresAtIdx: index('idx_store_cart_sessions_expires_at').on(table.expiresAt),
  })
);

/**
 * Store Wishlist
 */
export const storeWishlists = sqliteTable(
  'store_wishlists',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    customerId: integer('customer_id').notNull(),
    productId: integer('product_id').notNull(),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    customerProductIdx: uniqueIndex('idx_store_wishlists_customer_product').on(
      table.customerId,
      table.productId
    ),
    customerIdIdx: index('idx_store_wishlists_customer_id').on(table.customerId),
  })
);

/**
 * Store Password Reset Tokens
 * Used for "forgot password" flow - securely store reset tokens with expiry
 */
export const storePasswordResetTokens = sqliteTable(
  'store_password_reset_tokens',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    customerId: integer('customer_id').notNull(),
    email: text('email').notNull(),
    token: text('token').notNull().unique(),
    expiresAt: text('expires_at').notNull(),
    used: integer('used', { mode: 'boolean' }).default(false),
    usedAt: text('used_at'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    tokenIdx: uniqueIndex('idx_store_password_reset_tokens_token').on(table.token),
    customerIdIdx: index('idx_store_password_reset_tokens_customer_id').on(table.customerId),
    emailIdx: index('idx_store_password_reset_tokens_email').on(table.email),
    expiresAtIdx: index('idx_store_password_reset_tokens_expires_at').on(table.expiresAt),
  })
);
