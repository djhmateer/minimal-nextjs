import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginSuccessToast } from '../login-success-toast';

// Force dynamic rendering to check authentication on every request
export const dynamic = 'force-dynamic';

/**
 * Protected Page - Requires Authentication
 *
 * This page demonstrates server-side authentication protection using Better Auth.
 * It checks the session on the server before rendering, ensuring only authenticated
 * users can access this content.
 *
 * Flow:
 * 1. User navigates to /protectedpage
 * 2. Server fetches session from Better Auth using request headers
 * 3. If no session exists, redirect to /login with callback URL
 * 4. After login, user is redirected back to /protectedpage
 * 5. If session exists, render protected content
 */
export default async function ProtectedPage() {
  console.log('[ProtectedPage] Starting server-side render');

  // Get the current session from Better Auth
  // This reads the session cookie from the request headers
  console.log('[ProtectedPage] Fetching session from Better Auth');
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect to login if not authenticated
  // The callbackUrl parameter tells the login page where to redirect after successful login
  if (!session) {
    console.log('[ProtectedPage] No session found - redirecting to login');
    redirect('/login?callbackUrl=/protectedpage');
  }

  console.log('[ProtectedPage] Session found - user:', session.user.email, 'userId:', session.user.id);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <LoginSuccessToast />
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Hello Secret</h1>
        <p className="text-gray-600">
          This is a protected page. You can only see this because you are authenticated.
        </p>
      </div>
    </div>
  );
}