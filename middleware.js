import { NextResponse } from 'next/server'

export function middleware(request) {
  const start = Date.now()

  const response = NextResponse.next()
  const duration = Date.now() - start

  console.log(`${new Date().toISOString()} - ${request.method} ${request.nextUrl.pathname} - ${duration}ms`)

  response.headers.set('x-response-time', `${duration}ms`)

  return response
}

// defines which paths will invoke the middleware
//   - /(...) - Match paths starting with /
//   - (?!_next/static|_next/image|favicon.ico) - Negative lookahead: Don't match these patterns
//   - .* - Match everything else
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)',
}