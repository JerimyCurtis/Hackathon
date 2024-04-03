import React, { useState, useEffect } from 'react';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    const apiKey = process.env.REACT_APP_APINEWSKEY;
    // Fetch Top Headlines on component mount
    const topHeadlinesUrls = [
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&apiKey=${apiKey}`,
      `https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=${pageSize}&apiKey=${apiKey}`,
    ];

    const fetchTopHeadlines = async () => {
      try {
        const responses = await Promise.all(topHeadlinesUrls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        const topHeadlines = data.flatMap(d => d.articles);
        setArticles(topHeadlines);
      } catch (error) {
        console.error('Could not fetch top headlines:', error);
      }
    };

    fetchTopHeadlines();
  }, [pageSize]);

  useEffect(() => {
    if (!query) return; // Fetch articles based on search query and date
    const apiKey = process.env.REACT_APP_APINEWSKEY;
    const searchUrl = `https://newsapi.org/v2/everything?q=${query}&from=${fromDate}&sortBy=popularity&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    const fetchArticles = async () => {
      try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Could not fetch articles based on query:', error);
      }
    };

    fetchArticles();
  }, [query, fromDate, page, pageSize]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to the first page for a new search
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex-1 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Top News</h2>
        <form onSubmit={handleSearch} className="mb-6">
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Search
          </button>
        </form>
        <ul className="space-y-4">
          {articles.map((article, index) => (
            <li key={index} className="bg-white shadow overflow-hidden rounded-lg p-6 hover:bg-gray-100">
              {article.url ? (
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 font-semibold">
                  {article.title}
                </a>
              ) : (
                <span>Article URL not available</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default News;
