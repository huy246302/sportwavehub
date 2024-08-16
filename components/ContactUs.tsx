import Image from 'next/image';

const ContactUs = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="w-full md:w-1/2 md:pr-8 mb-6 md:mb-0 text-center md:text-left">
            <Image
              src="https://cdn.rareblocks.xyz/collection/clarity/images/cta/3/crowny-logo.svg"
              alt="Brand Logo"
              width={100}
              height={100}
              className="mx-auto md:mx-0 mb-4"
            />
            <p className="text-lg italic mb-4">
              “Stay ahead in the game with our latest sports news updates.”
            </p>
            <p className="text-gray-600 mb-4">
              For any queries, feel free to contact us. We are here to help you.
            </p>
          </div>
          {/* Right Section */}
          <div className="w-full md:w-1/2">
            <form>
              {/* Form fields */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
