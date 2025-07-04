import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar/Avatar'

// Mock Avatar component for demonstration

const UserPillar = ({ username }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  console.log('UserPillar received username:', username);
  
  const displayName = username || 'shubham';
  
  const navigationItems = [
    { name: 'Home', icon: '🏠', active: true },
    { name: 'Portfolio', icon: '💼', active: false },
    { name: 'Paper Trading', icon: '📊', active: false },
    { name: 'YogiBot', icon: '🤖', active: false },
  ];
  
  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if using session-based auth
      });
      
      if (response.ok) {
        // Clear any local storage or session storage if needed
        localStorage.removeItem('token'); // Remove token if stored locally
        localStorage.removeItem('user'); // Remove user data if stored locally
        
        // Navigate to home page
        navigate('/');
      } else {
        console.error('Logout failed:', response.statusText);
        // You might want to show an error message to the user
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // You might want to show an error message to the user
      alert('An error occurred during logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  return (
    <div className=" w-72 bg-white border-r rounded-xl border-gray-100">
      {/* Main container with proper spacing */}
      <div className="h-full flex flex-col">
        
        {/* Header section with logo, user info, and portfolio */}
        <div className="px-6 py-8 border-b border-gray-50">
          {/* Logo section */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl"><Avatar name={username}/></span>
            </div>
          </div>
          
          {/* User info */}
          <div className="text-center mb-6">
            <h2 className="text-gray-800 font-semibold text-lg mb-1">{displayName}</h2>
            <p className="text-gray-500 text-sm">Financial Planner</p>
          </div>
          
          {/* Portfolio card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 text-white shadow-lg">
            <div className="text-center">
              <p className="text-green-100 text-xs font-medium uppercase tracking-wide mb-2">
                Portfolio Value
              </p>
              <h3 className="text-2xl font-bold mb-1">₹2,45,678</h3>
              <p className="text-green-200 text-sm">
                <span className="inline-flex items-center">
                  <span className="mr-1">↗</span>
                  +12.5% this month
                </span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation section with more space */}
        <div className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            {navigationItems.map((item, index) => (
              <div
                key={index}
                className={`group relative flex items-center px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  item.active 
                    ? 'bg-green-50 text-green-700 border border-green-100' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <span className={`text-lg mr-4 transition-transform duration-200 ${
                  item.active ? 'scale-110' : 'group-hover:scale-105'
                }`}>
                  {item.icon}
                </span>
                <span className="font-medium text-sm">
                  {item.name}
                </span>
                
                {/* Active indicator */}
                {item.active && (
                  <div className="absolute right-3 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </div>
            ))}
            
            {/* Logout button */}
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`group relative flex items-center px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 w-full text-left ${
                isLoggingOut 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-red-600 hover:bg-red-50 hover:text-red-700'
              }`}
            >
              <span className={`text-lg mr-4 transition-transform duration-200 ${
                isLoggingOut ? '' : 'group-hover:scale-105'
              }`}>
                {isLoggingOut ? '⏳' : '🚪'}
              </span>
              <span className="font-medium text-sm">
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserPillar;