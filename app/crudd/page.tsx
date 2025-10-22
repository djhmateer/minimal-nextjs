import { DataTable } from "./data-table"
import { createPgClient } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function CrudPageD() {
  const data = await getProducts()

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">CRUD-D - Products - Database ({data.length} rows)</h1>
      <DataTable data={data} />
    </div>
  )
}

export type Product = {
  id: string
  name: string
  category: string
  price: number
  status: "in_stock" | "low_stock" | "out_of_stock"
  quantity: number
  lastChecked: string
}

export async function getProducts(): Promise<Product[]> {
  const client = createPgClient()

  try {
    await client.connect()

    const result = await client.query(
      'SELECT id, name, category, price, status, quantity, last_checked FROM products ORDER BY id'
    )

    const products: Product[] = result.rows.map(row => ({
      id: String(row.id),
      name: row.name,
      category: row.category,
      price: parseFloat(row.price),
      status: row.status,
      quantity: row.quantity,
      lastChecked: new Date(row.last_checked).toISOString(),
    }))

    return products
  } catch (error) {
    console.error('[CRUD-D] Database error:', error)
    throw error
  } finally {
    await client.end()
  }
}
