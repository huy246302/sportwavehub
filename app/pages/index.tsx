import SubscriptionPricing from '@/components/SubscriptionPricing';
import AboutUs from '@/components/AboutUs';
import Features from '@/components/Features';
import Carousel from '@/components/Carousel';
import HeroSection from '@/components/HeroSection';
import ContactUs from '@/components/ContactUs';

const Index = () => {
    return (
      <div>
        <section id="hero-section" className="py-12 my-5">
          <HeroSection />
        </section>
  
        <section id="carousel" className="py-12 my-5">
          <Carousel />
        </section>
  
        <section id="subscription-pricing" className="py-12 my-5">
          <SubscriptionPricing />
        </section>
  
        <section id="about-us" className="py-12 my-5">
          <AboutUs />
        </section>
  
        <section id="features" className="py-12 my-5">
          <Features />
        </section>

        <section id="contact-us" className="py-12 my-5">
          <ContactUs />
        </section>
      </div>
    );
  };

export default Index;
