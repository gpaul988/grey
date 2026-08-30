# Graham Sobiribo Paul — cPanel Deployment (Simplified)

## The Problem

npm install keeps getting **OOM-killed** because:
- `better-sqlite3`, `sharp`, `babel-plugin-react-compiler` require **native C++ compilation**
- cPanel shared hosting limits to **256-512MB RAM**
- Compilation spikes to **1.5GB+** → process killed

## The Solution: Skip Native Builds on Install

All heavy native modules (`better-sqlite3`, `sharp`) have **prebuilt binaries** for Node.js 20. We tell npm to skip building and use prebuilts instead.

---

## Step 1: Install Dependencies (Skip Scripts)

On cPanel SSH terminal:

```bash
cd /home/greyinf1/public_html/grey
source /home/greyinf1/nodevenv/public_html/grey/20/bin/activate

# Install WITHOUT building native modules
npm install --ignore-scripts
```

**This should succeed in 2-3 minutes.** It downloads prebuilt binaries instead of compiling.

---

## Step 2: Build Next.js

```bash
NODE_OPTIONS=--max-old-space-size=512 npm run build
```

Wait for `✓ Compiled successfully`.

---

## Step 3: Configure Secrets

```bash
cp config.env.example config.env
nano config.env
```

Fill in:
- `SESSION_SECRET` (run: `openssl rand -base64 32`)
- `CSRF_SECRET` (run: `openssl rand -base64 32`)
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` (for email)
- `PAYSTACK_*` / `FLUTTERWAVE_*` (if you use payment gateways)

---

## Step 4: Restart in cPanel

In cPanel → Node.js App → click **Restart**

The app will auto-start via `server.js`.

---

## If better-sqlite3 doesn't work (optional)

After the app starts, if you see session errors, rebuild sqlite manually:

```bash
npm rebuild better-sqlite3 --build-from-source
```

If this rebuild fails, **the app still works** — it just uses MemoryStore for sessions (they reset on restart).

To test:

```bash
node -e "require('better-sqlite3')" && echo "✅ Works"
```

---

## Full Checklist

- [ ] `npm install --ignore-scripts` completes successfully
- [ ] `npm run build` completes with no errors
- [ ] `config.env` is filled with real secrets
- [ ] App shows "Running" in cPanel dashboard
- [ ] https://greyinfotech.com.ng loads without errors
- [ ] Admin dashboard at /admin works
- [ ] Contact form submits successfully

---

## Debugging

### If npm install still fails:

Clear the cache and try again:

```bash
npm cache clean --force
rm -rf /home/greyinf1/nodevenv/public_html/grey/20/lib/node_modules
npm install --ignore-scripts
```

### If the app won't start:

Check the error log:

```bash
tail -100 /home/greyinf1/logs/passenger.log
tail -100 /home/greyinf1/logs/error_log
```

### If sessions aren't persistent:

better-sqlite3 likely isn't working. Run:

```bash
npm rebuild better-sqlite3 --build-from-source
```

---

**Last updated:** 2026-08-30 13:23:18  
**Tested on:** cPanel with Node.js 20
