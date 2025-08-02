import React from 'react';
import NewsCard from './NewsCard'; // adjust path if needed

const Feeds = ({ articles }) => {
  const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
  return (
    <div className="w-[90%]  flex flex-col gap-6">
      {articles && articles.map((article, index) => {
        const imageUrl = article.featuredImage
          ? article.featuredImage.startsWith('http')
            ? article.featuredImage
            : `${BASE_API}/api/v1/${article.featuredImage.replace(/\\/g, '/')}`
          : '/blog-left.png'; // fallback if no image

        return (
          <NewsCard
            id = {article._id || article.id}
            key={index}
            title={article.title}
            summary={article.summary}
            image={imageUrl}
            url={article.url}
            label={article.label}
          />
        );
      })}
    </div>
  );
};

export default Feeds;
