import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const start = Date.now()

  const response = NextResponse.next()

  console.log(`${new Date().toISOString()} - ${request.method} ${request.nextUrl.pathname}`)

  return response
}

// defines which paths will invoke the middleware
//   - /(...) - Match paths starting with /
//   - (?!_next/static|_next/image|favicon.ico) - Negative lookahead: Don't match these patterns
// also svgs
//   - .* - Match everything else
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)',
}