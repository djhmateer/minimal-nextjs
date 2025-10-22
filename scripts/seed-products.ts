// dev: pnpm seed:products
// prod: NODE_ENV=production pnpm seed:products

import { config } from 'dotenv';
import { createPgClient } from '../lib/db';

config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });

const client = createPgClient();

const productNames = [
  "Premium Wireless Noise-Cancelling Headphones with Bluetooth 5.0 Technology",
  "Advanced Smart Watch with Heart Rate Monitor and GPS Tracking System",
  "Ergonomic Adjustable Aluminum Laptop Stand with Cooling Ventilation",
  "Professional Mechanical Gaming Keyboard with RGB Backlighting and Custom Switches",
  "Multi-Port USB-C Hub with Power Delivery and 4K Display Support",
  "Precision Wireless Gaming Mouse with Programmable Buttons and DPI Control",
  "Ultra HD 4K Monitor with HDR Support and Wide Color Gamut Display",
  "High Definition Webcam with Auto-Focus and Built-in Dual Microphone Array",
  "Professional Gaming Chair with Lumbar Support and Adjustable Armrests",
  "Electric Height-Adjustable Standing Desk with Memory Presets and Cable Management",
  "Portable Bluetooth Speaker with 360-Degree Sound and Waterproof Design",
  "Professional Tablet with Stylus Support and High-Resolution Display Screen",
  "Protective Phone Case with Military-Grade Drop Protection and Wireless Charging",
  "Tempered Glass Screen Protector with Oleophobic Coating and Easy Installation",
  "Braided Fast Charging Cable with Reinforced Connectors and 6ft Length",
  "Wireless Charging Pad with Fast Charging Technology and LED Indicator Lights",
  "Portable External Solid State Drive with USB 3.1 and Shock Resistant Casing",
  "High-Performance DDR4 RAM Module with Heat Spreader and XMP Support",
  "Advanced Graphics Card with Ray Tracing and DLSS Technology Support",
  "Tower CPU Cooler with Dual Fans and Heat Pipe Technology Design",
  "Premium Gaming Motherboard with RGB Lighting and Advanced Cooling Solutions",
  "Modular Power Supply with 80+ Gold Certification and Silent Operation",
  "Tempered Glass PC Case with RGB Fans and Tool-Less Design Features",
  "Addressable RGB LED Strip with Remote Control and Music Sync Capability",
  "Professional Cable Management Kit with Velcro Straps and Wire Clips",
  "Extended Gaming Desk Mat with Non-Slip Rubber Base and Stitched Edges",
  "Memory Foam Keyboard Wrist Rest with Ergonomic Design and Cooling Gel",
  "Dual Monitor Arm Mount with Gas Spring and Cable Management System",
  "Water-Resistant Laptop Bag with Multiple Compartments and Padded Protection",
  "Professional Backpack with TSA-Friendly Design and USB Charging Port",
  "Professional Studio Condenser Microphone with Shock Mount and Pop Filter",
  "USB Audio Interface with Multiple Inputs and Low-Latency Monitoring",
  "Professional Studio Monitor Speakers with Acoustic Tuning and Balanced Inputs",
  "49-Key MIDI Keyboard Controller with Velocity-Sensitive Keys and Drum Pads",
  "Premium Instrument Cable with Gold-Plated Connectors and Oxygen-Free Copper",
  "Professional Hickory Drumsticks with Wood Tip and Balanced Weight Distribution",
  "Adjustable Music Stand with Carrying Bag and Non-Slip Rubber Feet",
  "Professional Headphone Amplifier with Multiple Outputs and EQ Controls",
  "Professional Pop Filter with Dual Layer Mesh and Flexible Gooseneck Mount",
  "Heavy-Duty Boom Arm with Internal Cable Management and 360-Degree Rotation",
  "Professional Drawing Tablet with Pressure Sensitivity and Express Keys",
  "Active Stylus Pen with Palm Rejection and Rechargeable Battery Technology",
  "Limited Edition Art Prints on Museum-Quality Paper with Archival Inks",
  "Professional Canvas Boards with Triple-Primed Surface and Gallery Wrap",
  "Artist Paint Brush Set with Natural and Synthetic Bristles in Various Sizes",
  "Professional Acrylic Paint Set with Vibrant Colors and High Pigmentation",
  "Premium Watercolor Set with Pan Colors and Mixing Palette Included",
  "Artist Sketchbook with Heavyweight Paper and Hardbound Cover Design",
  "Adjustable Studio Easel with Tilting Mechanism and Canvas Holder",
  "Professional Portfolio Case with Waterproof Exterior and Padded Interior"
];

const categories = [
  "Professional Audio Equipment",
  "Smart Wearable Technology",
  "Premium Computer Accessories",
  "Gaming Peripherals and Hardware",
  "High-Resolution Display Systems",
  "Ergonomic Office Furniture",
  "Data Storage Solutions",
  "Computer Components and Parts",
  "Musical Instruments and Equipment",
  "Professional Art Supplies"
];
const statuses = ["in_stock", "low_stock", "out_of_stock"] as const;

async function seed() {
  try {
    await client.connect();

    // Drop and recreate table
    await client.query('DROP TABLE IF EXISTS products');
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) NOT NULL,
        quantity INTEGER NOT NULL,
        last_checked TIMESTAMP NOT NULL
      )
    `);

    // Generate products in batches
    const timestamp = new Date();
    const totalProducts = 1000000;
    const batchSize = 5000;
    let inserted = 0;

    for (let batch = 0; batch < Math.ceil(totalProducts / batchSize); batch++) {
      const values: (string | number | Date)[] = [];
      const placeholders: string[] = [];
      let idx = 1;

      const start = batch * batchSize;
      const end = Math.min(start + batchSize, totalProducts);

      for (let i = start; i < end; i++) {
        const nameIndex = i % productNames.length;
        const versionNum = Math.floor(i / productNames.length);
        const name = versionNum > 0 ? `${productNames[nameIndex]} Model ${versionNum}` : productNames[nameIndex];
        const category = categories[i % categories.length];
        const price = Math.round((Math.random() * 900 + 50) * 100) / 100;
        const statusIndex = i % 3 === 0 ? 2 : i % 5 === 0 ? 1 : 0;
        const status = statuses[statusIndex];
        const quantity = status === "out_of_stock" ? 0 : status === "low_stock" ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 150);

        values.push(name, category, price, status, quantity, timestamp);
        placeholders.push(`($${idx}, $${idx+1}, $${idx+2}, $${idx+3}, $${idx+4}, $${idx+5})`);
        idx += 6;
      }

      await client.query(
        `INSERT INTO products (name, category, price, status, quantity, last_checked) VALUES ${placeholders.join(', ')}`,
        values
      );

      inserted += (end - start);
      console.log(`Inserted ${inserted} / ${totalProducts} products...`);
    }

    console.log('Seeded 1,000,000 products');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await client.end();
  }
}

seed();
