import SubscriptionPricing from '@/components/SubscriptionPricing';
import AboutUs from '@/components/AboutUs';
import Features from '@/components/Features';
import BlogPost from './blog_post';

const Index = () => {
  return (
    <div>
        <section className="bg-gray-200 text-black py-24 my-8">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">Your Sports News Hub</h1>
                <p className="text-lg mb-8">Stay updated with the latest sports news and events.</p>
                <button className=" text-black font-semibold py-2 px-6 rounded hover:bg-blue-700">
                Get Started
                </button>
            </div>
        </section>

        <section className="py-12 my-5"> {/* Add padding here */}
            <BlogPost />
        </section>

        <section className="py-12 my-5"> {/* Add padding here */}
            <SubscriptionPricing />
        </section>

        <section className="py-12 my-5"> {/* Add padding here */}
            <AboutUs />
        </section>

        <section className="py-12 my-5"> {/* Add padding here */}
            <Features />
        </section>
    </div>
  );
};

export default Index;
