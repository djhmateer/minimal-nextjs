import { DataTable } from "./data-table"

// Force dynamic rendering - page is server-rendered on each request
export const dynamic = 'force-dynamic'

/**
 * CRUD-D Page - Performance Testing Route with Persistence/Virtual Scrolling Goals
 *
 * Purpose: Test CRUD operations with 208 product rows, exploring:
 * 1. Database persistence (vs mock data in CRUD-C)
 * 2. Virtual scrolling for performance optimization
 *
 * Architecture:
 * - Server Component: Generates mock data server-side
 * - Client Component (DataTable): Handles interactive table + edit modal
 *
 * Current State: Mock data generation (identical to CRUD-C)
 * TODO: Add PostgreSQL persistence and/or virtual scrolling (@tanstack/react-virtual)
 */
export default async function CrudPageD() {
  // Generate 208 products server-side
  const data = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">CRUD-D - Products - Persistence or Virtual ({data.length} rows)</h1>
      <DataTable data={data} />
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
 * Generate Mock Product Data (Server-side)
 *
 * Creates 208 deterministic product rows for performance testing.
 *
 * Logic:
 * - Product names cycle through 50 base names with versions (v2, v3, etc.)
 * - Categories are randomly assigned from 10 options
 * - Status follows pattern: every 3rd = out_of_stock, every 5th = low_stock, else in_stock
 * - Prices are random between £50-£950 with 2 decimal precision
 * - Quantities align with status (0 for out_of_stock, 1-10 for low_stock, 1-150 for in_stock)
 * - All products share same lastChecked timestamp (server request time)
 *
 * TODO: Replace with PostgreSQL query for real persistence
 *
 * @returns Promise<Product[]> - 208 mock product objects
 */
export async function getProducts(): Promise<Product[]> {
  // Server-side timestamp - all products get same value (useful for debugging SSR)
  const serverTime = new Date().toISOString()

  // 50 base product names - will be cycled with versions (v2, v3, etc.)
  const productNames = [
    "Wireless Headphones", "Smart Watch", "Laptop Stand", "Mechanical Keyboard", "USB-C Hub",
    "Wireless Mouse", "4K Monitor", "Webcam HD", "Gaming Chair", "Standing Desk",
    "Bluetooth Speaker", "Tablet Pro", "Phone Case", "Screen Protector", "Charging Cable",
    "Wireless Charger", "External SSD", "RAM Module", "Graphics Card", "CPU Cooler",
    "Motherboard", "Power Supply", "PC Case", "LED Strip", "Cable Management",
    "Desk Mat", "Wrist Rest", "Monitor Arm", "Laptop Bag", "Backpack",
    "Microphone", "Audio Interface", "Studio Monitors", "MIDI Keyboard", "Guitar Cable",
    "Drumsticks", "Music Stand", "Headphone Amp", "Pop Filter", "Boom Arm",
    "Drawing Tablet", "Stylus Pen", "Art Prints", "Canvas Boards", "Paint Brushes",
    "Acrylic Paint", "Watercolor Set", "Sketchbook", "Easel", "Portfolio Case"
  ]

  // 10 product categories
  const categories = ["Audio", "Wearables", "Accessories", "Peripherals", "Displays", "Furniture", "Storage", "Components", "Music", "Art"]

  // 3 inventory statuses with strict typing
  const statuses: ("in_stock" | "low_stock" | "out_of_stock")[] = ["in_stock", "low_stock", "out_of_stock"]

  const products: Product[] = []

  // Generate 208 products (configurable for performance testing)
  for (let i = 1; i <= 208; i++) {
    // Cycle through product names (0-49), then repeat with versions
    const nameIndex = (i - 1) % productNames.length

    // Random category assignment
    const catIndex = Math.floor(Math.random() * categories.length)

    // Deterministic status pattern:
    // - Every 3rd product: out_of_stock (index 2)
    // - Every 5th product (not 3rd): low_stock (index 1)
    // - All others: in_stock (index 0)
    const statusIndex = i % 3 === 0 ? 2 : i % 5 === 0 ? 1 : 0

    products.push({
      // ID: PROD0001, PROD0002, ... PROD0208
      id: `PROD${String(i).padStart(4, '0')}`,

      // Name: "Wireless Headphones", "Smart Watch v2", etc.
      // Version number appears when cycling beyond first 50
      name: `${productNames[nameIndex]} ${Math.floor(i / productNames.length) > 0 ? 'v' + Math.ceil(i / productNames.length) : ''}`.trim(),

      // Random category
      category: categories[catIndex],

      // Price: £50.00 - £950.00 (2 decimal places)
      price: Math.round((Math.random() * 900 + 50) * 100) / 100,

      // Quantity logic based on status:
      // - out_of_stock: 0
      // - low_stock: 1-10 (random)
      // - in_stock: 1-150 (random)
      quantity: statuses[statusIndex] === "out_of_stock" ? 0 : statuses[statusIndex] === "low_stock" ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 150),

      // Status from deterministic pattern
      status: statuses[statusIndex],

      // All products share same server timestamp
      lastChecked: serverTime,
    })
  }

  return products
}
