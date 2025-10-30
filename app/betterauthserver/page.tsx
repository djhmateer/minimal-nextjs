export const dynamic = 'force-dynamic';

export default async function BetterAuthServerPage() {
  console.log('BetterAuthServerPage page');
  // await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate slow loading
  const currentTime = new Date().toLocaleString();
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">BetterAuthServerPage</h1>
      <p>Html is Server Side Rendered on each request {currentTime}</p>
    </div>
  );
}