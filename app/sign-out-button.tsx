'use client';

import { signOutAction } from './actions/auth';
import { useTransition } from 'react';

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOutAction();
    });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}
