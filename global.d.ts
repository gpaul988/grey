// Temporary declaration to satisfy TypeScript for the jsdom package
// Prefer installing @types/jsdom; this file silences TS7016 when types are missing

declare module 'jsdom';

// Fix for stray relative imports that reference useIsDayTime incorrectly
// Some legacy/backup files import '../../components/useIsDayTime' which
// fails type resolution in the monorepo. Provide a minimal ambient
// declaration so the typechecker doesn't error during builds.

declare module '../../components/useIsDayTime' {
  export function useIsDayTime(): boolean;
}

declare module '@/components/useIsDayTime' {
  export function useIsDayTime(): boolean;
}
