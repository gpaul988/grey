# Audit System - Deployment Checklist

## ✅ Pre-Deployment (Before Push to Main)

- [x] Database schema created (`audit_submissions` table)
- [x] Migration script written (`scripts/migrate-audit-submissions.js`)
- [x] API endpoints tested locally (`/api/audit/submit`, `/api/admin/audits`)
- [x] Frontend components built (`AuditRequestFixModal`, `/admin/audits`, `/dashboard/cms`)
- [x] Email templates configured
- [x] Environment variables documented
- [x] Code committed to GitHub
- [x] Documentation completed

---

## 🚀 Deployment Steps (cPanel)

### 1. **Environment Variables**

Add these to cPanel `.env.production`:

```bash
# Email Configuration
ADMIN_EMAIL=hello@greyinfotech.com.ng
NEXT_PUBLIC_SITE_URL=https://greyinf.com/grey

# Database (PostgreSQL on cPanel)
DATABASE_URL=postgresql://user:password@host:5432/grey_db

# SMTP (if not already configured)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
SMTP_FROM=noreply@greyinfotech.com.ng
```

### 2. **Database Setup**

**Option A: Auto-migration (if SSH access)**
```bash
ssh user@server1
cd /home/greyinf1/public_html/grey

# Run migration script
node scripts/migrate-audit-submissions.js
```

**Option B: Manual SQL (via cPanel phpMyAdmin)**

Copy SQL from `scripts/migrate-audit-submissions.js` and execute:

```sql
CREATE TABLE IF NOT EXISTS audit_submissions (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT,
  user_company TEXT,
  audit_report_id TEXT,
  website TEXT,
  github_repo TEXT,
  priority TEXT NOT NULL DEFAULT 'medium',
  budget_estimate TEXT,
  specific_issues TEXT,
  preferred_contact TEXT NOT NULL DEFAULT 'email',
  audit_data JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  proposed_solution TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_audit_submissions_email ON audit_submissions(user_email);
CREATE INDEX idx_audit_submissions_status ON audit_submissions(status);
CREATE INDEX idx_audit_submissions_priority ON audit_submissions(priority);
CREATE INDEX idx_audit_submissions_report_id ON audit_submissions(audit_report_id);
```

### 3. **Deploy Code**

GitHub Actions automatically deploys when you push to `main`:

```bash
# Local machine
cd grey
git add -A
git commit -m "your commit message"
git push origin main

# GitHub Actions triggers:
# 1. Runs tests
# 2. Builds Next.js
# 3. Deploys to cPanel via SSH
```

**Monitor deployment:**
- Go to GitHub repo → Actions tab
- Watch deploy.yml workflow
- Should complete in 2-5 minutes

### 4. **Verify Deployment**

After GitHub Actions completes:

```bash
# Test API endpoints
curl https://greyinf.com/grey/api/admin/audits

# Visit pages
https://greyinf.com/grey/audit
https://greyinf.com/grey/dashboard/cms
https://greyinf.com/grey/admin/audits
```

---

## 🧪 Post-Deployment Testing

### 1. **Audit Flow**

- [ ] Visit `/audit`
- [ ] Enter test website: https://google.com
- [ ] Click "Run Audit"
- [ ] Wait for results (5-20 seconds)
- [ ] See report with score
- [ ] Click "⚡ Request Fix"
- [ ] Modal appears
- [ ] Fill form with test data
- [ ] Submit
- [ ] See success message
- [ ] Check email inbox for confirmation

### 2. **Admin Dashboard**

- [ ] Visit `/admin/audits`
- [ ] See submission from test
- [ ] Click to expand
- [ ] Click "✏️ Edit Response"
- [ ] Change status to "Reviewed"
- [ ] Add admin notes
- [ ] Add proposed solution
- [ ] Save
- [ ] Verify changes saved

### 3. **CMS Dashboard**

- [ ] Visit `/dashboard/cms`
- [ ] Click "New Page"
- [ ] Fill: Title = "Test Page", Slug = "test-page"
- [ ] Add content
- [ ] Click "Create Page"
- [ ] See page in list
- [ ] Click "Edit" → Change content → Save
- [ ] Click "View" → See public page
- [ ] Click "Delete" → Confirm → Page gone

### 4. **Email Verification**

- [ ] Admin received notification email
- [ ] Email contains:
  - [x] Client name & contact
  - [x] Website/repo info
  - [x] Priority badge
  - [x] Budget range
  - [x] Link to admin dashboard
- [ ] User received confirmation email
- [ ] Email contains:
  - [x] Submission ID
  - [x] Request summary
  - [x] "24-hour response" message

### 5. **Database Verification**

Via phpMyAdmin or cPanel:

```sql
-- Check table exists
SHOW TABLES LIKE 'audit_submissions';

-- Check data inserted
SELECT COUNT(*) FROM audit_submissions;

-- View test submission
SELECT * FROM audit_submissions ORDER BY id DESC LIMIT 1;
```

Should show:
- Table exists ✓
- 1+ records ✓
- All fields populated ✓

---

## 🔍 Monitoring & Logs

### Application Logs

Check cPanel error logs:
```
cPanel → Metrics → Error Log
```

Look for:
- [ ] No 500 errors
- [ ] No database connection errors
- [ ] No email send failures

### Database Monitoring

cPanel → MySQL/PostgreSQL:
- [ ] Connection active
- [ ] No connection timeouts
- [ ] Query performance OK

### Email Delivery

- [ ] Check spam folder for test emails
- [ ] Verify sender email is correct
- [ ] Check email domains are DKIM/SPF signed

---

## 🐛 Troubleshooting

### Issue: "Cannot POST /api/audit/submit"

**Cause:** Next.js routing issue

**Fix:**
1. Check `/app/api/audit/submit/route.ts` exists
2. Verify file has `export async function POST`
3. Rebuild: `npm run build`
4. Restart app

### Issue: Modal doesn't appear on audit page

**Cause:** Component import missing

**Fix:**
```bash
# Check screens/audit.tsx has:
import { AuditRequestFixModal } from '@/components/AuditRequestFixModal';

# Verify component exists:
ls -la components/AuditRequestFixModal.tsx
```

### Issue: Emails not sending

**Cause:** SMTP not configured

**Fix:**
1. Verify `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` in `.env.production`
2. Check SMTP credentials are correct
3. Whitelist sending address in cPanel email
4. Check email logs in cPanel

### Issue: Database error on submission

**Cause:** Table doesn't exist

**Fix:**
```bash
# SSH to server
ssh user@server1

# Run migration
cd /home/greyinf1/public_html/grey
node scripts/migrate-audit-submissions.js

# Or manually create table via phpMyAdmin
```

### Issue: Admin dashboard shows "No submissions"

**Cause:** 
- API endpoint not returning data
- Database empty
- Wrong status filter

**Fix:**
1. Check browser DevTools → Network tab
2. Click `/api/admin/audits` request
3. Check response JSON
4. If empty, check database directly
5. If filtered, remove filters

### Issue: "Unauthorized" error on admin endpoints

**Cause:** Auth check not yet implemented

**Fix:**
```js
// Temporarily disable auth in /app/api/admin/audits/route.ts
// TODO: Add auth check once user system is in place

// In endpoints, comment out:
// const session = await getSession();
// if (!session) return Unauthorized error
```

---

## 📊 Performance Baseline

After deployment, measure these:

| Metric | Target | Actual |
|--------|--------|--------|
| Audit page load | <2s | __ |
| Audit run time | 15-20s | __ |
| Form submission | <1s | __ |
| Admin list load | <1s | __ |
| Email send delay | <2s | __ |

---

## 🔒 Security Checklist

- [x] Email validation on input
- [x] Required field validation
- [x] Submitted data sanitized before DB
- [x] Database uses parameterized queries (Drizzle ORM)
- [x] No sensitive data in logs
- [ ] TODO: Add auth check to admin endpoints
- [ ] TODO: Implement rate limiting on form submission
- [ ] TODO: Add CSRF token to form

---

## 📚 Documentation Links

- **Quick Start:** [AUDIT_QUICK_START.md](./AUDIT_QUICK_START.md)
- **Full Guide:** [AUDIT_SYSTEM_GUIDE.md](./AUDIT_SYSTEM_GUIDE.md)
- **Architecture:** [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md)
- **Deployment:** [CPANEL_DEPLOYMENT_GUIDE.md](./CPANEL_DEPLOYMENT_GUIDE.md)

---

## ✅ Sign-Off

After all checks pass:

```
Deployment Date: _____________
Tested By: ___________________
Environment: Production (cPanel)
Status: ✅ READY / ⚠️ BLOCKED

Issues Found: ________________
Actions Taken: ________________
Notes: ________________________
```

---

**Last Updated:** June 21, 2026
**Version:** 1.0
**Deployed By:** [Your Name]
