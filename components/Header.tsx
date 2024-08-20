'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import useInactivityTimeout from '@/hooks/useInactivityTimeout';

interface HeaderProps {
  isHomePage: boolean;
}

interface Weather {
  description: string;
  temp: number | null; // Allow null as a possible type
}

const Header: React.FC<HeaderProps> = ({ isHomePage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [location, setLocation] = useState<{ city: string; country: string } | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useInactivityTimeout(() => setDropdownOpen(false), 30000);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchDateAndLocation = () => {
      const date = new Date();
      setCurrentDate(
        date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
  
          // Fetch location name (city, country) from a reverse geocoding API
          const locationRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const locationData = await locationRes.json();
          setLocation({
            city: locationData.city || 'Unknown City',
            country: locationData.countryName || 'Unknown Country',
          });
  
          // Fetch weather data
          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=YOUR_API_KEY`
          );
          const weatherData = await weatherRes.json();
  
          if (weatherData.weather && weatherData.weather.length > 0) {
            setWeather({
              description: weatherData.weather[0].description,
              temp: weatherData.main.temp,
            });
          } else {
            console.error('Weather data is not available');
            setWeather({
              description: 'N/A',
              temp: null, // Set temp to null when not available
            });
          }
        });
      }
    };
  
    fetchDateAndLocation();
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
    <header className={`bg-white text-black shadow-md py-3 sm:py-5 w-full z-40 ${isHomePage ? 'sticky top-0' : ''}`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl sm:text-2xl font-bold">
            <Link href="/">SportsWaveHub</Link>
          </h1>
          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden flex items-center"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <nav className={`w-full sm:w-auto sm:flex space-y-2 sm:space-y-0 sm:space-x-4 ${menuOpen ? 'block' : 'hidden'} sm:block`}>
          <button onClick={() => handleScrollToSection('about-us')} className="text-gray-800 hover:text-gray-600 transition-colors duration-300 block sm:inline-block text-base sm:text-sm">
            About Us
          </button>
          <button onClick={() => handleScrollToSection('subscription-pricing')} className="text-gray-800 hover:text-gray-600 transition-colors duration-300 block sm:inline-block text-base sm:text-sm">
            Pricing
          </button>
          <button onClick={() => handleScrollToSection('features')} className="text-gray-800 hover:text-gray-600 transition-colors duration-300 block sm:inline-block text-base sm:text-sm">
            Features
          </button>
          <button onClick={() => handleScrollToSection('contact-us')} className="text-gray-800 hover:text-gray-600 transition-colors duration-300 block sm:inline-block text-base sm:text-sm">
            Contact Us
          </button>
          <Link href="/blogs" className="text-gray-800 hover:text-gray-600 transition-colors duration-300 block sm:inline-block text-base sm:text-sm">
            Blogs
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="text-sm sm:text-base">
            {currentDate && <p>{currentDate}</p>}
            {location && <p>{`${location.city}, ${location.country}`}</p>}
            {weather && weather.temp !== null && (
              <div>
                <p>{weather.description}</p>
                <p>{`${weather.temp}°C`}</p>
              </div>
            )}
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                aria-label="User menu"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center text-base sm:text-sm"
              >
                <FaUserCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg text-base sm:text-sm">
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
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-base sm:text-sm"
              >
                Login / Register
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg text-base sm:text-sm">
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
      </div>
    </header>
  );
};

export default Header;
