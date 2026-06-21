# System Architecture - Audit + CMS Integration

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER-FACING FEATURES                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. AUDIT RUNNER        2. CMS DASHBOARD      3. FIX REQUEST │
│     /audit              /dashboard/cms        (modal form)    │
│     • Run audit         • Create pages        • Contact info  │
│     • Get report        • Edit pages          • Priority      │
│     • Share results     • Delete pages        • Budget        │
│     • Export JSON/HTML  • Search pages        • Issues        │
│                         • Publish/draft       • Contact pref  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND SERVICES                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  API Endpoints:                                               │
│  • POST /api/audit/submit           → Save submission        │
│  • GET /api/admin/audits            → Fetch submissions      │
│  • PATCH /api/admin/audits          → Update submission      │
│  • DELETE /api/admin/audits         → Delete submission      │
│  • GET/POST/PATCH /api/cms/pages    → CMS operations        │
│                                                               │
│  Email Service:                                               │
│  • User confirmation email                                   │
│  • Admin notification email                                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (PostgreSQL)                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Tables:                                                     │
│  • audit_submissions ← NEW                                  │
│  • cms_pages ← NEW                                          │
│  • users, submissions, services, etc. (existing)            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN DASHBOARD                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  /admin/audits → View all submissions                       │
│  • Filter by status (new, reviewed, quoted, etc)            │
│  • Filter by priority (low, medium, high, critical)         │
│  • Expand to see full details                               │
│  • Edit response & proposed solution                        │
│  • Track response time                                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 User Journey - Complete Flow

```
                         USER STARTS HERE
                              ↓
                    ┌─────────────────┐
                    │  Visit /audit   │
                    └────────┬────────┘
                             ↓
           ┌─────────────────────────────────────┐
           │  Enter website URL &/or GitHub repo │
           │  Click "Run Audit"                  │
           └────────┬────────────────────────────┘
                    ↓
         ┌──────────────────────────────┐
         │  Get Audit Results Report    │
         │  • Score/Grade               │
         │  • Findings by severity      │
         │  • Recommendations           │
         │  • Share/Export buttons      │
         └────────┬─────────────────────┘
                  ↓
        ┌──────────────────────────┐
        │  User sees issues, needs │
        │  help fixing them        │
        │                          │
        │  Click "⚡ Request Fix"   │
        └────────┬─────────────────┘
                 ↓
    ┌────────────────────────────────────┐
    │  Modal Opens: Request Fix Form      │
    │  Collect:                           │
    │  - Name, email, phone, company      │
    │  - Priority level                   │
    │  - Budget range                     │
    │  - Specific issues to focus on      │
    │  - Preferred contact method         │
    │  Click "Submit Fix Request"         │
    └────────┬───────────────────────────┘
             ↓
  ┌──────────────────────────────────────┐
  │  API: POST /api/audit/submit          │
  │  Validate & save to database          │
  └────────┬─────────────────────────────┘
           ↓
   ┌───────────────────────────┐
   │  Send 2 Confirmation      │
   │  Emails:                  │
   │  1. To User:              │
   │     "Thanks, we received" │
   │                           │
   │  2. To Admin:             │
   │     "New audit request"   │
   └───────────────────────────┘
           ↓
  ┌──────────────────────────────────┐
  │  Success message shown to user    │
  │  "Request submitted! We'll        │
  │   review within 24 hours"        │
  └──────────────────────────────────┘
```

---

## 👨‍💼 Admin Workflow

```
                    ADMIN STARTS HERE
                         ↓
           ┌──────────────────────────┐
           │  Visit /admin/audits     │
           │  See all submissions     │
           └────────┬─────────────────┘
                    ↓
    ┌────────────────────────────────────┐
    │  Filter Options:                    │
    │  - By Status (dropdown)             │
    │  - By Priority (dropdown)           │
    │  - Sort by date (newest first)      │
    └────────┬───────────────────────────┘
             ↓
   ┌─────────────────────────────────┐
   │  See List of Submissions         │
   │  • Status badge                  │
   │  • Priority badge                │
   │  • Client name & email           │
   │  • Website/Repo                  │
   │  • Submission date               │
   │  Click to expand ▼               │
   └────────┬────────────────────────┘
            ↓
  ┌──────────────────────────────────┐
  │  Expansion Details Show:          │
  │  • Phone & company                │
  │  • Preferred contact method       │
  │  • Budget range                   │
  │  • Specific issues description    │
  │  • Button: "✏️ Edit Response"     │
  └────────┬─────────────────────────┘
           ↓
 ┌────────────────────────────────────┐
 │  Click "Edit Response"              │
 │  Form appears:                      │
 │  • Status dropdown (→ quoted)       │
 │  • Admin notes textarea             │
 │  • Proposed solution textarea       │
 │  Save button                        │
 └────────┬───────────────────────────┘
          ↓
 ┌────────────────────────────────────┐
 │  API: PATCH /api/admin/audits      │
 │  Update in database                │
 │  Mark responded_at timestamp       │
 └────────┬───────────────────────────┘
          ↓
┌──────────────────────────────────┐
│  Success! Response saved         │
│  Status: new → reviewed → ...    │
│                                 │
│  Return to list, move to next   │
│  submission                     │
└──────────────────────────────────┘
```

---

## 🗂️ Database Schema

```
┌─────────────────────────────────────────────────────────┐
│                  audit_submissions                       │
├─────────────────────────────────────────────────────────┤
│ id (PK)                  → Unique ID (auto-increment)    │
│                                                          │
│ User Info:                                               │
│ • user_name              → Client name                   │
│ • user_email             → For contact (indexed)         │
│ • user_phone             → Optional phone                │
│ • user_company           → Optional company name         │
│                                                          │
│ Audit Context:                                           │
│ • audit_report_id        → Link to audit report          │
│ • website                → Website audited               │
│ • github_repo            → Repo audited                  │
│                                                          │
│ Request Details:                                         │
│ • priority               → low|medium|high|critical      │
│ • budget_estimate        → e.g., "$5000-$10000"         │
│ • specific_issues        → What to focus on              │
│ • preferred_contact      → email|phone|whatsapp          │
│ • audit_data             → Full audit JSON (JSONB)       │
│                                                          │
│ Response Tracking:                                       │
│ • status                 → new|reviewed|quoted|...       │
│ • admin_notes            → Internal notes                │
│ • proposed_solution      → What we'll do                 │
│                                                          │
│ Timestamps:                                              │
│ • created_at             → When submitted                │
│ • updated_at             → Last update                   │
│ • responded_at           → When admin responded          │
│                                                          │
│ Indexes:                                                 │
│ • idx_audit_submissions_email                           │
│ • idx_audit_submissions_status                          │
│ • idx_audit_submissions_priority                        │
│ • idx_audit_submissions_report_id                       │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Status Lifecycle

```
           ┌─────────────┐
           │     NEW     │
           │ (Received)  │
           └──────┬──────┘
                  ↓
           ┌─────────────────┐
           │    REVIEWED     │
           │ (Admin looked)  │
           └────────┬────────┘
                    ↓
           ┌─────────────────┐
           │    QUOTED       │
           │ (Price sent)    │
           └────────┬────────┘
                    ↓
           ┌──────────────────┐
           │  IN_PROGRESS     │
           │ (Work started)   │
           └────────┬─────────┘
                    ↓
           ┌──────────────────┐
           │   COMPLETED      │
           │ (Project done)   │
           └────────┬─────────┘
                    ↓
           ┌──────────────────┐
           │    ARCHIVED      │
           │ (Filed away)     │
           └──────────────────┘

Alternate: Can move to ARCHIVED at any point
```

---

## 📧 Email Flow

```
USER SUBMITS REQUEST
        ↓
┌─────────────────────────────────┐
│  Email 1: To User               │
├─────────────────────────────────┤
│ Subject: ✅ Audit Request       │
│           Received              │
│                                 │
│ Body:                           │
│ • Thanks for submitting         │
│ • Shows submission ID           │
│ • Summarizes request            │
│ • "24-hour response time"       │
│                                 │
│ Trigger: After POST succeeded   │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  Email 2: To Admin              │
├─────────────────────────────────┤
│ Subject: 🔴 New Audit Request   │
│           [PRIORITY]            │
│                                 │
│ Body:                           │
│ • Full client details           │
│ • Website/repo info             │
│ • Priority & budget             │
│ • Link to admin dashboard       │
│                                 │
│ Trigger: After POST succeeded   │
└─────────────────────────────────┘
```

---

## 🔐 Security Flow

```
REQUEST RECEIVED
       ↓
┌──────────────────────┐
│ 1. Validate Email    │
│    Regex check       │
└─────────┬────────────┘
          ↓
┌─────────────────────────────┐
│ 2. Validate Required Fields  │
│    name, email, priority     │
└──────────┬──────────────────┘
           ↓
┌──────────────────────────────┐
│ 3. Store in Database         │
│    (INSERT INTO)             │
└──────────┬───────────────────┘
           ↓
┌──────────────────────────────┐
│ 4. Return Success            │
│    + Submission ID           │
└──────────────────────────────┘

If validation fails → 400 error + message
If DB error → 500 error + message
```

---

## 🚀 Deployment Pipeline

```
LOCAL DEVELOPMENT
  ↓
CODE COMMIT
  ↓
GIT PUSH origin main
  ↓
GITHUB ACTIONS TRIGGERED
  ├─ Run tests
  ├─ Build Next.js
  └─ Deploy to cPanel
      ↓
  SSH to server1 (greyinf1)
      ↓
  Pull latest code
      ↓
  Run migrations
      ↓
  Restart service
      ↓
LIVE ON https://greyinf.com/grey
```

---

## 📈 Scalability Considerations

### Current Capacity
- SQLite (dev): ∞ (limited by disk)
- PostgreSQL (prod): ∞ (unlimited)
- Email: Rate-limited by SMTP provider

### Performance Optimizations
- Indexes on `email`, `status`, `priority`, `report_id`
- JSONB for flexible audit data
- Pagination ready (limit/offset params)

### Future Scaling
- Archive old submissions (archived status)
- Separate read replicas for reporting
- Cache frequently filtered views
- Add full-text search on `specific_issues`

---

**Last Updated:** June 21, 2026
**Version:** 1.0
