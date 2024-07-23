import { FaSync, FaStar, FaMobileAlt } from 'react-icons/fa';

const Features = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-100 to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
            <FaSync className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4">Live Updates</h3>
            <p className="text-gray-600 mb-4">Real-time updates on all major sports events.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
            <FaStar className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4">Exclusive Content</h3>
            <p className="text-gray-600 mb-4">Access to exclusive interviews and insider stories.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
            <FaMobileAlt className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4">Mobile Ready</h3>
            <p className="text-gray-600 mb-4">Enjoy our website on any device, anywhere.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
