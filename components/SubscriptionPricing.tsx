import { FaCheck } from 'react-icons/fa';

const SubscriptionPricing = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Subscription Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4">Basic</h3>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Access to basic news articles
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Weekly newsletter
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Email support
              </li>
            </ul>
            <p className="text-gray-800 font-bold text-2xl">$9.99/month</p>
            <button className="bg-blue-600 text-white py-2 px-6 mt-6 rounded-full hover:bg-blue-700 transition-colors duration-300">Subscribe</button>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4">Premium</h3>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Access to premium articles and live updates
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Monthly webinars
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Priority email support
              </li>
            </ul>
            <p className="text-gray-800 font-bold text-2xl">$19.99/month</p>
            <button className="bg-blue-600 text-white py-2 px-6 mt-6 rounded-full hover:bg-blue-700 transition-colors duration-300">Subscribe</button>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4">Pro</h3>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Full access to all features including exclusive content
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Personalized content
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> 24/7 support
              </li>
            </ul>
            <p className="text-gray-800 font-bold text-2xl">$29.99/month</p>
            <button className="bg-blue-600 text-white py-2 px-6 mt-6 rounded-full hover:bg-blue-700 transition-colors duration-300">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPricing;
