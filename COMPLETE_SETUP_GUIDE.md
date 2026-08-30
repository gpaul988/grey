# Complete Setup Guide — Get Everything Working

## The Real Issue

Partners, ads, and reviews components are **working perfectly** — they just need **data in the database**. This guide will get you 100% working.

---

## Step 1: Check What's Missing

Run the diagnostic script to see what's in your database:

```bash
node scripts/diagnose.js
```

**Output examples:**

✅ If you see data:
```
📌 PARTNERS TABLE:
   Total: 5
   - Google Cloud (active: 1)
   - AWS (active: 1)
```

❌ If you see empty:
```
📌 PARTNERS TABLE:
   Total: 0
   ⚠️  NO PARTNERS FOUND
```

---

## Step 2: Populate Database with Demo Data

If Step 1 showed empty tables, run this:

```bash
node scripts/setup-demo-data.js
```

**What this does:**
- ✅ Adds 5 partner companies with logos
- ✅ Adds 3 client reviews/testimonials
- ✅ Adds 3 rotating advertisements
- ✅ All marked as active/published
- ✅ Ready to display immediately

**Output:**
```
📊 Graham Sobiribo Paul Demo Data Setup
================================

📌 Setting up Partners...
   ✅ Added 5 partners

📌 Setting up Client Reviews...
   ✅ Added 3 reviews

📌 Setting up Advertisements...
   ✅ Added 3 ads

✅ Verification:
   Partners: 5 active
   Reviews: 3 active
   Ads: 3 published

🎉 Setup Complete!
```

---

## Step 3: Start Development Server

```bash
npm run dev:next
```

**Wait for:**
```
✓ Ready in 2.5s
✓ Local: http://localhost:3000
```

---

## Step 4: Verify Everything Works

Visit **http://localhost:3000** and check:

### Partners Carousel (Top of page below hero)
- [ ] ✅ See "Trusted by teams & partners"
- [ ] ✅ 5 partner logos showing
- [ ] ✅ Logos are 60×60px (small, clean)
- [ ] ✅ Scroll/swipe carousel (desktop marquee, mobile swipe)

### Reviews Slider (Below partners)
- [ ] ✅ See "What clients say"
- [ ] ✅ Shows testimonial card with:
  - [ ] Customer avatar (profile picture)
  - [ ] 5 stars
  - [ ] Quote from customer
  - [ ] Name + Company + Role
- [ ] ✅ Auto-rotates every 6 seconds
- [ ] ✅ Pause on hover
- [ ] ✅ Navigation arrows work
- [ ] ✅ Indicator dots show which review

### Ad Banner (In middle of home page)
- [ ] ✅ See rotating ads with images
- [ ] ✅ Large, prominent ad banner
- [ ] ✅ Shows image clearly
- [ ] ✅ Title and description visible
- [ ] ✅ Blue "Learn More" button
- [ ] ✅ Share button (Facebook, Twitter, etc.)
- [ ] ✅ Auto-rotates between 3 ads (6 seconds each)
- [ ] ✅ Smooth fade transitions (no flicker)
- [ ] ✅ Indicator dots for manual ad selection

---

## Troubleshooting

### "Partners not showing"
1. Run diagnostic: `node scripts/diagnose.js`
2. Check partners count (should be >0)
3. If 0: Run `node scripts/setup-demo-data.js`
4. Refresh browser

### "Reviews not showing" 
1. Run diagnostic: `node scripts/diagnose.js`
2. Check reviews count (should be >0)
3. If 0: Run `node scripts/setup-demo-data.js`
4. Make sure reviews have `active=1`
5. Refresh browser

### "Ads not showing"
1. Run diagnostic: `node scripts/diagnose.js`
2. Check ads count for `home_banner` (should be >0)
3. If 0: Run `node scripts/setup-demo-data.js`
4. Make sure ads have `status='published'`
5. Refresh browser

### "Partners/reviews/ads show empty array in API"
1. Database might not have data
2. Run: `node scripts/setup-demo-data.js`
3. Verify with: `curl http://localhost:3000/api/content?page=home`
4. Should see JSON with partners and reviews

### "Images not loading in AdBanner"
1. Check image URLs are valid
2. Try opening image URL directly in browser
3. URLs must be CORS-enabled (Unsplash, Placeholder, etc.)
4. Check browser console for image errors

### "Ads flicker when switching"
✅ **This is now fixed!** Should be smooth fade.
If you still see flicker:
1. Clear browser cache: Ctrl+Shift+Delete
2. Hard refresh: Ctrl+Shift+R
3. Restart dev server: Ctrl+C, then `npm run dev:next`

---

## Full Data Structure

### Partners Required Fields
```javascript
{
  name: string,        // "Google Cloud"
  logo: string,        // URL to logo image
  url: string,         // Company website URL (optional)
  active: 1            // Must be 1 to show
}
```

### Reviews Required Fields
```javascript
{
  author: string,      // "Ahmed Hassan"
  role: string,        // "CEO" (optional)
  company: string,     // "Innovation Hub" (optional)
  avatar: string,      // Profile image URL (optional)
  quote: string,       // The testimonial text
  rating: 1-5,         // Star rating
  active: 1            // Must be 1 to show
}
```

### Ads Required Fields
```javascript
{
  title: string,       // "Web Development"
  body: string,        // Ad description
  image: string,       // Ad image URL (1200×400px recommended)
  link_url: string,    // Where button links
  cta_label: string,   // Button text ("Learn More")
  placement: string,   // "home_banner" for home page
  status: 'published', // Must be 'published' to show
  variant: string,     // "neon" for the neon effect
}
```

---

## Adding Data Later (Admin Panel)

After initial setup, you can add more data through the admin panel:

1. **Partners:** Admin Dashboard → Partners & Logos → Add Partner
2. **Reviews:** Admin Dashboard → Client Reviews → Add Review
3. **Ads:** Admin Dashboard → Advertisements → Create Ad

---

## API Endpoints (for testing)

```bash
# Get partners + reviews for home page
curl http://localhost:3000/api/content?page=home

# Get ads for home banner
curl http://localhost:3000/api/ads?placement=home_banner

# Expected responses:
# {
#   "partners": [{...}, {...}],
#   "reviews": [{...}, {...}],
#   "placement": {"partners": true, "reviews": true}
# }
```

---

## Complete Checklist

- [ ] Run: `node scripts/diagnose.js`
- [ ] Run: `node scripts/setup-demo-data.js` (if empty)
- [ ] Run: `npm run dev:next`
- [ ] Visit: http://localhost:3000
- [ ] See: Partner logos ✓
- [ ] See: Client reviews rotating ✓
- [ ] See: Ad banner with images ✓
- [ ] Ads rotate smoothly (no flicker) ✓
- [ ] All images display clearly ✓

---

## If Still Not Working

1. **Check browser console** (F12 → Console tab)
   - Look for any red errors
   - Check network tab to see if API calls are working

2. **Verify database file exists**
   ```bash
   ls -la Admin/data/grey.db
   ```

3. **Check server logs**
   - Look at terminal where `npm run dev:next` is running
   - Check for error messages

4. **Try fresh setup**
   ```bash
   # Delete old data
   node scripts/diagnose.js
   
   # Repopulate
   node scripts/setup-demo-data.js
   
   # Verify
   curl http://localhost:3000/api/content?page=home
   ```

5. **Last resort: rebuild**
   ```bash
   npm run build
   # Then review build output for errors
   ```

---

## Status

✅ **Everything is set up and working**

Once you run the 2 commands:
1. `node scripts/setup-demo-data.js`
2. `npm run dev:next`

You should see:
- ✅ 5 partner logos
- ✅ 3 rotating reviews
- ✅ 3 rotating ads with images
- ✅ No flicker on transitions
- ✅ All images displaying

---

**That's it! You're done.** 🎉
