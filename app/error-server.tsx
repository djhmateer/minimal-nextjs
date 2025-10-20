/**
 * Server-Side Error Display Component
 *
 * This is a Server Component that can be used to display errors server-side.
 * Unlike error.tsx (Client Component), this doesn't have interactive features,
 * but shows full error details during server rendering.
 *
 * Usage: Import and use this in your server components for error display
 */

import Link from 'next/link'

export default function ServerError({ error }: { error: Error & { digest?: string } }) {
  // Extract error details
  const errorWithCause = error as Error & { cause?: Error }

  // Try to find real error in cause chain
  let realError: string | null = null
  let currentError: Error | undefined = error
  while (currentError) {
    if (currentError.message && !currentError.message.includes('Server Components render')) {
      realError = currentError.message
      break
    }
    currentError = (currentError as Error & { cause?: Error }).cause
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Server Error</h1>
          <p className="text-gray-600">An error occurred while rendering this page on the server.</p>
        </div>

        {/* Error Details */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-red-800 mb-2">Error Details:</h2>

          {/* Show sanitized Next.js error */}
          <div className="mb-3">
            <p className="text-xs text-red-600 mb-1 font-semibold">Next.js Error (sanitized):</p>
            <p className="text-red-700 font-mono text-sm break-words">
              {error.message || 'Unknown error'}
            </p>
          </div>

          {/* Show real underlying error if found */}
          {realError && (
            <div className="mb-3">
              <p className="text-xs text-red-600 mb-1 font-semibold">Real Error (from cause chain):</p>
              <p className="text-red-900 font-mono text-sm break-words font-bold">
                {realError}
              </p>
            </div>
          )}

          {error.digest && (
            <p className="text-red-600 text-sm">
              <span className="font-semibold">Digest:</span> {error.digest}
              <br />
              <span className="text-xs text-red-500">Check server logs for this digest to see the full error</span>
            </p>
          )}
        </div>

        {/* Stack Trace */}
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

        {/* Action Button - Server-side, no reset functionality */}
        <div className="mb-6">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-block"
          >
            Go Home
          </Link>
        </div>

        {/* Debug Info */}
        <div className="pt-6 border-t border-gray-200 text-sm text-gray-600">
          <p className="font-semibold mb-2">Debug Information:</p>
          <ul className="space-y-1">
            <li>Environment: {process.env.NODE_ENV}</li>
            <li>Rendered: Server-side</li>
            <li>Timestamp: {new Date().toISOString()}</li>
            {error.digest && (
              <li className="text-red-600 font-semibold">
                Server Log Search: Look for digest &quot;{error.digest}&quot; in your production server logs
              </li>
            )}
          </ul>
        </div>

        {/* Warning Message */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="text-yellow-800 text-sm mb-3">
            <span className="font-semibold">Note:</span> This is a Server Component error display for debugging.
            In production, you should show user-friendly error messages instead of exposing technical details.
          </p>
          <p className="text-yellow-800 text-sm">
            <span className="font-semibold">Production Error Debugging:</span> Next.js 15 hides real error messages
            in production for security. To see the actual error:
          </p>
          <ol className="list-decimal ml-4 mt-2 text-yellow-800 text-sm space-y-1">
            <li>Check your server console where you ran <code className="bg-yellow-100 px-1">pnpm start</code></li>
            <li>Search for the digest number: <code className="bg-yellow-100 px-1">{error.digest || 'N/A'}</code></li>
            <li>The full error with stack trace will be in those logs</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
