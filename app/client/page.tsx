'use client';

import { useState } from 'react';

export default function Client() {
    console.log('Client page');
    const currentTime = new Date().toLocaleString();
    const [count, setCount] = useState(0);

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Client Component Demo</h1>
            <p className="mb-4">Client component</p>
            <div className="mb-4">
                <p className="mb-2">Browser time: {currentTime}</p>
                <p className="mb-2">Count: {count}</p>
                <button
                    onClick={() => setCount(count + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Click me!
                </button>
                <p className="mb-2">Console.log prod does show in the browser window which makes sense as running on the client</p>
            </div>
        </div>
    );
}