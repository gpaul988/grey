# Deployment Setup Guide - API Fixes

## Quick Start (5 minutes)

### 1. Database Migration
If using PostgreSQL, run the migration:
```bash
psql -d grey -f migrations/004_add_faqs_table.sql
```

If using SQLite (default):
```bash
# Already handled by Drizzle ORM on first run
# Tables will be created automatically
```

### 2. Environment Configuration
Update `.env.local` or cPanel environment variables:

```bash
# Required for Email Notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@greyinfotech.com.ng
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@greyinfotech.com.ng
SMTP_SECURE=false
ADMIN_EMAIL=admin@greyinfotech.com.ng

# Optional: Admin API Token for GET endpoints
ADMIN_API_TOKEN=your-secure-admin-token-here

# Existing Configuration (keep as is)
DATABASE_URL=file:./Admin/data/grey.db  # or PostgreSQL URL
NODE_ENV=production
```

### 3. Test Email Configuration
Send a test email:
```bash
node -e "
const { send } = require('./lib/email.ts');
send({
  to: 'test@example.com',
  subject: 'Test Email',
  html: '<p>Email configuration working!</p>'
}).then(r => console.log(r));
"
```

### 4. Verify API Endpoints
```bash
# Test FAQs endpoint
curl http://your-domain/api/faqs

# Test Subscribe endpoint
curl -X POST http://your-domain/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test Contact Form
curl -X POST http://your-domain/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test",
    "email":"test@example.com",
    "telephone":"1234567890",
    "country":"Nigeria",
    "projectType":"Web Development",
    "industryType":"Technology",
    "subject":"Development",
    "message":"Test"
  }'
```

---

## Detailed Setup Instructions

### Email Configuration (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (custom name)"
   - Copy the 16-character password

3. **Set Environment Variables:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@greyinfotech.com.ng
   SMTP_PASSWORD=[paste-16-char-password-here]
   SMTP_FROM=noreply@greyinfotech.com.ng
   SMTP_SECURE=false
   ```

### Email Configuration (Custom SMTP)

```env
SMTP_HOST=mail.example.com
SMTP_PORT=587
SMTP_USER=noreply@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@example.com
SMTP_SECURE=false  # Use true for port 465
```

### Email Configuration (SendGrid)

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG.xxxxxxxxxxxxx  # Your SendGrid API key
SMTP_FROM=noreply@greyinfotech.com.ng
SMTP_SECURE=false
```

---

## Troubleshooting

### Issue: "Failed to send email" or emails not arriving

**Check:**
1. SMTP credentials are correct
2. SMTP_HOST is not a URL (just hostname: `smtp.gmail.com`)
3. Gmail: Enable "Less secure app access" or use App Password
4. Firewall not blocking SMTP port 587 or 465
5. Check logs: `tail -f server.log | grep Email`

**Solution:**
```bash
# Test SMTP connection directly
telnet smtp.gmail.com 587
```

### Issue: 404 on form submission

**Check:**
1. API endpoint file exists: `ls -la /app/api/submit-form/route.ts`
2. Endpoint is exported: `export async function POST(req: NextRequest)`
3. No TypeScript errors: `npm run build`
4. Correct URL in form component: `/api/submit-form` not `/submit-form`

**Solution:**
```bash
# Rebuild and restart
npm run build
npm start
```

### Issue: FAQs page shows empty

**Check:**
1. FAQs table created: Check database with `psql` or SQLite Browser
2. FAQ data seeded: Run migration again
3. API returns data: `curl http://localhost:3000/api/faqs`

**Solution:**
```bash
# Reseed FAQs
psql -d grey -c "DELETE FROM faqs; INSERT INTO faqs (...) VALUES (...);"
```

### Issue: Subscribe endpoint returns 500

**Check:**
1. Email validation: `emailValid('test@example.com')`
2. SMTP configuration is correct
3. Logs show error details

**Solution:**
```bash
# Check server logs for detailed error
tail -f .next/server.log
```

---

## Monitoring & Logging

### Enable Debug Logging
```env
LOG_LEVEL=debug
NODE_ENV=development
```

### Monitor API Requests
```bash
# Watch for API calls
tail -f server.log | grep -E "POST|GET /api/"

# Or use npm package: npm install morgan
```

### Check Database
```bash
# SQLite
sqlite3 Admin/data/grey.db "SELECT COUNT(*) FROM faqs;"

# PostgreSQL
psql -d grey -c "SELECT COUNT(*) FROM faqs;"
```

---

## Performance Tuning

### FAQ Caching (Optional)
Add Redis caching for FAQs:

```typescript
// app/api/faqs/route.ts
import { redis } from '@/lib/redis';

export async function GET(req: NextRequest) {
  // Check cache first
  const cached = await redis.get('faqs:all');
  if (cached) return NextResponse.json(JSON.parse(cached));
  
  // ... fetch from DB ...
  
  // Cache for 1 hour
  await redis.setex('faqs:all', 3600, JSON.stringify(result));
  return NextResponse.json(result);
}
```

### Database Indexes
FAQs table already has indexes on:
- `category` - for filtering by category
- `active` - for showing only active FAQs

No additional indexes needed unless table grows to 100k+ records.

### Email Queue (Optional)
Consider adding job queue for reliable email delivery:

```bash
npm install bull bull-board
```

---

## Security Checklist

- [ ] SMTP passwords in `.env` (not in code)
- [ ] ADMIN_API_TOKEN set and strong (32+ characters)
- [ ] Email validation working on all forms
- [ ] Rate limiting enabled on public endpoints
- [ ] CORS properly configured if needed
- [ ] Database backups scheduled
- [ ] Error messages don't expose sensitive info
- [ ] HTTPS enabled (cPanel SSL)

---

## Post-Deployment Verification

Run these tests after deployment:

### 1. API Health Check
```bash
curl -I http://your-domain/api/faqs  # Should return 200
curl -I http://your-domain/api/submit-form  # Should return 405 (GET not allowed)
```

### 2. Form Submission Test
1. Visit http://your-domain/contact
2. Fill form completely
3. Submit
4. Check browser console for success message (201 status)
5. Check your admin email received notification

### 3. FAQ Loading Test
1. Visit http://your-domain/faq
2. Should see FAQ list (not empty)
3. Search should work
4. Category filtering should work

### 4. Email Delivery Test
1. Submit contact form
2. Check spam/junk folders
3. Verify sender is correct (noreply@greyinfotech.com.ng)
4. Verify all links work

---

## Rollback Plan

If issues occur after deployment:

### Quick Rollback
```bash
# Revert to previous version (if using git)
git revert HEAD
npm install
npm run build
npm start
```

### Database Rollback
```bash
# Restore from backup (must have backup ready)
psql -d grey < backup-$(date -d '1 day ago' +%Y%m%d).sql
```

### Disable Email Notifications (Temporary)
```bash
# Set to non-existent SMTP (or empty)
SMTP_HOST=localhost:9999
```

---

## Support & Debugging

### Getting Help

1. Check logs: `tail -100 server.log`
2. Check database: `sqlite3 Admin/data/grey.db ".tables"`
3. Test endpoint: `curl -v http://localhost:3000/api/faqs`
4. Check process: `ps aux | grep node`

### Enable Debug Mode
```env
DEBUG=*
LOG_LEVEL=debug
NODE_ENV=development
```

### Test Email Endpoint
```typescript
// Create a test route: /api/test-email
import { send } from '@/lib/email';

export async function POST(req: NextRequest) {
  const result = await send({
    to: 'test@example.com',
    subject: 'Test',
    html: '<p>Test</p>'
  });
  return NextResponse.json(result);
}
```

---

## Success Indicators

✅ All forms submitting successfully (200-201 responses)  
✅ Emails being delivered to inbox (not spam folder)  
✅ FAQ page loading with visible content  
✅ No 404 errors in browser console  
✅ Admin receiving form notifications  
✅ Users receiving confirmation emails  

---

## Maintenance Tasks

### Weekly
- [ ] Check form submissions count: `SELECT COUNT(*) FROM submissions WHERE created_at > NOW() - INTERVAL '7 days';`
- [ ] Review error logs
- [ ] Test email delivery with real address

### Monthly
- [ ] Database backup
- [ ] Review FAQ content for relevance
- [ ] Update email templates if needed
- [ ] Check SPAM folder for missed emails

### Quarterly
- [ ] Security audit
- [ ] Performance optimization
- [ ] Update dependencies

---

## Next Features to Implement

1. **Newsletter Database Storage**
   - Create `newsletters` table
   - Track subscription status
   - Add unsubscribe link to emails

2. **Voice Services**
   - Integrate OpenAI Whisper for transcription
   - Add text-to-speech (ElevenLabs, Google Cloud)
   - Build voice chat UI

3. **Store Payment**
   - Implement `/api/store/checkout`
   - Add order management
   - Integrate Stripe webhooks

4. **Advanced Analytics**
   - Track form abandonment
   - Monitor email bounce rates
   - Dashboard with metrics

---

**Setup Time:** ~15 minutes  
**Complexity:** Medium  
**Risk Level:** Low (no breaking changes)  

For questions, check the main COMPLETE_API_FIXES_REPORT.md file.
