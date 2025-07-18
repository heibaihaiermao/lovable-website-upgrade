
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Logo from './Logo';

export const Header = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        const response = await fetch('/api/workspaces');
        const data = await response.json();
        setWorkspaces(data);
        setSelectedWorkspace(data[0] || '');
      } catch (error) {
        console.error('Failed to fetch workspaces:', error);
        setWorkspaces(['Workspace 1', 'Workspace 2', 'Workspace 3']);
        setSelectedWorkspace('Workspace 1');
      }
    }

    fetchWorkspaces();
  }, []);

  const handleSelect = (workspace) => {
    if (workspace === '+ New Workspace') {
      console.log('Trigger new workspace flow');
    } else {
      setSelectedWorkspace(workspace);
    }
    setDropdownOpen(false);
  };

  return (
    <header className="w-full h-[87px] bg-white dark:bg-[#0d0e14] shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 sm:px-10">
        {/* Logo */}
        <div 
          className="cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => navigate('/')}
        >
          <Logo 
            className="scale-90"
            textClassName="text-gray-900 dark:text-white tracking-tight"
          />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4 relative">
          {/* Workspace Dropdown */}
          <div className="relative z-50">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-sm sm:text-base font-medium text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              {selectedWorkspace}
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1"
              >
                <path d="M7 7.25008L0.75 0.166748H13.25L7 7.25008Z" fill="currentColor" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all">
                {workspaces.map((workspace) => (
                  <div
                    key={workspace}
                    onClick={() => handleSelect(workspace)}
                    className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {workspace}
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-600 my-1" />
                <div
                  onClick={() => handleSelect('+ New Workspace')}
                  className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer"
                >
                  + New Workspace
                </div>
              </div>
            )}
          </div>

          {/* Account Button */}
          <button
            onClick={() => navigate('/myaccount')}
            className="text-sm sm:text-base font-medium text-white bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-2 rounded-lg hover:brightness-110 transition-all"
          >
            My Account
          </button>
        </div>
      </div>
    </header>
  );
};
