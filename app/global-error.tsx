'use client'

import { useEffect } from 'react'

/**
 * Global Error Boundary for Root Layout Errors
 *
 * This catches errors in the root layout that error.tsx cannot catch.
 * Must include its own <html> and <body> tags.
 *
 * Learn more: https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Global application error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          padding: '1rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '48rem',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            padding: '2rem'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h1 style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                color: '#dc2626',
                marginBottom: '0.5rem'
              }}>
                Critical Application Error
              </h1>
              <p style={{ color: '#6b7280' }}>
                A critical error occurred in the application root.
              </p>
            </div>

            {/* Error Details */}
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontWeight: '600', color: '#991b1b', marginBottom: '0.5rem' }}>
                Error Details:
              </h2>
              <p style={{
                color: '#b91c1c',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                marginBottom: '0.75rem',
                wordBreak: 'break-word'
              }}>
                {error.message || 'Unknown error'}
              </p>

              {error.digest && (
                <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: '600' }}>Digest:</span> {error.digest}
                </p>
              )}
            </div>

            {/* Stack Trace */}
            {error.stack && (
              <details style={{ marginBottom: '1.5rem' }}>
                <summary style={{
                  cursor: 'pointer',
                  color: '#374151',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  Stack Trace (click to expand)
                </summary>
                <pre style={{
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  padding: '1rem',
                  overflowX: 'auto',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace'
                }}>
                  {error.stack}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button
                onClick={reset}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}
              >
                Try Again
              </button>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/"
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#e5e7eb',
                  color: '#1f2937',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1rem',
                  display: 'inline-block'
                }}
              >
                Go Home
              </a>
            </div>

            {/* Debug Info */}
            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e5e7eb',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Debug Information:</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>Environment: {process.env.NODE_ENV}</li>
                <li>Timestamp: {new Date().toISOString()}</li>
              </ul>
            </div>

            {/* Warning Message */}
            <div style={{
              marginTop: '1.5rem',
              backgroundColor: '#fefce8',
              border: '1px solid #fde047',
              borderRadius: '0.25rem',
              padding: '1rem'
            }}>
              <p style={{ color: '#854d0e', fontSize: '0.875rem' }}>
                <span style={{ fontWeight: '600' }}>Note:</span> This detailed error view is for debugging purposes.
                In production, you should show a user-friendly error message instead of exposing technical details.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
