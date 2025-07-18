
import React, { useState } from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative text-center py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-violet-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Sparkles className="w-4 h-4 text-violet-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI-Powered Content Creation</span>
        </div>

        {/* Main heading with improved typography */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300 animate-fade-in leading-tight" style={{ animationDelay: '0.4s' }}>
          Rank higher with{' '}
          <span className="bg-gradient-to-r dark:from-pink-400 dark:via-purple-500 dark:to-blue-500 from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
            AI-Powered
          </span>{' '}
          content
        </h1>

        {/* Enhanced subtitle */}
        <p className="text-gray-600 dark:text-gray-300 py-8 mb-12 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Transform keywords into ready-to-publish blog posts that drive traffic and engagement — all in just a few clicks.
        </p>

        {/* Enhanced CTA button with micro-interactions */}
        <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <button 
            className="group relative text-xl font-semibold bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 text-white px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => window.location.href = '/dashboard'}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Button content */}
            <div className="relative flex items-center gap-3">
              <Zap className="w-6 h-6" />
              Create Your First Blog
              <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </button>
        </div>

        {/* Stats or social proof */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-in" style={{ animationDelay: '1s' }}>
          {[
            { label: 'Blogs Created', value: '10K+' },
            { label: 'SEO Score Avg', value: '95%' },
            { label: 'Time Saved', value: '80%' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
