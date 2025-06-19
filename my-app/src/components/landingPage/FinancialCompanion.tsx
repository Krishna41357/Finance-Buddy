import React from 'react';

const FinancialCompanion = () => {
    return (
        <section className="py-16 px-6 md:px-20 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">

                {/* Left Content */}
                <div className="flex-1 ">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Your Smart Financial<br />Companion
                    </h2>
                    <p className="text-gray-500 mb-8 max-w-md">
                        Everything you need to invest smartly and grow your wealth with expert insights, tools, and real-time market updates.
                    </p>
                    <button className="bg-[#319465] text-white px-8 py-2 rounded-full font-semibold hover:opacity-90 transition">
                        View All
                    </button>
                </div>

                {/* Right Content */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Card 1 */}
                    <div className="bg-gray-100 p-6  rounded-2xl flex flex-col gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                            {/* Icon Image */}
                            <img src="/financial-blogs.png" alt="Blogs" className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Expert Financial Blogs
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Stay ahead with expert-written articles on investment strategies, economic trends, and wealth-building techniques to make informed decisions.
                        </p>
                        <span className="text-yellow-500 text-sm font-medium cursor-pointer hover:underline">
                            Read More
                        </span>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-100 p-6 rounded-2xl flex flex-col gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                            {/* Icon Image */}
                            <img src="/finance-tools.png" alt="Tools" className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Smart Finance Tools
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Calculate your SIP, PPF, and investment returns with our advanced tools to harness the power of compounding and maximize your savings.
                        </p>
                        <span className="text-yellow-500 text-sm font-medium cursor-pointer hover:underline">
                            Read More
                        </span>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default FinancialCompanion;
