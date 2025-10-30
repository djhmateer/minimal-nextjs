'use server';

/**
 * Login Server Action
 *
 * This file contains the server action for user login/sign-in.
 * Server Actions marked with 'use server' run exclusively on the server and can
 * be called directly from Client Components or Server Components.
 *
 * Login Flow:
 * 1. Client submits form with email, password, and optional callbackUrl
 * 2. Server Action validates input
 * 3. Better Auth API verifies credentials against PostgreSQL
 * 4. Better Auth sets session cookie via nextCookies plugin
 * 5. Redirects to callback URL or home page on success
 */

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

/**
 * Action state returned to client components
 * Used by useActionState hook for displaying validation errors and messages
 */
export type ActionState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string;
    email?: string;
    password?: string;
  };
} | null;

/**
 * Server Action: Sign in an existing user with email and password
 *
 * This action:
 * 1. Validates form input (email, password)
 * 2. Calls Better Auth's signInEmail API to verify credentials
 * 3. Better Auth sets session cookie automatically via nextCookies plugin
 * 4. Revalidates cache to update auth state across the app
 * 5. Redirects to callback URL (if provided) or home page
 *
 * The callbackUrl parameter enables protected pages to redirect users back
 * after successful login (e.g., /protectedpage -> /login -> /protectedpage).
 *
 * @param _prevState - Previous action state (unused, required by useActionState)
 * @param formData - Form data containing email, password, and optional callbackUrl
 * @returns ActionState with success/error messages, or redirects on success
 */
export async function signInAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  console.log('[signInAction] Starting sign in process');

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const callbackUrl = formData.get('callbackUrl') as string | null;

  console.log('[signInAction] Sign in attempt for email:', email);
  if (callbackUrl) {
    console.log('[signInAction] Callback URL provided:', callbackUrl);
  }

  // Basic validation
  if (!email || !email.includes('@')) {
    return {
      success: false,
      message: 'Please enter a valid email address.',
      errors: { email: 'Invalid email address' },
    };
  }

  if (!password || password.length < 8) {
    return {
      success: false,
      message: 'Password must be at least 8 characters long.',
      errors: { password: 'Password must be at least 8 characters' },
    };
  }

  try {
    console.log('[signInAction] Calling Better Auth signInEmail API');
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    console.log('[signInAction] Sign in successful for:', email);
    console.log('[signInAction] Session cookie set by Better Auth nextCookies plugin');
    console.log('[signInAction] Revalidating path to update cache');
    revalidatePath('/');
  } catch (error) {
    console.error('[signInAction] Sign in error:', error);

    return {
      success: false,
      message: 'Sign in failed. Please check your email and password.',
    };
  }

  // Redirect outside try-catch (throws NEXT_REDIRECT which is not a real error)
  // Redirect to callback URL if provided, otherwise go to home
  const redirectUrl = callbackUrl || '/';
  console.log('[signInAction] Redirecting to:', redirectUrl);
  redirect(redirectUrl);
}
