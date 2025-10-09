/**
 * Contact Form Page - demonstrates shadcn/ui components with Zod validation
 *
 * This is a Client Component that uses:
 * - react-hook-form for form state management
 * - Zod for schema validation (shared with server)
 * - zodResolver to connect Zod schema to React Hook Form
 * - shadcn/ui components for UI
 */
"use client"

// Form validation library
import { useForm } from "react-hook-form" // Form state management
import { zodResolver } from "@hookform/resolvers/zod" // Connects Zod to React Hook Form
import { useState } from "react"

// Server actions and shared schema
import { submitContactForm } from "./actions"
import { contactFormSchema, type ContactFormData } from "./schema"

// shadcn/ui components
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ShadcnbPage() {
  console.log("Rendering ShadcnbPage")

  // Track submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<string | null>(null)

  /**
   * Initialize react-hook-form with Zod validation
   * - resolver: zodResolver connects Zod schema to React Hook Form
   * - mode: "onChange" validates as user types
   * - defaultValues: Initial values for all form fields
   *
   * The Zod schema (contactFormSchema) is shared between client and server,
   * ensuring consistent validation rules everywhere.
   */
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  /**
   * Handle form submission
   * This runs after validation passes
   * Calls server action (which uses same Zod schema) to log and process data
   */
  async function onSubmit(data: ContactFormData) {
    console.log("Client: Submitting form:", data)
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      // Call server action (this function is inside actions.ts)
      const result = await submitContactForm(data)
      console.log("Client: Server response:", result)

      // Check if server validation passed
      if (result.success) {
        setSubmitResult(`✓ ${result.message} at ${new Date(result.timestamp).toLocaleTimeString()}`)
        // Only reset form if submission was successful
        form.reset()
      } else {
        // Server validation failed - show error message
        setSubmitResult(`✗ ${result.message}`)
        console.log("❌ Client: Server validation failed:", result.message)
      }
    } catch (error) {
      console.error("Client: Submission error:", error)
      setSubmitResult("✗ Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto pt-8">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-6">shadcn/ui Form (React Hook Form)</h1>

      {/* How it works */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold mb-3 text-blue-900">How This Works</h2>
        <div className="text-sm text-blue-800 space-y-2">
          <p>
            <strong>Client Component</strong> using <strong>shadcn/ui</strong> + <strong>React Hook Form</strong> + <strong>Zod</strong> + <strong>Server Actions</strong>
          </p>
          <p>
            <strong>Flow:</strong> Type → Zod validates on change → Show inline errors → Submit → Server validates with Zod → Success/error inline
          </p>
          <p>
            <strong>Validation:</strong> Shared Zod schema used on both client (via zodResolver) and server (via safeParse)
          </p>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-6">
          {/* Pros */}
          <div>
            <h3 className="text-sm font-semibold text-green-700 mb-2">✅ Pros</h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Real-time validation (onChange + onBlur)</li>
              <li>• Shared Zod schema (client + server)</li>
              <li>• No validation duplication (DRY)</li>
              <li>• Type-safe (auto-generated types)</li>
              <li>• Loading states & success feedback</li>
              <li>• Built-in accessibility (ARIA)</li>
              <li>• Professional UI (shadcn/ui)</li>
              <li>• Battle-tested stack</li>
              <li>• Server security validation</li>
            </ul>
          </div>

          {/* Cons */}
          <div>
            <h3 className="text-sm font-semibold text-amber-700 mb-2">⚠️ Trade-offs</h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Larger bundle: ~23 KB (includes Zod)</li>
              <li>• More dependencies (zod, @hookform/resolvers)</li>
              <li>• Learning curve for Zod syntax</li>
              <li>• Requires JavaScript (no progressive enhancement)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation highlight */}
      <div className="mb-8 p-4 bg-green-50 rounded-lg border-2 border-green-300">
        <h2 className="text-sm font-semibold text-green-900 mb-2">✅ Production-Ready Implementation</h2>
        <p className="text-xs text-green-800 mb-2">
          This form uses <strong>Zod schema validation</strong> shared between client and server:
        </p>
        <div className="bg-green-100 p-2 rounded font-mono text-xs text-green-900">
          schema.ts → contactFormSchema (shared)<br/>
          page.tsx → useForm(&#123; resolver: zodResolver(schema) &#125;)<br/>
          actions.ts → schema.safeParse(data)
        </div>
        <p className="text-xs text-green-700 mt-2">
          <strong>Benefits:</strong> Single source of truth, consistent validation, type safety, DRY principle
        </p>
      </div>

      {/* Card wrapper for the form */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Send us a message and we&apos;ll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Form provider - passes form methods to child components */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Name field - validated by Zod schema */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      {/* {...field} spreads onChange, onBlur, value, ref to Input */}
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    {/* FormMessage displays Zod validation errors */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email field - validated by Zod schema */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message field - validated by Zod schema */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us what&apos;s on your mind..."
                        className="resize-none"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    {/* FormDescription shows helper text */}
                    <FormDescription>
                      Your message will be reviewed by our team.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button - triggers validation then onSubmit */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Send Message"}
              </Button>

              {/* Show submission result */}
              {submitResult && (
                <div className={`text-sm text-center ${submitResult.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>
                  {submitResult}
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}