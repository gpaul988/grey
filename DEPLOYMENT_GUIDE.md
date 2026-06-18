# Grey.git cPanel Deployment Guide

**Latest Audit**: 2026-06-18 - ✅ Production Ready  
**Build Status**: 0 TS errors, 116 static pages  
**Security**: Passed comprehensive audit  

---

## Quick Start

### Prerequisites
- cPanel with Node.js 18+ installed (20 LTS recommended)
- SSH access to server
- 500MB+ disk space available

### Step 1: Clone Repository

```bash
cd /home/[cpanel_user]/public_html
git clone https://github.com/[your-repo]/grey.git
cd grey
```

### Step 2: Install Dependencies

```bash
npm install --omit=dev
# Production dependencies only (~250MB)
```

### Step 3: Configure Environment

Copy and configure `.env.local`:

```bash
cp .env.example .env.local
# Edit .env.local with your values:
# - DATABASE_URL (if using external DB)
# - STRIPE_PUBLISHABLE_KEY / STRIPE_SECRET_KEY
# - PAYPAL_CLIENT_ID / PAYPAL_SECRET
# - Any other API keys
```

**Key Variables:**
```env
NODE_ENV=production
PORT=8080
SENTRY_DSN=https://your-sentry-dsn  # Optional

# Payment Gateways (optional)
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
PAYPAL_CLIENT_ID=xxx
PAYPAL_SECRET=xxx

# Database (optional, defaults to SQLite)
DATABASE_URL=sqlite:./data/grey.db
```

### Step 4: Build

```bash
npm run build
# Expected: Compiled successfully in ~18s, 116 pages, 0 TS errors
```

### Step 5: Deploy with cPanel Node.js Manager

**Option A: Using cPanel's Node.js App Manager**

1. In cPanel, go to **Node.js Selector**
2. Create a new Node.js app:
   - **Node.js version**: 20.x (or latest)
   - **App mode**: Production
   - **Application root**: `/home/[user]/public_html/grey`
   - **Application URL**: `https://yourdomain.com`
   - **Application startup file**: `server.js`

3. Set environment variables in the app settings:
   ```
   NODE_ENV=production
   PORT=8080
   ```

4. Click "Create" and restart the app

**Option B: Manual Setup (Passenger)**

If using Passenger, add to your domain's `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ /server.js [QSA,L]
</IfModule>
```

### Step 6: Verify Deployment

```bash
curl https://yourdomain.com/api/health
# Expected response: { "ok": true }
```

Check logs:

```bash
cat ~/.logs/grey.log  # or tail -f
```

---

## Production Checklist

- [ ] `.env.local` created and populated with production secrets
- [ ] `npm run build` succeeds (0 TS errors, 116 pages)
- [ ] Node.js app restarted via cPanel
- [ ] Health check passes: `/api/health` returns `{ "ok": true }`
- [ ] HTTPS enabled (cPanel/AutoSSL)
- [ ] Logs monitoring set up

---

## Troubleshooting

### Port Already in Use
```bash
# cPanel auto-assigns available port. Check:
netstat -tulpn | grep node
```

### Database Connection Issues
- SQLite: Ensure `/public_html/grey/data` directory is writable
  ```bash
  chmod 755 /home/[user]/public_html/grey/data
  ```

### Out of Memory
- cPanel Node.js typically allocates 512MB-1GB
- Check memory usage:
  ```bash
  free -m
  ```
- If insufficient, increase via cPanel resource limits

### Logs Not Appearing
- Logs go to `~/.logs/grey.log` (Winston logger)
- View with:
  ```bash
  tail -f ~/.logs/grey.log
  ```

### API Endpoints Returning 500
1. Check logs: `tail -f ~/.logs/grey.log`
2. Verify environment variables: `cat .env.local`
3. Restart app: cPanel Node.js Manager → Restart

---

## Post-Deployment

### 1. Monitor Performance
- Set up error tracking (Sentry DSN in `.env.local`)
- Monitor logs for errors/warnings
- Track API response times

### 2. Security
- [ ] Set HTTPS Everywhere (cPanel AutoSSL)
- [ ] Configure CORS if needed
- [ ] Review rate limits for your traffic patterns
- [ ] Add firewall rules (cPanel ModSecurity)

### 3. Scaling (If Needed)
- **In-memory rate limiting**: Currently uses sliding-window (single-process)
- **For multi-process**: Replace with Redis store (config in `lib/apiGuard.ts`)
- **Database**: Upgrade to PostgreSQL if outgrowing SQLite

### 4. Updates
To update to latest version:

```bash
cd /home/[user]/public_html/grey
git pull origin main
npm install --omit=dev
npm run build
# Restart via cPanel Node.js Manager
```

---

## Architecture Notes

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **API**: Express (in server.ts)
- **Database**: SQLite (default) or PostgreSQL
- **Authentication**: Session cookies (HTTP-only)
- **Rate Limiting**: In-memory sliding-window (IP-based)

### Single-Process Design
- Suitable for cPanel/Passenger (single app instance)
- Rate limits work reliably per-IP
- Session storage: HTTP-only cookies (no Redis needed)

### Security Features
- ✅ All APIs input-validated (Zod schemas)
- ✅ Rate limiting on auth endpoints (login: 10 req/15min)
- ✅ SQL injection protection (prepared statements)
- ✅ XSS protection (DOMPurify sanitization)
- ✅ CSRF tokens on state-changing requests
- ✅ Error messages don't expose implementation details

---

## Performance Notes

**Typical Cold Start**: ~2-3 seconds  
**Memory Usage**: ~120MB (baseline) + request overhead  
**Static Pages**: 116 pre-rendered (instant)  
**API Response Time**: 50-200ms (typical)

For production analytics, see `SECURITY_AUDIT.md` → Recommendations section.

---

## Support

If issues arise:

1. Check `/SECURITY_AUDIT.md` for configuration details
2. Review error logs: `tail -f ~/.logs/grey.log`
3. Verify environment: `npm run build` locally first
4. Contact: Security audit available in project root

---

**Deployment verified**: 2026-06-18  
**Status**: Production-ready for cPanel Node.js 20+

