import React, { useEffect, useRef } from 'react';

const Features = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featureRefs = useRef([]);

  useEffect(() => {
    // Simple intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: '📊',
      title: 'Financial Content Feed',
      description: 'Stay updated with curated financial news, market insights, and educational content tailored for your learning level.',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      glowColor: 'blue-400',
      borderColor: 'blue-400/30',
      rgbaGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
    },
    {
      icon: '🔍',
      title: 'In-Depth Market Research',
      description: 'Access comprehensive market analysis and research tools designed for both beginners and professional traders.',
      gradient: 'from-purple-500/20 to-pink-500/20',
      glowColor: 'purple-400',
      borderColor: 'purple-400/30',
      rgbaGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
    },
    {
      icon: '📈',
      title: 'Paper Trading Platform',
      description: 'Practice trading with virtual money in a risk-free environment that simulates real market conditions.',
      gradient: 'from-green-500/20 to-emerald-500/20',
      glowColor: 'green-400',
      borderColor: 'green-400/30',
      rgbaGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
    },
    {
      icon: '🧠',
      title: 'Financial Quizzes',
      description: 'Test and improve your financial literacy with interactive quizzes and gamified learning experiences.',
      gradient: 'from-orange-500/20 to-red-500/20',
      glowColor: 'orange-400',
      borderColor: 'orange-400/30',
      rgbaGradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)',
    },
  ];

  return (
    <div 
    ref={sectionRef}
    className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-900 to-gray-900"
    >
    {/* Glow Effects matching Hero section theme */}
    <div className="absolute top-10 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
    <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />
    <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-500 pointer-events-none" />

  <div className="relative z-10 max-w-7xl mx-auto">
    {/* Section Title */}
    <div className="text-center mb-16">
      <div
        ref={titleRef}
        className="inline-block p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl relative opacity-0 translate-y-12 transition-all duration-1000 ease-out"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
          boxShadow: '0 25px 45px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/10 via-blue-400/10 to-purple-400/10 pointer-events-none" />
        <div className="relative z-10">
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
            style={{ textShadow: '0 0 20px rgba(34, 197, 94, 0.3)' }}
          >
            Powerful Features for
            <br />
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 drop-shadow-[0_0_20px_#22c55e]"
              style={{ textShadow: '0 0 30px #22c55e, 0 0 40px #3b82f6' }}
            >
              Financial Success
            </span>
          </h2>
          <p 
            className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            Everything you need to master financial literacy and build wealth
          </p>
        </div>
      </div>
    </div>

    {/* Feature Cards & Button continue below... */}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="group relative p-6 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 cursor-pointer opacity-0 translate-y-20 scale-95"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                transitionDelay: `${index * 0.2}s`,
              }}
            >
              {/* Animated Border */}
              <div 
                className={`absolute inset-0 rounded-2xl border-2 border-${feature.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                style={{
                  background: feature.rgbaGradient,
                }}
              />

              {/* Glow Effect */}
              <div 
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl backdrop-blur-sm border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    }}
                  >
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 
                  className="text-xl sm:text-2xl font-bold text-white mb-3 text-center group-hover:text-green-300 transition-colors duration-300"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-gray-300 text-sm sm:text-base text-center leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                >
                  {feature.description}
                </p>

                {/* Hover Action */}
                <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(16, 185, 129, 0.8) 100%)',
                      boxShadow: '0 10px 20px rgba(34, 197, 94, 0.3)',
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>

              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                <div 
                  className={`absolute w-2 h-2 bg-${feature.glowColor} rounded-full opacity-0 group-hover:opacity-100 animate-bounce`}
                  style={{
                    top: '20%',
                    left: '10%',
                    animationDelay: '0s',
                    animationDuration: '2s',
                  }}
                />
                <div 
                  className={`absolute w-1 h-1 bg-${feature.glowColor} rounded-full opacity-0 group-hover:opacity-100 animate-bounce`}
                  style={{
                    top: '60%',
                    right: '15%',
                    animationDelay: '0.5s',
                    animationDuration: '2.5s',
                  }}
                />
                <div 
                  className={`absolute w-1.5 h-1.5 bg-${feature.glowColor} rounded-full opacity-0 group-hover:opacity-100 animate-bounce`}
                  style={{
                    bottom: '20%',
                    left: '20%',
                    animationDelay: '1s',
                    animationDuration: '3s',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block">
            <button
              className="relative backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl border border-green-400/30 transition-all duration-300 hover:scale-105 hover:shadow-green-500/50 text-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(16, 185, 129, 0.8) 100%)',
                boxShadow: '0 15px 35px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;