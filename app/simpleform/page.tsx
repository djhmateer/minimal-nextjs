// app/contact/Form.tsx
"use client"

import { submitContact } from "./actions"

export default function SimpleFormPage() {
  return (
    <div className="max-w-lg mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-6">Simple Form (Server Action)</h1>
      <form action={submitContact} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  )
}
