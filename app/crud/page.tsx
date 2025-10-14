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
        <h1 className="text-3xl font-bold mb-2">CRUD - Tasks</h1>
        <p className="text-slate-600 mb-4">
          Interactive data table with edit functionality using shadcn/ui components
        </p>

        {/* Next.js Rendering Pattern Explanation */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">🔍 Next.js Patterns Used</h2>
          <div className="text-xs text-blue-800 space-y-2">
            <p>
              <strong>Pattern 2: Server-Side Rendering (SSR)</strong> - This page component (page.tsx) is an async Server Component
              that fetches data on each request using <code className="bg-blue-100 px-1 rounded">await getProducts()</code> from data.ts.
              The <code className="bg-blue-100 px-1 rounded">export const dynamic = &apos;force-dynamic&apos;</code> directive
              forces SSR on every request rather than static generation at build time.
            </p>
            <p>
              <strong>Pattern 4: Client Component</strong> - The DataTable (data-table.tsx) uses{" "}
              <code className="bg-blue-100 px-1 rounded">&apos;use client&apos;</code> for interactive features
              including clickable rows, modal dialogs, form state management, and toast notifications.
            </p>
          </div>
        </div>

        {/* shadcn/ui Components Strategy */}
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h2 className="text-sm font-semibold text-green-900 mb-2">🎨 shadcn/ui Component Strategy</h2>
          <div className="text-xs text-green-800 space-y-2">
            <p>
              <strong>Data Table (TanStack Table v8)</strong> - Built with{" "}
              <code className="bg-green-100 px-1 rounded">@tanstack/react-table</code> for flexible column definitions,
              sorting, filtering, and pagination. Each row is clickable with hover effects using Tailwind classes.
            </p>
            <p>
              <strong>Dialog Component</strong> - Uses Radix UI&apos;s Dialog primitive (accessible modal) with{" "}
              <code className="bg-green-100 px-1 rounded">DialogContent</code>, <code className="bg-green-100 px-1 rounded">DialogHeader</code>,{" "}
              <code className="bg-green-100 px-1 rounded">DialogTitle</code>, <code className="bg-green-100 px-1 rounded">DialogDescription</code>, and{" "}
              <code className="bg-green-100 px-1 rounded">DialogFooter</code>. Opens when clicking any table row, controlled by React state.
            </p>
            <p>
              <strong>Form Inputs</strong> - Uses shadcn <code className="bg-green-100 px-1 rounded">Input</code> and{" "}
              <code className="bg-green-100 px-1 rounded">Label</code> components for text/number inputs, plus native{" "}
              <code className="bg-green-100 px-1 rounded">&lt;select&gt;</code> styled with Tailwind for the status dropdown.
            </p>
            <p>
              <strong>Toast Notifications</strong> - Uses <code className="bg-green-100 px-1 rounded">sonner</code> library
              (already configured in layout.tsx with <code className="bg-green-100 px-1 rounded">&lt;Toaster /&gt;</code>)
              to show success messages on save. Call <code className="bg-green-100 px-1 rounded">toast.success()</code> from anywhere in the app.
            </p>
            <p className="text-green-700">
              <strong>Note:</strong> This implementation is client-side only. To persist changes, add a Server Action
              with database updates and revalidation.
            </p>
          </div>
        </div>
      </div>

      <DataTable data={data} />
    </div>
  )
}
