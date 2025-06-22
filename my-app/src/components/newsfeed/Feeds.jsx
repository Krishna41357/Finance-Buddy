import React from 'react';
import NewsCard from './NewsCard'; // adjust path if needed

const Feeds = ({ articles }) => {
  return (
    <div className="w-[90%] flex flex-col gap-6">
      {articles && articles.map((article, index) => (
        <NewsCard
          key={index}
          title={article.title}
          summary={article.summary}
          image={article.image}
          url={article.url}
          label={article.label}
        />
      ))}
    </div>
  );
};

export default Feeds;
