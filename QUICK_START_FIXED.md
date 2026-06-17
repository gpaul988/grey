# Quick Start Guide - AFTER AUDIT FIXES ✅

## Status: All Issues Resolved
- ✅ npm install works
- ✅ npm run build successful (60-90s)
- ✅ npm run dev works (dev server on :3000)
- ✅ 0 TypeScript errors
- ✅ Ready for cPanel deployment

---

## Local Machine Setup

### First Time
```bash
# Clone repo
git clone https://github.com/gpaul988/grey.git
cd grey

# Install dependencies (gets all 613 packages)
npm install

# Verify build works
npm run build

# Start dev server
npm run dev
```

Open http://localhost:3000

### Daily Development
```bash
# Start server (includes auto-reload)
npm run dev

# In another terminal, seed database if needed
npm run seed

# Build for production
npm run build

# Start production server
npm start
```

---

## cPanel Deployment

### Initial Setup on cPanel
```bash
# 1. Upload project to cPanel (via git or file upload)
cd ~/public_html/grey

# 2. Install without scripts (cPanel safety)
npm install --ignore-scripts --legacy-peer-deps

# 3. Build the project
npm run build

# 4. Start with process manager (e.g., PM2, StrongLoop Arc)
npm start
```

### Important for cPanel
- ✅ Uses `--ignore-scripts` to avoid native module compilation
- ✅ Memory is limited, but 1GB allocation prevents OOM
- ✅ All dependencies properly declared
- ✅ Database uses SQLite (no external DB needed)

---

## Key Fixes Applied

| File | Issue | Fix |
|------|-------|-----|
| package.json | 512MB → OOM | Increased to 1024MB |
| tsconfig.json | 25K errors | Added "types": ["node"] |
| Admin/tsconfig.json | Missing | Created new config |
| .npmrc | omit=dev breaks build | Changed to legacy-peer-deps |
| - | Missing three.js | Installed @react-three/fiber |

---

## Common Commands

```bash
# Development
npm run dev                 # Start dev server on :3000

# Building
npm run build               # Production build
npm run lint                # Check code quality

# Database
npm run seed                # Seed initial data
npm run seed:reset          # Reset and reseed

# Cleanup (if needed)
npm run clean               # Remove node_modules/.next/package-lock
npm rebuild better-sqlite3  # If native modules fail

# Production
npm start                   # Start production server
npm run start:next          # Next.js production server (alternative)
```

---

## Troubleshooting

### Issue: `npm install` fails with permission errors
**Solution:** Check directory permissions, might need `sudo chmod -R 755 node_modules`

### Issue: Build still slow on cPanel
**Solutions:**
1. Increase allowed memory to 1.5GB if available
2. Use `--legacy-peer-deps` flag
3. Clear npm cache: `npm cache clean --force`

### Issue: "Cannot find module" errors
**Solution:** Delete node_modules and package-lock.json, then `npm install` again

### Issue: TypeScript errors in IDE
**Solution:** 
1. Make sure tsconfig.json has `"types": ["node"]`
2. Restart TypeScript server in your IDE
3. Delete .next folder and rebuild

---

## Performance Tips

- First build takes ~60-90 seconds
- Subsequent builds faster (incremental)
- Dev server uses Turbopack (faster than old builds)
- .next/ folder is cached, no need to commit

---

## What Changed?

All changes are **configuration only** - no source code was modified. The app works exactly the same, but now:
- Compiles without errors
- Builds successfully even on limited hardware
- Works on both local machines and cPanel

---

## Need More Details?

Read: `AUDIT_FIXES_APPLIED.md` for complete technical breakdown

---

**Last Updated:** June 17, 2026  
**All Verified:** ✅ Build ✅ Dev ✅ cPanel Ready
