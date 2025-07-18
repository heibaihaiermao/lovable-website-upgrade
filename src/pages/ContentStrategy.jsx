import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header.jsx';
import { NavigationTabs } from '../components/NavigationTabs.jsx';
import { ContentStrategyForm } from '../components/ContentStrategyForm.jsx';

const ContentStrategy = () => {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load existing data from localStorage
    const savedData = localStorage.getItem('contentStrategyData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    setIsLoading(false);
  }, []);

  const handleFormSubmit = (data) => {
    // Save to localStorage (mock database)
    localStorage.setItem('contentStrategyData', JSON.stringify(data));
    setFormData(data);
    
    // Mock API call
    console.log('Content Strategy Data submitted:', data);
    
    // Show success message
    alert('Content Strategy saved successfully!');
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gray-100 dark:bg-[#121524] flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-[#121524] text-gray-800 dark:text-white transition-colors duration-300">
      <div className="relative z-20">
        <Header />
      </div>

      <div className="relative z-10">
        <NavigationTabs />
      </div>

      <div className="mt-10 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Content Strategy Intake Form</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Complete this one-time form to generate 30+ days of SEO-optimized content tailored to your brand, tone, and target audience.
              </p>
            </div>

            <ContentStrategyForm 
              initialData={formData} 
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentStrategy;