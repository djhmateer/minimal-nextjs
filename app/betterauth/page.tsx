/**
 * Better Auth Demo Page - Client Component Pattern
 *
 * PATTERN: 4. Client Component (Browser)
 * - 'use client' directive = Runs in the browser
 * - Has access to useState, useEffect, browser APIs
 * - Interactive forms and real-time session updates
 * - console.log appears in browser console
 *
 * This demonstrates email/password authentication with Better Auth:
 * - Sign up new users
 * - Sign in existing users
 * - Display current session
 * - Sign out functionality
 */

"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function BetterAuthPage() {
  const { data: session, isPending } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (result.error) {
      setError(result.error.message || "Sign up failed");
    } else {
      setSuccess("Account created successfully!");
      setEmail("");
      setPassword("");
      setName("");
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await authClient.signIn.email({
      email,
      password,
    });

    if (result.error) {
      setError(result.error.message || "Sign in failed");
    } else {
      setSuccess("Signed in successfully!");
      setEmail("");
      setPassword("");
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    setSuccess("Signed out successfully!");
  };

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <p>Loading session...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Better Auth Demo</h1>

      {/* Pattern indicator */}
      <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>Pattern:</strong> 4. Client Component (Browser) - <code className="bg-blue-100 px-1 rounded">'use client'</code>
        </p>
        <p className="text-xs text-blue-700 mt-1">
          Interactive authentication with useState, form handling, and reactive session updates
        </p>
      </div>

      {/* Session Status */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Session Status</h2>
        {session ? (
          <div>
            <p className="text-green-600 mb-2">✓ Signed in</p>
            <div className="bg-gray-50 p-3 rounded mb-4">
              <p><strong>User ID:</strong> {session.user.id}</p>
              <p><strong>Name:</strong> {session.user.name}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
              <p><strong>Email Verified:</strong> {session.user.emailVerified ? "Yes" : "No"}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <p className="text-gray-600">Not signed in</p>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Sign Up Form */}
      {!session && (
        <>
          <div className="mb-8 p-6 border rounded">
            <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  autoComplete="new-password"
                  required
                  minLength={8}
                />
                <p className="text-sm text-gray-500 mt-1">Minimum 8 characters</p>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className="p-6 border rounded">
            <h2 className="text-xl font-semibold mb-4">Sign In</h2>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  autoComplete="current-password"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Sign In
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
