import { DataTable } from "./data-table"
import { getProducts } from "./data"
import { columns } from "./columns"

export default async function ShadcnGridPage() {
  // Fetch data (simulated database call - replace with real DB query)
  const data = await getProducts()
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
