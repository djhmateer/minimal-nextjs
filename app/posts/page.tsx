// app/posts/page.tsx

export const dynamic = 'force-dynamic';

const Post = async () => {
    console.log('Posts page');
    // const currentTime = new Date().toLocaleString();
    // get some data https://jsonplaceholder.typicode.com/posts
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    console.log('Posts fetched:', posts);

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Posts</h1>
            <p className="mb-4">console.log of the fetched posts from https://jsonplaceholder.typicode.com/posts is shown in server output</p>

            <div className="space-y-4">
                {posts.slice(0, 5).map((post: any) => (
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
};

export default Post;