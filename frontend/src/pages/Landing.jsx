import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* Particle background: only on landing */}
      <AnimatedBackground />

      <div className="text-gray-900 dark:text-white min-h-screen w-full transition-colors duration-500 relative overflow-x-hidden">
        <div className="animate-fade-in">
          <Navbar />
          <HeroSection />
          <Features />
        </div>

      </div>
    </>
  );
}
