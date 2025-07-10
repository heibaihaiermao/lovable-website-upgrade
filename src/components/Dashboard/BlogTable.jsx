import React from 'react';

export const BlogTable = ({ blogs, onBlogClick }) => {
  return (
    <div className="w-[calc(100%_-_70px)] max-w-[1600px] mx-auto max-md:w-[calc(100%_-_40px)] max-md:mx-5">
      {/* Table Header */}
      <div className="flex mb-0 max-md:flex-col max-md:gap-2.5">
        <div className="flex-1 text-gray-700 dark:text-gray-300 text-xl font-medium bg-white dark:bg-[#121524] px-5 py-[15px] border border-gray-300 dark:border-[#2b2f57] rounded-tl-md max-md:rounded-md max-md:w-full max-sm:text-base">
          Blogs
        </div>
        <div className="w-[267px] text-gray-700 dark:text-gray-300 text-xl font-medium bg-white dark:bg-[#121524] px-5 py-[5px] border border-gray-300 dark:border-[#2b2f57] max-md:w-full max-md:rounded-md max-sm:text-base">
          SEO Score
        </div>
        <div className="w-[267px] text-gray-700 dark:text-gray-300 text-xl font-medium bg-white dark:bg-[#121524] px-[22px] py-3.5 border border-gray-300 dark:border-[#2b2f57] rounded-tr-md max-md:rounded-md max-md:w-full max-sm:text-base">
          Date Created
        </div>
      </div>

      {/* Table Rows */}
      {blogs.map((blog, index) => {
        const isLast = index === blogs.length - 1;
        return (
          <div
            key={blog.id}
            className={`flex cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a1f35] transition-colors max-md:flex-col max-md:gap-2.5 max-md:mb-2.5 ${
              isLast ? 'mb-0' : ''
            }`}
            onClick={() => onBlogClick?.(blog)}
          >
            <div
              className={`flex-1 text-gray-900 dark:text-white text-xl font-normal bg-white dark:bg-[#121524] px-5 py-[15px] border border-gray-300 dark:border-[#2b2f57] ${
                isLast ? 'rounded-bl-md' : ''
              } max-md:rounded-md max-md:w-full max-sm:text-base`}
            >
              {blog.title}
            </div>
            <div className="w-[267px] text-gray-900 dark:text-white text-xl font-normal bg-white dark:bg-[#121524] px-5 py-[5px] border border-gray-300 dark:border-[#2b2f57] max-md:rounded-md max-md:w-full max-sm:text-base">
              {blog.seoScore}
            </div>
            <div
              className={`w-[267px] text-gray-900 dark:text-white text-xl font-normal bg-white dark:bg-[#121524] px-[22px] py-3.5 border border-gray-300 dark:border-[#2b2f57] ${
                isLast ? 'rounded-br-md' : ''
              } max-md:rounded-md max-md:w-full max-sm:text-base`}
            >
              {blog.dateCreated}
            </div>
          </div>
        );
      })}
    </div>
  );
};
