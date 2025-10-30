import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { getPool } from "./db";

export const auth = betterAuth({
  database: getPool(),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    nextCookies(), // Enables automatic cookie setting in Next.js Server Actions
  ],
});
