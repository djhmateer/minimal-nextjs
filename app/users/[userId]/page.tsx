// app/users/page.tsx

export const dynamic = 'force-dynamic';

interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    website: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export default async function UserPage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    console.log('UserPage', userId);

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user: User = await res.json();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{user.name}</h1>

            <div className="mb-4">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Username:</strong> @{user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Website:</strong> {user.website}</p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-2">Address</h2>
            <div className="ml-4 mb-4">
                <p><strong>Street:</strong> {user.address.street}</p>
                <p><strong>Suite:</strong> {user.address.suite}</p>
                <p><strong>City:</strong> {user.address.city}</p>
                <p><strong>Zipcode:</strong> {user.address.zipcode}</p>

                <h3 className="text-lg font-semibold mt-3 mb-1">Geo</h3>
                <div className="ml-4">
                    <p><strong>Lat:</strong> {user.address.geo.lat}</p>
                    <p><strong>Lng:</strong> {user.address.geo.lng}</p>
                </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-2">Company</h2>
            <div className="ml-4">
                <p><strong>Name:</strong> {user.company.name}</p>
                <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
                <p><strong>BS:</strong> {user.company.bs}</p>
            </div>
        </div>
    );
}