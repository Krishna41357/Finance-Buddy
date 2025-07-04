import React from 'react';
import NewsCard from './NewsCard'; // adjust path if needed

const Feeds = ({ articles }) => {
  return (
    <div className="w-[90%]  flex flex-col gap-6">
      {articles && articles.map((article, index) => {
        const imageUrl = article.featuredImage
          ? article.featuredImage.startsWith('http')
            ? article.featuredImage
            : `http://localhost:8000/${article.featuredImage.replace(/\\/g, '/')}`
          : '/blog-left.png'; // fallback if no image

        return (
          <NewsCard
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
