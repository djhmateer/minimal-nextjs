'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

/**
 * Server Action: Sign up a new user with email and password
 */
export async function signUpAction(formData: FormData) {
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
  } catch (error) {
    console.error('Sign up error:', error);
    revalidatePath('/betterauthserver');
    redirect('/betterauthserver?error=signup_failed');
  }

  // redirect() throws NEXT_REDIRECT error - keep it outside try-catch
  revalidatePath('/betterauthserver');
  redirect('/betterauthserver?success=signup');
}

/**
 * Server Action: Sign in an existing user with email and password
 */
export async function signInAction(formData: FormData) {
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
  } catch (error) {
    console.error('Sign in error:', error);
    revalidatePath('/betterauthserver');
    redirect('/betterauthserver?error=signin_failed');
  }

  // redirect() throws NEXT_REDIRECT error - keep it outside try-catch
  revalidatePath('/betterauthserver');
  redirect('/betterauthserver?success=signin');
}

/**
 * Server Action: Sign out the current user
 */
export async function signOutAction() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    console.log('Sign out successful');
  } catch (error) {
    console.error('Sign out error:', error);
    revalidatePath('/betterauthserver');
    redirect('/betterauthserver?error=signout_failed');
  }

  // redirect() throws NEXT_REDIRECT error - keep it outside try-catch
  revalidatePath('/betterauthserver');
  redirect('/betterauthserver?success=signout');
}
