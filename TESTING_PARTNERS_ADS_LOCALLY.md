# Testing Partners & Ads Locally — Quick Start

## What Just Changed
✅ `/api/content` now reads from SQLite `partners` + `client_reviews` tables  
✅ `/api/ads` now reads from SQLite `ads` table  
✅ SocialProof & AdBanner components will display your admin panel data  

## Step-by-Step to See It Working

### Step 1: Pull Latest Code
```bash
cd /path/to/grey
git pull origin main
```

### Step 2: Add Test Partners
Open SQLite and insert test partners:
```bash
sqlite3 Admin/data/grey.db

-- Insert 3 test partners
INSERT INTO partners (name, logo, url, sort_order, active) VALUES
  ('Google Cloud', 'https://via.placeholder.com/200x80?text=Google+Cloud', 'https://cloud.google.com', 1, 1),
  ('AWS', 'https://via.placeholder.com/200x80?text=AWS', 'https://aws.amazon.com', 2, 1),
  ('Microsoft Azure', 'https://via.placeholder.com/200x80?text=Azure', 'https://azure.microsoft.com', 3, 1);

-- Verify they exist
SELECT id, name, active, sort_order FROM partners;
-- Output should show 3 rows with active=1

.exit
```

### Step 3: Add Test Reviews
```bash
sqlite3 Admin/data/grey.db

-- Insert 2 test reviews
INSERT INTO client_reviews (author, role, company, quote, rating, active) VALUES
  ('Ahmed Hassan', 'Founder', 'Innovation Hub Lagos', 'Grey InfoTech built our app. Excellent work!', 5, 1),
  ('Chioma Adeyemi', 'CEO', 'Digital Africa', 'Professional team, delivered on time and budget.', 5, 1);

-- Verify
SELECT id, author, company, rating, active FROM client_reviews;

.exit
```

### Step 4: Add Test Ads
```bash
sqlite3 Admin/data/grey.db

-- Insert 2 test ads for home_banner placement
INSERT INTO ads (title, body, image, link_url, cta_label, placement, variant, status) VALUES
  ('Web Development', 'Custom web apps built for your business', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop', '/services/web', 'Learn More', 'home_banner', 'neon', 'published'),
  ('Mobile Apps', 'Native and cross-platform apps users love', 'https://images.unsplash.com/photo-1512941691920-25463bac489c?w=1200&h=400&fit=crop', '/services/mobile', 'Explore', 'home_banner', 'neon', 'published');

-- Verify
SELECT id, title, placement, status FROM ads WHERE placement='home_banner';

.exit
```

### Step 5: Start Dev Server
```bash
npm run dev:next
# Server runs on http://localhost:3000
```

### Step 6: Test the APIs First
Open these in your browser or curl:

```bash
# Test /api/content endpoint
curl http://localhost:3000/api/content?page=home

# Expected output (should show your 3 partners + 2 reviews):
{
  "partners": [
    {"id": 1, "name": "Google Cloud", "logo": "...", "url": "..."},
    {"id": 2, "name": "AWS", "logo": "...", "url": "..."},
    {"id": 3, "name": "Microsoft Azure", "logo": "...", "url": "..."}
  ],
  "reviews": [
    {"id": 1, "author": "Ahmed Hassan", "company": "Innovation Hub Lagos", "quote": "...", "rating": 5},
    {"id": 2, "author": "Chioma Adeyemi", "company": "Digital Africa", "quote": "...", "rating": 5}
  ],
  "placement": {"partners": true, "reviews": true}
}

# Test /api/ads endpoint
curl http://localhost:3000/api/ads?placement=home_banner

# Expected output (should show your 2 ads):
{
  "ads": [
    {"id": 1, "title": "Web Development", "image": "...", "cta_label": "Learn More", ...},
    {"id": 2, "title": "Mobile Apps", "image": "...", "cta_label": "Explore", ...}
  ],
  "placement": "home_banner"
}
```

### Step 7: Visit Home Page
Open `http://localhost:3000`

**You should see:**
- ✅ **SocialProof section** with:
  - "Trusted by teams & partners" heading
  - 3 partner logos in a scrolling marquee (desktop) or swipeable cards (mobile)
  - "What clients say" heading with rotating testimonials
  - 2 reviews with stars, quotes, author info
- ✅ **AdBanner** with:
  - Your 2 ads rotating (Web Dev → Mobile Apps)
  - Neon glow effect
  - CTA buttons working

## If Nothing Shows Up

### Debug Checklist:
```bash
# 1. Check if database file exists
ls -la Admin/data/grey.db

# 2. Verify data in database
sqlite3 Admin/data/grey.db "SELECT COUNT(*) as partner_count FROM partners WHERE active=1;"
sqlite3 Admin/data/grey.db "SELECT COUNT(*) as review_count FROM client_reviews WHERE active=1;"
sqlite3 Admin/data/grey.db "SELECT COUNT(*) as ad_count FROM ads WHERE status='published' AND placement='home_banner';"

# 3. Check dev server logs for errors
# Look for "[/api/content] Error:" or "[/api/ads] Error:" messages

# 4. Test API directly from command line
curl -v http://localhost:3000/api/content?page=home 2>&1 | grep -A 50 "partners"
curl -v http://localhost:3000/api/ads?placement=home_banner 2>&1 | grep -A 50 "ads"

# 5. Check React component in DevTools
# Open browser console: F12 → Console tab
# Should see no errors like "Cannot read property of undefined"
```

### Common Issues:

| Issue | Cause | Fix |
|-------|-------|-----|
| "partners": [] | No active partners in DB | `UPDATE partners SET active=1;` |
| "reviews": [] | No active reviews in DB | `UPDATE client_reviews SET active=1;` | 
| "ads": [] | No published ads | `UPDATE ads SET status='published';` |
| API returns 500 error | Database locked/missing | Close other DB clients, restart dev |
| Components don't render | Placement=false in config | Check placement rules in `/api/content/route.ts` |

## Using Admin Panel Instead

If you prefer adding data through the admin UI (no SQL):

1. Start admin server: `npm run dev` (in Admin folder)
2. Go to `http://localhost:3001/admin`
3. Navigate to **Partners & Logos** → Add partner
4. Navigate to **Client Reviews** → Add review  
5. Navigate to **Advertisements** → Create ad (set Status=Published)
6. Refresh dev server on port 3000
7. Data should appear

## Clean Up After Testing

To delete test data:
```bash
sqlite3 Admin/data/grey.db

DELETE FROM partners WHERE id > 0;
DELETE FROM client_reviews WHERE id > 0;
DELETE FROM ads WHERE id > 0;

.exit
```

## Next Steps After Confirming This Works

1. ✅ Verify APIs return your data from DB
2. ✅ Confirm SocialProof + AdBanner render correctly
3. ✅ Test on both desktop & mobile viewports
4. 🎯 **Push to production** when ready
   - Your cPanel deployment will use the same SQLite DB
   - Or migrate to PostgreSQL (see CPANEL_DEPLOYMENT_GUIDE.md)

---

**Questions?** Check `API_DATA_INTEGRATION_GUIDE.md` for full details.
