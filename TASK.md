# TASK: Restore full frontend (App Router) + keep admin (Pages Router) working on cPanel (1GB RAM)

## Context
- Full website was in app/, archived to app.archived/ (commit b39b0591) due to webpack OOM on cPanel
- Admin panel + APIs now in pages/ (Pages Router)
- Custom Express 5 server.ts wraps Next.js (next({dev}))
- Next.js 16.2.9, React 19, Express 5, better-sqlite3

## Plan
1. [ ] Audit app.archived/ structure + check for conflicts with pages/
2. [ ] Check for route collisions (app/ vs pages/ same path = build error)
3. [ ] Restore app.archived/ -> app/
4. [ ] Remove the / -> /admin redirect I added (frontend homepage now exists)
5. [ ] Fix OOM properly: NODE_OPTIONS max-old-space, single worker, webpack
6. [ ] tsc --noEmit passes
7. [ ] next build --webpack succeeds within ~1GB
8. [ ] npm run dev: / shows homepage, /admin works, APIs work
9. [ ] npm start (prod): same
10. [ ] Commit + push as gpaul988

## Decisions
- Keep both routers (Next supports app/ + pages/ simultaneously)
- 1GB RAM cap target for build

## Blockers
- (none yet)

## ROOT CAUSE FOUND (update)
- OOM is at WEBPACK COMPILE stage, not page render (force-dynamic didn't help alone)
- Heavy deps: three+@react-three+three-stdlib+stats-gl (~100MB, used in 1 file: components/futuristic/WebGLScene.tsx)
- framer-motion (12 files), recharts (1 file), Sentry (NOT wrapping webpack - ok)
- Peak ~1.76GB on single build pass

## FIX STRATEGY
1. Lazy-load WebGLScene via next/dynamic ssr:false -> splits 3D into separate chunk
2. Keep NODE_OPTIONS heap cap
3. Consider webpack splitChunks tuning if still high
4. Re-test memory, target <900MB
