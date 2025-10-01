// app/users/page.tsx

// lets see if it gets dynamic.. it should
// export const dynamic = 'force-dynamic';

// lets prefer this to arrow functions as more explicit and consistent with docs
export default async function Users() {
    console.log('Users page');

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Users</h1>
        </div>
    );

}