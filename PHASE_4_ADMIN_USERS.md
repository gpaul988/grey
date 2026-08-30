# Phase 4: Admin User Management (PostgreSQL)

**Status:** ⏳ IN PROGRESS  
**Estimated Duration:** 3-4 hours  
**Started:** 2026-08-30 13:23:18

---

## Overview

Migrate admin authentication from environment variables + hardcoded credentials to a proper PostgreSQL `admin_users` table with role-based access control (RBAC).

---

## Deliverables

### 1. Database Schema ✅
- Created `adminUsers` table in `/lib/db/schema.ts`
- Columns: id, email, passwordHash, role, isActive, lastLogin, permissions, createdAt, updatedAt
- Indexes: email (unique), role, isActive
- Roles: superadmin, admin, editor, viewer

### 2. API Endpoints ✅ (Framework Ready)

#### List & Create Users
- `GET /api/admin/users` - List all admin users
  - Response: `[{ id, email, role, isActive, lastLogin }]`
  - Auth: X-Admin-Token header
  
- `POST /api/admin/users` - Create new admin user
  - Body: `{ email, password, role }`
  - Response: `{ id, email, role }`
  - Auth: X-Admin-Token (superadmin only)

#### Single User Operations
- `GET /api/admin/users/[id]` - Get user by ID
- `PUT /api/admin/users/[id]` - Update user (email, role, isActive, password)
- `DELETE /api/admin/users/[id]` - Delete user

### 3. Still to Do

- [ ] **Database Migration**: Run Drizzle migration to create `admin_users` table
  ```bash
  npm run migrate
  ```

- [ ] **Seed Default Admin**: Insert default superadmin user
  ```sql
  INSERT INTO admin_users (email, password_hash, role, is_active) 
  VALUES ('admin@grey.dev', '$2b$10$...', 'superadmin', TRUE);
  ```

- [ ] **Auth Middleware**: Create JWT verification middleware
  - File: `/lib/auth/verify-token.ts`
  - Verify X-Admin-Token header
  - Decode JWT and extract user info
  - Check role permissions

- [ ] **Update Login Endpoint**: Modify `/api/admin/auth/login`
  - Query `adminUsers` table
  - Hash + compare password with bcryptjs
  - Generate JWT token
  - Update `lastLogin` timestamp

- [ ] **Admin Users Management UI**: Create `/pages/admin/users.tsx`
  - Table view with: email, role, lastLogin, isActive status
  - Create button (modal form)
  - Edit button (update role, toggle active)
  - Delete button (confirm dialog)
  - Pagination & search

- [ ] **E2E Tests**: Extend `/e2e/admin-users.spec.ts`
  - Test user CRUD (create, read, update, delete)
  - Test role-based access (admin can't delete superadmin)
  - Test permission enforcement

- [ ] **Production Checklist**
  - [ ] Change default admin password
  - [ ] Enable token expiration (e.g., 24 hours)
  - [ ] Add refresh token mechanism
  - [ ] Rate limit login attempts
  - [ ] Log admin actions (audit trail)

---

## Files Created

| File | Purpose |
|------|---------|
| `/lib/db/schema.ts` | Added `adminUsers` table definition |
| `/pages/api/admin/users/index.ts` | GET/POST users endpoint |
| `/pages/api/admin/users/[id].ts` | GET/PUT/DELETE user endpoint |
| `/PHASE_4_ADMIN_USERS.md` | This file |

---

## Commands to Run Next

```bash
# 1. Run database migration
npm run migrate

# 2. Start dev server
npm run dev

# 3. Test endpoints (manual)
curl -X GET http://localhost:3000/api/admin/users \
  -H "X-Admin-Token: <your-token>"

# 4. Run E2E tests
npm run test:e2e

# 5. Build
npm run build
```

---

## Database Schema

```sql
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin', -- superadmin | admin | editor | viewer
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  permissions JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_role ON admin_users(role);
CREATE INDEX idx_admin_users_is_active ON admin_users(is_active);
```

---

## Role Permissions Matrix

| Role | Users | Services | Payments | Audits | Webhooks | Email | FAQs |
|------|-------|----------|----------|--------|----------|-------|------|
| superadmin | CRUD | CRUD | CRUD | CRUD | CRUD | CRUD | CRUD |
| admin | CRUD | CRUD | R | R | R | CRUD | CRUD |
| editor | R | CRUD | - | R | - | CRUD | CRUD |
| viewer | R | R | R | R | R | - | R |

---

## Next Steps

1. Run database migration
2. Seed default admin user
3. Create auth middleware
4. Update login endpoint
5. Build user management UI
6. Add E2E tests
7. Deploy to cPanel

---

## Blockers / Notes

- ❓ JWT secret: Where is it stored? (check `.env.local`)
- ❓ Token expiration: How long should admin tokens last?
- ❓ Rate limiting: Should we add per-IP or per-email limits?

**See also:** `/PHASE_ROADMAP.md` for full roadmap
