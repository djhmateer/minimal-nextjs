"use server"

/**
 * Server action for handling contact form submissions
 *
 * IMPORTANT: Server-side validation is REQUIRED for security!
 * - Client-side validation can be bypassed (disabled JS, DevTools, direct API calls)
 * - Never trust client data - always validate on the server
 * - This is your security layer
 */

export type ContactFormData = {
  name: string
  email: string
  message: string
}

export async function submitContactForm(data: ContactFormData) {
  // ========================================================================
  // STEP 1: SERVER-SIDE VALIDATION (Security Layer)
  // ========================================================================
  // Even though React Hook Form validates on the client, we MUST validate
  // on the server because:
  // - Users can disable JavaScript
  // - Attackers can bypass client validation
  // - Direct API calls can send malicious data

  const errors: string[] = []

  // Validate name
  if (!data.name || typeof data.name !== "string") {
    errors.push("Name is required")
  } else if (data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters")
  } else if (data.name.length > 100) {
    errors.push("Name must not exceed 100 characters")
  }

  // Validate email
  if (!data.email || typeof data.email !== "string") {
    errors.push("Email is required")
  } else {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(data.email)) {
      errors.push("Please enter a valid email address")
    }
    if (data.email.length > 255) {
      errors.push("Email must not exceed 255 characters")
    }
  }

  // Validate message
  if (!data.message || typeof data.message !== "string") {
    errors.push("Message is required")
  } else if (data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters")
  } else if (data.message.length > 500) {
    errors.push("Message must not exceed 500 characters")
  }

  // If validation fails, return errors
  if (errors.length > 0) {
    console.log("❌ Server: Validation failed:", errors)
    return {
      success: false,
      message: errors.join(". "),
      timestamp: new Date().toISOString()
    }
  }

  // ========================================================================
  // STEP 2: Sanitize data (trim whitespace)
  // ========================================================================
  const sanitizedData = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    message: data.message.trim()
  }

  // ========================================================================
  // STEP 3: Server-side logging
  // ========================================================================
  console.log("✓ Server: Validation passed")
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
