# How to Display Reviews on SocialProof Component

## Issue: Reviews Not Showing
If you don't see the "What clients say" testimonial section on your home page, it's because there are no reviews in your database yet.

## Quick Fix: Add Test Reviews

### Option 1: Automatic Script (Easiest)
```bash
cd /home/user/grey-fresh
node scripts/add-test-reviews.js

# Output should show:
# ✅ Added 3 test reviews successfully!
```

Then visit http://localhost:3000 and you should see the reviews carousel rotating.

### Option 2: Manual SQL (Advanced)
```bash
sqlite3 Admin/data/grey.db

-- Insert 3 sample reviews
INSERT INTO client_reviews (author, role, company, avatar, quote, rating, active) VALUES
  ('Ahmed Hassan', 'Founder', 'Innovation Hub Lagos', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed', 'Graham Sobiribo Paul transformed our business!', 5, 1),
  ('Chioma Adeyemi', 'Product Manager', 'Digital Africa', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma', 'Delivered on time and within budget.', 5, 1),
  ('John Okafor', 'CEO', 'TechStart Nigeria', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', 'Professional team, built our 50K+ user app!', 5, 1);

-- Verify they exist
SELECT id, author, company, rating, active FROM client_reviews;

.exit
```

### Option 3: Admin Panel
1. Go to Admin Dashboard → Client Reviews
2. Click "Add Review"
3. Fill in:
   - **Author:** Customer name
   - **Role:** Job title (CEO, Product Manager, etc.)
   - **Company:** Company name
   - **Avatar:** Profile image URL (optional)
   - **Quote:** Testimonial text
   - **Rating:** 1-5 stars
   - **Active:** ☑ checked
4. Save
5. Refresh http://localhost:3000

## What Should Appear

When reviews are added:
- ✅ "What clients say" section appears below partners carousel
- ✅ Shows rotating testimonials (changes every 6 seconds)
- ✅ Each review shows: stars + quote + author name + role/company
- ✅ Navigation arrows and dots to manually browse reviews
- ✅ Pause on hover, resume on mouse leave

## Review Data Structure

```typescript
interface Review {
    id: number;
    author: string;        // Customer name (required)
    role: string;          // Job title (optional)
    company: string;       // Company name (optional)
    avatar: string;        // Profile image URL (optional)
    quote: string;         // Testimonial text (required)
    rating: number;        // 1-5 stars (default: 5)
    sort_order: number;    // Display order (lower = first)
    active: number;        // 1 = show, 0 = hide
    created_at: string;    // Auto-generated
    updated_at: string;    // Auto-generated
}
```

## Testing Locally

### After adding reviews:
```bash
# 1. Stop dev server if running
# Ctrl+C

# 2. Restart
npm run dev:next

# 3. Visit http://localhost:3000
# 4. Scroll down, look for "What clients say"
# 5. You should see rotating testimonials ✅
```

### Test API directly:
```bash
# Verify reviews are in database
curl http://localhost:3000/api/content?page=home | grep -A 50 "reviews"

# Output should show:
# "reviews": [
#   {"id": 1, "author": "Ahmed Hassan", "company": "...", "quote": "...", "rating": 5},
#   ...
# ]
```

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "What clients say" section missing | No active reviews in DB | Use script or SQL above |
| Reviews showing but not rotating | Only 1 review | Add at least 2 reviews |
| Wrong author/company shown | Wrong data in DB | Delete & re-add with correct data |
| No avatar pictures | Avatar URL broken | Use valid image URL or remove avatar field |
| Placeholder avatars instead | Avatar URL not loading | Check URL in browser, use Unsplash/Dicebear |

## Avatar URLs (Examples)

Use these if you don't have custom avatars:

```
# Dicebear (random avatars with seed):
https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed
https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma
https://api.dicebear.com/7.x/avataaars/svg?seed=John

# Placeholder:
https://via.placeholder.com/100x100?text=AH

# Real images (Unsplash):
https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop
```

## Configuration

### Change Review Rotation Speed
Edit `components/SocialProof.tsx` line ~220:

```typescript
useEffect(() => {
    if (paused || count <= 1) return;
    const t = setInterval(() => setIdx((c) => (c + 1) % count), 6000);
    //                                                            ^^^^^ Change to 8000 for 8s
    return () => clearInterval(t);
}, [paused, count]);
```

### Show/Hide Reviews on Specific Pages
Edit `/app/api/content/route.ts` line ~36:

```typescript
const placementConfig: Record<string, { partners: boolean; reviews: boolean }> = {
  home: { partners: true, reviews: true },        // Show on home
  about: { partners: true, reviews: false },      // Hide on about
  portfolio: { partners: true, reviews: false },  // Hide on portfolio
  services: { partners: false, reviews: true },   // Show on services
  industries: { partners: false, reviews: true }, // Show on industries
};
```

## What Next

1. ✅ **Add reviews** using one of the 3 methods above
2. ✅ **Test locally** - refresh http://localhost:3000
3. ✅ **See rotating testimonials** in "What clients say" section
4. ✅ **Add more reviews** via admin panel as needed
5. ✅ **Deploy to production** when ready

---

**Status:** ✅ Reviews component working, just needs data in database
