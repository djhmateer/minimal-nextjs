import { createPgClient } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface Table {
    tablename: string;
}

interface User {
    id: number;
    name: string;
}

export default async function Dbtest() {
    console.log('Dbtest page');

    let tables: Table[] = [];
    let users: User[] = [];
    let error = null;

    try {
        const client = createPgClient();

        try {
            await client.connect();

            const tablesResult = await client.query(
                "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'"
            );
            tables = tablesResult.rows;
            console.log('Tables:', tables);

            const usersResult = await client.query('SELECT * FROM users');
            users = usersResult.rows;
            console.log('Users:', users);
        } finally {
            await client.end();
        }
    } catch (err) {
        error = err instanceof Error ? err.message : 'Unknown error';
        console.error('Database error:', error);
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Database Connection Test</h1>

            {error ? (
                <div className="text-red-600 mb-4">
                    <p className="font-semibold">Error:</p>
                    <p>{error}</p>
                </div>
            ) : (
                <div>
                    <p className="mb-4 text-green-600">✓ Connected successfully!</p>

                    <div className="mb-6">
                        <p className="mb-2 font-semibold">Tables in database:</p>
                        <ul className="space-y-2">
                            {tables.length === 0 ? (
                                <li className="text-gray-500">No tables found</li>
                            ) : (
                                tables.map((table) => (
                                    <li key={table.tablename} className="bg-white border rounded p-2">
                                        {table.tablename}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div>
                        <p className="mb-2 font-semibold">Users:</p>
                        <ul className="space-y-2">
                            {users.length === 0 ? (
                                <li className="text-gray-500">No users found</li>
                            ) : (
                                users.map((user) => (
                                    <li key={user.id} className="bg-white border rounded p-2">
                                        {user.id}. {user.name}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}