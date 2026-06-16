# cPanel/Passenger Deploy Fix — Task

## Critical Issues Found

### 1. CUSTOMER_SESSION_SECRET throws in production (FATAL)
`lib/customerAuth.ts` line ~14: `resolveSecret()` throws hard in NODE_ENV=production if SECRET is missing.
This kills the entire Next.js server worker because it runs at module-load time.
Fix: Use same self-healing auto-secret pattern as `requireSessionSecret()` in security.ts.

### 2. server.js spawns tsx as child - Passenger may see 0 port binding
Passenger waits for the app to bind a port. When server.js spawns a child process (tsx server.ts),
Passenger sees the PARENT process (server.js) which never binds a port.
Fix: Use tsx register hook instead of child_process.spawn, OR ensure Passenger environment is
configured to detect via PASSENGER_SOCKET or port forwarding. 
Actually current approach has worked per memory notes. Leave spawn approach but add port-forwarding
keepalive so Passenger doesn't kill parent thinking it crashed.

### 3. next.config.js - `formats` key conflicts with `unoptimized: true`
When unoptimized:true, the formats array is ignored but may trigger warnings. Remove it.

### 4. server.ts uses `app.all('/{*splat}')` — Next 16 wildcard syntax
This is correct for Next 16 / Express 5. OK.

### 5. Missing .htaccess for cPanel
cPanel needs .htaccess to proxy correctly to Node app.

### 6. config.env.example - CUSTOMER_SESSION_SECRET is optional but throws
The customerAuth resolveSecret needs to gracefully fall back.

### 7. PORT env var - cPanel Passenger sets its own port via socket
Need to handle PASSENGER_SOCKET or UNIX socket correctly.

### 8. EJS views - check for any missing partials or view rendering crashes
Already confirmed admin routes work locally.

## Fixes Plan
1. Fix customerAuth.ts — no-throw secret resolution
2. Fix next.config.js — remove conflicting formats
3. Improve server.js — add passenger detection, socket support
4. Add/verify .htaccess
5. Verify config.env.example has all needed vars
6. Double-check all API routes for top-level throws

## Status
- [ ] customerAuth.ts fix
- [ ] next.config.js fix  
- [ ] server.js improvements
- [ ] .htaccess
- [ ] Push to GitHub
