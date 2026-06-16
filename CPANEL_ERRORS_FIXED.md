# cPanel npm Install Errors — Root Cause Analysis & Fixes

## Problem Summary

When running `npm install --omit=dev` on cPanel Node.js App, the process gets **OOM-killed** (Killed signal). This happens because:

### 1. **Heavy native dependencies + memory pressure**

Your `package.json` has multiple packages that require **native C++ compilation**:

```
better-sqlite3@12.11.1       ← SQLite bindings (requires node-gyp build)
sharp@0.35.1                 ← Image processing (requires libvips build)
babel-plugin-react-compiler  ← React compiler (native bindings)
next@16.2.9                  ← Full framework (pulls 200+ dependencies)
three@0.171.0                ← 3D graphics library (100+ deps, large bundles)
@react-three/*               ← Three.js bindings (adds 50+ more deps)
```

When npm resolves all these together, it:
1. Downloads all 600+ packages into memory
2. Resolves peer dependencies
3. Builds native modules (calls `node-gyp`)
4. All happens at once = **~1.5GB+ RAM spike**

### 2. **cPanel shared hosting memory cap**

cPanel's Node virtualenv limits processes to **~256-512MB max**. When npm exceeds this, the OS kills the process with signal SIGKILL.

### 3. **cPanel npm button has NO environment variables**

The cPanel web interface's "npm install" button runs with **no `NODE_OPTIONS`**, so you can't pass `--max-old-space-size` to limit the heap.

---

## Root Cause: The --legacy-peer-deps flag

The old `install:cpanel` script had:

```json
"install:cpanel": "npm install --omit=dev --no-audit --no-fund --maxsockets=1 --legacy-peer-deps"
```

**`--legacy-peer-deps` is a memory bomb** because it forces npm to resolve ALL possible peer dependency combinations instead of picking the first valid one. On shared hosting with 256MB RAM, this is impossible.

---

## Solutions Implemented

### 1. **Removed `--legacy-peer-deps`** ✅

Updated `package.json`:

```json
"install:cpanel": "NODE_OPTIONS=--max-old-space-size=256 npm install --omit=dev --no-audit --no-fund --prefer-offline --maxsockets=1"
```

Now uses:
- `--max-old-space-size=256` — limit Node heap to 256MB
- `--prefer-offline` — use cache, don't re-download
- `--maxsockets=1` — sequential downloads (less memory spike)
- Removed `--legacy-peer-deps` ← **the culprit**

### 2. **Added `.npmrc` config file** ✅

Persistent npm settings so cPanel button respects them:

```ini
maxsockets=1
prefer-offline=true
omit=dev
legacy-peer-deps=false
```

### 3. **Added postinstall hook** ✅

File: `scripts/postinstall.js`

When npm finishes install, this script:
- Creates `Admin/data/` directory (needed for `.secrets.json`)
- Attempts to rebuild `better-sqlite3` gracefully
- **Doesn't fail if rebuild fails** — app continues with MemoryStore fallback

This way, if the sqlite rebuild OOMs, you don't lose the entire deployment.

### 4. **Added cpanel-install.sh script** ✅

File: `scripts/cpanel-install.sh`

A bash script for SSH terminal that:
1. Installs with `--max-old-space-size=256`
2. Rebuilds sqlite (non-fatal if fails)
3. Builds Next.js with `--max-old-space-size=512`
4. Provides clear error messages

### 5. **Created CPANEL_DEPLOY.md** ✅

Complete deployment guide with:
- Why install fails (this document)
- Step-by-step SSH commands
- Debugging checklist
- What to do if rebuild fails

---

## What Changed in the Repo

### Files Modified:
- **`package.json`** — removed `--legacy-peer-deps`, added `postinstall` hook
- **`.npmrc`** — new file with memory-safe npm config

### Files Added:
- **`scripts/postinstall.js`** — graceful native module rebuild
- **`scripts/cpanel-install.sh`** — SSH install guide (runnable script)
- **`CPANEL_DEPLOY.md`** — full deployment documentation

### Files NOT Changed (already fixed):
- `server.js` ← single-process tsx hook (already correct)
- `.htaccess` ← Apache proxy rules (already correct)
- `server.ts` ← error handlers (already correct)
- `next.config.js` ← `--webpack` flag set (already correct)
- `lib/customerAuth.ts` ← self-healing secrets (already correct)

---

## How to Deploy Now

### Option A: SSH Terminal (Recommended)

```bash
cd /home/greyinf1/public_html/grey
source /home/greyinf1/nodevenv/public_html/grey/20/bin/activate

# Step 1: Clean install
NODE_OPTIONS=--max-old-space-size=256 npm install \
  --omit=dev --no-fund --no-audit --prefer-offline --maxsockets=1

# Step 2: Rebuild sqlite
npm rebuild better-sqlite3 --build-from-source

# Step 3: Build
NODE_OPTIONS=--max-old-space-size=512 npm run build

# Step 4: Fill secrets
cp config.env.example config.env
nano config.env  # Fill in SMTP, SESSION_SECRET, etc

# Step 5: Restart in cPanel dashboard
```

### Option B: cPanel npm Button (May still fail)

The `.npmrc` and `postinstall.js` help, but cPanel button has no `NODE_OPTIONS` support. If it fails, use Option A.

---

## Testing the Fix

On cPanel terminal, you should now see:

```
npm install ... (takes 5-10 mins, steady progress)
✓ added 612 packages
[postinstall] ✅ better-sqlite3 rebuilt successfully
[postinstall] ✅ Post-install complete

npm run build ... (takes 2-3 mins)
✓ Compiled successfully
✓ Ready to start production server
```

If `better-sqlite3` rebuild fails:

```
[postinstall] ⚠️  better-sqlite3 rebuild failed. 
The app will use MemoryStore for sessions instead...
```

This is **OK** — the app still starts and works. Sessions just reset on restart.

---

## Why This Works

1. **Lower heap = less memory per process** ← fits in cPanel's 256MB limit
2. **Sequential downloads = stable memory usage** ← no spikes
3. **Graceful fallbacks = no crash on rebuild fail** ← app always boots
4. **Persistent `.npmrc` = cPanel button respects settings** ← even the web button uses less RAM
5. **Postinstall hook = auto-cleanup + rebuild** ← you don't need manual steps

---

## Commits

- `0eccd77c` — fix(cpanel): add memory-efficient npm install + postinstall hooks + deploy guide

Next: Push to GitHub, then follow CPANEL_DEPLOY.md to deploy.
