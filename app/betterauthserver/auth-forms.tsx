'use client';

import { useActionState } from 'react';
import { signUpAction, signInAction, signOutAction, type ActionState } from './actions';

type AuthFormsProps = {
  isAuthenticated: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
  };
  session?: {
    id: string;
    expiresAt: Date;
  };
};

export function AuthForms({ isAuthenticated, user, session }: AuthFormsProps) {
  const [signUpState, signUpFormAction, isSignUpPending] = useActionState<ActionState, FormData>(
    signUpAction,
    null
  );

  const [signInState, signInFormAction, isSignInPending] = useActionState<ActionState, FormData>(
    signInAction,
    null
  );

  const [signOutState, signOutFormAction, isSignOutPending] = useActionState<ActionState, FormData>(
    signOutAction,
    null
  );

  if (isAuthenticated && user && session) {
    return (
      <div className="space-y-6">
        {/* Success/Error Messages for Sign Out */}
        {signOutState && (
          <div
            className={`p-4 rounded-lg border ${
              signOutState.success
                ? 'bg-green-50 border-green-300 text-green-800'
                : 'bg-red-50 border-red-300 text-red-800'
            }`}
          >
            {signOutState.message}
          </div>
        )}

        {/* Authenticated User Display */}
        <div className="border rounded-lg p-6 bg-green-50">
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            Authenticated User
          </h2>
          <div className="space-y-2 mb-4">
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Session ID:</strong> {session.id}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Expires:</strong> {new Date(session.expiresAt).toLocaleString()}
            </p>
          </div>

          {/* Sign Out Form */}
          <form action={signOutFormAction}>
            <button
              type="submit"
              disabled={isSignOutPending}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSignOutPending ? 'Signing out...' : 'Sign Out'}
            </button>
          </form>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>Pure SSR + Client Component Pattern:</strong> Forms use Server Actions with useActionState, inline messages, no URL params.
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated - show sign up and sign in forms
  return (
    <div className="space-y-6">
      {/* Sign Up Form */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

        {/* Success/Error Messages */}
        {signUpState && (
          <div
            className={`mb-4 p-4 rounded-lg border ${
              signUpState.success
                ? 'bg-green-50 border-green-300 text-green-800'
                : 'bg-red-50 border-red-300 text-red-800'
            }`}
          >
            {signUpState.message}
          </div>
        )}

        <form action={signUpFormAction} className="space-y-4">
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
              disabled={isSignUpPending}
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
              disabled={isSignUpPending}
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
              disabled={isSignUpPending}
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          </div>
          <button
            type="submit"
            disabled={isSignUpPending}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSignUpPending ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>

        {/* Success/Error Messages */}
        {signInState && (
          <div
            className={`mb-4 p-4 rounded-lg border ${
              signInState.success
                ? 'bg-green-50 border-green-300 text-green-800'
                : 'bg-red-50 border-red-300 text-red-800'
            }`}
          >
            {signInState.message}
          </div>
        )}

        <form action={signInFormAction} className="space-y-4">
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
              disabled={isSignInPending}
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
              disabled={isSignInPending}
            />
          </div>
          <button
            type="submit"
            disabled={isSignInPending}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSignInPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
