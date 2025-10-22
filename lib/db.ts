import { Client } from 'pg'

export function createPgClient() {
  if (!process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_HOST || !process.env.POSTGRES_DATABASE) {
    throw new Error('Missing required PostgreSQL environment variables. Check .env.development (dev) or .env.production (prod) file.');
  }

  return new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
  })
}
