'use server';

/**
 * Registration Server Action
 *
 * This file contains the server action for user registration.
 * Server Actions marked with 'use server' run exclusively on the server and can
 * be called directly from Client Components or Server Components.
 *
 * Registration Flow:
 * 1. Client submits form with email, password, confirmPassword
 * 2. Server Action validates input and password match
 * 3. Better Auth API creates user in PostgreSQL
 * 4. Redirects to login page on success
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
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  values?: {
    email?: string;
  };
} | null;

/**
 * Server Action: Sign up a new user with email and password
 *
 * This action:
 * 1. Validates form input (email, password, confirmPassword)
 * 2. Ensures passwords match
 * 3. Calls Better Auth's signUpEmail API to create user in database
 * 4. Revalidates cache to update auth state across the app
 * 5. Redirects to login page on success
 *
 * Note: redirect() is called outside try-catch because it throws a special
 * NEXT_REDIRECT error by design - this is not a real error.
 *
 * @param _prevState - Previous action state (unused, required by useActionState)
 * @param formData - Form data containing email, password, confirmPassword
 * @returns ActionState with success/error messages, or redirects on success
 */
export async function signUpAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  console.log('[signUpAction] Starting sign up process');

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  console.log('[signUpAction] Validating input for email:', email);

  // Basic validation
  if (!email || !email.includes('@')) {
    return {
      success: false,
      message: 'Please enter a valid email address.',
      errors: { email: 'Invalid email address' },
      values: { email },
    };
  }

  if (!password || password.length < 8) {
    return {
      success: false,
      message: 'Password must be at least 8 characters long.',
      errors: { password: 'Password must be at least 8 characters' },
      values: { email },
    };
  }

  if (!confirmPassword) {
    return {
      success: false,
      message: 'Please confirm your password.',
      errors: { confirmPassword: 'Password confirmation is required' },
      values: { email },
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: 'Passwords do not match.',
      errors: { confirmPassword: 'Passwords do not match' },
      values: { email },
    };
  }

  try {
    console.log('[signUpAction] Calling Better Auth signUpEmail API');
    await auth.api.signUpEmail({
      body: {
        name: email, // Use email as the name
        email,
        password,
      },
    });

    console.log('[signUpAction] Sign up successful for:', email);
    console.log('[signUpAction] Revalidating path to update cache');
    revalidatePath('/');
  } catch (error) {
    console.error('[signUpAction] Sign up error:', error);

    return {
      success: false,
      message: 'Sign up failed. This email may already be registered.',
      values: { email },
    };
  }

  // Redirect outside try-catch (throws NEXT_REDIRECT which is not a real error)
  console.log('[signUpAction] Redirecting to login page');
  redirect('/login?registered=true');
}
