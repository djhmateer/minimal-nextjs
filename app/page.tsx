// app/page.tsx
// sfc - Stateless Function Component

// notice this isn't async. only use async when need dynamic SSR
// this page uses the default of 'auto' which means next.js will decide based on if you use async or not
// see https://nextjs.org/docs/app/building-your-application/routing#dynamic-segments
// here we explicitly set it to 'auto' just for demo purposes. normally you'd just leave this out

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic


// keep as a statically generated page on the server.. not any good for dynamic data

// auto seems to for force-dynamic here which I don't know why
// export const dynamic = 'auto';

// export const dynamic = 'force-dynamic'

// putting in nothing forces auto, which is static, which is what we want
export const dynamic = 'force-static'

const Home = () => {
  const currentTime = new Date().toLocaleString();
  console.log('Home page');

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Home</h1>
      <p>this data is the next.js default of statically generated on the server - Server Side Generated. Build time: {currentTime}</p>
    </div>
  );
};

export default Home;