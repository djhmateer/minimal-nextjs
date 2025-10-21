import { DataTable } from "./data-table"
import { Client } from 'pg'

// Force dynamic rendering - page is server-rendered on each request
export const dynamic = 'force-dynamic'

/**
 * CRUD-E Page - PostgreSQL Database Integration with Server-Side Pagination
 *
 * Purpose: Test CRUD operations with server-side pagination for large datasets
 * 1. Database persistence with pg Client
 * 2. Server-side data fetching with LIMIT/OFFSET
 * 3. URL-based pagination (search params)
 *
 * Architecture:
 * - Server Component: Fetches only current page from database
 * - Client Component (DataTable): Handles interactive table + edit modal
 *
 * Database: Uses products table seeded via `pnpm seed:products`
 */
const ITEMS_PER_PAGE = 100

export default async function CrudPageE({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const pageStart = performance.now()
  console.log('[CRUD-E] Server Component START at:', new Date().toISOString())

  const params = await searchParams
  const currentPage = parseInt(params.page || '1', 10)

  const fetchStart = performance.now()
  const { products, totalCount } = await getProducts(currentPage, ITEMS_PER_PAGE)
  const fetchEnd = performance.now()
  console.log(`[CRUD-E] getProducts() call took ${(fetchEnd - fetchStart).toFixed(2)}ms`)

  const serializeStart = performance.now()
  const dataSize = JSON.stringify(products).length
  const serializeEnd = performance.now()
  console.log(`[CRUD-E] Data serialization test took ${(serializeEnd - serializeStart).toFixed(2)}ms`)
  console.log(`[CRUD-E] Serialized data size: ${(dataSize / 1024 / 1024).toFixed(2)}MB`)

  const pageEnd = performance.now()
  console.log(`[CRUD-E] Server Component END - total time: ${(pageEnd - pageStart).toFixed(2)}ms`)

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">CRUD-E - Products - Database ({totalCount.toLocaleString()} total rows)</h1>
      <DataTable
        data={products}
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  )
}

/**
 * Product Type Definition
 *
 * Schema for product data used in both Server and Client Components
 */
export type Product = {
  id: string          // Format: PROD0001, PROD0002, etc.
  name: string        // Product name with optional version (e.g., "Laptop Stand v2")
  category: string    // One of 10 categories (Audio, Wearables, etc.)
  price: number       // Price in GBP (£50-£950 range)
  status: "in_stock" | "low_stock" | "out_of_stock"  // Inventory status
  quantity: number    // Stock quantity (0-150 based on status)
  lastChecked: string // ISO timestamp of when stock was last checked
}

/**
 * Fetch Products from PostgreSQL Database
 *
 * Queries the products table and maps database columns to Product type:
 * - id (DB) → id (Product) as string (SERIAL converted to string)
 * - last_checked (DB) → lastChecked (Product)
 * - All other fields match directly
 *
 * Database connection uses environment variables from .env.development or .env.production
 */
export async function getProducts(page: number = 1, limit: number = 100): Promise<{ products: Product[], totalCount: number }> {
  const totalStart = performance.now()

  // Validate required environment variables
  if (!process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_HOST || !process.env.POSTGRES_DATABASE) {
    throw new Error('Missing required PostgreSQL environment variables. Check .env.development (dev) or .env.production (prod) file.');
  }

  const clientCreateStart = performance.now()
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
  })
  const clientCreateEnd = performance.now()
  console.log(`[CRUD-E] Client created in ${(clientCreateEnd - clientCreateStart).toFixed(2)}ms`)

  try {
    const connectStart = performance.now()
    await client.connect()
    const connectEnd = performance.now()
    console.log(`[CRUD-E] Connected to database in ${(connectEnd - connectStart).toFixed(2)}ms`)

    // Get total count
    const countStart = performance.now()
    const countResult = await client.query('SELECT COUNT(*) FROM products')
    const totalCount = parseInt(countResult.rows[0].count, 10)
    const countEnd = performance.now()
    console.log(`[CRUD-E] Count query executed in ${(countEnd - countStart).toFixed(2)}ms - total: ${totalCount} rows`)

    // Query paginated products
    const offset = (page - 1) * limit
    const queryStart = performance.now()
    const result = await client.query(
      'SELECT id, name, category, price, status, quantity, last_checked FROM products ORDER BY id LIMIT $1 OFFSET $2',
      [limit, offset]
    )
    const queryEnd = performance.now()
    console.log(`[CRUD-E] Query executed in ${(queryEnd - queryStart).toFixed(2)}ms - fetched ${result.rows.length} rows (page ${page}, offset ${offset})`)

    // Map database rows to Product type
    const mapStart = performance.now()
    const products: Product[] = result.rows.map(row => ({
      id: String(row.id),             // Convert SERIAL id to string
      name: row.name,
      category: row.category,
      price: parseFloat(row.price),   // Convert DECIMAL to number
      status: row.status,
      quantity: row.quantity,
      lastChecked: new Date(row.last_checked).toISOString(), // Convert TIMESTAMP to ISO string
    }))
    const mapEnd = performance.now()
    console.log(`[CRUD-E] Data mapping completed in ${(mapEnd - mapStart).toFixed(2)}ms`)

    const totalEnd = performance.now()
    console.log(`[CRUD-E] TOTAL getProducts() time: ${(totalEnd - totalStart).toFixed(2)}ms`)

    return { products, totalCount }
  } catch (error) {
    console.error('[CRUD-E] Database error:', error)
    throw error
  } finally {
    const disconnectStart = performance.now()
    await client.end()
    const disconnectEnd = performance.now()
    console.log(`[CRUD-E] Disconnected in ${(disconnectEnd - disconnectStart).toFixed(2)}ms`)
  }
}
