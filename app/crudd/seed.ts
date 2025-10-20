// dev: pnpm seed:products
// prod: NODE_ENV=production pnpm seed:products

import { Pool } from 'pg';
import { config } from 'dotenv';

config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
});

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
];

const categories = ["Audio", "Wearables", "Accessories", "Peripherals", "Displays", "Furniture", "Storage", "Components", "Music", "Art"];
const statuses = ["in_stock", "low_stock", "out_of_stock"] as const;

async function seed() {
  try {
    // Drop and recreate table
    await pool.query('DROP TABLE IF EXISTS products');
    await pool.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) NOT NULL,
        quantity INTEGER NOT NULL,
        last_checked TIMESTAMP NOT NULL
      )
    `);

    // Generate products
    const timestamp = new Date();
    const values: (string | number | Date)[] = [];
    const placeholders: string[] = [];
    let idx = 1;

    for (let i = 1; i <= 1208; i++) {
      const nameIndex = (i - 1) % productNames.length;
      const name = `${productNames[nameIndex]} ${Math.floor(i / productNames.length) > 0 ? 'v' + Math.ceil(i / productNames.length) : ''}`.trim();
      const category = categories[Math.floor(Math.random() * categories.length)];
      const price = Math.round((Math.random() * 900 + 50) * 100) / 100;
      const statusIndex = i % 3 === 0 ? 2 : i % 5 === 0 ? 1 : 0;
      const status = statuses[statusIndex];
      const quantity = status === "out_of_stock" ? 0 : status === "low_stock" ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 150);

      values.push(name, category, price, status, quantity, timestamp);
      placeholders.push(`($${idx}, $${idx+1}, $${idx+2}, $${idx+3}, $${idx+4}, $${idx+5})`);
      idx += 6;
    }

    // Insert all products
    await pool.query(
      `INSERT INTO products (name, category, price, status, quantity, last_checked) VALUES ${placeholders.join(', ')}`,
      values
    );

    console.log('Seeded products');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

seed();
