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
      // Call server action (this function is inside ations.ts)
      const result = await submitContactForm(data)
      console.log("Client: Server response:", result)

      setSubmitResult(`✓ ${result.message} at ${new Date(result.timestamp).toLocaleTimeString()}`)

      // Reset form after successful submission
      form.reset()
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
            <strong>Architecture:</strong> This is a <strong>Client Component</strong> using{" "}
            <strong>shadcn/ui</strong> + <strong>React Hook Form</strong> for production-quality forms.
          </p>
          <p>
            <strong>Flow:</strong> User types → React Hook Form validates on change → Shows inline errors →
            Form submits → Server Action processes → Success message shown inline (no redirect)
          </p>
          <p>
            <strong>Stack:</strong> shadcn/ui components + React Hook Form (manual validation rules) + Server Actions
          </p>
        </div>
      </div>

      {/* Advantages */}
      <div className="mb-8 p-6 bg-green-50 rounded-lg border border-green-200">
        <h2 className="text-lg font-semibold mb-3 text-green-900">✅ Advantages (Production-Ready Forms)</h2>
        <ul className="text-sm text-green-800 space-y-2 list-disc list-inside">
          <li>
            <strong>Real-time validation:</strong> Errors show as you type (<code className="bg-green-100 px-1 rounded">mode: &quot;onChange&quot;</code>)
          </li>
          <li>
            <strong>Automatic blur validation:</strong> React Hook Form handles onBlur automatically
          </li>
          <li>
            <strong>Built-in accessibility:</strong> All shadcn/ui components have ARIA labels, roles, and keyboard navigation
          </li>
          <li>
            <strong>Loading states:</strong> Button shows &quot;Submitting...&quot; with disabled state
          </li>
          <li>
            <strong>Success feedback:</strong> Inline message without redirect, form auto-resets
          </li>
          <li>
            <strong>Professional UI:</strong> shadcn/ui components look polished out of the box
          </li>
          <li>
            <strong>Type-safe:</strong> Full TypeScript support with <code className="bg-green-100 px-1 rounded">ContactFormData</code> type
          </li>
          <li>
            <strong>Battle-tested:</strong> React Hook Form used by thousands of production apps
          </li>
        </ul>
      </div>

      {/* Limitations */}
      <div className="mb-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
        <h2 className="text-lg font-semibold mb-3 text-amber-900">⚠️ Current Limitations</h2>
        <ul className="text-sm text-amber-800 space-y-2 list-disc list-inside">
          <li>
            <strong>Manual validation rules:</strong> Using <code className="bg-amber-100 px-1 rounded">rules</code> prop instead of Zod
            (verbose, error-prone)
          </li>
          <li>
            <strong>No schema reuse:</strong> Validation rules only on client (should use Zod for client + server validation)
          </li>
          <li>
            <strong>Duplication:</strong> Have to define same validation rules in client and Server Action separately
          </li>
          <li>
            <strong>Bundle size:</strong> ~21.4 KB (includes React Hook Form, shadcn components, and UI logic)
          </li>
        </ul>
        <p className="text-xs text-amber-700 mt-3">
          💡 <strong>Recommended upgrade:</strong> Use <strong>Zod</strong> with{" "}
          <code className="bg-amber-100 px-1 rounded">zodResolver</code> for type-safe schema validation that works on both
          client and server.
        </p>
      </div>

      {/* Recommended upgrade */}
      <div className="mb-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
        <h2 className="text-lg font-semibold mb-3 text-purple-900">🚀 Recommended Upgrade: Add Zod</h2>
        <div className="text-sm text-purple-800 space-y-2">
          <p>
            <strong>Current:</strong> Manual validation with <code className="bg-purple-100 px-1 rounded">rules</code> prop
          </p>
          <p>
            <strong>Better:</strong> Use Zod schema with <code className="bg-purple-100 px-1 rounded">zodResolver</code>
          </p>
          <div className="bg-purple-100 p-3 rounded mt-2 font-mono text-xs">
            <div>const schema = z.object(&#123;</div>
            <div>&nbsp;&nbsp;name: z.string().min(2, &quot;Name required&quot;),</div>
            <div>&nbsp;&nbsp;email: z.string().email(&quot;Invalid email&quot;),</div>
            <div>&nbsp;&nbsp;message: z.string().min(10).max(500)</div>
            <div>&#125;)</div>
            <div className="mt-2">useForm(&#123; resolver: zodResolver(schema) &#125;)</div>
          </div>
          <p className="mt-2">
            <strong>Benefits:</strong> Single source of truth, type-safe, server can reuse same schema, auto-generated types
          </p>
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