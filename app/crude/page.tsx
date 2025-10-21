import { DataTable } from "./data-table"
import { Client } from 'pg'

export const dynamic = 'force-dynamic'

const ITEMS_PER_PAGE = 20

export default async function CrudPageE({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = parseInt(params.page || '1', 10)

  const { products, totalCount } = await getProducts(currentPage, ITEMS_PER_PAGE)
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">CRUD-E - Products - Database ({totalCount.toLocaleString()} total rows)</h1>
      <DataTable
        data={products}
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
      />
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

// Server-side paginated query: fetches only requested page from database
export async function getProducts(page: number = 1, limit: number = 100): Promise<{ products: Product[], totalCount: number }> {
  if (!process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_HOST || !process.env.POSTGRES_DATABASE) {
    throw new Error('Missing required PostgreSQL environment variables.');
  }

  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
  })

  try {
    await client.connect()

    const countResult = await client.query('SELECT COUNT(*) FROM products')
    const totalCount = parseInt(countResult.rows[0].count, 10)

    const offset = (page - 1) * limit
    const result = await client.query(
      'SELECT id, name, category, price, status, quantity, last_checked FROM products ORDER BY id LIMIT $1 OFFSET $2',
      [limit, offset]
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

    return { products, totalCount }
  } catch (error) {
    console.error('[CRUD-E] Database error:', error)
    throw error
  } finally {
    await client.end()
  }
}
