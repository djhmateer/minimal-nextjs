"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "./page"

interface DataTableProps {
  data: Product[]           // Current page of products (already paginated from server)
  currentPage: number       // Current page number (from URL ?page=2)
  totalPages: number        // Total number of pages
  totalCount: number        // Total number of products in database
  initialSearch: string     // Initial search query from URL
}

// Client Component: displays products table with search, pagination controls and edit modal
export function DataTable({ data, currentPage, totalPages, totalCount, initialSearch }: DataTableProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Product | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState(initialSearch)

  // Navigate to different page by updating URL query param (?page=X&search=Y)
  const goToPage = (page: number) => {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    if (initialSearch) {
      params.set('search', initialSearch)
    }
    router.push(`/crudfilter?${params.toString()}`)
  }

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchInput.trim()) {
      params.set('search', searchInput.trim())
    }
    params.set('page', '1') // Reset to page 1 on new search
    router.push(`/crudfilter?${params.toString()}`)
  }

  // Clear search and go back to full list
  const clearSearch = () => {
    setSearchInput('')
    router.push('/crudfilter')
  }

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">CRUD Filter - Products ({totalCount.toLocaleString()} total rows)</h1>

      {/* Search form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by product name..."
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit">
            Search
          </Button>
          {initialSearch && (
            <Button type="button" variant="outline" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </div>
        {initialSearch && (
          <p className="mt-2 text-sm text-gray-600">
            Searching for: <strong>{initialSearch}</strong>
          </p>
        )}
      </form>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          {totalCount.toLocaleString()} total products
        </div>
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages.toLocaleString()}
        </div>
      </div>

      <div className="rounded-md border mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price in £</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Checked</TableHead>
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
                value={formData?.name || ""}
                onChange={(e) => setFormData({ ...formData!, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
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
                value={formData?.price || ""}
                onChange={(e) => setFormData({ ...formData!, price: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={formData?.quantity || ""}
                onChange={(e) => setFormData({ ...formData!, quantity: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
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
