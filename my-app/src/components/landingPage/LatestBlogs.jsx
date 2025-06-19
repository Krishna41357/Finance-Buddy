import React from 'react';

const LatestBlogs = () => {
    return (
        <section className="py-16 px-6 md:px-20 bg-gray-50">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">

                {/* Section Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Latest blogs
                </h2>

                {/* Blog Content */}
                <div className="flex flex-col md:flex-row gap-6">

                    {/* Left Big Blog Card */}
                    <div className="flex-1 bg-white rounded-lg overflow-hidden shadow-sm">
                        <img
                            src="/blog-left.png"
                            alt="Blog Cover"
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6 flex flex-col gap-2">
                            <h4 className="text-lg font-semibold text-gray-900">
                                Credit Cards for Beginners: Smart Tips to Stay Debt-Free
                            </h4>
                            <p className="text-gray-500 text-xs">
                                Understand the benefits and risks of credit cards, how to build a good credit score, and how to use them responsibly.
                            </p>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-2">
                                    <img
                                        src="/Ellipse-user.png"
                                        alt="Author"
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <span className="text-gray-700 text-sm">Sarah Mitchell</span>
                                </div>
                                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                                    <span className="text-lg">→</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Small Blog Cards */}
                    <div className="flex flex-col gap-6 flex-1">

                        {/* Blog Card 1 */}
                        <div className="flex gap-0 bg-white rounded-lg overflow-hidden shadow-sm">
                            <img
                                src="/blog-right1.png"
                                alt="Blog Thumbnail"
                                className="w-[40%] object-cover"
                            />
                            <div className="p-8 flex flex-col justify-between flex-1">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">
                                        The Power of Saving: Start Small, Grow Big
                                    </h4>
                                    <p className="text-gray-500 text-xs mt-1">
                                        Learn simple saving habits that can help kids and young adults build a strong financial foundation for the future.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src="/Ellipse-user.png"
                                            alt="Author"
                                            className="w-5 h-5 rounded-full"
                                        />
                                        <span className="text-gray-700 text-xs">Sarah Mitchell</span>
                                    </div>
                                    <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                                        <span className="text-base">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Blog Card 2 */}
                        <div className="flex gap-0 bg-white rounded-lg overflow-hidden shadow-sm">
                            <img
                                src="/blog-right2.png"
                                alt="Blog Thumbnail"
                                className="w-[40%] object-cover"
                            />
                            <div className="p-8 flex flex-col justify-between flex-1">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">
                                        The Power of Saving: Start Small, Grow Big
                                    </h4>
                                    <p className="text-gray-500 text-xs mt-1">
                                        Learn simple saving habits that can help kids and young adults build a strong financial foundation for the future.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src="/Ellipse-user.png"
                                            alt="Author"
                                            className="w-5 h-5 rounded-full"
                                        />
                                        <span className="text-gray-700 text-xs">Sarah Mitchell</span>
                                    </div>
                                    <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                                        <span className="text-base">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default LatestBlogs;
