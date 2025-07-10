import React from 'react';

export default function HeroSection() {
  return (
    <section className="text-center py-20 px-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
          Rank higher with AI-Powered content
        </h1>
        <p className="text-gray-700 dark:text-gray-400 py-8 mb-8 text-2xl transition-colors duration-300">
          Turn keywords into ready-to-publish blog posts — in just a few clicks.
        </p>
        <button className="text-2xl font-semibold bg-gradient-to-r from-violet-500 to-blue-500 text-white px-10 py-4 rounded-xl shadow-md 
          hover:brightness-110 transition-all duration-300"
        >
          Create Your First Blog
        </button>
      </div>
    </section>
  );
}
