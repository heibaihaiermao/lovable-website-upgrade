
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import ThemeToggle from '../components/ThemeToggle';

export default function Landing() {
  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen w-full transition-colors duration-500 relative overflow-x-hidden">
      <div className="animate-fade-in">
        <Navbar />
        <HeroSection />
        <Features />
      </div>
      
      {/* Enhanced fixed position wrapper for ThemeToggle */}
      <div className="fixed bottom-5 right-5 z-50 animate-scale-in">
        <ThemeToggle />
      </div>
      
      {/* Background gradient overlay for visual depth */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none -z-10" />
    </div>
  );
}
