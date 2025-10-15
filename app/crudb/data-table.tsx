"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "./page"

interface DataTableProps {
  data: Product[]
}

const SUCCESS_MESSAGE_TIMEOUT = 3000

export function DataTable({ data }: DataTableProps) {
  const [formData, setFormData] = useState<Product | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  return (
    <div className="rounded-md border">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 mx-4 mt-4">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

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

      <Dialog open={!!formData} onOpenChange={() => setFormData(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <div className="space-y-1">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData?.name}
                onChange={(e) => setFormData({ ...formData!, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData?.category}
                onChange={(e) => setFormData({ ...formData!, category: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData?.price}
                onChange={(e) => setFormData({ ...formData!, price: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={formData?.quantity}
                onChange={(e) => setFormData({ ...formData!, quantity: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData?.status}
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
              setTimeout(() => setSuccessMessage(null), SUCCESS_MESSAGE_TIMEOUT)
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
