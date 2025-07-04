import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LandingPageNavbar from '../../components/Header/LandingPageNavbar';
import FinancialCompanion from '../../components/landingPage/FinancialCompanion';
import LatestBlogs from '../../components/landingPage/LatestBlogs';
import Testimonials from '../../components/landingPage/Testimonials';
import Subscribe from '../../components/landingPage/Subscribe';
import Footer from '../../components/footer/Footer';

const BeforeLogin = () => {
  const headlineRef = useRef(null);
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      // Animate subtext
      gsap.fromTo(
        subTextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 }
      );

      // Animate button
      gsap.fromTo(
        buttonRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 1.2 }
      );

      // Animate glow ring
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

    return () => ctx.revert(); // Clean-up
  }, []);

  return (
    <>
      <div
        className="w-screen h-screen overflow-x-hidden bg-contain bg-bottom bg-[url('/hero-bg2.png')] bg-no-repeat"
        style={{ backgroundColor: '#D9ECCD' }}
      >
        <LandingPageNavbar />
        <div className="flex flex-col w-full mt-20 p-10 justify-start items-center">
          <div className="headlines flex flex-col items-center p-10 relative">
            {/* Headline */}
            <span
              ref={headlineRef}
              className="text-5xl font-[Open Sans] font-[700] text-black text-center drop-shadow-lg"
            >
              Save. Invest. Grow. Empower Your
              <br />
              <span className="text-[#309565] drop-shadow-[0_0_10px_#64dd17]">
                Financial Future
              </span>
            </span>

            {/* Subtext */}
            <span
              ref={subTextRef}
              className="mt-4 font-[100] text-sm text-[#989898] font-[poppins] text-center"
            >
              Learn saving, investing, and money management with easy,
              <br /> engaging content for kids and young adults
            </span>

            {/* Glowing Button */}
            <div className="relative mt-10">
              <div
                ref={glowRef}
                className="absolute inset-0 rounded-full blur-xl bg-[#64dd17] opacity-50 z-[-1]"
              ></div>
              <button
                ref={buttonRef}
                className="bg-[#319465] text-sm hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full w-40 shadow-md"
              >
                Try Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Other sections (unchanged) */}
      <div className="companion bg-white">
        <FinancialCompanion />
      </div>
      <div className="companion bg-white">
        <LatestBlogs />
      </div>
      <div className="companion bg-white">
        <Testimonials />
      </div>
      <div className="companion bg-white">
        <Subscribe />
      </div>
      <div className="companion bg-white">
        <Footer />
      </div>
    </>
  );
};

export default BeforeLogin;
