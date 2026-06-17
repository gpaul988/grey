/**
 * Sentry Server-Side Instrumentation
 * 
 * Initializes Sentry on the server side for Next.js 16
 * Captures server errors, exceptions, and performance metrics
 * 
 * Auto-integration with Next.js middleware, API routes, and server actions
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  // Get DSN from environment (must be public-facing for browser errors)
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment (development, staging, production)
  environment: process.env.NODE_ENV || 'development',

  // Release tracking (tied to git commit hash for source maps)
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',

  // Enable tracing for performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Profile sampling rate (1.0 = 100% of traced transactions)
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Capture replays on 10% of sessions in production, 100% in dev
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Capture replays on 100% of error sessions
  replaysOnErrorSampleRate: 1.0,

  // Set initial scope (request context, user info, tags)
  initialScope: {
    tags: {
      server: 'nextjs',
      environment: process.env.NODE_ENV,
    },
  },

  // Automatically capture performance metrics for:
  // - Next.js server rendering
  // - Database queries
  // - External HTTP requests
  // (Sentry Next.js SDK auto-enables integrations)

  // Ignore known harmless errors
  beforeSend(event, hint) {
    // Filter out client-side navigation errors
    if (
      event.exception &&
      String(hint.originalException).includes('NetworkError')
    ) {
      return null;
    }

    // Ignore 404 client-side route errors (normal SPA navigation)
    if (
      event.exception &&
      String(hint.originalException).includes('404')
    ) {
      return null;
    }

    return event;
  },

  // Debug in development
  debug: process.env.NODE_ENV === 'development',
});
