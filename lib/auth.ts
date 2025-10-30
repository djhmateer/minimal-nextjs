/**
 * Better Auth Configuration
 *
 * This file sets up the Better Auth instance for server-side authentication.
 * Better Auth is a type-safe authentication library for Next.js that handles
 * user authentication, session management, and database operations.
 *
 * Key Components:
 *
 * 1. Database Integration:
 *    - Uses PostgreSQL connection pool from lib/db.ts
 *    - Better Auth creates and manages these tables:
 *      * user: Stores user accounts (id, name, email, emailVerified, image, createdAt, updatedAt)
 *      * session: Stores active sessions (id, expiresAt, token, createdAt, updatedAt, ipAddress, userAgent, userId)
 *      * account: Stores OAuth provider accounts (if OAuth is enabled)
 *      * verification: Stores email verification tokens
 *
 * 2. Authentication Methods:
 *    - Email/Password: Enabled via emailAndPassword config
 *    - OAuth: Not configured (can be added with providers like Google, GitHub)
 *
 * 3. Session Management:
 *    - Cookie-based sessions stored in PostgreSQL
 *    - Sessions are read/written via Better Auth API methods
 *    - Session cookies are automatically set by nextCookies plugin
 *
 * 4. nextCookies Plugin (CRITICAL):
 *    - Enables cookie setting in Next.js Server Actions
 *    - Without this plugin, Server Actions cannot set cookies
 *    - Uses Next.js's cookies() helper under the hood
 *    - Required for signIn/signOut Server Actions to work
 *
 * Environment Variables Required:
 * - BETTER_AUTH_SECRET: Secret key for signing tokens (generate with: openssl rand -base64 32)
 * - BETTER_AUTH_URL: Base URL of your app (e.g., http://localhost:3000)
 *
 * Usage:
 * - Import { auth } from '@/lib/auth' in Server Components and Server Actions
 * - Call auth.api.getSession() to read session
 * - Call auth.api.signInEmail() to authenticate user
 * - Call auth.api.signOut() to destroy session
 */

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { getPool } from "./db";

export const auth = betterAuth({
  // PostgreSQL connection pool for storing users, sessions, accounts, and verification tokens
  database: getPool(),

  // Enable email/password authentication
  emailAndPassword: {
    enabled: true,
  },

  // Secret key for signing JWT tokens (must be set in .env.local)
  secret: process.env.BETTER_AUTH_SECRET,

  // Base URL of the application (must match your domain in production)
  baseURL: process.env.BETTER_AUTH_URL,

  // Plugins extend Better Auth functionality
  plugins: [
    // nextCookies: REQUIRED for Server Actions to set cookies
    // This plugin automatically uses Next.js's cookies() helper to set session cookies
    // when Better Auth API methods return Set-Cookie headers
    nextCookies(),
  ],
});
