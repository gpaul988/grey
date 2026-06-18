# PHASE 2-5 ACTIVATION GUIDE

**Status:** Ready to activate  
**Time:** ~30 minutes  
**Complexity:** Medium (requires infrastructure setup)

---

## STEP 1: INSTALL DEPENDENCIES

```bash
cd /home/user/grey
npm install
```

**What it does:**
- Installs pg (PostgreSQL client)
- Installs redis (Redis client)
- Installs @node-rs/argon2 (password hashing)
- All dependencies already in package.json

**Expected output:**
```
npm notice up to date, audited XXX packages in X seconds
```

---

## STEP 2: CREATE ENVIRONMENT FILE

```bash
cp .env.example .env.local
```

**Edit `.env.local`:**

```env
# DATABASE
DATABASE_URL=postgresql://grey:password@localhost:5432/grey

# REDIS
REDIS_URL=redis://localhost:6379

# ENCRYPTION (generate fresh key)
ENCRYPTION_KEY=<copy from step 3>

# OPTIONAL: Analytics, cPanel deployment
MIXPANEL_TOKEN=your-token-here
CPANEL_USER=your-user
CPANEL_PASS=your-pass
CPANEL_DOMAIN=yourdomain.com
```

---

## STEP 3: GENERATE ENCRYPTION KEY

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Output:** 44-character base64 string  
**Use this** as your `ENCRYPTION_KEY` in `.env.local`

---

## STEP 4: SETUP POSTGRESQL

### Option A: Local PostgreSQL (recommended for development)

```bash
# Create database
createdb -U postgres grey

# Create user
psql -U postgres -c "CREATE USER grey WITH PASSWORD 'password';"
psql -U postgres -c "ALTER USER grey CREATEDB;"

# Grant permissions
psql -U postgres -d grey -c "GRANT ALL PRIVILEGES ON DATABASE grey TO grey;"

# Run migrations
psql -h localhost -U grey -d grey < migrations/001_init.sql
```

**Verify:**
```bash
psql -h localhost -U grey -d grey -c "SELECT COUNT(*) FROM users;"
# Should return: 0 (empty table)
```

### Option B: Managed PostgreSQL (production)

Use AWS RDS, Railway, Supabase, etc.  
Update `DATABASE_URL` in `.env.local` with your connection string.

---

## STEP 5: SETUP REDIS

### Option A: Local Redis (development)

```bash
# Start Redis server
redis-server --daemonize yes --logfile /tmp/redis.log

# Verify
redis-cli ping
# Should return: PONG
```

### Option B: Managed Redis (production)

Use Redis Cloud, AWS ElastiCache, Railway, etc.  
Update `REDIS_URL` in `.env.local`

---

## STEP 6: TEST DATABASE CONNECTION

```bash
cd /home/user/grey
npm run build
npx tsc --noEmit
```

**Expected output:**
```
✅ 0 TS errors
✅ Build successful
```

---

## STEP 7: RUN LOCALLY

```bash
npm run dev
```

**Expected logs:**
```
> next dev
info  - Using standalone mode
ready - started server on 0.0.0.0:3000, url: http://localhost:3000

Redis connected ✅
PostgreSQL pool initialized ✅
```

**Visit:** http://localhost:3000  
**Should load** without errors

---

## STEP 8: VERIFY FEATURES

### Test Database
```bash
psql -h localhost -U grey -d grey -c "SELECT COUNT(*) FROM users;"
```

### Test Redis
```bash
redis-cli
> SET test_key "hello"
> GET test_key
# Should return: "hello"
> QUIT
```

### Test API
```bash
curl http://localhost:3000/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "database": "connected",
  "redis": "connected",
  "timestamp": "2026-06-18T..."
}
```

---

## STEP 9: RUN TESTS

```bash
# Unit tests
npm test

# E2E tests (requires server running)
npm run e2e
```

**Expected output:**
```
✅ 40+ unit tests passing
✅ 50+ E2E tests passing
```

---

## TROUBLESHOOTING

### PostgreSQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Fix:** Is PostgreSQL running? `psql --version`

### Redis Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:6379
```
**Fix:** Is Redis running? `redis-cli ping`

### ENCRYPTION_KEY not set
```
Error: ENCRYPTION_KEY not set
```
**Fix:** Generate key (step 3) and add to `.env.local`

### Port 3000 already in use
```
Error: listen EADDRINUSE :::3000
```
**Fix:** `npm run dev -- -p 3001` (use different port)

---

## DEPLOYMENT CHECKLIST

Before going to production:

- [ ] PostgreSQL database created (prod database, not local)
- [ ] Redis instance running (managed service recommended)
- [ ] `.env.local` has all required variables
- [ ] `npm run build` passes (0 TS errors)
- [ ] `npm test` passes (40+ tests)
- [ ] Local testing works (`npm run dev`)
- [ ] GitHub Secrets set (for CI/CD)
- [ ] Docker image builds (`docker build -t grey .`)

---

## FEATURE FLAGS

These can be enabled/disabled in `.env.local`:

```env
USE_POSTGRES=true              # Use PostgreSQL (vs SQLite)
USE_REDIS_SESSIONS=true        # Store sessions in Redis
USE_FIELD_ENCRYPTION=true      # Encrypt sensitive fields
USE_ANALYTICS=true             # Track events with Mixpanel
USE_RATE_LIMITING=true         # Enable rate limiting
```

All features default to `true` if not set.

---

## NEXT STEPS

1. ✅ Follow steps 1-9 above
2. ✅ Verify all tests pass
3. ✅ Tell me what additional features you want
4. ✅ I'll build Phase 6+ features

**Questions?** I'm ready to help.

