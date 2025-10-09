/**
 * Contact Form Page - demonstrates shadcn/ui components with form validation
 *
 * This is a Client Component that uses:
 * - react-hook-form for form state management with manual validation
 * - shadcn/ui components for UI
 */
"use client"

// Form validation library
import { useForm } from "react-hook-form" // Form state management and validation
import { useState } from "react"

// Server actions
import { submitContactForm, type ContactFormData } from "./actions"

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
   * Initialize react-hook-form with manual validation
   * - mode: "onChange" validates as user types
   * - defaultValues: Initial values for all form fields
   */
  const form = useForm<ContactFormData>({
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
   * Calls server action to log and process data
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
            <strong>Client Component</strong> using <strong>shadcn/ui</strong> + <strong>React Hook Form</strong> + <strong>Server Actions</strong>
          </p>
          <p>
            <strong>Flow:</strong> Type → Validate on change → Show inline errors → Submit → Server validates → Success/error inline
          </p>
          <p>
            <strong>Validation:</strong> Client (manual rules) + Server (manual validation for security)
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
              <li>• Loading states & success feedback</li>
              <li>• Built-in accessibility (ARIA)</li>
              <li>• Professional UI out of the box</li>
              <li>• TypeScript type-safe</li>
              <li>• Battle-tested (React Hook Form)</li>
              <li>• Server-side security validation</li>
            </ul>
          </div>

          {/* Cons */}
          <div>
            <h3 className="text-sm font-semibold text-red-700 mb-2">❌ Cons</h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Manual validation rules (verbose)</li>
              <li>• Validation duplication (client + server)</li>
              <li>• No shared schema</li>
              <li>• Bundle: ~22.8 KB</li>
              <li>• Should use Zod instead</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Next step */}
      <div className="mb-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <h2 className="text-sm font-semibold text-purple-900 mb-2">🚀 Next Step: Add Zod</h2>
        <p className="text-xs text-purple-800 mb-2">
          Replace manual <code className="bg-purple-100 px-1 rounded">rules</code> with Zod schema for shared client/server validation:
        </p>
        <div className="bg-purple-100 p-2 rounded font-mono text-xs text-purple-900">
          const schema = z.object(&#123; name: z.string().min(2), ... &#125;)<br/>
          useForm(&#123; resolver: zodResolver(schema) &#125;)
        </div>
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

              {/* Name field - validates minimum 2 characters */}
              <FormField
                control={form.control}
                name="name"
                rules={{
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters.",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      {/* {...field} spreads onChange, onBlur, value, ref to Input */}
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    {/* FormMessage displays validation errors */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email field - validates email format */}
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address.",
                  },
                }}
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

              {/* Message field - validates 10-500 characters */}
              <FormField
                control={form.control}
                name="message"
                rules={{
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters.",
                  },
                  maxLength: {
                    value: 500,
                    message: "Message must not be longer than 500 characters.",
                  },
                }}
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