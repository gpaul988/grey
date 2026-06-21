# Audit System & CMS Integration Guide

## Overview

This document explains the new **Audit Submission System** and **Public CMS Dashboard** integrated into the Grey InfoTech platform.

---

## Features

### 1. **Audit Fix Request System**
Users can run audits on their websites/repos and directly request fixes from the audit results page.

**Flow:**
1. User runs audit at `/audit`
2. Receives audit report with findings
3. Clicks **"⚡ Request Fix"** button
4. Fills out request form with:
   - Name, email, phone, company
   - Priority level (Low/Medium/High/Critical)
   - Budget range ($1k-$5k, $5k-$10k, etc.)
   - Specific issues to focus on
   - Preferred contact method (Email/Phone/WhatsApp)
5. Submission is stored in database + confirmation email sent to user + admin notification

### 2. **Public CMS Dashboard**
Content management system accessible to everyone at `/dashboard/cms`

**Features:**
- Create new pages (title, slug, content)
- Edit existing pages
- Delete pages
- Search pages
- Publish/draft status
- View public page at `/pages/[slug]`

### 3. **Admin Audit Dashboard**
Dedicated admin panel at `/admin/audits` to manage all audit requests

**Features:**
- View all audit submissions
- Filter by status (New/Reviewed/Quoted/In Progress/Completed/Archived)
- Filter by priority (Low/Medium/High/Critical)
- Expand submissions to see full details
- Edit status, add admin notes, propose solutions
- Email notifications automatically sent

---

## Database Schema

### `audit_submissions` Table

```sql
CREATE TABLE audit_submissions (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT,
  user_company TEXT,
  audit_report_id TEXT,
  website TEXT,
  github_repo TEXT,
  priority TEXT NOT NULL DEFAULT 'medium', -- critical | high | medium | low
  budget_estimate TEXT,
  specific_issues TEXT,
  preferred_contact TEXT NOT NULL DEFAULT 'email', -- email | phone | whatsapp
  audit_data JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new', -- new | reviewed | quoted | in_progress | completed | archived
  admin_notes TEXT,
  proposed_solution TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMP
);
```

**Indexes:**
- `idx_audit_submissions_email` - Quick lookup by user email
- `idx_audit_submissions_status` - Filter by status
- `idx_audit_submissions_priority` - Filter by priority
- `idx_audit_submissions_report_id` - Link to audit reports

---

## API Endpoints

### Submit Audit Request
```
POST /api/audit/submit

Body:
{
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "userPhone": "+234 801 234 5678",
  "userCompany": "Acme Corp",
  "auditReportId": "ext_123abc",
  "website": "https://example.com",
  "gitHubRepo": "https://github.com/user/repo",
  "priority": "high",
  "budgetEstimate": "$5000-$10000",
  "specificIssues": "Fix SSL errors and improve performance",
  "preferredContact": "email",
  "auditData": { /* full audit report */ }
}

Response:
{
  "success": true,
  "message": "Audit submission received...",
  "submissionId": 42
}
```

### Get All Submissions (Admin)
```
GET /api/admin/audits?status=new&priority=high&limit=50&offset=0

Response:
{
  "submissions": [ /* array of submissions */ ],
  "count": 5
}
```

### Update Submission (Admin)
```
PATCH /api/admin/audits

Body:
{
  "id": 42,
  "status": "quoted",
  "adminNotes": "Client needs performance audit focused on load time",
  "proposedSolution": "We will optimize images, implement caching, and upgrade hosting..."
}

Response:
{
  "success": true,
  "submission": { /* updated submission */ }
}
```

### Delete Submission (Admin)
```
DELETE /api/admin/audits?id=42

Response:
{
  "success": true
}
```

---

## File Structure

```
grey/
├── app/
│   ├── admin/
│   │   └── audits/
│   │       └── page.tsx              # Admin dashboard
│   ├── api/
│   │   ├── admin/
│   │   │   └── audits/
│   │   │       └── route.ts          # Admin API endpoints
│   │   └── audit/
│   │       └── submit/
│   │           └── route.ts          # Submit audit request
│   └── dashboard/
│       └── cms/
│           └── page.tsx              # Public CMS dashboard
├── components/
│   └── AuditRequestFixModal.tsx      # Request fix modal form
├── screens/
│   └── audit.tsx                     # Updated with "Request Fix" button
├── lib/
│   └── db/
│       └── schema.ts                 # Added auditSubmissions table
└── scripts/
    └── migrate-audit-submissions.js  # Database migration
```

---

## Setup Instructions

### Local Development

1. **Run Migration**
   ```bash
   npm run migrate:audits
   ```
   This creates the `audit_submissions` table in SQLite.

2. **Set Environment Variables**
   ```bash
   # .env.local
   ADMIN_EMAIL=hello@greyinfotech.com.ng
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Start Dev Server**
   ```bash
   npm run dev
   ```

4. **Access the System**
   - Audit page: http://localhost:3000/audit
   - CMS dashboard: http://localhost:3000/dashboard/cms
   - Admin dashboard: http://localhost:3000/admin/audits

### Production (cPanel)

1. **Database Setup**
   - PostgreSQL table is created during deployment
   - Or manually run the SQL from `scripts/migrate-audit-submissions.js`

2. **Email Configuration**
   - Set `ADMIN_EMAIL` in production environment variables
   - Ensure `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` are configured

3. **Deploy**
   ```bash
   git push origin main
   ```
   GitHub Actions will deploy to cPanel automatically.

---

## Workflow

### For Users

1. **Run Audit**
   - Go to `/audit`
   - Enter website URL and/or GitHub repo
   - Click "Run Audit"
   - Get comprehensive report

2. **Request Fixes**
   - Click "⚡ Request Fix" button on report
   - Fill in contact details and preferences
   - Select priority and budget range
   - Specify which issues to focus on
   - Submit

3. **Receive Confirmation**
   - Get instant confirmation email
   - Submission ID for reference
   - Admin will respond within 24 hours

### For Admin

1. **Monitor Submissions**
   - Visit `/admin/audits`
   - See all new submissions
   - Filter by status or priority

2. **Review & Respond**
   - Expand submission to see full details
   - Add internal notes
   - Prepare cost estimate
   - Write proposed solution
   - Update status to "Quoted"
   - System automatically tracks response time

3. **Manage Project**
   - Update status as work progresses
   - Keep notes on what's being done
   - Move to "Completed" when finished

4. **Archive**
   - Once project complete, move to "Archived"
   - Easy to search historical submissions

---

## Email Notifications

### User Confirmation Email
Sent when audit fix request is submitted:
- Confirms receipt of request
- Shows submission ID
- Summarizes request details (priority, budget, contact method)
- Sets expectation: "We'll review and respond within 24 hours"

### Admin Notification Email
Sent to `ADMIN_EMAIL`:
- Client name, email, phone, company
- Website and/or repo audited
- Priority and budget info
- Specific issues mentioned
- Link to admin dashboard for quick action

---

## Security Considerations

- **Admin endpoints** require authentication (TODO: Add auth checks)
- **Email addresses** are validated before storing
- **Audit data** is stored as JSON for flexibility
- **Status tracking** allows admins to manage workflow
- **Preferred contact method** respects user preferences

---

## Future Enhancements

1. **Email Templates** - Customize confirmation/notification emails
2. **Automatic Quotes** - Generate cost estimates based on audit severity
3. **Client Portal** - Let users track their project status
4. **Webhooks** - Notify external systems (CRM, project management)
5. **Analytics** - Track submission sources, conversion rates, avg response time
6. **File Uploads** - Attach supporting documents to submissions
7. **Commenting** - Admin-client communication within dashboard
8. **SLA Tracking** - Automated reminders for response deadlines

---

## Troubleshooting

### Issue: Submission not saving
- Check `ADMIN_EMAIL` is set in `.env.local`
- Verify database migration ran: `node scripts/migrate-audit-submissions.js`
- Check browser console for validation errors

### Issue: Emails not sending
- Verify email service is configured
- Check `NEXT_PUBLIC_SITE_URL` matches your domain
- Check admin email address is valid

### Issue: Admin dashboard not showing submissions
- Add auth check to `/api/admin/audits` endpoint
- Verify current user has admin role

### Issue: Modal not appearing on audit page
- Check `AuditRequestFixModal` component is imported
- Verify `showFixModal` state is being toggled
- Check browser console for errors

---

## Support

For questions or issues:
- Email: hello@greyinfotech.com.ng
- Phone: +234 802 809 5571
- WhatsApp: Direct message support

---

**Last Updated:** June 21, 2026
**Version:** 1.0
**Author:** Grey InfoTech Team
