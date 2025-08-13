import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className='fixed box-border top-4 left-1/2 transform -translate-x-1/2 z-50 w-[92%] max-w-4xl'>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='backdrop-blur bg-white/60 dark:bg-black/30 border border-white/60 dark:border-white/60 rounded-full px-4 py-2 flex items-center justify-between transition-colors duration-300'
      >
        {/* Logo */}
        <a href='#home' className='font-semibold text-gray-900 dark:text-white'>
          Gaurav Singh
        </a>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-4'>
          <a
            href='#projects'
            className='text-sm text-gray-800 dark:text-white/80 hover:underline transition-colors'
          >
            Projects
          </a>
          <a
            href='#skills'
            className='text-sm text-gray-800 dark:text-white/80 hover:underline transition-colors'
          >
            Skills
          </a>
          <a
            href='#education'
            className='text-sm text-gray-800 dark:text-white/80 hover:underline transition-colors'
          >
            Education
          </a>
          <a
            href='#contact'
            className='text-sm text-gray-800 dark:text-white/80 hover:underline transition-colors'
          >
            Contact
          </a>
        </div>

        {/* Actions */}
        <div className='flex items-center gap-3'>
          <button
            onClick={toggleTheme}
            aria-label='Toggle theme'
            className='px-3 py-1 rounded-full bg-white/60 dark:bg-white/20 transition-colors duration-300 text-gray-900 dark:text-white hover:bg-white/80 dark:hover:bg-white/30'
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <a
            href='https://github.com/264Gaurav'
            target='_blank'
            rel='noreferrer'
            className='px-3 py-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700 transition-all duration-300'
          >
            GitHub
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className='md:hidden p-2 rounded-lg bg-white/60 dark:bg-white/20 transition-colors duration-300'
            aria-label='Toggle menu'
          >
            <div className='w-5 h-5 flex flex-col justify-center items-center'>
              <span
                className={`block w-4 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                }`}
              ></span>
              <span
                className={`block w-4 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`block w-4 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='md:hidden mt-2 backdrop-blur bg-white/90 dark:bg-black/80 border border-white/60 dark:border-white/60 rounded-2xl p-4 shadow-xl'
          >
            <div className='flex flex-col gap-3'>
              <a
                href='#projects'
                onClick={closeMenu}
                className='text-sm text-gray-800 dark:text-white/80 hover:text-sky-600 dark:hover:text-sky-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10'
              >
                Projects
              </a>
              <a
                href='#skills'
                onClick={closeMenu}
                className='text-sm text-gray-800 dark:text-white/80 hover:text-sky-600 dark:hover:text-sky-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10'
              >
                Skills
              </a>
              <a
                href='#education'
                onClick={closeMenu}
                className='text-sm text-gray-800 dark:text-white/80 hover:text-sky-600 dark:hover:text-sky-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10'
              >
                Education
              </a>
              <a
                href='#contact'
                onClick={closeMenu}
                className='text-sm text-gray-800 dark:text-white/80 hover:text-sky-600 dark:hover:text-sky-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10'
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
