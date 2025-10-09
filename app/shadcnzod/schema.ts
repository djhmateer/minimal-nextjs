/**
 * Shared Zod Schema for Contact Form
 *
 * This schema is used by BOTH client and server:
 * - Client: React Hook Form validation via zodResolver
 * - Server: Server Action validation for security
 *
 * Benefits of Zod:
 * - Single source of truth (DRY - Don't Repeat Yourself)
 * - Type-safe: Auto-generates TypeScript types
 * - Runtime validation on both client and server
 * - Consistent error messages
 * - Easy to maintain (change once, updates everywhere)
 */

import { z } from "zod"

/**
 * Contact Form Schema
 *
 * Validation Rules:
 * - Name: 2-100 characters, required
 * - Email: Valid email format, required
 * - Message: 10-500 characters, required
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must not exceed 255 characters"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must not exceed 500 characters")
})

/**
 * TypeScript type inferred from Zod schema
 * This ensures client and server use the same type
 */
export type ContactFormData = z.infer<typeof contactFormSchema>
