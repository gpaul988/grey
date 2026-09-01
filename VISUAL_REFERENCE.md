# 📖 VISUAL REFERENCE GUIDE - Feature Locations & URLs

## 🌐 Storefront URLs

### Homepage
```
http://localhost:3000/
├─ Shows: Store header, promotional banner
├─ Features: Featured products, categories
└─ Promo Visibility: Black Friday badge on featured products
```

### Product Listing
```
http://localhost:3000/store/products
├─ Shows: All active products in grid
├─ Features: 
│  ├─ 🔥 FLASH (red) badge - TOP LEFT of image
│  ├─ 🛍️ BLACK FRIDAY (amber) badge - TOP LEFT of image
│  ├─ Reduced prices (teal, bold)
│  ├─ Compare/Wishlist buttons
│  └─ "In stock" indicator
└─ Test: Look for promo badges on cards
```

### Product Detail
```
http://localhost:3000/store/products/[product-slug]
├─ Top Section:
│  ├─ Product gallery (multiple images)
│  ├─ 🔥 FLASH badge (red) - PROMINENT
│  ├─ ⏱️ Countdown timer (if flash sale active) - ORANGE
│  ├─ 🛍️ BLACK FRIDAY badge (amber) - if BF active
│  └─ Reduced price (teal, large)
├─ Video Section:
│  ├─ HTML5 <video> player
│  ├─ Play/pause/fullscreen controls
│  ├─ Thumbnail from first frame
│  └─ BELOW product gallery
├─ Details Section:
│  ├─ Description, specs, reviews
│  ├─ Stock status (green if in stock, red if out)
│  └─ Add to cart/Compare/Wishlist buttons
└─ Related Products:
   └─ Bottom section with similar products
```

### Shopping Cart
```
http://localhost:3000/store/cart
├─ Empty State: Icon + message if no items
└─ Items State:
   ├─ Left Column: Products
   │  ├─ Thumbnail image
   │  ├─ Product name (link to detail)
   │  ├─ Brand name (gray)
   │  ├─ Price (teal, bold)
   │  ├─ 🔥 Flash Sale badge (red) - IF APPLICABLE
   │  ├─ 🛍️ Black Friday badge (amber) - IF APPLICABLE
   │  ├─ Quantity selector [-] [1] [+]
   │  └─ Remove button
   └─ Right Column: Summary
      ├─ Subtotal (sum of all items × qty with promos)
      ├─ Shipping (calculated later)
      ├─ Total (subtotal + shipping)
      └─ [Proceed to Checkout] button
```

### Checkout
```
http://localhost:3000/store/checkout
├─ Order Summary:
│  ├─ Line items (name, qty, price)
│  ├─ Subtotal (with promo prices)
│  ├─ Shipping cost
│  ├─ Tax (if applicable)
│  └─ TOTAL (bold, large, teal)
├─ Shipping Address Form
├─ Payment Method Selection
├─ Promo/Discount Code Input (if available)
└─ [Complete Payment] button
```

---

## 🛠️ Admin Dashboard URLs

### Login
```
http://localhost:3000/admin
├─ Default: Username & password fields
├─ Test: Use admin credentials
└─ Redirects to: /admin/dashboard (if authenticated)
```

### Store Settings
```
http://localhost:3000/admin/store/settings
├─ Section: General Settings
│  ├─ Store Name
│  ├─ Currency (NGN)
│  ├─ Currency Symbol (₦)
│  ├─ Shipping Fee
│  └─ Tax Rate (%)
├─ Section: Multi-Currency (USD)
│  ├─ [✓] Allow customers to shop in USD
│  └─ USD Exchange Rate (₦ per $1)
├─ ⭐ Section: Black Friday
│  ├─ [ ] Enable site-wide Black Friday sale ← TOGGLE THIS
│  └─ [25] Black Friday discount (%) ← SET DISCOUNT
├─ Section: Payment Gateways (multiple)
│  ├─ Paystack config
│  ├─ Flutterwave config
│  ├─ Monnify config
│  └─ Bank Transfer config
└─ [Save Settings] button
```

### Product List
```
http://localhost:3000/admin/store/products
├─ Table Columns:
│  ├─ Image (thumbnail)
│  ├─ Name (+ SKU if exists)
│  ├─ Category
│  ├─ Brand
│  ├─ Price (₦)
│  ├─ Stock (badge: green/yellow/red)
│  ├─ ⭐ Promo (NEW COLUMN)
│  │  ├─ Shows: 🔥 Flash (if flash_sale=1)
│  │  └─ Shows: — (if no promo)
│  ├─ Status (badge: success/secondary/danger)
│  └─ Actions: [Edit] [Delete]
├─ Header:
│  ├─ Title: "All Products [Count]"
│  └─ [+ Add Product] button (top right)
└─ Sorting/Filtering: DataTables enabled
```

### Add/Edit Product
```
http://localhost:3000/admin/store/products/new
http://localhost:3000/admin/store/products/[id]/edit

LEFT COLUMN (8/12 width):
├─ ⭐ Section: Basic Information
│  ├─ Product Name (required)
│  ├─ SKU (optional)
│  └─ Weight (kg)
├─ Section: Specifications
│  ├─ [Key input] [Value input] [Remove button]
│  ├─ [+ Add Spec] button
│  └─ Multiple spec rows
├─ ⭐ Section: Media (REDESIGNED)
│  ├─ IMAGES:
│  │  ├─ Display existing images as thumbnails (90×90px)
│  │  ├─ [X] remove button on each
│  │  ├─ [Upload New Images] file input (max 8)
│  │  └─ "Max 8 images. First becomes thumbnail."
│  ├─ DIVIDER (─────────)
│  ├─ VIDEO (NEW):
│  │  ├─ "Product Video - Optional badge"
│  │  ├─ If video exists:
│  │  │  ├─ [Video player preview]
│  │  │  └─ [Remove Video] button
│  │  ├─ [Video URL input] (YouTube, Vimeo, direct)
│  │  ├─ "Or upload a video file below"
│  │  ├─ [Video file input] (MP4, WebM, max 50MB)
│  │  └─ "URL takes precedence"

RIGHT COLUMN (4/12 width):
├─ Section: Pricing & Stock
│  ├─ Price (₦) [required]
│  ├─ Compare at Price (₦) [optional, crossed out]
│  ├─ Price (USD) [optional]
│  └─ Stock Quantity [required]
├─ ⭐ Section: Flash Sale
│  ├─ [Toggle] Enable flash sale pricing
│  ├─ When checked:
│  │  ├─ [DateTime] Flash sale start
│  │  ├─ [DateTime] Flash sale end
│  │  └─ [Number] Flash sale price (₦)
│  └─ All fields optional (only if enabled)
├─ Section: Organization
│  ├─ [Dropdown] Category
│  ├─ [Dropdown] Brand
│  └─ [Text] Tags (comma-separated)
├─ Section: Status
│  ├─ [Dropdown] Status (Draft, Active, Archived)
│  └─ [Toggle] Featured Product
└─ Buttons:
   ├─ [Save Product] (primary, full width)
   └─ [Cancel] (secondary, full width)
```

### Product Creation Form - Visual Layout

```
┌─────────────────────────────────────────────────────────────┐
│  New Product                              [x]               │
├────────────────────────────┬────────────────────────────────┤
│ LEFT (8/12)                │ RIGHT (4/12)                   │
├────────────────────────────┼────────────────────────────────┤
│ BASIC INFO                 │ PRICING & STOCK                │
│ ┌──────────────────────┐   │ ┌──────────────────────────┐   │
│ │ Product Name*        │   │ │ Price (₦)*        [10000]│   │
│ │ [________________]   │   │ │ Compare Price     [      ]│   │
│ │                      │   │ │ Price (USD)       [      ]│   │
│ │ SKU: [       ]       │   │ │ Stock Qty*        [  50  ]│   │
│ │ Weight: [  ]kg       │   │ └──────────────────────────┘   │
│ └──────────────────────┘   │                                │
│                            │ FLASH SALE                    │
│ DESCRIPTION                │ ┌──────────────────────────┐   │
│ ┌──────────────────────┐   │ │ [✓] Enable flash sale   │   │
│ │ [     Rich Editor    ]   │ │                          │   │
│ │ [                    ]   │ │ Start: [datetime]        │   │
│ │ [                    ]   │ │ End:   [datetime]        │   │
│ │ [________________]   │   │ │ Price: [      ] ₦        │   │
│ └──────────────────────┘   │ └──────────────────────────┘   │
│                            │                                │
│ MEDIA                      │ ORGANIZATION                  │
│ ┌──────────────────────┐   │ ┌──────────────────────────┐   │
│ │ IMAGES:              │   │ │ Category:   [dropdown]   │   │
│ │ [thumb] [thumb] [X]  │   │ │ Brand:      [dropdown]   │   │
│ │ [Upload] (max 8)     │   │ │ Tags: [comma-separated]  │   │
│ │                      │   │ └──────────────────────────┘   │
│ │ VIDEO:               │   │                                │
│ │ [URL input]          │   │ STATUS                        │
│ │ [File input] MP4     │   │ ┌──────────────────────────┐   │
│ │ [Remove Video]       │   │ │ Status: [Draft v]        │   │
│ └──────────────────────┘   │ │ [✓] Featured Product     │   │
│                            │ └──────────────────────────┘   │
└────────────────────────────┴────────────────────────────────┘
│ [Save Product]                           [Cancel]           │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 UI Component Locations

### Countdown Timer
```
LOCATION: Product detail page, below promo badge
APPEARANCE: ⏱️ 48h 30m left
COLOR: Orange (#fb923c or similar)
TEXT: Gray (muted)
CONDITION: Only shows if flash_sale_ends is in future
UPDATES: Every 1 second (real-time)
DISAPPEARS: When sale ends
```

### Promo Badges - Product Card
```
LOCATION: Top-left corner of product image
SIZE: Small badge (~60px wide)
POSITION: Absolute, top: 12px, left: 12px

FLASH SALE:
  Text: 🔥 FLASH
  Color: Red rgb(239,68,68)
  Border: Lighter red rgba(255,85,85,.4)
  
BLACK FRIDAY:
  Text: 🛍️ BLACK FRIDAY
  Color: Amber rgb(245,158,11)
  Border: Lighter amber rgba(245,158,11,.4)
```

### Promo Badges - Cart Item
```
LOCATION: Inline with product name/price (below brand)
STYLE: Small inline badge
SIZE: ~40px wide

TEXT: 🔥 Flash Sale OR 🛍️ Black Friday
COLOR: Red or Amber (same as card badges)
BACKGROUND: Colored with 20% opacity
```

### Video Player
```
LOCATION: Below product gallery on detail page
APPEARANCE: 
  ├─ Full width (max 100%)
  ├─ Aspect ratio maintained
  ├─ Max width: 600px (responsive down)
  └─ Max height: 400px
  
CONTROLS: 
  ├─ Play/Pause button
  ├─ Progress bar
  ├─ Volume control
  └─ Fullscreen button
```

---

## 🔍 Browser DevTools - What to Check

### Console (F12 → Console)
```
Expected: No errors
Look for:
  ❌ Uncaught TypeError
  ❌ Failed to fetch
  ❌ CORS error
  ❌ Cannot read property
```

### Network (F12 → Network)
```
Expected API calls:
  GET /api/store/products → 200 OK
  GET /api/store/promos → 200 OK
  GET /api/store/products/[slug] → 200 OK

If any show ❌ 404 or ❌ 500:
  → Check API route files
  → Check database connection
```

### Application (F12 → Application)
```
Local Storage:
  cart → Array of cart items
  currency → 'NGN' or 'USD'
  
Session Storage:
  (if used) any temporary data
  
IndexedDB:
  (if used) any persistent data
```

### Performance (F12 → Performance)
```
Expected: <3s load time
Check:
  - Video loads asynchronously (non-blocking)
  - Countdown timer runs smoothly (60fps)
  - No jank on badge rendering
```

---

## 📱 Mobile Testing

### Viewport Sizes to Test
```
320px (iPhone SE)
375px (iPhone)
414px (iPhone Plus)
768px (iPad)
1024px (iPad Pro)
```

### What to Check on Mobile
- [ ] Promo badges visible and readable
- [ ] Countdown timer displays properly
- [ ] Video player responsive
- [ ] Images load quickly
- [ ] Buttons are tap-friendly (min 44×44px)
- [ ] Cart layout is single column
- [ ] Admin forms are usable

---

## 🎯 Feature Toggle Locations

| Feature | Enable Location | URL | What to Change |
|---------|-----------------|-----|-----------------|
| Black Friday | Admin → Settings | /admin/store/settings | Toggle checkbox |
| Flash Sale | Admin → Product Edit | /admin/store/products/[id]/edit | Check + set times |
| Video | Admin → Product Edit | /admin/store/products/[id]/edit | Paste URL |
| Multiple Images | Admin → Product Edit | /admin/store/products/[id]/edit | Upload files |

---

## 📸 Screenshot Checklist

**Take screenshots to verify**:

- [ ] Homepage with promo banner
- [ ] Product listing with badges (red and amber)
- [ ] Product detail with countdown + video
- [ ] Shopping cart with promo badges
- [ ] Checkout screen (confirm pricing)
- [ ] Admin settings (Black Friday toggle)
- [ ] Admin product list (Promo column)
- [ ] Admin product form (video + flash controls)

---

## ✨ Color Reference

### Promo Colors Used
```css
/* Flash Sale (Red) */
rgb(239, 68, 68)    /* Primary red */
rgba(239, 68, 68, 0.25) /* Background tint */
rgba(255, 85, 85, 0.4)  /* Border */
#ff5555             /* Lighter shade */

/* Black Friday (Amber) */
rgb(245, 158, 11)   /* Primary amber */
rgba(245, 158, 11, 0.25) /* Background tint */
rgba(245, 158, 11, 0.4)  /* Border */
#fbbf24             /* Lighter shade */

/* Regular UI */
teal/cyan           /* Prices, CTAs */
gray/muted          /* Secondary text */
```

---

## 🚀 You Now Have Everything!

✅ Fully implemented features  
✅ Complete documentation  
✅ Quick start guide  
✅ Visual reference  
✅ Test suite  
✅ Deployment instructions  

**Next**: Run `npm run build && npm run dev` and follow ACTION_PLAN.md

**Good luck! 🎉**
