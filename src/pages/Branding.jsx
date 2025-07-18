import React from 'react';
import { Header } from '../components/Header.jsx';
import { NavigationTabs } from '../components/NavigationTabs.jsx';
import Logo from '../components/Logo.jsx';

const Branding = () => {
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
        </div>
      </div>
    </div>
  );
};

export default Branding;