// app/about/page.tsx

// this page is server side rendered on each request
// see https://nextjs.org/docs/app/building-your-application/routing#dynamic-segments
// the default is 'auto' which means next.js will decide based on if you use async or not
// here we force it to be dynamic (server side rendered on each request) even though this component is sync (so should go dynamic?)
// this is just for demo purposes. normally you'd only use dynamic when you need to
export const dynamic = 'force-dynamic';

export default async function BetterAuthPage() {
  console.log('About page');
  // await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate slow loading
  const currentTime = new Date().toLocaleString();
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Better Auth</h1>
      <p>Html is Server Side Rendered on each request {currentTime}</p>
    </div>
  );
}