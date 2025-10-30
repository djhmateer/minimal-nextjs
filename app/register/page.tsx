import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { RegisterForm } from './register-form';

export const dynamic = 'force-dynamic';

export default async function RegisterPage() {
  // Redirect if already authenticated
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-3 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition"
            >
              Log in
            </a>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
