# DEVELOPMENT GUIDE - GREY PROJECT
**Last Updated**: 2026-08-30 13:23:18  
**For**: Senior Full-Stack Developers  
**Project**: Graham Sobiribo Paul Service Platform

---

## QUICK START

### First-Time Setup (5 minutes)

```bash
# 1. Clone and install
git clone https://github.com/grahamsobiribopaul/grey.git
cd grey
npm install

# 2. Create development env
cat > .env.local << 'EOF'
NODE_ENV=development
PORT=3000
HOST=localhost
DATABASE_URL=file:./Admin/data/grey.db

SESSION_SECRET=dev-session-secret-generated-on-first-run
CSRF_SECRET=dev-csrf-secret-generated-on-first-run

NEXT_PUBLIC_API_URL=http://localhost:3000

SEED_SUPERADMIN_PASSWORD=DevPassword123!
SEED_ADMIN_PASSWORD=DevPassword123!
SEED_MANAGER_PASSWORD=DevPassword123!
SEED_STAFF_PASSWORD=DevPassword123!
EOF

# 3. Seed database
npm run seed

# 4. Start dev server
npm run dev

# 5. Access the app
# Homepage:      http://localhost:3000
# Admin Login:   http://localhost:3000/admin/login
# Admin Email:   admin@greyinfotech.com.ng
# Admin Pass:    DevPassword123!
```

---

## PROJECT STRUCTURE

```
grey/
├── Admin/                          # Express.js backend (EJS templates)
│   ├── config/                     # Configuration & environment
│   ├── db/                         # SQLite database & migrations
│   ├── middleware/                 # Auth, security, CSRF, rate limiting
│   ├── models/                     # Database models (Users, Submissions, etc.)
│   ├── routes/                     # API & admin dashboard routes
│   └── views/                      # EJS HTML templates
│
├── pages/                          # Next.js pages & API routes
│   ├── api/                        # Next.js API endpoints (legacy)
│   ├── admin/                      # Protected admin pages
│   └── [...]/                      # Public marketing pages
│
├── components/                     # React components
│   ├── admin/                      # Admin dashboard components
│   └── [...]/                      # Public site components
│
├── lib/                            # Utility libraries
│   ├── admin/                      # Admin-specific utilities
│   ├── ai/                         # AI features (estimator, analyzer)
│   ├── db.ts                       # Database client
│   ├── auth.ts                     # JWT token management
│   ├── cache.ts                    # Caching layer
│   ├── payments.ts                 # Stripe & PayPal integration
│   └── [...]/                      # Other utilities
│
├── public/                         # Static assets
│   ├── images/                     # Images & icons
│   └── [...]/                      # CSS, JS, fonts
│
├── migrations/                     # SQL migrations
│   ├── 001_init.sql                # Initial schema
│   ├── 002_phase_6.sql             # Phase 6 features
│   └── 003_phase9.sql              # Phase 9 enhancements
│
├── server.ts                       # Express + Next.js entry point
├── package.json                    # Dependencies & scripts
├── next.config.js                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project overview
```

---

## DEVELOPMENT WORKFLOW

### Running the Dev Server

```bash
# Start the server
npm run dev

# Server output:
# [DB] Connected and migrated
# > Ready on http://localhost:3000
# > Admin on http://localhost:3000/admin

# The server will auto-reload on file changes
# Press Ctrl+C to stop
```

**Server Architecture**:
- Port 3000: Express server (localhost) or 0.0.0.0 (production)
- Next.js handled by Express through `next.getRequestHandler()`
- Database: SQLite (file-based, in `Admin/data/grey.db`)
- Sessions: SQLite session store (auto-created)

### File Changes That Trigger Recompile

| File Type | What Happens | Time |
|-----------|-------------|------|
| `.tsx` in `components/` | Hot reload (browser) | <1s |
| `.ts` in `lib/` | Server restarts | ~3s |
| `.ts` in `Admin/routes/` | Server restarts | ~3s |
| `.ts` in `pages/api/` | Server restarts | ~3s |
| `package.json` | Manual restart required | - |
| `tsconfig.json` | Manual restart required | - |
| `.env.local` | Restart required | - |

**Pro Tip**: Keep server running in a tmux/screen session:
```bash
tmux new-session -d -s dev "npm run dev"
tmux attach -t dev
# To detach: Ctrl+B then D
```

---

## ENVIRONMENT VARIABLES

### Development (.env.local)

```env
# Server
NODE_ENV=development
PORT=3000
HOST=localhost

# Database
DATABASE_URL=file:./Admin/data/grey.db

# Security (auto-generated on first run if SESSION_SECRET is empty)
SESSION_SECRET=dev-secret-auto-generated
CSRF_SECRET=dev-secret-auto-generated

# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Seed Credentials (for npm run seed)
SEED_SUPERADMIN_PASSWORD=DevPassword123!
SEED_ADMIN_PASSWORD=DevPassword123!
SEED_MANAGER_PASSWORD=DevPassword123!
SEED_STAFF_PASSWORD=DevPassword123!

# Optional: Payment gateways (use test keys for dev)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
PAYPAL_CLIENT_ID=test_client_id
PAYPAL_CLIENT_SECRET=test_secret

# Optional: Email (for testing email features)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_FROM=noreply@greyinfotech.com.ng
```

### Generate Secure Secrets

```bash
# Generate a secure random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Use the output for SESSION_SECRET and CSRF_SECRET
```

---

## DATABASE MANAGEMENT

### Initialize Database

```bash
# Create fresh database with seeded demo data
npm run seed

# Output:
# [DB] Connected and migrated
# ✓ Super admin created (graham@greyinfotech.com.ng)
# ✓ Admin created (admin@greyinfotech.com.ng)
# ... more users created ...
# FAQs seeded: +150 new
```

### Reset Database

```bash
# Delete database and reseed (WARNING: deletes all data)
npm run seed:reset

# Equivalent to:
# rm -f Admin/data/grey.db
# npm run seed
```

### Database Files

```bash
# Main database
Admin/data/grey.db            # SQLite database
Admin/data/grey.db-shm        # Shared memory (temporary)
Admin/data/grey.db-wal        # Write-ahead log (temporary)

# Clean up temp files:
rm -f Admin/data/grey.db-shm Admin/data/grey.db-wal
```

### Run Custom SQL

```bash
# Query the database
sqlite3 Admin/data/grey.db "SELECT email, role FROM users LIMIT 5;"

# Or use Node.js:
node -e "const db = require('better-sqlite3')('Admin/data/grey.db'); console.log(db.prepare('SELECT COUNT(*) as count FROM users').get());"
```

### Database Schema

View migrations:
- `migrations/001_init.sql` — Core tables (users, submissions, etc.)
- `migrations/002_phase_6.sql` — Admin features
- `migrations/003_phase9.sql` — Advanced features

Edit migrations to add tables/columns.

---

## TESTING

### Run Tests

```bash
# Unit and integration tests
npm run test

# Expected output:
# ✓ 456 tests passing
# ✓ Total time: ~9s

# Watch mode (auto-rerun on changes)
npm run test -- --watch

# Run specific test file
npm run test lib/__tests__/db.test.ts

# Run with coverage
npm run test:coverage
```

### E2E Tests (Playwright)

```bash
# Run Playwright E2E tests
npm run test:e2e

# Headed mode (see browser)
npm run test:e2e:headed

# Debug mode (step through)
npm run test:e2e:debug
```

### Test Files Organization

```
tests/
├── e2e.integration.test.ts     # API workflow tests (48 tests)
├── phase-10.test.ts             # Dashboard features (43 tests)
├── 2fa.test.ts                  # Two-factor auth (44 tests)
├── dashboard.test.ts            # Analytics (43 tests)
├── reviews.test.ts              # Review system (30 tests)
├── recommendations.test.ts      # AI recommendations (30 tests)
└── cms.test.ts                  # Headless CMS (19 tests)

lib/__tests__/
├── ai-code-analyzer.test.ts     # Code analysis
├── tech-scanner.test.ts         # Tech stack detection
├── payments.test.ts             # Payment processing
└── [...]/                       # More unit tests
```

### Writing New Tests

Example test:

```typescript
// lib/__tests__/my-feature.test.ts
import { describe, it, expect } from 'vitest';
import { myFunction } from '../my-feature';

describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });

  it('should handle errors', () => {
    expect(() => myFunction(null)).toThrow();
  });
});
```

Run with: `npm run test lib/__tests__/my-feature.test.ts`

---

## BUILDING FOR PRODUCTION

### Create Production Build

```bash
# Build optimized bundle
npm run build

# Expected output:
# ✓ Compiled successfully (compiled 114 pages + 75 routes)
# ✓ Build file size optimized
# ✓ .next/ directory created (~2.1MB)

# Time: ~60-90 seconds

# Check build errors
npx tsc --noEmit
# Expected: No output (success)
```

### Test Production Build Locally

```bash
# Build for production
npm run build

# Start production server
npm start

# Test
curl http://localhost:3000
curl http://localhost:3000/admin/login

# Should work exactly like dev, but faster
```

---

## CODE QUALITY

### Linting

```bash
# Fix all linting issues
npm run lint

# Shows fixes made
# ✓ Fixed X issues in Y files

# Check without fixing:
npx eslint .
```

### TypeScript Checking

```bash
# Check for type errors
npx tsc --noEmit

# Expected: No output (success)
# Or: "X errors found"

# Build with type checking
npm run build
# Fails if any type errors (ignore if ignoreBuildErrors: false)
```

### Code Formatting

```bash
# Format with Prettier (if available)
npx prettier --write .

# Or just lint
npm run lint  # includes some formatting
```

---

## COMMON DEVELOPMENT TASKS

### Add a New Admin Page

1. Create React component:
```typescript
// pages/admin/my-feature.tsx
import { AdminLayout } from '@/components/admin/AdminLayout';

export default function MyFeaturePage() {
  return (
    <AdminLayout title="My Feature">
      <div>Content here</div>
    </AdminLayout>
  );
}
```

2. Add route in navigation (if needed):
```typescript
// Admin/config/adminNavigation.ts
export const ADMIN_ROUTES = [
  { path: '/admin/my-feature', label: 'My Feature' },
];
```

3. Test: Navigate to `http://localhost:3000/admin/my-feature`

### Add a New API Endpoint

**Option A: Express Route** (Recommended for backend logic)
```typescript
// Admin/routes/api.ts (add to existing router)
router.post('/my-endpoint', async (req, res) => {
  const { data } = req.body;
  // Process data
  res.json({ success: true });
});
```

**Option B: Next.js API Route**
```typescript
// pages/api/my-endpoint.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { data } = req.body;
  // Process data
  res.json({ success: true });
}
```

### Add a New Database Model

1. Create migration:
```sql
-- migrations/004_my_feature.sql
CREATE TABLE my_table (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

2. Create model:
```typescript
// Admin/models/MyTable.ts
import db from '../db';

export const MyTable = {
  create: (data: { name: string }) => {
    return db.prepare(
      'INSERT INTO my_table (name) VALUES (?)'
    ).run(data.name);
  },

  findAll: () => {
    return db.prepare('SELECT * FROM my_table').all();
  },
};
```

3. Use in routes:
```typescript
const rows = MyTable.findAll();
```

---

## DEBUGGING

### Using Chrome DevTools

```bash
# Start server with debugging
node --inspect=9229 server.ts

# Or use npm script:
# Add to package.json:
# "dev:debug": "node --inspect-brk=9229 -r tsx/esm server.ts"

npm run dev:debug

# Open Chrome and visit: chrome://inspect
# Click "inspect" on the Node process
```

### Using VS Code Debugger

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Server",
      "program": "${workspaceFolder}/node_modules/.bin/tsx",
      "args": ["server.ts"],
      "cwd": "${workspaceFolder}",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

Press F5 to start debugging.

### Console Logging

```typescript
// Use the logger utility
import { logger } from '@/lib/logger';

logger.info('User logged in', { userId: 123 });
logger.warn('Something unexpected', { error: err });
logger.error('Critical error', { stack: err.stack });
```

Check logs in `.next/logs/` (development) or console output.

---

## PERFORMANCE TIPS

### Reduce Build Time

```bash
# Skip type checking (dev only!)
npm run dev:next  # Uses Vite directly

# Or in production, use:
npm run build --webpack  # Already configured
```

### Reduce Bundle Size

- Use `dynamic()` imports for admin pages
- Tree-shake unused dependencies
- Check bundle: `npx next bundle-analyzer`

### Database Query Optimization

```typescript
// ❌ Bad: N+1 queries
const users = db.prepare('SELECT * FROM users').all();
for (const user of users) {
  const projects = db.prepare('SELECT * FROM projects WHERE user_id = ?').all(user.id);
}

// ✅ Good: Single join query
const data = db.prepare(`
  SELECT u.*, p.*
  FROM users u
  LEFT JOIN projects p ON p.user_id = u.id
`).all();
```

---

## TROUBLESHOOTING

### "Cannot find module 'better-sqlite3'"

**Cause**: Native module failed to build

**Fix**:
```bash
npm rebuild better-sqlite3 --build-from-source
# If that fails, app falls back to MemoryStore (data lost on restart)
```

### "Port 3000 already in use"

**Cause**: Another process using the port

**Fix**:
```bash
# Kill process using port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### "DATABASE_URL not set" error

**Cause**: Missing environment variable

**Fix**:
```bash
# Make sure .env.local has:
DATABASE_URL=file:./Admin/data/grey.db

# Or set in terminal:
export DATABASE_URL=file:./Admin/data/grey.db
npm run dev
```

### Tests failing with "DATABASE_URL env var is required"

**Cause**: Test environment doesn't have DATABASE_URL

**Fix**:
```bash
# Option 1: Set in test env
DATABASE_URL=file:./Admin/data/grey.db npm run test

# Option 2: Create .env.test
cat > .env.test << 'EOF'
DATABASE_URL=file:./Admin/data/grey.db
EOF

# Then run:
npm run test
```

---

## GETTING HELP

### Documentation Files

- `PRODUCTION_DEPLOYMENT_PLAN.md` — cPanel deployment guide
- `AUDIT_FIXES_APPLIED.md` — Recent fixes
- `CPANEL_ERRORS_FIXED.md` — Common cPanel issues
- `REMAINING_TASKS.md` — Future features

### Code Comments

Many complex sections have detailed comments:
```typescript
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// This is a complex algorithm. Here's how it works:
// 1. Fetch users from database
// 2. Filter by active status
// 3. Return sorted list
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### GitHub Issues

Found a bug? Open an issue:
```
Title: [BUG] Description of issue
Body:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (Node version, OS, etc.)
```

---

## NEXT STEPS

1. **Run the dev server**: `npm run dev`
2. **Explore the codebase**: Start in `Admin/routes/auth.ts`
3. **Read the migration**: `migrations/001_init.sql`
4. **Make a change**: Edit a component and see hot-reload
5. **Run tests**: `npm run test`
6. **Deploy to cPanel**: Follow `PRODUCTION_DEPLOYMENT_PLAN.md`

---

**Happy developing! 🚀**
