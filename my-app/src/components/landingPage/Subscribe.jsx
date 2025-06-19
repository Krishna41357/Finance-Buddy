import React from "react";

const Subscribe = () => {
    return (
        <section className="bg-gray-50 py-16 px-6 md:px-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

                {/* Left Section */}
                <div className="flex-1 flex flex-col items-start">
                    {/* Image */}
                    <img
                        src="/subscribe.png"
                        alt="Subscribe"
                        className="w-80 h-80 object-cover rounded-2xl mb-6 shadow-md"
                    />

                    {/* Heading */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Subscribe to the FinVeda Newsletter!
                    </h3>

                    {/* Small description */}
                    <p className="text-gray-600 mb-4">
                        Join thousands of smart investors & start growing your wealth today!
                    </p>

                    {/* Stars */}
                    <div className="flex items-center space-x-1 text-yellow-500 text-4xl">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span className="text-gray-400">★</span> {/* Half star look */}
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1 bg-white p-8 pt-20 pb-20 mt-20 rounded-2xl shadow-md">
                    {/* Input */}
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        className="w-full p-4 rounded-lg bg-[#D9ECCD] text-gray-700 mb-4 focus:outline-none"
                    />

                    {/* Subscribe Button */}
                    <button className="bg-[#319465] text-white px-8 py-2 rounded-full mb-4 font-semibold hover:opacity-90 transition">
                        Subscribe Now
                    </button>

                    {/* Small text */}
                    <p className="text-gray-500 text-sm">
                        Stay ahead in your financial journey with exclusive insights, expert tips,
                        and real-time market updates — delivered straight to your inbox!
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Subscribe;
