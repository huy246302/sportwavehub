const HeroSection = () => {
    return (
      <section className="bg-gradient-to-r from-blue-200 to-blue-500 text-white py-24 my-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-20 bg-no-repeat bg-center bg-cover" style={{ backgroundImage: 'url("https://via.placeholder.com/1600x900")' }}></div>
        <div className="container mx-auto relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Your Sports News Hub</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Stay updated with the latest sports news and events. Join us to never miss a moment of the action.
          </p>
          <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300">
            Get Started
          </button>
        </div>
      </section>
    );
  };
  
  export default HeroSection;
  