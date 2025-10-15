// ==============================================================================
// DATA TABLE CLIENT COMPONENT - Interactive Product Grid with Edit Modal
// ==============================================================================
// This is a Client Component that handles all user interactions for the CRUD page
// Uses TanStack Table v8 for flexible table rendering and shadcn/ui for UI components
// ==============================================================================

"use client" // Required: Component uses hooks (useState) and browser events (onClick)

// React hooks for state management
import { useState } from "react"

// TanStack Table v8 - Headless table library for building flexible data grids
// - useReactTable: Main hook for creating table instance
// - getCoreRowModel: Core table functionality (no sorting/filtering/pagination yet)
// - flexRender: Helper to render column headers and cells with proper typing
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"

// shadcn/ui Table components - Styled with Tailwind, accessible markup
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// shadcn/ui Dialog components - Radix UI Dialog primitive (accessible modal)
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

// shadcn/ui Form components - Styled inputs with consistent design system
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Product type from parent Server Component (shared type definition)
import { Product } from "./page"

// ==============================================================================
// COMPONENT PROPS
// ==============================================================================
// DataTable receives Product[] from parent Server Component
// Parent fetches data server-side, serializes, passes as prop
// This component handles all client-side interactions (clicks, forms, modals)

interface DataTableProps {
  data: Product[] // Array of products passed from Server Component
}

// ==============================================================================
// DATATATABLE COMPONENT
// ==============================================================================

export function DataTable({ data }: DataTableProps) {

  // ==============================================================================
  // STATE MANAGEMENT
  // ==============================================================================

  // editingProduct: Tracks which product is being edited (null = modal closed)
  // Controls Dialog open/close state via !!editingProduct
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // formData: Separate state for form inputs (allows cancel without affecting table)
  // NOTE: Duplicate state - could be refactored to use single source of truth
  const [formData, setFormData] = useState<Product | null>(null)

  // successMessage: Stores the success message to display (null = no message)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // ==============================================================================
  // TANSTACK TABLE SETUP
  // ==============================================================================

  // Create table instance with data and column definitions
  // useReactTable is the main hook - returns table helpers for rendering
  const table = useReactTable({
    data, // Product array from props
    columns: [
      // Simple text column - displays product ID
      {
        accessorKey: "id", // Maps to Product.id
        header: "ID",
      },
      // Simple text column - displays product name
      {
        accessorKey: "name",
        header: "Product Name",
      },
      // Simple text column - displays category
      {
        accessorKey: "category",
        header: "Category",
      },

      // ==============================================================================
      // PRICE COLUMN - Custom cell renderer with currency formatting
      // ==============================================================================
      {
        accessorKey: "price",
        header: "Price",
        // cell: Custom render function for this column's cells
        // row: TanStack Table row object with access to row data
        cell: ({ row }) => {
          // Extract price value from row data
          const price = parseFloat(row.getValue("price"))

          // Format as USD currency using Intl API (browser-native formatting)
          // Intl.NumberFormat is locale-aware and handles decimals correctly
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)

          // Return formatted price with medium font weight
          return <div className="font-medium">{formatted}</div>
        },
      },

      // Simple number column - displays quantity
      {
        accessorKey: "quantity",
        header: "Quantity",
      },

      // ==============================================================================
      // STATUS COLUMN - Custom cell renderer with colored badge
      // ==============================================================================
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          // Extract status value and type-cast to string
          const status = row.getValue("status") as string

          // Render status as colored badge pill
          // Tailwind classes applied conditionally based on status value
          return (
            <div
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                status === "in_stock"
                  ? "bg-green-100 text-green-800"   // Green for in stock
                  : status === "low_stock"
                  ? "bg-yellow-100 text-yellow-800" // Yellow for low stock
                  : "bg-red-100 text-red-800"       // Red for out of stock
              }`}
            >
              {/* Replace underscores with spaces and convert to uppercase */}
              {status.replace("_", " ").toUpperCase()}
            </div>
          )
        },
      },

      // ==============================================================================
      // DATE COLUMN - Custom cell renderer with ISO date formatting
      // ==============================================================================
      {
        accessorKey: "lastChecked",
        header: "Last Time Checked Stock",
        cell: ({ row }) => {
          // Extract ISO date string from row data
          const dateString = row.getValue("lastChecked") as string

          // Convert to Date object
          const date = new Date(dateString)

          // Format as "YYYY-MM-DD HH:MM:SS" by manipulating ISO string
          // Uses deterministic formatting to avoid hydration mismatches
          // (locale-based formatting can differ between server and client)
          const formatted = date.toISOString().replace('T', ' ').slice(0, 19)

          return <div className="text-sm text-slate-700">{formatted}</div>
        },
      },
    ],
    // getCoreRowModel: Required TanStack Table function for basic row rendering
    // More advanced models available: getSortedRowModel, getFilteredRowModel, getPaginationRowModel
    getCoreRowModel: getCoreRowModel(),
  })

  // ==============================================================================
  // RENDER: TABLE + EDIT MODAL
  // ==============================================================================

  return (
    <div className="rounded-md border">
      {/* Success message - Simple HTML notification (replaces sonner toast) */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 mx-4 mt-4">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      {/* shadcn/ui Table component - Styled table with proper semantic HTML */}
      <Table>

        {/* ==============================================================================
            TABLE HEADER - Render column headers
            ==============================================================================
            - table.getHeaderGroups(): Returns array of header row groups
            - For simple tables, there's typically one header group
            - Supports complex headers with column spanning in advanced use cases
        */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {/* Loop through each header cell in the row */}
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {/* flexRender: TanStack Table helper for rendering with type safety */}
                  {/* Checks if placeholder (for grouped headers), otherwise renders header content */}
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* ==============================================================================
            TABLE BODY - Render data rows or empty state
            ==============================================================================
            - table.getRowModel().rows: Returns array of row objects to render
            - Each row contains cells mapped to column definitions above
        */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            // If rows exist, render each row
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                // Styling: Pointer cursor + darker gray on hover (was gray-50, now gray-200)
                className="cursor-pointer hover:bg-gray-200"
                // Click handler: Opens edit modal with clicked product data
                onClick={() => {
                  // row.original: Access to full Product object for this row
                  const product = row.original

                  // Set both states: editingProduct (opens modal), formData (populates form)
                  setEditingProduct(product)
                  setFormData(product)
                }}
              >
                {/* Render all visible cells in this row */}
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {/* flexRender: Uses custom cell renderer if defined, otherwise displays value */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            // If no rows, render empty state message
            <TableRow>
              {/* colSpan={7}: Spans all 7 columns (id, name, category, price, quantity, status, lastChecked) */}
              {/* TODO: Replace hardcoded 7 with table.getAllColumns().length */}
              <TableCell colSpan={7} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ==============================================================================
          EDIT MODAL - Radix UI Dialog (accessible, keyboard-navigable modal)
          ==============================================================================
          - open: Modal is open when editingProduct is not null (!!editingProduct = boolean)
          - onOpenChange: Called when user clicks overlay or close button
          - When open=false, clear editingProduct to close modal
      */}
      <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
        <DialogContent className="max-w-md">
          {/* Modal header with title and description (accessibility) */}
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product details below.
            </DialogDescription>
          </DialogHeader>

          {/* ==============================================================================
              FORM FIELDS - Controlled inputs bound to formData state
              ==============================================================================
              - Only render form if formData is not null (prevents crash on initial render)
              - Each input uses value + onChange pattern (controlled components)
              - Changes update formData state, not original data (allows cancel)
          */}
          {formData && (
            <div className="space-y-4 py-4">

              {/* Product Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  // Spread existing formData, update only name field
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Category Input */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>

              {/* Price Input - type="number" with step for decimals */}
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01" // Allows decimal values (e.g., 29.99)
                  value={formData.price}
                  // parseFloat: Convert string input to number
                  // TODO: Add fallback for NaN: parseFloat(e.target.value) || 0
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                />
              </div>

              {/* Quantity Input - type="number" for integer values */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  // parseInt: Convert string input to integer
                  // TODO: Add fallback for NaN: parseInt(e.target.value) || 0
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                />
              </div>

              {/* Status Dropdown - Native select styled with Tailwind */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                {/* Native select element (not shadcn Select component) */}
                {/* Styled to match shadcn Input component appearance */}
                {/* TODO: Replace with shadcn Select component for better UX */}
                <select
                  id="status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.status}
                  // Type assertion: e.target.value is string, cast to Product["status"] union type
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Product["status"] })}
                >
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
            </div>
          )}

          {/* ==============================================================================
              MODAL FOOTER - Cancel and Save buttons
              ==============================================================================
              - DialogFooter: shadcn component with proper button alignment
              - Cancel: Closes modal without saving (just clears editingProduct)
              - Save: Shows success toast, closes modal (no actual persistence yet)
          */}
          <DialogFooter>
            {/* Cancel button - outline variant, closes modal */}
            <Button variant="outline" onClick={() => setEditingProduct(null)}>
              Cancel
            </Button>

            {/* Save button - primary variant (default) */}
            {/* TODO: Add Server Action to persist changes to database */}
            {/* TODO: Add loading state while saving */}
            {/* TODO: Add error handling */}
            <Button onClick={() => {
              // Show success message with product name
              setSuccessMessage(`Updated ${formData?.name}`)

              // Auto-hide message after 3 seconds
              setTimeout(() => setSuccessMessage(null), 3000)

              // Close modal (changes are lost - no persistence implemented)
              setEditingProduct(null)
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
