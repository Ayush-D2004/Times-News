import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { MoonIcon, SunIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
            Time's New
          </Link>

          <div className="hidden md:flex space-x-4">
            <NavLinks />
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-600" />
              )}
            </motion.button>

            <Link to="/profile">
              <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </Link>

            <Link to="/settings">
              <Cog6ToothIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
            >
              <div className="space-y-2">
                <span className="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></span>
                <span className="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></span>
                <span className="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4"
          >
            <NavLinks mobile setIsOpen={setIsOpen} />
          </motion.div>
        )}
      </div>
    </nav>
  );
};

const NavLinks = ({ mobile, setIsOpen }) => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/business", label: "Business" },
    { to: "/entertainment", label: "Entertainment" },
    { to: "/health", label: "Health" },
    { to: "/science", label: "Science" },
    { to: "/sports", label: "Sports" },
    { to: "/technology", label: "Technology" },
  ];

  return (
    <div className={mobile ? "flex flex-col space-y-2" : "flex space-x-4"}>
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.to}
          className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200"
          onClick={() => mobile && setIsOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;