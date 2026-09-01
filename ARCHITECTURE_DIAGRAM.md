# Flash Sale & Black Friday Implementation Architecture

## 🏗️ System Design Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CUSTOMER STOREFRONT                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────────────────┐  ┌──────────────────────┐                     │
│  │  Product Cards           │  │  Product Detail      │                     │
│  │  ────────────────────    │  │  ─────────────────   │                     │
│  │  [Image]                 │  │  [Gallery]  [Video]  │                     │
│  │  🔥 FLASH (red)          │  │  ⏱️ 48h 30m left     │  ← Countdown Timer  │
│  │  🛍️ BLACK FRIDAY (amber) │  │  🔥 Flash Sale      │                     │
│  │  Reduced Price           │  │  Reduced Price       │                     │
│  │  [Add to Cart]           │  │  [Add to Cart]       │                     │
│  └──────────────────────────┘  └──────────────────────┘                     │
│                                                                               │
│  ┌──────────────────────────┐  ┌──────────────────────┐                     │
│  │  Shopping Cart           │  │  Checkout            │                     │
│  │  ──────────────────      │  │  ────────────────    │                     │
│  │  [Item 1]                │  │  Subtotal: ₦1.2M     │                     │
│  │  ₦75K 🔥 Flash Sale      │  │  Shipping: ₦5K       │                     │
│  │  [Item 2]                │  │  Tax: ₦0             │  ← Promo Badges     │
│  │  ₦75K 🛍️ Black Friday    │  │  ─────────────       │                     │
│  │  [Item 3]                │  │  Total: ₦1.25M       │                     │
│  │  ₦100K (regular)         │  │  [Proceed]           │                     │
│  │  ─────────────────       │  └──────────────────────┘                     │
│  │  Subtotal: ₦250K         │                                                │
│  └──────────────────────────┘                                                │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘

                              ↓ API Calls ↓

┌─────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND APIS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  GET /api/store/products                                                     │
│  ├─ Returns: All products + video_url + flash_sale fields                   │
│  └─ Response: { products: [{...video_url, flash_sale...}], store_settings } │
│                                                                               │
│  GET /api/store/products/[slug]                                              │
│  ├─ Returns: Single product + video_url + flash fields                      │
│  └─ Response: { product: {...}, reviews: [], related: [...] }               │
│                                                                               │
│  GET /api/store/promos ⭐ PROMO STATE ENDPOINT                              │
│  ├─ Returns: Computed promo state                                           │
│  ├─ Response: {                                                              │
│  │   store_settings: { black_friday_active, black_friday_discount },         │
│  │   active_flash_products: [...],                                           │
│  │   computed_promo_preview: [...]                                           │
│  │ }                                                                          │
│  └─ Used by: StoreContext (promo badge visibility)                          │
│                                                                               │
│  POST /api/store/checkout                                                    │
│  ├─ Receives: Cart items                                                     │
│  ├─ Applies: effectiveAmount() pricing logic                                │
│  └─ Saves: Order with promo prices                                          │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘

                        ↓ Database Operations ↓

┌─────────────────────────────────────────────────────────────────────────────┐
│                           SQLite DATABASE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  products TABLE                                                              │
│  ├─ id, name, slug, price, price_usd, compare_price                        │
│  ├─ images[], thumbnail, video_url ⭐                                       │
│  ├─ flash_sale ⭐, flash_sale_starts ⭐, flash_sale_ends ⭐                │
│  ├─ flash_sale_price ⭐, stock, status, featured                           │
│  └─ category_id, brand_id, tags, description, specs, weight               │
│                                                                               │
│  store_settings TABLE                                                        │
│  ├─ key, value (key-value pairs)                                            │
│  ├─ 'black_friday_active' = '0' | '1' ⭐                                    │
│  ├─ 'black_friday_discount' = '0' - '100' ⭐                                │
│  └─ (+ other settings: currency, shipping_fee, tax_rate, etc.)              │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘

                       ↓ Configuration & Control ↓

┌─────────────────────────────────────────────────────────────────────────────┐
│                        ADMIN DASHBOARD                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Store → Settings                                                            │
│  ├─ [✓] Enable site-wide Black Friday sale ⭐                               │
│  └─ Black Friday discount (%): [25] ⭐                                       │
│                                                                               │
│  Store → Products                                                            │
│  ├─ [New Column] Promo: Shows 🔥 for flash sales ⭐                         │
│  └─ [Action] Can filter by promo status                                     │
│                                                                               │
│  Store → Products → Edit                                                     │
│  ├─ Media Section ⭐ NEW                                                     │
│  │  ├─ Images: Upload max 8, thumbnails, remove                            │
│  │  └─ Video: URL input, file upload, preview, remove button               │
│  │                                                                            │
│  ├─ Flash Sale Section ⭐                                                   │
│  │  ├─ [Toggle] Enable flash sale pricing                                  │
│  │  ├─ [DateTime] Flash sale start                                         │
│  │  ├─ [DateTime] Flash sale end                                           │
│  │  └─ [Number] Flash sale price (₦)                                       │
│  │                                                                            │
│  └─ On Save: POST /admin/store/products/[id]/edit                          │
│     └─ Persists: video_url, flash_sale fields                              │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 💰 Pricing Priority Engine

```
EFFECTIVE PRICE CALCULATION:

product.price = ₦1,000,000 (base)
product.compare_price = ₦1,200,000 (original)
product.flash_sale = 1
product.flash_sale_price = ₦700,000 ⭐ ACTIVE
settings.black_friday_active = true
settings.black_friday_discount = 25% → ₦750,000

┌─────────────────────────────────────────┐
│         PRICING PRIORITY LOGIC           │
├─────────────────────────────────────────┤
│                                         │
│  if (flashSale && flashPrice)           │
│    └─ USE: ₦700,000 ⭐ WINNER            │
│                                         │
│  else if (blackFridayActive)            │
│    └─ USE: ₦750,000 (25% off)           │
│                                         │
│  else                                   │
│    └─ USE: ₦1,000,000 (full price)      │
│                                         │
└─────────────────────────────────────────┘

RESULT ON DISPLAY:
  Display Price: ₦700,000 (red, bold, teal accent)
  Original Price: ₦1,200,000 (crossed out, gray)
  Discount: -42% (red badge)
  Promo Type: 🔥 Flash Sale (red icon)
```

---

## 📊 Data Flow Diagram

```
STOREFRONT PAGE LOAD:
│
├─ 1. GET /api/store/products
│     │
│     ├─ Query: SELECT * FROM products WHERE status='active'
│     │
│     ├─ Response includes:
│     │  ├─ video_url: "https://youtube.com/embed/..."
│     │  ├─ flash_sale: 1
│     │  ├─ flash_sale_price: 700000
│     │  ├─ flash_sale_ends: "2025-01-15T18:00:00Z"
│     │  └─ store_settings: { black_friday_active: true, ... }
│     │
│     └─ Frontend: Render ProductCard for each
│
├─ 2. StoreContext loads from /api/store/promos
│     │
│     ├─ Query: SELECT key,value FROM store_settings
│     │ Query: SELECT * FROM products WHERE flash_sale=1
│     │
│     ├─ Computes: 
│     │  ├─ Black Friday active? Yes
│     │  ├─ Black Friday discount? 25%
│     │  ├─ Flash products active? Which ones?
│     │  └─ Effective prices for each
│     │
│     └─ Stores in: Context (useStore hook)
│
└─ 3. Components render promo badges
      │
      ├─ ProductCard: if (effectiveAmount(p).promotion === 'flash_sale')
      │               → Show 🔥 FLASH (red)
      │
      ├─ ProductCard: else if (settings.black_friday_active)
      │               → Show 🛍️ BLACK FRIDAY (amber)
      │
      └─ Product Detail: Countdown timer based on flash_sale_ends


ADMIN EDIT PRODUCT:
│
├─ 1. Load: GET /admin/store/products/[id]/edit
│     ├─ Query: SELECT * FROM products WHERE id=[id]
│     └─ Render form with all fields pre-populated
│
├─ 2. User edits:
│     ├─ Fill video_url: "https://youtube.com/embed/..."
│     ├─ Enable flash_sale: checked
│     ├─ Set flash_sale_price: 700000
│     ├─ Set flash_sale_starts: "2025-01-15T00:00:00Z"
│     └─ Set flash_sale_ends: "2025-01-16T00:00:00Z"
│
├─ 3. Save: POST /admin/store/products/[id]/edit
│     │
│     ├─ Parse form data:
│     │  ├─ video_url = "https://youtube.com/embed/..."
│     │  ├─ flash_sale = 1 (checkbox value)
│     │  ├─ flash_sale_price = 700000 (number)
│     │  └─ flash_sale_ends = "2025-01-16T00:00:00Z"
│     │
│     ├─ Call: Products.update(id, {...video_url, ...flash_fields})
│     │
│     └─ Query: UPDATE products SET video_url=?, flash_sale=?, ... WHERE id=?
│
└─ 4. Verify: Redirect to product list
      ├─ New 🔥 indicator shows in Promo column
      └─ Can click Edit again to confirm all saved


CART CHECKOUT:
│
├─ 1. User adds products to cart
│     └─ Each item stored with quantity
│
├─ 2. Cart page computes subtotal
│     │
│     ├─ For each cart item:
│     │  ├─ Call: effectiveAmount(product, settings)
│     │  ├─ Returns: { amount: 700000, promotion: 'flash_sale' }
│     │  └─ Multiply by quantity: 700000 * qty
│     │
│     └─ Sum all: ₦1,450,000 (subtotal)
│
├─ 3. Proceed to checkout
│     │
│     └─ Call: POST /api/store/checkout
│        ├─ Request includes: cart items, shipping, customer info
│        │
│        ├─ Server:
│        │  ├─ Loads: store_settings, flash product prices
│        │  ├─ Recomputes: effectiveAmount() for each item
│        │  ├─ Calculates: new subtotal (server-side verification)
│        │  └─ Persists: order with effective prices in order_items
│        │
│        └─ Response: order_id, total
│
└─ 4. Order confirmation shows:
      └─ All line item prices match cart display
```

---

## 🔧 Component & Function Map

```
Frontend Components:
├─ StoreContext.tsx
│  ├─ Loads: /api/store/promos
│  ├─ Stores: settings = { black_friday_active, black_friday_discount }
│  └─ Provides: useStore() hook for all components
│
├─ ProductCard.tsx
│  ├─ Uses: effectiveAmount(product, settings) → { amount, promotion }
│  ├─ Renders: Promo badge based on promotion type
│  │  ├─ 'flash_sale' → 🔥 FLASH (red)
│  │  └─ 'black_friday' → 🛍️ BLACK FRIDAY (amber)
│  └─ Shows: Effective price (promo applied)
│
├─ screens/store/products/[slug].tsx
│  ├─ Calculates: getTimeRemaining() → "48h 30m left"
│  ├─ Renders: Countdown timer (only if flash_sale_ends exists)
│  ├─ Renders: Video player below gallery
│  └─ Shows: Promo badge with timer
│
└─ screens/store/cart.tsx
   ├─ For each item:
   │  ├─ Shows: Promo badge (🔥 or 🛍️)
   │  └─ Price: effectiveAmount(product, settings)
   └─ Subtotal: sum of (effective_price * quantity)


Backend Functions:
├─ lib.ts: effectiveAmount(product, settings)
│  ├─ Input: product, settings
│  ├─ Logic:
│  │  1. if flash_sale && flash_price → return flash_price
│  │  2. else if black_friday → return discounted price
│  │  3. else → return base price
│  └─ Output: { amount, usdOverride, promotion }
│
├─ app/api/store/promos/route.ts: GET
│  ├─ Query: store_settings table
│  ├─ Query: products with flash_sale=1
│  ├─ Compute: Which flash sales are active (time-based)
│  └─ Return: { store_settings, active_flash_products, ... }
│
├─ app/api/store/checkout/processor.ts
│  ├─ For each order item:
│  │  ├─ Load: product + flash fields
│  │  ├─ Load: store_settings
│  │  ├─ Calculate: effectiveAmount()
│  │  └─ Save: order_item with effective price
│  └─ Ensure: order total = sum of (effective_price * qty)
│
└─ Admin/models/store.ts: Product.update()
   ├─ Accept: video_url, flash_sale, flash_sale_*
   ├─ Query: UPDATE products SET ... WHERE id=?
   └─ Return: Updated product record


Admin Forms:
├─ store-product-form.ejs
│  ├─ Media Section (NEW):
│  │  ├─ Images: Upload, view, remove (max 8)
│  │  └─ Video: URL input, file upload, preview, remove
│  │
│  └─ Flash Sale Section:
│     ├─ Toggle: Enable flash sale pricing
│     ├─ DateTime: Start time
│     ├─ DateTime: End time
│     └─ Number: Flash sale price (₦)
│
├─ store-settings.ejs
│  └─ Black Friday Section:
│     ├─ Toggle: Enable site-wide Black Friday
│     └─ Number: Discount percentage (0-100)
│
└─ store-products.ejs
   └─ Promo Column:
      ├─ Shows: 🔥 if flash_sale = 1
      └─ Shows: — if no flash sale
```

---

## 🎯 Key Implementation Points

```
1. TIMING ACCURACY
   ├─ flash_sale_ends stored as ISO 8601 string
   ├─ Client: calculateRemaining() = (end_time - now) / ms_per_unit
   ├─ Server: NOW() >= flash_sale_starts AND NOW() <= flash_sale_ends
   └─ All use Date.parse() for consistency

2. PRICING CONSISTENCY
   ├─ Frontend: effectiveAmount() function
   ├─ Backend: Same effectiveAmount() logic
   ├─ Checkout: Applies promos before persisting
   └─ Guarantee: Cart total = Checkout total = Order total

3. DATABASE INTEGRITY
   ├─ video_url: nullable, can be NULL
   ├─ flash_sale: boolean (0/1), default 0
   ├─ flash_sale_* fields: nullable (only required if flash_sale=1)
   └─ store_settings: key-value, transactional updates

4. USER EXPERIENCE
   ├─ Promos visible immediately on product cards
   ├─ Countdown updates in real-time
   ├─ Video player preloads on product detail
   ├─ Cart shows promo badges for quick verification
   └─ Admin dashboard shows promo status at a glance

5. ADMIN CONTROL
   ├─ Site-wide Black Friday: Single toggle + discount %
   ├─ Per-product Flash Sales: Full time window control
   ├─ Videos: Optional, support multiple sources
   ├─ Images: Max 8 per product (existing feature)
   └─ All changes apply immediately (no caching)
```

---

## ✨ Feature Completion Status

```
✅ FRONTEND UI (4 Features)
   ├─ ✅ Countdown Timer (real-time, hides when expired)
   ├─ ✅ Cart Promo Badges (shows 🔥 or 🛍️)
   ├─ ✅ Product Card Badges (enhanced styling, emoji)
   └─ ✅ Visual Differentiation (red vs amber, distinct emojis)

✅ VIDEO SUPPORT
   ├─ ✅ Database schema (video_url column)
   ├─ ✅ Admin form (URL input + file upload)
   ├─ ✅ Video player (HTML5, controls, responsive)
   └─ ✅ API endpoints (return video_url)

✅ IMAGE SUPPORT (EXISTING)
   ├─ ✅ Multiple images per product (max 8)
   ├─ ✅ First image = thumbnail
   ├─ ✅ Admin form (upload, view, remove)
   └─ ✅ API endpoints (return all images)

✅ ADMIN DASHBOARD
   ├─ ✅ Store Settings (Black Friday controls)
   ├─ ✅ Product List (Promo status indicator)
   ├─ ✅ Product Form (Flash sale + video controls)
   ├─ ✅ Admin Model (create/update support)
   └─ ✅ Admin Routes (form handling)

✅ BACKEND LOGIC
   ├─ ✅ Pricing engine (effectiveAmount function)
   ├─ ✅ Promo endpoints (/api/store/promos)
   ├─ ✅ Checkout processor (server-side pricing)
   └─ ✅ Database schema (idempotent)

STATUS: 🚀 COMPLETE AND READY FOR PRODUCTION
```
