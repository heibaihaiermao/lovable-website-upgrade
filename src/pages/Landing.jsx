import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import ThemeToggle from '../components/ThemeToggle';

export default function Landing() {
  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen w-full transition-colors duration-300 relative">
      <Navbar />
      <HeroSection />
      <Features />
      
      {/* Fixed position wrapper for ThemeToggle */}
      <div className="fixed bottom-5 right-5 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
