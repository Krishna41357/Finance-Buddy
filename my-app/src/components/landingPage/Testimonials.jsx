import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fallbackTestimonials = [
  {
    name: 'Aarav M',
    image: 'testimonial-user.png',
    rating: 4.5,
    feedback: 'This website helped me understand the basics of credit cards and saving. The interactive quizzes made learning fun!',
  },
  {
    name: 'Riya K',
    image: 'testimonial-user.png',
    rating: 5,
    feedback: 'Amazing platform! The market insights are top-notch and helped me make better investment decisions.',
  },
  {
    name: 'Devansh S',
    image: 'testimonial-user.png',
    rating: 4,
    feedback: 'Great tools and simple explanations. Perfect for beginners like me who want to learn about finance.',
  },
];

const Testimonials = ({ content = {} }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    // If content prop has testimonials, use it directly
    if (content.testimonials && Array.isArray(content.testimonials)) {
      setTestimonials(content.testimonials);
      setLoading(false);
      return;
    }

    // Otherwise fetch from API
    axios.get(`${BASE_API}/api/v1/content`)
      .then(res => {
        if (Array.isArray(res.data)) {
          // Find testimonials in the content array
          const testimonialsBlock = res.data.find(item => item.key === 'testimonials');
          if (testimonialsBlock && Array.isArray(testimonialsBlock.content)) {
            setTestimonials(testimonialsBlock.content);
          } else {
            setTestimonials(fallbackTestimonials);
          }
        } else {
          setTestimonials(fallbackTestimonials);
        }
      })
      .catch((error) => {
        console.error('Error fetching testimonials:', error);
        setTestimonials(fallbackTestimonials);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [content]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<span key={i} className="text-yellow-400 text-lg">★</span>);
      } else if (rating >= i - 0.5) {
        stars.push(<span key={i} className="text-yellow-400 text-lg">½</span>);
      } else {
        stars.push(<span key={i} className="text-gray-500 text-lg">★</span>);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
        <div className="flex justify-center items-center h-64">
          <div className="text-white text-lg">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-16 right-16 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-green-300/15 rounded-full blur-2xl animate-pulse delay-500" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-green-400 uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What Our <span className="text-green-400">Users</span> Say
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 rounded-3xl p-6 shadow-2xl backdrop-blur-sm flex flex-col text-left hover:scale-105 transition duration-300"
            >
              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
              <p className="text-gray-300 mb-6">"{testimonial.feedback}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = '/testimonial-user.png'; // Fallback image
                  }}
                />
                <p className="text-white font-semibold">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;