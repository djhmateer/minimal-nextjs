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
            <h1 className="text-2xl mb-4">Post</h1>
        </div>
    );
};

export default Post;