# Admin Login Issue - Debugging

## Problem
- User cannot login to Admin Dashboard (/admin/login)
- Credentials: graham@greyinfotech.com.ng / 1Uriel2Sobiribo3, (with comma)
- Root cause: NO ADMIN USERS in the admin database

## Database Status
- ✅ Tables exist (users table exists)
- ❌ Zero users in users table
- Database path: /home/user/grey/Admin/data/grey.db

## Attempted Fixes
1. ❌ npx tsx scripts/create_admin.ts — ran but no error, no users created
   - Likely silent error due to bcryptjs or db initialization

## What the Script Does (create_admin.ts)
- Deletes existing user with that email
- Hashes password with bcrypt (12 rounds)
- Inserts into users table

## Next Steps
1. Run bootstrap-db.js which should:
   - Initialize the admin database properly
   - Seed initial admin users
2. If that fails, manually create user with node script that logs errors

## Important Notes
- The login form route is at /admin/login
- Auth handler: /Admin/routes/auth.ts
- Password checking uses bcryptjs.compare()
- User must be: email_verified=1, status='active', email set
