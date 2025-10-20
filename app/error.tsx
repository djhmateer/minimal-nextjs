'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/**
 * Global Error Boundary - Client Component (required by Next.js)
 *
 * Shows full error details in production for debugging.
 * WARNING: Remove sensitive details before deploying to real production.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error details to browser console
    console.error('Error:', error)
    console.error('Stack:', error.stack)
    console.error('Digest:', error.digest)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Application Error</h1>

        {/* Error Message */}
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
          <p className="font-semibold text-red-800 mb-2">Error Message:</p>
          <p className="text-red-700 font-mono text-sm break-words">
            {error.message || 'Unknown error'}
          </p>
          {error.digest && (
            <p className="text-red-600 text-sm mt-2">
              Digest: {error.digest}
            </p>
          )}
        </div>

        {/* Stack Trace */}
        {error.stack && (
          <details className="mb-6">
            <summary className="cursor-pointer font-semibold mb-2">Stack Trace</summary>
            <pre className="bg-gray-100 border rounded p-4 overflow-x-auto text-xs">
              {error.stack}
            </pre>
          </details>
        )}

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold inline-block"
          >
            Go Home
          </Link>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-sm">
          <p className="font-semibold mb-2">Next.js 15 hides error messages in production.</p>
          <p className="mb-2">To see the real error:</p>
          <ol className="list-decimal ml-4 space-y-1">
            <li>Check server logs where you ran <code className="bg-yellow-100 px-1">pnpm start</code></li>
            <li>Search for digest: <code className="bg-yellow-100 px-1">{error.digest || 'N/A'}</code></li>
            <li>Check browser console (F12) for additional details</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
