import React, { useEffect, useRef, useState } from 'react';

const Features = ({ content = {} }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featureRefs = useRef([]);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    // Auto-rotate active feature every 4 seconds
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
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

  // Dynamic content with fallbacks - mapped from backend schema
  const mainTitle = content?.featuresMainTitle || 'AI-Powered Financial';
  const subTitle = content?.featuresSubTitle || 'Intelligence Platform';
  const description = content?.featuresDescription || 'Advanced tools and insights to accelerate your financial success';
  
  // Map features from backend content with default icons and colors
  const featureList = [
    {
      icon: '🤖',
      title: content?.feature1Title || 'AI Market Analysis',
      description: content?.feature1Desc || 'Advanced AI algorithms analyze market trends and provide intelligent investment recommendations.',
      color: '#00d4ff',
    },
    {
      icon: '📊',
      title: content?.feature2Title || 'Real-Time Data Feed',
      description: content?.feature2Desc || 'Live market data with real-time updates and customizable dashboard for tracking your portfolio.',
      color: '#00ff88',
    },
    {
      icon: '⚡',
      title: content?.feature3Title || 'Smart Trading Signals',
      description: content?.feature3Desc || 'AI-powered trading signals with risk assessment and automated alert system.',
      color: '#ff6b35',
    },
    {
      icon: '🎯',
      title: content?.feature4Title || 'Personalized Insights',
      description: content?.feature4Desc || 'Personalized financial insights based on your goals, risk profile, and market behavior.',
      color: '#a855f7',
    }
  ].filter(item => item.title && item.description);

  const ctaText = content?.featuresCTA || 'Start Free Trial';

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-slate-900"
    >
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
        </div>
        
        {/* Subtle Glow Effects */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <div
            ref={titleRef}
            className="opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {mainTitle}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                {subTitle}
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
          {featureList.map((feature, index) => {
            const isActive = index === activeFeature;
            
            return (
              <div
                key={index}
                ref={(el) => (featureRefs.current[index] = el)}
                className={`relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 cursor-pointer opacity-0 translate-y-8 group ${
                  isActive 
                    ? 'bg-white/5 border-cyan-400/30 shadow-2xl' 
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.03] hover:border-white/20'
                }`}
                style={{
                  transitionDelay: `${index * 0.1}s`,
                  boxShadow: isActive ? `0 20px 40px ${feature.color}15` : undefined,
                }}
                onClick={() => setActiveFeature(index)}
              >
                {/* Feature Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  isActive ? 'bg-white/10' : 'bg-white/5 group-hover:bg-white/8'
                }`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>

                {/* Feature Content */}
                <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-gray-200'
                }`}>
                  {feature.title}
                </h3>
                
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  isActive ? 'text-gray-300' : 'text-gray-400'
                }`}>
                  {feature.description}
                </p>

                {/* Active Indicator */}
                {isActive && (
                  <div 
                    className="absolute top-0 left-0 w-1 h-full rounded-l-2xl transition-all duration-300"
                    style={{ backgroundColor: feature.color }}
                  />
                )}

                {/* Hover Glow */}
                <div 
                  className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none ${
                    isActive ? 'opacity-100' : 'group-hover:opacity-50'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}08, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Active Feature Highlight */}
        <div className="bg-white/[0.02] rounded-3xl p-8 mb-12 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${featureList[activeFeature]?.color}20` }}
            >
              <span className="text-2xl">{featureList[activeFeature]?.icon}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                {featureList[activeFeature]?.title}
              </h3>
              <div className="flex gap-2 mt-2">
                {featureList.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeFeature ? 'w-6' : ''
                    }`}
                    style={{
                      backgroundColor: i === activeFeature 
                        ? featureList[activeFeature]?.color 
                        : 'rgba(255,255,255,0.2)',
                    }}
                    onClick={() => setActiveFeature(i)}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            {featureList[activeFeature]?.description}
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            className="relative px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-green-600 text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border border-cyan-400/30 group"
            style={{
              boxShadow: '0 10px 25px rgba(0, 212, 255, 0.2)',
            }}
          >
            <span className="flex items-center gap-3">
              {ctaText}
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;