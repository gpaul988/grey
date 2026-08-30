# PHASE 2-5 Implementation Plan (Graham Sobiribo Paul World-Class Transformation)

## Phase 2: Scalability (PostgreSQL, Redis, Encryption)

### 2.1 Database Migration (SQLite → PostgreSQL)
- [ ] Create PostgreSQL connection pool (node-postgres)
- [ ] Migrate Drizzle schema to PostgreSQL dialect
- [ ] Create migration scripts for data transfer
- [ ] Update connection strings in .env
- [ ] Update test env to use PostgreSQL test DB
- [ ] Verify all existing queries still work

### 2.2 Redis Integration
- [ ] Add redis client to lib/redis.ts
- [ ] Session store: Express session with redis backend
- [ ] Cache layer: Implement for service listings, quotes, user data
- [ ] Rate limiting: Redis-backed rate limiter for API endpoints
- [ ] Cache invalidation strategy (TTL, event-based)

### 2.3 Database Encryption
- [ ] Encrypt sensitive fields: credit_card, api_keys, user_ssn, password_hash
- [ ] Use node:crypto for field-level encryption
- [ ] Create encrypt/decrypt utilities with key rotation support
- [ ] Update Drizzle schema with encrypted field types
- [ ] Migrate existing data (backfill encrypted values)

### 2.4 Connection Pooling
- [ ] Configure pgBouncer or node-postgres pool (min: 10, max: 100 connections)
- [ ] Add health checks for pool
- [ ] Test under load

**Status:** Not started
**Dependencies:** None (Phase 1 independent)
**Est. Duration:** 6-8 hours

---

## Phase 3: Automation (GitHub Actions CI/CD)

### 3.1 GitHub Actions Setup
- [ ] Create .github/workflows/test.yml (unit + E2E tests on push)
- [ ] Create .github/workflows/build.yml (Next.js build, Docker image)
- [ ] Create .github/workflows/deploy.yml (cPanel deployment)
- [ ] Add branch protection rules (require passing tests)

### 3.2 Test Pipeline
- [ ] Run npm test (30+ unit tests)
- [ ] Run npm run test:e2e (50+ E2E tests)
- [ ] Generate coverage reports
- [ ] Fail if coverage < 70% on critical paths

### 3.3 Build Artifacts
- [ ] Build Next.js static export
- [ ] Create Docker image (if using containers)
- [ ] Push to registry (GitHub Container Registry or DockerHub)

### 3.4 cPanel Deployment
- [ ] SSH deployment script to cPanel server
- [ ] Auto-deploy to staging on PR merge
- [ ] Manual approval for production deploy

**Status:** Not started
**Dependencies:** Phase 1 (tests must be solid)
**Est. Duration:** 4-5 hours

---

## Phase 4: Analytics (Mixpanel + Admin Dashboard)

### 4.1 Mixpanel Integration
- [ ] Initialize Mixpanel SDK in client + server
- [ ] Track conversion events: signup, email verification, payment, quote request
- [ ] Track user behavior: page views, service interest, cart interactions
- [ ] Track funnel: browsing → quote → checkout → payment
- [ ] User properties: country (Nigeria), plan tier, service category

### 4.2 Admin Dashboard Charts
- [ ] Revenue chart (last 30/90 days, by service)
- [ ] Signups chart (daily/weekly trend)
- [ ] Conversion funnel (signup → payment)
- [ ] Service interest breakdown (pie chart)
- [ ] Top referral sources
- [ ] User retention cohorts

### 4.3 Advanced Analytics
- [ ] A/B testing framework for landing page variants
- [ ] Custom events: API usage, quote completion time, payment method popularity
- [ ] Segmentation: by country, service, plan tier
- [ ] Real-time dashboard (Mixpanel provides this)

**Status:** Not started
**Dependencies:** Phase 2 (need stable DB/Redis for analytics data)
**Est. Duration:** 5-6 hours

---

## Phase 5: Product (AI Recommendations, Review System, Headless CMS)

### 5.1 AI Recommendations
- [ ] Implement recommendation engine (collaborative filtering + content-based)
- [ ] Track user interactions (viewed, purchased, bookmarked)
- [ ] Generate personalized service/product recommendations
- [ ] Display on dashboard, service detail page
- [ ] Use vector embeddings (or simple similarity scoring)
- [ ] Optional: Integrate with Claude API for smart recommendations

### 5.2 Review System
- [ ] Create Review model (user_id, service_id, rating, comment, verified_purchase)
- [ ] Add review endpoints (POST /api/reviews, GET /api/services/:id/reviews)
- [ ] Display reviews on service detail pages
- [ ] Moderation: flag inappropriate reviews, auto-archive spam
- [ ] Rating aggregation (avg rating, rating distribution)

### 5.3 Headless CMS
- [ ] Create content types: Service Pages, Blog Posts, Documentation, FAQs
- [ ] Implement content management API (CRUD endpoints)
- [ ] Create admin UI for content editors (no code required)
- [ ] Support markdown/rich text editing
- [ ] Media library (image/video uploads)
- [ ] Publishing workflow (draft → publish → archive)
- [ ] SEO fields (title, description, slug, meta tags)

**Status:** Not started
**Dependencies:** Phase 2 (need stable DB) and Phase 4 (analytics data for recommendations)
**Est. Duration:** 8-10 hours

---

## Implementation Order

1. **Phase 2** (Database/Caching) - 6-8 hours
2. **Phase 3** (CI/CD) - 4-5 hours
3. **Phase 4** (Analytics) - 5-6 hours
4. **Phase 5** (Product) - 8-10 hours

**Total:** ~23-29 hours (realistic: 2-3 days with breaks)

---

## Key Decisions

- **Database:** PostgreSQL (AWS RDS or self-hosted)
- **Cache:** Redis (AWS ElastiCache or self-hosted)
- **Encryption:** AES-256-GCM with node:crypto
- **Session Store:** Redis-backed express-session
- **Analytics:** Mixpanel (free tier covers initial needs)
- **CI/CD:** GitHub Actions (free for public repos)
- **Deployment:** cPanel SSH + automated scripts
- **CMS:** Custom API-first headless CMS (not Contentful/Strapi, to avoid lock-in)
- **AI:** Optional Claude API integration for smart recommendations

---

## Test Strategy

- **Phase 2:** Unit tests for crypto, Redis, connection pool
- **Phase 3:** E2E tests must pass before merge
- **Phase 4:** Analytics integration tests (mock Mixpanel)
- **Phase 5:** Review system tests, CMS CRUD tests

---

## Risk Mitigation

1. **Database Migration:** Backup SQLite before migration. Test on staging first.
2. **Redis Failures:** Implement fallback (return stale cache or compute on-the-fly).
3. **CI/CD:** Start with staging deploy only, graduate to production.
4. **Analytics:** Use test token initially, switch to production key after verification.
5. **CMS:** Content versioning + rollback capability.

