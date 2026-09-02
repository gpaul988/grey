This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

- Node.js 20.x is required to build and run this project (native modules like better-sqlite3 are built against Node 20). Use nvm or nvm-windows to install/manage Node versions for development. CI should also target Node 20.

## One-shot migration helper

A PowerShell helper is included to back up DB and orders.json, run the migration script, and perform basic verification.

Run from the repo root (Windows PowerShell):

  .\scripts\run-migration-and-verify.ps1

This script assumes Node 20 and npm are available. It will back up Admin\data\grey.db and Admin\data\orders.json before making changes.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

### Admin auth changes
The admin area now relies on server-side sessions as the single source of truth. The previous client-readable cookies (grey-admin-role, grey-admin-name) have been removed. Client UI should call the Express session endpoint at /admin/api/session to obtain the currently logged-in admin (returns { ok: true, data: { id, name, role } } or data: null).

Soft-delete / restore
Soft-delete is used for destructive actions (products, customers, orders, audit submissions). Admin pages include "Archived" (Trash) views under /admin/*/archived and server APIs accept POST { action: 'restore' } to undelete records and create audit log entries.

Activity API, filters and indexes
- A protected activity API is available at GET /api/admin/activity. It supports query params:
  - limit (1-200), page (>=1)
  - action, entity, user (search matches user_name)
  - since, until (ISO date strings)
- For better performance create indexes (recommended in production) by running:
  node scripts/create-activity-index.js

Testing (Playwright)
- E2E tests are scaffolded under tests/playwright. To run the restore flow end-to-end in CI/local provide these env vars:
  - ADMIN_TEST_EMAIL, ADMIN_TEST_PASSWORD
  - ADMIN_TEST_RESTORE_ENTITY (products|customers|orders|audits)
  - ADMIN_TEST_RESTORE_ID (numeric id to restore)
- Example command (local):
  ADMIN_TEST_EMAIL=admin@example.com ADMIN_TEST_PASSWORD=secret ADMIN_TEST_RESTORE_ENTITY=products ADMIN_TEST_RESTORE_ID=42 npm run test:e2e


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
