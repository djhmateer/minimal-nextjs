// app/posts/page.tsx

export const dynamic = 'force-dynamic';

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export default async function Posts() {
    console.log('Posts page');
    // const currentTime = new Date().toLocaleString();
    // get some data https://jsonplaceholder.typicode.com/posts
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await response.json();
    console.log('Posts fetched:', posts.length);

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Posts</h1>
            <p className="mb-4">console.log of the fetched posts from https://jsonplaceholder.typicode.com/posts is shown in server output</p>
            <p className="mb-4">Each page is SSRd so a new request, and a new call to get data</p>

            <div className="space-y-4">
                {posts.slice(0, 3).map((post) => (
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