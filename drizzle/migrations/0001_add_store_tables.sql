-- Store Customers Table
CREATE TABLE "store_customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL UNIQUE,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"password_hash" text NOT NULL,
	"phone" text,
	"default_address_id" integer,
	"status" text NOT NULL DEFAULT 'active',
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_store_customers_email" ON "store_customers" ("email");
--> statement-breakpoint
CREATE INDEX "idx_store_customers_status" ON "store_customers" ("status");
--> statement-breakpoint

-- Store Customer Addresses Table
CREATE TABLE "store_customer_addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"type" text NOT NULL DEFAULT 'shipping',
	"street" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"postal_code" text NOT NULL,
	"country" text NOT NULL DEFAULT 'NG',
	"is_default" boolean DEFAULT false,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_store_customer_addresses_customer_id" ON "store_customer_addresses" ("customer_id");
--> statement-breakpoint

-- Store Categories Table
CREATE TABLE "store_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"description" text,
	"image" text,
	"parent_id" integer,
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_store_categories_slug" ON "store_categories" ("slug");
--> statement-breakpoint
CREATE INDEX "idx_store_categories_parent_id" ON "store_categories" ("parent_id");
--> statement-breakpoint

-- Store Brands Table
CREATE TABLE "store_brands" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL UNIQUE,
	"slug" text NOT NULL UNIQUE,
	"description" text,
	"logo" text,
	"website" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_store_brands_slug" ON "store_brands" ("slug");
--> statement-breakpoint

-- Store Products Table
CREATE TABLE "store_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"sku" text UNIQUE,
	"description" text,
	"category_id" integer NOT NULL,
	"brand_id" integer,
	"price" numeric(12, 2) NOT NULL,
	"price_usd" numeric(12, 2),
	"compare_price" numeric(12, 2),
	"stock" integer DEFAULT 0,
	"rating" numeric(3, 2) DEFAULT '0',
	"review_count" integer DEFAULT 0,
	"images" jsonb DEFAULT '[]'::jsonb,
	"thumbnail" text,
	"specs" jsonb DEFAULT '{}'::jsonb,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"featured" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"seo_title" text,
	"seo_description" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_store_products_slug" ON "store_products" ("slug");
--> statement-breakpoint
CREATE INDEX "idx_store_products_sku" ON "store_products" ("sku");
--> statement-breakpoint
CREATE INDEX "idx_store_products_category_id" ON "store_products" ("category_id");
--> statement-breakpoint
CREATE INDEX "idx_store_products_brand_id" ON "store_products" ("brand_id");
--> statement-breakpoint
CREATE INDEX "idx_store_products_featured" ON "store_products" ("featured");
--> statement-breakpoint

-- Store Product Reviews Table
CREATE TABLE "store_product_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"customer_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"title" text,
	"content" text,
	"is_verified" boolean DEFAULT false,
	"helpful" integer DEFAULT 0,
	"unhelpful" integer DEFAULT 0,
	"status" text NOT NULL DEFAULT 'pending',
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_store_product_reviews_product_id" ON "store_product_reviews" ("product_id");
--> statement-breakpoint
CREATE INDEX "idx_store_product_reviews_customer_id" ON "store_product_reviews" ("customer_id");
--> statement-breakpoint

-- Store Orders Table
CREATE TABLE "store_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_number" text NOT NULL UNIQUE,
	"customer_id" integer NOT NULL,
	"email" text NOT NULL,
	"status" text NOT NULL DEFAULT 'pending',
	"shipping_address_id" integer,
	"billing_address_id" integer,
	"subtotal" numeric(12, 2) NOT NULL,
	"shipping_cost" numeric(10, 2) DEFAULT '0',
	"tax" numeric(10, 2) DEFAULT '0',
	"total" numeric(12, 2) NOT NULL,
	"currency" text DEFAULT 'NGN',
	"payment_status" text DEFAULT 'pending',
	"shipping_status" text DEFAULT 'pending',
	"notes" text,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_store_orders_order_number" ON "store_orders" ("order_number");
--> statement-breakpoint
CREATE INDEX "idx_store_orders_customer_id" ON "store_orders" ("customer_id");
--> statement-breakpoint
CREATE INDEX "idx_store_orders_status" ON "store_orders" ("status");
--> statement-breakpoint
CREATE INDEX "idx_store_orders_payment_status" ON "store_orders" ("payment_status");
--> statement-breakpoint

-- Store Order Items Table
CREATE TABLE "store_order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL DEFAULT 1,
	"price" numeric(12, 2) NOT NULL,
	"subtotal" numeric(12, 2) NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_store_order_items_order_id" ON "store_order_items" ("order_id");
--> statement-breakpoint
CREATE INDEX "idx_store_order_items_product_id" ON "store_order_items" ("product_id");
--> statement-breakpoint

-- Store Payments Table
CREATE TABLE "store_payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"customer_id" integer NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"currency" text DEFAULT 'NGN',
	"provider" text NOT NULL,
	"transaction_id" text NOT NULL UNIQUE,
	"reference" text,
	"status" text NOT NULL DEFAULT 'pending',
	"payment_method" text,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_store_payments_order_id" ON "store_payments" ("order_id");
--> statement-breakpoint
CREATE INDEX "idx_store_payments_customer_id" ON "store_payments" ("customer_id");
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_store_payments_transaction_id" ON "store_payments" ("transaction_id");
--> statement-breakpoint
CREATE INDEX "idx_store_payments_status" ON "store_payments" ("status");
--> statement-breakpoint

-- Store Coupons Table
CREATE TABLE "store_coupons" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL UNIQUE,
	"description" text,
	"discount_type" text NOT NULL,
	"discount_value" numeric(10, 2) NOT NULL,
	"max_uses" integer,
	"current_uses" integer DEFAULT 0,
	"min_order_value" numeric(12, 2),
	"valid_from" timestamp NOT NULL,
	"valid_to" timestamp NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_store_coupons_code" ON "store_coupons" ("code");
--> statement-breakpoint

-- Store Cart Sessions Table
CREATE TABLE "store_cart_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer,
	"session_id" text UNIQUE,
	"items" jsonb DEFAULT '[]'::jsonb,
	"coupon_code" text,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_store_cart_sessions_customer_id" ON "store_cart_sessions" ("customer_id");
--> statement-breakpoint
CREATE INDEX "idx_store_cart_sessions_expires_at" ON "store_cart_sessions" ("expires_at");
--> statement-breakpoint

-- Store Wishlists Table
CREATE TABLE "store_wishlists" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_store_wishlists_customer_product" ON "store_wishlists" ("customer_id", "product_id");
--> statement-breakpoint
CREATE INDEX "idx_store_wishlists_customer_id" ON "store_wishlists" ("customer_id");
