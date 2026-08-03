# 🚀 Grey InfoTech — Production Deployment Checklist

## ✅ Pre-Deployment Verification (Run Locally First)

### 1. Environment Setup
- [ ] `.env.local` file exists at project root
- [ ] All 11 sections in `.env.local` are populated:
  - [ ] Section 1: NODE_ENV=production, PORT, HOSTNAME
  - [ ] Section 2: DB_TYPE=mysql (NOT sqlite), DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT
  - [ ] Section 3: SESSION_SECRET, CSRF_SECRET, ADMIN_API_SECRET (generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
  - [ ] Section 4: SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, SMTP_REPLY_TO, SMTP_PORT=465, SMTP_SECURE=true
  - [ ] Section 5: ADMIN_BASE_URL, ADMIN_EMAIL
  - [ ] Section 6: APP_URL, FRONTEND_BASE_URL, BACKEND_BASE_URL (all use https://)
  - [ ] Section 7: NEXT_PUBLIC_TAWK_PROPERTY_ID, NEXT_PUBLIC_TAWK_WIDGET_ID (embedded at build time)
  - [ ] Section 8: SEED_*_PASSWORD values (for initial admin account creation)
  - [ ] Section 9: Optional API keys (Stripe, PayStack, OpenAI) — leave commented if unused
  - [ ] Section 10: Optional monitoring (Sentry) — leave commented if unused
  - [ ] Section 11: DEBUG=false (production mode)

### 2. Database Verification
- [ ] MySQL is running locally (Docker: `docker run -d -p 3306:3306 -e MYSQL_DATABASE=grey -e MYSQL_USER=grey -e MYSQL_PASSWORD=greypass -e MYSQL_ROOT_PASSWORD=root mysql:8` OR native MySQL)
- [ ] Database credentials in `.env.local` match MySQL instance
- [ ] Run: `npm run bootstrap:db:mysql` — should create schema without errors
- [ ] Run: `npm run seed` — should create seeded admin accounts (requires SEED_*_PASSWORD env vars)

### 3. Code Quality & Build
- [ ] No uncommitted changes to critical files (run `git status`)
- [ ] TypeScript compiles without errors: `npx tsc --noEmit`
- [ ] ESLint passes: `npm run lint` (or review errors)
- [ ] No hardcoded secrets in code (grep for passwords, API keys)

### 4. Production Build
- [ ] Run: `npm ci` — installs all dependencies (dev deps required for tsx)
- [ ] Run: `npm run build` — creates `.next/` production bundle
  - This MUST succeed; embeds NEXT_PUBLIC_* vars at build time
  - Expected output: `.next/` directory with standalone, server, static folders
- [ ] No build warnings about deprecated APIs or missing dependencies

### 5. Production Start Verification
- [ ] Run: `npm run start` — server should start on PORT from .env.local
- [ ] Expected log: `[server] Ready on http://localhost:PORT`
- [ ] Verify no errors in stderr.log or stdout.log
- [ ] CTRL+C to stop; observe clean shutdown

### 6. Frontend Smoke Test (Localhost)
- [ ] Open http://localhost:3000 → homepage loads without hydration errors
- [ ] No console errors (open DevTools, check Console tab)
- [ ] All images, fonts, CSS load correctly
- [ ] Navigation links work (Hero → Services → AI Estimator → etc.)
- [ ] Hero video plays (check network tab, should load .mp4)
- [ ] Tawk chat button appears (check Network: embed.tawk.to requests)

### 7. Admin Login Verification
- [ ] Open http://localhost:3000/admin/login → login form appears
- [ ] All CSS/JS load (no 404s, no MIME type errors)
- [ ] Login with credentials from seed (e.g., graham@greyinfotech.com.ng / !Uriel2Sobiribo3,)
- [ ] Successfully redirected to /admin dashboard
- [ ] No authentication errors in console

### 8. Admin Settings & SMTP Test
- [ ] Navigate to Admin → Settings
- [ ] Click "Test Email" button
  - [ ] Should send test email to logged-in user's email address
  - [ ] Check inbox/spam folder for test email (or SMTP logs)
  - [ ] If error: check SMTP config in settings, verify credentials
- [ ] Try to modify a setting (e.g., site title) → should save and persist
- [ ] Verify GET /admin/api/settings returns 200 with all settings
- [ ] Verify PATCH /admin/api/settings saves changes

### 9. API Endpoint Verification
- [ ] GET /admin/api/settings → 401 (unauthenticated) or 200 (authenticated)
- [ ] POST /admin/api/settings/test-email → 401 (unauthenticated) or 200 (authenticated)
- [ ] PATCH /admin/api/settings → 401 (unauthenticated) or 200 (authenticated)
- [ ] Verify static assets (Admin/public) load: /js/config.js, /js/app.js, etc. (200, correct MIME types)

### 10. Form Submission Test (Notifications)
- [ ] Fill out contact form on homepage → submit
- [ ] No 500 errors; success message appears
- [ ] Admin email receives notification (check ADMIN_EMAIL)
- [ ] Verify notification includes form data (name, email, message, etc.)

### 11. Production-Ready Checks
- [ ] `.env.local` is in `.gitignore` (never commit secrets)
- [ ] `Admin/data/.secrets.json` is in `.gitignore`
- [ ] `node_modules/` is in `.gitignore`
- [ ] `.next/` should be in `.gitignore` (rebuild on server) OR uploaded as part of build
- [ ] `package-lock.json` is committed (reproducible installs)
- [ ] `tsconfig.json` configured for production (target: es2020, module: esnext)
- [ ] `server.ts` uses `express.static(adminPublicPath)` for Admin/public assets
- [ ] SMTP fallback: code checks both `SMTP_PASS` and `SMTP_PASSWORD` env vars
- [ ] Admin auto-verify: superadmin/admin roles auto-verified on login to prevent email verification lockout

---

## 🏗️ cPanel Deployment Steps

### Step 1: Generate Production Secrets
**Do this locally and store securely before uploading to cPanel.**

```bash
# Generate SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate CSRF_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate ADMIN_API_SECRET (or use existing if already in use)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Update .env.local with generated values. Keep these values safe; you'll need them for cPanel.**

### Step 2: Create cPanel Node.js App
1. Log in to cPanel
2. Navigate to **Setup Node.js App** (under Software)
3. Click **Create Application**
   - **Application root**: `/home/greyinf1/public_html/grey` (or your path)
   - **Application startup file**: `server.js`
   - **Node.js version**: 20.x LTS or 22.x LTS
   - **Application mode**: development (cPanel will restart on code changes)
   - Click **Create**
4. Wait for cPanel to create the app and show the **Environment Variables** section

### Step 3: Set Environment Variables in cPanel
In the cPanel Node.js App panel, click **Edit Environment Variables** and add:

```
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

DB_TYPE=mysql
DB_HOST=<cPanel MySQL host, usually 127.0.0.1 or internal IP>
DB_USER=<MySQL username created by cPanel>
DB_PASS=<MySQL password>
DB_NAME=grey
DB_PORT=3306

SESSION_SECRET=<generated value from Step 1>
CSRF_SECRET=<generated value from Step 1>
ADMIN_API_SECRET=<generated value from Step 1>

SMTP_HOST=mail.greyinfotech.com.ng
SMTP_PORT=465
SMTP_USER=hello@greyinfotech.com.ng
SMTP_PASSWORD=1Uriel2Graham3,
SMTP_FROM=noreply@greyinfotech.com.ng
SMTP_REPLY_TO=support@greyinfotech.com.ng
SMTP_SECURE=true

ADMIN_BASE_URL=https://greyinfotech.com.ng
ADMIN_EMAIL=hello@greyinfotech.com.ng

APP_URL=https://greyinfotech.com.ng
FRONTEND_BASE_URL=https://greyinfotech.com.ng
BACKEND_BASE_URL=https://greyinfotech.com.ng/admin

NEXT_PUBLIC_TAWK_PROPERTY_ID=677c7eb9af5bfec1dbe78c68
NEXT_PUBLIC_TAWK_WIDGET_ID=1igv4u196

SEED_SUPERADMIN_PASSWORD=!Uriel2Sobiribo3,
SEED_ADMIN_PASSWORD=!Uriel2Sobiribo3,
SEED_MANAGER_PASSWORD=!Uriel2Sobiribo3,
SEED_STAFF_PASSWORD=!Uriel2Sobiribo3,

DEBUG=false
```

**⚠️ CRITICAL**: Do NOT store `.env.local` in cPanel or on the server. Use cPanel's Environment Variables panel instead. The app reads from cPanel's panel + process.env automatically via dotenvx.

### Step 4: Upload Files to cPanel
Upload to `/home/greyinf1/public_html/grey/` (app root created in Step 2):

**Required files:**
- `server.js` (Express entry point)
- `server.ts` (TypeScript source; cPanel will compile with tsx)
- `package.json` (dependencies)
- `package-lock.json` (lock file)
- `tsconfig.json` (TypeScript config)
- `.next/` (production build; OR let server rebuild with `npm run build`)
- `Admin/` (all admin backend routes, views, DB models)
- `app/` (Next.js app directory)
- `components/` (React components)
- `lib/` (utilities)
- `public/` (frontend static assets)
- `types/` (TypeScript types)

**Files to NOT upload:**
- `.env` (git-tracked template)
- `.env.local` (contains secrets; use cPanel env panel instead)
- `Admin/data/` (database directory; SQLite won't be used)
- `node_modules/` (will be installed fresh)
- `.git/` (not needed on production)
- `.logs/` (generated at runtime)
- `build/`, `dist/`, `.next.zip` (old artifacts)

**Recommended**: Use Git to deploy (`git clone` on server), then `npm ci` will install dependencies. This is cleaner than FTP uploading.

### Step 5: Install Dependencies & Build (via SSH or cPanel Terminal)
```bash
# SSH into cPanel server
ssh user@greyinfotech.com.ng

# Navigate to app directory
cd /home/greyinf1/public_html/grey

# Activate cPanel Node.js environment (shown in cPanel Node.js App panel)
source nodevenv/public_html/grey/20/bin/activate

# Install dependencies (including dev deps for tsx)
npm ci

# Create production build (embeds NEXT_PUBLIC_* vars from cPanel env panel)
npm run build

# Verify .next/ was created
ls -la .next/
```

### Step 6: Initialize Database (First Boot Only)
```bash
# Bootstrap MySQL schema (creates tables if missing)
npm run bootstrap:db:mysql

# Seed admin accounts (creates initial users with SEED_*_PASSWORD)
npm run seed
```

**Note**: If `npm run seed` fails:
- Verify SEED_*_PASSWORD env vars are set in cPanel (Step 3)
- Check MySQL connection with: `node -e "require('./Admin/db/mysql.ts').ensurePool()"`
- Review server error logs for details

### Step 7: Restart cPanel Node.js App
1. Go back to cPanel → Setup Node.js App
2. Find your app in the list
3. Click **Restart**
4. Wait ~10 seconds for server to start
5. Watch stderr.log for startup messages:
   - Healthy: `[server] Ready on http://localhost:PORT`
   - Error: `[server] FATAL: ...` (check logs)

### Step 8: Verify HTTPS/SSL
- [ ] Domain has valid SSL certificate (cPanel AutoSSL or manual)
- [ ] Redirect HTTP → HTTPS (in .htaccess or cPanel)
- [ ] Admin cookies use __Host- prefix (requires HTTPS; if HTTP, cookies won't set)

### Step 9: Test on Production Domain
- [ ] Open https://greyinfotech.com.ng → homepage loads
- [ ] Open https://greyinfotech.com.ng/admin/login → login form
- [ ] Login with seeded admin: graham@greyinfotech.com.ng / !Uriel2Sobiribo3,
- [ ] Navigate to Admin → Settings → Test Email
  - Should send test email (verify in mailbox)
  - Check cPanel's error logs if it fails: `tail -f /home/greyinf1/domains/greyinfotech.com.ng/log/error.log`
- [ ] Verify Tawk appears on frontend (DevTools → Network → embed.tawk.to)
- [ ] Submit contact form → should receive notification email

### Step 10: Monitor & Debug
**View server logs (cPanel or SSH):**
```bash
# stderr.log shows startup errors and server logs
tail -f /home/greyinf1/public_html/grey/tmp/stderr.log

# stdout.log shows normal output
tail -f /home/greyinf1/public_html/grey/tmp/stdout.log

# cPanel domain error log
tail -f /home/greyinf1/domains/greyinfotech.com.ng/log/error.log
```

**Common issues & fixes:**
- **"Port already in use"**: cPanel auto-assigns PORT; check with `ps aux | grep node`
- **"MySQL connection failed"**: Verify DB_HOST, DB_USER, DB_PASS in cPanel env panel
- **"SMTP timeout"**: Check firewall rules; port 465 might be blocked
- **"Tawk not showing"**: NEXT_PUBLIC_TAWK_* vars must be set BEFORE build; rebuild with `npm run build`
- **"Static assets 404"**: Verify express.static middleware in server.ts (line 77)

---

## 📋 Post-Deployment Checklist

- [ ] All endpoints respond with 200 or expected status codes (no 500 errors)
- [ ] Contact form → admin receives notification email
- [ ] Settings page loads; test email works
- [ ] Tawk chat widget appears on frontend
- [ ] Admin login works; dashboard loads
- [ ] SSL/HTTPS certificate valid and active
- [ ] No console errors in browser (check DevTools)
- [ ] Log rotation configured (cPanel) to prevent disk full
- [ ] Backups scheduled (cPanel or external)

---

## 🔒 Security Checklist

- [ ] `.env.local` NOT uploaded to server (secrets in cPanel only)
- [ ] `Admin/data/.secrets.json` NOT uploaded (gitignored)
- [ ] `node_modules/` NOT uploaded (npm ci reinstalls)
- [ ] HTTPS enforced on all production URLs
- [ ] Admin __Host- cookies require HTTPS (automatic if HTTPS active)
- [ ] CSRF_SECRET set in cPanel (prevents CSRF attacks)
- [ ] SESSION_SECRET set in cPanel (session tampering prevention)
- [ ] SMTP password NOT logged or exposed in logs
- [ ] Database credentials NOT in codebase (use env vars)
- [ ] API keys for Stripe/PayStack/OpenAI in cPanel env (not code)

---

## 🚨 If Something Breaks

1. **Check logs first**:
   ```bash
   tail -f tmp/stderr.log
   tail -f tmp/stdout.log
   ```

2. **Verify environment**:
   ```bash
   node -e "console.log(process.env.NODE_ENV, process.env.DB_HOST, process.env.SMTP_HOST)"
   ```

3. **Test database**:
   ```bash
   npm run bootstrap:db:mysql
   ```

4. **Rebuild if needed**:
   ```bash
   npm run build
   # Then restart app in cPanel
   ```

5. **Roll back if critical**:
   - Revert latest git commit: `git revert HEAD`
   - Push to server, restart app
   - Investigate issue offline

---

## ✨ Summary

| Step | Action | Status |
|------|--------|--------|
| 1 | Generate secrets & verify .env.local | ⬜ |
| 2 | Run local MySQL + npm run build + npm run start | ⬜ |
| 3 | Smoke test: login, settings, SMTP, Tawk | ⬜ |
| 4 | Create cPanel Node.js App | ⬜ |
| 5 | Set environment variables in cPanel | ⬜ |
| 6 | Upload files (git clone recommended) | ⬜ |
| 7 | npm ci + npm run build + npm run bootstrap:db:mysql + npm run seed | ⬜ |
| 8 | Restart cPanel app | ⬜ |
| 9 | Test production domain (login, SMTP, Tawk) | ⬜ |
| 10 | Monitor logs; verify all systems operational | ⬜ |

**Total time to deploy**: ~30 min (file transfer + database init + build)

---

Generated by Copilot CLI — Last Updated: Production Ready ✅
