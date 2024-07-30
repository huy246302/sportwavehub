'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

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

  return (
    <header className="bg-white text-black shadow-md py-5 w-full z-40"> {/* Removed fixed position */}
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">
          <Link href="/">Sports News</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Login / Register
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dropdown-menu">
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
            </li>
            <li>
              <Link href="/blogs" className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors duration-300">
                Blogs
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
