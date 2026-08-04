# Email System - Quick Start

## 3-Minute Setup

### 1. Update config.env
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@greyinfotech.com.ng
SMTP_PASS=your-16-char-app-password
SMTP_FROM=noreply@greyinfotech.com.ng
ADMIN_EMAIL=admin@greyinfotech.com.ng
```

### 2. Create `app/api/email/route.ts`
Copy the full code from EMAIL_SYSTEM_SETUP.md (Part 3, Step 3.2)

### 3. Update `app/api/submit-form/route.ts`
Replace email sending:
```typescript
// Line ~260, replace: await send({ ... })
import { sendConfirmationEmail, sendAdminNotification } from '@/lib/email-service';
import { logSentEmail } from '@/lib/email-inbox';

// Send to user
const confirmResult = await sendConfirmationEmail({
  to: validatedEmail,
  name: validatedName,
  subject: '✅ We Received Your Message',
  submissionId: submissionId
});
logSentEmail({ to: validatedEmail, subject: 'Confirmation', messageId: confirmResult.messageId });

// Send to admin
const adminResult = await sendAdminNotification({
  subject: `New Submission - ${projectType}`,
  html: `<p><strong>Name:</strong> ${validatedName}</p><p><strong>Email:</strong> ${validatedEmail}</p>`,
  replyTo: validatedEmail
});
logSentEmail({ to: process.env.ADMIN_EMAIL, subject: 'New submission', messageId: adminResult.messageId });
```

---

## Test It

```bash
# Test SMTP
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{"action":"test"}'

# Send test email
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{"action":"send-test","to":"your-email@example.com"}'

# Check inbox
curl http://localhost:3000/api/email?action=inbox

# Check stats
curl http://localhost:3000/api/email?action=stats
```

---

## Gmail Setup (2 Minutes)

1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" + "Windows Computer"
3. Copy 16-char password → paste in SMTP_PASS
4. Done! ✅

---

## Files Included

✅ `lib/email-service.ts` - Send emails (already created)
✅ `lib/email-inbox.ts` - Receive & manage emails (already created)
✅ `EMAIL_SYSTEM_SETUP.md` - Complete implementation guide
✅ `EMAIL_SYSTEM_COMPLETE.md` - Full reference

---

## What Works Now

✅ Send confirmation emails to clients
✅ Send admin notifications
✅ Store email log in database
✅ Receive & track email replies
✅ Email statistics
✅ Automatic retries on failure
✅ Error handling & logging
✅ SMTP rate limiting
✅ Template emails

---

## Common Issues

**"SMTP not configured"**
→ Check SMTP_HOST, SMTP_USER, SMTP_PASS in config.env

**"Authentication failed"**
→ Use 16-char app password (Gmail), not regular password

**Email not arriving**
→ Check spam folder, verify SMTP_FROM domain

**Can't create api/email directory**
→ Use: `mkdir -p app/api/email` then create `route.ts` file

---

## Deployment to cPanel

1. Upload all files
2. Set SMTP credentials in cPanel env vars
3. Test: `curl https://yourdomain.com/api/email?action=stats`
4. Done! 🚀

---

**Ready?** Follow steps 1-3 above and you're good to go! ✅
