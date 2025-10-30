# Minimal Next.js

A minimal Next.js 15.5.4 project demonstrating App Router patterns, rendering strategies, and modern React 19 features.

## Technology Overview & Rationale

This project uses a carefully selected modern tech stack designed for learning and performance:

- **Next.js 15.5.4 (App Router)** - Latest version with App Router for server-first architecture, built-in optimizations, and file-based routing
- **React 19.2.0** - Latest React with improved Server Components, async/await support, and performance enhancements
- **TypeScript 5.9.3** - Type safety, better developer experience, and catch errors at compile time
- **Turbopack** - Next-generation bundler (successor to Webpack) for faster dev server and builds
- **TailwindCSS 4.1.14** - Utility-first CSS framework with v4's improved performance and new `@theme` directive
- **Better Auth v1.3.34** - Type-safe authentication library with email/password auth and session management
- **PostgreSQL (via pg 8.16.3)** - Production-ready relational database for persistent data storage
- **pnpm** - Fast, disk space efficient package manager with strict node_modules structure
- **ESLint** - Code quality and consistency (planned migration to Biome for faster linting)

### Why These Choices?

- **App Router over Pages Router**: Better performance with Server Components, streaming, and built-in data fetching
- **Turbopack over Webpack**: 10x faster cold starts, incremental builds, and better caching
- **TailwindCSS 4.x over 3.x**: Native CSS layer support, better performance, smaller bundle sizes
- **Better Auth**: Type-safe, modern auth solution with excellent Next.js integration and server-side support
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
- Authentication with Better Auth (email/password, sessions, protected routes)

## Tech Stack

- **Next.js** 15.5.4 with App Router
- **React** 19.2.0
- **TypeScript** 5.9.3
- **TailwindCSS** 4.1.14
- **Better Auth** v1.3.34
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
├── layout.tsx              # Root layout with navigation + auth status
├── page.tsx                # Home page with patterns overview (SSR)
├── loading.tsx             # Global loading UI
├── not-found.tsx           # Custom 404 page
├── globals.css             # Global styles
├── sign-out-button.tsx     # Client Component for sign out
├── actions/
│   └── auth.ts            # Global auth actions (signOut)
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
├── dbtest/
│   └── page.tsx           # PostgreSQL connection test
├── register/
│   ├── page.tsx           # Registration page (SSR)
│   ├── register-form.tsx  # Client Component for registration form
│   └── actions.ts         # Server Action for registration (signUp)
├── login/
│   ├── page.tsx           # Login page (SSR)
│   ├── login-form.tsx     # Client Component for login form
│   └── actions.ts         # Server Action for login (signIn)
└── protectedpage/
    └── page.tsx           # Protected route requiring authentication

lib/
├── auth.ts                # Better Auth configuration
└── db.ts                  # PostgreSQL connection pool
```

## Routes

| Route | Type | Rendering | Description |
|-------|------|-----------|-------------|
| `/` | Server Component | SSR | Home page with Next.js patterns overview (public, no auth required) |
| `/about` | Server Component | SSR | Server-rendered page with request timestamp |
| `/client` | Client Component | CSR | Interactive page with state and events |
| `/posts` | Server Component | SSR | Fetches posts from API on each request (3 posts) |
| `/contact` | Server Component | SSR | Demonstrates Server + Client Component composition (2 posts) |
| `/users` | Server Component | SSR | User list with links to detail pages |
| `/users/[userId]` | Server Component | SSR | Dynamic route with 404 handling |
| `/dbtest` | Server Component | SSR | PostgreSQL connection test with table listing |
| `/register` | Server Component | SSR | User registration with Better Auth |
| `/login` | Server Component | SSR | User login with callback URL support |
| `/protectedpage` | Server Component | SSR | Protected route requiring authentication |

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

Excludes static assets (`/_next/static`, `/_next/image`, `favicon.ico`, `*.svg`).

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

## Authentication with Better Auth

This project implements a complete authentication system using [Better Auth v1.3.34](https://www.better-auth.com/), a modern, type-safe authentication library for Next.js.

### Architecture Overview

**Authentication Flow:**
```
User Request → Server Component → Better Auth Session Check → Render/Redirect
                                         ↓
                                 PostgreSQL Database
                                  (users, sessions)
```

**Sign In Flow:**
```
1. User enters credentials in /login
2. Form submits to signInAction (Server Action)
3. signInAction validates input
4. Better Auth verifies credentials against PostgreSQL
5. Better Auth creates session in database
6. nextCookies plugin sets session cookie
7. User redirected to protected page or home
```

### Key Components

#### 1. Better Auth Configuration (`lib/auth.ts`)

The core Better Auth instance configured with:

- **Database**: PostgreSQL connection pool for storing users and sessions
- **Email/Password Auth**: Enabled for traditional username/password login
- **nextCookies Plugin**: **Critical** - Enables cookie setting in Server Actions
- **Session Management**: Cookie-based sessions with automatic expiration

**Environment Variables Required:**
```env
BETTER_AUTH_SECRET=your-secret-key-here  # Generate with: openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:3000    # Your app URL
```

#### 2. Database Tables

Better Auth automatically creates and manages these tables:

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `user` | User accounts | id, name, email, emailVerified, createdAt, updatedAt |
| `session` | Active sessions | id, token, expiresAt, userId, ipAddress, userAgent |
| `account` | OAuth providers | id, userId, providerId (not used yet) |
| `verification` | Email verification | id, identifier, value, expiresAt |

#### 3. Server Actions (Colocated with Routes)

Authentication operations are handled by Server Actions colocated with their routes:

**signUpAction** (`app/register/actions.ts`):
- Validates name (min 2 chars), email format, password (min 8 chars)
- Calls `auth.api.signUpEmail()` to create user in database
- Redirects to login page with success message

**signInAction** (`app/login/actions.ts`):
- Validates email format and password length
- Calls `auth.api.signInEmail()` to verify credentials
- Sets session cookie via nextCookies plugin
- Redirects to callback URL or home page

**signOutAction** (`app/actions/auth.ts`):
- Global action used from layout and sign-out button
- Calls `auth.api.signOut()` to invalidate session
- Clears session cookie
- Redirects to login page

#### 4. Authentication Routes

| Route | Purpose | Protection |
|-------|---------|-----------|
| `/register` | Create new account | Redirects to home if already logged in |
| `/login` | Sign in to existing account | Redirects to home if already logged in |
| `/protectedpage` | Protected content | Redirects to login if not authenticated |

#### 5. Protected Page Pattern

The `/protectedpage` route demonstrates server-side authentication protection:

```typescript
export default async function ProtectedPage() {
  // Get session from Better Auth
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login?callbackUrl=/protectedpage');
  }

  // Render protected content
  return <div>Hello Secret</div>;
}
```

**Callback URL Flow:**
1. User visits `/protectedpage` without being logged in
2. Page redirects to `/login?callbackUrl=/protectedpage`
3. Login page shows "Please log in to access this page"
4. After successful login, user is redirected back to `/protectedpage`

#### 6. Layout Integration (`app/layout.tsx`)

The root layout checks authentication status and displays:
- **Logged in**: User's name + Sign Out button
- **Logged out**: Log in + Register buttons

```typescript
const session = await auth.api.getSession({
  headers: await headers(),
});

{session ? (
  <><span>{session.user.name}</span><SignOutButton /></>
) : (
  <><Link href="/login">Log in</Link><Link href="/register">Register</Link></>
)}
```

### How It Works: Technical Deep Dive

#### Cookie Management with nextCookies Plugin

The `nextCookies` plugin is **essential** for Server Actions to work with Better Auth:

**Without nextCookies:**
- Server Actions cannot set cookies (Next.js limitation)
- Better Auth returns `Set-Cookie` header but it's not applied
- User authentication fails silently

**With nextCookies:**
- Plugin intercepts Better Auth responses
- Automatically calls Next.js's `cookies().set()` helper
- Session cookie is properly set and sent to browser

#### Session Lifecycle

**Session Creation:**
1. `signInAction` calls `auth.api.signInEmail()`
2. Better Auth verifies credentials in PostgreSQL
3. Better Auth creates session record in `session` table
4. Better Auth generates signed session token
5. nextCookies plugin sets cookie: `better-auth.session_token=...`
6. Browser stores cookie and sends it with subsequent requests

**Session Validation:**
1. Browser sends cookie with request headers
2. `auth.api.getSession({ headers })` extracts cookie
3. Better Auth verifies signature and checks expiration
4. Better Auth queries `session` table in PostgreSQL
5. Returns session object with user data or null

**Session Destruction:**
1. `signOutAction` calls `auth.api.signOut({ headers })`
2. Better Auth deletes session record from database
3. Better Auth sends `Set-Cookie` header to clear cookie
4. nextCookies plugin applies cookie deletion

#### Why Server-Side Only?

This implementation uses **pure server-side authentication** (no client-side auth hooks):

**Advantages:**
- No JavaScript required for authentication (progressive enhancement)
- Session validation happens on server (more secure)
- No auth state synchronization issues
- Simpler mental model (no client/server state drift)
- Better SEO (auth-dependent content rendered on server)

**Trade-offs:**
- Full page reloads for auth operations (acceptable for most apps)
- No optimistic UI updates (not needed for login/logout)

### Security Features

- **Hashed Passwords**: Better Auth automatically hashes passwords with bcrypt
- **Signed Cookies**: Session tokens are cryptographically signed
- **HTTP-Only Cookies**: Session cookies not accessible via JavaScript (prevents XSS)
- **Secure Cookies**: Cookies only sent over HTTPS in production
- **Session Expiration**: Sessions automatically expire after inactivity
- **CSRF Protection**: Built into Better Auth (checked on mutations)

### Console Logging

All auth operations include detailed logging for debugging:

```
[signInAction] Starting sign in process
[signInAction] Sign in attempt for email: user@example.com
[signInAction] Calling Better Auth signInEmail API
[signInAction] Sign in successful for: user@example.com
[signInAction] Session cookie set by Better Auth nextCookies plugin
[signInAction] Revalidating path to update cache
[signInAction] Redirecting to: /
```

View logs in terminal where Next.js dev server is running.

### Common Patterns

#### Check auth in Server Component:
```typescript
const session = await auth.api.getSession({ headers: await headers() });
if (session) {
  // User is logged in: session.user.email, session.user.name
}
```

#### Protect a route:
```typescript
if (!session) {
  redirect('/login?callbackUrl=' + currentPath);
}
```

#### Sign out from Client Component:
```typescript
'use client';
import { signOutAction } from '@/app/actions/auth';

export function SignOutButton() {
  return (
    <button onClick={() => signOutAction()}>
      Sign Out
    </button>
  );
}
```

### Troubleshooting

**Sign in doesn't work / cookies not set:**
- Verify `nextCookies()` plugin is in `lib/auth.ts`
- Check `BETTER_AUTH_SECRET` is set in `.env.local`
- Check `BETTER_AUTH_URL` matches your domain

**"NEXT_REDIRECT" error in console:**
- This is normal! `redirect()` throws this error by design
- Always call `redirect()` outside try-catch blocks

**Session not persisting:**
- Check database connection is working
- Verify `session` table exists in PostgreSQL
- Check browser cookies (should see `better-auth.session_token`)

### Database Schema

Better Auth creates tables automatically on first use. To manually inspect:

```sql
-- List all Better Auth tables
\dt

-- View users
SELECT * FROM "user";

-- View active sessions
SELECT * FROM session;

-- Check session expiration
SELECT id, "userId", "expiresAt", "createdAt"
FROM session
WHERE "expiresAt" > NOW();
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

### Immediate Next Step

**TODO: Integrate shadcn/ui**

Follow these steps to add shadcn/ui to the project:

1. Initialize shadcn/ui:
   ```bash
   pnpm dlx shadcn@latest init
   ```

2. During setup, choose:
   - Style: **Default**
   - Base color: **Slate** (or your preference)
   - CSS variables: **Yes**
   - Components location: `components/ui`

3. Add your first component:
   ```bash
   pnpm dlx shadcn@latest add button
   ```

4. Replace the hardcoded button in `app/contact/button.tsx` with the shadcn Button component

5. Continue adding components as needed (Card, Input, Dialog, etc.)

### Completed Features

✅ **Authentication** - Fully implemented with Better Auth v1.3.34
   - Email/password authentication
   - Session management with PostgreSQL
   - Protected routes with callback URL support
   - Server Actions for sign up, sign in, sign out
   - See [Authentication with Better Auth](#authentication-with-better-auth) section for details

### Planned Additions

1. **UI Components**
   - Add [shadcn/ui](https://ui.shadcn.com/) for accessible, customizable components
   - Explore [TweakCN](https://tweakcn.com/) for component variations and theming

2. **Enhanced Authentication**
   - Add OAuth providers (Google, GitHub)
   - Email verification
   - Password reset functionality
   - Multi-factor authentication (MFA)

3. **Tooling Migration**
   - Replace ESLint with [Biome](https://biomejs.dev/) for faster linting and formatting
   - Unified toolchain for better performance

## Learning Resources

### Next.js & React
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

### Authentication
- [Better Auth Documentation](https://www.better-auth.com/)
- [Better Auth GitHub](https://github.com/better-auth/better-auth)
- [Better Auth Next.js Integration](https://www.better-auth.com/docs/integrations/next-js)

### Database
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres (pg)](https://node-postgres.com/)

## License

This is a personal learning project.
