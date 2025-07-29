
import React from 'react';
import Navbar from '../components/Navbar';
import { Zap, Target, Users, TrendingUp, Shield, Clock } from 'lucide-react';

const Solution = () => {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Content Generation",
      description: "Generate high-quality blog posts, articles, and social media content with our advanced AI technology.",
      benefits: ["Save 90% time on content creation", "SEO-optimized content", "Multiple content formats"]
    },
    {
      icon: Target,
      title: "Smart SEO Optimization", 
      description: "Automatically optimize your content for search engines with real-time suggestions and keyword analysis.",
      benefits: ["Keyword research & analysis", "Content scoring", "SERP tracking"]
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work seamlessly with your team members, editors, and stakeholders in one unified platform.",
      benefits: ["Real-time collaboration", "Role-based permissions", "Comment & review system"]
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track your content performance with detailed analytics and insights to improve your strategy.",
      benefits: ["Traffic analytics", "Engagement metrics", "ROI tracking"]
    },
    {
      icon: Shield,
      title: "Brand Consistency",
      description: "Maintain your brand voice and style across all content with customizable brand guidelines.",
      benefits: ["Brand voice training", "Style templates", "Consistency scoring"]
    },
    {
      icon: Clock,
      title: "Content Scheduling",
      description: "Plan and schedule your content across multiple platforms with our intelligent scheduling system.",
      benefits: ["Multi-platform publishing", "Optimal timing suggestions", "Content calendar"]
    }
  ];

  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-500">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
            Complete Content Solution
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.1s'}}>
            Transform your content strategy with AI-powered tools, seamless collaboration, and data-driven insights that help you create, optimize, and scale your content like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: '0.2s'}}>
            <button className="px-8 py-4 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-xl font-semibold hover:brightness-110 transition-all">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Comprehensive tools for modern content creators</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-violet-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Content?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of content creators who trust BlogForge</p>
          <button className="px-8 py-4 bg-white text-violet-600 rounded-xl font-semibold hover:bg-gray-100 transition-all">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Solution;
