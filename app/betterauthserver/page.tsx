import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { signUpAction, signInAction, signOutAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function BetterAuthServerPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  console.log('BetterAuthServerPage: Rendering server-side');

  const params = await searchParams;
  const success = params.success as string | undefined;
  const error = params.error as string | undefined;

  // Get the current session from Better Auth server-side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentTime = new Date().toLocaleString();

  console.log('BetterAuthServerPage: Session data:', session ? {
    userId: session.user.id,
    email: session.user.email,
    name: session.user.name
  } : 'No active session');

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Better Auth - Pure SSR</h1>
      <p className="text-gray-600 mb-6">
        Server rendered at: {currentTime}
      </p>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
          {success === 'signup' && 'Account created and signed in successfully!'}
          {success === 'signin' && 'Signed in successfully!'}
          {success === 'signout' && 'Signed out successfully!'}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
          {error === 'signup_failed' && 'Sign up failed. Email may already exist.'}
          {error === 'signin_failed' && 'Sign in failed. Check your credentials.'}
          {error === 'signout_failed' && 'Sign out failed. Please try again.'}
        </div>
      )}

      {session ? (
        /* Authenticated User View */
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-green-50">
            <h2 className="text-xl font-semibold mb-4 text-green-800">
              Authenticated User
            </h2>
            <div className="space-y-2 mb-4">
              <p><strong>User ID:</strong> {session.user.id}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
              <p><strong>Name:</strong> {session.user.name}</p>
              <p><strong>Email Verified:</strong> {session.user.emailVerified ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Session ID:</strong> {session.session.id}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Expires:</strong> {new Date(session.session.expiresAt).toLocaleString()}
              </p>
            </div>

            {/* Sign Out Form */}
            <form action={signOutAction}>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </form>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Pure SSR Pattern:</strong> Forms use Server Actions, authentication happens server-side, no client JavaScript needed.
            </p>
          </div>
        </div>
      ) : (
        /* Unauthenticated User View - Show Forms */
        <div className="space-y-6">
          {/* Sign Up Form */}
          <div className="border rounded-lg p-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
            <form action={signUpAction} className="space-y-4">
              <div>
                <label htmlFor="signup-name" className="block mb-1 font-medium text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="signup-name"
                  name="name"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block mb-1 font-medium text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block mb-1 font-medium text-sm">
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className="border rounded-lg p-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">Sign In</h2>
            <form action={signInAction} className="space-y-4">
              <div>
                <label htmlFor="signin-email" className="block mb-1 font-medium text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="signin-email"
                  name="email"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="signin-password" className="block mb-1 font-medium text-sm">
                  Password
                </label>
                <input
                  type="password"
                  id="signin-password"
                  name="password"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">How this works:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>Pure Server-Side Rendering with <code>force-dynamic</code></li>
          <li>Forms use Next.js Server Actions (no client JavaScript)</li>
          <li>Authentication happens entirely on the server</li>
          <li>Better Auth manages session cookies automatically</li>
          <li>Page revalidates after auth actions to show updated state</li>
          <li>All console logs appear in server terminal</li>
        </ul>
      </div>
    </div>
  );
}