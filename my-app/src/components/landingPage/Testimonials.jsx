import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Aarav M',
            image: 'testimonial-user.png',
            rating: 4.5,
            feedback:
                'This website helped me understand the basics of credit cards and saving. The articles are well-written and easy to follow. Highly recommended for young adults!',
        },
        {
            name: 'Riya K',
            image: 'testimonial-user.png',
            rating: 5,
            feedback:
                'Amazing platform! The market insights are top-notch and helped me become more confident in my investments.',
        },
        {
            name: 'Devansh S',
            image: 'testimonial-user.png',
            rating: 4,
            feedback:
                'Great tools and simple explanations. Love the charts and interactive data. Very useful for someone new to finance.',
        },
        {
            name: 'Sneha P',
            image: 'testimonial-user.png',
            rating: 4.5,
            feedback:
                'Loved the clean UI and the glowing visuals. Feels like using a premium research app. Solid content too!',
        },
        {
            name: 'Yash T',
            image: 'testimonial-user.png',
            rating: 4,
            feedback:
                'I come here daily for market trends. The analyst blogs are incredibly helpful and reliable.',
        },
    ];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<span key={i} className="text-yellow-400 text-lg glow">&#9733;</span>);
            } else if (rating >= i - 0.5) {
                stars.push(<span key={i} className="text-yellow-400 text-lg glow">&#189;</span>);
            } else {
                stars.push(<span key={i} className="text-gray-500 text-lg">&#9733;</span>);
            }
        }
        return stars;
    };

    return (
        <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-16 right-16 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-green-300/15 rounded-full blur-2xl animate-pulse delay-500" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-green-400 uppercase tracking-widest mb-2">Testimonials</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        What Our <span className="text-green-400 drop-shadow-[0_0_20px_#22c55e]">Users</span> Say
                    </h2>
                </div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 rounded-3xl p-6 shadow-2xl backdrop-blur-sm flex flex-col text-left transition transform hover:scale-105 hover:shadow-green-500/20 duration-300"
                        >
                            {/* Stars */}
                            <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

                            {/* Feedback */}
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                “{testimonial.feedback}”
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-4 mt-auto">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-10 h-10 rounded-full object-cover border border-green-400/30 shadow"
                                />
                                <div>
                                    <p className="text-white font-semibold">{testimonial.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
