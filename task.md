# Grey Store — E-Commerce Build Plan

## Stack
- Frontend: Next.js (pages/) + TailwindCSS
- Backend: Express + SQLite (better-sqlite3) via Admin/
- Payments: Paystack, Flutterwave, Monnify (superadmin toggleable)
- Auth: existing session-based system

---

## PHASE 1: Database Schema Extensions

### New Tables (add to Admin/db/schema.ts)
- `store_settings` — payment gateway configs (keys, enabled flags), store name, currency
- `products` — id, name, slug, category, brand, description, specs (JSON), price, compare_price, stock, images (JSON), status, featured
- `product_categories` — id, name, slug, parent_id, icon, description
- `product_brands` — id, name, slug, logo, description
- `orders` — id, order_number, customer_id (nullable), customer_type, guest_name, guest_email, guest_phone, guest_address, shipping_address (JSON), status, payment_status, payment_method, payment_gateway, payment_ref, subtotal, shipping_fee, tax, total, notes, created_at
- `order_items` — id, order_id, product_id, product_name, product_image, quantity, unit_price, total_price
- `customers` — id, first_name, last_name, email, phone, address, city, state, country, bio, avatar, password_hash (nullable), status, created_at
- `cart_sessions` — id, session_id, items (JSON), created_at, updated_at
- `product_reviews` — id, product_id, customer_id (nullable), reviewer_name, rating, comment, status

### Extend existing tables
- `users` — add: bio, date_of_birth, gender, address, city, state, country, linkedin, twitter, whatsapp
- `clients` — add: bio, date_of_birth, gender, address, city, state, country, website, industry
- `customers` — full biodata from creation

---

## PHASE 2: Admin Backend (Express/EJS)

### New routes in Admin/routes/admin.ts
- GET/POST /store/settings — payment gateways, store config
- GET /store/products — product list with DataTable
- GET/POST /store/products/new — create product
- GET/POST /store/products/:id/edit — edit product
- DELETE /store/products/:id — delete
- GET /store/categories — category management
- GET /store/brands — brand management
- GET /store/orders — orders list
- GET /store/orders/:id — order detail + status update
- GET /store/customers — customer list
- GET /store/customers/:id — customer profile

### New API routes in Admin/routes/api.ts
- POST /api/store/products — CRUD
- POST /api/store/orders/:id/status — update status
- POST /api/store/settings — save gateway config

### New EJS views (Admin/views/)
- store-products.ejs
- store-product-form.ejs
- store-categories.ejs
- store-brands.ejs
- store-orders.ejs
- store-order-detail.ejs
- store-customers.ejs
- store-customer-profile.ejs
- store-settings.ejs

### Sidebar update
- Add "Store" menu section to sidenav.ejs

---

## PHASE 3: Next.js Frontend Store

### Pages (pages/store/)
- index.tsx — homepage (hero, featured products, categories)
- products/index.tsx — product listing with filters (category, brand, price range)
- products/[slug].tsx — product detail + add to cart + reviews
- compare.tsx — side-by-side product comparison (up to 4 products)
- cart.tsx — cart page
- checkout.tsx — checkout (guest or account)
- orders/[id].tsx — order confirmation/tracking
- account/index.tsx — customer account dashboard
- account/profile.tsx — edit full biodata
- account/orders.tsx — order history

### Components (components/store/)
- ProductCard.tsx
- ProductGrid.tsx
- CategoryNav.tsx
- BrandFilter.tsx
- CartDrawer.tsx
- CompareBar.tsx (floating compare widget)
- CheckoutForm.tsx (guest + account modes)
- PaymentSelector.tsx
- OrderSummary.tsx
- RatingStars.tsx
- ProductImageGallery.tsx

### API routes (pages/api/store/)
- products.ts — list/filter
- products/[slug].ts — single product
- cart.ts — get/add/remove/update
- checkout.ts — create order + initiate payment
- payment/verify.ts — verify payment callback
- orders/[id].ts — order status

---

## PHASE 4: Payment Integration

### Paystack
- Inline popup or redirect
- Verify via webhook or callback

### Flutterwave
- Redirect flow
- Webhook verification

### Monnify
- Bank transfer + card
- Transaction verification

### SuperAdmin Control
- store_settings.payment_gateways = JSON { paystack: {enabled, public_key, secret_key}, flutterwave: {...}, monnify: {...}, bank_transfer: {enabled, bank_name, account_number, account_name} }
- Frontend reads active gateways via /api/store/payment-config (returns only enabled + public keys)

---

## PHASE 5: Favicon Sync
- Copy /public/favicon.svg → reference in Admin/views/partials/title-meta.ejs

---

## IMPLEMENTATION ORDER
1. Schema migrations (store tables + user biodata columns)
2. Models (Products, Orders, Customers, StoreSettings)
3. Admin EJS views + routes (store management)
4. Next.js API routes
5. Next.js frontend pages + components
6. Payment integrations
7. Favicon sync
8. Seed demo products

---
## RESUME LOG [2026-06-09]
- Phase 2 boots; admin login works (hello@greyinfotech.com.ng / GreyAdmin@2026).
- BUG FOUND: store views used block()/include('partials/layout-vertical') — WRONG. Real pattern: contentFor('html_attribute'|'extra_css'|'content'|'extra_javascript'). Layout auto-applied via app.set('layout').
- jQuery DataTables path: /vendor/datatables.net/js/dataTables.min.js (NOT jquery.dataTables.min.js). Swal: sweetalert2 vendor exists.
- DONE: all 9 store views converted to contentFor pattern. All 7 admin store pages render 200. Phase 2 verified.
- THEN: Phase 3 Next.js frontend + api routes + payments + favicon + seed products + push.

## RESUME LOG (continued — Phase 3 API)
- [x] Re-seed verified OK after schema/model changes.
- [x] Orders.create now writes coupon_code + currency.
- [x] Added Wishlists model + export.
- [x] lib/customerAuth.ts (HMAC cookie session: getCustomer/requireCustomer/setCustomerCookie/clear).
- [x] checkout.ts wired: coupon validate+discount, currency, session-customer reuse, auto-login on create_account.
- [x] payment-config.ts exposes usd_enabled/usd_rate.
- [x] Routes done: coupon.ts, wishlist.ts, auth/register, auth/login, auth/logout.
- [ ] auth/me, account/profile, account/orders, orders/[ref] (public lookup).
- [ ] payment/init, payment/verify, payment/webhook/[gateway].
- [ ] Frontend pages/store/* + components/store/*.
- [ ] Admin: price_usd field, USD settings, Coupons CRUD, confirm-bank-transfer.
- [ ] Seed broad catalog. Favicon sync. Boot-test. Push.

## RESUME LOG (continued — Phase 3 COMPLETE [2026-06-09])
- Re-seeded clean: 32 products, 8 categories, 17 brands, 3 coupons. Boots OK.
- VERIFIED end-to-end (all 200/ok):
  - Storefront: /store, products, products/[slug], cart, compare, checkout, account/login, account/register.
  - API: products (filters), products/[slug] detail+reviews, payment-config, coupon validate, auth register/login/me (session HMAC cookie), checkout (coupon WELCOME10 10% w/ max_discount cap=100k applied, currency NGN/USD), orders/[ref] public lookup, payment/init (gateway-gated, rejects disabled), payment/webhook/[gateway] (sig-verified, raw body).
  - Admin: all store pages 200 (products, new, categories, brands, orders, customers, coupons, settings). Order detail confirm-payment endpoint -> 200 ok. price_usd field, USD settings, payment gateway config (paystack/flutterwave/monnify secret+webhook hash), bank-transfer manual confirm all present.
- Favicon SYNCED: app/favicon.ico (383KB) copied to Admin/public/images, Admin/assets/images, public/admin/images, public/favicon.ico. _app.tsx now uses /favicon.ico. Admin title-meta uses /images/favicon.ico.
- tsc --noEmit: EXIT 0 (clean).
- => Committing + pushing to gpaul988/grey.git.
