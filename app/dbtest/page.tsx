// app/posts/page.tsx

export const dynamic = 'force-dynamic';

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export default async function Dbtest() {
    console.log('Dbtest page');

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Dbtest</h1>
        </div>
    );
}