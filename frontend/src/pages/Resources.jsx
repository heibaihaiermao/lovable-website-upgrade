
import React from 'react';
import Navbar from '../components/Navbar';
import { Book, Video, FileText, Users, Download, ExternalLink } from 'lucide-react';

const Resources = () => {
  const resourceCategories = [
    {
      icon: Book,
      title: "Guides & Tutorials",
      description: "Step-by-step guides to master BlogForge",
      items: [
        "Getting Started with BlogForge",
        "Advanced SEO Techniques",
        "Content Marketing Strategies",
        "AI Writing Best Practices"
      ]
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch and learn from our experts",
      items: [
        "Platform Overview (10 min)",
        "Creating Your First Blog Post",
        "Team Collaboration Features",
        "Analytics Deep Dive"
      ]
    },
    {
      icon: FileText,
      title: "Templates",
      description: "Ready-to-use content templates",
      items: [
        "Blog Post Templates",
        "Social Media Templates",
        "Email Newsletter Templates",
        "Brand Style Guides"
      ]
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with other creators",
      items: [
        "Discord Community",
        "Monthly Webinars",
        "Success Stories",
        "Feature Requests"
      ]
    }
  ];

  const popularResources = [
    {
      title: "The Complete Guide to AI Content Creation",
      description: "Learn how to leverage AI for content creation while maintaining authenticity",
      type: "Guide",
      readTime: "15 min read",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop"
    },
    {
      title: "SEO Optimization Checklist 2024",
      description: "Essential checklist to ensure your content ranks high in search results",
      type: "Checklist",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
    },
    {
      title: "Building a Content Calendar That Works",
      description: "Strategic approach to planning and organizing your content pipeline",
      type: "Template",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"
    }
  ];

  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-500">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
            Resources & Learning
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.1s'}}>
            Everything you need to master content creation, from beginner guides to advanced strategies and community support.
          </p>
        </div>
      </section>

      {/* Popular Resources */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {popularResources.map((resource, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <img 
                  src={resource.image} 
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-3 py-1 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 rounded-full">
                      {resource.type}
                    </span>
                    <span className="text-xs text-gray-500">{resource.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{resource.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>
                  <button className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-medium hover:gap-3 transition-all">
                    Read More <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resourceCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{category.description}</p>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer transition-colors">
                      <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Get the latest resources, tips, and updates delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-lg font-semibold hover:brightness-110 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
