// app/posts/page.tsx

import ButtonComponent from "./button";

export const dynamic = 'force-dynamic';

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export default async function Contact() {
    console.log('Contact page');
    // const currentTime = new Date().toLocaleString();
    // get some data https://jsonplaceholder.typicode.com/posts
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await response.json();
    console.log('Contact Posts fetched:', posts.length);

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Contact</h1>
            <div><ButtonComponent /></div>

            <div className="space-y-4">
                {posts.slice(0, 2).map((post) => (
                    <div key={post.id} className="bg-white border border-gray-200 rounded p-4 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                            {post.id}. {post.title}
                        </h2>
                        <p className="text-gray-600">{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}