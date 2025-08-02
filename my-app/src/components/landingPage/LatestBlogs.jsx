import React from 'react';

const LatestBlogs = ({ content = {} }) => {
  const blogTitle = content?.blogTitle || 'Latest Market Insights';
  const blogSubTitle = content?.blogSubTitle || 'Stay up-to-date with the current market sentiment.';

  // Manually map blog entries from content
  const blogs = [
    {
      image: '/blog-left.png',
      title: content?.blog1Title || 'Is the Market Turning Bearish? Experts Weigh In',
      description: content?.blog1Desc || 'Analysts discuss market correction signals and investor strategies.',
      author: content?.blog1Author || 'Ravi Khurana',
      isFeatured: true,
    },
    {
      image: '/blog-right1.png',
      title: content?.blog2Title || 'Bulls Back in Charge: Tech Sector Surges',
      description: content?.blog2Desc || 'Investors pour money into AI and green energy.',
      author: content?.blog2Author || 'Tanvi Mehta',
    },
    {
      image: '/blog-right2.png',
      title: content?.blog3Title || 'Understanding Market Cycles: Timing vs Patience',
      description: content?.blog3Desc || 'How seasoned investors use macro trends.',
      author: content?.blog3Author || 'Aman Raj',
    },
  ];

  const featured = blogs.find(b => b.isFeatured);
  const others = blogs.filter(b => !b.isFeatured);

  return (
    <section className="py-20 px-6 md:px-20 relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden">
      {/* Glows */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-16 right-16 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-green-300/15 rounded-full blur-2xl animate-pulse delay-500" />

      <div className="max-w-7xl mx-auto flex flex-col gap-14 relative z-10">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {blogTitle}
            <span className="text-green-400 drop-shadow-[0_0_20px_#22c55e]"> Insights</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">{blogSubTitle}</p>
        </div>

        {/* Blogs Section */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Featured Blog */}
          {featured && (
            <div className="flex-1 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-gray-700 p-6">
              <img
                src={featured.image}
                alt="Market Blog"
                className="w-full h-64 object-cover rounded-2xl mb-6"
                onError={(e) => { e.target.src = '/blog-left.png'; }}
              />
              <h4 className="text-2xl font-semibold text-white mb-3">{featured.title}</h4>
              <p className="text-gray-400 text-sm mb-4">{featured.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <img
                    src="/Ellipse-user.png"
                    className="w-6 h-6 rounded-full"
                    alt="Author"
                    onError={(e) => { e.target.src = '/testimonial-user.png'; }}
                  />
                  <span className="text-sm text-white">{featured.author}</span>
                </div>
                <button className="text-green-400 text-lg hover:text-green-300 transition">→</button>
              </div>
            </div>
          )}

          {/* Other Blogs */}
          <div className="flex flex-col gap-6 flex-1">
            {others.map((blog, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-5 shadow-xl border border-gray-700 flex gap-5 items-start">
                <img
                  src={blog.image}
                  className="w-28 h-24 object-cover rounded-xl"
                  alt="Blog"
                  onError={(e) => { e.target.src = '/blog-right1.png'; }}
                />
                <div className="flex-1">
                  <h4 className="text-lg text-white font-semibold mb-1">{blog.title}</h4>
                  <p className="text-gray-400 text-sm">{blog.description}</p>
                  <div className="mt-3 flex justify-between items-center text-sm text-gray-300">
                    <span>{blog.author}</span>
                    <span className="text-green-400 cursor-pointer hover:text-green-300 transition">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-6">
          <button className="relative z-10 backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl border border-green-400/30 transition-all duration-300 hover:scale-105 hover:shadow-green-500/50">
            See Financial Content
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
