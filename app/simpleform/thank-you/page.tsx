// ============================================================================
// THANK YOU PAGE - Success Confirmation After Form Submission
// ============================================================================
// This page is shown after successful form submission via Server Action redirect.
//
// FLOW:
// 1. User submits form at /simpleform
// 2. Server Action processes submission
// 3. Server calls redirect("/simpleform/thank-you")
// 4. User is redirected to this page
//
// ORGANIZATION:
// - This page is scoped under /simpleform to keep form-related pages grouped
// - If you add more forms (e.g., /checkout, /signup), each can have its own
//   thank-you page (e.g., /checkout/thank-you, /signup/success)
//
// This pattern provides:
// - Clear success confirmation
// - Clean URL (no form resubmission on refresh)
// - Better UX than alert/toast messages
// ============================================================================

import Link from "next/link"

export default function ThankYouPage() {
  return (
    <div className="max-w-lg mx-auto pt-16 text-center">
      {/* Success icon */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Success message */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Thank You!
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Your message has been successfully submitted.
        <br />
        We&apos;ll get back to you soon!
      </p>

      {/* Action buttons */}
      <div className="space-x-4">
        <Link
          href="/simpleform"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Another Message
        </Link>

        <Link
          href="/"
          className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
