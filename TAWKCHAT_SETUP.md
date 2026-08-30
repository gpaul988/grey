# TawkChat Integration Setup Guide

## Overview
TawkChat is now configurable via environment variables, supporting different configurations for local development and production (cPanel) deployment.

## Configuration

### Environment Variables

Add to `.env.local` (development):
```env
NEXT_PUBLIC_TAWK_PROPERTY_ID=6a1ba828a3242d1c2ed9db1d
NEXT_PUBLIC_TAWK_WIDGET_ID=1jpu0ho3p
```

Add to cPanel (production):
1. Go to cPanel > Node.js App Manager > Edit Variables
2. Add the same variables with your production Tawk IDs

**Note:** These are `NEXT_PUBLIC_*` so they're visible in client code (intentional for Tawk script loading).

---

## How It Works

### Component: `components/TawkChat.tsx`
- Loads Tawk embed script dynamically
- Suppresses known Tawk console noise (i18next warnings, internal errors)
- Offsets position to avoid overlap with VoiceCommander FAB
- Only renders if both env vars are set

### Integration: `app/layout.tsx`
```jsx
{process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID && process.env.NEXT_PUBLIC_TAWK_WIDGET_ID && (
    <TawkChat 
        propertyId={process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}
        widgetId={process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}
    />
)}
```

---

## Setup Instructions

### Local Development

1. **Copy `.env.example` to `.env.local`:**
   ```bash
   cp .env.example .env.local
   ```

2. **Verify TawkChat values** (should be pre-filled):
   ```env
   NEXT_PUBLIC_TAWK_PROPERTY_ID=6a1ba828a3242d1c2ed9db1d
   NEXT_PUBLIC_TAWK_WIDGET_ID=1jpu0ho3p
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   ```

4. **Test in browser:**
   - Visit http://localhost:3000
   - Look for TawkChat widget in bottom-right corner
   - Chat should load and be functional

---

### Production Deployment (cPanel)

1. **Get your Tawk IDs:**
   - Log in to https://www.tawk.to/dashboard
   - Go to Settings > Channels > Chat
   - Copy the embed code URL: `https://embed.tawk.to/{PROPERTY_ID}/{WIDGET_ID}`
   - Extract both parts

2. **Set in cPanel:**
   - SSH into server: `ssh greyinf1@server1`
   - OR use cPanel Node.js App Manager > Edit Variables
   - Add:
     ```
     NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
     NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id
     ```
   - Save/Restart app

3. **Verify:**
   - Visit https://your-domain.com
   - Check browser console (Cmd+Opt+J on Mac, F12 on Windows)
   - Look for TawkChat widget
   - Test sending a message

---

## Troubleshooting

### Widget not showing?

**Check 1: Environment variables set?**
```bash
# In your shell or cPanel
echo $NEXT_PUBLIC_TAWK_PROPERTY_ID
echo $NEXT_PUBLIC_TAWK_WIDGET_ID
```
Both should output non-empty values.

**Check 2: Syntax error in IDs?**
- Property ID: Should be 24 alphanumeric characters (e.g., `6a1ba828a3242d1c2ed9db1d`)
- Widget ID: Should be 10 characters (e.g., `1jpu0ho3p`)
- No spaces, no extra characters

**Check 3: Browser console errors?**
```javascript
// Open browser DevTools (F12)
// Look for:
// - "Failed to load resource: https://embed.tawk.to/..."
// - CORS errors
// - CSP violations
```

**Check 4: Tawk service status?**
- Visit https://status.tawk.to
- Ensure service is operational
- Try in incognito/private mode (cache clear)

### Console shows i18next warnings?

This is expected and suppressed in `TawkChat.tsx`. Tawk's internal scripts trigger these.
- ✅ Normal - warnings are caught and ignored
- ✅ Won't break functionality
- If multiple warnings: Check `.env` values are correct

### Widget position wrong?

Default bottom offset is 80px (to avoid VoiceCommander FAB).

Customize in `app/layout.tsx`:
```jsx
<TawkChat 
    propertyId={process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}
    widgetId={process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}
    offsetPx={120}  // Increase to push higher
/>
```

---

## Different Environments

### Multiple Tawk Accounts
If you want different chat for dev vs production:

**Local (`.env.local`):**
```env
NEXT_PUBLIC_TAWK_PROPERTY_ID=6a1ba828a3242d1c2ed9db1d  # Dev account
NEXT_PUBLIC_TAWK_WIDGET_ID=1jpu0ho3p
```

**cPanel (via Node.js App Manager):**
```env
NEXT_PUBLIC_TAWK_PROPERTY_ID=abcdefghij1234567890ab  # Prod account
NEXT_PUBLIC_TAWK_WIDGET_ID=a1b2c3d4e5
```

Each environment loads its own config automatically.

---

## Security Notes

✅ **NEXT_PUBLIC prefix is safe** - These variables are meant to be visible in client code (Tawk needs them in the browser)

⚠️ **Don't put secrets here** - API keys, JWT secrets, etc. should NOT be prefixed with `NEXT_PUBLIC_`

---

## Testing Checklist

- [ ] Chat widget visible in bottom-right
- [ ] Can type and send test message
- [ ] Offline mode works (shows "offline message" if no agents online)
- [ ] No "Failed to load" errors in console
- [ ] Works on mobile (responsive)
- [ ] Doesn't overlap with other UI elements
- [ ] Dark/Light mode compatible

---

## API Reference

### TawkChat Component Props
```typescript
type TawkChatProps = {
    propertyId: string;      // Tawk Property ID (24 chars)
    widgetId: string;         // Tawk Widget ID (10 chars)
    offsetPx?: number;        // Bottom offset in pixels (default: 80)
};
```

### Window API (from Tawk)
```typescript
window.Tawk_API?.onLoad?.()                    // Called when Tawk loads
window.Tawk_API?.setAttributes?.(attrs)        // Set visitor attributes
window.Tawk_API?.maximize?.()                  // Open chat window
window.Tawk_LoadStart                          // Load start timestamp
```

---

## Resources

- Tawk Dashboard: https://www.tawk.to/dashboard
- Tawk Docs: https://docs.tawk.to
- Status Page: https://status.tawk.to
- Support: support@tawk.to

---

Last updated: 2026-08-30 13:23:18
Component: `components/TawkChat.tsx`
Config: `.env.example` + cPanel Environment Variables
