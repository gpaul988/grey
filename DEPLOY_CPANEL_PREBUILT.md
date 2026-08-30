# cPanel Deployment — Prebuilt (Authoritative)

> This is the **current, correct** deployment process. It supersedes any older
> doc (CPANEL_READY.md, PRODUCTION_DEPLOYMENT_PLAN.md, DEPLOY-CPANEL*.md, etc.)
> that tells you to run `npm run build` on the cPanel server.

## Why prebuilt

The cPanel host has **~1GB RAM**. A production `next build` peaks at **~3.4GB RSS**
(mostly webpack parsing three.js off-heap). Capping the JS heap does **not** lower
total RSS, so the build is **OOM-killed on cPanel**. The fix: **build locally / in CI,
upload the prebuilt `.next`, and only run the server on cPanel.**

**NEVER run `npm run build` on cPanel.**

## What runs where

| Step            | Where                | Command                         |
|-----------------|----------------------|---------------------------------|
| Install + build | Local machine / CI   | `npm ci && npm run build`       |
| Package         | Local machine / CI   | `bash scripts/build-and-deploy.sh` |
| Upload          | → cPanel File Manager| upload `grey-deploy.zip`, extract |
| Seed (first run)| cPanel               | `npm run cpanel:post` (seed only)|
| Start           | cPanel (Node app)    | `npm start` (runs `server.ts`)  |

## Architecture notes

- **App Router (`app/`)** = public frontend (92 pages: home, services, store, blog,
  portfolio, industries, …). Rendered `force-dynamic` — served by the long-running
  Express server (`server.ts`), so SSG gives no benefit.
- **Pages Router (`pages/admin/*`)** = admin dashboard.
- **APIs**: most in `pages/api/`, only `ai/chat` in `app/api/`. No route collisions.
- `next.config.js` disables the webpack cache in prod, keeping `.next` ~30MB
  (no giant cache folder shipped).

## Step-by-step

### 1. Build locally
```bash
git pull
npm ci
npm run build        # cross-env NODE_OPTIONS=--max-old-space-size=4096 next build --webpack
```

### 2. Package
```bash
bash scripts/build-and-deploy.sh   # produces grey-deploy.zip (.next + server + deps manifest)
```

### 3. Upload to cPanel
- cPanel → File Manager → app root → upload `grey-deploy.zip` → Extract.
- Or use the Git/FTP method your host supports — just don't trigger a build.

### 4. Configure the Node app (cPanel → Setup Node.js App)
- Application startup file: `server.ts` (via `npm start`).
- Run `npm install --omit=dev` (or `npm ci --omit=dev`) for runtime deps only.

### 5. Seed once (first deploy)
```bash
npm run cpanel:post   # now runs ONLY `npm run seed` — no build
```

### 6. Start
```bash
npm start             # or cpanel:start
```

## Local dev (Windows)
```bash
git pull
npm run dev           # frontend at http://localhost:3000
```

## Verified routes (dev + prod)
- `/` 200 (homepage "Graham Sobiribo Paul"), `/services` `/store` `/contact` `/blog` `/portfolio` 200
- `/admin` 302 → login, `/login` 200
- `/api/i18n/en` 200, `POST /api/ai/chat` 200
- `tsc --noEmit` exit 0
