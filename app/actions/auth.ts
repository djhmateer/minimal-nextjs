'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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
 * Server Action: Sign up a new user with email and password
 * Redirects to sign-in page on success
 */
export async function signUpAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Basic validation
  if (!name || name.length < 2) {
    return {
      success: false,
      message: 'Please enter a valid name (at least 2 characters).',
      errors: { name: 'Name must be at least 2 characters' },
    };
  }

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
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    console.log('Sign up successful:', email);
    revalidatePath('/');
  } catch (error) {
    console.error('Sign up error:', error);

    return {
      success: false,
      message: 'Sign up failed. This email may already be registered.',
    };
  }

  // Redirect outside try-catch (throws NEXT_REDIRECT)
  redirect('/sign-in?registered=true');
}

/**
 * Server Action: Sign in an existing user with email and password
 * Redirects to callback URL or home page on success
 */
export async function signInAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const callbackUrl = formData.get('callbackUrl') as string | null;

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
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    console.log('Sign in successful:', email);
    revalidatePath('/');
  } catch (error) {
    console.error('Sign in error:', error);

    return {
      success: false,
      message: 'Sign in failed. Please check your email and password.',
    };
  }

  // Redirect outside try-catch (throws NEXT_REDIRECT)
  // Redirect to callback URL if provided, otherwise go to home
  redirect(callbackUrl || '/');
}

/**
 * Server Action: Sign out the current user
 * Redirects to sign-in page
 */
export async function signOutAction(): Promise<void> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    console.log('Sign out successful');
    revalidatePath('/');
  } catch (error) {
    console.error('Sign out error:', error);
  }

  // Redirect outside try-catch
  redirect('/sign-in');
}
