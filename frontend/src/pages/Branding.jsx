import React from 'react';
import { Header } from '../components/Header.jsx';
import { NavigationTabs } from '../components/NavigationTabs.jsx';

const Branding = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-[#121524] text-gray-800 dark:text-white transition-colors duration-300">
      <div className="relative z-20">
        <Header />
      </div>
      <div className="relative z-10">
        <NavigationTabs />
      </div>

      <div className="mt-10 px-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 min-h-[400px] transition-colors duration-300">
          <div className="flex justify-center items-center h-full text-xl font-semibold dark:text-gray-200">
            Insert Logo Here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;
