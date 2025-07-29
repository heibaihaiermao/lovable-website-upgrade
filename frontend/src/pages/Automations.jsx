import React, { useState } from 'react';
import { Header } from '../components/Header.jsx';
import { NavigationTabs } from '../components/NavigationTabs.jsx';

const Toggle = ({ checked, onChange }) => (
  <label className="relative inline-block w-11 h-6 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only peer"
    />
    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-green-500 transition-colors duration-300" />
    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5" />
  </label>
);

const Automations = () => {
  const [toggles, setToggles] = useState({
    wordpress: true,
    netlify: false,
    wix: false,
    webflow: false,
    facebook: true,
    instagram: false,
    pinterest: false,
    substack: true,
    medium: false,
    linkedin: false,
  });

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
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
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
          <h1 className="text-2xl font-bold mb-2">Automations</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            After you save a blog, define what happens next automatically.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CMS Integrations */}
            <div className="relative border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-xl p-5 flex flex-col min-h-[260px]">
              <h2 className="text-lg font-semibold mb-4">CMS Integrations</h2>
              {[
                ['Auto-post to WordPress', 'wordpress'],
                ['Auto-post to Netlify', 'netlify'],
                ['Auto-post to Wix', 'wix'],
                ['Auto-post to Webflow', 'webflow'],
              ].map(([label, key]) => (
                <div key={key} className="flex items-center justify-between w-full mb-4">
                  <span className="text-sm">{label}</span>
                  <Toggle checked={toggles[key]} onChange={() => handleToggle(key)} />
                </div>
              ))}
              <button className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white py-1.5 px-4 rounded text-sm transition-all">
                Add
              </button>
            </div>

            {/* Social Media Sharing */}
            <div className="relative border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-xl p-5 flex flex-col min-h-[260px]">
              <h2 className="text-lg font-semibold mb-4">Social Media Sharing</h2>
              {[
                ['Auto-share to Facebook', 'facebook'],
                ['Auto-share to Instagram', 'instagram'],
                ['Auto-share to Pinterest', 'pinterest'],
              ].map(([label, key]) => (
                <div key={key} className="flex items-center justify-between w-full mb-4">
                  <span className="text-sm">{label}</span>
                  <Toggle checked={toggles[key]} onChange={() => handleToggle(key)} />
                </div>
              ))}
              <button className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white py-1.5 px-4 rounded text-sm transition-all">
                Add
              </button>
            </div>

            {/* Newsletter Platforms */}
            <div className="relative border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-xl p-5 flex flex-col min-h-[400px]">
              <h2 className="text-lg font-semibold mb-4">Newsletter Platforms</h2>
              {[
                ['Substack', 'substack'],
                ['Medium', 'medium'],
                ['LinkedIn', 'linkedin'],
              ].map(([label, key]) => (
                <div key={key} className="flex items-center justify-between w-full mb-4">
                  <span className="text-sm">{label}</span>
                  <Toggle checked={toggles[key]} onChange={() => handleToggle(key)} />
                </div>
              ))}
              <button className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white py-1.5 px-4 rounded text-sm transition-all">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automations;
