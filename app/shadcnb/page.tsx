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