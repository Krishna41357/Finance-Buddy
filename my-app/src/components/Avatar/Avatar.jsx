import React from 'react';
const Avatar = ({ name, size, round }) => (
  <div 
    className={`bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold ${round ? 'rounded-full' : 'rounded-lg'} shadow-lg`}
    style={{ width: size, height: size, fontSize: `${size/3}px` }}
  >
    {name ? name.charAt(0).toUpperCase() : 'S'}
  </div>
);
export default Avatar;