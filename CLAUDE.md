# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a minimal Next.js 15.5.4 project demonstrating App Router patterns with TypeScript, React 19, and TailwindCSS 4. The project serves as a learning playground for exploring different rendering strategies (SSG, SSR, Client Components), loading states, dynamic routing, and data fetching patterns.

## Essential Commands

### Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Deployment
- `./go.sh` - Production deployment script that pulls latest changes, builds with timing, and starts the server

## Architecture

### Request Logging
- `middleware.ts` provides request logging for all routes
- Logs format: `ISO_timestamp - METHOD /path`
- Excludes: `/_next/static/*`, `/_next/image/*`, `/favicon.ico`, `*.svg`
- Useful for debugging route behavior and understanding request patterns

### Project Structure

#### Routes
All routes demonstrate different rendering strategies:

- **`/` (Home)** - `app/page.tsx`
  - Static generation (SSG) with `export const dynamic = 'force-static'`
  - Shows build time timestamp to demonstrate static generation
  - Console logs only appear at build time

- **`/about`** - `app/about/page.tsx`
  - Server-side rendering (SSR) with `export const dynamic = 'force-dynamic'`
  - Async component that shows current server time on each request
  - Has custom loading state (`app/about/loading.tsx`)
  - Console logs appear in server output on each request

- **`/client`** - `app/client/page.tsx`
  - Client component demo with `'use client'` directive
  - Interactive counter with state management
  - Shows browser time and handles client-side events
  - Console logs appear in browser console

- **`/posts`** - `app/posts/page.tsx`
  - Server component with SSR (`force-dynamic`)
  - Fetches posts from JSONPlaceholder API
  - Displays first 3 posts with timing logs
  - Demonstrates async data fetching in Server Components

- **`/contact`** - `app/contact/page.tsx`
  - Server component with SSR (`force-dynamic`)
  - Fetches posts from JSONPlaceholder API
  - Includes a Client Component button (`app/contact/button.tsx`)
  - Demonstrates mixing Server and Client Components

- **`/users`** - `app/users/page.tsx`
  - Server component with SSR (`force-dynamic`)
  - Fetches and displays user list from JSONPlaceholder API
  - Links to individual user detail pages with `prefetch={false}`
  - Shows fetch timing in console

- **`/users/[userId]`** - `app/users/[userId]/page.tsx`
  - Dynamic route with SSR (`force-dynamic`)
  - Fetches individual user data from JSONPlaceholder API
  - Uses `notFound()` for 404 handling when user doesn't exist
  - Demonstrates dynamic route parameters with async/await params

#### Special Files

- **`app/layout.tsx`** - Root layout
  - Loads Geist Sans and Geist Mono fonts
  - Navigation header with links to all routes (prefetch disabled on all links)
  - Global styling with TailwindCSS
  - Metadata configuration

- **`app/loading.tsx`** - Global loading UI
  - Spinner animation with centered layout
  - Used as fallback for routes without custom loading states

- **`app/about/loading.tsx`** - Route-specific loading
  - Custom loading state for `/about` route
  - Includes console log for debugging

- **`app/not-found.tsx`** - Custom 404 page
  - Handles non-existent routes
  - Clean error messaging

- **`app/contact/button.tsx`** - Client Component example
  - Simple interactive button with alert
  - Demonstrates client component as child of server component

#### Styling

- **`app/globals.css`** - Global styles
  - TailwindCSS imports with `@import "tailwindcss"`
  - Custom CSS variables for theming
  - Dark mode support via `prefers-color-scheme`
  - Font family configuration

### Configuration Files

- **`package.json`**
  - Next.js 15.5.4, React 19.1.1
  - Turbopack enabled for dev and build
  - TailwindCSS 4.1.13 with PostCSS integration
  - TypeScript 5.9.3 with strict mode

- **`next.config.ts`**
  - Minimal configuration (default Next.js config)

- **`tsconfig.json`**
  - Strict mode enabled
  - Path aliases: `@/*` maps to `./*`
  - Target: ES2017

- **`postcss.config.mjs`**
  - Single plugin: `@tailwindcss/postcss`
  - Required for TailwindCSS 4.x

- **`eslint.config.mjs`**
  - Flat config format (modern ESLint)
  - Next.js core-web-vitals and TypeScript presets
  - FlatCompat for compatibility

- **`middleware.ts`**
  - Request logging middleware
  - Uses matcher to exclude static assets
  - Logs timestamp, method, and pathname

## Key Patterns & Learnings

### Rendering Strategies

The project demonstrates all three rendering modes:

1. **Static Site Generation (SSG)**
   - Use `export const dynamic = 'force-static'` or omit async/await
   - Page rendered at build time
   - Best for content that doesn't change per request
   - Example: Home page (`/`)

2. **Server-Side Rendering (SSR)**
   - Use `export const dynamic = 'force-dynamic'`
   - Page rendered on each request
   - Best for dynamic content or personalized data
   - Examples: `/about`, `/posts`, `/users`, `/contact`

3. **Client-Side Rendering (CSR)**
   - Use `'use client'` directive
   - Interactive components with state and event handlers
   - Runs in the browser
   - Example: `/client` page, `/contact/button.tsx`

### Component Architecture

- **Server Components** (default): Most components are Server Components
- **Client Components**: Only when interactivity is needed (`'use client'`)
- **Composition**: Client Components can be children of Server Components (see `/contact`)
- **Data Fetching**: Async/await directly in Server Components (no `useEffect` needed)

### Loading States

- Global loading UI: `app/loading.tsx`
- Route-specific loading: `app/about/loading.tsx`
- Removed experiment: `app/users/loading.tsx` was tried and removed

### Dynamic Routes

- Pattern: `app/users/[userId]/page.tsx`
- Access params: `const { userId } = await params;` (params must be awaited in Next.js 15)
- 404 handling: Use `notFound()` from `next/navigation`

### Data Fetching

- Fetch directly in async Server Components
- JSONPlaceholder API used for demo data
- No explicit caching configuration (relies on Next.js defaults)
- `force-dynamic` ensures fresh data on each request

### Navigation

- All links use `prefetch={false}` to disable automatic prefetching
- Links in navigation demonstrate different component types in labels

## Development Notes

- **Package Manager**: pnpm (has `pnpm-workspace.yaml`)
- **Build Tool**: Turbopack for faster dev and build times
- **Console Logging**:
  - Server Components log to server console (visible in prod via middleware)
  - Client Components log to browser console
  - Static pages only log at build time
- **No Delays**: Artificial delays (2s setTimeout) were used for testing but removed
- **Custom 404**: `app/not-found.tsx` handles invalid routes

## Experimentation History

Based on git commits, this project has been used to explore:

- Loading states (global and route-specific)
- Adding/removing loading pages for different routes
- Testing artificial delays to observe loading UI
- Link prefetching behavior (disabled with `prefetch={false}`)
- Console.log behavior across SSG, SSR, and CSR
- Dynamic route parameters and 404 handling
- Mixing Server and Client Components

## References

- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing#dynamic-segments)
- [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
