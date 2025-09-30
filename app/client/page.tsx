// export const dynamic = 'force-dynamic';

const AboutPage = async () => {
  const currentTime = new Date().toLocaleString();
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Client Component</h1>
      <p>build time is (ie page data is Server Side Rendered on each request {currentTime}</p>
    </div>
  );
};

export default AboutPage;