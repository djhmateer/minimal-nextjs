import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

interface User {
    id: number;
    name: string;
}

export default async function Dbtest() {
    console.log('Dbtest page');

    const pool = new Pool({
        user: 'bob',
        password: 'password',
        host: 'localhost',
        database: 'postgres',
        port: 5432,
    });

    let users: User[] = [];
    let error = null;

    try {
        const result = await pool.query('SELECT * FROM users');
        users = result.rows;
    } catch (err) {
        error = err instanceof Error ? err.message : 'Unknown error';
        console.error('Database error:', error);
    } finally {
        await pool.end();
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Database Test</h1>

            {error ? (
                <div className="text-red-600 mb-4">
                    <p className="font-semibold">Error:</p>
                    <p>{error}</p>
                </div>
            ) : (
                <div>
                    <p className="mb-4">Users from database:</p>
                    <ul className="space-y-2">
                        {users.map((user) => (
                            <li key={user.id} className="bg-white border rounded p-2">
                                {user.id}. {user.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}