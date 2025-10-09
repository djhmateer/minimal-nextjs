// ============================================================================
// SERVER ACTIONS - Next.js 15 Server-Side Form Handler
// ============================================================================
// This file contains Server Actions - functions that run ONLY on the server.
//
// KEY CONCEPTS:
// 1. "use server" directive marks this file as server-only code
// 2. Server Actions enable direct server communication without API routes
// 3. They work with progressive enhancement (no JS required!)
// 4. They're secure by default - never exposed to the client bundle
//
// FLOW:
// 1. User submits form → Browser sends POST request with FormData
// 2. Next.js routes request to this Server Action
// 3. Action processes data server-side (DB insert, validation, etc.)
// 4. Response sent back to client (redirect, revalidate, or state update)
//
// Read more: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
// ============================================================================

"use server"

import { redirect } from "next/navigation"

// import { db } from "@/lib/db"
// import { revalidatePath } from "next/cache"

/**
 * Server Action: Handle contact form submission
 *
 * This function runs exclusively on the server. It:
 * - Receives FormData from the client form submission
 * - Extracts and validates form fields
 * - Performs secure server-side operations (DB writes, email sending, etc.)
 * - Never exposes sensitive logic or credentials to the client
 *
 * @param formData - Automatically passed by Next.js when used in form action
 *
 * USAGE PATTERNS:
 * 1. Direct form action (current): <form action={submitContact}>
 *    - Simple, no client state needed
 *    - No loading states or error handling on client
 *    - Works without JavaScript (progressive enhancement)
 *
 * 2. With useActionState (recommended for better UX):
 *    - Provides loading state, errors, and success messages
 *    - See improvements section in page.tsx
 */
export async function submitContact(formData: FormData) {
    // ========================================================================
    // STEP 1: Extract form data
    // ========================================================================
    // FormData.get() returns string | File | null
    // In a production app, validate types and values here
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // ========================================================================
    // STEP 2: Validate input (TODO: Add proper validation)
    // ========================================================================
    // Consider using Zod for type-safe validation:
    // const schema = z.object({
    //   name: z.string().min(1, "Name required"),
    //   email: z.string().email("Invalid email"),
    //   message: z.string().min(10, "Message too short")
    // })
    // const validated = schema.parse({ name, email, message })

    // ========================================================================
    // STEP 3: Perform secure server-side operations
    // ========================================================================
    // This code runs on the server and is NEVER exposed to the client
    // Perfect for:
    // - Database writes
    // - API calls to third-party services
    // - Email sending
    // - Authentication checks
    // - Rate limiting

    // Example DB insert (uncomment when database is set up):
    // await db.insert("contacts", { name, email, message })

    console.log("Server: Received contact form submission:", { name, email, message })

    // ========================================================================
    // STEP 4: Redirect to success page
    // ========================================================================
    // After successful processing, redirect to form-specific thank-you page
    // Benefits:
    // - Clear success confirmation
    // - Prevents form resubmission on refresh (no duplicate entries)
    // - Clean URL for user to bookmark or share
    // - Better UX than staying on form page
    // - Scoped under /simpleform for better organization
    //
    // Note: redirect() throws a NEXT_REDIRECT error internally - this is normal!
    // Next.js catches it and performs the navigation. Don't wrap in try/catch.
    redirect("/simpleform/thank-you")
}
