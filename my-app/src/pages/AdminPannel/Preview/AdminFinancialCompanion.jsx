import React, { useEffect, useRef, useState } from 'react';

const AdminFinancialCompanion = ({ content = {}, setContent }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section ref={sectionRef} className="py-20 px-6 md:px-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">

        {/* LEFT CONTENT */}
        <div className="flex-1">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleChange('financialTitle', e.target.innerText)}
          >
            {content.financialTitle || 'In-Depth Market\nResearch Platform'}
          </h2>

          <p
            className="text-gray-300 mb-10 max-w-lg text-lg leading-relaxed"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleChange('financialDescription', e.target.innerText)}
          >
            {content.financialDescription || 'Access comprehensive market analysis and research tools...'}
          </p>

          {/* Features */}
          <div className="space-y-6 mb-10">
            {[
              {
                titleKey: 'financialFeature1Title',
                descKey: 'financialFeature1Desc',
                defaultTitle: 'Real-Time Market Data',
                defaultDesc: 'Live stock prices, market indices, and financial news updates from global exchanges',
              },
              {
                titleKey: 'financialFeature2Title',
                descKey: 'financialFeature2Desc',
                defaultTitle: 'Technical Analysis Tools',
                defaultDesc: 'Advanced charting tools, indicators, and pattern recognition for technical analysis',
              },
              {
                titleKey: 'financialFeature3Title',
                descKey: 'financialFeature3Desc',
                defaultTitle: 'Company Fundamentals',
                defaultDesc: 'Financial statements, ratios, and key metrics for fundamental analysis',
              },
              {
                titleKey: 'financialFeature4Title',
                descKey: 'financialFeature4Desc',
                defaultTitle: 'Expert Research Reports',
                defaultDesc: 'Professional analyst reports, sector analysis, and investment recommendations',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 text-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4
                    className="text-white font-semibold mb-2"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleChange(item.titleKey, e.target.innerText)}
                  >
                    {content[item.titleKey] || item.defaultTitle}
                  </h4>
                  <p
                    className="text-gray-400 text-sm"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleChange(item.descKey, e.target.innerText)}
                  >
                    {content[item.descKey] || item.defaultDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full blur-xl bg-green-400 opacity-30 animate-pulse" />
            <button className="relative backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-10 rounded-full shadow-2xl border border-green-400/30">
              Explore Research Tools
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT – Phone with Confetti remains the same */}
        {/* You can reuse the phone part of your original `FinancialCompanion.jsx` here */}

      </div>
    </section>
  );
};

export default AdminFinancialCompanion;
