
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';
import { AddWorkspaceModal } from './AddWorkspaceModal';
import { 
  getWorkspaces, 
  getCurrentWorkspace, 
  setCurrentWorkspace, 
  addWorkspace, 
  initializeWorkspaces 
} from '../utils/workspaceManager';

export const Header = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAddWorkspaceModalOpen, setIsAddWorkspaceModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    // Initialize workspaces and load current workspace
    const loadedWorkspaces = initializeWorkspaces();
    setWorkspaces(loadedWorkspaces);
    
    const currentWorkspace = getCurrentWorkspace();
    if (currentWorkspace && loadedWorkspaces.find(ws => ws.id === currentWorkspace.id)) {
      setSelectedWorkspace(currentWorkspace);
    } else if (loadedWorkspaces.length > 0) {
      setSelectedWorkspace(loadedWorkspaces[0]);
      setCurrentWorkspace(loadedWorkspaces[0]);
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setDropdownOpen(false);
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (workspace) => {
    if (workspace === '+ New Workspace') {
      setIsAddWorkspaceModalOpen(true);
    } else {
      setSelectedWorkspace(workspace);
      setCurrentWorkspace(workspace);
    }
    setDropdownOpen(false);
  };

  const handleAddWorkspace = (name) => {
    const newWorkspace = addWorkspace(name);
    const updatedWorkspaces = getWorkspaces();
    setWorkspaces(updatedWorkspaces);
    setSelectedWorkspace(newWorkspace);
    setCurrentWorkspace(newWorkspace);
    
    // Navigate to dashboard to show empty state
    navigate('/dashboard');
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
          <div className="relative z-50 dropdown-container">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-sm sm:text-base font-medium text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              {selectedWorkspace?.name || 'Select Workspace'}
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
                    key={workspace.id}
                    onClick={() => handleSelect(workspace)}
                    className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {workspace.name}
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

          {/* User Menu */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-sm sm:text-base font-medium text-white bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-2 rounded-lg hover:brightness-110 transition-all flex items-center gap-2"
            >
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden sm:inline">
                {user?.email?.split('@')[0] || 'User'}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-900 dark:text-gray-100">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {user?.email}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate('/myaccount');
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Account
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <AddWorkspaceModal
        isOpen={isAddWorkspaceModalOpen}
        onClose={() => setIsAddWorkspaceModalOpen(false)}
        onSubmit={handleAddWorkspace}
        existingWorkspaces={workspaces}
      />
    </header>
  );
};
