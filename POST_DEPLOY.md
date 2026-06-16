# cPanel Post-Deploy Checklist

After pushing to GitHub and cPanel auto-deploys (or manually pulling):

## 1. Install Dependencies
```bash
cd /home/greyinf1/public_html/grey
npm ci --omit=dev
```
⚠️ **Critical**: Use `npm ci`, NOT `npm install`. It reads `package-lock.json` and is deterministic.

## 2. Rebuild Native Modules (CRITICAL)
```bash
npm rebuild better-sqlite3 --build-from-source
```
⚠️ **CRITICAL**: `better-sqlite3` is a native C++ module. The prebuilt binary from npm won't work on cPanel.  
You MUST rebuild it against cPanel's Node version or it will fail with:
```
Error: Could not locate the bindings file. Tried: ... better_sqlite3.node
```
This compiles the `.node` binary locally on cPanel's server.

## 3. Build Next.js (Optional if Passenger doesn't auto-run it)
```bash
npm run build
```

## 4. Check Node Version
In cPanel's "Setup Node.js App":
- Select **Node 20** or **Node 22** (22 recommended)
- Must match what compiled `better-sqlite3`

## 5. Verify Passenger Restart
- cPanel UI → Node.js App → Restart App
- Check `/home/greyinf1/etc/passenger.log` for:
  - ✅ "Application cluster booted successfully"
  - ❌ Any `Cannot find module` errors → re-run `npm ci`

## Why These Steps?

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| `Cannot find module 'tsx'` | `npm install` wasn't run | Use `npm ci` |
| `Cannot find module 'iconv-lite'` | Missing from `package-lock.json` in old version | Updated `package.json` |
| `better-sqlite3` crashes | Built for wrong Node version | Run `npm rebuild better-sqlite3` |
| Node path `/home/greyinf1/nodevenv/public_html/grey/20/bin/node` broken | Old Node 20 symlink | Select Node 20/22 in cPanel UI |

## Automated Deployment

If cPanel has **GitHub Webhooks** enabled:
1. Create `.cpanel.yml` (included in this repo) ✅
2. cPanel will auto-run `npm ci` and `npm run build` on push
3. Passenger restarts automatically

If using **SSH deployment** or **Git pull**:
1. Pull code: `git pull`
2. Run steps 1–5 above manually

## Troubleshooting

**Error: `iconv-lite` still missing?**
- cPanel may have stale `node_modules`
- Delete it: `rm -rf node_modules package-lock.json`
- Run: `npm install` (let it regenerate lock file matching package.json)
- Then: `npm ci --omit=dev`

**Error: Better SQLite3 native module mismatch?**
```bash
npm rebuild better-sqlite3 --build-from-source
```

**Passenger logs show success but site won't load?**
- Check MySQL/SQLite permissions: `ls -la Admin/data/grey.db`
- DB should be owned by the cPanel user (greyinf1)
- If wrong owner: `chown greyinf1:greyinf1 Admin/data/grey.db`
