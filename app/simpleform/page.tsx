// ============================================================================
// SIMPLE FORM PAGE - Next.js 15 Server Action Demo
// ============================================================================
// This component demonstrates the Server Action pattern for form handling.
//
// KEY CONCEPTS:
// 1. "use client" directive required because we're using a form action
// 2. Form directly references Server Action via action={submitContact}
// 3. Works WITHOUT JavaScript (progressive enhancement)
// 4. No API route needed - Server Actions handle everything
//
// FLOW:
// 1. User fills form → 2. Clicks submit → 3. Browser POSTs FormData
// 4. Next.js routes to Server Action → 5. Action processes on server
// 6. Page reloads with result (or redirects, or updates state)
//
// WHY "use client"?
// - Even though this uses Server Actions, the form element itself needs
//   client-side JavaScript for the action prop to work optimally
// - Without JS, form still works via traditional POST submission!
// ============================================================================

"use client"

import { submitContact } from "./actions"

/**
 * Simple Form Page Component
 *
 * CURRENT IMPLEMENTATION:
 * - Basic form with direct Server Action binding
 * - No loading states or error handling (form reloads on submit)
 * - Progressive enhancement: works without JavaScript
 *
 * PROGRESSIVE ENHANCEMENT:
 * With JS: Smooth submission, stays on page, no flash
 * Without JS: Traditional POST, page reload, still works!
 *
 * See below for recommended improvements using useActionState.
 */
export default function SimpleFormPage() {
  return (
    <div className="max-w-lg mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-6">Simple Form (Server Action)</h1>

      {/*
        FORM ACTION BINDING:
        - action={submitContact} binds form to Server Action
        - On submit, Next.js automatically:
          1. Serializes form data into FormData object
          2. Sends secure POST request to server
          3. Executes submitContact() on server
          4. Returns response to client
        - No fetch(), no API routes, no boilerplate!
      */}
      <form action={submitContact} className="space-y-4">

        {/* Name field - required attribute provides HTML5 validation */}
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">Name</label>
          <input
            id="name"
            name="name" // Must match formData.get("name") in Server Action
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Email field - type="email" provides browser validation */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input
            id="email"
            name="email" // Must match formData.get("email") in Server Action
            type="email"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Message field - textarea for longer content */}
        <div>
          <label htmlFor="message" className="block mb-1 font-medium">Message</label>
          <textarea
            id="message"
            name="message" // Must match formData.get("message") in Server Action
            required
            rows={5}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Submit button - triggers form submission */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>

      {/*
        ====================================================================
        RECOMMENDED IMPROVEMENTS (Next.js 15 / React 19 Best Practices)
        ====================================================================

        1. ADD LOADING & ERROR STATES WITH useActionState:

        import { useActionState } from "react"

        const [state, formAction, isPending] = useActionState(submitContact, null)

        <form action={formAction}>
          {state?.error && <p className="text-red-600">{state.error}</p>}
          {state?.success && <p className="text-green-600">Message sent!</p>}

          <button disabled={isPending}>
            {isPending ? "Sending..." : "Send"}
          </button>
        </form>

        // Update Server Action to return state:
        return { success: true, message: "Form submitted!" }


        2. ADD INPUT VALIDATION (Zod):

        In actions.ts:
        import { z } from "zod"

        const contactSchema = z.object({
          name: z.string().min(1, "Name required"),
          email: z.string().email("Invalid email"),
          message: z.string().min(10, "Message too short")
        })

        try {
          const validated = contactSchema.parse({ name, email, message })
          // Use validated data
        } catch (error) {
          return { error: error.errors[0].message }
        }


        3. ADD FORM RESET ON SUCCESS:

        Use useRef to reset form:
        const formRef = useRef<HTMLFormElement>(null)

        useEffect(() => {
          if (state?.success) {
            formRef.current?.reset()
          }
        }, [state?.success])


        4. IMPROVE ACCESSIBILITY:

        - Added id and htmlFor for label/input association ✓ (done above)
        - Add aria-describedby for error messages
        - Add aria-live for status updates
        - Add focus management after submission


        5. CONSIDER REDIRECT AFTER SUCCESS:

        In actions.ts:
        import { redirect } from "next/navigation"

        await db.insert(...)
        redirect("/thank-you")


        6. ADD RATE LIMITING (for production):

        Use libraries like:
        - upstash/ratelimit for Redis-based rate limiting
        - next-rate-limit for in-memory rate limiting

        ====================================================================
      */}
    </div>
  )
}
