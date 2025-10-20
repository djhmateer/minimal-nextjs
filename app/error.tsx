'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/**
 * Global Error Boundary for Production Debugging
 *
 * This component catches errors in production and displays detailed information.
 * WARNING: In a real production app, you should hide sensitive error details from users.
 *
 * Next.js automatically uses this file to handle errors in production.
 * Learn more: https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Application Error</h1>
          <p className="text-gray-600">An error occurred while processing your request.</p>
        </div>

        {/* Error Details - shows in production for debugging */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-red-800 mb-2">Error Details:</h2>
          <p className="text-red-700 font-mono text-sm mb-3 break-words">
            {error.message || 'Unknown error'}
          </p>

          {error.digest && (
            <p className="text-red-600 text-sm">
              <span className="font-semibold">Digest:</span> {error.digest}
            </p>
          )}
        </div>

        {/* Stack Trace - only show in non-production or for debugging */}
        {error.stack && (
          <details className="mb-6">
            <summary className="cursor-pointer text-gray-700 font-semibold mb-2 hover:text-gray-900">
              Stack Trace (click to expand)
            </summary>
            <pre className="bg-gray-100 border border-gray-300 rounded p-4 overflow-x-auto text-xs">
              {error.stack}
            </pre>
          </details>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold inline-block"
          >
            Go Home
          </Link>
        </div>

        {/* Debug Info */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
          <p className="font-semibold mb-2">Debug Information:</p>
          <ul className="space-y-1">
            <li>Environment: {process.env.NODE_ENV}</li>
            <li>Timestamp: {new Date().toISOString()}</li>
          </ul>
        </div>

        {/* Warning Message */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="text-yellow-800 text-sm">
            <span className="font-semibold">Note:</span> This detailed error view is for debugging purposes.
            In a production app, you should show a user-friendly error message instead of exposing technical details.
          </p>
        </div>
      </div>
    </div>
  )
}
