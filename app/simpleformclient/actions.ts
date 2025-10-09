// ============================================================================
// SERVER ACTIONS - Client Component Version (Returns State)
// ============================================================================
// This file contains Server Actions for use with Client Components and
// React 19's useActionState hook.
//
// KEY DIFFERENCES FROM SERVER COMPONENT VERSION:
// 1. Returns state object instead of redirecting
// 2. Designed for use with useActionState hook
// 3. Returns success/error messages for inline display
// 4. No page navigation - state updates trigger re-render
//
// KEY CONCEPTS:
// 1. "use server" directive marks this file as server-only code
// 2. Server Actions enable direct server communication without API routes
// 3. Return values are sent to useActionState hook on client
// 4. Secure by default - never exposed to the client bundle
//
// FLOW:
// 1. User submits form → Browser sends POST request with FormData
// 2. Next.js routes request to this Server Action
// 3. Action processes data server-side (DB insert, validation, etc.)
// 4. Returns state object { success, message, error } to client
// 5. useActionState updates component state → Page re-renders with feedback
//
// Read more: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
// ============================================================================

"use server"

// import { db } from "@/lib/db"
// import { revalidatePath } from "next/cache"

/**
 * State type returned to useActionState
 */
type FormState = {
  success: boolean
  message: string
  errors?: {
    name?: string
    email?: string
    message?: string
  }
}

/**
 * Server Action: Handle contact form submission (Client Component Version)
 *
 * This function runs exclusively on the server. It:
 * - Receives FormData from the client form submission
 * - Extracts and validates form fields
 * - Performs secure server-side operations (DB writes, email sending, etc.)
 * - Returns state object for useActionState hook
 * - Never exposes sensitive logic or credentials to the client
 *
 * @param prevState - Previous state from useActionState (unused in this simple version)
 * @param formData - Form data automatically passed by Next.js
 * @returns FormState object with success/error information
 *
 * USAGE WITH useActionState:
 * const [state, formAction, isPending] = useActionState(submitContact, null)
 * <form action={formAction}>
 *
 * The state returned contains:
 * - success: boolean indicating if submission succeeded
 * - message: user-friendly success message
 * - error: (optional) error message if submission failed
 */
export async function submitContact(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
    // ========================================================================
    // STEP 1: Extract form data
    // ========================================================================
    // FormData.get() returns string | File | null
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // ========================================================================
    // STEP 2: Field-level validation
    // ========================================================================
    // Validate each field individually and collect errors
    const errors: { name?: string; email?: string; message?: string } = {}

    // Validate name
    if (!name || typeof name !== "string" || name.trim() === "") {
      errors.name = "Name is required"
    } else if (name.length < 2) {
      errors.name = "Name must be at least 2 characters"
    } else if (name.length > 100) {
      errors.name = "Name must be less than 100 characters"
    }

    // Validate email
    if (!email || typeof email !== "string" || email.trim() === "") {
      errors.email = "Email is required"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        errors.email = "Please enter a valid email address"
      }
    }

    // Validate message
    if (!message || typeof message !== "string" || message.trim() === "") {
      errors.message = "Message is required"
    } else if (message.length < 10) {
      errors.message = "Message must be at least 10 characters"
    } else if (message.length > 1000) {
      errors.message = "Message must be less than 1000 characters"
    }

    // If there are any validation errors, return them
    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "",
        errors
      }
    }

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

    try {
      // Example DB insert (uncomment when database is set up):
      // await db.insert("contacts", { name, email, message })

      // Simulate async operation (replace with actual DB call)
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log("Server: Contact form submission successful:", { name, email, message })

      // ========================================================================
      // STEP 4: Return success state
      // ========================================================================
      // Return state object to useActionState hook
      // Client Component will display success message inline
      return {
        success: true,
        message: `Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`
      }

    } catch (error) {
      // ========================================================================
      // Error handling - System errors (DB, network, etc.)
      // ========================================================================
      console.error("Server: Contact form submission failed:", error)

      return {
        success: false,
        message: "Something went wrong. Please try again later.",
        errors: {}
      }
    }
}
