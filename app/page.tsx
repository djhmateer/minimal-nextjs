// app/page.tsx
// sfc - Stateless Function Component
// notice this isn't async. only use async when need to to avoid double page request
const Homepage = () => {
  const currentTime = new Date().toLocaleString();

  return <>Homepage - Minimal-nextjs - build time is (ie this page is statically generated on the server - Server Side Generated) {currentTime} </>;
};

export default Homepage;