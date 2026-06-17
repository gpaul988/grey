/**
 * Sentry Edge Runtime Instrumentation
 * 
 * Initializes Sentry for Next.js middleware and edge functions
 * Captures errors that occur at the CDN/edge layer (Vercel, Cloudflare, etc.)
 * 
 * Note: This file is optional if not using edge middleware
 * But recommended for production deployments
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  // Get DSN from environment
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Release tracking
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',

  // Tracing for edge functions (lower sample rate due to high volume)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 1.0,

  // Set initial scope
  initialScope: {
    tags: {
      server: 'edge',
      environment: process.env.NODE_ENV,
    },
  },

  // Debug in development
  debug: process.env.NODE_ENV === 'development',
});
