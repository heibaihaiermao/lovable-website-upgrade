import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header.jsx';
import { NavigationTabs } from '../components/NavigationTabs.jsx';
import Logo from '../components/Logo.jsx';
import { Edit, Settings, Users, Target, Calendar, FileText, MessageCircle } from 'lucide-react';

const Branding = () => {
  const [contentStrategy, setContentStrategy] = useState(null);

  useEffect(() => {
    // Load content strategy data from localStorage
    const savedData = localStorage.getItem('contentStrategyData');
    if (savedData) {
      setContentStrategy(JSON.parse(savedData));
    }
  }, []);

  const handleEditStrategy = () => {
    window.location.href = '/content-strategy';
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-[#121524] text-gray-800 dark:text-white transition-colors duration-300">
      <div className="relative z-20">
        <Header />
      </div>

      <div className="relative z-10">
        <NavigationTabs />
      </div>

      <div className="mt-10 px-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300 space-y-10">
          
          {/* Brand Identity */}
          <section>
            <h2 className="text-2xl font-bold mb-2">Our Brand</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We’re a content-first SEO blog dedicated to making search optimization practical and powerful for modern teams.
              Our brand identity reflects clarity, accessibility, and credibility.
            </p>
          </section>

          {/* Logo Showcase */}
          <section>
            <div className="flex flex-wrap gap-10 items-center">
              <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-lg">
                  <Logo className="h-16" textClassName="text-3xl font-bold text-gray-900" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">Light Background</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-900 p-3 rounded-lg">
                  <Logo className="h-16" textClassName="text-3xl font-bold text-white" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">Dark Background</span>
              </div>
            </div>
          </section>

          {/* Color Palette */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Color Palette</h3>
            <div className="flex gap-6">
              <div className="w-20 h-20 rounded-lg shadow" style={{ backgroundColor: '#7C3AED' }} title="#7C3AED" />
              <div className="w-20 h-20 rounded-lg shadow" style={{ backgroundColor: '#FACC15' }} title="#FACC15" />
              <div className="w-20 h-20 rounded-lg shadow" style={{ backgroundColor: '#1F2937' }} title="#1F2937" />
            </div>
          </section>

          {/* Typography (Simple text preview) */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Typography</h3>
            <p className="text-2xl font-bold">Heading Font: Inter Bold</p>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Body Font: Inter Regular – Clean, readable, and optimized for digital content.
            </p>
          </section>

          {/* Sponsored or Partner Brands */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Trusted By</h3>
            <div className="flex flex-wrap items-center gap-10">
              {[
                { src: "src/assets/logo-placeholder.png", alt: "Sponsor1" },
                { src: "src/assets/logo-placeholder.png", alt: "Sponsor2" },
                { src: "src/assets/logo-placeholder.png", alt: "Sponsor3" },
              ].map((sponsor) => (
                <div key={sponsor.alt} className="flex flex-col items-center">
                  <img src={sponsor.src} alt={sponsor.alt} className="h-10 mb-1" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">{sponsor.alt}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Voice & Tone */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Voice & Tone</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Professional, but never stiff</li>
              <li>Helpful and conversational</li>
              <li>Backed by data and real-world examples</li>
            </ul>
          </section>

          {/* Content Strategy Integration */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Content Strategy</h3>
              <button
                onClick={handleEditStrategy}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Edit size={16} />
                <span>{contentStrategy ? 'Edit Strategy' : 'Create Strategy'}</span>
              </button>
            </div>

            {contentStrategy ? (
              <div className="space-y-6">
                {/* Brand Identity Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold">Brand Identity</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Brand Name:</span> {contentStrategy.brandName}
                    </div>
                    <div>
                      <span className="font-medium">Brand Adjectives:</span> {contentStrategy.brandAdjectives}
                    </div>
                    <div>
                      <span className="font-medium">Preferred Tone:</span> {contentStrategy.preferredTone.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium">Competitors:</span> {contentStrategy.competitors}
                    </div>
                  </div>
                </div>

                {/* Audience & Goals */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Target className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="font-semibold">Audience & Goals</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Ideal Customer:</span> 
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{contentStrategy.idealCustomer}</p>
                    </div>
                    <div>
                      <span className="font-medium">Desired Actions:</span> {contentStrategy.desiredActions.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium">Content Goals:</span> {contentStrategy.contentGoals.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Content Preferences */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <FileText className="h-5 w-5 text-purple-600 mr-2" />
                    <h4 className="font-semibold">Content Preferences</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Content Types:</span> {contentStrategy.contentTypes.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium">Approval Required:</span> {contentStrategy.approvalRequired === 'yes' ? 'Yes' : 'No'}
                    </div>
                    <div>
                      <span className="font-medium">AI Responses:</span> {contentStrategy.aiResponses ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>

                {/* SEO & Topics */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Settings className="h-5 w-5 text-orange-600 mr-2" />
                    <h4 className="font-semibold">SEO & Topics</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Keywords:</span> 
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{contentStrategy.keywords}</p>
                    </div>
                    <div>
                      <span className="font-medium">Content Formats:</span> {contentStrategy.contentFormats.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Platforms */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <MessageCircle className="h-5 w-5 text-red-600 mr-2" />
                    <h4 className="font-semibold">Platforms</h4>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Active Platforms:</span> {contentStrategy.platforms.join(', ')}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No content strategy configured yet. Complete the intake form to unlock personalized content generation.
                </p>
                <button
                  onClick={handleEditStrategy}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Create Content Strategy
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Branding;