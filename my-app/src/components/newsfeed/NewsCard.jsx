import React from 'react';

const NewsCard = ({ title, summary, image, label, url, type = 'blog', source, scrapedAt }) => {
  return (
    <div className="bg-white rounded-xl w-[70vw] shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300">
      <div className="flex">
        {/* Image Section */}
        <div className="w-80 h-60 bg-gradient-to-br from-green-100 to-emerald-100 flex-shrink-0">
          {image ? (
            <img
              src={image}
              alt={title || 'Blog Cover'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
              <span className="text-green-600 font-medium">No Image</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          {/* Labels and Type */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
              type === 'blog'
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200'
                : 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200'
            }`}>
              {type}
            </span>

            {Array.isArray(label) ? (
              label.map((lbl, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-200"
                >
                  {lbl}
                </span>
              ))
            ) : (
              label && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                  {label}
                </span>
              )
            )}
          </div>

          {/* Title and Summary */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 text-left leading-tight">
            {title || 'Untitled Article'}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3 text-left leading-relaxed">
            {summary || 'No summary available'}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-green-50">
            <div className="flex items-center gap-4">
              {source && (
                <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md">
                  Source: {source}
                </span>
              )}
              {scrapedAt && (
                <span className="text-gray-600">
                  {new Date(scrapedAt).toLocaleDateString()}
                </span>
              )}
            </div>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-medium hover:underline transition-all duration-200"
              >
                Read More →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
