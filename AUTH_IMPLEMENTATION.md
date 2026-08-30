# JWT Authentication Implementation - Grey Project

## Overview
All admin API endpoints now require JWT-based authentication with role-based access control (RBAC).

## What Changed

### 1. Environment Variables
Added to `.env.example`:
```env
# Admin JWT Secret - for signing/verifying tokens
ADMIN_JWT_SECRET=admin-jwt-secret-change-in-production

# TawkChat IDs - now configurable per environment
NEXT_PUBLIC_TAWK_PROPERTY_ID=6a1ba828a3242d1c2ed9db1d
NEXT_PUBLIC_TAWK_WIDGET_ID=1jpu0ho3p
```

### 2. Protected API Endpoints

#### CMS Pages (`/api/cms/pages/`)
- **GET** `/api/cms/pages` - Public (published only) + Admin (all pages)
- **POST** `/api/cms/pages` - **SuperAdmin Only** ✅ JWT Protected
- **PATCH** `/api/cms/pages` - **SuperAdmin Only** ✅ JWT Protected
- **DELETE** `/api/cms/pages?id=X` - **SuperAdmin Only** ✅ JWT Protected

#### CMS Pages by ID (`/api/cms/pages/[id]`)
- **GET** `/api/cms/pages/[id]` - Public (published) + Admin (draft)
- **PATCH** `/api/cms/pages/[id]` - **SuperAdmin Only** ✅ JWT Protected
- **DELETE** `/api/cms/pages/[id]?id=X` - **SuperAdmin Only** ✅ JWT Protected

#### Audit Submissions (`/api/admin/audits/`)
- **GET** `/api/admin/audits` - **Admin+ Only** ✅ JWT Protected
- **PATCH** `/api/admin/audits` - **Admin+ Only** ✅ JWT Protected
- **DELETE** `/api/admin/audits?id=X` - **SuperAdmin Only** ✅ JWT Protected

---

## How to Use

### Getting a JWT Token
Use your admin login endpoint to get a token:
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"graham@greyinfotech.com.ng","password":"YourPassword"}'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "graham@greyinfotech.com.ng",
    "role": "superadmin"
  }
}
```

### Making Authenticated Requests

**Include the token in the Authorization header:**

```bash
# Create a CMS page (SuperAdmin only)
curl -X POST http://localhost:3000/api/cms/pages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "title": "About Us",
    "slug": "about",
    "content": "# About Our Company...",
    "published": false
  }'

# Update audit submission (Admin+ only)
curl -X PATCH http://localhost:3000/api/admin/audits \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "id": 42,
    "status": "reviewed",
    "adminNotes": "Initial assessment complete"
  }'
```

### Frontend Integration

In your React/Next.js client code:

```typescript
// Store token from login response
const token = localStorage.getItem('admin-token');

// Make authenticated API call
const response = await fetch('/api/cms/pages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    title: 'New Page',
    slug: 'new-page',
    content: '...',
    published: false,
  }),
});

if (!response.ok) {
  const error = await response.json();
  console.error('Auth failed:', error.error);
  // Redirect to login if 401
  if (response.status === 401) {
    window.location.href = '/admin/login';
  }
}
```

---

## Token Structure

JWT tokens are signed with `ADMIN_JWT_SECRET` and contain:

```typescript
{
  id: string;           // User ID from database
  email: string;        // User email
  name: string;         // User full name
  role: 'superadmin' | 'admin' | 'manager';  // User role
  iat: number;          // Issued at (Unix timestamp)
  exp: number;          // Expires at (7 days from issue)
}
```

---

## Role-Based Access

| Endpoint | SuperAdmin | Admin | Manager | Public |
|----------|-----------|-------|---------|--------|
| POST /api/cms/pages | ✅ | ❌ | ❌ | ❌ |
| PATCH /api/cms/pages | ✅ | ❌ | ❌ | ❌ |
| DELETE /api/cms/pages | ✅ | ❌ | ❌ | ❌ |
| GET /api/admin/audits | ✅ | ✅ | ❌ | ❌ |
| PATCH /api/admin/audits | ✅ | ✅ | ❌ | ❌ |
| DELETE /api/admin/audits | ✅ | ❌ | ❌ | ❌ |
| GET /pages/[slug] (published) | ✅ | ✅ | ✅ | ✅ |
| GET /pages/[slug] (draft) | ✅ | ✅ | ❌ | ❌ |

---

## Error Responses

### 401 Unauthorized (No token)
```json
{
  "error": "Unauthorized - no token"
}
```

### 403 Forbidden (Wrong role)
```json
{
  "error": "Unauthorized - super admin only"
}
```

### 404 Not Found
```json
{
  "error": "Page not found"
}
```

---

## Production Deployment

1. **Generate new JWT secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Set in cPanel Environment Variables:**
   - Go to cPanel > Node.js App Manager > Edit Variables
   - Add `ADMIN_JWT_SECRET=<your-generated-secret>`
   - Add `NEXT_PUBLIC_TAWK_PROPERTY_ID=6a1ba828a3242d1c2ed9db1d`
   - Add `NEXT_PUBLIC_TAWK_WIDGET_ID=1jpu0ho3p`

3. **Never commit secrets to Git:**
   - `.env` and `.env.local` are in `.gitignore`
   - Only `.env.example` is committed (with placeholder values)

---

## Implementation Details

### Auth Check Pattern
All protected endpoints use this pattern:

```typescript
// Verify token from Authorization header
const authHeader = req.headers.get('authorization');
if (!authHeader?.startsWith('Bearer ')) {
  return NextResponse.json({ error: 'Unauthorized - no token' }, { status: 401 });
}

// Extract and verify token
const token = authHeader.slice(7);
const user = verifyAdminToken(token);

// Check role
if (!user || user.role !== 'superadmin') {
  return NextResponse.json({ error: 'Unauthorized - super admin only' }, { status: 403 });
}
```

### Key Functions
- `verifyAdminToken(token)` - Validates JWT, returns user or null
- `generateAdminToken(user)` - Creates a new JWT for a user
- Located in `lib/admin/auth.ts`

---

## Testing

### Local Testing
1. Start dev server: `npm run dev`
2. Login to `/admin` dashboard
3. Check browser localStorage for `admin-token`
4. Copy token and test endpoints with curl/Postman

### cPanel Testing
After deployment:
1. SSH into server
2. Test with curl (token from admin login API)
3. Monitor logs: `tail -f /home/greyinf1/logs/error_log`

---

## Troubleshooting

**"Unauthorized - no token"**
- Make sure Authorization header is included
- Format must be: `Authorization: Bearer <token>`
- Not: `Authorization: <token>`

**"Unauthorized - super admin only"**
- Your user role isn't sufficient for this endpoint
- Contact superadmin to upgrade your role
- Or use superadmin credentials

**"Invalid or expired token"**
- Token has expired (7 days max)
- Login again to get a fresh token
- Token may be corrupted if stored incorrectly

**CORS errors in browser**
- Ensure origin is in allowed list (if CORS middleware is used)
- Check `headers: { ... }` includes all required fields

---

## Security Notes

✅ **What's Protected:**
- All CMS management operations (create/update/delete)
- All audit operations
- Admin/superadmin endpoints only

✅ **Best Practices Implemented:**
- Tokens expire in 7 days
- Role-based access control (3-tier system)
- Bearer token scheme (industry standard)
- Tokens verified server-side every request

⚠️ **Remember:**
- HTTPS in production (never send tokens over HTTP)
- Change `ADMIN_JWT_SECRET` in production
- Don't expose tokens in logs/error messages
- Rotate tokens periodically

---

Last updated: 2026-08-30 13:23:18
Commit: `ddfe1100`
