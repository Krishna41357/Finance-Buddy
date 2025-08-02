
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LandingPageNavbar from '../../../components/Header/LandingPageNavbar';
import AdminFeatures from './AdminFeatures';
import AdminFinancialCompanion from './AdminFinancialCompanion';
import AdminLatestBlogs from './AdminLatestBlogs';
import AdminTestimonials from './AdminTestimonials';
import AdminSubscribe from './AdminSubscribe';
import AdminFooter from './AdminFooter';

const AdminBeforeLogin = ({ content = {}, setContent }) => {
  const headlineRef = useRef(null);
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 });
      gsap.fromTo(subTextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.8 });
      gsap.fromTo(buttonRef.current, { scale: 0 }, { scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 1.2 });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.2,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const handleContentChange = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className=" min-h-screen overflow-x-hidden relative" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
     <LandingPageNavbar /> 
      <div className="flex flex-col lg:flex-row w-full mt-20 p-6 justify-start items-center lg:items-start relative z-10 min-h-[60vh]">
       
        <div className="w-full lg:w-1/2 lg:pr-8 mb-10 lg:mb-0">
          
          <div className="headlines flex flex-col p-6 relative max-w-2xl mx-auto lg:mx-0 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))' }}>

            <div className="mb-6 inline-block">
              <div className="relative backdrop-blur-md rounded-full px-4 py-2 border border-green-400/30 shadow-lg bg-gradient-to-br from-green-400/10 to-emerald-400/10">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-green-400/50" />
                  <span className="text-xs font-medium text-green-300 tracking-wide">JUST LAUNCHED</span>
                </div>
              </div>
            </div>

            <span
              ref={headlineRef}
              className="text-4xl lg:text-6xl font-bold text-white leading-tight"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleContentChange('heroTitle', e.target.innerText)}
            >
              {content.heroTitle || 'Save. Invest. Grow. Empower Your Financial Future'}
            </span>

            <p
              ref={subTextRef}
              className="mt-4 text-base text-gray-300"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleContentChange('heroDescription', e.target.innerText)}
            >
              {content.heroDescription || 'Learn saving, investing, and money management with easy, engaging content for kids and young adults'}
            </p>

            <div className="relative mt-6">
              <div ref={glowRef} className="absolute inset-0 rounded-full blur-xl bg-green-400 opacity-30 z-[-1] animate-pulse" style={{ filter: 'blur(20px)' }} />
              <button ref={buttonRef} className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:scale-105 transition-transform">
                Try Now
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-2xl backdrop-blur-md border border-white/10 animate-float shadow-xl"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }}>
              {/* <MoneyBagScene /> */}
            </div>

            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-2xl backdrop-blur-md border border-white/10 animate-float-reverse shadow-xl"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }}>
              {/* <GoldCoinScene /> */}
            </div>

            <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full backdrop-blur-md border border-white/10 shadow-xl overflow-hidden">
              {/* <PiggyScene /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-slate-900 to-gray-900">
    <AdminFeatures content={content} setContent={setContent} />

      </div>
     <div className="bg-gradient-to-b from-slate-900 to-gray-900">
  <AdminFinancialCompanion content={content} setContent={setContent} />
</div>

      <div className="bg-gradient-to-b from-slate-900 to-gray-900">
  <AdminLatestBlogs content={content} setContent={setContent} />
</div>

      <div className="bg-gradient-to-b from-slate-900 to-gray-900">
  <AdminTestimonials content={content} setContent={setContent} />
</div>
     
     <div className="bg-gradient-to-b from-slate-900 to-gray-900">
  <AdminSubscribe content={content} setContent={setContent} />
</div><div className="bg-gradient-to-b from-slate-900 to-gray-900">
  <AdminFooter content={content} setContent={setContent} />
</div>
    </div>
  );
};

export default AdminBeforeLogin;
