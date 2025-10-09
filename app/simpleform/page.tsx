// ============================================================================
// SIMPLE FORM PAGE - Next.js 15 Server Action Demo (Server Component)
// ============================================================================
// This is a SERVER COMPONENT that demonstrates Server Actions with forms.
//
// KEY CONCEPTS:
// 1. NO "use client" needed - Server Actions work in Server Components!
// 2. Form directly references Server Action via action={submitContact}
// 3. Works WITHOUT JavaScript (progressive enhancement)
// 4. No API route needed - Server Actions handle everything
// 5. Zero client-side JavaScript shipped for this page
//
// FLOW:
// 1. User fills form → 2. Clicks submit → 3. Browser POSTs FormData
// 4. Next.js routes to Server Action → 5. Action processes on server
// 6. Server redirects to /simpleform/thank-you
//
// WHY THIS IS A SERVER COMPONENT:
// - No React hooks (useState, useEffect, etc.)
// - No event handlers (onClick, onChange, etc.)
// - No client-side interactivity
// - Just a plain HTML form with Server Action
// - Result: Smaller bundle, faster page load, better SEO
//
// PROGRESSIVE ENHANCEMENT:
// With JS: Smooth submission via Next.js navigation
// Without JS: Traditional POST submission - still works!
// ============================================================================

import { submitContact } from "./actions"

/**
 * Simple Form Page Component (Server Component)
 *
 * CURRENT IMPLEMENTATION:
 * - Server Component (no client-side JavaScript)
 * - Basic form with direct Server Action binding
 * - Redirects to /simpleform/thank-you after submission
 * - Progressive enhancement: works without JavaScript
 *
 * BENEFITS OF SERVER COMPONENT:
 * - Zero client JS for this page (smaller bundle)
 * - Fully server-rendered HTML
 * - Better performance and SEO
 * - Still supports Server Actions (Next.js 15 feature)
 *
 * See below for recommended improvements using useActionState
 * (Note: useActionState requires "use client" directive).
 */
export default function SimpleFormPage() {
  return (
    <div className="max-w-lg mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-6">Simple Form (Server Action)</h1>

      {/* WARNING: Missing the point */}
      <div className="mb-8 p-6 bg-orange-50 rounded-lg border-2 border-orange-300">
        <h2 className="text-lg font-bold text-orange-900 mb-3">⚠️ This Misses the Point of Next.js/React</h2>
        <div className="text-sm text-orange-800 space-y-3">
          <p>
            <strong>This basic Server Component approach defeats the purpose of using Next.js and React.</strong>
          </p>
          <p>
            The <strong>whole point</strong> of Next.js and React is to provide a <strong>better user experience (UX)</strong>
            through interactive, responsive interfaces. This implementation provides <strong>no UX improvements</strong> over
            a traditional HTML form with PHP/Rails backend:
          </p>
          <ul className="ml-6 space-y-1 list-disc">
            <li>No loading indicators (user doesn&apos;t know if form is submitting)</li>
            <li>No inline validation feedback (errors only after full page reload)</li>
            <li>No success messages on the same page (requires redirect)</li>
            <li>Page refresh on submit (jarring, breaks flow)</li>
            <li>Form data lost if you navigate away</li>
          </ul>
          <p className="pt-2 border-t border-orange-200 mt-3">
            <strong>Why use Next.js/React if you&apos;re not improving UX?</strong> This could be plain HTML + any server-side
            language. You&apos;re shipping a React framework for zero benefit.
          </p>
          <p className="font-semibold">
            ✅ <strong>Better approaches:</strong> Use Client Components with useActionState, React Hook Form + Zod,
            or shadcn/ui Form components to actually leverage React&apos;s strengths.
          </p>
        </div>
      </div>

      {/* Explanation section */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold mb-3 text-blue-900">How This Works</h2>
        <div className="text-sm text-blue-800 space-y-2">
          <p>
            <strong>Architecture:</strong> This is a <strong>Server Component</strong> (SSG - Static Site Generation)
            with zero client-side JavaScript for this page.
          </p>
          <p>
            <strong>Flow:</strong> Form submits → <code className="bg-blue-100 px-1 rounded">actions.ts</code> Server
            Action processes data → Redirects to <code className="bg-blue-100 px-1 rounded">/simpleform/thank-you</code>
          </p>
          <p>
            <strong>Benefits:</strong> Lightweight, works without JS, secure server-side processing, prevents duplicate submissions on refresh.
          </p>
        </div>
      </div>

      {/* Limitations section */}
      <div className="mb-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
        <h2 className="text-lg font-semibold mb-3 text-amber-900">Current Limitations</h2>
        <ul className="text-sm text-amber-800 space-y-2 list-disc list-inside">
          <li>
            <strong>No error handling:</strong> If submission fails, no feedback shown to user
          </li>
          <li>
            <strong>No loading state:</strong> No visual indication that form is submitting
          </li>
          <li>
            <strong>No form state preservation:</strong> If you navigate away, all form data is lost (not saved)
          </li>
          <li>
            <strong>No field validation feedback:</strong> Only basic HTML5 validation (browser-level)
          </li>
          <li>
            <strong>No success message on page:</strong> Must redirect to see confirmation
          </li>
        </ul>
        <p className="text-xs text-amber-700 mt-3">
          💡 See comments below for improvements using <code className="bg-amber-100 px-1 rounded">useActionState</code>
          (requires converting to Client Component)
        </p>
      </div>

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

        NOTE: This requires adding "use client" directive at the top!

        "use client"
        import { useActionState } from "react"

        const [state, formAction, isPending] = useActionState(submitContact, null)

        <form action={formAction}>
          {state?.error && <p className="text-red-600">{state.error}</p>}
          {state?.success && <p className="text-green-600">Message sent!</p>}

          <button disabled={isPending}>
            {isPending ? "Sending..." : "Send"}
          </button>
        </form>

        // Update Server Action to return state instead of redirect:
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


        5. REDIRECT AFTER SUCCESS: ✓ IMPLEMENTED

        The Server Action now redirects to /thank-you after successful submission.
        This provides clear success feedback and prevents duplicate submissions.


        6. ADD RATE LIMITING (for production):

        Use libraries like:
        - upstash/ratelimit for Redis-based rate limiting
        - next-rate-limit for in-memory rate limiting

        ====================================================================
      */}
    </div>
  )
}
