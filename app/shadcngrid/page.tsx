"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"

// Define the data type
type Product = {
  id: string
  name: string
  category: string
  price: number
  status: "in_stock" | "low_stock" | "out_of_stock"
  quantity: number
}

// Define columns
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === "in_stock"
              ? "bg-green-100 text-green-800"
              : status === "low_stock"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status.replace("_", " ").toUpperCase()}
        </div>
      )
    },
  },
]

// Demo data
const data: Product[] = [
  {
    id: "PROD001",
    name: "Wireless Headphones",
    category: "Audio",
    price: 299.99,
    quantity: 45,
    status: "in_stock",
  },
  {
    id: "PROD002",
    name: "Smart Watch",
    category: "Wearables",
    price: 399.99,
    quantity: 12,
    status: "low_stock",
  },
  {
    id: "PROD003",
    name: "Laptop Stand",
    category: "Accessories",
    price: 79.99,
    quantity: 0,
    status: "out_of_stock",
  },
  {
    id: "PROD004",
    name: "Mechanical Keyboard",
    category: "Peripherals",
    price: 149.99,
    quantity: 67,
    status: "in_stock",
  },
  {
    id: "PROD005",
    name: "USB-C Hub",
    category: "Accessories",
    price: 59.99,
    quantity: 8,
    status: "low_stock",
  },
  {
    id: "PROD006",
    name: "Wireless Mouse",
    category: "Peripherals",
    price: 49.99,
    quantity: 120,
    status: "in_stock",
  },
  {
    id: "PROD007",
    name: "4K Monitor",
    category: "Displays",
    price: 599.99,
    quantity: 23,
    status: "in_stock",
  },
  {
    id: "PROD008",
    name: "Webcam HD",
    category: "Peripherals",
    price: 89.99,
    quantity: 5,
    status: "low_stock",
  },
]

export default function ShadcnGridPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Inventory</h1>
        <p className="text-slate-600">
          A data table built with shadcn/ui and TanStack Table
        </p>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}
