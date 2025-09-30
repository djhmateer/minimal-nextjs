'use client';

import { useState } from 'react';

export const dynamic = 'force-dynamic';

const ClientDynamicPage = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Client (Dynamic) Component Demo</h1>
            <p className="mb-4">When you navigate between routes, Next.js unmounts the current page component, an mounts the new one.  So that is why the state returns to 0 after clicking away.
                Could use localStorage, or state in the layout component as this stays mounted.</p>
            <div className="mb-4">
                <p className="mb-2">Count: {count}</p>
                <button
                    onClick={() => setCount(count + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Click me!
                </button>
            </div>
        </div>
    );
};

export default ClientDynamicPage;