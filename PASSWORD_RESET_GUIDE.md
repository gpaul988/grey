# Password Reset System — Complete Guide

## Overview

Production-ready password reset flow using database tokens, Resend email, and secure expiry management.

---

## System Architecture

### Components

1. **Database Layer** (`lib/db/store-helpers.ts`)
   - `createPasswordResetToken()` — Generate & store reset token
   - `validatePasswordResetToken()` — Verify token & check expiry
   - `resetStoreCustomerPassword()` — Hash & update password
   - `markTokenAsUsed()` — Prevent token reuse
   - `cleanupExpiredResetTokens()` — Maintenance function

2. **Database Table** (`store_password_reset_tokens`)
   - Stores reset tokens with expiry and usage tracking
   - Prevents token reuse via `used` flag
   - Automatic cleanup via TTL/indexed queries

3. **API Endpoints**
   - `POST /api/store/auth/forgot-password` — Request password reset
   - `POST /api/store/auth/reset-password` — Complete password reset
   - `GET /api/store/auth/reset-password?token=XXX` — Validate token

4. **Email Service** (Resend)
   - Generates HTML email with reset link
   - Falls back to console logging in dev (no API key)

---

## API Reference

### 1. Request Password Reset

**POST** `/api/store/auth/forgot-password`

#### Request Body
```json
{
  "email": "user@example.com"
}
```

#### Response (Success)
```json
{
  "message": "If an account with this email exists, a password reset link has been sent"
}
```

#### Notes
- Always returns 200 (security: don't leak email list)
- Token generated in database with 1-hour expiry
- Email sent via Resend (if configured) or logged in dev

#### Example cURL
```bash
curl -X POST http://localhost:3000/api/store/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"derek@greyinfotech.com"}'
```

---

### 2. Validate Reset Token

**GET** `/api/store/auth/reset-password?token={token}`

#### Response (Valid Token)
```json
{
  "valid": true,
  "email": "d***@greyinfotech.com"
}
```

#### Response (Invalid/Expired)
```json
{
  "error": "Invalid or expired reset token"
}
Status: 401
```

#### Notes
- Call this before showing the reset form
- Validates token hasn't expired or been used
- Returns masked email for UX confirmation

#### Example cURL
```bash
curl -X GET "http://localhost:3000/api/store/auth/reset-password?token=abc123def456"
```

---

### 3. Reset Password

**POST** `/api/store/auth/reset-password`

#### Request Body
```json
{
  "token": "abc123def456",
  "password": "NewSecurePassword123!"
}
```

#### Response (Success)
```json
{
  "message": "Password reset successfully. You can now log in with your new password."
}
```

#### Response (Invalid Token)
```json
{
  "error": "Invalid or expired reset token"
}
Status: 401
```

#### Response (Weak Password)
```json
{
  "error": "Password must be at least 8 characters"
}
Status: 400
```

#### Notes
- Password must be 8+ characters
- Token is marked as used after successful reset
- Expired tokens are rejected
- Password hashed with bcrypt (10 rounds)

#### Example cURL
```bash
curl -X POST http://localhost:3000/api/store/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "abc123def456",
    "password": "MyNewPassword123"
  }'
```

---

## Database Schema

### `store_password_reset_tokens` Table

```sql
CREATE TABLE "store_password_reset_tokens" (
  "id" serial PRIMARY KEY,
  "customer_id" integer NOT NULL,
  "email" text NOT NULL,
  "token" text NOT NULL UNIQUE,
  "expires_at" timestamp NOT NULL,
  "used" boolean DEFAULT false,
  "used_at" timestamp,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "idx_store_password_reset_tokens_token" ON "store_password_reset_tokens" ("token");
CREATE INDEX "idx_store_password_reset_tokens_customer_id" ON "store_password_reset_tokens" ("customer_id");
CREATE INDEX "idx_store_password_reset_tokens_email" ON "store_password_reset_tokens" ("email");
CREATE INDEX "idx_store_password_reset_tokens_expires_at" ON "store_password_reset_tokens" ("expires_at");
```

---

## Frontend Implementation Example

### Reset Request Form

```tsx
// pages/store/account/forgot-password.tsx

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/store/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setEmail('');
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      {message && <div className="bg-green-100 p-3 rounded mb-4">{message}</div>}
      {error && <div className="bg-red-100 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
}
```

### Reset Password Form

```tsx
// pages/store/account/reset-password.tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Validate token on page load
  useEffect(() => {
    if (!token) return;

    const validateToken = async () => {
      try {
        const res = await fetch(`/api/store/auth/reset-password?token=${token}`);
        if (res.ok) {
          setTokenValid(true);
        } else {
          setError('Invalid or expired reset link');
        }
      } catch (err) {
        setError('Failed to validate reset link');
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/store/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        // Redirect to login after 2 seconds
        setTimeout(() => router.push('/store/account/login'), 2000);
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (validating) return <div>Validating reset link...</div>;
  if (!tokenValid) {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="bg-red-100 p-3 rounded">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      {message && <div className="bg-green-100 p-3 rounded mb-4">{message}</div>}
      {error && <div className="bg-red-100 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}
```

---

## Environment Variables

### Required (for email sending)

```env
# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@greyinfotech.com

# App URL (for reset links)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Optional
- Without `RESEND_API_KEY`, reset links are logged to console (dev mode)
- `NEXT_PUBLIC_APP_URL` defaults to current request origin if not set

---

## Security Features

✅ **Token-based reset** — One-time use tokens stored in database
✅ **Expiry enforcement** — Tokens expire after 1 hour
✅ **Token reuse prevention** — `used` flag prevents replay attacks
✅ **Email obfuscation** — Don't leak email existence
✅ **Bcrypt hashing** — Passwords hashed with 10 rounds
✅ **SQL injection prevention** — Parameterized queries via Drizzle ORM
✅ **Email validation** — Regex validation + Resend error handling
✅ **Rate limiting ready** — Easy to add on API endpoints
✅ **Audit logging** — Console logs for all password reset events

---

## Maintenance Tasks

### Clean up expired tokens (optional)

```typescript
// Run periodically (e.g., via cron job)
import { cleanupExpiredResetTokens } from '@/lib/db/store-helpers';

await cleanupExpiredResetTokens();
```

### Monitor password reset activity

Check console/logs for:
- `[Password Reset] Token created for {email}`
- `[Password Reset] Email sent to {email}`
- `[Password Reset] Successfully reset for {email}`

---

## Testing

### 1. Local Development Flow

```bash
# 1. Request reset
curl -X POST http://localhost:3000/api/store/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Check console for reset link (dev mode)
# Output: Reset Link: http://localhost:3000/store/reset-password?token=abc123...

# 2. Validate token
curl "http://localhost:3000/api/store/auth/reset-password?token=abc123..."

# 3. Reset password
curl -X POST http://localhost:3000/api/store/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"abc123...","password":"NewPassword123"}'

# 4. Try login with new password
curl -X POST http://localhost:3000/api/store/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"NewPassword123"}'
```

### 2. Production with Resend

1. Add `RESEND_API_KEY` to `.env.local` or production env
2. Set `RESEND_FROM_EMAIL` to valid sender email
3. Users receive actual emails with reset links
4. Same flow as above, but with real email notifications

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Build fails with "Missing API key" | Resend not configured | Add env var or leave blank (uses dev mode) |
| Reset link doesn't work | Token expired | Tokens expire after 1 hour |
| Token invalid after reset | Used token | Tokens are marked as used; request new one |
| Email not received | Resend not configured | Check `RESEND_API_KEY` in production |
| Password update fails | DB error | Check database connection & migration applied |

---

## Next Steps

1. ✅ **Completed**
   - Database schema & migration
   - Token generation & validation
   - Password hashing with bcrypt
   - Email template (Resend ready)
   - API endpoints (GET validate, POST forgot, POST reset)

2. **To Do (Frontend)**
   - Add forgot-password page
   - Add reset-password page
   - Add form validation & error handling
   - Style components per Grey design

3. **To Do (Optional)**
   - Rate limiting on auth endpoints
   - Email confirmation flow
   - Admin dashboard for password reset audits
   - SMS OTP as 2FA option

---

## Summary

The password reset system is **production-ready** with:
- ✅ Secure token-based flow
- ✅ Database persistence & expiry
- ✅ Bcrypt password hashing
- ✅ Resend email integration (fallback to console in dev)
- ✅ Comprehensive error handling
- ✅ Security best practices

**Last updated:** June 26, 2026
**Status:** ✅ Ready for frontend integration
