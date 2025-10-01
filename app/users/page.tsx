// app/users/page.tsx

import Link from "next/link";

// lets see if it gets dynamic by default - it didn't unless I forced a revalidate on fetch
export const dynamic = 'force-dynamic';

interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    website: string;
}

// lets prefer this to arrow functions as more explicit and consistent with docs
export default async function Users() {
    console.log('Users page');
    const startTime = Date.now();

    const res = await fetch('https://jsonplaceholder.typicode.com/users');

    const users: User[] = await res.json();
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log(`Users fetched: ${users.length} in ${duration}ms`);

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Users</h1>

            <ul className="space-y-2">
                {users.map((user) => (
                    <li key={user.id}>
                        <Link href={`/users/${user.id}`} prefetch={false} className="text-blue-600 hover:underline">
                            {user.id}. {user.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}