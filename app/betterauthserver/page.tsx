import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function BetterAuthServerPage() {
  console.log('BetterAuthServerPage: Rendering server-side');

  // Get the current session from Better Auth server-side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login?callbackUrl=/betterauthserver');
  }

  console.log('BetterAuthServerPage: Authenticated user:', session.user.email);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Hello Secret</h1>
        <p className="text-gray-600">
          This is a protected page. You can only see this because you are authenticated.
        </p>
      </div>
    </div>
  );
}