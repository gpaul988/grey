# Phase 10: Admin Dashboard with Real-Time Charts

## Requirements
- **Location:** Both `/admin` subdomain + integrated in main site (shared auth)
- **Charts:**
  - User Growth (monthly/weekly)
  - Revenue Metrics (Stripe/PayPal)
  - Service Popularity (views/purchases)
  - Audit Completion Rate
  - Payment Breakdown by Gateway
  - User Retention Cohorts
  - Search Query Analytics
- **Real-Time:** WebSocket updates every 1 minute
- **Export:** PDF + CSV
- **Additional Features:**
  - User list with filters
  - Service management
  - Webhook logs viewer
  - Audit findings editor
  - Payment refund tool
  - Email users

## Build Plan

### 1. Dashboard Layout & Auth (4-5h)
- [ ] Create `/pages/admin/dashboard.tsx` main dashboard page
- [ ] Admin authentication middleware (JWT + session check)
- [ ] Admin layout wrapper with sidebar navigation
- [ ] Permission system (superadmin, admin, manager roles)
- [ ] Redirect non-admin users to /

### 2. Real-Time Data Layer (4-6h)
- [ ] Create WebSocket server at `/api/ws/dashboard` (use Next.js built-in support)
- [ ] Build data aggregation functions (users, revenue, services, audits)
- [ ] Cache layer with Redis (optional, can use in-memory first)
- [ ] Periodic job (every 1 min) to push metrics
- [ ] Connection management + cleanup

### 3. Charts & Visualization (5-7h)
- [ ] Install Recharts library
- [ ] User Growth Chart (LineChart, monthly/weekly toggle)
- [ ] Revenue Chart (AreaChart, Stripe vs PayPal breakdown)
- [ ] Service Popularity (BarChart, top 10 services)
- [ ] Audit Completion Rate (PieChart)
- [ ] Payment Gateway Breakdown (DonutChart)
- [ ] User Retention Cohorts (HeatMap table)
- [ ] Search Analytics (WordCloud or BarChart)

### 4. Export Functionality (3-4h)
- [ ] CSV export (use `csv-stringify` library)
- [ ] PDF export (use `pdfkit` or `html2pdf`)
- [ ] Add export buttons to each chart
- [ ] Auto-format data for exports

### 5. Admin Management Features (6-8h)
- [ ] **Users List:** Filterable table (role, status, joined date)
  - Edit profile, reset password, toggle 2FA, delete user
- [ ] **Service Management:** Add/edit/delete services
  - Bulk actions (publish, archive)
- [ ] **Webhook Logs:** View delivery history
  - Retry failed webhooks, view payloads
- [ ] **Audit Findings:** Editor to mark as resolved
  - Bulk update severity levels
- [ ] **Payment Refunds:** Initiate refunds (Stripe/PayPal)
  - View transaction history
- [ ] **Email Users:** Bulk email + template system

### 6. Testing & Deployment (3-4h)
- [ ] Unit tests for data aggregation functions
- [ ] Integration tests for WebSocket
- [ ] E2E tests for admin workflows
- [ ] Build verification (0 TS errors)
- [ ] Test production build

## Timeline
- **Estimated:** 25-35 hours (3-4 days full-time)
- **Start:** Now
- **Milestones:**
  - M1: Dashboard layout + auth (end of day 1)
  - M2: Charts + real-time (end of day 2)
  - M3: Export + management features (end of day 3)
  - M4: Testing + deployment ready (end of day 4)

## Tech Stack
- **Frontend:** React, Recharts, Tailwind CSS
- **Backend:** Next.js API routes, WebSocket
- **Database:** PostgreSQL (queries), SQLite (admin config)
- **Real-Time:** WebSocket (native Node.js)
- **Caching:** Redis (optional, in-memory fallback)
- **Export:** csv-stringify, html2pdf or pdfkit
- **UI:** Shadcn/ui components + custom charts

## Database Queries Needed
- User stats (count, growth by date, retention cohorts)
- Revenue stats (total, by gateway, by date, refunds)
- Service stats (views, purchases, popularity)
- Audit stats (count, completion rate, findings by severity)
- Payment stats (transactions, breakdown by gateway)
- Search stats (top queries, frequency)
- Webhook stats (deliveries, failures, retries)

## Next Steps
1. Create `/pages/admin/dashboard.tsx` layout
2. Build admin auth middleware
3. Start Phase 10A: Layout + Auth
