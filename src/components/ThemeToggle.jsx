import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  // Check system preference for dark mode using matchMedia
  const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-800 dark:text-white rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 flex items-center space-x-2"
    >
      <span
        className={`transition-transform duration-500 transform ${theme === 'dark' ? 'rotate-180' : 'rotate-0'}`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
      <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
}
