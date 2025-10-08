// app/page.tsx
// import React from 'react';
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

export default function Home() {
  const currentTime = new Date().toLocaleString();
  console.log('Home page');

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <p className="mb-2">Next.js default of statically generated on the server - Server Side Generated. Build time: {currentTime}</p>
      <p className="mb-6 text-sm text-gray-600">There is a console.log(&quot;Home Page&quot;) which is only shown at build time. not shown on live prod (but is on dev as a server output as dev is built each time and browser console). Makes sense as a static</p>

      <div className="mt-6 border-l-4 border-gray-300 pl-4">
        <p className="font-semibold mb-3">Rendering Strategies</p>
        <ul className="space-y-2 text-sm">
          <li>Static Site Generatation SSG (this page). No `export const dynamic = &apos;force-dynamic&apos;`. console.log will show only in initial build output. It is just a html page. no custom js to run on client.</li>
          <li>SSG with `&apos;use client&apos;` - have access to the browser. Classic React style. console.log to client. </li>
          <li>Server Side Render SSR with `export const dynamic = &apos;force-dynamic&apos;` - renders on server each time. console.log to server.</li>
        </ul>
      </div>
    </div>
  );
}