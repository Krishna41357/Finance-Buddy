import React from 'react'

const Companion = () => {
  return (
    <>
    <div className='w-screen h-full flex flex-row flex-wrap lg:justify-between md:justify-center justify-between  p-10'> 
      <div className=" flex flex-col pt-8 w-80  text-left text-black items-start">
        <span className=' font-[Roboto-Serif] font-[400] text-4xl mb-10'>Your Smart Financial Companion</span>
        <span className=' text-xs font-[100]  min-md:self-start'>Everything you need to invest smartly and grow your wealth with expert insights, tools, and real-time market updates.</span>
        <button class="bg-purple-500 scale-75 mt-10 font-stretch-condensed text-sm hover:bg-blue-700 text-white font-bold font-[400] py-2 px-6 rounded-full w-40 ">
            View All
        </button>
       
      </div>
      <div className="companion_cards flex flex-row  justify-between md:justify-around max-sm:flex-wrap max-sm:justify-evenly p-2 items-center">
      <div className="blogs rounded-xl pb-20 flex flex-col justify-between mr-4 p-8 text-left bg-[#F5F5F7]">
        <div className="icon flex justify-center scale-75 size-fit p-2 rounded-[100%] bg-white items-center">
          <img src="/financial-blogs.png" alt="logo" />
        </div>
        <span className='text-black font-[poppins] font[300] w-60 text-l mt-6 mb-2'>Expert Financial Blogs</span>
        <span className='flex flex-col text-left text-xs w-48 text-black font-[100]'>Stay ahead with expert-written articles on investment strategies, economic trends, and wealth-building techniques to make informed decisions.</span>
        <span className='text-yellow-600 mt-8 text-xs'>Read More</span>
      </div>
      <div className="tools rounded-xl pb-20 flex flex-col justify-between ml-4 text-left bg-[#F5F5F7] p-8 ">
      <div className="icon flex justify-center scale-75 size-fit p-2 rounded-[100%] bg-white items-center">
          <img src="/finance-tools.png" alt="logo" />
        </div>
        <span className='text-black font-[poppins] w-60 font[300] text-l mt-6 mb-2'>Smart Finance Tools</span>
        <span className='flex flex-col text-left text-xs w-48 text-black font-[100]'>Calculate your SIP, PPF, and investment returns with our advanced tools to harness the power of compounding and maximize your savings.</span>
        <span className='text-yellow-600 mt-8 text-xs'>Read More</span>
      </div>
      </div>  
    </div>
    </>

  )
}

export default Companion
