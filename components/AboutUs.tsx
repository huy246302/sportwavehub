const AboutUs = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">About Our Website</h2>
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8">
          <img 
            src="https://via.placeholder.com/400" 
            alt="About Us" 
            className="w-full md:w-1/2 rounded-lg shadow-lg mb-8 md:mb-0"
          />
          <p className="max-w-2xl text-center md:text-left text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
