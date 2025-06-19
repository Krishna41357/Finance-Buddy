import React from 'react'
import LandingPageNavbar from '../../components/Header/LandingPageNavbar'
// import Companion from '../../components/landingPage/Companion'
import FinancialCompanion from '../../components/landingPage/FinancialCompanion'
import LatestBlogs from '../../components/landingPage/LatestBlogs'
import Testimonials from '../../components/landingPage/Testimonials'
import Subscribe from '../../components/landingPage/Subscribe'
import Footer from '../../components/footer/Footer'
const BeforeLogin = () => {
  return (
    <>
    <div className="w-screen h-screen overflow-x-hidden bg-contain bg-bottom bg-[url('/hero-bg2.png')]  bg-no-repeat " style={{ backgroundColor: '#D9ECCD' }}>
      <LandingPageNavbar />
      <div className="flex flex-col w-full  mt-20 p-10 justify-start items-center ">
      <div className="headlines flex flex-col  items-center p-10">
        <span className='text-5xl font-[Open Sans] font-[700] text-black'>Save. Invest. Grow. Empower Your<br /> <span className='text-[#309565]'>Financial Future</span></span>
        <span className='mt-4 font-[100] text-sm text-[#989898] font[poppins]'>Learn saving, investing, and money management with easy,<br /> engaging content for kids and young adults</span>
        <button class="bg-[#319465] mt-10 font-stretch-condensed text-sm hover:bg-blue-700 text-white font-bold font-[400] py-2 px-6 rounded-full w-40">
            Try Now
</button>
      </div>
      </div>
    
    </div>
    <div className="companion bg-white"><FinancialCompanion/></div>
    <div className="companion bg-white"><LatestBlogs/></div>
    <div className="companion bg-white"><Testimonials/></div>
    <div className="companion bg-white"><Subscribe/></div>
    <div className="companion bg-white"><Footer/></div>
    </>    
  )
}

export default BeforeLogin
