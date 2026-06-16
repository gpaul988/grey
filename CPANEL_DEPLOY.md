# Grey InfoTech — cPanel Deployment Guide

## Why npm install fails on cPanel

cPanel's shared hosting has **strict memory limits** (~256MB per process). Our app has multiple heavy dependencies that require native compilation:

- **`better-sqlite3@12.11.1`** — native SQLite bindings (C++)
- **`sharp@0.35.1`** — libvips image processing (C++)
- **`three@0.171.0`** + **`@react-three/fiber`** — 3D graphics (large bundles)
- **`next@16.2.9`** + deps — full-stack framework with Webpack

When npm tries to resolve all these at once, it OOMs (gets killed by the OS).

## Solution: Two-Step Install

### Step 1: Clean install with memory limits (terminal)

```bash
cd /home/greyinf1/public_html/grey
source /home/greyinf1/nodevenv/public_html/grey/20/bin/activate

# Remove partial installs
rm -rf node_modules package-lock.json

# Install with tight memory control
NODE_OPTIONS=--max-old-space-size=256 npm install \
  --omit=dev \
  --no-fund \
  --no-audit \
  --prefer-offline \
  --maxsockets=1
```

**Wait for it to complete.** This may take 5-10 minutes on shared hosting. Do not interrupt.

### Step 2: Rebuild native modules

```bash
npm rebuild better-sqlite3 --build-from-source
```

If this fails, the app still works — it just uses MemoryStore for sessions (they reset on restart).

### Step 3: Build Next.js

```bash
NODE_OPTIONS=--max-old-space-size=512 npm run build
```

Wait for the build to complete. Check for errors — it should end with `✓ Compiled successfully`.

### Step 4: Configure secrets

```bash
# If you haven't already:
cp config.env.example config.env

# Edit with nano/vim and fill in:
# - SESSION_SECRET (run: openssl rand -base64 32)
# - CSRF_SECRET (run: openssl rand -base64 32)
# - SMTP_* (if you want email notifications)
# - PAYSTACK_* / FLUTTERWAVE_* (if you use payment gateways)
nano config.env
```

### Step 5: Start the app

In cPanel → Node.js App → click **Restart**

The app will auto-start via `server.js`. Check:
- Application Status = "Running"
- The URL works and shows the site

## Debugging if it fails

### If npm install gets killed:

```bash
# Check how much RAM was used
ps aux | grep node

# If constantly killed, try smaller chunks:
NODE_OPTIONS=--max-old-space-size=128 npm install --prefer-offline --maxsockets=1
```

### If the build fails:

```bash
# Check the full error:
NODE_OPTIONS=--max-old-space-size=512 npm run build 2>&1 | tail -100

# Common fix: clear the build cache
rm -rf .next
NODE_OPTIONS=--max-old-space-size=512 npm run build
```

### If better-sqlite3 rebuild fails:

This is **OK**. The app will use MemoryStore for sessions instead of SQLite. Sessions will reset when the app restarts, but otherwise everything works. To fix later:

```bash
npm rebuild better-sqlite3 --build-from-source
```

### If the app won't start (passenger.log has errors):

Check the **passenger.log**:

```bash
tail -100 /home/greyinf1/logs/error_log
```

Common issues:
- Missing `config.env` → copy and fill `config.env.example`
- Old `.next` build cache → `rm -rf .next && npm run build`
- Stale Node.js process → restart via cPanel dashboard

## Using cPanel's npm button

⚠️ **The cPanel "npm install" button may still fail** due to memory limits. Always prefer the **SSH terminal method above**.

If you use the button and it fails, follow the terminal steps instead.

## Production checklist

- [ ] `config.env` is filled with real secrets (not empty)
- [ ] `npm run build` completes successfully
- [ ] App shows "Running" in cPanel dashboard
- [ ] `https://greyinfotech.com.ng` loads without errors
- [ ] Admin dashboard at `/admin` works
- [ ] Contact form submits successfully

## Need help?

- Check `/home/greyinf1/logs/passenger.log` for app errors
- Check `/home/greyinf1/logs/error_log` for Node.js process errors
- Run `npm ls --depth=0` to verify all deps installed
- Ensure you're using Node.js 20+ (set in cPanel)

---

**Last updated:** 2026-06-16
**Tested on:** cPanel with Node.js 20, 256MB shared hosting
