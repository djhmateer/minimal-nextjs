# Minimal Next.js

A minimal Next.js 15.5.4 project demonstrating App Router patterns, rendering strategies, and modern React 19 features.

## Technology Overview & Rationale

This project uses a carefully selected modern tech stack designed for learning and performance:

- **Next.js 15.5.4 (App Router)** - Latest version with App Router for server-first architecture, built-in optimizations, and file-based routing
- **React 19.2.0** - Latest React with improved Server Components, async/await support, and performance enhancements
- **TypeScript 5.9.3** - Type safety, better developer experience, and catch errors at compile time
- **Turbopack** - Next-generation bundler (successor to Webpack) for faster dev server and builds
- **TailwindCSS 4.1.14** - Utility-first CSS framework with v4's improved performance and new `@theme` directive
- **PostgreSQL (via pg 8.16.3)** - Production-ready relational database for persistent data storage
- **pnpm** - Fast, disk space efficient package manager with strict node_modules structure
- **ESLint** - Code quality and consistency (planned migration to Biome for faster linting)

### Why These Choices?

- **App Router over Pages Router**: Better performance with Server Components, streaming, and built-in data fetching
- **Turbopack over Webpack**: 10x faster cold starts, incremental builds, and better caching
- **TailwindCSS 4.x over 3.x**: Native CSS layer support, better performance, smaller bundle sizes
- **PostgreSQL**: Industry-standard relational database, ACID compliance, excellent for learning SQL
- **pnpm over npm/yarn**: Faster installs, saves disk space, prevents phantom dependencies

## Overview

This project serves as a learning playground for exploring Next.js App Router concepts including:
- Static Site Generation (SSG)
- Server-Side Rendering (SSR)
- Client Components
- Dynamic routing
- Loading states
- Data fetching patterns
- PostgreSQL database integration

## Tech Stack

- **Next.js** 15.5.4 with App Router
- **React** 19.2.0
- **TypeScript** 5.9.3
- **TailwindCSS** 4.1.14
- **PostgreSQL** with node-postgres (pg)
- **Turbopack** (dev & build)
- **pnpm** package manager

## Getting Started

### Prerequisites
- Node.js (compatible with Next.js 15)
- pnpm
- PostgreSQL server running locally

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
pnpm build
```

### Production

```bash
pnpm start
```

Or use the deployment script:

```bash
./go.sh
```

This script pulls latest changes, builds the project with timing, and starts the production server.

## Project Structure

```
app/
├── layout.tsx              # Root layout with navigation
├── page.tsx                # Home (SSG)
├── loading.tsx             # Global loading UI
├── not-found.tsx           # Custom 404 page
├── globals.css             # Global styles
├── about/
│   ├── page.tsx           # About page (SSR)
│   └── loading.tsx        # Custom loading for /about
├── client/
│   └── page.tsx           # Client Component demo
├── posts/
│   └── page.tsx           # Posts list (SSR + API fetch)
├── contact/
│   ├── page.tsx           # Contact page (SSR + API fetch)
│   └── button.tsx         # Client Component button
├── users/
│   ├── page.tsx           # Users list (SSR + API fetch)
│   └── [userId]/
│       └── page.tsx       # User detail (dynamic route)
└── dbtest/
    └── page.tsx           # PostgreSQL connection test
```

## Routes

| Route | Type | Rendering | Description |
|-------|------|-----------|-------------|
| `/` | Server Component | SSG | Static home page with build timestamp |
| `/about` | Server Component | SSR | Server-rendered page with request timestamp |
| `/client` | Client Component | CSR | Interactive page with state and events |
| `/posts` | Server Component | SSR | Fetches posts from API on each request |
| `/contact` | Server Component | SSR | Demonstrates Server + Client Component composition |
| `/users` | Server Component | SSR | User list with links to detail pages |
| `/users/[userId]` | Server Component | SSR | Dynamic route with 404 handling |
| `/dbtest` | Server Component | SSR | PostgreSQL connection test with table listing |

## Key Features

### Rendering Strategies

**Static Site Generation (SSG)**
```typescript
export const dynamic = 'force-static'
```
Used in home page - renders at build time.

**Server-Side Rendering (SSR)**
```typescript
export const dynamic = 'force-dynamic'
```
Used in `/about`, `/posts`, `/users`, `/contact`, `/dbtest` - renders on each request.

**Client-Side Rendering (CSR)**
```typescript
'use client'
```
Used in `/client` and `/contact/button.tsx` - runs in browser for interactivity.

### Data Fetching

Server Components can fetch data directly with async/await:

```typescript
export default async function Posts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();
  return <div>{/* render posts */}</div>
}
```

### Database Integration

PostgreSQL connection using the `pg` library:

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  user: 'bob',
  password: 'password',
  host: 'localhost',
  database: 'minimal_nextjs',
  port: 5432,
});

const result = await pool.query('SELECT * FROM users');
```

The `/dbtest` route demonstrates:
- PostgreSQL connection testing
- Querying system tables to list all tables
- Selecting data from the `users` table
- Error handling for database operations

### Loading States

- **Global**: `app/loading.tsx` - Spinner animation
- **Route-specific**: `app/about/loading.tsx` - Custom loading UI

### Middleware

Request logging middleware (`middleware.ts`) logs all route requests to console:
```
2025-10-03T10:30:45.123Z - GET /about
```

Excludes static assets (`/_next/static`, images, SVGs).

## API Integration

The project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for demo data:
- `/posts` - Fetches posts
- `/users` - Fetches user list
- `/users/[userId]` - Fetches individual user details

## Database Setup

### PostgreSQL Configuration

The project connects to a local PostgreSQL database:
- **Database**: `minimal_nextjs`
- **User**: `bob` with password `password`
- **Tables**: `users` table with `id` and `name` columns

### Create Database and Table

```sql
CREATE DATABASE minimal_nextjs;

\c minimal_nextjs

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

INSERT INTO users (name) VALUES ('Alice'), ('Bob'), ('Charlie');
```

## Console Logging Behavior

- **SSG pages** (`/`): Logs only appear at build time
- **SSR pages** (`/about`, `/posts`, etc.): Logs appear in server console on each request
- **Client pages** (`/client`): Logs appear in browser console

## Configuration

- **TypeScript**: Strict mode, path aliases (`@/*`)
- **ESLint**: Flat config format with Next.js presets
- **TailwindCSS**: v4.x with PostCSS integration
- **Dark Mode**: Automatic via `prefers-color-scheme`

## Navigation

All navigation links use `prefetch={false}` to disable automatic prefetching for demonstration purposes.

## Custom 404

Invalid routes display a custom 404 page (`app/not-found.tsx`). The `/users/[userId]` route also uses `notFound()` for non-existent users.

## Next Steps & Roadmap

### Planned Additions

1. **UI Components**
   - Add [shadcn/ui](https://ui.shadcn.com/) for accessible, customizable components
   - Explore [TweakCN](https://tweakcn.com/) for component variations and theming

2. **Authentication**
   - Implement [Better Auth](https://www.better-auth.com/) for modern, type-safe authentication
   - Add user sessions, login/logout, protected routes

3. **Tooling Migration**
   - Replace ESLint with [Biome](https://biomejs.dev/) for faster linting and formatting
   - Unified toolchain for better performance

## Learning Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres (pg)](https://node-postgres.com/)

## License

This is a personal learning project.
