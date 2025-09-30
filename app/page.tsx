// app/page.tsx
// sfc - Stateless Function Component
// notice this isn't async. only use async when need to to avoid double page request
const Homepage = () => {
  const currentTime = new Date().toLocaleString();

  return (
  <div className="p-4">
    <h1 className="text-2xl mb-4">Home</h1>
    <p>build time is (ie this page is statically generated on the server - Server Side Generated) {currentTime}</p>
  </div>
);
};

export default Homepage;