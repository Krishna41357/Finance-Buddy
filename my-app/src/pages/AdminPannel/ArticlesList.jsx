import React from 'react';
import { Eye, Trash2, Plus, Pencil } from 'lucide-react';

const getCleanSummary = (summary) => {
  if (typeof summary === 'string') {
    return summary.replace(/<[^>]+>/g, '');
  }
  return 'No summary available';
};

const ArticlesList = ({
  articles,
  loading,
  onRefresh,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
  apiBase,
}) => {
  const articleCount = articles.length;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <span className="text-black text-xl font-[700] text-green-600">
          Total available articles : ({articleCount})
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            Get All Feeds
          </button>
          <button
            onClick={onAddArticle}
            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Plus size={16} />
            Add Article
          </button>
        </div>
      </div>

      <div className="h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        )}

        <div className="grid gap-6">
          {articles.map((article) => (
            <div
              key={article._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex">
                <div className="w-80 h-60 bg-gradient-to-br from-green-100 to-emerald-100 flex-shrink-0">
                  {article.featuredImage ? (
                    <img
                      src={`${apiBase.replace('/api/v1', '')}/${article.featuredImage}`}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                      <span className="text-green-600 font-medium">No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                            article.type === 'blog'
                              ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200'
                              : 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {article.type}
                        </span>
                        {Array.isArray(article.label) && article.label.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {article.label.map((lbl, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-200"
                              >
                                {lbl}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 text-left leading-tight">
                        {article.title || 'Untitled Article'}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3 text-left leading-relaxed">
                        {getCleanSummary(article.summary)}
                      </p>
                    </div>

                    <div className="flex gap-2 ml-4">
                      {article.url && (
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 border border-blue-200"
                          title="View Article"
                        >
                          <Eye size={16} />
                        </a>
                      )}
                      <button
                        onClick={() => onUpdateArticle(article._id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 border border-green-200"
                        title="Edit Article"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteArticle(article._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200"
                        title="Delete Article"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-green-50">
                    <div className="flex items-center gap-4">
                      {article.source && (
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md">
                          Source: {article.source}
                        </span>
                      )}
                      <span className="text-gray-600">
                        {article.scrapedAt
                          ? new Date(article.scrapedAt).toLocaleDateString()
                          : ''}
                      </span>
                    </div>
                    {article.url && (
                      <a
                        href={article.url}
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
          ))}
        </div>

        {articles.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-green-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus size={24} className="text-green-600" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No articles found</p>
              <p className="text-gray-400">
                Click "Get All Feeds" to load articles or add a new article
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ArticlesList;
