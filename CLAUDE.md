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
- **App Router**: Uses Next.js 13+ app directory structure
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