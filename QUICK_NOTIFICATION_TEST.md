# Quick Test Guide - Live Notifications

## Step-by-Step Testing

### Prerequisites
```bash
npm run dev
# Server should be running at http://localhost:3000
```

### Test 1: Contact Form → Notification ✅

**Setup:**
1. Open browser tab 1: `http://localhost:3000/contact`
2. Open browser tab 2: `http://localhost:3000/admin` (login if needed)

**Action:**
1. In tab 1, fill the contact form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Phone: "+1234567890"
   - Subject: "Website Inquiry"
   - Message: "I'm interested in your services"
   - Click Submit

**Expected Result (in tab 2 - Admin Dashboard):**
- ✅ Toast appears: "New Contact Form Submission"
- ✅ Message: "New submission from John Doe (john@example.com)"
- ✅ Notification badge updates with count
- ✅ Toast auto-dismisses after 6 seconds

---

### Test 2: Career Application → Notification ✅

**Setup:**
1. Open browser tab 1: `http://localhost:3000/careers/apply`
2. Keep browser tab 2: `http://localhost:3000/admin` open

**Action:**
1. In tab 1, fill the career application form:
   - Full Name: "Jane Smith"
   - Email: "jane@example.com"
   - Phone: "+1234567890"
   - Country: "USA"
   - Role Interest: "Senior Developer"
   - Experience: "5+ years"
   - Add a CV file (any PDF)
   - Click Submit

**Expected Result (in tab 2 - Admin Dashboard):**
- ✅ Toast appears: "New Career Application"
- ✅ Message: "New application from Jane Smith"
- ✅ Badge count updates
- ✅ If viewing `/admin/career-applications`, page auto-reloads after 1.5s

---

### Test 3: Audit Request → Notification ✅

**Setup:**
1. Open browser tab 1: `http://localhost:3000/audit`
2. Keep browser tab 2: `http://localhost:3000/admin` open

**Action:**
1. In tab 1, fill the audit request form:
   - Name: "Bob Johnson"
   - Email: "bob@example.com"
   - Phone: "+1234567890"
   - Website: "https://example.com"
   - Budget: "$5000"
   - Issues: "Performance optimization needed"
   - Click Submit

**Expected Result (in tab 2 - Admin Dashboard):**
- ✅ Toast appears: "New Audit Request"
- ✅ Message: "New audit request from Bob Johnson (bob@example.com)"
- ✅ Badge count updates
- ✅ If on `/admin/audits` page, auto-reloads

---

### Test 4: Ad Click → Notification ✅

**Setup:**
1. Have an ad created in admin with:
   - Status: "published"
   - Active: True
   - Placement: "home_banner"
2. Open browser tab 1: `http://localhost:3000` (homepage)
3. Keep browser tab 2: `http://localhost:3000/admin` open

**Action:**
1. In tab 1, locate the ad on the homepage
2. Click on the ad

**Expected Result (in tab 2 - Admin Dashboard):**
- ✅ Toast appears: "Ad Click"
- ✅ Message: "Ad '[Title]' was clicked"
- ✅ Badge count updates
- ✅ If on `/admin/ads` page, auto-reloads

---

### Test 5: Multi-Tab Sync ✅

**Setup:**
1. Open admin dashboard in 3 browser tabs:
   - Tab A: `http://localhost:3000/admin` (Notifications page)
   - Tab B: `http://localhost:3000/admin` (Submissions page)
   - Tab C: `http://localhost:3000/admin` (different page)
2. Open frontend tab:
   - Tab D: `http://localhost:3000/contact`

**Action:**
1. In Tab D, submit the contact form

**Expected Result:**
- ✅ Toast appears in Tab A, B, and C simultaneously
- ✅ Badge updates in all 3 tabs
- ✅ Tab A auto-refreshes notifications list
- ✅ Tab B auto-refreshes submissions list
- ✅ Tab C shows toast but doesn't refresh

---

### Test 6: Direct API Call (cURL) ✅

**Test notification broadcast directly:**

```bash
curl -X POST http://localhost:3000/admin/api/notify-submission \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: default-secret-key" \
  -d '{
    "action": "create",
    "type": "submission",
    "id": 999,
    "name": "Test User",
    "email": "test@example.com"
  }'
```

**Expected Response:**
```json
{
  "ok": true,
  "message": "Notification sent"
}
```

**In Admin Dashboard:**
- ✅ Toast appears immediately
- ✅ Badge updates with unread count

---

## Different Notification Types (cURL)

### Submission Notification
```bash
curl -X POST http://localhost:3000/admin/api/notify-submission \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: default-secret-key" \
  -d '{"action": "create", "type": "submission", "id": 1, "name": "John Doe", "email": "john@example.com"}'
```

### Career Application Notification
```bash
curl -X POST http://localhost:3000/admin/api/notify-submission \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: default-secret-key" \
  -d '{"action": "create", "type": "application", "id": 2, "name": "Jane Smith", "email": "jane@example.com"}'
```

### Audit Notification
```bash
curl -X POST http://localhost:3000/admin/api/notify-submission \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: default-secret-key" \
  -d '{"action": "create", "type": "audit", "id": 3, "name": "Bob Johnson", "email": "bob@example.com"}'
```

### Sale Notification
```bash
curl -X POST http://localhost:3000/admin/api/notify-submission \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: default-secret-key" \
  -d '{"action": "create", "type": "sale", "id": 100, "name": "5000 NGN", "email": "order@store.com"}'
```

### Ad Click Notification
```bash
curl -X POST http://localhost:3000/admin/api/notify-submission \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: default-secret-key" \
  -d '{"action": "create", "type": "ad_click", "id": 5, "name": "Promo Banner", "email": "ad-click"}'
```

---

## Debugging Checklist

### If notifications don't appear:

1. **Check browser console (F12)**
   ```
   Look for: SSE connection errors
   Should see: "connected" message when dashboard loads
   ```

2. **Verify SSE connection**
   ```bash
   # In browser console:
   fetch('/admin/events')
   # Should return 200 OK streaming response
   ```

3. **Check Admin API Secret**
   ```bash
   # Verify .env.local has:
   ADMIN_API_SECRET=default-secret-key
   ```

4. **Verify .noti-icon-badge element exists**
   ```javascript
   // In browser console:
   document.querySelector('.noti-icon-badge')
   // Should return the badge element
   ```

5. **Check toast container exists**
   ```javascript
   // In browser console:
   document.getElementById('sse-toast-container')
   // Should return the toast container
   ```

---

## Expected Badge Behavior

- **Initial State**: Badge hidden (display: none) or shows "0"
- **First Notification**: Badge shows "1"
- **Multiple Notifications**: Badge shows count (e.g., "5")
- **Badge > 99**: Badge shows "99+"
- **After Mark All Read**: Badge hidden

---

## Toast Notification Behavior

- **Display Duration**: 6 seconds (auto-dismiss)
- **Position**: Top-right (Bootstrap default)
- **Icon**: Varies by event type
  - submission: "ti-mail"
  - application: "ti-user"
  - audit: "ti-search-alt"
  - sale: "ti-shopping-cart"
  - ad_click: "ti-pointer"
- **Color**: 
  - submission: info (blue)
  - application: info (blue)
  - audit: info (blue)
  - sale: success (green)
  - ad_click: warning (orange)

---

## Performance Notes

- **Non-blocking**: Form submissions don't wait for notification broadcast
- **Retry Logic**: Auto-reconnects if SSE connection drops
- **Database**: Notifications persisted in SQLite
- **Broadcast**: All connected admin tabs receive updates simultaneously

---

## Files to Check if Debugging

If something isn't working, review these files:

1. **Admin Routes**: `Admin/routes/api.ts` (lines 28-93)
2. **Footer Scripts**: `Admin/views/partials/footer-scripts.ejs` (lines 75-127)
3. **Contact Form**: `app/api/submit-form/route.ts` (lines 202-222)
4. **Career Apply**: `app/api/career-apply/route.ts` (lines 253-272)
5. **Audit Submit**: `app/api/audit/submit/route.ts` (lines 85-108)
6. **Store Payment**: `app/api/store/payment/verify/route.ts` (lines 56-81)
7. **Ads Route**: `app/api/ads/route.ts` (lines 36-89)

---

## Summary

✅ All 5 notification types implemented and tested:
- Contact Form Submissions
- Career Applications
- Audit Requests
- Store Payments (Sales)
- Ad Clicks

✅ Features:
- Real-time SSE broadcasting
- Toast notifications with auto-dismiss
- Badge count updates
- Auto-page reload on relevant pages
- Multi-tab synchronization
- Database persistence

✨ Status: **PRODUCTION READY**
