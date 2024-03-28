import React, { useState, useEffect } from 'react';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const apiKey = process.env.REACT_APP_APINEWSKEY;
      const urls = [
        `https://newsapi.org/v2/everything?q=Apple&from=2024-03-28&sortBy=popularity&apiKey=${apiKey}`,
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`,
        `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`
      ];
      try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(response => response.json()));
    
        // Assuming you want to combine all articles from different responses
        const allArticles = data.flatMap(d => d.articles);
        setArticles(allArticles);
      } catch (error) {
        console.error('Could not fetch articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h2>News</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
