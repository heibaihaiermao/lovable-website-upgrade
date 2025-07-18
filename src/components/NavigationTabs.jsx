import React from 'react';
import { Link, useLocation } from 'react-router';

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'automations', label: 'Automations' },
  { id: 'branding', label: 'Branding' },
  { id: 'people', label: 'People' }
];

export const NavigationTabs = () => {
  const location = useLocation();
  const currentTab = location.pathname.split('/')[1] || 'dashboard';

  return (
    <nav className="w-full h-[75px] shadow bg-white dark:bg-[#0d0e14] transition-colors duration-300">
      <div className="flex items-center h-full px-[55px] max-md:flex-wrap max-md:px-5 max-md:py-2.5">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <Link
              key={tab.id}
              to={`/${tab.id}`}
              className={`relative text-[18px] sm:text-[20px] md:text-[22px] leading-6 px-4 py-2 mr-8 rounded-md transition-all duration-200 
                ${
                  isActive
                    ? 'font-semibold text-gray-900 dark:text-white'
                    : 'font-normal text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
