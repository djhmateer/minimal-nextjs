// app/posts/page.tsx

export const dynamic = 'force-dynamic';

const Post = async () => {
  console.log('Post page');
  const currentTime = new Date().toLocaleString();
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Post</h1>
    </div>
  );
};

export default Post;