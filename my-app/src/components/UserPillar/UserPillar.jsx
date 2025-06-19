import React from 'react'

const UserPillar = ({username}) => {
  console.log('UserPillar received username:', username);
  
  // Temporary fallback for testing
  const displayName = username || 'Test User';
  
  return (
    <>
    <div className='flex flex-col items-center justify-start h-screen w-auto bg-white rounded-lg'>
      <div className='bg-[#309565] h-[20%] w-full rounded-lg'></div>
      <div className="userImg mx-auto mt-[-4%] scale-[4]"> <img src="./Ellipse-user.png" alt="" /></div> 
      <span className="text-black font-bold text-2xl w-full mt-20 font-sans text-center px-4">{displayName}</span>
      <hr className="border-t border-black my-4 w-[80%] "/>
      <div className="navigations flex flex-col space-y-4 items-center justify-center w-full gap-2 mt-4 px-10">
       <h4 className="w-52 font-[Arial] text-black hover:text-white hover:bg-green-700 text-xl px-8 py-1 rounded-2xl cursor-pointer transition">Home</h4>
       <h4 className="w-52 font-[Arial] text-black hover:text-white hover:bg-green-700 text-xl px-8 py-1 rounded-2xl cursor-pointer transition">Portfolio</h4>
       <h4 className="w-52 font-[Arial] text-black hover:text-white hover:bg-green-700 text-xl px-8 py-1 rounded-2xl cursor-pointer transition">Paper Trading</h4>
       <h4 className="w-52 font-[Arial] text-black hover:text-white hover:bg-green-700 text-xl px-8 py-1 rounded-2xl cursor-pointer transition">Contact Us</h4>
       <h4 className="w-52 font-[Arial] text-black hover:text-white hover:bg-green-700 text-xl px-8 py-1 rounded-2xl cursor-pointer transition">YogiBot</h4>
      </div>
    </div>
    </>
  )
}

export default UserPillar


