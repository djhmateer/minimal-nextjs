'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

/**
 * Client component that shows a toast notification
 * when user successfully logs in and is redirected
 *
 * This component can be used on any page that receives
 * the ?loggedIn=true query parameter
 */
export function LoginSuccessToast() {
  const searchParams = useSearchParams();
  const loggedIn = searchParams.get('loggedIn') === 'true';

  useEffect(() => {
    if (loggedIn) {
      toast.success('Welcome back!', {
        description: 'You have successfully logged in.',
        duration: 4000,
      });
    }
  }, [loggedIn]);

  return null;
}
