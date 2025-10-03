# Minimal Next.js

A minimal Next.js 15.5.4 project demonstrating App Router patterns, rendering strategies, and modern React 19 features.

## Overview

This project serves as a learning playground for exploring Next.js App Router concepts including:
- Static Site Generation (SSG)
- Server-Side Rendering (SSR)
- Client Components
- Dynamic routing
- Loading states
- Data fetching patterns

## Tech Stack

- **Next.js** 15.5.4 with App Router
- **React** 19.1.1
- **TypeScript** 5.9.3
- **TailwindCSS** 4.1.13
- **Turbopack** (dev & build)
- **pnpm** package manager

## Getting Started

### Prerequisites
- Node.js (compatible with Next.js 15)
- pnpm

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
└── users/
    ├── page.tsx           # Users list (SSR + API fetch)
    └── [userId]/
        └── page.tsx       # User detail (dynamic route)
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
Used in `/about`, `/posts`, `/users`, `/contact` - renders on each request.

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

## Learning Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

## License

This is a personal learning project.
