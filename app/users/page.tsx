// app/users/page.tsx

// lets see if it gets dynamic.. it should
// export const dynamic = 'force-dynamic';

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
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await res.json();

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Users</h1>

            <div className="space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="bg-white border border-gray-200 rounded p-4 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                            {user.name} (@{user.username})
                        </h2>
                        <div className="text-gray-600 space-y-1">
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                            <p>Website: {user.website}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}