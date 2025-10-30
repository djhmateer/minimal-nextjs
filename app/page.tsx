import { LoginSuccessToast } from './login-success-toast';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const currentTime = new Date().toLocaleString();

  return (
    <div className="max-w-3xl mx-auto pt-8 px-8">
      <LoginSuccessToast />

      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6">Next.js App Router Patterns</h1>

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
                Functions that run on the server — typically for form submissions (<code className="bg-slate-100 px-1 rounded">&lt;form action=&#123;action&#125;&gt;</code>).
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

      {/* Server timestamp proof */}
      <div className="mb-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-sm text-purple-900">
          <strong>Server Time:</strong> {currentTime}
        </p>
        <p className="text-xs text-purple-700 mt-1">
          This page uses <code className="bg-purple-100 px-1 rounded">force-dynamic</code> to check authentication on each request. Refresh to see the timestamp update!
        </p>
      </div>

      {/* How it works */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold mb-3 text-blue-900">How This Works</h2>
        <div className="text-sm text-blue-800 space-y-2">
          <p>
            <strong>Server Component</strong> with <strong>Server-Side Rendering (SSR)</strong>
          </p>
          <p>
            <strong>Lifecycle:</strong> Component runs on each request → Checks session → Renders personalized HTML → Sends to user
          </p>
          <p>
            <strong>Key Setting:</strong> <code className="bg-blue-100 px-1 rounded">export const dynamic = &apos;force-dynamic&apos;</code>
          </p>
          <p>
            <strong>Technologies:</strong> Next.js 15.5.4 App Router + React 19.2.0 Server Components + Better Auth + TailwindCSS 4.1.14 + TypeScript 5.9.3
          </p>
        </div>
      </div>

      {/* Authentication Routes */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-3 text-gray-900">Authentication Routes</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="p-3 bg-white rounded border">
            <strong>/register</strong> - Create a new account
          </div>
          <div className="p-3 bg-white rounded border">
            <strong>/login</strong> - Log in to existing account
          </div>
          <div className="p-3 bg-white rounded border">
            <strong>/protectedpage</strong> - Protected page (requires authentication)
          </div>
        </div>
      </div>
    </div>
  );
}