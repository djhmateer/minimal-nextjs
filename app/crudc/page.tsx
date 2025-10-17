import { DataTable } from "./data-table"

export const dynamic = 'force-dynamic'

export default async function CrudPageC() {
  const data = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">CRUD-C - Products - Testing Performance ({data.length} rows)</h1>
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
  const serverTime = new Date().toISOString()

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

  const categories = ["Audio", "Wearables", "Accessories", "Peripherals", "Displays", "Furniture", "Storage", "Components", "Music", "Art"]
  const statuses: ("in_stock" | "low_stock" | "out_of_stock")[] = ["in_stock", "low_stock", "out_of_stock"]

  const products: Product[] = []

  for (let i = 1; i <= 208; i++) {
    const nameIndex = (i - 1) % productNames.length
    const catIndex = Math.floor(Math.random() * categories.length)
    const statusIndex = i % 3 === 0 ? 2 : i % 5 === 0 ? 1 : 0

    products.push({
      id: `PROD${String(i).padStart(4, '0')}`,
      name: `${productNames[nameIndex]} ${Math.floor(i / productNames.length) > 0 ? 'v' + Math.ceil(i / productNames.length) : ''}`.trim(),
      category: categories[catIndex],
      price: Math.round((Math.random() * 900 + 50) * 100) / 100,
      quantity: statuses[statusIndex] === "out_of_stock" ? 0 : statuses[statusIndex] === "low_stock" ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 150),
      status: statuses[statusIndex],
      lastChecked: serverTime,
    })
  }

  return products
}
