'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js'; // Import User type
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons
import { useRouter } from 'next/navigation'; // Import useRouter

interface HeaderProps {
  isHomePage: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHomePage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Set the correct type here
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    }

    const handleInactivity = () => {
      setDropdownOpen(false);
    };

    let inactivityTimeout = setTimeout(handleInactivity, 30000);

    const resetInactivityTimeout = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(handleInactivity, 30000);
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('mousemove', resetInactivityTimeout);
    document.addEventListener('keypress', resetInactivityTimeout);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('mousemove', resetInactivityTimeout);
      document.removeEventListener('keypress', resetInactivityTimeout);
      document.removeEventListener('keydown', handleEscKey);
      clearTimeout(inactivityTimeout);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user); // user will now be correctly set
    };

    fetchUser();
  }, []);

  const handleScrollToSection = (id: string) => {
    router.push(`/?scrollTo=${id}`);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Adjust the delay as needed
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTo = params.get('scrollTo');
    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Adjust the delay as needed
    }
  }, []);

  return (
    <header className={`bg-white text-black shadow-md py-5 w-full z-40 ${isHomePage ? 'sticky top-0' : ''}`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">
            <Link href="/">SportsWaveHub</Link>
          </h1>
          <nav className="flex space-x-4">
            <button onClick={() => handleScrollToSection('about-us')} className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
              About Us
            </button>
            <button onClick={() => handleScrollToSection('subscription-pricing')} className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
              Pricing
            </button>
            <button onClick={() => handleScrollToSection('features')} className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
              Features
            </button>
            <button onClick={() => handleScrollToSection('contact-us')} className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
              Contact Us
            </button>
            <Link href="/blogs" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">
              Blogs
            </Link>
          </nav>
        </div>
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center"
            >
              <FaUserCircle className="w-8 h-8" />
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <li>
                  <Link href="/user" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    User Details
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={async () => {
                      try {
                        const supabase = createClient();
                        const { error } = await supabase.auth.signOut();
                        if (error) throw error;
                        setUser(null);
                        window.location.href = '/';
                      } catch (error: unknown) {
                        if (error instanceof Error) {
                          console.error('Error logging out:', error.message);
                        } else {
                          console.error('Unknown error logging out:', error);
                        }
                      }
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Login / Register
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <li>
                  <Link href="/register" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
