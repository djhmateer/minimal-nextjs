// dev: Run this seeder with `pnpm seed:products`
// dev: Uses .env.development for local development
// prod: Uses .env.production for production

import { Pool } from 'pg';
import { config } from 'dotenv';

// Load environment variables from .env.development (dev) or .env.production (prod)
config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });

/**
 * Database Seed Script for Products Table
 *
 * Purpose: Create and populate products table for CRUD-D testing
 * Run: pnpm seed:products
 *
 * Schema:
 * - id: SERIAL PRIMARY KEY (auto-incrementing)
 * - name: VARCHAR(100) (product name with optional version)
 * - category: VARCHAR(50) (Audio, Wearables, etc.)
 * - price: DECIMAL(10,2) (price in GBP)
 * - status: VARCHAR(20) (in_stock, low_stock, out_of_stock)
 * - quantity: INTEGER (stock quantity)
 * - last_checked: TIMESTAMP (when stock was last checked)
 */

async function seedProducts() {
  // Validate required environment variables
  if (!process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_HOST || !process.env.POSTGRES_DATABASE) {
    throw new Error('Missing required PostgreSQL environment variables. Check .env.development (dev) or .env.production (prod) file.');
  }

  // Database connection using environment variables
  const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
  });

  try {
    console.log('Connecting to database...');

    // Drop and recreate products table
    console.log('Dropping existing products table if exists...');
    await pool.query('DROP TABLE IF EXISTS products');

    console.log('Creating products table...');
    await pool.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) NOT NULL CHECK (status IN ('in_stock', 'low_stock', 'out_of_stock')),
        quantity INTEGER NOT NULL CHECK (quantity >= 0),
        last_checked TIMESTAMP NOT NULL
      )
    `);

    console.log('Products table created successfully');

    // Generate 208 products (same logic as page.tsx)
    console.log('Generating 208 product records...');

    const serverTime = new Date();

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

    // Build insert values array
    const values: (string | number | Date)[] = [];
    const placeholders: string[] = [];
    let paramIndex = 1;

    for (let i = 1; i <= 208; i++) {
      const nameIndex = (i - 1) % productNames.length;
      const catIndex = Math.floor(Math.random() * categories.length);
      const statusIndex = i % 3 === 0 ? 2 : i % 5 === 0 ? 1 : 0;

      const name = `${productNames[nameIndex]} ${Math.floor(i / productNames.length) > 0 ? 'v' + Math.ceil(i / productNames.length) : ''}`.trim();
      const category = categories[catIndex];
      const price = Math.round((Math.random() * 900 + 50) * 100) / 100;
      const status = statuses[statusIndex];
      const quantity = status === "out_of_stock" ? 0 : status === "low_stock" ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 150);

      // Add values for this row
      values.push(name, category, price, status, quantity, serverTime);

      // Add placeholder group for this row ($1, $2, ... $6), ($7, $8, ... $12), etc.
      placeholders.push(`($${paramIndex}, $${paramIndex+1}, $${paramIndex+2}, $${paramIndex+3}, $${paramIndex+4}, $${paramIndex+5})`);
      paramIndex += 6;
    }

    // Insert all products in a single query for performance
    console.log('Inserting 208 products into database...');
    const insertQuery = `
      INSERT INTO products (name, category, price, status, quantity, last_checked)
      VALUES ${placeholders.join(', ')}
    `;

    await pool.query(insertQuery, values);

    console.log('Successfully inserted 208 products');

    // Verify insertion
    const countResult = await pool.query('SELECT COUNT(*) FROM products');
    console.log(`Total products in database: ${countResult.rows[0].count}`);

    // Show sample of inserted data
    const sampleResult = await pool.query('SELECT id, name, category, price, status, quantity FROM products LIMIT 5');
    console.log('\nSample products:');
    console.table(sampleResult.rows);

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await pool.end();
    console.log('\nDatabase connection closed');
  }
}

// Run seed script
seedProducts()
  .then(() => {
    console.log('Seed completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
