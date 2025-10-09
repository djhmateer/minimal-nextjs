"use server"

/**
 * Server action for handling contact form submissions
 * Logs data on the server before database operations
 */

export type ContactFormData = {
  name: string
  email: string
  message: string
}

export async function submitContactForm(data: ContactFormData) {
  // Server-side logging (visible in terminal/server logs)
  console.log("=== Server: Contact Form Submission ===")
  console.log("Timestamp:", new Date().toISOString())
  console.log("Data:", JSON.stringify(data, null, 2))
  console.log("Name:", data.name)
  console.log("Email:", data.email)
  console.log("Message:", data.message)
  console.log("=======================================")

  // TODO: Database call here
  // Example:
  // await db.insert(contacts).values({
  //   name: data.name,
  //   email: data.email,
  //   message: data.message,
  //   created_at: new Date(),
  // })

  // Simulate a small delay (remove this in production)
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    success: true,
    message: "Form submitted successfully",
    timestamp: new Date().toISOString()
  }
}
