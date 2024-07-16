import SubscriptionPricing from '@/components/SubscriptionPricing';
import AboutUs from '@/components/AboutUs';
import Features from '@/components/Features';

const Index = () => {
  return (
    <div>
      <section className="bg-blue-600 text-white py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Your Sports News Hub</h1>
          <p className="text-lg mb-8">Stay updated with the latest sports news and events.</p>
          <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700">
                Get Started
          </button>
        </div>
      </section>
      <SubscriptionPricing />
      <AboutUs />
      <Features />
    </div>
  );
};

export default Index;
