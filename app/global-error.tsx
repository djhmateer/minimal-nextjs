'use client'

import { useEffect } from 'react'

/**
 * Global Error Boundary for Root Layout - Client Component (required by Next.js)
 *
 * Catches errors in root layout. Must include <html> and <body> tags.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
    console.error('Digest:', error.digest)
  }, [error])

  return (
    <html>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          padding: '1rem'
        }}>
          <div style={{
            maxWidth: '48rem',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            padding: '2rem'
          }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '1rem' }}>
              Critical Error
            </h1>

            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Error:</p>
              <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', wordBreak: 'break-word' }}>
                {error.message || 'Unknown error'}
              </p>
              {error.digest && (
                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                  Digest: {error.digest}
                </p>
              )}
            </div>

            {error.stack && (
              <details style={{ marginBottom: '1.5rem' }}>
                <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Stack Trace
                </summary>
                <pre style={{
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  padding: '1rem',
                  overflowX: 'auto',
                  fontSize: '0.75rem'
                }}>
                  {error.stack}
                </pre>
              </details>
            )}

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
                  fontWeight: '600'
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
                  display: 'inline-block'
                }}
              >
                Go Home
              </a>
            </div>

            <div style={{
              backgroundColor: '#fefce8',
              border: '1px solid #fde047',
              borderRadius: '0.25rem',
              padding: '1rem',
              fontSize: '0.875rem'
            }}>
              <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>To see the real error:</p>
              <ol style={{ marginLeft: '1rem' }}>
                <li>Check server logs for digest: {error.digest || 'N/A'}</li>
                <li>Check browser console (F12)</li>
              </ol>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
