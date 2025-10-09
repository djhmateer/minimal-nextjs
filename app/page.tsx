/**
 * Home Page - Static Site Generation (SSG) Demo
 *
 * This is a Server Component that demonstrates Static Site Generation:
 * - No 'use client' directive = Server Component (default in App Router)
 * - export const dynamic = 'force-static' = Build-time rendering
 * - Not async = No dynamic data fetching
 * - Generates static HTML at build time
 *
 * LIFECYCLE:
 * 1. Build Time: Component runs ONCE during `pnpm build`
 * 2. console.log appears in build output (not runtime logs)
 * 3. HTML is generated and cached
 * 4. All requests serve the same cached HTML (fast!)
 * 5. No server computation on each request
 *
 * WHEN TO USE SSG:
 * - Content doesn't change per request
 * - Same content for all users
 * - Maximum performance (pre-rendered HTML)
 * - Examples: landing pages, docs, blogs, marketing pages
 *
 * TECHNOLOGIES:
 * - Next.js 15.5.4 App Router
 * - React 19.2.0 Server Components
 * - TailwindCSS 4.1.14 for styling
 * - TypeScript 5.9.3
 *
 * RENDERING STRATEGY:
 * force-static = Build-time rendering (SSG)
 * - Alternative: 'force-dynamic' for SSR (renders on each request)
 * - Alternative: 'auto' lets Next.js decide (async = dynamic, sync = static)
 *
 * See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */

// Force static generation at build time
// Without this, Next.js uses 'auto' which infers from code (async = dynamic)
export const dynamic = 'force-static'

/**
 * Home Component - Static Server Component
 *
 * This component:
 * - Runs ONLY at build time (not on each request)
 * - Captures timestamp during build
 * - console.log appears in build output only
 * - Generates static HTML served to all users
 *
 * Note: currentTime shows BUILD time, not request time
 * This proves the page is truly static (same HTML for everyone)
 */
export default function Home() {
  // Captured at BUILD time, not request time
  // Same value for all users since it's static HTML
  const currentTime = new Date().toLocaleString();

  // This console.log appears in build output (pnpm build)
  // NOT in server logs during runtime
  // NOT in browser console (this is a Server Component)
  console.log('Home page');

  return (
    <div className="max-w-3xl mx-auto pt-8 px-8">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6">Static Site Generation (SSG)</h1>

      {/* Rendering Strategies Overview */}
      <div className="mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <h2 className="text-lg font-semibold mb-4 text-slate-900">Next.js App Router Patterns</h2>

        {/* Server-Side Patterns */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-300 pb-1">Server-Side Patterns</h3>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="p-3 bg-white rounded border border-slate-200">
              <p className="font-semibold text-slate-900 mb-1">1. Static Site Generation (SSG) - This Page</p>
              <p className="text-xs text-slate-700">
                Uses a React Server Component (RSC) with <code className="bg-slate-100 px-1 rounded">export const dynamic = &apos;force-static&apos;</code>.
                Renders at build time. Same HTML for all users. console.log in build output only. No custom JS to run on client.
              </p>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <p className="font-semibold text-slate-900 mb-1">2. Server-Side Rendering (SSR)</p>
              <p className="text-xs text-slate-700">
                RSC with <code className="bg-slate-100 px-1 rounded">export const dynamic = &apos;force-dynamic&apos;</code> + <code className="bg-slate-100 px-1 rounded">async</code> function.
                Renders on the server for each request. console.log appears on the server. Sends a streamed React Flight payload (HTML + client instructions) to the browser.
              </p>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <p className="font-semibold text-slate-900 mb-1">3. Server Actions</p>
              <p className="text-xs text-slate-700">
                <code className="bg-slate-100 px-1 rounded">&apos;use server&apos;</code> directive.
                Functions that run on the server — typically for form submissions (<form action={action}>).
Can update data and trigger revalidation.
              </p>
            </div>
          </div>
        </div>

        {/* Client-Side Patterns */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-300 pb-1">Client-Side Patterns</h3>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="p-3 bg-white rounded border border-slate-200">
              <p className="font-semibold text-slate-900 mb-1">4. Client Component (Browser)</p>
              <p className="text-xs text-slate-700">
                <code className="bg-slate-100 px-1 rounded">&apos;use client&apos;</code> directive.
                Runs in the browser. Has access to useState, useEffect, and browser APIs.
console.log appears in the browser console.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Build timestamp proof */}
      <div className="mb-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-sm text-purple-900">
          <strong>Build Time:</strong> {currentTime}
        </p>
        <p className="text-xs text-purple-700 mt-1">
          This timestamp is captured during <code className="bg-purple-100 px-1 rounded">pnpm build</code> and is the same for all users. Refresh the page - it won&apos;t change!
        </p>
      </div>

      {/* How it works */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold mb-3 text-blue-900">How This Works</h2>
        <div className="text-sm text-blue-800 space-y-2">
          <p>
            <strong>Server Component</strong> with <strong>Static Site Generation (SSG)</strong>
          </p>
          <p>
            <strong>Lifecycle:</strong> Component runs ONCE at build time → HTML generated → Cached → Served to all users (no re-rendering)
          </p>
          <p>
            <strong>Key Setting:</strong> <code className="bg-blue-100 px-1 rounded">export const dynamic = &apos;force-static&apos;</code>
          </p>
          <p>
            <strong>Technologies:</strong> Next.js 15.5.4 App Router + React 19.2.0 Server Components + TailwindCSS 4.1.14 + TypeScript 5.9.3
          </p>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-6">
          {/* Pros */}
          <div>
            <h3 className="text-sm font-semibold text-green-700 mb-2">✅ Pros</h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Maximum performance (pre-rendered HTML)</li>
              <li>• Zero server computation per request</li>
              <li>• Perfect for CDN distribution</li>
              <li>• Lowest Time to First Byte (TTFB)</li>
              <li>• Works without JavaScript</li>
              <li>• SEO friendly (crawlers get full HTML)</li>
              <li>• Scales to millions of users easily</li>
              <li>• Lowest hosting costs</li>
            </ul>
          </div>

          {/* Cons */}
          <div>
            <h3 className="text-sm font-semibold text-amber-700 mb-2">⚠️ Trade-offs</h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Content same for all users</li>
              <li>• Must rebuild to update content</li>
              <li>• Not suitable for personalized data</li>
              <li>• No real-time updates</li>
              <li>• Build time increases with pages</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Console.log behavior */}
      <div className="mb-8 p-4 bg-green-50 rounded-lg border-2 border-green-300">
        <h2 className="text-sm font-semibold text-green-900 mb-2">🔍 Debugging: Where Does console.log Appear?</h2>
        <p className="text-xs text-green-800 mb-2">
          This page has <code className="bg-green-100 px-1 rounded">console.log(&apos;Home page&apos;)</code> in the component:
        </p>
        <ul className="text-xs text-green-700 space-y-1 ml-4">
          <li>✅ <strong>Build output:</strong> Visible during <code className="bg-green-100 px-1 rounded">pnpm build</code></li>
          <li>✅ <strong>Dev mode:</strong> Server terminal (page re-renders on each request in dev)</li>
          <li>❌ <strong>Production runtime:</strong> NOT in server logs (page is cached HTML)</li>
          <li>❌ <strong>Browser console:</strong> Never (this is a Server Component, not Client Component)</li>
        </ul>
      </div>
    </div>
  );
}