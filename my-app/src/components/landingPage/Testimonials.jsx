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
            name: 'Aarav M',
            image: 'testimonial-user.png',
            rating: 4.5,
            feedback:
                'This website helped me understand the basics of credit cards and saving. The articles are well-written and easy to follow. Highly recommended for young adults!',
        },
        {
            name: 'Aarav M',
            image: 'testimonial-user.png',
            rating: 4.5,
            feedback:
                'This website helped me understand the basics of credit cards and saving. The articles are well-written and easy to follow. Highly recommended for young adults!',
        },
        {
            name: 'Aarav M',
            image: 'testimonial-user.png',
            rating: 4.5,
            feedback:
                'This website helped me understand the basics of credit cards and saving. The articles are well-written and easy to follow. Highly recommended for young adults!',
        },
        {
            name: 'Aarav M',
            image: 'testimonial-user.png',
            rating: 4.5,
            feedback:
                'This website helped me understand the basics of credit cards and saving. The articles are well-written and easy to follow. Highly recommended for young adults!',
        },
    ];

    // Helper to render stars
    const renderStars = (rating ) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<span key={i} className="text-yellow-400 text-xl">&#9733;</span>); // Full star
            } else if (rating >= i - 0.5) {
                stars.push(<span key={i} className="text-yellow-400 text-xl">&#189;</span>); // Half star
            } else {
                stars.push(<span key={i} className="text-gray-300 text-xl">&#9733;</span>); // Empty star
            }
        }
        return stars;
    };

    return (
        <section className="py-20 px-6 md:px-10 bg-white">
            <div className="text-center mb-12">
                <p className="text-gray-500 uppercase tracking-widest mb-2">Testimonial</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Happy User Says</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex flex-col items-start text-left"
                    >
                        {/* Stars */}
                        <div className="flex mb-4">
                            {renderStars(testimonial.rating)}
                        </div>

                        {/* Feedback Text */}
                        <p className="text-gray-600 mb-6">
                            {testimonial.feedback}
                        </p>

                        {/* User Profile */}
                        <div className="flex items-center gap-4 mt-auto">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-gray-900 font-semibold">{testimonial.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
