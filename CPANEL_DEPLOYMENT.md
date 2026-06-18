# cPanel Node.js Deployment Guide

## Quick Start

1. **Clone repo on cPanel:**
```bash
git clone https://github.com/gpaul988/grey.git
cd grey
```

2. **Install production dependencies:**
```bash
npm install --omit=dev
```

3. **Configure environment:**
```bash
cp .env.local .env.local.prod
# Edit .env.local.prod with your cPanel production secrets
# Critical fields:
# - NODE_ENV=production
# - PORT=3000 (or your cPanel port)
# - DATABASE_URL=file:./Admin/data/grey.db
# - SEED_SUPERADMIN_PASSWORD, SEED_ADMIN_PASSWORD, etc.
# - STRIPE keys, PAYPAL keys (if using payments)
```

4. **Start the app:**
```bash
npm start
```

App runs on http://localhost:3000 (or configured PORT)

---

## Environment Variables

**Required for production:**
- `NODE_ENV=production`
- `PORT=3000` (adjust to cPanel port)
- `HOST=0.0.0.0` (for cPanel)
- `DATABASE_URL=file:./Admin/data/grey.db`
- `SESSION_SECRET` (strong random string)
- `CSRF_SECRET` (strong random string)

**Optional but recommended:**
- `STRIPE_PUBLIC_KEY` / `STRIPE_SECRET_KEY` (for payments)
- `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` (for PayPal)
- `SMTP_*` (for email notifications)
- `SEED_*_PASSWORD` (for database seeding)

See `.env.local` for template values.

---

## Database

SQLite (better-sqlite3) stores data in:
```
./Admin/data/grey.db
```

Make sure this directory has write permissions.

---

## Build Info

- **Node version:** 18.x or 20.x (check cPanel)
- **Build:** `npm run build` (not needed if npm start works)
- **Tests:** `npm test` (for verification)

---

## Troubleshooting

**Port already in use:**
```bash
# Change PORT in .env.local
PORT=3001 npm start
```

**Database locked:**
```bash
# Remove stale SQLite locks
rm -f ./Admin/data/grey.db-shm
rm -f ./Admin/data/grey.db-wal
npm start
```

**Out of memory:**
```bash
# Increase Node heap (cPanel settings)
export NODE_OPTIONS="--max-old-space-size=512"
npm start
```

**CORS errors:**
```bash
# Verify NEXT_PUBLIC_API_URL in .env.local
# Should match your cPanel domain
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

---

## Performance Notes

- **Cold start:** ~5-10s (first request)
- **Memory:** ~200MB baseline, ~350MB under load
- **Build artifacts:** Minimal (Next.js optimized)
- **Database:** SQLite suitable for <10K concurrent users

---

## Monitoring

Check logs:
```bash
npm start 2>&1 | tee app.log
```

Watch logs in real-time:
```bash
tail -f app.log | grep -E "ERROR|WARN"
```

---

## Next Steps

- [ ] Edit `.env.local` with cPanel production secrets
- [ ] Test `npm install --omit=dev` locally first
- [ ] Run `npm start` and verify http://localhost:3000
- [ ] Deploy to cPanel
- [ ] Monitor for errors in first 24hrs

**Questions?** Contact: gpaul988@greyinfotech.com.ng
