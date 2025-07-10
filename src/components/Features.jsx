
import React from 'react';
import { Search, Bot, TrendingUp, Globe, BarChart3, DollarSign } from 'lucide-react';

const features = [
  {
    title: 'Smart Keyword Research',
    description: 'Target your audience precisely with AI-powered keyword suggestions and search volume analysis.',
    icon: Search,
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    title: 'AI Content Generation',
    description: 'Automatic title, outline, and body creation tailored for SEO and reader engagement.',
    icon: Bot,
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    title: 'SEO Optimization',
    description: 'Built-in H1 tags, meta descriptions, schema markup, and keyword density monitoring.',
    icon: TrendingUp,
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    title: 'CMS Publishing',
    description: 'Seamlessly publish to WordPress, Webflow, or any CMS with one-click integration.',
    icon: Globe,
    gradient: 'from-orange-500 to-red-600'
  },
  {
    title: 'Performance Tracking',
    description: 'Monitor Google rankings, traffic metrics, and content performance over time.',
    icon: BarChart3,
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    title: 'Revenue Integration',
    description: 'Automatically insert relevant affiliate links and monetization opportunities.',
    icon: DollarSign,
    gradient: 'from-yellow-500 to-orange-600'
  },
];

export default function Features() {
  return (
    <div className="px-4 sm:px-6 md:px-8">
      <section className="bg-white dark:bg-gray-950 py-20 px-4 sm:px-6 md:px-8 rounded-t-3xl max-w-7xl mx-auto shadow-2xl min-h-[calc(100vh-400px)] transition-colors duration-500 relative overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-transparent to-blue-50/50 dark:from-violet-950/20 dark:to-blue-950/20" />
        
        {/* Section header */}
        <div className="relative text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              dominate SEO
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From keyword research to content publishing, BlogForge provides a complete toolkit for content creators.
          </p>
        </div>

        {/* Enhanced feature grid */}
        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white dark:bg-[#1f2533] p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-[#3a3f56] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon with gradient background */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-violet-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
            Start Creating Content
          </button>
        </div>
      </section>
    </div>
  );
}
