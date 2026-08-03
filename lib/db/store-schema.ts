/**
 * Store Schema - E-commerce tables for products, customers, orders, payments
 * Uses Drizzle ORM with MySQL
 */

import {
  mysqlTable,
  int,
  varchar,
  text,
  decimal,
  boolean,
  timestamp,
  index,
  uniqueIndex,
  primaryKey,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

/**
 * Store Customers - customers for the e-commerce store
 */
export const storeCustomers = mysqlTable(
  'store_customers',
  {
    id: int('id').primaryKey().autoincrement(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    passwordHash: text('password_hash').notNull(),
    phone: varchar('phone', { length: 20 }),
    defaultAddress: int('default_address_id'),
    status: varchar('status', { length: 50 }).notNull().default('active'),
    emailVerified: boolean('email_verified').default(false),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex('idx_store_customers_email').on(table.email),
    statusIdx: index('idx_store_customers_status').on(table.status),
  })
);

/**
 * Store Customer Addresses
 */
export const storeCustomerAddresses = mysqlTable(
  'store_customer_addresses',
  {
    id: int('id').primaryKey().autoincrement(),
    customerId: int('customer_id').notNull(),
    type: varchar('type', { length: 50 }).notNull().default('shipping'), // shipping | billing
    street: varchar('street', { length: 255 }).notNull(),
    city: varchar('city', { length: 100 }).notNull(),
    state: varchar('state', { length: 100 }).notNull(),
    postalCode: varchar('postal_code', { length: 20 }).notNull(),
    country: varchar('country', { length: 50 }).notNull().default('NG'),
    isDefault: boolean('is_default').default(false),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    customerIdIdx: index('idx_store_customer_addresses_customer_id').on(table.customerId),
  })
);

/**
 * Store Categories
 */
export const storeCategories = mysqlTable(
  'store_categories',
  {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    description: text('description'),
    image: text('image'),
    parentId: int('parent_id'), // for subcategories
    sortOrder: int('sort_order').default(0),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('idx_store_categories_slug').on(table.slug),
    parentIdIdx: index('idx_store_categories_parent_id').on(table.parentId),
  })
);

/**
 * Store Brands
 */
export const storeBrands = mysqlTable(
  'store_brands',
  {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    description: text('description'),
    logo: text('logo'),
    website: varchar('website', { length: 255 }),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('idx_store_brands_slug').on(table.slug),
  })
);

/**
 * Store Products
 */
export const storeProducts = mysqlTable(
  'store_products',
  {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    sku: varchar('sku', { length: 100 }).unique(),
    description: text('description'),
    categoryId: int('category_id').notNull(),
    brandId: int('brand_id'),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    priceUsd: decimal('price_usd', { precision: 10, scale: 2 }),
    comparePrice: decimal('compare_price', { precision: 10, scale: 2 }),
    stock: int('stock').default(0),
    rating: decimal('rating', { precision: 3, scale: 2 }).default('0.00'),
    reviewCount: int('review_count').default(0),
    images: text('images').default('[]'), // JSON string array of image URLs
    thumbnail: text('thumbnail'),
    specs: text('specs').default('{}'), // JSON string key-value specs
    tags: text('tags').default('[]'), // JSON string array of tags
    featured: boolean('featured').default(false),
    isActive: boolean('is_active').default(true),
    seoTitle: varchar('seo_title', { length: 255 }),
    seoDescription: text('seo_description'),
    productType: varchar('product_type', { length: 50 }).default('hardware'), // hardware | software
    downloadUrl: text('download_url'), // URL for software downloads
    licenseType: varchar('license_type', { length: 50 }), // single | multiple | unlimited (for software)
    licenseCount: int('license_count'), // number of licenses included
    supportEmail: varchar('support_email', { length: 255 }), // support contact for software
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('idx_store_products_slug').on(table.slug),
    skuIdx: index('idx_store_products_sku').on(table.sku),
    categoryIdIdx: index('idx_store_products_category_id').on(table.categoryId),
    brandIdIdx: index('idx_store_products_brand_id').on(table.brandId),
    featuredIdx: index('idx_store_products_featured').on(table.featured),
    productTypeIdx: index('idx_store_products_type').on(table.productType),
  })
);

/**
 * Store Product Reviews
 */
export const storeProductReviews = mysqlTable(
  'store_product_reviews',
  {
    id: int('id').primaryKey().autoincrement(),
    productId: int('product_id').notNull(),
    customerId: int('customer_id').notNull(),
    rating: int('rating').notNull(), // 1-5
    title: varchar('title', { length: 255 }),
    content: text('content'),
    isVerified: boolean('is_verified').default(false), // verified purchase
    helpful: int('helpful').default(0),
    unhelpful: int('unhelpful').default(0),
    status: varchar('status', { length: 50 }).notNull().default('pending'), // pending | approved | rejected
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    productIdIdx: index('idx_store_product_reviews_product_id').on(table.productId),
    customerIdIdx: index('idx_store_product_reviews_customer_id').on(table.customerId),
  })
);

/**
 * Store Orders
 */
export const storeOrders = mysqlTable(
  'store_orders',
  {
    id: int('id').primaryKey().autoincrement(),
    orderNumber: varchar('order_number', { length: 100 }).notNull().unique(),
    customerId: int('customer_id').notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    status: varchar('status', { length: 50 }).notNull().default('pending'), // pending | confirmed | shipped | delivered | cancelled
    shippingAddressId: int('shipping_address_id'),
    billingAddressId: int('billing_address_id'),
    subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
    shippingCost: decimal('shipping_cost', { precision: 10, scale: 2 }).default('0.00'),
    tax: decimal('tax', { precision: 10, scale: 2 }).default('0.00'),
    total: decimal('total', { precision: 10, scale: 2 }).notNull(),
    currency: varchar('currency', { length: 10 }).default('NGN'),
    paymentStatus: varchar('payment_status', { length: 50 }).default('pending'), // pending | completed | failed | refunded
    shippingStatus: varchar('shipping_status', { length: 50 }).default('pending'), // pending | shipped | delivered | returned
    notes: text('notes'),
    metadata: text('metadata').default('{}'), // JSON string
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
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
export const storeOrderItems = mysqlTable(
  'store_order_items',
  {
    id: int('id').primaryKey().autoincrement(),
    orderId: int('order_id').notNull(),
    productId: int('product_id').notNull(),
    quantity: int('quantity').notNull().default(1),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(), // price at time of order
    subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
    metadata: text('metadata').default('{}'), // JSON string: selected options, etc
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    orderIdIdx: index('idx_store_order_items_order_id').on(table.orderId),
    productIdIdx: index('idx_store_order_items_product_id').on(table.productId),
  })
);

/**
 * Store Payments
 */
export const storePayments = mysqlTable(
  'store_payments',
  {
    id: int('id').primaryKey().autoincrement(),
    orderId: int('order_id').notNull(),
    customerId: int('customer_id').notNull(),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    currency: varchar('currency', { length: 10 }).default('NGN'),
    provider: varchar('provider', { length: 100 }).notNull(), // paystack | flutterwave | bank_transfer
    transactionId: varchar('transaction_id', { length: 255 }).notNull().unique(),
    reference: varchar('reference', { length: 255 }),
    status: varchar('status', { length: 50 }).notNull().default('pending'), // pending | completed | failed | refunded
    paymentMethod: varchar('payment_method', { length: 50 }), // card | bank_transfer | ussd
    metadata: text('metadata').default('{}'), // JSON string: gateway response data
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
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
export const storeCoupons = mysqlTable(
  'store_coupons',
  {
    id: int('id').primaryKey().autoincrement(),
    code: varchar('code', { length: 100 }).notNull().unique(),
    description: text('description'),
    discountType: varchar('discount_type', { length: 50 }).notNull(), // percentage | fixed
    discountValue: decimal('discount_value', { precision: 10, scale: 2 }).notNull(),
    maxUses: int('max_uses'),
    currentUses: int('current_uses').default(0),
    minOrderValue: decimal('min_order_value', { precision: 10, scale: 2 }),
    validFrom: timestamp('valid_from').notNull(),
    validTo: timestamp('valid_to').notNull(),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    codeIdx: uniqueIndex('idx_store_coupons_code').on(table.code),
  })
);

/**
 * Store Cart Sessions (for abandoned carts)
 */
export const storeCartSessions = mysqlTable(
  'store_cart_sessions',
  {
    id: int('id').primaryKey().autoincrement(),
    customerId: int('customer_id'),
    sessionId: varchar('session_id', { length: 255 }).unique(),
    items: text('items').default('[]'), // JSON string: [{productId, quantity, price}, ...]
    couponCode: varchar('coupon_code', { length: 100 }),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    customerIdIdx: index('idx_store_cart_sessions_customer_id').on(table.customerId),
    expiresAtIdx: index('idx_store_cart_sessions_expires_at').on(table.expiresAt),
  })
);

/**
 * Store Wishlist
 */
export const storeWishlists = mysqlTable(
  'store_wishlists',
  {
    id: int('id').primaryKey().autoincrement(),
    customerId: int('customer_id').notNull(),
    productId: int('product_id').notNull(),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
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
export const storePasswordResetTokens = mysqlTable(
  'store_password_reset_tokens',
  {
    id: int('id').primaryKey().autoincrement(),
    customerId: int('customer_id').notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull().unique(),
    expiresAt: timestamp('expires_at').notNull(),
    used: boolean('used').default(false),
    usedAt: timestamp('used_at'),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    tokenIdx: uniqueIndex('idx_store_password_reset_tokens_token').on(table.token),
    customerIdIdx: index('idx_store_password_reset_tokens_customer_id').on(table.customerId),
    emailIdx: index('idx_store_password_reset_tokens_email').on(table.email),
    expiresAtIdx: index('idx_store_password_reset_tokens_expires_at').on(table.expiresAt),
  })
);

/**
 * Store Software Licenses
 * Tracks license keys and activation for software products
 */
export const storeSoftwareLicenses = mysqlTable(
  'store_software_licenses',
  {
   id: int('id').primaryKey().autoincrement(),
   orderId: int('order_id').notNull(),
   productId: int('product_id').notNull(),
   licenseKey: varchar('license_key', { length: 255 }).notNull().unique(),
   activationCode: varchar('activation_code', { length: 255 }),
   status: varchar('status', { length: 50 }).notNull().default('pending'), // pending | activated | expired | revoked
   activatedAt: timestamp('activated_at'),
   expiresAt: timestamp('expires_at'),
   activationCount: int('activation_count').default(0),
   maxActivations: int('max_activations').default(1),
   deviceInfo: text('device_info').default('{}'), // JSON: hardware identifiers, device name, etc
   createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
   updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
   licenseKeyIdx: uniqueIndex('idx_software_licenses_key').on(table.licenseKey),
   orderIdIdx: index('idx_software_licenses_order_id').on(table.orderId),
   productIdIdx: index('idx_software_licenses_product_id').on(table.productId),
   statusIdx: index('idx_software_licenses_status').on(table.status),
  })
);
