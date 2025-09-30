// app/page.tsx
// sfc - Stateless Function Component

// notice this isn't async. only use async when need SSR
// this page uses the default of 'auto' which means next.js will decide based on if you use async or not
// see https://nextjs.org/docs/app/building-your-application/routing#dynamic-segments
// here we explicitly set it to 'auto' just for demo purposes. normally you'd just leave this out

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic


// keep as a statically generated page on the server.. not any good for dynamic data
export const dynamic = 'auto';

const Homepage = () => {
  const currentTime = new Date().toLocaleString();

  return (
  <div className="p-4">
    <h1 className="text-2xl mb-4">Home</h1>
    <p>build time is (ie this page is the next.js default of statically generated on the server - Server Side Generated) {currentTime}</p>
  </div>
);
};

export default Homepage;