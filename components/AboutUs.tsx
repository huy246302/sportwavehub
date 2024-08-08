const AboutUs = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">About Our Website</h2>
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8">
          <img 
            src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fGZvb3RiYWxsfGVufDB8fHx8MTY2Mzk2NzY4MQ&ixlib=rb-1.2.1&q=80&w=400" 
            alt="About Us" 
            className="w-full md:w-1/2 rounded-lg shadow-lg mb-8 md:mb-0"
          />
          <p className="max-w-2xl text-center md:text-left text-gray-700 leading-relaxed">
            Welcome to our website! We are dedicated to providing the latest news, in-depth analysis, and insightful articles on a wide range of topics including sports, technology, entertainment, and more. Our team of experienced writers and editors work tirelessly to bring you the most accurate and up-to-date information.
            <br /><br />
            Our mission is to create a platform where readers can find quality content that not only informs but also inspires and engages. Whether you're looking for the latest trends in technology, updates on your favorite sports teams, or thought-provoking opinion pieces, we have something for everyone.
            <br /><br />
            At the heart of our website is a commitment to excellence and integrity. We strive to uphold the highest standards of journalism and to foster a community of informed and engaged readers. Thank you for visiting, and we hope you enjoy exploring our content as much as we enjoy creating it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
