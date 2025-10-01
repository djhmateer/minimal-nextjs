// app/users/page.tsx

// import next from "next";

// lets see if it gets dynamic by default - it didn't
export const dynamic = 'force-dynamic';

// interface User {
//     id: number;
//     name: string;
//     email: string;
//     username: string;
//     phone: string;
//     website: string;
// }

// lets prefer this to arrow functions as more explicit and consistent with docs
// in the props we can destructure the params
export default async function UserPage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    console.log('UserPage', userId);
    return <div className="p-4">User ID: {userId}</div>;
}