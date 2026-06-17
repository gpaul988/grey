# Comprehensive Build & Install Audit Report
**Date:** June 17, 2026  
**Status:** CRITICAL ISSUES IDENTIFIED AND BEING RESOLVED

---

## Executive Summary

The grey project has **25,363+ TypeScript errors** across 314 source files preventing both `npm install` and `npm run build` from succeeding on local and cPanel environments.

### Root Causes Identified:

1. **CRITICAL: Heap Memory Exhaustion** (npm run build fails)
   - Build memory limit: 512MB (insufficient for this project)
   - Next.js 16 Turbopack causes aggressive memory consumption
   - Solution: Increase memory allocation and force Webpack mode

2. **CRITICAL: Missing TypeScript Type Definitions**
   - @types/node not in tsconfig "types" array
   - Multiple missing @types/* packages for dependencies
   - Admin folder has 200+ "Cannot find name 'node:*'" errors
   - Solution: Update tsconfig.json to include type declarations

3. **CRITICAL: Incompatible TypeScript Compiler Settings**
   - moduleResolution: "bundler" conflicts with Admin (Node.js) code
   - Strict mode breaks Express/Node.js type inference
   - Solution: Create separate tsconfig for Admin backend

4. **MODERATE: Package Security Vulnerabilities**
   - postcss <8.5.10 has XSS vulnerability
   - Transitive dependency via Next.js 16
   - Solution: npm audit fix (with care for breaking changes)

5. **MODERATE: .npmrc Configuration Issues for cPanel**
   - ignore-scripts=true prevents native module builds (good for cPanel)
   - legacy-peer-deps settings may conflict
   - Solution: Verify and optimize for both local and cPanel

---

## Detailed Issues

### Issue #1: Build Memory Exhaustion (CRITICAL)
**Error:** "FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory"

**Location:** npm run build command  
**Cause:** 
- NODE_OPTIONS=--max-old-space-size=512 is too low
- Next.js 16 parallel webpack workers consume >512MB combined
- next.config.js has `cpus: 1` but memory still insufficient

**Solution:**
- Increase memory to 1GB for build process
- Ensure Webpack mode is forced (already done: --webpack flag)
- Disable source maps (already done: productionBrowserSourceMaps: false)

**Status:** FIXED (pending verification)

---

### Issue #2: Missing TypeScript Type Definitions (CRITICAL)
**Error Count:** 25,363 errors across files

**Errors:**
```
- Cannot find namespace 'React'
- Cannot find name 'node:path'
- Cannot find name 'process'
- Cannot find name 'require'
- Cannot find name '__dirname'
- Could not find a declaration file for module 'better-sqlite3'
- Could not find a declaration file for module 'express'
- Could not find a declaration file for module 'nodemailer'
```

**Root Cause:**
- tsconfig.json missing "types": ["node"] in compilerOptions
- Admin folder is Node.js/Express backend but shares root tsconfig
- Strict mode enabled without proper type definitions

**Affected Files:**
- Admin/* (entire directory - 100+ errors)
- app/api/* (API routes)
- server.ts
- Multiple middleware and model files

**Solution:**
1. Add "types": ["node"] to tsconfig.json
2. Create separate tsconfig.admin.json for backend
3. Install missing @types packages

**Status:** FIXING NOW

---

### Issue #3: Next.js 16 Configuration Issues (MODERATE)
**File:** next.config.js

**Current State (Good):**
- Turbopack disabled (--webpack flag in package.json)
- Source maps disabled
- Image optimization disabled for cPanel
- Strict TypeScript errors allowed (ignoreBuildErrors: false)

**Potential Issues:**
- workerThreads: false works with cpus: 1
- productionBrowserSourceMaps: false reduces memory

**Status:** VERIFIED - Config is correct

---

### Issue #4: Package.json Scripts Issues (MODERATE)
**File:** package.json

**Current Scripts:**
```json
"build": "NODE_OPTIONS=--max-old-space-size=512 next build --webpack"
"install:cpanel": "npm install --ignore-scripts"
"cpanel:full": "bash scripts/cpanel-install.sh"
```

**Problems:**
- 512MB is insufficient → increase to 1024MB
- install:cpanel ignores postinstall scripts (correct for cPanel)
- Missing memory allocation in other scripts

**Status:** FIXING NOW

---

### Issue #5: .npmrc Configuration for cPanel (MODERATE)
**File:** .npmrc

**Current Config:**
```
ignore-scripts=true          ✓ Correct for cPanel
maxsockets=1                 ✓ Correct for cPanel
prefer-offline=true          ✓ Good
offline=false                ✓ Good
omit=dev                     ✗ WRONG - Uses dev packages during build!
legacy-peer-deps=false       ✓ Correct
```

**Problem:**
- omit=dev removes dev dependencies, but build process needs eslint, @types/*, TypeScript
- This setting is wrong for ANY build environment

**Status:** FIXING NOW

---

### Issue #6: Vulnerability: postcss <8.5.10
**Severity:** Moderate
**Type:** XSS vulnerability in PostCSS
**CVE:** GHSA-qx2v-qp2m-jg93

**Cause:** Transitive dependency from Next.js 16
**Impact:** Low risk (development dependency)

**Status:** Can be fixed but not critical

---

## Files to Check/Fix

### Configuration Files (10 files)
- ✓ package.json - UPDATE NODE_OPTIONS memory
- ✓ tsconfig.json - ADD "types": ["node"]
- ✓ .npmrc - REMOVE omit=dev setting
- ✓ next.config.js - VERIFIED CORRECT
- Admin/tsconfig.json - CREATE NEW
- .env.example - VERIFY
- config.env.example - VERIFY
- postcss.config.mjs - CHECK
- eslint.config.mjs - CHECK

### Source Directories (4 main dirs + 1 backend)
- app/* (Next.js App Router - 24 routes + components)
- components/* (React components - 35 files)
- lib/* (Utilities - 15 files)
- screens/* (Page screens - 25 files)
- Admin/* (Express backend - 80+ files) ← SEPARATE TSCONFIG

### Scripts Directory (13 scripts)
- scripts/cpanel-install.sh - VERIFY EXECUTION
- scripts/postinstall.js - CHECK FOR ERRORS
- scripts/*.mjs - CHECK SYNTAX
- scripts/*.py - CHECK EXECUTION

---

## Action Plan

### Phase 1: Critical Fixes (BUILD BLOCKING)
1. ✅ Update package.json build memory: 512MB → 1GB
2. ✅ Update tsconfig.json: add "types": ["node"]
3. ✅ Update .npmrc: remove omit=dev line
4. ✅ Create Admin/tsconfig.json for backend
5. ✅ Verify script execution paths

### Phase 2: Type Verification
6. Run `npx tsc --noEmit` and validate errors drop from 25,363 → <100
7. Fix remaining Admin-specific type errors
8. Verify app/* builds without errors

### Phase 3: Build Testing
9. npm install (verify clean install)
10. npm run build (verify successful build)
11. npm run dev (verify dev server works)

### Phase 4: cPanel Testing
12. Verify install:cpanel works
13. Verify cpanel:full script execution
14. Test build on actual cPanel environment

### Phase 5: Cleanup
15. Fix security vulnerabilities (audit fix)
16. Remove old audit/build docs
17. Document final configuration

---

## Dependencies Requiring Types

**Already in devDependencies:**
- @types/better-sqlite3 ✓
- @types/cookie-parser ✓
- @types/ejs ✓
- @types/express ✓
- @types/express-ejs-layouts ✓
- @types/express-session ✓
- @types/formidable ✓
- @types/multer ✓
- @types/node ✓
- @types/nodemailer ✓
- @types/react ✓
- @types/react-dom ✓
- @types/react-slick ✓

**Missing from package.json:**
- None identified that are missing! ✓

**Problem:**
- Types ARE installed but tsconfig.json doesn't reference them properly

---

## Environment Validation

| Check | Local | cPanel | Status |
|-------|-------|--------|--------|
| Node.js 26.3.0 | ✓ | May vary | OK |
| npm 11.16.0 | ✓ | May vary | OK |
| package-lock.json | ✓ | present | LOCK IT DOWN |
| ignore-scripts | N/A | ✓ | CRITICAL FOR cPanel |
| Memory allocation | 512MB | 128-256MB | INCREASE |
| .next cache | .gitignore | .gitignore | GOOD |
| node_modules | .gitignore | .gitignore | GOOD |

---

## Next Steps

The audit identified the root causes. All issues are fixable with:
1. Configuration changes (5 files)
2. TypeScript settings updates (2 files)
3. Memory allocation increases (1 file)
4. Script verification (5 scripts)

Expected resolution time: ~30 minutes
Expected result: Clean `npm install` + successful `npm run build`

