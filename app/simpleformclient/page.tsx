// ============================================================================
// ADVANCED FORM PAGE - Next.js 15 Client Component with useActionState
// ============================================================================
// This is a CLIENT COMPONENT that demonstrates advanced Server Actions with
// React 19's useActionState hook for rich form UX.
//
// KEY CONCEPTS:
// 1. "use client" directive REQUIRED for useActionState hook
// 2. useActionState provides loading states, errors, and success messages
// 3. Form stays on page with inline feedback (no redirect needed)
// 4. Server Action returns state instead of redirecting
// 5. Client-side JavaScript required for this enhanced UX
//
// FLOW:
// 1. User fills form → 2. Clicks submit → Button shows "Sending..."
// 3. Server Action processes → Returns success/error state
// 4. Page updates with message → Form can be reset or refilled
//
// WHY CLIENT COMPONENT?
// - Uses useActionState React hook (requires client)
// - Provides loading indicator (isPending)
// - Shows errors/success inline (no redirect)
// - Better UX with form state management
// - Trades bundle size for richer interactivity
//
// TRADE-OFFS:
// - Larger bundle: ~770 bytes client JS (vs 0 bytes for Server Component)
// - Requires JavaScript: Won't work if JS disabled
// - Better UX: Loading states, inline errors, stays on page
// ============================================================================

"use client"

import { useActionState, useState } from "react"
import { submitContact } from "./actions"

/**
 * Advanced Form Page Component (Client Component)
 *
 * IMPLEMENTATION:
 * - Uses useActionState for loading/error/success states
 * - Client-side validation on blur for immediate feedback
 * - Inline feedback without page redirects
 * - Loading indicator during submission
 * - Error messages displayed on page
 * - Success messages with option to submit again
 * - Form preservation (doesn't lose data on navigation)
 *
 * BENEFITS OVER SERVER COMPONENT:
 * - Real-time loading feedback (isPending)
 * - Inline error/success messages
 * - Client-side validation on blur
 * - No page reload or redirect
 * - Better accessibility with aria-live regions
 * - Form state management
 */
export default function SimpleFormClientPage() {
  // useActionState: React 19 hook for Server Actions
  // - state: Contains return value from Server Action (errors, success, etc.)
  // - formAction: Enhanced action function (tracks pending state)
  // - isPending: Boolean indicating if action is currently running
  const [state, formAction, isPending] = useActionState(submitContact, null)

  // Client-side validation errors (shown on blur)
  const [clientErrors, setClientErrors] = useState<{
    name?: string
    email?: string
    message?: string
  }>({})

  /**
   * Validate a single field (mirrors server-side validation)
   * Called on blur to provide immediate feedback
   */
  const validateField = (fieldName: string, value: string): string | undefined => {
    switch (fieldName) {
      case "name":
        if (!value || value.trim() === "") {
          return "Name is required"
        }
        if (value.length < 2) {
          return "Name must be at least 2 characters"
        }
        if (value.length > 100) {
          return "Name must be less than 100 characters"
        }
        return undefined

      case "email":
        if (!value || value.trim() === "") {
          return "Email is required"
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          return "Please enter a valid email address"
        }
        return undefined

      case "message":
        if (!value || value.trim() === "") {
          return "Message is required"
        }
        if (value.length < 10) {
          return "Message must be at least 10 characters"
        }
        if (value.length > 1000) {
          return "Message must be less than 1000 characters"
        }
        return undefined

      default:
        return undefined
    }
  }

  /**
   * Handle field blur - validate and update client errors
   */
  const handleBlur = (fieldName: string, value: string) => {
    console.log(`Blur event fired for ${fieldName} with value:`, value)
    const error = validateField(fieldName, value)
    console.log(`Validation result for ${fieldName}:`, error)
    setClientErrors(prev => {
      const newErrors = {
        ...prev,
        [fieldName]: error
      }
      console.log('Updated client errors:', newErrors)
      return newErrors
    })
  }

  // Merge client-side and server-side errors
  // Server errors take precedence (shown after submission)
  const errors = {
    name: state?.errors?.name || clientErrors.name,
    email: state?.errors?.email || clientErrors.email,
    message: state?.errors?.message || clientErrors.message
  }

  return (
    <div className="max-w-lg mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-6">Advanced Form (Client Component)</h1>

      {/* Deprecation Notice */}
      <div className="mb-8 p-6 bg-red-50 rounded-lg border-2 border-red-300">
        <h2 className="text-lg font-bold text-red-900 mb-3">⚠️ DEPRECATED - DO NOT USE</h2>
        <div className="text-sm text-red-800 space-y-2">
          <p>
            <strong>This implementation does not work correctly and has been abandoned.</strong>
          </p>
          <p>
            The blur validation is broken and the complexity of managing client-side + server-side validation
            manually is too high. Form state management, error merging, and event handling are error-prone.
          </p>
          <p className="pt-2 border-t border-red-200 mt-3">
            <strong>✅ Better Solution:</strong> Use <strong>shadcn/ui Form components</strong> with{" "}
            <strong>React Hook Form</strong> + <strong>Zod</strong> for production-ready forms with:
          </p>
          <ul className="ml-6 mt-2 space-y-1 list-disc">
            <li>Automatic field-level validation</li>
            <li>Built-in blur/change/submit validation</li>
            <li>Type-safe schema validation with Zod</li>
            <li>Accessibility built-in</li>
            <li>Battle-tested by thousands of developers</li>
          </ul>
          <p className="mt-3 text-xs">
            <strong>See:</strong>{" "}
            <a
              href="https://ui.shadcn.com/docs/components/form"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-red-600"
            >
              shadcn/ui Form Documentation
            </a>
          </p>
        </div>
      </div>

      {/* Explanation section */}
      <div className="mb-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
        <h2 className="text-lg font-semibold mb-3 text-purple-900">How This Works</h2>
        <div className="text-sm text-purple-800 space-y-2">
          <p>
            <strong>Architecture:</strong> This is a <strong>Client Component</strong> using React 19&apos;s{" "}
            <code className="bg-purple-100 px-1 rounded">useActionState</code> hook with Server Actions.
          </p>
          <p>
            <strong>Flow:</strong> Form submits → <code className="bg-purple-100 px-1 rounded">actions.ts</code> Server
            Action processes → Returns state (success/error) → Page updates inline (no redirect)
          </p>
          <p>
            <strong>Benefits:</strong> Loading states, inline errors, success messages, stays on page, form preservation.
          </p>
        </div>
      </div>

      {/* Benefits section */}
      <div className="mb-8 p-6 bg-green-50 rounded-lg border border-green-200">
        <h2 className="text-lg font-semibold mb-3 text-green-900">Advantages (vs Server Component)</h2>
        <ul className="text-sm text-green-800 space-y-2 list-disc list-inside">
          <li>
            <strong>Loading indicator:</strong> Button shows &quot;Sending...&quot; during submission
          </li>
          <li>
            <strong>Inline error handling:</strong> Errors displayed on page (no silent failures)
          </li>
          <li>
            <strong>Success feedback:</strong> Success message shown without redirect
          </li>
          <li>
            <strong>Stays on page:</strong> No navigation - better for multi-submission workflows
          </li>
          <li>
            <strong>Form preservation:</strong> Can refill or correct errors without losing data
          </li>
        </ul>
        <p className="text-xs text-green-700 mt-3">
          💰 <strong>Cost:</strong> ~1.84 KB of client JavaScript (vs 0 for Server Component)
        </p>
      </div>

      {/* Testing guide */}
      <div className="mb-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
        <h2 className="text-lg font-semibold mb-3 text-yellow-900">🧪 Test Validation (Blur + Submit)</h2>
        <p className="text-sm text-yellow-800 mb-3">
          <strong>Two validation modes:</strong>
        </p>
        <div className="text-sm text-yellow-800 mb-3 space-y-2">
          <div className="bg-yellow-100 p-2 rounded">
            <strong>1. Blur Validation (Immediate Feedback):</strong>
            <ul className="ml-4 mt-1 space-y-1 list-disc">
              <li>Type in a field, then click/tab out → Error shows immediately</li>
              <li>Fix the error and blur again → Error disappears</li>
            </ul>
          </div>
          <div className="bg-yellow-100 p-2 rounded">
            <strong>2. Submit Validation (Server-side):</strong>
            <ul className="ml-4 mt-1 space-y-1 list-disc">
              <li>Click Send → Server validates all fields → Shows errors</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-yellow-800 mb-2"><strong>Try these tests:</strong></p>
        <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
          <li><strong>Empty name:</strong> Click in name field, then click out → See &quot;Name is required&quot;</li>
          <li><strong>Invalid email:</strong> Type &quot;test&quot;, click out → See error. Type &quot;test@example.com&quot;, click out → Error clears</li>
          <li><strong>Short message:</strong> Type &quot;Hi&quot;, click out → See &quot;Message must be at least 10 characters&quot;</li>
          <li><strong>Valid submission:</strong> Fill all correctly → See green success message with 1s loading delay</li>
        </ul>
      </div>

      {/* Global success message - only shown on successful submission */}
      {state?.success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg" role="alert" aria-live="polite">
          <p className="text-green-800 font-medium">✅ Success</p>
          <p className="text-green-700 text-sm">{state.message}</p>
        </div>
      )}

      {/* System error message - only for unexpected errors (not validation) */}
      {!state?.success && state?.message && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="polite">
          <p className="text-red-800 font-medium">❌ Error</p>
          <p className="text-red-700 text-sm">{state.message}</p>
        </div>
      )}

      {/*
        FORM ACTION WITH useActionState:
        - action={formAction} uses enhanced action from useActionState
        - formAction tracks loading state and returns Server Action result
        - isPending indicates if submission is in progress
        - state contains return value from Server Action (error/success)
      */}
      {/*
        NOTE: HTML5 validation (required, type="email") is removed to demonstrate
        server-side validation and inline error display. In production, you might
        want to keep HTML5 validation for immediate feedback + server validation
        for security.
      */}
      <form action={formAction} className="space-y-6" noValidate>

        {/* Name field - with inline error message and blur validation */}
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            disabled={isPending}
            onBlur={(e) => handleBlur("name", e.target.value)}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full border rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
              errors.name
                ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email field - with inline error message and blur validation */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="text"
            disabled={isPending}
            onBlur={(e) => handleBlur("email", e.target.value)}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full border rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
              errors.email
                ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Message field - with inline error message and blur validation */}
        <div>
          <label htmlFor="message" className="block mb-1 font-medium">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            disabled={isPending}
            onBlur={(e) => handleBlur("message", e.target.value)}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full border rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
              errors.message
                ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }`}
            placeholder="Your message here (minimum 10 characters)..."
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit button - shows loading state during submission */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Sending..." : "Send"}
        </button>
      </form>

      {/* Technical notes */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-3 text-gray-900">Technical Implementation</h2>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong>useActionState Hook:</strong> React 19 feature that enhances Server Actions with client state
          </p>
          <p>
            <strong>Dual Validation:</strong> Client-side validation on blur (immediate) + Server-side validation on submit (secure)
          </p>
          <p>
            <strong>Field-Level Validation:</strong> Server Action returns{" "}
            <code className="bg-gray-100 px-1 rounded">
              {`{ success, message, errors: { name?, email?, message? } }`}
            </code>
          </p>
          <p>
            <strong>Blur Validation:</strong> Uses <code className="bg-gray-100 px-1 rounded">onBlur</code> event handler
            to validate fields when user leaves them. Errors clear when field becomes valid.
          </p>
          <p>
            <strong>Error Merging:</strong> Client errors shown immediately on blur, server errors override after submission
          </p>
          <p>
            <strong>Visual Feedback:</strong> Red border on invalid fields, blue border on valid fields
          </p>
          <p>
            <strong>Accessibility:</strong> Uses <code className="bg-gray-100 px-1 rounded">aria-invalid</code>,{" "}
            <code className="bg-gray-100 px-1 rounded">aria-describedby</code>, and{" "}
            <code className="bg-gray-100 px-1 rounded">role=&quot;alert&quot;</code> for screen readers
          </p>
        </div>
      </div>

      {/*
        ====================================================================
        WHAT'S IMPLEMENTED ✅
        ====================================================================

        ✅ useActionState hook for loading/error/success states
        ✅ isPending state for loading indicators
        ✅ Field-level validation with individual error messages
        ✅ Client-side validation on blur (immediate feedback)
        ✅ Server-side validation on submit (secure)
        ✅ Error clearing: fix field and blur → error disappears
        ✅ Visual error states (red borders on invalid fields)
        ✅ Inline error messages under each field
        ✅ Inline success messages with aria-live
        ✅ Disabled form fields during submission
        ✅ Dynamic button text (Send → Sending...)
        ✅ Accessibility (aria-invalid, aria-describedby, role="alert")
        ✅ No page redirect - stays on page with feedback

        VALIDATION RULES (CLIENT + SERVER):
        - Name: required, 2-100 characters
        - Email: required, valid email format
        - Message: required, 10-1000 characters

        NOTE: Client validation mirrors server validation for UX,
        but server validation is authoritative (security layer)

        ====================================================================
        POTENTIAL ENHANCEMENTS (Optional)
        ====================================================================

        1. ADD FORM AUTO-RESET ON SUCCESS:

        import { useRef, useEffect } from "react"

        const formRef = useRef<HTMLFormElement>(null)

        useEffect(() => {
          if (state?.success) {
            formRef.current?.reset()
          }
        }, [state?.success])

        <form ref={formRef} action={formAction}>


        2. UPGRADE TO ZOD VALIDATION (Recommended):

        In actions.ts:
        import { z } from "zod"

        const contactSchema = z.object({
          name: z.string().min(2, "Name must be at least 2 characters").max(100),
          email: z.string().email("Please enter a valid email"),
          message: z.string().min(10, "Message must be at least 10 characters").max(1000)
        })

        const result = contactSchema.safeParse({ name, email, message })
        if (!result.success) {
          const fieldErrors = result.error.flatten().fieldErrors
          return {
            success: false,
            message: "",
            errors: {
              name: fieldErrors.name?.[0],
              email: fieldErrors.email?.[0],
              message: fieldErrors.message?.[0]
            }
          }
        }


        3. ADD RATE LIMITING (Production):

        - upstash/ratelimit for Redis-based limiting
        - next-rate-limit for in-memory limiting
        - Implement in Server Action before processing

        ====================================================================
      */}
    </div>
  )
}
