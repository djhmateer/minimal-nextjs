// ==============================================================================
// CRUD PAGE - Tasks Management with Server/Client Component Architecture
// ==============================================================================
// This page demonstrates Next.js 15 App Router patterns for building a
// full CRUD interface with shadcn/ui components.
//
// ARCHITECTURE OVERVIEW:
// ----------------------
// 1. SERVER COMPONENT (this file - page.tsx)
//    - Runs on the server on every request (SSR)
//    - Fetches data from database/API using async/await
//    - Passes serialized data as props to Client Component
//      (Props = "properties" = arguments passed to React components,
//       like function parameters. Example: <DataTable data={products} />
//       passes a "data" prop with the products array to DataTable)
//    - No JavaScript sent to browser for this component
//
// 2. CLIENT COMPONENT (data-table.tsx)
//    - Receives data as props from Server Component
//    - Handles all interactivity: clicks, forms, modals, state
//    - Uses React hooks (useState) and browser APIs
//    - JavaScript bundle sent to browser
//
// WHY THIS PATTERN?
// -----------------
// - Server Components reduce JavaScript bundle size
// - Data fetching happens on the server (faster, secure)
// - Client Components only where interactivity is needed
// - Best performance: minimal client-side JavaScript
// ==============================================================================

import { DataTable } from "./data-table"
import { getProducts } from "./data"

// ==============================================================================
// ROUTE SEGMENT CONFIG: Force Server-Side Rendering (SSR)
// ==============================================================================
// This directive tells Next.js to render this page on EVERY request, not at
// build time. Without this, Next.js would statically generate this page once
// at build time (SSG), and the data would be stale.
//
// WHEN TO USE:
// - Data changes frequently (CRUD operations)
// - User-specific content (authentication, personalization)
// - Real-time data requirements
//
// ALTERNATIVES:
// - Remove this line for Static Site Generation (SSG) at build time
// - Use Incremental Static Regeneration (ISR) with `revalidate: 60` for cached SSG
// ==============================================================================
export const dynamic = 'force-dynamic'

// ==============================================================================
// SERVER COMPONENT: Page Entry Point
// ==============================================================================
// This is an ASYNC Server Component - only possible in Next.js App Router.
// Traditional React components cannot be async, but Server Components can.
//
// BENEFITS:
// - Direct async/await for data fetching (no useEffect needed)
// - Runs on the server, so database credentials are safe
// - No loading states needed (streaming handles this automatically)
// - SEO-friendly: HTML is fully rendered on the server
// ==============================================================================
export default async function ShadcnGridPage() {

  // ============================================================================
  // DATA FETCHING: Server-Side Only
  // ============================================================================
  // This await happens on the SERVER during each request. The browser never
  // sees this code or the getProducts() implementation.
  //
  // CURRENT IMPLEMENTATION: Simulated data from data.ts
  // PRODUCTION: Replace with real database query:
  //   - PostgreSQL: const data = await db.query('SELECT * FROM tasks')
  //   - Prisma: const data = await prisma.task.findMany()
  //   - Drizzle: const data = await db.select().from(tasks)
  //
  // ERROR HANDLING: Consider wrapping in try/catch for production
  // ============================================================================
  const data = await getProducts()

  // ============================================================================
  // RENDER: Mix of Server and Client Components
  // ============================================================================
  // This JSX is rendered on the server first, then hydrated on the client where
  // needed. The entire page structure (divs, text, styling) is sent as HTML.
  // Only the <DataTable> component requires client-side JavaScript.
  //
  // DATA FLOW:
  // Server (this file) → fetches data → passes as prop → Client Component
  //
  // The `data` prop is serialized (converted to JSON) and sent to the browser
  // where DataTable uses it for interactive table rendering.
  // ============================================================================
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CRUD - Tasks</h1>
        <p className="text-slate-600 mb-4">
          Interactive data table with edit functionality using shadcn/ui components
        </p>

        {/* ================================================================
             DOCUMENTATION SECTION 1: Next.js Rendering Patterns
             ================================================================
             This informational box (rendered server-side) explains the
             architecture patterns used in this page. It's purely educational
             and demonstrates how to document complex patterns in-app.
             ================================================================ */}
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

        {/* ================================================================
             DOCUMENTATION SECTION 2: shadcn/ui Component Architecture
             ================================================================
             This section explains the component library strategy:
             - TanStack Table for data grid
             - Radix UI Dialog primitives for modals
             - shadcn/ui wrapper components for styling
             - sonner for toast notifications
             ================================================================ */}
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

      {/* ====================================================================
           CLIENT COMPONENT: Interactive Data Table
           ====================================================================
           This is where the Server Component hands off to a Client Component.

           DATA FLOW:
           ----------
           1. Server fetches `data` above (line 78)
           2. Data is serialized to JSON
           3. Next.js sends HTML + JSON to browser
           4. React hydrates the DataTable component
           5. DataTable becomes interactive (clicks, forms, modals)

           WHY SEPARATE FILES?
           -------------------
           - Server logic (page.tsx) stays on server
           - Client logic (data-table.tsx) ships to browser
           - Clear separation of concerns
           - Smaller JavaScript bundles

           PROPS:
           ------
           - data: Product[] - Array of product objects from server
           - This data is READ-ONLY in the client (no persistence yet)
           - Edits are stored in component state, not saved to database

           TO ADD PERSISTENCE:
           -------------------
           - Create Server Action in actions.ts
           - Call action from DataTable save handler
           - Revalidate page data with revalidatePath()
           ==================================================================== */}
      <DataTable data={data} />
    </div>
  )
}

