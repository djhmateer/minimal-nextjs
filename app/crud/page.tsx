// ==============================================================================
// CRUD PAGE - Server/Client Component Split Pattern
// ==============================================================================
// SERVER COMPONENT (page.tsx): Fetches data via async/await, passes to client
// CLIENT COMPONENT (data-table.tsx): Handles UI interactions, state, modals
// BENEFITS: Reduced JS bundle, secure server-side data fetching, SEO-friendly
// ==============================================================================

import { DataTable } from "./data-table"

// Force SSR on every request (not static generation at build time)
// Use for: frequently changing data, user-specific content, real-time data
export const dynamic = 'force-dynamic'

// Async Server Component - fetches data on server, passes to client
// Benefits: No useEffect, secure credentials, SEO-friendly, automatic streaming
export default async function CrudPage() {

  // Fetch data on server (browser never sees this code)
  // Production: Replace with db.query(), prisma.findMany(), or db.select()
  const data = await getProducts()

  // Page structure rendered as HTML on server
  // Only <DataTable> requires client-side JS for interactivity
  // Data flow: Server fetches → serializes → passes as prop → Client hydrates
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CRUD - Tasks</h1>
        <p className="text-slate-600 mb-4">
          Interactive data table with edit functionality using shadcn/ui components
        </p>

        {/* Educational box explaining Next.js rendering patterns */}
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

        {/* Educational box explaining shadcn/ui component strategy */}
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

      {/* Client Component: Server fetches data → serializes → passes as prop
           DataTable handles all interactions (clicks, forms, modals)
           Note: Edits are in-memory only. Add Server Action for persistence */}
      <DataTable data={data} />
    </div>
  )
}

// Product type definition
export type Product = {
  id: string
  name: string
  category: string
  price: number
  status: "in_stock" | "low_stock" | "out_of_stock"
  quantity: number
  lastChecked: string // ISO string for server/client serialization
}

// Mock data function - replace with real database query in production
export async function getProducts(): Promise<Product[]> {
  const serverTime = new Date().toISOString()

  return [
    {
      id: "PROD001",
      name: "Wireless Headphones",
      category: "Audio",
      price: 299.99,
      quantity: 45,
      status: "in_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD002",
      name: "Smart Watch",
      category: "Wearables",
      price: 399.99,
      quantity: 12,
      status: "low_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD003",
      name: "Laptop Stand",
      category: "Accessories",
      price: 79.99,
      quantity: 0,
      status: "out_of_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD004",
      name: "Mechanical Keyboard",
      category: "Peripherals",
      price: 149.99,
      quantity: 67,
      status: "in_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD005",
      name: "USB-C Hub",
      category: "Accessories",
      price: 59.99,
      quantity: 8,
      status: "low_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD006",
      name: "Wireless Mouse",
      category: "Peripherals",
      price: 49.99,
      quantity: 120,
      status: "in_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD007",
      name: "4K Monitor",
      category: "Displays",
      price: 599.99,
      quantity: 23,
      status: "in_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD008",
      name: "Webcam HD",
      category: "Peripherals",
      price: 89.99,
      quantity: 5,
      status: "low_stock",
      lastChecked: serverTime,
    },
  ]
}


