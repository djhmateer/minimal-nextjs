// app/contact/actions.ts
"use server"

// import { db } from "@/lib/db"

export async function submitContact(formData: FormData) {
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // Secure server-only work here
    //   await db.insert("contacts", { name, email, message })
    console.log("Server: Received contact form submission:", { name, email, message })

    // When used directly in form action, don't return a value
    // To return data to client, use useFormState or useActionState instead
}
