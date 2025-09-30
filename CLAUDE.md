# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a minimal Next.js 15.5.4 project using the App Router with TypeScript, React 19, and TailwindCSS. The project uses Turbopack for both development and production builds.

## Essential Commands

### Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Deployment
- `./go.sh` - Production deployment script that pulls latest changes, builds, and starts the server with timing

## Architecture

### Request Logging
- `middleware.ts` provides request logging and timing for all routes except static files and SVGs
- Logs format: `timestamp - METHOD /path - duration_ms`
- Excludes: `/_next/static/*`, `/_next/image/*`, `/favicon.ico`, `*.svg`

### Project Structure
- **App Router**: Uses Next.js 13+ app directory structure with `page.tsx` files
- **Components**: All components are Server Components (no `"use client"` directives)
- **Routes**:
  - `/` - Home page (`app/page.tsx`) - Static (SSG) with `force-static`
  - `/about` - About page (`app/about/page.tsx`)
- **Fonts**: Geist Sans and Geist Mono fonts via `next/font/google`
- **Styling**: TailwindCSS 4.x with PostCSS
- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to `./*`)

### Key Configuration
- **Package Manager**: pnpm (has pnpm-workspace.yaml)
- **Build Tool**: Turbopack (enabled for both dev and build)
- **ESLint**: Next.js config with modern flat config format
- **Middleware**: Custom request logging at `/middleware.ts`

## Development Notes

- The project uses React 19.1.0 with Next.js 15.5.4
- TailwindCSS 4.x is configured with PostCSS
- TypeScript paths are configured for absolute imports with `@/` prefix
- Custom deployment script `go.sh` includes build timing and git pull automation

### Rendering Strategy
- **Server Components**: All components are Server Components by default (no client-side interactivity)
- **Static Generation (SSG)**: Home page uses `export const dynamic = 'force-static'` to ensure static generation at build time
- **Dynamic Rendering Options**:
  - `'auto'` - Let Next.js decide based on async/await usage
  - `'force-static'` - Force static generation (SSG)
  - `'force-dynamic'` - Force server-side rendering on each request (SSR)
  - `'error'` - Force static and error on dynamic functions
- **Reference**: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic