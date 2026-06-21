#!/bin/bash

# Find all TypeScript errors that would block Next.js build

echo "=== Scanning for Build-Blocking Errors ==="
echo ""

echo "1. Missing imports (Red flag):"
grep -rn "from.*['\"]@/.*['\"]" --include="*.ts" --include="*.tsx" | grep -E "lib/(db|admin)" | head -5

echo ""
echo "2. Unresolved types:"
grep -rn "type.*=.*never\|interface.*extends.*never" --include="*.ts" --include="*.tsx" | head -5

echo ""
echo "3. Missing exports in critical files:"
grep -n "^export" lib/db.ts lib/db/schema.ts lib/admin/auth.ts 2>/dev/null | head -20

echo ""
echo "4. Checking drizzle-orm imports:"
grep -rn "from 'drizzle-orm" --include="*.ts" | head -10

echo ""
echo "5. Blob/Buffer related issues:"
grep -rn "Blob\|ArrayBuffer\|Uint8Array" --include="*.ts" --include="*.tsx" | wc -l

echo ""
echo "Done!"
