
import React, { useState } from 'react';
import { Calendar, TrendingUp, ExternalLink, MoreHorizontal } from 'lucide-react';

export const BlogTable = ({ blogs, onBlogClick }) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getSeoScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getSeoScoreBg = (score) => {
    if (score >= 90) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 70) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  return (
    <div className="w-[calc(100%_-_70px)] max-w-[1600px] mx-auto max-md:w-[calc(100%_-_40px)] max-md:mx-5">
      {/* Enhanced Table Header */}
      <div className="flex mb-0 max-md:flex-col max-md:gap-2.5 bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 rounded-t-xl">
        <div className="flex-1 text-gray-800 dark:text-gray-200 text-xl font-semibold bg-white/80 dark:bg-[#121524]/80 backdrop-blur-sm px-6 py-5 border border-gray-200 dark:border-[#2b2f57] rounded-tl-xl max-md:rounded-xl max-md:w-full max-sm:text-base flex items-center gap-3">
          <ExternalLink className="w-5 h-5 text-violet-500" />
          Blog Posts
        </div>
        <div className="w-[267px] text-gray-800 dark:text-gray-200 text-xl font-semibold bg-white/80 dark:bg-[#121524]/80 backdrop-blur-sm px-6 py-5 border border-gray-200 dark:border-[#2b2f57] max-md:w-full max-md:rounded-xl max-sm:text-base flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-green-500" />
          SEO Score
        </div>
        <div className="w-[267px] text-gray-800 dark:text-gray-200 text-xl font-semibold bg-white/80 dark:bg-[#121524]/80 backdrop-blur-sm px-6 py-5 border border-gray-200 dark:border-[#2b2f57] rounded-tr-xl max-md:rounded-xl max-md:w-full max-sm:text-base flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-500" />
          Date Created
        </div>
      </div>

      {/* Enhanced Table Rows */}
      {blogs.map((blog, index) => {
        const isLast = index === blogs.length - 1;
        const isHovered = hoveredRow === index;
        
        return (
          <div
            key={blog.id}
            className={`flex cursor-pointer transition-all duration-300 max-md:flex-col max-md:gap-2.5 max-md:mb-2.5 group ${
              isLast ? 'mb-0' : ''
            } ${
              isHovered 
                ? 'bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-950/30 dark:to-blue-950/30 shadow-lg scale-[1.02]' 
                : 'hover:bg-gray-50 dark:hover:bg-[#1a1f35]'
            }`}
            onClick={() => onBlogClick?.(blog)}
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {/* Blog Title Cell */}
            <div
              className={`flex-1 text-gray-900 dark:text-white text-lg font-medium bg-white dark:bg-[#121524] px-6 py-5 border border-gray-200 dark:border-[#2b2f57] ${
                isLast ? 'rounded-bl-xl' : ''
              } max-md:rounded-xl max-md:w-full max-sm:text-base transition-all duration-300 ${
                isHovered ? 'border-violet-200 dark:border-violet-700' : ''
              } flex items-center justify-between group`}
            >
              <span className="group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                {blog.title}
              </span>
              <MoreHorizontal className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-400" />
            </div>

            {/* SEO Score Cell */}
            <div className="w-[267px] text-lg font-semibold bg-white dark:bg-[#121524] px-6 py-5 border border-gray-200 dark:border-[#2b2f57] max-md:rounded-xl max-md:w-full max-sm:text-base transition-all duration-300 flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${getSeoScoreBg(blog.seoScore)} ${getSeoScoreColor(blog.seoScore)}`}>
                {blog.seoScore}%
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    blog.seoScore >= 90 ? 'bg-green-500' : 
                    blog.seoScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ 
                    width: `${blog.seoScore}%`,
                    animationDelay: `${index * 0.1}s`
                  }}
                />
              </div>
            </div>

            {/* Date Created Cell */}
            <div
              className={`w-[267px] text-gray-900 dark:text-white text-lg font-normal bg-white dark:bg-[#121524] px-6 py-5 border border-gray-200 dark:border-[#2b2f57] ${
                isLast ? 'rounded-br-xl' : ''
              } max-md:rounded-xl max-md:w-full max-sm:text-base transition-all duration-300 ${
                isHovered ? 'border-violet-200 dark:border-violet-700' : ''
              }`}
            >
              {blog.dateCreated}
            </div>
          </div>
        );
      })}

      {/* Empty state for no blogs */}
      {blogs.length === 0 && (
        <div className="bg-white dark:bg-[#121524] border border-gray-200 dark:border-[#2b2f57] rounded-b-xl p-12 text-center">
          <div className="text-gray-400 dark:text-gray-600 text-lg mb-4">No blogs found</div>
          <button className="bg-gradient-to-r from-violet-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
            Create Your First Blog
          </button>
        </div>
      )}
    </div>
  );
};
