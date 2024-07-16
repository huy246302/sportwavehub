const SubscriptionPricing = () => {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Subscription Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4">Basic</h3>
              <p className="text-gray-600 mb-4">Access to basic news articles</p>
              <p className="text-gray-800 font-bold">$9.99/month</p>
              <button className="bg-blue-600 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700">Subscribe</button>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4">Premium</h3>
              <p className="text-gray-600 mb-4">Access to premium articles and live updates</p>
              <p className="text-gray-800 font-bold">$19.99/month</p>
              <button className="bg-blue-600 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700">Subscribe</button>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4">Pro</h3>
              <p className="text-gray-600 mb-4">Full access to all features including exclusive content</p>
              <p className="text-gray-800 font-bold">$29.99/month</p>
              <button className="bg-blue-600 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default SubscriptionPricing;
  