import React from 'react';

const AdminLatestBlogs = ({ content = {}, setContent }) => {
  const handleChange = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section className="py-20 px-6 md:px-20 relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-16 right-16 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-green-300/15 rounded-full blur-2xl animate-pulse delay-500" />

      <div className="max-w-7xl mx-auto flex flex-col gap-14 relative z-10">
        {/* Section Title */}
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleChange('blogTitle', e.target.innerText)}
          >
            {content.blogTitle || 'Latest Market Insights'}
          </h2>
          <p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleChange('blogSubTitle', e.target.innerText)}
          >
            {content.blogSubTitle || 'Stay up-to-date with the current market sentiment.'}
          </p>
        </div>

        {/* Blog Content */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Featured Blog */}
          <div className="flex-1 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-6 shadow-2xl border border-gray-700">
            <img src="/blog-left.png" alt="Blog Main" className="w-full h-64 object-cover rounded-2xl mb-6" />
            <h4
              className="text-2xl font-semibold text-white mb-3"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleChange('blog1Title', e.target.innerText)}
            >
              {content.blog1Title || 'Is the Market Turning Bearish?'}
            </h4>
            <p
              className="text-gray-400 text-sm mb-4"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleChange('blog1Desc', e.target.innerText)}
            >
              {content.blog1Desc || 'Volatility rising, analysts signal correction ahead.'}
            </p>
            <div className="flex items-center justify-between">
              <input
                type="text"
                className="bg-transparent border border-green-400/30 px-2 py-1 text-white rounded"
                value={content.blog1Author || 'Ravi Khurana'}
                onChange={(e) => handleChange('blog1Author', e.target.value)}
              />
              <span className="text-green-400">→</span>
            </div>
          </div>

          {/* Side Blogs */}
          <div className="flex flex-col gap-6 flex-1">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-5 shadow-xl border border-gray-700 flex gap-5"
              >
                <img src={`/blog-right${i}.png`} className="w-28 h-24 object-cover rounded-xl" />
                <div className="flex-1">
                  <h4
                    className="text-lg text-white font-semibold mb-1"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleChange(`blog${i + 1}Title`, e.target.innerText)}
                  >
                    {content[`blog${i + 1}Title`] || `Blog ${i + 1} Title`}
                  </h4>
                  <p
                    className="text-gray-400 text-sm"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleChange(`blog${i + 1}Desc`, e.target.innerText)}
                  >
                    {content[`blog${i + 1}Desc`] || `Blog ${i + 1} description`}
                  </p>
                  <div className="mt-3 flex justify-between items-center text-sm text-gray-300">
                    <input
                      type="text"
                      className="bg-transparent border border-green-400/30 px-2 py-1 text-white rounded"
                      value={content[`blog${i + 1}Author`] || 'Author'}
                      onChange={(e) => handleChange(`blog${i + 1}Author`, e.target.value)}
                    />
                    <span className="text-green-400">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLatestBlogs;
