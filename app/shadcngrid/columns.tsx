"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Product } from "./data"

export const columns: ColumnDef<Product>[] = [
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
  {
    accessorKey: "lastChecked",
    header: "Last Time Checked Stock",
    cell: ({ row }) => {
      const dateString = row.getValue("lastChecked") as string
      // Simple display of ISO string to avoid hydration issues with locale formatting
      // Format: "2025-01-10T14:30:45.123Z" becomes readable display
      const date = new Date(dateString)
      const formatted = date.toISOString().replace('T', ' ').slice(0, 19)
      return <div className="text-sm text-slate-700">{formatted}</div>
    },
  },
]
