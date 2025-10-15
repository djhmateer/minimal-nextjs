// ==============================================================================
// DATA TABLE CLIENT COMPONENT - Interactive Product Grid with Edit Modal
// ==============================================================================
// This is a Client Component that handles all user interactions for the CRUD page
// Uses shadcn/ui components for table and modal UI
// ==============================================================================

"use client" // Required: Component uses hooks (useState) and browser events (onClick)

// React hooks for state management
import { useState } from "react"

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

  // formData: Tracks which product is being edited (null = modal closed)
  // Controls both Dialog open/close state and form inputs
  const [formData, setFormData] = useState<Product | null>(null)

  // successMessage: Stores the success message to display (null = no message)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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

        {/* TABLE HEADER - Manual column headers */}
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price in £</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Time Checked Stock</TableHead>
          </TableRow>
        </TableHeader>

        {/* TABLE BODY - Render data rows */}
        <TableBody>
          {data.map((product) => (
            <TableRow
              key={product.id}
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => setFormData(product)}
            >
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>{product.lastChecked}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ==============================================================================
          EDIT MODAL - Radix UI Dialog (accessible, keyboard-navigable modal)
          ==============================================================================
          - open: Modal is open when formData is not null (!!formData = boolean)
          - onOpenChange: Called when user clicks overlay or close button
          - When open=false, clear formData to close modal
      */}
      <Dialog open={!!formData} onOpenChange={(open) => !open && setFormData(null)}>
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
              - Cancel: Closes modal without saving (just clears formData)
              - Save: Shows success message, closes modal (no actual persistence yet)
          */}
          <DialogFooter>
            {/* Cancel button - outline variant, closes modal */}
            <Button variant="outline" onClick={() => setFormData(null)}>
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
              setFormData(null)
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
