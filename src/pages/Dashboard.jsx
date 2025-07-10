import React from 'react';
import { Header } from '../components/Header.jsx';
import { NavigationTabs } from '../components/NavigationTabs.jsx';
import { WelcomeSection } from '../components/Dashboard/WelcomeSection.jsx';
import { ContentSection } from '../components/Dashboard/ContentSection.jsx';

const Dashboard = () => {

    //   const handleCreateWorkspace = () => {
    //     console.log('Create workspace clicked');
    //     // Implement workspace creation logic
    //   };

    //   const handleAccountClick = () => {
    //     console.log('Account clicked');
    //     // Implement account menu logic
    //   };

    //   const handleWorkspaceChange = (workspace) => {
    //     console.log('Workspace changed to:', workspace);
    //     // Implement workspace switching logic
    //   };

  const handleStartResearch = (keyword) => {
    console.log('Starting SEO research for:', keyword);
  };

  const handleSearchBlogs = (query) => {
    console.log('Searching blogs for:', query);
  };

  const handleBlogClick = (blog) => {
    console.log('Blog clicked:', blog);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-[#0d0e14] text-gray-900 dark:text-white transition-colors duration-500">
      {/* Header */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10">
        <NavigationTabs />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="mb-10">
          <WelcomeSection onStartResearch={handleStartResearch} />
        </div>

        <div>
          <ContentSection
            onSearchBlogs={handleSearchBlogs}
            onBlogClick={handleBlogClick}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
