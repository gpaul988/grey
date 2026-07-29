# Live Notifications System - Complete Implementation

## Overview
The backend notification system now sends **real-time live notifications** to the admin dashboard whenever:
- ✅ Forms are filled (submissions)
- ✅ Career applications are made  
- ✅ Audit requests are submitted
- ✅ Sales/payments are completed
- ✅ Ads are clicked
- ✅ New leads/tickets come in

## Architecture

### 1. **Notification Broadcasting Pipeline**
```
Frontend Event → API Endpoint → Create Notification (DB) → Broadcast to Admin → SSE → Toast + Badge Update
```

### 2. **Components**

#### A. Public API Endpoints (Trigger Notifications)
- `POST /api/submit-form` - Contact form submissions
- `POST /api/career-apply` - Career applications
- `POST /api/audit/submit` - Audit requests
- `POST /api/store/payment/verify` - Sales/payments
- `POST /api/ads` - Ad clicks tracking

#### B. Admin Broadcast Endpoint
- `POST /admin/api/notify-submission` - Receives notification events (uses `ADMIN_API_SECRET` for auth)

#### C. SSE Event Stream
- `GET /admin/events` - Server-Sent Events stream for real-time updates
- Broadcasts events: `notification`, `submission`, `audit`, `sale`, `ad_click`, `ticket`, `lead`, etc.

#### D. Frontend SSE Listeners
- File: `Admin/views/partials/footer-scripts.ejs`
- Listens for all event types
- Shows toast notifications
- Updates badge counts
- Auto-reloads relevant pages

## Implementation Details

### Event Types & Messages

| Event Type | Trigger | Toast Message | Badge Update |
|-----------|---------|---------------|--------------|
| `submission` | Form submitted | "New Contact Form Submission" | ✓ |
| `application` | Career app submitted | "New Career Application" | ✓ |
| `audit` | Audit request created | "New Audit Request" | ✓ |
| `sale` | Payment verified | "New Sale" | ✓ |
| `ad_click` | Ad clicked by user | "Ad Click Recorded" | ✓ |
| `ticket` | Support ticket created | "New Ticket" | ✓ |
| `lead` | Lead generated | "New Lead" | ✓ |

### Notification Flow Example: Contact Form Submission

```typescript
// 1. User submits form at /api/submit-form
POST /api/submit-form
Body: { name, email, phone, message, ... }
↓
// 2. Form inserted into SQLite database
INSERT INTO submissions (name, email, ...)
↓
// 3. Trigger admin notification (non-blocking)
POST /admin/api/notify-submission
{
  action: 'create',
  type: 'submission',
  id: submissionId,
  name: 'John Doe',
  email: 'john@example.com'
}
↓
// 4. Create persistent notification record
INSERT INTO notifications (type, title, message, status, ...)
↓
// 5. Broadcast to all connected admin tabs via SSE
broadcast('notification', {
  action: 'create',
  title: 'New Contact Form Submission',
  message: 'New submission from John Doe (john@example.com)',
  type: 'submission',
  unreadCount: 3
})
↓
// 6. Admin browser receives SSE event
EventSource listener → showToast() → updateBadge()
↓
// 7. Admin sees:
//  - Toast notification appears
//  - Badge count updated: .noti-icon-badge shows "3"
//  - If on /notifications page, page auto-reloads in 1.5s
```

## Files Modified

### 1. **Backend Notification Handler**
File: `Admin/routes/api.ts` (lines 28-93)
- Enhanced `POST /admin/api/notify-submission` endpoint
- Supports notification types: submission, application, subscription, audit, sale, ad_click
- Creates persistent notification records in database
- Broadcasts to all connected tabs via SSE

### 2. **Public API Endpoints**

#### Contact Form Submission
File: `app/api/submit-form/route.ts` (lines 202-222, 256-272)
- Calls `/admin/api/notify-submission` after form is saved
- Includes name, email, submission ID

#### Career Applications  
File: `app/api/career-apply/route.ts` (lines 253-272)
- Calls `/admin/api/notify-submission` after application is saved
- Includes applicant name, email, application ID

#### Audit Submissions
File: `app/api/audit/submit/route.ts` (lines 85-108)
- Calls `/admin/api/notify-submission` after audit is saved
- Includes requestor name, email, audit ID

#### Store Payments (Sales)
File: `app/api/store/payment/verify/route.ts` (lines 56-81)
- Calls `/admin/api/notify-submission` after payment is verified
- Includes order ID, customer ID, payment amount

#### Ad Click Tracking
File: `app/api/ads/route.ts` (lines 36-89)
- **NEW**: `POST /api/ads` endpoint with click tracking
- Increments `clicks` counter for ad
- Calls `/admin/api/notify-submission` with ad_click event
- Includes ad title and click count

### 3. **Admin Frontend SSE Listeners**
File: `Admin/views/partials/footer-scripts.ejs` (lines 75-127)
- Added listeners for: `notification`, `audit`, `sale`, `ad_click`
- Existing listeners: `ticket`, `submission`, `lead`, `stats`
- Each listener shows appropriate toast and updates relevant page

## Testing the System

### Test 1: Submit Contact Form
1. Visit `http://localhost:3000/contact` (frontend)
2. Fill and submit the contact form
3. **Expected**: Toast appears on admin dashboard, badge updates
4. Admin should see: "New Contact Form Submission from [Name]"

### Test 2: Submit Career Application
1. Visit `http://localhost:3000/careers/apply`
2. Fill and submit career application form
3. **Expected**: Toast appears on admin, badge updates
4. Admin should see: "New Career Application from [Name]"

### Test 3: Submit Audit Request
1. Visit `http://localhost:3000/audit`
2. Fill and submit audit request form
3. **Expected**: Toast appears on admin, badge updates
4. Admin should see: "New Audit Request from [Name]"

### Test 4: Record Ad Click
1. Open admin dashboard
2. Go to `/admin/ads` and create a test ad (status: published, active: true)
3. Visit homepage `/` - Ad should display
4. Click the ad
5. **Expected**: Toast appears on admin: "Ad Click Recorded"
6. Check ad details - clicks counter should increment

### Test 5: Record Store Payment
1. Visit `/store` and add product to cart
2. Proceed to checkout and complete payment
3. **Expected**: Toast appears on admin: "New Sale"
4. Admin should see order details

### Test 6: Verify Multi-Tab Updates
1. Open admin dashboard in two browser tabs
2. Submit a form from frontend
3. **Expected**: Both tabs receive notification simultaneously
4. Toast appears in both tabs, badge updates in both

## Testing with cURL

### Test Contact Form Notification (Direct)
```bash
curl -X POST http://localhost:3000/admin/api/notify-submission \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: default-secret-key" \
  -d '{
    "action": "create",
    "type": "submission",
    "id": 1,
    "name": "Test User",
    "email": "test@example.com"
  }'
```

### Test Audit Notification
```bash
curl -X POST http://localhost:3000/admin/api/notify-submission \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: default-secret-key" \
  -d '{
    "action": "create",
    "type": "audit",
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### Test Sale Notification
```bash
curl -X POST http://localhost:3000/admin/api/notify-submission \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: default-secret-key" \
  -d '{
    "action": "create",
    "type": "sale",
    "id": 100,
    "name": "50000",
    "email": "order@store.com"
  }'
```

### Test Ad Click Notification
```bash
curl -X POST http://localhost:3000/admin/api/notify-submission \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: default-secret-key" \
  -d '{
    "action": "create",
    "type": "ad_click",
    "id": 1,
    "name": "Promo Banner Ad",
    "email": "ad-click"
  }'
```

## Verification Checklist

- [x] Contact form → Notification trigger added
- [x] Career application → Notification trigger added
- [x] Audit submission → Notification trigger added
- [x] Store payment/sale → Notification trigger added
- [x] Ad click tracking → Implemented with notifications
- [x] SSE event listeners → Added for all event types
- [x] Toast notifications → Configured for all types
- [x] Badge updates → Real-time unread count
- [x] Database notifications → Persisted in notifications table
- [x] TypeScript build → ✅ Passes
- [x] Multi-tab support → Verified via SSE broadcast

## Environment Variables

Ensure these are set in `.env.local`:

```env
# Admin API Secret (used to authenticate notification broadcasts)
ADMIN_API_SECRET=your-secret-key

# Admin Base URL (for internal API calls)
ADMIN_BASE_URL=http://localhost:3000

# Admin Email (receives notification emails)
ADMIN_EMAIL=hello@greyinfotech.com.ng

# SMTP Configuration (for email notifications)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Troubleshooting

### Notifications not appearing on admin dashboard?
1. Check browser console for SSE connection errors
2. Verify `ADMIN_API_SECRET` matches in `.env.local` and `.env`
3. Ensure `/admin/events` SSE endpoint is accessible
4. Check Firefox/Safari allow EventSource connections

### Toast appearing but badge not updating?
1. Verify `.noti-icon-badge` element exists in `Admin/views/partials/topbar.ejs`
2. Check `updateBadge()` function in footer-scripts.ejs
3. Ensure `unreadCount` is being passed in broadcast payload

### Notifications not persisted in database?
1. Check `notifications` table exists (auto-created on first notification)
2. Verify Notifications model in `Admin/models/index.ts`
3. Check database file permissions at `Admin/data/grey.db`

### Payment notifications not triggering?
1. Verify payment status is 'verified' before broadcasting
2. Check `createStorePayment()` is returning valid payment record
3. Ensure `ADMIN_API_SECRET` is transmitted in payment callback

## Performance Notes

- **Non-blocking**: All notification broadcasts use `fetch().catch()` so failures don't block form submission
- **SSE Backoff**: Auto-reconnects with exponential backoff (3s → 6s → 12s → 60s cap)
- **Database**: Notifications indexed by status and created_at for fast queries
- **Badge Updates**: Client-side DOM update, no server round-trip needed

## Future Enhancements

- [ ] Notification preferences (which events to enable/disable)
- [ ] Email digests (hourly/daily summary of notifications)
- [ ] Notification filtering/search in admin UI
- [ ] Push notifications for mobile (PWA)
- [ ] Webhook integrations for external systems
- [ ] Notification retention policy (auto-delete after N days)

---

**Last Updated**: 2026-07-29
**Status**: ✅ LIVE & TESTED
