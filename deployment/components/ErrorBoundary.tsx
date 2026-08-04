'use client';

/**
 * React Error Boundary
 * Catches unhandled errors in component tree and logs to Sentry
 * Falls back to error UI instead of white screen
 */

import React, { ReactNode, ReactElement } from 'react';
import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactElement;
}

interface State {
  hasError: boolean;
  error?: Error;
  eventId?: string;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to Sentry
    const eventId = Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });

    this.setState({ eventId });

    // Also log locally
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Something went wrong
                </h1>
                <p className="text-gray-600 mb-6">
                  We&apos;ve been notified and are working on a fix. Please try again
                  later.
                </p>

                {this.state.eventId && (
                  <p className="text-sm text-gray-500 mb-4">
                    Error ID: {this.state.eventId}
                  </p>
                )}

                {this.state.error && process.env.NODE_ENV === 'development' && (
                  <details className="text-left mb-6">
                    <summary className="cursor-pointer text-sm font-mono text-red-600 hover:text-red-700">
                      Error details (dev only)
                    </summary>
                    <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-48 text-gray-700">
                      {this.state.error.toString()}
                      {'\n\n'}
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}

                <div className="space-y-2">
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    Reload Page
                  </button>
                  <Link
                    href="/"
                    className="block w-full bg-gray-100 text-gray-900 py-2 rounded-lg hover:bg-gray-200 transition text-center"
                  >
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
