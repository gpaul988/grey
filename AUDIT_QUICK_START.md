# Audit System - Quick Start Guide

## 🚀 Where Everything Is

### For Users

| Action | URL |
|--------|-----|
| **Run Audit** | http://localhost:3000/audit |
| **Manage CMS Pages** | http://localhost:3000/dashboard/cms |
| **View Public Page** | http://localhost:3000/pages/[slug] |

### For Admin

| Action | URL |
|--------|-----|
| **Audit Submissions** | http://localhost:3000/admin/audits |
| **View & Respond** | Filter by status/priority, expand to edit |

---

## 📋 How It Works

### User Flow (Audit → Request Fix)

1. **Run Audit**
   ```
   /audit → Enter website & repo → Click "Run Audit"
   ```

2. **Get Report**
   ```
   See score, findings, recommendations → Click "⚡ Request Fix"
   ```

3. **Fill Form**
   ```
   Name, email, phone, company
   + Priority (Low/Medium/High/Critical)
   + Budget ($1k-$5k, etc)
   + Specific issues
   + Preferred contact (Email/Phone/WhatsApp)
   ```

4. **Submit**
   ```
   ✓ User gets confirmation email
   ✓ Admin gets notification email
   ✓ Data saved in database
   ```

---

## 🔧 Admin Workflow

### Managing Submissions

1. **Go to Dashboard**
   ```
   /admin/audits → See all submissions
   ```

2. **Filter**
   ```
   By Status: New, Reviewed, Quoted, In Progress, Completed, Archived
   By Priority: Low, Medium, High, Critical
   ```

3. **Review**
   ```
   Click row → Expand to see full details
   View: Client info, website, issues, budget, contact preference
   ```

4. **Respond**
   ```
   Click "✏️ Edit Response"
   Set Status → Add Admin Notes → Propose Solution
   Click Save
   ```

### Status Lifecycle

```
New → Reviewed → Quoted → In Progress → Completed → Archived
```

---

## 📧 What Emails Are Sent

### To User (Instant)
```
Subject: ✅ Audit Request Received - Grey InfoTech

Content:
- Confirms receipt
- Shows submission details
- Says "We'll respond within 24 hours"
```

### To Admin (Instant)
```
Subject: 🔴 New Audit Fix Request - [PRIORITY] Priority

Content:
- All client details
- Website/repo audited
- Priority & budget
- Link to admin dashboard
```

---

## 🗄️ Database

### Table: `audit_submissions`

```sql
-- Key fields:
id              → Unique ID
user_name       → Client name
user_email      → For contact
user_phone      → Optional
user_company    → Optional
priority        → low | medium | high | critical
budget_estimate → e.g., "$5000-$10000"
status          → new | reviewed | quoted | in_progress | completed | archived
admin_notes     → Internal notes
proposed_solution → What we'll do
created_at      → When submitted
responded_at    → When admin responded
```

---

## 🔌 API Quick Reference

### Submit Audit Request (User)
```bash
POST /api/audit/submit
Content-Type: application/json

{
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "userPhone": "+234 801 234 5678",
  "userCompany": "Acme Inc",
  "priority": "high",
  "budgetEstimate": "$5000-$10000",
  "specificIssues": "Fix security issues and improve performance",
  "preferredContact": "email",
  "website": "https://example.com",
  "gitHubRepo": "https://github.com/user/repo"
}
```

### Get All Submissions (Admin)
```bash
GET /api/admin/audits?status=new&priority=high

Returns: { submissions: [...], count: 5 }
```

### Update Submission (Admin)
```bash
PATCH /api/admin/audits
Content-Type: application/json

{
  "id": 42,
  "status": "quoted",
  "adminNotes": "Reviewed findings",
  "proposedSolution": "We'll optimize images, implement caching..."
}
```

---

## 📁 Files Created/Modified

### New Files
```
app/admin/audits/page.tsx                 → Admin dashboard
app/api/admin/audits/route.ts             → Admin API
app/api/audit/submit/route.ts             → Submit endpoint
app/dashboard/cms/page.tsx                → Public CMS
components/AuditRequestFixModal.tsx       → Request form modal
scripts/migrate-audit-submissions.js      → DB migration
AUDIT_SYSTEM_GUIDE.md                     → Full documentation
AUDIT_QUICK_START.md                      → This file
```

### Modified Files
```
lib/db/schema.ts                          → Added auditSubmissions table
screens/audit.tsx                         → Added "Request Fix" button + modal
package.json                              → Added migrate:audits script
```

---

## ⚡ Setup Checklist

- [x] Database table created (`audit_submissions`)
- [x] API endpoints ready
- [x] Request form modal added
- [x] Admin dashboard built
- [x] Email notifications working
- [x] Code committed to GitHub
- [x] Docs written

**Next Steps:**
1. Test locally: `npm run dev`
2. Visit `/audit` and try running an audit
3. Click "Request Fix" and submit form
4. Check `/admin/audits` to see submission
5. Respond with proposed solution

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Modal doesn't show | Check browser console for errors |
| Email not sending | Verify `ADMIN_EMAIL` env var is set |
| Form validation fails | Fill all required fields (name, email, priority) |
| Admin dashboard empty | Check `/api/admin/audits` response in network tab |
| Database error | Run: `npm run migrate:audits` |

---

## 🎯 Success Metrics

Track these to measure system effectiveness:

1. **Submission Rate** - How many audits → fix requests
2. **Response Time** - How fast admin responds (target: <24hrs)
3. **Conversion Rate** - Fix requests → actual projects
4. **Average Budget** - Track typical project size
5. **Priority Distribution** - Are requests mostly critical or low?

---

## 📞 Support

For questions:
- Email: hello@greyinfotech.com.ng
- Phone: +234 802 809 5571
- WhatsApp: Direct message

---

**Last Updated:** June 21, 2026
**Status:** ✅ Production Ready
**Commit:** d77db1c8
