/**
 * Contact Form Page - demonstrates shadcn/ui components with form validation
 *
 * This is a Client Component that uses:
 * - react-hook-form for form state management
 * - zod for schema validation
 * - shadcn/ui components for UI
 */
"use client"

// Form validation libraries
import { zodResolver } from "@hookform/resolvers/zod" // Connects Zod schema to react-hook-form
import { useForm } from "react-hook-form" // Form state management and validation
import { z } from "zod" // TypeScript-first schema validation

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

/**
 * Contact form validation schema using Zod
 * Defines the shape and validation rules for the form data
 */
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(500, {
    message: "Message must not be longer than 500 characters.",
  }),
})

export default function ShadcnbPage() {
  console.log("Rendering ShadcnbPage")

  /**
   * Initialize react-hook-form with Zod validation
   * - resolver: Connects the Zod schema to react-hook-form
   * - defaultValues: Initial values for all form fields
   */
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  /**
   * Handle form submission
   * This runs after validation passes
   */
  function onSubmit(data: z.infer<typeof contactFormSchema>) {
    console.log("Form submitted:", data)
    // TODO: Send data to backend API
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
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}