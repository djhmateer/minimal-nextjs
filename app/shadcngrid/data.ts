// Define the data type
export type Product = {
  id: string
  name: string
  category: string
  price: number
  status: "in_stock" | "low_stock" | "out_of_stock"
  quantity: number
  lastChecked: string // ISO string format for server/client serialization
}

// Simulated database call - replace this with actual database query
export async function getProducts(): Promise<Product[]> {
  // Simulate network delay
  // await new Promise((resolve) => setTimeout(resolve, 100))

  // Get current server time (this runs on the server, not client)
  // Convert to ISO string for proper serialization across server/client boundary
  const serverTime = new Date().toISOString()

  return [
    {
      id: "PROD001",
      name: "Wireless Headphones",
      category: "Audio",
      price: 299.99,
      quantity: 45,
      status: "in_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD002",
      name: "Smart Watch",
      category: "Wearables",
      price: 399.99,
      quantity: 12,
      status: "low_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD003",
      name: "Laptop Stand",
      category: "Accessories",
      price: 79.99,
      quantity: 0,
      status: "out_of_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD004",
      name: "Mechanical Keyboard",
      category: "Peripherals",
      price: 149.99,
      quantity: 67,
      status: "in_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD005",
      name: "USB-C Hub",
      category: "Accessories",
      price: 59.99,
      quantity: 8,
      status: "low_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD006",
      name: "Wireless Mouse",
      category: "Peripherals",
      price: 49.99,
      quantity: 120,
      status: "in_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD007",
      name: "4K Monitor",
      category: "Displays",
      price: 599.99,
      quantity: 23,
      status: "in_stock",
      lastChecked: serverTime,
    },
    {
      id: "PROD008",
      name: "Webcam HD",
      category: "Peripherals",
      price: 89.99,
      quantity: 5,
      status: "low_stock",
      lastChecked: serverTime,
    },
  ]
}
