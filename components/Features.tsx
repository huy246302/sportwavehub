const Features = () => {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4">Live Updates</h3>
              <p className="text-gray-600 mb-4">Real-time updates on all major sports events.</p>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4">Exclusive Content</h3>
              <p className="text-gray-600 mb-4">Access to exclusive interviews and insider stories.</p>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4">Mobile Ready</h3>
              <p className="text-gray-600 mb-4">Enjoy our website on any device, anywhere.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;
  