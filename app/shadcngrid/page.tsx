import { DataTable } from "./data-table"
import { getProducts } from "./data"

// probably don't need to do this - can check on the build time output
export const dynamic = 'force-dynamic'

export default async function ShadcnGridPage() {
  // Fetch data (simulated database call - replace with real DB query)
  const data = await getProducts()
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Inventory</h1>
        <p className="text-slate-600 mb-4">
          A data table built with shadcn/ui and TanStack Table
        </p>

        {/* Next.js Rendering Pattern Explanation */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">🔍 Next.js Patterns Used</h2>
          <div className="text-xs text-blue-800 space-y-2">
            <p>
              <strong>Pattern 2: Server-Side Rendering (SSR)</strong> - This page component is an async Server Component
              that fetches data on each request using <code className="bg-blue-100 px-1 rounded">await getProducts()</code>.
              Note: <code className="bg-blue-100 px-1 rounded">export const dynamic = &apos;force-dynamic&apos;</code> is required
              to force SSR; otherwise Next.js would use SSG (static generation) by default.
            </p>
            <p>
              <strong>Pattern 4: Client Component</strong> - The DataTable uses{" "}
              <code className="bg-blue-100 px-1 rounded">&apos;use client&apos;</code> for interactive table features
              (data-table.tsx is a Client Component).
            </p>
            <p className="text-blue-700">
              <strong>Architecture:</strong> Server Component (page.tsx) calls <code className="bg-blue-100 px-1 rounded">getProducts()</code> from data.ts
              → passes data to Client Component (data-table.tsx) → renders interactive UI in browser.
            </p>
          </div>
        </div>
      </div>

      <DataTable data={data} />
    </div>
  )
}
