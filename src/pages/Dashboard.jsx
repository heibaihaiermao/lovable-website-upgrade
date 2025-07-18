
import React from 'react';
import { Header } from '../components/Header.jsx';
import { NavigationTabs } from '../components/NavigationTabs.jsx';
import { WelcomeSection } from '../components/Dashboard/WelcomeSection.jsx';
import { ContentSection } from '../components/Dashboard/ContentSection.jsx';

const Dashboard = () => {
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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#0d0e14] dark:via-[#151621] dark:to-[#0d0e14] text-gray-900 dark:text-white transition-all duration-500">
      {/* Enhanced background elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/3 via-transparent to-blue-500/3 pointer-events-none" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 animate-fade-in">
        <Header />
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <NavigationTabs />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <WelcomeSection onStartResearch={handleStartResearch} />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
