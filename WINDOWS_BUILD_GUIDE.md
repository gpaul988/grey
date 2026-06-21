# Windows Build Guide - npm scripts Fix

## Problem
Running `npm run build` on Windows fails with:
```
'NODE_OPTIONS' is not recognized as an internal or external command
```

## Root Cause
**Unix/Linux syntax** for environment variables doesn't work on Windows Command Prompt:
```bash
# ✅ Linux/Mac
NODE_OPTIONS=--max-old-space-size=4096 next build

# ❌ Windows CMD (doesn't work)
NODE_OPTIONS=--max-old-space-size=4096 next build

# ✅ Windows CMD (correct)
set NODE_OPTIONS=--max-old-space-size=4096 && next build
```

## Solution
Use **`cross-env`** package (already installed) which works on **all platforms**:

```json
// BEFORE (fails on Windows)
"build": "NODE_OPTIONS=--max-old-space-size=4096 next build"

// AFTER (works on Windows, Mac, Linux)
"build": "cross-env NODE_OPTIONS=--max-old-space-size=4096 next build"
```

## What Changed
- `package.json`: Updated `build` script to use `cross-env`
- All other scripts already use `cross-env` ✅
- Commit: TBD

## How to Use (Windows)

### Option 1: Command Prompt (CMD)
```bash
npm run build        # ✅ Now works!
npm run dev          # ✅ Already working
npm run start        # ✅ Already working
```

### Option 2: PowerShell
```powershell
npm run build        # ✅ Works
# (same as CMD)
```

### Option 3: Git Bash / MINGW64
```bash
npm run build        # ✅ Works
# (same as CMD/PowerShell)
```

## Step-by-Step: Build on Windows

1. **Clone the repo**
   ```bash
   git clone https://github.com/gpaul988/grey.git
   cd grey
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env.local` file** (copy from `.env.example`)
   ```bash
   copy .env.local      # Windows CMD
   # or
   Copy-Item ".env.example" -Destination ".env.local"  # PowerShell
   ```

4. **Update environment variables** (if needed)
   - Edit `.env.local`
   - Change `DATABASE_URL`, API keys, etc.

5. **Run the build** ✅
   ```bash
   npm run build
   ```
   Expected output:
   ```
   ▲ Next.js 16.2.9
   
   ✓ Compiled successfully
   ✓ Linting and type checking
   ✓ Collecting page data
   ✓ Generating static pages (1/1)
   ✓ Collecting build traces
   
   Build completed successfully
   ```

6. **Test locally**
   ```bash
   npm run dev:next
   # Opens at http://localhost:3000
   ```

7. **Deploy to cPanel** (see CPANEL_DEPLOYMENT_GUIDE.md)
   ```bash
   # Push to GitHub (GitHub Actions will deploy)
   git add .
   git commit -m "Local build verified on Windows"
   git push origin main
   ```

## Troubleshooting

### Error: `Cannot find module 'cross-env'`
```bash
npm install cross-env --save-dev
```

### Error: `next build` still fails
```bash
# Clear Next.js cache
rm -r .next                    # Linux/Mac
rmdir /s /q .next             # Windows CMD
Remove-Item -Recurse -Force .next  # PowerShell

# Try again
npm run build
```

### Error: `out of memory` during build
```bash
# Increase memory limit in .env.local
NODE_OPTIONS=--max-old-space-size=8192

# Or manually override:
cross-env NODE_OPTIONS=--max-old-space-size=8192 next build
```

### Error: `better-sqlite3` build fails
```bash
# Rebuild native modules
npm run rebuild:sqlite
```

## All npm Scripts Now Windows-Compatible

| Script | Purpose | Works on Windows |
|--------|---------|-----------------|
| `npm run dev` | Dev server (custom) | ✅ (uses cross-env) |
| `npm run dev:next` | Next.js dev server | ✅ |
| `npm run build` | Production build | ✅ **FIXED** |
| `npm run start` | Production start | ✅ (uses cross-env) |
| `npm run start:next` | Next.js prod start | ✅ |
| `npm run test:e2e` | E2E tests | ✅ |

## Reference

- **cross-env docs:** https://github.com/kentcdodds/cross-env
- **Windows & Node.js:** https://nodejs.org/en/docs/guides/nodejs-on-windows/
- **npm scripts guide:** https://docs.npmjs.com/cli/v10/using-npm/scripts

## Summary

✅ **Windows npm build now works** - just run:
```bash
npm run build
```

No special commands needed for different operating systems! 🎉
