// app/about/page.tsx

// this page is server side rendered on each request
// see https://nextjs.org/docs/app/building-your-application/routing#dynamic-segments
// the default is 'auto' which means next.js will decide based on if you use async or not
// here we force it to be dynamic (server side rendered on each request) even though this component isn't async
// this is just for demo purposes. normally you'd only use dynamic when you need to
export const dynamic = 'force-dynamic';

const AboutPage = async () => {
  const currentTime = new Date().toLocaleString();
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">About</h1>
      <p>build time is (ie page data is Server Side Rendered on each request {currentTime}</p>
    </div>
  );
};

export default AboutPage;