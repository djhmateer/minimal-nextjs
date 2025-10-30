'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

export type ActionState = {
  success: boolean;
  message: string;
} | null;

/**
 * Server Action: Sign up a new user with email and password
 * Returns success/error state for client component to display
 */
export async function signUpAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    console.log('Sign up successful:', email);
    revalidatePath('/betterauthserver');

    return {
      success: true,
      message: 'Account created and signed in successfully! Welcome to Better Auth.',
    };
  } catch (error) {
    console.error('Sign up error:', error);

    return {
      success: false,
      message: 'Sign up failed. This email may already be registered.',
    };
  }
}

/**
 * Server Action: Sign in an existing user with email and password
 * Returns success/error state for client component to display
 */
export async function signInAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    console.log('Sign in successful:', email);
    revalidatePath('/betterauthserver');

    return {
      success: true,
      message: `Welcome back! You're now signed in.`,
    };
  } catch (error) {
    console.error('Sign in error:', error);

    return {
      success: false,
      message: 'Sign in failed. Please check your email and password.',
    };
  }
}

/**
 * Server Action: Sign out the current user
 * Returns success/error state for client component to display
 */
export async function signOutAction(
  _prevState: ActionState,
  _formData: FormData
): Promise<ActionState> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    console.log('Sign out successful');
    revalidatePath('/betterauthserver');

    return {
      success: true,
      message: 'You have been signed out successfully.',
    };
  } catch (error) {
    console.error('Sign out error:', error);

    return {
      success: false,
      message: 'Sign out failed. Please try again.',
    };
  }
}
