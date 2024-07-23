import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-lg">&copy; {new Date().getFullYear()} Sports News. All rights reserved.</p>
        </div>
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://facebook.com" className="text-white hover:text-blue-500" aria-label="Facebook">
            <FaFacebookF className="text-xl" />
          </a>
          <a href="https://twitter.com" className="text-white hover:text-blue-400" aria-label="Twitter">
            <FaTwitter className="text-xl" />
          </a>
          <a href="https://instagram.com" className="text-white hover:text-pink-500" aria-label="Instagram">
            <FaInstagram className="text-xl" />
          </a>
          <a href="https://linkedin.com" className="text-white hover:text-blue-600" aria-label="LinkedIn">
            <FaLinkedin className="text-xl" />
          </a>
        </div>
        <div className="text-center md:text-right">
          <p>Contact us: <a href="mailto:support@sportsnews.com" className="text-white hover:text-gray-300">support@sportsnews.com</a></p>
          <p>1234 Sports Ave, Sports City, SC 12345</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
