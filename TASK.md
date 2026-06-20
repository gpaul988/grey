# TASK: Remove all i18n from Grey Repo

## Progress: ~40% Complete

### ✅ DONE
1. ✅ app/layout.tsx - Removed I18nProvider wrapper + import
2. ✅ components/Header.tsx - Removed useI18n(), replaced t() with English strings

### 🟡 IN PROGRESS / TODO
1. screens/Home.tsx - Remove useI18n() + t() calls
2. Delete i18n library files:
   - components/i18nProvider.tsx
   - lib/i18n-context.tsx
   - lib/i18n.ts
   - lib/languages.ts
   - scripts/generate-i18n-types.ts
3. Delete /public/locales/ (79 language JSON files)
4. Remove i18n scripts from package.json
5. Test: `npm run dev` (should have 0 errors)
6. Commit & push

### Current Files Modified
- app/layout.tsx ✅
- components/Header.tsx ✅

### Next Immediate Action
1. Check Home.tsx for i18n usage
2. Run `npm run dev` to test
3. If no errors, proceed with file deletion
