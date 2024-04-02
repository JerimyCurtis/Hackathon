import React, { useState, useEffect } from 'react';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Fetch Top Headlines on component mount
  useEffect(() => {
    const apiKey = process.env.REACT_APP_APINEWSKEY;
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
  }, [pageSize]); // Depend on pageSize so it runs if pageSize changes

  // Fetch articles based on search query and date
  useEffect(() => {
    if (!query) return; // Don't run the search if query is empty

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
  }, [query, fromDate, page, pageSize]); // Depend on query, fromDate, page, and pageSize

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to the first page for a new search
  };

  return (
    <div className="news-container">
      <h2>News</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(prevPage => prevPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default News;
