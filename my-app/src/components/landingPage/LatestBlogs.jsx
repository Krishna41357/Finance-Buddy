import React from 'react';

const LatestBlogs = () => {
    return (
        <section className="py-20 px-6 md:px-20 relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden">
            {/* Glowing Background Effects */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-16 right-16 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-green-300/15 rounded-full blur-2xl animate-pulse delay-500" />

            <div className="max-w-7xl mx-auto flex flex-col gap-14 relative z-10">

                {/* Section Title */}
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Latest <span className="text-green-400 drop-shadow-[0_0_20px_#22c55e]">Market Insights</span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        Stay up-to-date with the current market sentiment — whether it's bullish optimism or bearish caution. Access analysis, news, and expert financial commentary.
                    </p>
                </div>

                {/* Blog Content */}
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Featured Blog Card */}
                    <div className="flex-1 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-gray-700 p-6">
                        <img
                            src="/blog-left.png"
                            alt="Market Blog"
                            className="w-full h-64 object-cover rounded-2xl mb-6"
                        />
                        <h4 className="text-2xl font-semibold text-white mb-3">
                            Is the Market Turning Bearish? Experts Weigh In
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">
                            With volatility on the rise, analysts discuss signals that might point to a short-term correction and how investors can navigate it smartly.
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2">
                                <img src="/Ellipse-user.png" className="w-6 h-6 rounded-full" alt="Author" />
                                <span className="text-sm text-white">Ravi Khurana</span>
                            </div>
                            <button className="text-green-400 text-lg hover:text-green-300 transition">→</button>
                        </div>
                    </div>

                    {/* Side Blogs */}
                    <div className="flex flex-col gap-6 flex-1">

                        {/* Blog Card 1 */}
                        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-5 shadow-xl border border-gray-700 flex gap-5 items-start">
                            <img src="/blog-right1.png" className="w-28 h-24 object-cover rounded-xl" alt="Market Trend" />
                            <div className="flex-1">
                                <h4 className="text-lg text-white font-semibold mb-1">
                                    Bulls Back in Charge: Tech Sector Surges
                                </h4>
                                <p className="text-gray-400 text-sm">
                                    Nasdaq sees green as investors pour money into AI and green energy.
                                </p>
                                <div className="mt-3 flex justify-between items-center text-sm text-gray-300">
                                    <span>Tanvi Mehta</span>
                                    <span className="text-green-400">→</span>
                                </div>
                            </div>
                        </div>

                        {/* Blog Card 2 */}
                        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-5 shadow-xl border border-gray-700 flex gap-5 items-start">
                            <img src="/blog-right2.png" className="w-28 h-24 object-cover rounded-xl" alt="Finance" />
                            <div className="flex-1">
                                <h4 className="text-lg text-white font-semibold mb-1">
                                    Understanding Market Cycles: Timing vs Patience
                                </h4>
                                <p className="text-gray-400 text-sm">
                                    Learn how seasoned investors use macro trends to make entry and exit decisions.
                                </p>
                                <div className="mt-3 flex justify-between items-center text-sm text-gray-300">
                                    <span>Aman Raj</span>
                                    <span className="text-green-400">→</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full blur-xl bg-green-400 opacity-30 animate-pulse" />
                        <button
                            className="relative z-10 backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl border border-green-400/30 transition-all duration-300 hover:scale-105 hover:shadow-green-500/50"
                            style={{
                                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(16, 185, 129, 0.8) 100%)',
                                boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                            }}
                        >
                            See Financial Content
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default LatestBlogs;
