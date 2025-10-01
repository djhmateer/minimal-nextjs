"use client";

export default function ButtonComponent() {
    return <button onClick={() => alert("hello")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">Click Me</button>;
}
