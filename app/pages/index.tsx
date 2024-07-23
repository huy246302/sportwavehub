import SubscriptionPricing from '@/components/SubscriptionPricing';
import AboutUs from '@/components/AboutUs';
import Features from '@/components/Features';
import Carousel from '@/components/Carousel';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <div>
        <section className="py-12 my-5">
            <HeroSection />
        </section>

        <section className="py-12 my-5"> {/* Add padding here */}
            <Carousel />
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
