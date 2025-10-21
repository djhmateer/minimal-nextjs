"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "./page"

interface DataTableProps {
  data: Product[]
  currentPage: number
  totalPages: number
  totalCount: number
  itemsPerPage: number
}

// Global timing marker for script execution
declare global {
  interface Window {
    __cruddClientScriptStart?: number;
  }
}

if (typeof window !== 'undefined') {
  window.__cruddClientScriptStart = performance.now()
  console.log('[CRUD-E Client] Script loaded at:', performance.now().toFixed(2) + 'ms since page navigation')
}

export function DataTable({ data, currentPage, totalPages, totalCount, itemsPerPage }: DataTableProps) {
  const componentStart = performance.now()
  const scriptLoadTime = typeof window !== 'undefined' ? window.__cruddClientScriptStart ?? 0 : 0

  console.log('[CRUD-E Client] ==== TIMING BREAKDOWN ====')
  console.log(`[CRUD-E Client] Component first called at: ${componentStart.toFixed(2)}ms since navigation`)
  console.log(`[CRUD-E Client] Time from script load to component: ${(componentStart - scriptLoadTime).toFixed(2)}ms`)
  console.log(`[CRUD-E Client] Received ${data.length} products (${(JSON.stringify(data).length / 1024 / 1024).toFixed(2)}MB)`)

  const [formData, setFormData] = useState<Product | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Track initial mount/hydration and rendering complete
  useEffect(() => {
    const mountEnd = performance.now()
    console.log(`[CRUD-E Client] Component mounted at: ${mountEnd.toFixed(2)}ms since navigation`)
    console.log(`[CRUD-E Client] Mount/hydration took: ${(mountEnd - componentStart).toFixed(2)}ms`)

    // Use requestIdleCallback to detect when React is done with all work
    requestIdleCallback(() => {
      const idleTime = performance.now()
      console.log(`[CRUD-E Client] React idle at: ${idleTime.toFixed(2)}ms since navigation`)
      console.log(`[CRUD-E Client] Total client-side time: ${(idleTime - scriptLoadTime).toFixed(2)}ms`)
      console.log('[CRUD-E Client] ==== END TIMING ====')
    })
  }, [componentStart, scriptLoadTime])

  // Server-side pagination - data is already the current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalCount)

  const goToPage = (page: number) => {
    const url = new URL(window.location.href)
    url.searchParams.set('page', page.toString())
    window.location.href = url.toString()
  }

  return (
    <div className="space-y-4">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}

      {/* Pagination Info */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {endIndex} of {totalCount.toLocaleString()} products
        </div>
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages.toLocaleString()}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
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
            {data.map((product) => (
              <TableRow
                key={product.id}
                className="cursor-pointer"
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
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
        >
          First
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm px-4">
          Page {currentPage} of {totalPages.toLocaleString()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </Button>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!formData} onOpenChange={() => setFormData(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product details below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <div className="space-y-1">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                autoComplete="off"
                value={formData?.name || ""}
                onChange={(e) => setFormData({ ...formData!, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                autoComplete="off"
                value={formData?.category || ""}
                onChange={(e) => setFormData({ ...formData!, category: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                autoComplete="off"
                value={formData?.price || ""}
                onChange={(e) => setFormData({ ...formData!, price: parseFloat(e.target.value) || 0 })}
              />
            </div>

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

          <DialogFooter>
            <Button variant="outline" onClick={() => setFormData(null)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setSuccessMessage(`Updated ${formData?.name}`)
              setTimeout(() => setSuccessMessage(null), 3000)
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
