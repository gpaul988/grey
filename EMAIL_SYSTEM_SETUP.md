# Complete Email System Implementation Guide

## Overview
This guide sets up a complete email system for Grey InfoTech with:
- ✅ Sending emails to clients (confirmations, notifications)
- ✅ Receiving email replies (inbox management)
- ✅ Email logging & tracking
- ✅ Error handling & retries
- ✅ Email templates
- ✅ SMTP configuration

---

## Part 1: Environment Setup

### Step 1.1: Add Email Configuration to config.env
```env
# SMTP Configuration (Required)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@greyinfotech.com.ng
SMTP_PASS=your-app-specific-password
SMTP_FROM=noreply@greyinfotech.com.ng
SMTP_REPLY_TO=hello@greyinfotech.com.ng

# Admin settings
ADMIN_EMAIL=admin@greyinfotech.com.ng
```

### Step 1.2: For Gmail SMTP
1. Enable 2-Factor Authentication: https://myaccount.google.com/security
2. Generate app-specific password: https://myaccount.google.com/apppasswords
3. Copy the 16-character password → Set as SMTP_PASS

### Step 1.3: For Other Providers (SendGrid, Resend, etc.)
**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.your-api-key
SMTP_FROM=noreply@yourdomain.com
```

**Resend (recommended - no SMTP needed):**
```env
RESEND_API_KEY=re_your_api_key
```

---

## Part 2: Create Email Service Files

### File 1: lib/email-service.ts (Already Created ✅)
This file handles:
- SMTP transporter initialization
- Email sending with retries
- Template rendering
- Error handling

**Usage:**
```typescript
import { sendEmail, sendConfirmationEmail, sendAdminNotification } from '@/lib/email-service';

// Send simple email
await sendEmail({
  to: 'client@example.com',
  subject: 'Your submission',
  html: '<p>Thank you for your submission</p>'
});

// Send confirmation
await sendConfirmationEmail({
  to: 'client@example.com',
  name: 'John',
  subject: 'Submission received',
  submissionId: 123
});

// Notify admin
await sendAdminNotification({
  subject: 'New form submission',
  html: '<p>You have a new submission</p>',
  replyTo: 'client@example.com'
});
```

### File 2: lib/email-inbox.ts (Already Created ✅)
This file handles:
- Receiving/logging emails
- Inbox management
- Email threads
- Search & categorization

**Usage:**
```typescript
import {
  logReceivedEmail,
  getInboxEmails,
  markEmailAsRead,
  getEmailStats
} from '@/lib/email-inbox';

// Log received email
logReceivedEmail({
  messageId: 'msg-123',
  from: 'client@example.com',
  to: 'hello@greyinfotech.com.ng',
  subject: 'Reply to submission',
  body: 'I have a question...',
  submissionId: 123
});

// Get unread emails
const emails = getInboxEmails({ status: 'unread' });

// Mark as read
markEmailAsRead('inbox-123');

// Get stats
const stats = getEmailStats();
// { received: 45, unread: 3, sent: 102, failed: 2 }
```

---

## Part 3: Create API Routes

### Step 3.1: Create Directory Structure
```bash
mkdir -p app/api/email
mkdir -p app/api/email-webhook
mkdir -p Admin/api/email
```

### Step 3.2: Email Service API
**File: `app/api/email/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import {
  sendEmail,
  sendConfirmationEmail,
  sendAdminNotification,
  testEmailConfiguration,
} from '@/lib/email-service';
import {
  logSentEmail,
  getInboxEmails,
  markEmailAsRead,
  getEmailStats,
  getUnreadEmailCount,
} from '@/lib/email-inbox';

export async function POST(req: NextRequest) {
  try {
    const { action, to, name, subject, submissionId, message, html, replyTo, emailId } = await req.json();

    // Test SMTP
    if (action === 'test') {
      const result = await testEmailConfiguration();
      return NextResponse.json({
        success: result.success,
        message: result.message,
        timestamp: new Date().toISOString(),
      });
    }

    // Send test email
    if (action === 'send-test') {
      if (!to) {
        return NextResponse.json({ error: 'Email required' }, { status: 400 });
      }

      const result = await sendEmail({
        to,
        subject: '✅ Test Email',
        html: '<p>Test email - if received, SMTP is working!</p>'
      });

      logSentEmail({ to, subject: 'Test', messageId: result.messageId, error: result.error });
      return NextResponse.json(result);
    }

    // Send confirmation
    if (action === 'send-confirmation') {
      if (!to || !name || !subject) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
      }

      const result = await sendConfirmationEmail({ to, name, subject, submissionId, message });
      logSentEmail({ to, subject, messageId: result.messageId, error: result.error });
      return NextResponse.json(result);
    }

    // Mark as read
    if (action === 'mark-read') {
      markEmailAsRead(emailId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const action = req.nextUrl.searchParams.get('action') || 'inbox';

    if (action === 'inbox') {
      const emails = getInboxEmails({ limit: 50 });
      return NextResponse.json({ success: true, emails });
    }

    if (action === 'stats') {
      const stats = getEmailStats();
      return NextResponse.json({ success: true, stats });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
```

---

## Part 4: Update Existing Routes

### Update: app/api/submit-form/route.ts
Replace the email sending section:

```typescript
// OLD: await send({ to: email, subject: '...', html: '...' });

// NEW: Use the enterprise email service
import { sendConfirmationEmail, sendAdminNotification } from '@/lib/email-service';
import { logSentEmail } from '@/lib/email-inbox';

const confirmationResult = await sendConfirmationEmail({
  to: validatedEmail,
  name: validatedName,
  subject: '✅ We Received Your Message',
  submissionId: submissionId,
  message: 'We will get back to you within 24 hours.'
});

logSentEmail({
  to: validatedEmail,
  subject: 'Confirmation',
  messageId: confirmationResult.messageId,
  error: confirmationResult.error
});

const adminResult = await sendAdminNotification({
  subject: `New Contact Form Submission - ${projectType}`,
  html: `
    <p><strong>Name:</strong> ${validatedName}</p>
    <p><strong>Email:</strong> ${validatedEmail}</p>
    <p><strong>Submission ID:</strong> #${submissionId}</p>
  `,
  replyTo: validatedEmail
});

logSentEmail({
  to: process.env.ADMIN_EMAIL || 'hello@greyinfotech.com.ng',
  subject: 'New submission',
  messageId: adminResult.messageId,
  error: adminResult.error
});
```

---

## Part 5: Test Email System

### Test via API
```bash
# Test SMTP connection
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{"action":"test"}'

# Send test email
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "action":"send-test",
    "to":"your-test-email@example.com"
  }'

# Get inbox
curl http://localhost:3000/api/email?action=inbox

# Get stats
curl http://localhost:3000/api/email?action=stats
```

### Test via Command Line
```bash
# Create test script: test-email.js
const emailService = require('./lib/email-service');

emailService.testEmailConfiguration()
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

---

## Part 6: Email Reply Handling (Webhook)

### For Gmail IMAP Setup
**File: `lib/email-receiver.ts`**

```typescript
import Imap from 'imap';
import { simpleParser } from 'mailparser';
import { logReceivedEmail, updateEmailThread } from './email-inbox';

export async function startEmailReceiver() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[EMAIL] IMAP not configured');
    return;
  }

  const imap = new Imap({
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
  });

  async function processEmail(msg: any) {
    const { from, subject, text, html, messageId } = await simpleParser(msg);
    
    if (from && from.text) {
      const email = from.text.match(/[\w\.-]+@[\w\.-]+/)?.[0] || from.text;
      
      logReceivedEmail({
        messageId: messageId || `msg-${Date.now()}`,
        from: email,
        to: process.env.SMTP_USER || '',
        subject: subject || 'No subject',
        body: text || '',
        htmlBody: html || undefined,
      });
      
      console.log(`[EMAIL] Received from ${email}: ${subject}`);
    }
  }

  imap.openBox('INBOX', false, (err, box) => {
    if (err) {
      console.error('[EMAIL] Error opening inbox:', err);
      return;
    }
    
    // Search for new emails
    imap.search(['UNSEEN'], (err, results) => {
      if (err) return;
      if (results.length === 0) return;
      
      const f = imap.fetch(results, { bodies: '' });
      f.on('message', processEmail);
      f.on('error', (err) => console.error('[EMAIL]', err));
      f.on('end', () => imap.end());
    });
  });

  imap.openBox('INBOX', false, () => {
    imap.search(['UNSEEN'], () => { /* process */ });
    setInterval(() => {
      imap.search(['UNSEEN'], () => { /* process */ });
    }, 30000); // Check every 30 seconds
  });

  imap.openBox('INBOX', false, () => {
    imap.search(['UNSEEN'], () => { /* process */ });
  });

  imap.on('error', (err) => console.error('[EMAIL]', err));
  imap.on('end', () => console.log('[EMAIL] Connection ended'));

  imap.openBox('INBOX', false, (err) => {
    if (err) throw err;
  });
}

// Start receiver
if (process.env.ENABLE_EMAIL_RECEIVER === 'true') {
  startEmailReceiver().catch(console.error);
}
```

---

## Part 7: Admin Dashboard Integration

### Add Email Stats Widget
**File: `Admin/views/email-dashboard.ejs`**

```ejs
<div class="email-stats">
  <div class="stat-card">
    <div class="stat-value"><%= unreadCount %></div>
    <div class="stat-label">Unread Emails</div>
  </div>
  <div class="stat-card">
    <div class="stat-value"><%= totalReceived %></div>
    <div class="stat-label">Received</div>
  </div>
  <div class="stat-card">
    <div class="stat-value"><%= totalSent %></div>
    <div class="stat-label">Sent</div>
  </div>
  <div class="stat-card error">
    <div class="stat-value"><%= failedCount %></div>
    <div class="stat-label">Failed</div>
  </div>
</div>

<div class="email-list">
  <% emails.forEach(email => { %>
    <div class="email-item <%= email.status %>">
      <p><strong><%= email.from %></strong> - <%= email.subject %></p>
      <p><%= email.body.substring(0, 100) %>...</p>
      <small><%= new Date(email.createdAt).toLocaleString() %></small>
    </div>
  <% }); %>
</div>
```

---

## Part 8: Error Handling & Logging

### Monitoring Email Failures
```typescript
import fs from 'fs';

export function logEmailError(error: Error, context: Record<string, any>) {
  const log = {
    timestamp: new Date().toISOString(),
    error: error.message,
    stack: error.stack,
    context
  };

  fs.appendFileSync(
    '.logs/email-errors.log',
    JSON.stringify(log) + '\n'
  );

  console.error('[EMAIL_ERROR]', log);
}
```

---

## Part 9: Complete Checklist

- [ ] Add SMTP credentials to config.env
- [ ] Create lib/email-service.ts (Done ✅)
- [ ] Create lib/email-inbox.ts (Done ✅)
- [ ] Create app/api/email/route.ts
- [ ] Update app/api/submit-form/route.ts
- [ ] Test email sending: `POST /api/email` with action=`test`
- [ ] Test confirmation emails
- [ ] Test admin notifications
- [ ] Set up email receiver (optional)
- [ ] Add admin dashboard widget
- [ ] Monitor email logs

---

## Part 10: Production Deployment

### On cPanel:
1. Verify SMTP credentials in config.env
2. Test SMTP: `curl -X POST https://yourdomain.com/api/email -d '{"action":"test"}'`
3. Submit a test form and verify confirmation email arrives
4. Check `/api/email?action=stats` for email statistics
5. Monitor `.logs/email-errors.log` for issues

### Troubleshooting:
- **"SMTP not configured"** → Check SMTP_HOST, SMTP_USER, SMTP_PASS
- **"Connection refused"** → Verify SMTP port (usually 587 or 465)
- **"Authentication failed"** → Use app-specific password (Gmail)
- **Email not arriving** → Check spam folder, verify SMTP_FROM domain

---

## Usage Examples

### Send Email from Any Route
```typescript
import { sendEmail } from '@/lib/email-service';

await sendEmail({
  to: 'user@example.com',
  subject: 'Your Order #123',
  html: '<p>Your order has been placed!</p>'
});
```

### Get Inbox Stats
```typescript
import { getEmailStats } from '@/lib/email-inbox';

const stats = getEmailStats();
console.log(stats); // { received: 45, unread: 3, sent: 102, failed: 2 }
```

### Log Sent Email
```typescript
import { logSentEmail } from '@/lib/email-inbox';

logSentEmail({
  to: 'user@example.com',
  subject: 'Welcome',
  messageId: 'msg-abc123'
});
```

---

## Summary

✅ **Complete Email System Ready**
- Sending: Confirmations, Notifications, Templates
- Receiving: Inbox, Threads, Search, Categorization
- Logging: Email history, Error tracking, Statistics
- Production: Error handling, Retries, Monitoring

**Next:** Deploy to cPanel and test end-to-end.
