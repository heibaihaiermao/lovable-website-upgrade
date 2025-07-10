import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    function onClickOutside(e) {
      if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener('mousedown', onClickOutside);
    return () => window.removeEventListener('mousedown', onClickOutside);
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white text-violet-600 dark:bg-gradient-to-r dark:from-[#5b2eff] dark:to-[#3a0ca3] dark:text-white shadow-md dark:shadow-[0_4px_20px_rgba(91,46,255,0.35)] transition-colors duration-300 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-8 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-shrink-0 text-2xl sm:text-3xl md:text-3xl font-bold select-none cursor-pointer">
            BlogForge
          </div>

          {/* Center: Menu Links */}
          <div className="hidden md:flex flex-grow justify-center flex-wrap gap-4 sm:gap-6 md:gap-8 max-w-[600px]">
            {['solution', 'resources', 'pricing'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm sm:text-base md:text-lg hover:text-blue-600 dark:hover:text-violet-400 dark:hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.7)] transition-colors duration-300 whitespace-nowrap"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>

          {/* Right: Buttons */}
          <div className="hidden md:flex flex-shrink-0 items-center gap-3 sm:gap-5 md:gap-6">
            <button
              className="text-sm sm:text-base md:text-lg hover:text-blue-600 dark:hover:text-violet-400 dark:hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.7)] transition-colors duration-300 whitespace-nowrap"
              onClick={() => (window.location.href = '/login')}
            >
              Login
            </button>
            <button
              className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-violet-500 to-blue-500 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-xl hover:brightness-110 dark:hover:brightness-90 dark:hover:filter transition-all duration-300 whitespace-nowrap"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-violet-600 dark:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-[56px] sm:h-[64px]" />

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-[56px] sm:top-[64px] left-0 right-0 bottom-0 bg-white dark:bg-gradient-to-br dark:from-[#1f1b38] dark:to-[#121221] bg-opacity-95 flex flex-col items-center justify-center space-y-8 text-3xl z-40
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0 pointer-events-none'}
        `}
      >
        {['solution', 'resources', 'pricing'].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-blue-600 dark:hover:text-white transition-colors duration-200"
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </a>
        ))}
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            window.location.href = '/login';
          }}
          className="hover:text-blue-600 dark:hover:text-white transition-colors duration-200"
        >
          Login
        </button>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="font-semibold bg-gradient-to-r from-violet-500 to-blue-500 text-white px-12 py-4 rounded-xl hover:brightness-110 transition-all duration-300"
        >
          Get Started
        </button>
      </div>
    </>
  );
}
