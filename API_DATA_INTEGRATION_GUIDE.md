# API Data Integration Guide — Partners & Ads

## Problem Statement
You were adding partners and ads in the admin panel, but the frontend components (SocialProof, AdBanner) weren't reflecting the data. They showed hardcoded sample data instead.

## Root Cause
The API endpoints (`/api/content`, `/api/ads`) had hardcoded sample data instead of querying the SQLite database in `Admin/data/grey.db`.

## Solution Implemented

### 1. **Update `/api/content/route.ts`**
Now queries the SQLite database for:
- **Partners**: From `partners` table (active=1, sorted by sort_order)
- **Reviews**: From `client_reviews` table (active=1, newest first)

```typescript
// Returns data structure:
{
  partners: [...],           // From partners table
  reviews: [...],            // From client_reviews table
  placement: {
    partners: boolean,       // Show partners on this page?
    reviews: boolean         // Show reviews on this page?
  }
}
```

**Placement Rules:**
- `home`: partners ✅ + reviews ✅
- `about`: partners ✅ + reviews ❌
- `portfolio`: partners ✅ + reviews ❌
- `services`: partners ❌ + reviews ✅
- `industries`: partners ❌ + reviews ✅

### 2. **Update `/api/ads/route.ts`**
Now queries the SQLite database for:
- **Ads**: From `ads` table (status='published', by placement)

```typescript
// Returns data structure:
{
  ads: [...],                // From ads table where placement matches
  placement: string          // The placement requested
}
```

## Database Tables Schema

### `partners` table
```sql
id          INTEGER PRIMARY KEY
name        TEXT (required)
logo        TEXT (required - URL to logo image)
url         TEXT (optional - links when clicked)
sort_order  INTEGER (controls carousel order, lower = first)
active      INTEGER (1=show, 0=hidden)
created_at  TEXT
updated_at  TEXT
```

### `client_reviews` table
```sql
id          INTEGER PRIMARY KEY
author      TEXT (required)
role        TEXT (e.g., "CEO", "Product Manager")
company     TEXT (e.g., "TechStart Nigeria")
avatar      TEXT (URL to profile image)
quote       TEXT (required - the testimonial)
rating      INTEGER (1-5 stars)
sort_order  INTEGER (display order)
active      INTEGER (1=show, 0=hidden)
created_at  TEXT
updated_at  TEXT
```

### `ads` table
```sql
id              INTEGER PRIMARY KEY
title           TEXT (required)
body            TEXT (description)
image           TEXT (URL to 1200×400px image)
link_url        TEXT (CTA link destination)
cta_label       TEXT (e.g., "Learn More", "Shop Now")
placement       TEXT (e.g., "home_banner", "sidebar", "footer")
variant         TEXT (e.g., "gradient", "image", "minimal", "neon")
share_caption   TEXT (for social sharing)
status          TEXT ('draft' or 'published' - only published shows)
impressions     INTEGER (auto-tracked)
clicks          INTEGER (auto-tracked)
starts_at       TEXT (optional - when to start showing)
ends_at         TEXT (optional - when to stop showing)
created_at      TEXT
updated_at      TEXT
```

## How to Add Partners Locally

### Using Admin Panel (Admin/ folder - Express)
1. Go to **Admin Dashboard → Partners & Logos**
2. Click **Add Partner**
3. Fill in:
   - **Name**: Company name
   - **Logo**: URL to logo image (or upload)
   - **URL**: Company website (optional)
   - **Sort Order**: Display position (0 = first)
   - **Active**: ☑ checked to show
4. Save
5. Refresh `http://localhost:3000` → SocialProof partners carousel updates

### Direct Database (for testing)
```bash
sqlite3 Admin/data/grey.db

INSERT INTO partners (name, logo, url, sort_order, active)
VALUES 
  ('Google Cloud', 'https://example.com/google-logo.png', 'https://cloud.google.com', 1, 1),
  ('AWS', 'https://example.com/aws-logo.png', 'https://aws.amazon.com', 2, 1);
```

## How to Add Ads Locally

### Using Admin Panel (Admin/ folder - Express)
1. Go to **Admin Dashboard → Advertisements**
2. Click **Create Ad**
3. Fill in:
   - **Title**: Ad headline
   - **Body**: Ad description
   - **Image**: URL to 1200×400px image (or upload)
   - **Placement**: `home_banner`, `sidebar`, `footer`, etc.
   - **CTA Label**: Button text (e.g., "Learn More")
   - **CTA Link**: Where button links to
   - **Variant**: Design style (gradient, image, minimal, neon)
   - **Status**: Set to **Published**
4. Save
5. Refresh `http://localhost:3000` → AdBanner updates

### Direct Database (for testing)
```bash
sqlite3 Admin/data/grey.db

INSERT INTO ads (title, body, image, link_url, cta_label, placement, variant, status)
VALUES 
  ('Custom Web Development', 'Build scalable apps...', 'https://unsplash.com/...', '/services/web', 'Learn More', 'home_banner', 'neon', 'published'),
  ('Mobile Apps', 'Native & cross-platform...', 'https://unsplash.com/...', '/services/mobile', 'Explore', 'home_banner', 'neon', 'published');
```

## API Endpoints (Frontend)

### GET `/api/content?page=home`
Returns partners & reviews for a page.

**Query Parameters:**
- `page` (default: "home") — Which page to show content for

**Response:**
```json
{
  "partners": [
    {"id": 1, "name": "Google Cloud", "logo": "...", "url": "..."},
    {"id": 2, "name": "AWS", "logo": "...", "url": "..."}
  ],
  "reviews": [
    {"id": 1, "author": "John", "role": "CEO", "company": "...", "avatar": "...", "quote": "...", "rating": 5}
  ],
  "placement": {"partners": true, "reviews": true}
}
```

### GET `/api/ads?placement=home_banner`
Returns ads for a specific placement.

**Query Parameters:**
- `placement` (default: "home_banner") — Which placement to fetch ads for

**Response:**
```json
{
  "ads": [
    {"id": 1, "title": "...", "body": "...", "image": "...", "link_url": "...", "cta_label": "..."}
  ],
  "placement": "home_banner"
}
```

## Frontend Components

### SocialProof Component
```tsx
import SocialProof from '@/components/SocialProof';

// In your page:
<SocialProof page="home" />
```
- Fetches from `/api/content?page=home`
- Shows partners carousel (marquee on desktop, swipe on mobile)
- Shows reviews slider (auto-rotate, swipeable)
- Only renders if data AND placement is enabled

### AdBanner Component
```tsx
import AdBanner from '@/components/futuristic/AdBanner';

// In your page:
<AdBanner placement="home_banner" variant="neon" />
```
- Fetches from `/api/ads?placement=home_banner`
- Rotates through all published ads
- Tracks impressions & clicks
- Supports multiple variants (neon, gradient, etc.)

## Troubleshooting

### Components show no data
**Check:**
1. Is the Admin/data/grey.db file readable? `ls -la Admin/data/grey.db`
2. Are there partners/ads added? `sqlite3 Admin/data/grey.db "SELECT * FROM partners;"`
3. Are they marked active/published?
   - Partners: `active = 1`
   - Ads: `status = 'published'`
   - Reviews: `active = 1`

### Placement not showing
**Fix:** Check placement rules above. For example:
- SocialProof on "services" page → reviews show, but **partners won't** (placement.partners = false)
- Add partners to placement config if needed (edit `/api/content/route.ts` line ~35)

### Images not loading
**Check:**
1. Is the URL valid? Open it in browser
2. Is the image CORS-accessible? (external URLs from Unsplash work fine)
3. For admin uploads, is the upload folder configured?

### Database locked error
**Fix:** Close any other database clients:
```bash
# Find & kill SQLite processes
lsof | grep grey.db
kill -9 <PID>

# Or restart dev server
npm run dev:next
```

## Performance Notes

- **Caching:** Add caching headers if partners/ads change infrequently
  ```typescript
  res.headers.set('Cache-Control', 'max-age=3600'); // 1 hour cache
  ```
- **Batch queries:** Both endpoints query DB on each request—OK for <100 items
- **Pagination:** If you have 1000s of ads, add pagination

## Next Steps (Optional)

1. **Add Image Upload UI** — Instead of just URLs, allow file uploads in admin panel
2. **Add Analytics** — Track ad clicks/impressions in real-time dashboard
3. **Add Scheduling** — Set start_at/end_at dates for time-limited campaigns
4. **Add Targeting** — Show different ads based on device/geolocation
5. **Add A/B Testing** — Compare ad variants' performance
