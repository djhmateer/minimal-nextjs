"use server"

/**
 * Server action for handling contact form submissions with Zod validation
 *
 * IMPORTANT: Server-side validation is REQUIRED for security!
 * - Client-side validation can be bypassed (disabled JS, DevTools, direct API calls)
 * - Never trust client data - always validate on the server
 * - This is your security layer
 *
 * We use the SAME Zod schema as the client for:
 * - Consistency: Same validation rules everywhere
 * - DRY: Don't Repeat Yourself
 * - Type safety: Shared TypeScript types
 * - Maintainability: Change once, updates everywhere
 */

import { contactFormSchema, type ContactFormData } from "./schema"

export async function submitContactForm(data: ContactFormData) {
  // ========================================================================
  // STEP 1: SERVER-SIDE VALIDATION with Zod (Security Layer)
  // ========================================================================
  // Even though the client uses the same Zod schema, we MUST validate
  // on the server because:
  // - Users can disable JavaScript
  // - Attackers can bypass client validation
  // - Direct API calls can send malicious data
  //
  // Using Zod's safeParse instead of parse:
  // - safeParse returns { success: true, data } or { success: false, error }
  // - parse throws an error (harder to handle)

  const validationResult = contactFormSchema.safeParse(data)

  if (!validationResult.success) {
    // Extract error messages from Zod validation
    const errorMessages = validationResult.error.issues.map(err => err.message)
    console.log("❌ Server: Zod validation failed:", errorMessages)

    return {
      success: false,
      message: errorMessages.join(". "),
      timestamp: new Date().toISOString()
    }
  }

  // Use validated data (TypeScript knows this is valid ContactFormData)
  const validatedData = validationResult.data

  // ========================================================================
  // STEP 2: Sanitize data (trim whitespace, normalize email)
  // ========================================================================
  const sanitizedData = {
    name: validatedData.name.trim(),
    email: validatedData.email.trim().toLowerCase(),
    message: validatedData.message.trim()
  }

  // ========================================================================
  // STEP 3: Server-side logging
  // ========================================================================
  console.log("✓ Server: Zod validation passed")
  console.log("=== Server: Contact Form Submission ===")
  console.log("Timestamp:", new Date().toISOString())
  console.log("Data:", JSON.stringify(sanitizedData, null, 2))
  console.log("=======================================")

  // ========================================================================
  // STEP 4: Database operation (TODO)
  // ========================================================================
  // TODO: Database call here
  // Example:
  // try {
  //   await db.insert(contacts).values({
  //     name: sanitizedData.name,
  //     email: sanitizedData.email,
  //     message: sanitizedData.message,
  //     created_at: new Date(),
  //   })
  // } catch (error) {
  //   console.error("Database error:", error)
  //   return {
  //     success: false,
  //     message: "Failed to save form. Please try again.",
  //     timestamp: new Date().toISOString()
  //   }
  // }

  // Simulate a small delay (remove this in production)
  await new Promise((resolve) => setTimeout(resolve, 500))

  // ========================================================================
  // STEP 5: Return success response
  // ========================================================================
  return {
    success: true,
    message: "Form submitted successfully",
    timestamp: new Date().toISOString()
  }
}
