// News.jsx

import React, { useState, useEffect } from 'react';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Function to fetch news articles from AP News API
    const fetchNews = async () => {
      try {
        const response = await fetch('https://api.ap.org/v2/top-headlines?apiKey=YOUR_API_KEY');
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <div>
      <h2>News</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
