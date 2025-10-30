'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

type SuccessToastProps = {
  registered?: boolean;
};

/**
 * Client component that shows a toast notification
 * when user successfully registers and is redirected to login
 */
export function SuccessToast({ registered }: SuccessToastProps) {
  useEffect(() => {
    if (registered) {
      toast.success('Welcome! Account created successfully', {
        description: 'Please log in with your credentials to get started.',
        duration: 5000,
      });
    }
  }, [registered]);

  return null;
}
