import { DataTable } from "./data-table"
import { getPool } from '@/lib/db'

export const dynamic = 'force-dynamic'

const ITEMS_PER_PAGE = 20

// Server Component: fetches paginated and filtered data from database
export default async function CrudFilterSortPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }>
}) {
  const params = await searchParams
  const currentPage = parseInt(params.page || '1', 10)
  const searchQuery = params.search?.trim() || ''
  const sortBy = params.sortBy || 'id'
  const sortOrder = params.sortOrder || 'asc'

  const { products, totalCount } = await getProducts(
    currentPage,
    ITEMS_PER_PAGE,
    searchQuery,
    sortBy,
    sortOrder
  )
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <DataTable
      data={products}
      currentPage={currentPage}
      totalPages={totalPages}
      totalCount={totalCount}
      initialSearch={searchQuery}
      sortBy={sortBy}
      sortOrder={sortOrder}
    />
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

// Fetches a single page of products from PostgreSQL using LIMIT/OFFSET
// Returns both the products array and total count for pagination UI
// Uses parameterized queries to prevent SQL injection
export async function getProducts(
  page: number = 1,
  limit: number = 20,
  searchQuery: string = '',
  sortBy: string = 'id',
  sortOrder: 'asc' | 'desc' = 'asc'
  // returns a Promise resolving to an object with products array and totalCount
): Promise<{ products: Product[], totalCount: number }> {
  const pool = getPool()

  try {
    const offset = (page - 1) * limit

    // Build queries with optional WHERE clause for filtering
    // IMPORTANT: Uses parameterized queries ($1, $2, etc.) to prevent SQL injection
    let countQuery = 'SELECT COUNT(*) FROM products'
    let selectQuery = 'SELECT id, name, category, price, status, quantity, last_checked FROM products'
    const queryParams: (string | number)[] = []

    if (searchQuery) {
      // ILIKE is case-insensitive pattern matching in PostgreSQL
      // $1 is a parameter placeholder that pg library will safely escape
      countQuery += ' WHERE name ILIKE $1'
      selectQuery += ' WHERE name ILIKE $1'
      // Wrap search term with % for partial matching (e.g., "laptop" matches "Gaming Laptop")
      queryParams.push(`%${searchQuery}%`)
    }

    // Whitelist allowed sort columns to prevent SQL injection
    const allowedSortColumns = ['id', 'name', 'category', 'price', 'status', 'quantity', 'last_checked']
    const safeColumn = allowedSortColumns.includes(sortBy) ? sortBy : 'id'
    const safeOrder = sortOrder === 'desc' ? 'DESC' : 'ASC'

    // Add ORDER BY, LIMIT, and OFFSET with correct parameter numbers
    const limitParam = queryParams.length + 1
    const offsetParam = queryParams.length + 2
    selectQuery += ` ORDER BY ${safeColumn} ${safeOrder} LIMIT $${limitParam} OFFSET $${offsetParam}`

    // Execute count query (for pagination total)
    const countResult = await pool.query(
      countQuery,
      searchQuery ? [queryParams[0]] : []
    )
    const totalCount = parseInt(countResult.rows[0].count)

    // Execute select query (for actual data)
    const result = await pool.query(
      selectQuery,
      [...queryParams, limit, offset]
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
    console.error('[CRUD-Filter] Database error:', error)
    throw error
  }
}
