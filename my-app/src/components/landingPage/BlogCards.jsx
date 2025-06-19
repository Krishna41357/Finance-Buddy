import React from 'react';

const BlogCards = () => {
    const blogs = [
        {
            title: 'AI-Powered Finance Mentor',
            description: 'Meet Arti Sethi, your personal AI finance guru, designed to make financial learning simple and engaging.',
            points: [
                'Personalized insights tailored to your financial journey',
                'Easy-to-understand explanations of complex finance concepts',
                'Interactive guidance to boost your investing skills',
            ],
            image: 'blog-card1.png',
        },
        {
            title: 'Finance Blogs That Make Sense',
            description: 'Say goodbye to boring finance articles! Our expert-written blogs simplify investment strategies, stock market trends, and wealth-building tips in an engaging way.',
            points: [
                'Easy-to-digest finance insights',
                'Updated trends and expert advice',
                'Practical tips to grow your wealth',
            ],
            image: 'blog-card2.png',
        },
        {
            title: 'Real-Time Market Monitoring',
            description: 'Stay updated with live market data to make smarter investment decisions based on real-time stock prices, currency exchange rates, and commodity trends.',
            points: [
                'Instant stock market updates',
                'Real-time insights into currency & commodities',
                'Data-backed decisions for smarter investing',
            ],
            image: 'blog-card3.png',
        },
    ];

    return (
        <section className="py-16 px-6 md:px-20 bg-white">
            <div className="max-w-5xl mx-auto flex flex-col gap-16">

                {blogs.map((blog, index) => (
                    <div
                        key={index}
                        className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                            } items-center gap-60 ${index === 1 ? 'p-6 rounded-2xl' : ''}`}
                    >
                        {/* Text Section */}
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{blog.title}</h3>
                            <p className="text-gray-600 mb-6 text-md w-xl">{blog.description}</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                                {blog.points.map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Image Section */}
                        <div className=" relative">
                            <div className="relative">
                                <div className="absolute -inset-2 border-t-20 border-l-20 border-r-20 border-gray-200 rounded-t-lg pointer-events-none"></div>
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-60 aspect-square object-cover border-t-8 border-l-8 border-r-8 border-white rounded-t-lg"
                                />
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default BlogCards;