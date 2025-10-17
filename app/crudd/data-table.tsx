"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "./page"

interface DataTableProps {
  data: Product[]
}

/**
 * DataTable Component - Client-side interactive table with modal edit functionality
 *
 * Features:
 * - Click-to-edit: Click any row to open edit modal
 * - Modal form powered by shadcn/ui Dialog component
 * - Success message banner with 3s auto-dismiss
 * - Mock CRUD operations (no database persistence)
 *
 * Performance:
 * - Renders all 208 rows at once (no virtualization)
 * - Client-side state management for form and success message
 * - Optimistic updates (no API calls)
 *
 * @param data - Array of Product objects passed from Server Component
 */
export function DataTable({ data }: DataTableProps) {
  // formData: Holds the product being edited (null when modal is closed)
  const [formData, setFormData] = useState<Product | null>(null)

  // successMessage: Displayed in green banner after save (auto-dismissed after 3s)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  return (
    <div className="rounded-md border">
      {/* Success Message Banner - Appears after save, auto-dismisses after 3s */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 mx-4 mt-4">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      {/* Main Data Table - shadcn/ui Table component */}
      <Table>
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

        <TableBody>
          {/* Render all 208 products - Click any row to edit */}
          {data.map((product) => (
            <TableRow
              key={product.id}
              className="cursor-pointer"
              onClick={() => setFormData(product)} // Open modal with this product's data
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

      {/* Edit Modal - Opens when formData is set (clicking a row) */}
      {/* Controlled by: open={!!formData} - Modal open when formData is truthy */}
      <Dialog open={!!formData} onOpenChange={() => setFormData(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product details below.
            </DialogDescription>
          </DialogHeader>

          {/* Edit Form - All fields are controlled inputs */}
          <div className="space-y-3 py-4">
            {/* Product Name - Text input */}
            <div className="space-y-1">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                autoComplete="off"
                value={formData?.name || ""}
                onChange={(e) => setFormData({ ...formData!, name: e.target.value })}
              />
            </div>

            {/* Category - Text input */}
            <div className="space-y-1">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                autoComplete="off"
                value={formData?.category || ""}
                onChange={(e) => setFormData({ ...formData!, category: e.target.value })}
              />
            </div>

            {/* Price - Number input with decimal support (step="0.01") */}
            <div className="space-y-1">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01" // Allow decimal values for currency
                autoComplete="off"
                value={formData?.price || ""}
                onChange={(e) => setFormData({ ...formData!, price: parseFloat(e.target.value) || 0 })}
              />
            </div>

            {/* Quantity - Integer input */}
            <div className="space-y-1">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                autoComplete="off"
                value={formData?.quantity || ""}
                onChange={(e) => setFormData({ ...formData!, quantity: parseInt(e.target.value) || 0 })}
              />
            </div>

            {/* Status - Dropdown select (native HTML select with Tailwind styling) */}
            <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                autoComplete="off"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData?.status || ""}
                onChange={(e) => setFormData({ ...formData!, status: e.target.value as Product["status"] })}
              >
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Dialog Actions - Cancel and Save buttons */}
          <DialogFooter>
            {/* Cancel Button - Close modal without saving */}
            <Button variant="outline" onClick={() => setFormData(null)}>
              Cancel
            </Button>

            {/* Save Button - Mock save operation (no API call or database update) */}
            <Button onClick={() => {
              // Show success message with product name
              setSuccessMessage(`Updated ${formData?.name}`)

              // Auto-dismiss success message after 3 seconds
              setTimeout(() => setSuccessMessage(null), 3000)

              // Close modal by clearing formData
              setFormData(null)

              // NOTE: This is a mock save - in production, you would:
              // 1. Call an API endpoint (e.g., POST /api/products/${id})
              // 2. Update the database
              // 3. Revalidate the data on the server
              // 4. Handle errors and loading states
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
