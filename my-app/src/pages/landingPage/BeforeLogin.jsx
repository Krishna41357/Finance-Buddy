import React, { useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import LandingPageNavbar from '../../components/Header/LandingPageNavbar';
import PiggyScene from '../../components/3D component/PiggyScene';
import MoneyBagScene from '../../components/3D component/MoneyBagScene';
import GoldCoinScene from '../../components/3D component/GoldCoinScene';
import Features from '../../components/landingPage/Features';
import FinancialCompanion from '../../components/landingPage/FinancialCompanion';
import LatestBlogs from '../../components/landingPage/LatestBlogs';
import Testimonials from '../../components/landingPage/Testimonials';
import Subscribe from '../../components/landingPage/Subscribe';
import Footer from '../../components/footer/Footer';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';



const fallback = {
  heroTitle: 'Save. Invest. Grow. Empower Your Financial Future',
  heroDescription: 'Learn saving, investing, and money management with easy, engaging content for kids and young adults',
  sectionTitle: 'Why Choose Us?',
  sectionParagraph: 'Our platform is designed with your success in mind.'
};

const BeforeLogin = ({ content = {} }) => {
  const [contentData, setContentData] = useState(content);
  const [heroTitle, setHeroTitle] = useState(content.heroTitle || fallback.heroTitle);
  const [heroDescription, setHeroDescription] = useState(content.heroDescription || fallback.heroDescription);
  const [loading, setLoading] = useState(false);
  const {user ,token , isLoading} = useContext(AuthContext);
  const Token = token;
  const navigate = useNavigate();
  

  const headlineRef = useRef(null);
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);
  const glowRef = useRef(null);
  const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    // Only fetch if no content prop is provided
    if (Object.keys(content).length === 0) {
      setLoading(true);
      const fetchContent = async () => {
        try {
          const res = await fetch(`${BASE_API}/api/v1/content`);
          const data = await res.json();
          
          const contentMap = {};
          if (Array.isArray(data)) {
            data.forEach((item) => {
              contentMap[item.key] = item.content;
            });
          }
          
          setContentData(contentMap);
          setHeroTitle(contentMap.heroTitle || fallback.heroTitle);
          setHeroDescription(contentMap.heroDescription || fallback.heroDescription);
        } catch (err) {
          console.error('Error fetching homepage content:', err);
          // Keep fallback values
        } finally {
          setLoading(false);
        }
      };
      fetchContent();
    } else {
      setContentData(content);
    }
  }, [content]);

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

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-900">
  //       <div className="text-white text-xl">Loading...</div>
  //     </div>
  //   );
  // }
  const TryNow = () => {
    if (Token) {
      Navigate(`/dashboard/${userId}`, { replace: true });
    }
  };

  return (
    <>
      <div
        className="w-screen min-h-screen overflow-x-hidden bg-contain bg-bottom bg-no-repeat relative"
        style={{
          background: 'linear-gradient(135deg, #0f2027 0%, #203a43 25%, #2c5364 50%, #1a4a3a 75%, #0d3d2f 100%)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-600/5 to-transparent pointer-events-none" />
        <div className="absolute top-20 left-4 sm:left-20 w-32 sm:w-64 h-32 sm:h-64 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 sm:top-60 right-4 sm:right-32 w-48 sm:w-80 h-48 sm:h-80 bg-emerald-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 sm:bottom-40 left-1/4 sm:left-1/3 w-24 sm:w-48 h-24 sm:h-48 bg-green-300/25 rounded-full blur-2xl animate-pulse delay-500" />

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>

        <LandingPageNavbar nature="fixed"/>

        <div className="flex flex-col lg:flex-row w-full mt-20 p-4 sm:p-6 lg:p-10 justify-start items-center lg:items-start relative z-10 min-h-[60vh]">
          <div className="w-full lg:w-1/2 lg:pr-8 mb-10 lg:mb-0">
            <div className="headlines flex flex-col p-6 sm:p-8 lg:p-10 relative max-w-2xl mx-auto lg:mx-0">
              <div className="absolute inset-0 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)', boxShadow: '0 25px 45px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' }} />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/10 via-transparent to-emerald-500/10 pointer-events-none" />

              <div className="relative z-10">
                <div className="mb-6 inline-block">
                  <div className="relative backdrop-blur-md rounded-full px-4 py-2 border border-green-400/30 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)', boxShadow: '0 8px 25px rgba(34, 197, 94, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                      <span className="text-xs sm:text-sm font-medium text-green-300 tracking-wide" style={{ textShadow: '0 0 10px rgba(34, 197, 94, 0.3)' }}>JUST LAUNCHED</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/10 to-emerald-400/10 pointer-events-none" />
                  </div>
                </div>

                <span ref={headlineRef} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-[Open Sans] font-[700] text-white text-left drop-shadow-2xl block leading-tight"
                  style={{ textShadow: '0 0 20px rgba(34, 197, 94, 0.3)' }}>
                  {heroTitle}
                </span>

                <span ref={subTextRef} className="mt-4 sm:mt-6 font-[100] text-sm sm:text-base text-gray-300 font-[poppins] text-left block leading-relaxed"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  {heroDescription}
                </span>

                <div className="relative mt-8 sm:mt-10 flex justify-start">
                  <div ref={glowRef} className="absolute inset-0 rounded-full blur-xl bg-green-400 opacity-30 z-[-1] animate-pulse"
                    style={{ filter: 'blur(20px)' }}></div>
                  <button ref={buttonRef} onClick={TryNow} className="relative backdrop-blur-md bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 px-6 sm:px-8 rounded-full w-36 sm:w-40 shadow-2xl border border-green-400/30 transition-all duration-300 hover:scale-105 hover:shadow-green-500/50 text-sm sm:text-base"
                    style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(16, 185, 129, 0.8) 100%)', boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                    Try Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              <div className="w-full h-64 sm:h-80 lg:h-96 relative">
                <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl animate-float"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)', animation: 'float 6s ease-in-out infinite' }}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-500/20" />
                  <MoneyBagScene />
                </div>

                <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)', animation: 'float 8s ease-in-out infinite reverse' }}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-green-500/20" />
                  <GoldCoinScene />
                </div>

                <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-80 sm:h-80 rounded-full backdrop-blur-md border border-white/10 shadow-xl flex items-center justify-center overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)', animation: 'float 7s ease-in-out infinite' }}>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-300/30 to-emerald-400/30 z-0" />
                  <div className="w-full h-full z-10">
                    <PiggyScene />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='companion bg-gradient-to-b from-slate-900 to-gray-900'>
        <Features content={contentData}/>
      </div>
        <div className="companion bg-gradient-to-b from-slate-900 to-gray-900">
          <FinancialCompanion content={contentData} />
        </div>
        <div className="companion bg-gradient-to-b from-gray-900 to-slate-800">
          <LatestBlogs content={contentData} />
        </div>
        <div className="companion bg-gradient-to-b from-slate-800 to-gray-900">
          <Testimonials content={contentData} />
        </div>
        <div className="companion bg-gradient-to-b from-gray-900 to-slate-900">
          <Subscribe content={contentData} />
        </div>
        <div className="companion bg-slate-900">
          <Footer content={contentData} />
        </div>
      </>
    );
  };

  export default BeforeLogin;