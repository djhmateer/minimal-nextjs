import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { LoginForm } from './login-form';

export const dynamic = 'force-dynamic';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Redirect if already authenticated
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const params = await searchParams;
  const callbackUrl = params.callbackUrl as string | undefined;

  if (session) {
    // If already authenticated and there's a callback URL, redirect there
    if (callbackUrl) {
      redirect(callbackUrl);
    }
    redirect('/');
  }

  const registered = params.registered === 'true';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-3 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500 transition"
            >
              Register
            </a>
          </p>
        </div>

        {callbackUrl && (
          <div className="mb-6 rounded-lg bg-yellow-50 p-4 border border-yellow-300">
            <p className="text-sm text-yellow-800">
              ⚠️ Please log in to access this page.
            </p>
          </div>
        )}

        {registered && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-300">
            <p className="text-sm text-green-800">
              ✓ Account created successfully! Please log in with your credentials.
            </p>
          </div>
        )}

        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
