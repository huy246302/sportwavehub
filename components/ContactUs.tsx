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
                        <div className="flex items-center justify-center md:justify-start">
                            <Image
                                src="https://cdn.rareblocks.xyz/collection/clarity/images/cta/3/avatar-female.png"
                                alt="Profile"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <div className="ml-4">
                                <p className="font-semibold">Jane Smith</p>
                                <p className="text-sm text-gray-500">Chief Editor, SportsDaily</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="text-gray-600 mb-4">
                            Sign up for our newsletter to receive the latest sports news directly in your inbox!
                        </p>
                        <form className="flex flex-col sm:flex-row">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 px-4 py-2 mb-4 sm:mb-0 sm:mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-200"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
