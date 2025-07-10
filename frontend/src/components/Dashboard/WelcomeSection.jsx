import React, { useState } from 'react';

export const WelcomeSection = ({ onKeywordSelected }) => {
  const [keyword, setKeyword] = useState('');
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    try {
      setLoading(true);
      setErrorMessage('');
      const response = await post('/api/seo-research', { keyword });
      setSuggestedKeywords(response.data.keywords);
      setSelectedKeyword('');
    } catch (error) {
      console.error('Error fetching keywords:', error);
      setErrorMessage('Failed to fetch keywords. Please try again.');
      setSuggestedKeywords(['Keyword 1', 'Keyword 2']);
      setSelectedKeyword('');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBlog = async () => {
    if (!selectedKeyword) return;
    try {
      await post('/api/generate-blog', { keyword: selectedKeyword });
      if (onKeywordSelected) {
        onKeywordSelected(selectedKeyword);
      }
    } catch (error) {
      console.error('Error generating blog:', error);
      setErrorMessage('Failed to generate blog. Please try again.');
    }
  };

  return (
    <section className="w-[calc(100%_-_70px)] max-w-[1597px] mx-auto mt-[40px] relative max-md:w-[calc(100%_-_40px)] max-md:m-5">
      <div className="w-full bg-[#2D3748] rounded-[10px] border border-black border-opacity-80 relative overflow-hidden px-[35px] py-[35px] max-md:p-5">
        <h2 className="text-white text-xl text-left font-normal leading-8 mb-6 max-w-[426px] max-md:text-base max-md:mb-5 max-sm:text-sm">
          Welcome Back! Ready to create your next high-ranking blog?
        </h2>

        <form onSubmit={handleSubmit} className="flex gap-4 max-md:flex-col">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter your topic or keyword..."
            className="flex-1 max-w-[700px] h-[55px] px-5 py-6 bg-white border border-black border-opacity-80 rounded text-xl font-normal text-[#79747E] placeholder:text-[#79747E] focus:outline-none focus:ring-2 focus:ring-violet-500 max-md:w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-[267px] h-[55px] bg-violet-600 text-white text-2xl font-semibold rounded px-5 py-6 flex items-center justify-center hover:bg-violet-700 transition-colors max-md:w-full"
          >
            {loading ? 'Loading...' : 'Start SEO Research'}
          </button>
        </form>

        {errorMessage && (
          <p className="text-red-400 mt-4 text-base">{errorMessage}</p>
        )}

        {suggestedKeywords.length > 0 && (
          <div className="mt-8">
            <h3 className="text-white text-xl font-bold mb-4">Suggested Keywords:</h3>
            <div className="flex flex-wrap gap-4">
              {suggestedKeywords.map((kw, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedKeyword(kw)}
                  className={`px-4 py-2 rounded-full border text-white transition-colors duration-200 ${
                    selectedKeyword === kw
                      ? 'bg-violet-600'
                      : 'border-white hover:bg-gray-700 bg-gray-700'
                  }`}
                >
                  {kw}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleGenerateBlog}
              disabled={!selectedKeyword}
              className="mt-6 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded text-xl font-semibold disabled:opacity-50 transition-colors"
            >
              Generate New Blog
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WelcomeSection;
