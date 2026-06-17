# Comprehensive Audit System Enhancement Plan

**Status:** In Progress  
**Date:** June 17, 2026  
**Developer:** Spencer Chike  

---

## Current State

✅ **Existing Components:**
- `screens/audit.tsx` - Frontend form + report display
- `lib/audit/engine.ts` - Core audit logic (361 lines)
- `pages/api/audit/run.ts` - API endpoint with rate limiting (43 lines)

**Current Capabilities:**
- Website audits: HTTPS, security headers, SEO, performance, accessibility basics
- GitHub repo audits: License, README, CI/CD, maintenance
- A-F grading system + percentage scores
- Finding details with fix recommendations
- Real-time audit execution

**Limitations:**
- No database persistence (reports not saved)
- No shareable links / export (PDF, JSON)
- No scheduled/background audits
- Limited audit depth (no Lighthouse, npm audit integration, OWASP checks)
- No customer support CTA at report bottom
- No audit history tracking

---

## Enhancement Roadmap

### Phase 1: Database & Persistence (CRITICAL)
- [ ] Add `audits` table to database schema
  - Fields: id, userId (nullable), website, repo, overallScore, grade, sections (JSON), createdAt, updatedAt, expiresAt
- [ ] Store each audit report for history + analytics
- [ ] Add cleanup job to expire old reports (30 days)

### Phase 2: Shareable Links & Export (HIGH)
- [ ] Generate short shareable URLs for reports (`/audit-report/[slug]`)
- [ ] Add PDF export (html2pdf or similar)
- [ ] Add JSON export
- [ ] Add QR code for sharing
- [ ] Track report views/analytics

### Phase 3: Enhanced Audit Depth (HIGH)
- [ ] Integrate Lighthouse API for performance metrics
- [ ] Run `npm audit` on GitHub repos (fetch package.json)
- [ ] OWASP Top 10 checks
- [ ] Webpack bundle analysis (if repo has frontend)
- [ ] Database checks (SQL injection detection heuristics)
- [ ] API endpoint discovery + testing
- [ ] Dependency graph analysis (outdated packages)
- [ ] Code coverage detection
- [ ] WCAG accessibility audit via axe-core

### Phase 4: Support CTA & Frontend Polish (HIGH)
- [ ] Add professional support message at report bottom
  - Company branding
  - Contact info (email, phone, WhatsApp)
  - Quick links to support portal
  - "Schedule consultation" button
- [ ] Redesign report layout for print/PDF
- [ ] Add "Share Report" modal with copy/QR/social links
- [ ] Add comparison view (audit A vs B)

### Phase 5: Advanced Features (MEDIUM)
- [ ] Scheduled audits (cron job on repos/sites)
- [ ] Webhook notifications (Slack, email on issues found)
- [ ] Audit API for programmatic access
- [ ] Bulk audit (CSV upload of URLs)
- [ ] Audit templates (preset configs for different industries)
- [ ] Team audits (organization-level tracking)

### Phase 6: Analytics & Insights (MEDIUM)
- [ ] Dashboard: audit trends over time
- [ ] Leaderboard: best/worst audited sites in directory
- [ ] Industry benchmarks
- [ ] Common issues aggregation

---

## Implementation Order

**Today (Sprint 1):**
1. ✅ Create `audits` table schema
2. ✅ Save audit reports to database
3. ✅ Generate shareable report URLs
4. ✅ Add PDF + JSON export buttons to frontend
5. ✅ Add support CTA to report footer

**This Week (Sprint 2):**
6. Integrate Lighthouse API
7. Add npm audit parsing
8. OWASP checks
9. Dependency analysis
10. Code coverage detection

**Next Week (Sprint 3):**
11. WCAG accessibility audit
12. API discovery + testing
13. Scheduled audits
14. Webhook notifications

---

## Support Message Template

**Current:** Just metadata footer  
**New:** Professional CTA at report bottom

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         NEED HELP FIXING THESE?                         │
│                                                                         │
│  The issues above are fixable. Let our team of senior engineers help   │
│  you ship a secure, fast, and maintainable product.                   │
│                                                                         │
│  📞 +234 802-8095-571          hello@greyinfotech.com.ng              │
│  💬 WhatsApp Support           Schedule a Free Consultation             │
│                                                                         │
│  Grey InfoTech — Building Software That Doesn't Suck                  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `lib/db/schema.ts` | MODIFY | Add `audits` table |
| `lib/audit/repository.ts` | CREATE | DB operations (save, fetch, list audits) |
| `lib/audit/engine.ts` | ENHANCE | Add Lighthouse, npm audit, OWASP checks |
| `lib/audit/export.ts` | CREATE | PDF/JSON export functions |
| `pages/api/audit/run.ts` | ENHANCE | Save report to DB, return with ID |
| `pages/api/audit/[id].ts` | CREATE | Fetch audit by ID (shareable link) |
| `pages/api/audit/export/[id].ts` | CREATE | Export report (PDF/JSON) |
| `screens/audit.tsx` | ENHANCE | Add export buttons, support CTA, share modal |
| `app/audit-report/[slug]/page.tsx` | CREATE | Public shareable report page |

---

## Database Schema (Drizzle)

```typescript
export const audits = pgTable('audits', {
  id: text('id').primaryKey().default(sql`nanoid()`),
  website: text('website'),
  repo: text('repo'),
  overallScore: integer('overall_score').notNull(),
  grade: text('grade').notNull(), // A-F
  summary: text('summary').notNull(),
  sections: jsonb('sections').notNull(), // AuditSection[]
  findings: jsonb('findings'), // denormalized for search
  userId: text('user_id'), // optional, for authenticated audits
  externalId: text('external_id').unique(), // for sharing
  isPublic: boolean('is_public').default(true),
  viewCount: integer('view_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  expiresAt: timestamp('expires_at'), // 30 days from creation
});
```

---

## API Enhancements

### POST /api/audit/run
**Before:** Returns report only  
**After:** Saves to DB, returns `{report, id, shareUrl}`

### GET /api/audit/[id]
**New:** Fetch audit by ID, increment view count

### GET /api/audit/[id]/export?format=pdf|json
**New:** Export report in requested format

### GET /api/audit/latest?website=...&repo=...
**New:** Get cached latest audit (for scheduled checks)

---

## Frontend Enhancements

### Report Footer (Support CTA)
```tsx
<div className="mt-12 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 p-8">
  <h3>Need Help Fixing These Issues?</h3>
  <p>Our team of senior engineers can help you ship secure, fast code.</p>
  <div className="flex gap-4 mt-4">
    <button>📞 +234 802 809 5571</button>
    <button>💬 WhatsApp Chat</button>
    <button>✉️ hello@greyinfotech.com.ng</button>
  </div>
</div>
```

### Export & Share Buttons
```tsx
<div className="flex gap-2 mt-6">
  <button onClick={exportPDF}>📄 Export PDF</button>
  <button onClick={exportJSON}>📋 Export JSON</button>
  <button onClick={openShareModal}>🔗 Share Report</button>
</div>
```

---

## Testing Checklist

- [ ] Audit saves to DB with all data intact
- [ ] Shareable URL generates correct slug
- [ ] PDF export includes all sections + findings
- [ ] JSON export valid schema
- [ ] Support CTA appears on every report
- [ ] Public reports accessible via shareable link
- [ ] Private reports require auth (future)
- [ ] Lighthouse integration runs without timeout
- [ ] npm audit parsing extracts vulnerabilities correctly
- [ ] OWASP checks fire correctly
- [ ] Report comparison works
- [ ] Bulk audit handles 50+ URLs

---

## Success Metrics

- Audit reports saved and retrievable ✅
- 100% uptime on audits (no timeout failures)
- PDF exports under 2MB
- Shareable links get 80%+ click-through rate
- Support CTA conversion: 5%+ (contact requests)
- Audit depth scoring: 92+/100 average

---

## Notes

- Keep rate limiting: 8 audits per 10 minutes (abuse-proof)
- Lighthouse API requires API key (optional, fallback to heuristics)
- npm audit requires repo access token (optional, fallback to GitHub API)
- OWASP checks can be heuristic-based; full SAST/DAST requires paid tools
- PDF generation: use `html2pdf` or server-side rendering
- Support CTA: make it visually distinct but not aggressive

---

**Next Step:** Implement Phase 1 (Database) today.
