import React from 'react';

const features = [
  {
    title: 'Keyword + Input',
    description: 'Target your audience precisely with smart keyword suggestions.',
  },
  {
    title: 'AI Blog Generation',
    description: 'Automatic title, outline, and body creation tailored for SEO.',
  },
  {
    title: 'SEO Optimization',
    description: 'H1, meta tags, schema markup, and keyword density monitoring.',
  },
  {
    title: 'CMS Publishing',
    description: 'Publish directly to WordPress or Webflow with one click.',
  },
  {
    title: 'Rank Tracking',
    description: 'Monitor Google rankings and performance metrics over time.',
  },
  {
    title: 'Affiliate Link Integration',
    description: 'Monetize automatically by inserting relevant affiliate links.',
  },
];

export default function Features() {
  return (
    <div className="px-4 sm:px-6 md:px-8">
      <section
        className="bg-white dark:bg-gray-950
                   py-16 px-4 sm:px-6 md:px-8 rounded-t-3xl max-w-7xl mx-auto shadow-lg min-h-[calc(100vh-400px)] transition-colors duration-500"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1f2533] p-6 rounded-xl shadow-lg border border-gray-300 dark:border-[#3a3f56] transition-colors duration-500"
            >
              <h3
                className="text-xl font-extrabold text-[#3c1f86] dark:text-[#a6a9f7] mb-3 transition-colors duration-500"
              >
                {feature.title}
              </h3>
              <p
                className="text-gray-700 dark:text-gray-400 text-base transition-colors duration-500"
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
