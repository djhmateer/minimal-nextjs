'use server';

/**
 * Global Authentication Server Action
 *
 * This file contains globally-used authentication actions.
 * Currently only contains signOutAction which is used from:
 * - app/layout.tsx (auth status display)
 * - app/sign-out-button.tsx (sign out button)
 *
 * Route-specific auth actions are colocated with their routes:
 * - app/register/actions.ts (signUpAction)
 * - app/login/actions.ts (signInAction)
 */

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

/**
 * Server Action: Sign out the current user
 *
 * This action:
 * 1. Calls Better Auth's signOut API to invalidate the session
 * 2. Better Auth clears the session cookie automatically
 * 3. Revalidates cache to update auth state across the app
 * 4. Redirects to login page
 *
 * @returns void (redirects to login page)
 */
export async function signOutAction(): Promise<void> {
  console.log('[signOutAction] Starting sign out process');

  try {
    console.log('[signOutAction] Calling Better Auth signOut API');
    await auth.api.signOut({
      headers: await headers(),
    });

    console.log('[signOutAction] Sign out successful - session cookie cleared');
    console.log('[signOutAction] Revalidating path to update cache');
    revalidatePath('/');
  } catch (error) {
    console.error('[signOutAction] Sign out error:', error);
  }

  // Redirect outside try-catch (throws NEXT_REDIRECT which is not a real error)
  console.log('[signOutAction] Redirecting to login page');
  redirect('/login');
}
