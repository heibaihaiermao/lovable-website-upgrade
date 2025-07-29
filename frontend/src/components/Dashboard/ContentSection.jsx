import React, { useState, useEffect } from 'react';
import { BlogTable } from './BlogTable';
import { getCurrentWorkspace, getWorkspaceData } from '../../utils/workspaceManager';

export const ContentSection = ({ onSearchBlogs, onBlogClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    // Load workspace-specific blogs
    const currentWorkspace = getCurrentWorkspace();
    if (currentWorkspace) {
      const workspaceBlogs = getWorkspaceData(currentWorkspace.id, 'blogs') || [];
      setBlogs(workspaceBlogs);
      setFilteredBlogs(workspaceBlogs);
    } else {
      setBlogs([]);
      setFilteredBlogs([]);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
    onSearchBlogs?.(searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === '') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  };

  return (
    <main className="mt-8 transition-colors duration-300">
      <div className="max-md:px-5">
        <h2 className="text-gray-900 dark:text-white text-4xl text-left font-bold mb-8 px-[55px] max-md:text-[28px] max-md:px-0 max-sm:text-2xl">
          My Content
        </h2>

        <form onSubmit={handleSearch} className="mb-6 text-left px-[35px] max-md:px-0">
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search in saved blogs..."
            className="w-full max-w-[533px] h-[48px] px-5 py-3 text-lg font-medium
                       bg-white dark:bg-[#121524] border border-gray-300 dark:border-[#2b2f57]
                       text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500
                       rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition-all duration-300"
          />
        </form>
      </div>

      <div className="mt-6">
        <BlogTable blogs={filteredBlogs} onBlogClick={onBlogClick} />
      </div>
    </main>
  );
};
